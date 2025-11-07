// src/pages/ResumeRater.jsx
import React, { useEffect, useMemo, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function ResumeRater() {
  //view pdf but no analysis
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [zoom, setZoom] = useState(1.0);

  const [txtFile, setTxtFile] = useState(null);
  const [txtPreview, setTxtPreview] = useState("");

  const [jobDescription, setJobDescription] = useState("");
  const [scoreResult, setScoreResult] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  function handlePdfChange(e) {
    const f = e.target.files?.[0] || null;
    setPdfFile(f);

    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    if (!f) return;

    if (!(f.type === "application/pdf" || /\.pdf$/i.test(f.name))) {
      alert("Please choose a .pdf file for the viewer.");
      return;
    }
    const url = URL.createObjectURL(f);
    setPdfUrl(url);
  }

  function handleTxtChange(e) {
    const f = e.target.files?.[0] || null;
    setTxtFile(f);
    setScoreResult(null);
    setTxtPreview("");

    if (!f) return;

    if (!(f.type === "text/plain" || /\.txt$/i.test(f.name))) {
      alert("Please upload the .TXT file generated from Build Resume.");
      setTxtFile(null);
      return;
    }

    const r = new FileReader();
    r.onload = () => setTxtPreview(String(r.result || "").slice(0, 2000));
    r.readAsText(f);
  }


  async function analyzeTxtWithAI(f, jdText) {
    if (!f) throw new Error("No TXT file selected.");

    const form = new FormData();
    form.append("resume", f);             // backend expects `resume`
    form.append("jd_text", jdText ?? ""); 

    const res = await fetch(`${API_BASE}/rate`, {
      method: "POST",
      body: form
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => "");
      throw new Error(`Backend error ${res.status}: ${msg || "request failed"}`);
    }
    return res.json(); // { total, breakdown, advice, jd_match, ... }
  }

  async function onAnalyzeClick() {
    if (!txtFile) {
      alert("Please upload the .TXT file (generated in Build Resume) for analysis.");
      return;
    }
    setLoading(true);
    try {
      const data = await analyzeTxtWithAI(txtFile, jobDescription);
      setScoreResult({
        total: data.total,
        breakdown: data.breakdown || {},
        improvements: data.advice || [],
        strengths: data.strengths || [],
        jdMatch: data.jd_match || { coveragePct: 0, missingKeywords: [], matchedKeywords: [] },
        isRealAnalysis: true
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

  return (
    <div className="rr-hero">
      <div className="rr-wrap">
        <div className="rr-hero-head">
          <h1 className="rr-hero-title">RESUME REVIEWER</h1>
          <p className="rr-hero-sub">
            <strong>Two uploads:</strong> (1) <strong>PDF</strong> for viewing, (2){" "}
            <strong>.TXT</strong> (from Build Resume) for the actual AI analysis.
          </p>
        </div>

        <div className="rr-top-grid" style={{ gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
          <div className="rr-card rr-viewer-card">
            <div className="rr-card-head" style={{ marginBottom: 8 }}>
              <div className="rr-step">A</div>
              <div className="rr-card-title">RESUME PDF (VIEW ONLY)</div>
            </div>

            <label className="rr-dropzone" style={{ marginBottom: 12 }}>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfChange}
                style={{ display: "none" }}
              />
              <div className="rr-file-icon">📄</div>
              <div className="rr-file-name">{pdfFile?.name || "Choose a pretty PDF…"}</div>
              <div className="rr-help">This PDF is just for preview/printing</div>
            </label>

            {pdfUrl ? (
              <>
                <div className="rr-toolbar" style={{ marginBottom: 10 }}>
                  <span className="rr-chip">
                    Zoom
                    <input
                      type="range"
                      min="0.75" max="1.5" step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      style={{ marginLeft: 8 }}
                    />
                  </span>
                  <a className="rr-btn rr-btn-dark" href={pdfUrl} target="_blank" rel="noreferrer">
                    Open PDF
                  </a>
                  <a className="rr-btn rr-btn-accent" href={pdfUrl} download={pdfFile?.name || "resume.pdf"}>
                    Download
                  </a>
                </div>
                <div className="rr-iframe-wrap">
                  <iframe title="PDF Preview" src={pdfUrl} className="rr-iframe" style={iframeStyle} />
                </div>
              </>
            ) : (
              <div className="rr-mini-card" style={{ color: "#64748b" }}>
                No PDF selected yet. Upload the <em>PDF</em> you downloaded from Build Resume to preview it here.
              </div>
            )}
          </div>


          <div className="rr-card rr-upload-card">
            <div className="rr-card-head">
              <div className="rr-step">B</div>
              <div className="rr-card-title">TXT FOR ANALYSIS</div>
            </div>

            <label className="rr-dropzone">
              <input
                type="file"
                accept=".txt"
                onChange={handleTxtChange}
                style={{ display: "none" }}
              />
              <div className="rr-file-icon">📝</div>
              <div className="rr-file-name">{txtFile?.name || "Choose the .TXT from Build Resume…"}</div>
              <div className="rr-help">The .TXT content is what AI analyzes</div>
            </label>

            {txtPreview && (
              <div className="rr-mini-card">
                <strong>.txt preview:</strong>
                <div className="rr-mono" style={{ marginTop: 8, maxHeight: 150, overflow: "auto" }}>
                  {txtPreview}
                </div>
              </div>
            )}

            <div className="rr-jd" style={{ marginTop: 12 }}>
              <div className="rr-label">Job Description (optional)</div>
              <textarea
                className="rr-textarea"
                placeholder="Paste the JD to get keyword coverage and focused suggestions"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="rr-actions" style={{ marginTop: 12 }}>
              <button
                className="rr-btn rr-btn-outline"
                onClick={() =>
                  document.querySelectorAll(".rr-dropzone input")[1]?.click()
                }
              >
                Upload .TXT
              </button>

              <button
                className="rr-btn rr-btn-primary"
                onClick={onAnalyzeClick}
                disabled={loading || !txtFile}
              >
                {loading ? "Analyzing..." : "Analyze (.TXT)"}
              </button>
            </div>

            <div className="rr-mini-card" style={{ marginTop: 12, color: "#64748b", fontSize: 13 }}>
              Tip: Generate this .TXT in <strong>Build Resume → “Download .TXT for Analysis”</strong>.
            </div>
          </div>
        </div>


        {scoreResult && (
          <div id="results-card" className="rr-card rr-results-card" style={{ marginTop: 16 }}>
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
