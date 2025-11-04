import React, { useState, useEffect } from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import PremiumTemplate from "./templates/PremiumTemplate";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TEMPLATES = [
  { id: "classic", name: "Classic", premium: false },
  { id: "modern", name: "Modern", premium: false },
  { id: "premium", name: "Premium", premium: true }
];

export default function BuildResume() {
  // form state
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: ""
  });
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([
    { company: "", role: "", start: "", end: "", description: "" }
  ]);
  const [education, setEducation] = useState([
    { school: "", degree: "", start: "", end: "" }
  ]);
  const [skills, setSkills] = useState([""]);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [showPreviewOnly, setShowPreviewOnly] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(true);

  const resumeData = { basicInfo, summary, experience, education, skills };

  // ---- Autosave to localStorage ----
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resumeFormData");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.basicInfo) setBasicInfo(parsed.basicInfo);
        if (typeof parsed.summary === "string") setSummary(parsed.summary);
        if (Array.isArray(parsed.experience)) setExperience(parsed.experience);
        if (Array.isArray(parsed.education)) setEducation(parsed.education);
        if (Array.isArray(parsed.skills)) setSkills(parsed.skills);
      }
    } catch (e) {
      console.warn("Failed to load saved resume:", e);
    }
  }, []);

  useEffect(() => {
    try {
      const payload = { basicInfo, summary, experience, education, skills };
      localStorage.setItem("resumeFormData", JSON.stringify(payload));
    } catch (e) {
      console.warn("Failed to save resume:", e);
    }
  }, [basicInfo, summary, experience, education, skills]);

  // handlers
  const handleBasicChange = (e) =>
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

  const handleSummaryChange = (e) => setSummary(e.target.value);

  const handleExpChange = (index, field, value) => {
    const copy = [...experience];
    copy[index][field] = value;
    setExperience(copy);
  };
  const addExperience = () =>
    setExperience([
      ...experience,
      { company: "", role: "", start: "", end: "", description: "" }
    ]);
  const removeExperience = (i) =>
    setExperience(experience.filter((_, idx) => idx !== i));

  const handleEduChange = (index, field, value) => {
    const copy = [...education];
    copy[index][field] = value;
    setEducation(copy);
  };
  const addEducation = () =>
    setEducation([
      ...education,
      { school: "", degree: "", start: "", end: "" }
    ]);
  const removeEducation = (i) =>
    setEducation(education.filter((_, idx) => idx !== i));

  const handleSkillChange = (index, val) => {
    const copy = [...skills];
    copy[index] = val;
    setSkills(copy);
  };
  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i));

  // template rendering
  const renderTemplate = () => {
    const props = { ...resumeData };
    if (selectedTemplate === "modern") return <ModernTemplate {...props} />;
    if (selectedTemplate === "premium") return <PremiumTemplate {...props} />;
    return <ClassicTemplate {...props} />;
  };

  // ---- Export helpers ----
  async function downloadPDF() {
    const node = document.getElementById("resume-preview");
    if (!node) return;

    // Increase scale for sharper PDF
    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("MyResume.pdf");
  }

  function downloadJSON() {
    const payload = { basicInfo, summary, experience, education, skills };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearForm() {
    setBasicInfo({ name: "", email: "", phone: "", linkedin: "", github: "" });
    setSummary("");
    setExperience([{ company: "", role: "", start: "", end: "", description: "" }]);
    setEducation([{ school: "", degree: "", start: "", end: "" }]);
    setSkills([""]);
    localStorage.removeItem("resumeFormData");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa", padding: 48 }}>
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-block",
              background: "#eef2ff",
              color: "#1e40af",
              padding: "6px 16px",
              borderRadius: 20,
              marginBottom: 10
            }}
          >
            ✨ Resume Builder
          </div>
          <h1 style={{ fontSize: 36, margin: 0 }}>Build Your Resume</h1>
          <p style={{ color: "#64748b", maxWidth: 900, margin: "8px auto 0" }}>
            Fill the form on the left, preview on the right. Switch templates to see different output.
          </p>
        </header>

        {/* template selector */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                if (t.premium) {
                  alert("This template is premium. Unlock in-app to use it.");
                } else {
                  setSelectedTemplate(t.id);
                }
              }}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: selectedTemplate === t.id ? "2px solid #3b82f6" : "1px solid #e6e9ef",
                background: selectedTemplate === t.id ? "#ffffff" : "#f8fafc",
                cursor: t.premium ? "not-allowed" : "pointer",
                opacity: t.premium ? 0.7 : 1,
                fontWeight: 600
              }}
            >
              {t.name} {t.premium && "★"}
            </button>
          ))}
        </div>

        {/* main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: showPreviewOnly ? "1fr" : "1.2fr 1fr",
            gap: 32,
            alignItems: "start"
          }}
        >
          {/* left: FORM */}
          {!showPreviewOnly && (
            <section style={{ background: "#fff", padding: 28, borderRadius: 16, border: "1px solid #e6e9ef" }}>
              {/* Basic */}
              <h3 style={{ marginTop: 0 }}>Personal Info</h3>
              {["name", "email", "phone", "linkedin", "github"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={basicInfo[field] || ""}
                  onChange={handleBasicChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #d1d5db" }}
                />
              ))}

              <h3>Summary</h3>
              <textarea
                value={summary}
                onChange={handleSummaryChange}
                placeholder="Short professional summary"
                style={{ width: "100%", minHeight: 80, padding: 10, borderRadius: 8, border: "1px solid #d1d5db", resize: "vertical" }}
              />

              {/* Experience */}
              <h3 style={{ marginTop: 18 }}>Experience</h3>
              {experience.map((exp, i) => (
                <div key={i} style={{ padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e6eef9", marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>Experience #{i + 1}</strong>
                    <button
                      onClick={() => removeExperience(i)}
                      style={{ border: "none", background: "none", color: "#ef4444", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExpChange(i, "company", e.target.value)}
                    style={{ width: "100%", padding: 8, marginTop: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                  />
                  <input
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => handleExpChange(i, "role", e.target.value)}
                    style={{ width: "100%", padding: 8, marginTop: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <input
                      placeholder="Start (e.g., 2020)"
                      value={exp.start}
                      onChange={(e) => handleExpChange(i, "start", e.target.value)}
                      style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                    />
                    <input
                      placeholder="End"
                      value={exp.end}
                      onChange={(e) => handleExpChange(i, "end", e.target.value)}
                      style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => handleExpChange(i, "description", e.target.value)}
                    style={{ width: "100%", padding: 8, marginTop: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                  />
                </div>
              ))}
              <button
                onClick={addExperience}
                style={{
                  padding: "10px 14px",
                  background: "#3b82f6",
                  color: "#fff",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                + Add Experience
              </button>

              {/* Education */}
              <h3 style={{ marginTop: 18 }}>Education</h3>
              {education.map((edu, i) => (
                <div key={i} style={{ padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e6eef9", marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>Education #{i + 1}</strong>
                    <button
                      onClick={() => removeEducation(i)}
                      style={{ border: "none", background: "none", color: "#ef4444", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) => handleEduChange(i, "school", e.target.value)}
                    style={{ width: "100%", padding: 8, marginTop: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                  />
                  <input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEduChange(i, "degree", e.target.value)}
                    style={{ width: "100%", padding: 8, marginTop: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <input
                      placeholder="Start"
                      value={edu.start}
                      onChange={(e) => handleEduChange(i, "start", e.target.value)}
                      style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                    />
                    <input
                      placeholder="End"
                      value={edu.end}
                      onChange={(e) => handleEduChange(i, "end", e.target.value)}
                      style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addEducation}
                style={{
                  padding: "10px 14px",
                  background: "#3b82f6",
                  color: "#fff",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                + Add Education
              </button>

              {/* Skills */}
              <h3 style={{ marginTop: 18 }}>Skills</h3>
              {skills.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    placeholder="Skill"
                    value={s}
                    onChange={(e) => handleSkillChange(i, e.target.value)}
                    style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #d1d5db" }}
                  />
                  <button
                    onClick={() => removeSkill(i)}
                    style={{ border: "none", background: "none", color: "#ef4444", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={addSkill}
                style={{
                  padding: "10px 14px",
                  background: "#3b82f6",
                  color: "#fff",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                + Add Skill
              </button>
            </section>
          )}

          {/* right: PREVIEW (selected template) */}
          <aside
            style={{
              background: "#fff",
              padding: 28,
              borderRadius: 16,
              border: "1px solid #e6e9ef",
              maxHeight: "80vh",
              overflowY: "auto"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <strong style={{ fontSize: 18 }}>Preview</strong>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setPreviewVisible((v) => !v)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #e6e9ef",
                    background: "#fff",
                    cursor: "pointer"
                  }}
                >
                  {previewVisible ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => {
                    setShowPreviewOnly(false);
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "#0f172a",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
              </div>
            </div>

            {/* actual template rendering */}
            {previewVisible ? (
              <div id="resume-preview">
                {renderTemplate()}
              </div>
            ) : (
              <div style={{ color: "#64748b" }}>Preview hidden</div>
            )}

            {/* export buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                onClick={downloadPDF}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                💾 Save as PDF
              </button>
              <button
                onClick={downloadJSON}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #e6e9ef",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                ⬇️ Export JSON
              </button>
              <button
                onClick={clearForm}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #e6e9ef",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                🧹 Clear
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
