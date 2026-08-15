import { basename } from "node:path";
import { Glob } from "bun";

const MARKETING = [
  "seamless", "seamlessly", "robust", "powerful", "cutting-edge",
  "effortless", "effortlessly", "world-class", "next-generation",
  "revolutionary", "blazing", "lightning-fast", "elegant", "delightful",
  "turnkey", "best-in-class", "state-of-the-art", "game-changing",
  "first-class", "battle-tested", "enterprise-grade", "supercharge",
  "unlock", "unleash", "empower", "empowers",
];

const BANNED = [
  "begin", "begins", "commence", "commences", "initiate", "initiates",
  "originate", "utilize", "utilizes", "utilizing", "leverage", "leverages",
  "leveraging", "facilitate", "facilitates", "ensure", "ensures", "ensuring",
  "prior to", "subsequent to", "obtain", "obtains", "acquire", "acquires",
  "demonstrate", "demonstrates", "additionally", "furthermore", "moreover",
  "comprehensive", "comprehensively", "utilization", "aforementioned",
  "henceforth", "therein", "whilst", "amongst", "numerous", "myriad",
  "plethora", "in order to", "a variety of", "in the event that",
  "due to the fact that", "it is important to note",
];

const PHRASAL = [
  "spin up", "spin down", "reach out", "dive into", "dives into",
  "diving into", "kick off", "kicks off", "roll out", "rolls out",
  "tear down", "ramp up", "circle back", "drill down", "spun up",
  "reaching out",
];

const MODAL_HEDGE = [
  "it is important to note", "it should be noted", "it is worth noting",
  "please note that", "as mentioned", "as noted above",
];

const BE = /(?:am|is|are|was|were|be|been|being)/;
const PP_IRREG =
  /(?:done|made|sent|read|built|kept|held|set|put|run|written|shown|given|taken|found|got|gotten|seen|known|thrown|drawn)/;
// Unicode-aware equivalent of Python's \w (letters, digits, underscore).
const WC = String.raw`[\p{L}\p{N}_]`;

// Round to 2 decimals, half-to-even, matching Python's round(x, 2).
function round2(x: number): number {
  const scaled = x * 100;
  const floor = Math.floor(scaled);
  if (Math.abs(scaled - floor - 0.5) < 1e-9) {
    return (floor % 2 === 0 ? floor : floor + 1) / 100;
  }
  return Math.round(scaled) / 100;
}

function stripCode(t: string): string {
  t = t.replace(/```[\s\S]*?```/g, " ");
  t = t.replace(/`[^`]*`/g, " ");
  return t;
}

function sentences(text: string): string[] {
  const out: string[] = [];
  for (const line of text.split("\n")) {
    let s = line.trim();
    if (!s) continue;
    s = s.replace(/^#{1,6}\s*/, "");
    s = s.replace(/^(?:[-*+]|\d+[.)])\s+/, "");
    if (!s) continue;
    const parts = s.split(/(?<=[.!?:])\s+(?=[A-Z0-9"'\-])/);
    for (const p of parts) {
      const trimmed = p.trim();
      if (trimmed) out.push(trimmed);
    }
  }
  return out;
}

function wc(s: string): number {
  const matches = s.match(/[A-Za-z0-9][A-Za-z0-9'\-/]*/g);
  return matches ? matches.length : 0;
}

function countCi(
  text: string,
  phrases: readonly string[],
): { count: number; hits: string[] } {
  let count = 0;
  const hits: string[] = [];
  const low = text.toLowerCase();
  for (const ph of phrases) {
    const escaped = ph.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<![a-z])${escaped}(?![a-z])`, "g");
    const matches = Array.from(low.matchAll(re));
    if (matches.length > 0) {
      count += matches.length;
      hits.push(ph);
    }
  }
  return { count, hits };
}

interface Violations {
  "long_sentence(>20w)": number;
  semicolon: number;
  contraction: number;
  passive_voice: number;
  ing_main_verb: number;
  nominalization: number;
  phrasal_verb: number;
  banned_word: number;
  marketing_adjective: number;
  modal_hedge: number;
  "long_paragraph(>6s)": number;
  [key: string]: number;
}

interface LintResult {
  words: number;
  sentences: number;
  violations: Violations;
  total: number;
  total_per100w: number;
  "em_dash(slop-marker)": number;
  longest_sentence_words: number;
  sample_marketing: string[];
  sample_banned: string[];
}

function lint(text: string): LintResult {
  const raw = text;
  text = stripCode(text);
  const sents = sentences(text);
  const words = sents.reduce((sum, s) => sum + wc(s), 0) || 1;

  const wcs = sents.map((s) => wc(s));
  const longWcs = wcs.filter((w) => w > 20);

  const violations: Violations = {
    "long_sentence(>20w)": longWcs.length,
    semicolon: (text.match(/;/g) || []).length,
    contraction: (text.match(/\b[\p{L}\p{N}_]+['’](?:t|re|ve|ll|d|s|m)\b/gu) || []).length,
    passive_voice: 0,
    ing_main_verb: 0,
    nominalization: 0,
    phrasal_verb: 0,
    banned_word: 0,
    marketing_adjective: 0,
    modal_hedge: 0,
    "long_paragraph(>6s)": 0,
  };

  violations["passive_voice"] = (
    text.match(
      new RegExp(`\\b${BE.source}\\s+(?:${WC}+ed|${PP_IRREG.source})\\b`, "giu"),
    ) || []
  ).length;

  violations["ing_main_verb"] = (
    text.match(new RegExp(`\\b${BE.source}\\s+${WC}+ing\\b`, "giu")) || []
  ).length;

  const nomRe1 =
    /\b(?:perform(?:s|ed)?|conduct(?:s|ed)?|provide(?:s|d)?|carry out|carries out|make use of|makes use of)\b/gi;
  const nomRe2 = /\b[\p{L}\p{N}_]{4,}(?:tion|ment|ance|ence)\s+of\b/giu;
  violations["nominalization"] =
    (text.match(nomRe1) || []).length + (text.match(nomRe2) || []).length;

  const pv = countCi(text, PHRASAL);
  violations["phrasal_verb"] = pv.count;
  const bw = countCi(text, BANNED);
  violations["banned_word"] = bw.count;
  const mk = countCi(text, MARKETING);
  violations["marketing_adjective"] = mk.count;
  const mh = countCi(text, MODAL_HEDGE);
  violations["modal_hedge"] = mh.count;

  const paras = raw.split(/\n\s*\n/).filter((p) => p.trim());
  violations["long_paragraph(>6s)"] = paras.filter(
    (p) => sentences(stripCode(p)).length > 6,
  ).length;

  const em =
    (raw.match(/—/g) || []).length + (raw.match(/–/g) || []).length;

  const total = Object.values(violations).reduce((sum, v) => sum + v, 0);
  const totalPer100w = round2((total * 100) / words);

  const longestSentenceWords =
    longWcs.length > 0
      ? Math.max(...longWcs)
      : wcs.length > 0
        ? Math.max(...wcs)
        : 0;

  return {
    words,
    sentences: sents.length,
    violations,
    total,
    total_per100w: totalPer100w,
    "em_dash(slop-marker)": em,
    longest_sentence_words: longestSentenceWords,
    sample_marketing: [...new Set(mk.hits)].slice(0, 6),
    sample_banned: [...new Set(bw.hits)].slice(0, 6),
  };
}

async function expandFiles(files: string[]): Promise<string[]> {
  const result: string[] = [];
  for (const f of files) {
    if (/[*?[]/.test(f)) {
      const glob = new Glob(f);
      const entries: string[] = [];
      for await (const entry of glob.scan()) {
        entries.push(entry);
      }
      result.push(...entries.sort());
    } else {
      result.push(f);
    }
  }
  return result;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    const input = await Bun.stdin.text();
    console.log(JSON.stringify(lint(input), null, 2));
    process.exit(0);
  }

  // Lints prose, not code. Fence code blocks and inline code; the linter
  // strips them before scoring. Do not weaken identifiers, tags, or syntax to
  // pass this linter.
  console.warn("ste-lint: linting prose only. Code blocks and inline code are stripped and never flagged.");
  const files = await expandFiles(args);
  for (const f of files) {
    const content = await Bun.file(f).text();
    const r = lint(content);
    const name = basename(f).padEnd(32);
    const w = String(r.words).padStart(4);
    const t = String(r.total).padStart(3);
    const p = r.total_per100w.toFixed(2).padStart(6);
    const e = String(r["em_dash(slop-marker)"]).padStart(2);
    console.log(
      `${name} words=${w} total=${t} per100w=${p} em_dash=${e}`,
    );
  }
}

await main();
