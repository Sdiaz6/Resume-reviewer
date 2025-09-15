
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
    <div className="w-100" style={{ maxWidth: "1200px" }}>
      <div className="card shadow p-5">
        <h1 className="display-4 mb-4 text-primary text-center">Resume Rater</h1>

    
        <div className="row g-4 align-items-start">

          <div className="col-12 col-lg-5">
            <div className="mb-4">
              <label className="form-label fs-4">Resume</label>
              <input
                type="file"
                className="form-control form-control-lg"
                accept=".pdf,.docx,.txt"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>

            <div className="d-grid">
              <button
                className="btn btn-success btn-lg"
                onClick={handleSubmit}
                disabled={!resume || !jd}
              >
                Rate
              </button>
            </div>

            
            {result && (
              <div className="mt-4">
                <div className="alert alert-success mb-0">
                  <strong>Score:</strong> {result.total}/100
                </div>
              </div>
            )}
          </div>

          
          <div className="col-12 col-lg-7">
            <div className="mb-4">
              <label className="form-label fs-4">Job Description</label>
              <textarea
                className="form-control form-control-lg"
                rows={14}
                placeholder="Paste job description here..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>
          </div>

          
          {result && (
            <div className="col-12">
              <div className="bg-white shadow-sm p-4 rounded border">
                <h2 className="fs-3 text-success mb-3">Detailed Results</h2>
                <pre className="mb-3">{JSON.stringify(result.breakdown, null, 2)}</pre>
                <h5 className="mb-2">Advice</h5>
                <ul className="fs-5 mb-0">
                  {result.advice.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;