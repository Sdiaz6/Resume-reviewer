// src/utils/scorer.js
// Smarter, JD-aware, ATS-conscious local scoring with concrete suggestions.

/*
const ACTION_VERBS = [
  "led","managed","built","created","developed","designed","implemented","improved",
  "launched","optimized","automated","migrated","refactored","analyzed","mentored",
  "increased","reduced","delivered","owned","drove","deployed"
];

const SECTION_HEADERS = [
  "experience","work experience","education","skills","projects","summary","profile","certifications"
];

const STOP = new Set([
  "the","and","for","with","you","are","this","that","our","your","from","will","have",
  "has","not","but","per","via","etc","of","to","in","on","as","by","an","a"
]);

const WEIGHTS = {
  "Grammar & Spelling": 0.15,
  "Keyword Match": 0.30,
  "Readability & Formatting": 0.20,
  "Achievement Impact": 0.20,
  "Professional Tone": 0.15
};

function tokenize(text) {
  return (text || "").toLowerCase().match(/[a-z0-9+.#-]{3,}/g) || [];
}

export function topKeywordsFromJD(jd, limit = 20) {
  const toks = tokenize(jd).filter(t => !STOP.has(t));
  const freq = {};
  toks.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
  return Object.entries(freq)
    .sort((a,b)=>b[1]-a[1])
    .slice(0, limit)
    .map(([w]) => w);
}

export function jdCoverage(resumeText, jdText) {
  const kws = topKeywordsFromJD(jdText);
  const found = kws.filter(k => new RegExp(`\\b${k}\\b`, "i").test(resumeText || ""));
  return {
    coveragePct: Math.round(100 * found.length / Math.max(1, kws.length)),
    missingKeywords: kws.filter(k => !found.includes(k)),
    matchedKeywords: found
  };
}

function splitBullets(text) {
  // basic split that works for most resumes (•, - , newline)
  return (text || "")
    .split(/\n|\r|•|^- /gm)
    .map(s => String(s).trim())
    .filter(Boolean);
}

function analyzeBullets(text) {
  const bullets = splitBullets(text);
  const actionVerbRx = new RegExp(`\\b(${ACTION_VERBS.join("|")})\\b`, "i");
  const metricRx = /\b(\d{1,3}%|\$?\d{2,}(?:,\d{3})*|\b\d{1,3}\+)\b/;

  let withVerb = 0, withMetric = 0, longOnes = 0;
  bullets.forEach(b => {
    if (actionVerbRx.test(b)) withVerb++;
    if (metricRx.test(b)) withMetric++;
    if (b.length > 220) longOnes++;
  });

  return {
    bullets,
    pctVerb: Math.round(100 * withVerb / Math.max(1, bullets.length)),
    pctMetric: Math.round(100 * withMetric / Math.max(1, bullets.length)),
    longOnes
  };
}

export function analyzeHeuristicsLocally(resumeText, jdText = "") {
  const text = (resumeText || "").toLowerCase().trim();

  // Edge case: very short or empty
  if (text.replace(/\s+/g,"").length < 200) {
    return {
      total: 0,
      breakdown: {
        "Grammar & Spelling": 0,
        "Keyword Match": 0,
        "Readability & Formatting": 0,
        "Achievement Impact": 0,
        "Professional Tone": 0
      },
      improvements: [
        "We couldn’t extract enough text. Upload DOCX or the original (non-scanned) PDF.",
        "Ensure sections like Experience, Education, Skills are present."
      ],
      strengths: [],
      jdMatch: { coveragePct: 0, missingKeywords: [], matchedKeywords: [] },
      isRealAnalysis: false
    };
  }

  // Simple detectors
  const metricsRx = /\b(\d{1,3}%|\$?\d{2,}(?:,\d{3})*|\b\d{1,3}\+)\b/;
  const actionVerbRx = new RegExp(`\\b(${ACTION_VERBS.join("|")})\\b`, "i");

  // Sub-scores (start with moderate baselines)
  let grammar = 70; // placeholder until you wire a grammar checker
  let readability = 65;
  let impact = 60;
  let tone = 65;

  // Structure / readability hints
  const headersFound = SECTION_HEADERS.reduce((n,h)=> n + (text.includes(h) ? 1 : 0), 0);
  if (headersFound >= 3) readability += 12;
  if (text.length > 1200) readability += 6; // larger resumes tend to have more structure (heuristic)

  // Impact via action verbs & metrics
  const bullets = analyzeBullets(text);
  if (bullets.pctVerb >= 60) impact += 12;
  if (bullets.pctMetric >= 40) impact += 12;
  if (metricsRx.test(text)) impact += 8;

  // Tone (rough heuristics)
  if (!/\b(awesome|cool|super|amazing)\b/i.test(text)) tone += 8;
  if (!/[!?]{2,}/.test(text)) tone += 4;

  // JD coverage
  const jd = jdCoverage(text, jdText);
  let keywordMatch = 55 + Math.min(35, Math.round(jd.coveragePct * 0.35));

  // Clamp to 0..100
  function clamp(x){ return Math.max(0, Math.min(100, x)); }
  grammar = clamp(grammar);
  readability = clamp(readability);
  impact = clamp(impact);
  tone = clamp(tone);
  keywordMatch = clamp(keywordMatch);

  const breakdown = {
    "Grammar & Spelling": grammar,
    "Keyword Match": keywordMatch,
    "Readability & Formatting": readability,
    "Achievement Impact": impact,
    "Professional Tone": tone
  };

  const total = Math.round(
    Object.entries(WEIGHTS).reduce((acc,[k,w]) => acc + (breakdown[k]||0)*w, 0)
  );

  // Suggestions that reference detected evidence
  const improvements = [];
  const strengths = [];

  if (bullets.pctVerb < 70) improvements.push(`Only ${bullets.pctVerb}% of bullets start with strong action verbs — rephrase openings (Led, Built, Optimized...).`);
  else strengths.push("Bullets consistently begin with strong action verbs.");

  if (bullets.pctMetric < 50) {
    const noMetricExample = bullets.bullets.find(x => x && !/\d|%|\$/.test(x));
    improvements.push(
      `Quantify more bullets (currently ${bullets.pctMetric}%).` +
      (noMetricExample ? ` Example: “${noMetricExample.slice(0,90)}...” → add “increased by 14%”.` : "")
    );
  } else {
    strengths.push("Good use of quantifiable results (%, $, or #).");
  }

  if (bullets.longOnes > 0) improvements.push(`${bullets.longOnes} bullet(s) exceed ~2 lines — tighten for scanability.`);
  if (headersFound < 3) improvements.push("Add/clarify sections (Experience, Education, Skills, Projects, Summary).`)
  if (jd.missingKeywords.length) improvements.push(`Address missing job keywords: ${jd.missingKeywords.slice(0,8).join(", ")}.`);

  // De-dupe and cap
  const uniq = (arr) => [...new Set(arr.filter(Boolean))];
  return {
    total,
    breakdown,
    improvements: uniq(improvements).slice(0, 8),
    strengths: uniq(strengths).slice(0, 6),
    jdMatch: {
      coveragePct: jd.coveragePct,
      missingKeywords: jd.missingKeywords,
      matchedKeywords: jd.matchedKeywords
    },
    isRealAnalysis: false
  };
}
*/