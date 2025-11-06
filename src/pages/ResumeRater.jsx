// src/pages/ResumeRater.jsx
import React, { useEffect, useMemo, useState } from "react";


const API_BASE = "http://127.0.0.1:8000";


export default function ResumeRater() {
  const [file, setFile] = useState(null);           // File object (PDF/DOCX/TXT)
  const [pdfUrl, setPdfUrl] = useState(null);       // blob URL for iframe preview
  const [jobDescription, setJobDescription] = useState("");
  const [scoreResult, setScoreResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txtPreview, setTxtPreview] = useState(""); // small preview if .txt
  const [zoom, setZoom] = useState(1.0);            // iframe zoom

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  function handleFileChange(e) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setScoreResult(null);
    setTxtPreview("");

    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    if (!f) return;

    // PDF → blob URL for iframe
    if (f.type === "application/pdf" || /\.pdf$/i.test(f.name)) {
      const url = URL.createObjectURL(f);
      setPdfUrl(url);
    }

    // TXT → quick peek
    if (f.type === "text/plain" || /\.txt$/i.test(f.name)) {
      const r = new FileReader();
      r.onload = () => setTxtPreview(String(r.result || "").slice(0, 2000));
      r.readAsText(f);
    }
  }

async function analyzeFileWithAI(f, jdText) {
  if (!f) throw new Error("No file selected.");

  const form = new FormData();
  form.append("resume", f);                 // <-- must be 'resume'
  form.append("jd_text", jdText ?? "");     // <-- must be 'jd_text'

  const res = await fetch(`${API_BASE}/rate`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${msg || "request failed"}`);
  }
  return res.json(); // { total, breakdown, advice, jd_match, ... }
}


async function onAnalyzeClick() {
  if (!file) {
    alert("Upload a resume file (.pdf/.docx/.txt) first.");
    return;
  }
  setLoading(true);
  try {
    const data = await analyzeFileWithAI(file, jobDescription);
    setScoreResult({
      total: data.total,
      breakdown: data.breakdown || {},
      improvements: data.advice || [],
      strengths: data.strengths || [],
      jdMatch: data.jd_match || { coveragePct: 0, missingKeywords: [], matchedKeywords: [] },
      isRealAnalysis: true,
    });
  } catch (err) {
    console.error(err);
    alert(err.message || "Analysis failed");
  } finally {
    setLoading(false);
  }
}


  function getScoreLabel(score) {
    if (score >= 85) return { label: "Excellent", color: "#16a34a" };
    if (score >= 75) return { label: "Very Good", color: "#22c55e" };
    if (score >= 65) return { label: "Good", color: "#f59e0b" };
    return { label: "Needs Work", color: "#ef4444" };
  }

  const iframeStyle = useMemo(() => {
    const baseH = 600;
    return { transform: `scale(${zoom})`, height: `${baseH / zoom}px` };
  }, [zoom]);

  const filename =
    file?.name
      ? file.name
      : "Choose a file…  (.txt, .pdf, .docx | Max 10MB)";

  return (
    <div className="rr-hero">
      <div className="rr-wrap">
        {/* Page title + subtitle */}
        <div className="rr-hero-head">
          <h1 className="rr-hero-title">RESUME REVIEWER</h1>
          <p className="rr-hero-sub">
            Upload your resume for professional AI-powered feedback and
            optimization suggestions
          </p>
        </div>

        {/* TOP ROW: Upload card (left) + What we analyze (right) */}
        <div className="rr-top-grid">
          {/* LEFT CARD */}
          <div className="rr-card rr-upload-card">
            <div className="rr-card-head">
              <div className="rr-step">1</div>
              <div className="rr-card-title">UPLOAD YOUR RESUME</div>
            </div>

            <label className="rr-dropzone">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="rr-file-icon">📄</div>
              <div className="rr-file-name">{filename}</div>
              <div className="rr-help">Supports .txt, .pdf, .docx (Max 10MB)</div>
            </label>

            <div className="rr-actions">
              <button
                className="rr-btn rr-btn-outline"
                onClick={() => document.querySelector(".rr-dropzone input")?.click()}
              >
                Upload Resume
              </button>

              <button
                className="rr-btn rr-btn-primary"
                onClick={onAnalyzeClick}
                disabled={loading || !file}
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>

            {/* Optional JD textarea (collapsed look like your old page) */}
            <div className="rr-jd">
              <div className="rr-label">Job Description (optional)</div>
              <textarea
                className="rr-textarea"
                placeholder="Paste the JD to get keyword coverage and focused suggestions"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {/* TXT quick peek */}
            {txtPreview && (
              <div className="rr-mini-card">
                <strong>.txt preview:</strong>
                <div className="rr-mono" style={{ marginTop: 8, maxHeight: 150, overflow: "auto" }}>
                  {txtPreview}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT CARD: What we analyze */}
          <div className="rr-card rr-checklist-card">
            <div className="rr-card-title">WHAT WE ANALYZE</div>
            <ul className="rr-checklist">
              <li><span className="rr-pill rr-blue">✓</span> Content Quality</li>
              <li><span className="rr-pill rr-green">✓</span> Format & Structure</li>
              <li><span className="rr-pill rr-amber">✓</span> Keyword Optimization</li>
              <li><span className="rr-pill rr-violet">✓</span> ATS Compatibility</li>
              <li><span className="rr-pill rr-red">✓</span> Achievement Impact</li>
            </ul>
          </div>
        </div>

        {/* PDF VIEWER (appears when a PDF is uploaded) */}
        {pdfUrl && (
          <div className="rr-card rr-viewer-card">
            <div className="rr-viewer-head">
              <div className="rr-card-title">PDF Preview</div>
              <div className="rr-toolbar">
                <span className="rr-chip">Zoom
                  <input
                    type="range"
                    min="0.75" max="1.5" step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    style={{ marginLeft: 8 }}
                  />
                </span>
                <a className="rr-btn rr-btn-dark" href={pdfUrl} target="_blank" rel="noreferrer">Open PDF</a>
                <a className="rr-btn rr-btn-accent" href={pdfUrl} download={file?.name || "resume.pdf"}>Download</a>
              </div>
            </div>
            <div className="rr-iframe-wrap">
              <iframe title="PDF Preview" src={pdfUrl} className="rr-iframe" style={iframeStyle} />
            </div>
          </div>
        )}

        {/* RESULTS */}
        {scoreResult && (
          <div id="results-card" className="rr-card rr-results-card">
            <div className="rr-score">
              <div
                className="rr-score-num"
                style={{ color: getScoreLabel(scoreResult.total).color }}
              >
                {scoreResult.total}
              </div>
              <div className="rr-score-badges">
                <span
                  className="rr-badge"
                  style={{ color: getScoreLabel(scoreResult.total).color }}
                >
                  {getScoreLabel(scoreResult.total).label}
                </span>
                <span className="rr-badge rr-badge-ai">🤖 Real AI Analysis</span>
              </div>
            </div>

            {scoreResult.breakdown && (
              <div className="rr-mini-card">
                <h4>Breakdown</h4>
                <ul className="rr-list">
                  {Object.entries(scoreResult.breakdown).map(([k, v]) => (
                    <li key={k}><strong>{k}:</strong> {v}</li>
                  ))}
                </ul>
              </div>
            )}

            {scoreResult.jdMatch && (
              <div className="rr-mini-card">
                <strong>Job Match:</strong> {scoreResult.jdMatch.coveragePct}% coverage
                {scoreResult.jdMatch.missingKeywords?.length > 0 && (
                  <div style={{ marginTop: 6 }}>
                    <em>Missing:</em> {scoreResult.jdMatch.missingKeywords.slice(0, 14).join(", ")}
                  </div>
                )}
              </div>
            )}

            <div className="rr-mini-card">
              <h4>Improvements</h4>
              <ul className="rr-list">
                {(scoreResult.improvements || []).length
                  ? scoreResult.improvements.map((s, i) => <li key={i}>{s}</li>)
                  : <li>Add metrics (%/$/#), clarify sections, and align keywords to the job.</li>}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
