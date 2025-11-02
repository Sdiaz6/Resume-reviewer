import React from "react";

export default function ClassicTemplate({ basicInfo = {}, summary = "", experience = [], education = [], skills = [] }) {
  return (
    <div style={{ color: "#0f172a", fontFamily: "Inter, system-ui, sans-serif" }}>
      <header style={{ borderBottom: "1px solid #e6e9ef", paddingBottom: 12, marginBottom: 14 }}>
        <h1 style={{ margin: 0 }}>{basicInfo.name || "Your Name"}</h1>
        <div style={{ color: "#475569", marginTop: 6 }}>
          {basicInfo.email && <span>{basicInfo.email} • </span>}
          {basicInfo.phone && <span>{basicInfo.phone} • </span>}
          {basicInfo.linkedin && <span>{basicInfo.linkedin}</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, margin: "6px 0" }}>Summary</h2>
          <p style={{ margin: 0, color: "#374151" }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, margin: "6px 0" }}>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{e.role || "Role"}</strong> — <span style={{ color: "#374151" }}>{e.company}</span>
              <div style={{ color: "#6b7280", fontSize: 13 }}>{e.start} - {e.end}</div>
              <div style={{ marginTop: 6 }}>{e.description}</div>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, margin: "6px 0" }}>Education</h2>
          {education.map((ed, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{ed.degree || "Degree"}</strong> — <span style={{ color: "#374151" }}>{ed.school}</span>
              <div style={{ color: "#6b7280", fontSize: 13 }}>{ed.start} - {ed.end}</div>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: 16, margin: "6px 0" }}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s, i) => <span key={i} style={{ background: "#eef2ff", color: "#0f172a", padding: "6px 10px", borderRadius: 6 }}>{s}</span>)}
          </div>
        </section>
      )}
    </div>
  );
}
