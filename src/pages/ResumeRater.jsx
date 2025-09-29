import React, { useState } from "react";

function ResumeRater() {
  const [file, setFile] = useState(null);
  const [previewContent, setPreviewContent] = useState("");
  const [jdText, setJdText] = useState("");
  const [scoreResult, setScoreResult] = useState(null);

  const handlePreview = async () => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "txt") {
      const text = await file.text();
      setPreviewContent(text);
    } else {
      setPreviewContent("Preview not supported for this file type.");
    }
  };

  const handleUploadAndScore = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jd_text", jdText);

    try {
      const res = await fetch("http://127.0.0.1:8000/rate/", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + JSON.stringify(err.detail));
        return;
      }
      const data = await res.json();
      setScoreResult(data);
    } catch (err) {
      console.error(err);
      alert("AI scoring failed");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ color: "pink", textAlign: "center" }}>Resume Rater</h1>

      <div style={{ marginBottom: "20px" }}>
        <input type="file" accept=".txt,.pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handlePreview} style={{ marginLeft: "10px", padding: "5px 10px" }}>Preview</button>
      </div>

      <textarea
        placeholder="Paste or type Job Description here"
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        style={{ width: "100%", minHeight: "100px", marginBottom: "20px" }}
      />

      {previewContent && (
        <div style={{ background: "#ffe4e1", padding: "10px", marginBottom: "20px" }}>
          <h3>Preview:</h3>
          <pre>{previewContent}</pre>
        </div>
      )}

      <button onClick={handleUploadAndScore} style={{ padding: "10px 20px", background: "pink", color: "white", border: "none" }}>
        Upload & Score
      </button>

      {scoreResult && (
        <div style={{ marginTop: "20px", background: "#fff0f5", padding: "15px" }}>
          <h3>AI Score: {scoreResult.total}</h3>
          <ul>
            {scoreResult.advice.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeRater;
