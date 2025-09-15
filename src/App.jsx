import { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("resume", resume);
    form.append("jd_text", jd);

    const res = await fetch("http://localhost:8000/rate", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Resume Rater</h1>

      <div className="mb-3">
        <label className="form-label">Job Description</label>
        <textarea
          className="form-control"
          rows="6"
          placeholder="Paste job description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Resume</label>
        <input
          type="file"
          className="form-control"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={!resume || !jd}
      >
        Rate
      </button>

      {result && (
        <div className="mt-4 card card-body">
          <h2>Score: {result.total}/100</h2>
          <pre>{JSON.stringify(result.breakdown, null, 2)}</pre>
          <h5>Advice:</h5>
          <ul>
            {result.advice.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
