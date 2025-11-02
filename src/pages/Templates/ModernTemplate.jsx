import React from "react";

export default function ModernTemplate({ basicInfo = {}, summary = "", experience = [], education = [], skills = [] }) {
  return (
    <div style={{ display: "flex", gap: 24, fontFamily: "Inter, sans-serif", color: "#0f172a" }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0 }}>{basicInfo.name || "Your Name"}</h1>
        <div style={{ color: "#475569", marginTop: 6 }}>{basicInfo.email} {basicInfo.phone && ` • ${basicInfo.phone}`}</div>

        <section style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 6 }}>Summary</h3>
          <p style={{ margin: 0, color: "#374151" }}>{summary}</p>
        </section>

        <section style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 8 }}>Experience</h3>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.role || "Role"}</strong>
                <span style={{ color: "#6b7280" }}>{e.start} - {e.end}</span>
              </div>
              <div style={{ color: "#374151" }}>{e.company}</div>
              <div style={{ marginTop: 6 }}>{e.description}</div>
            </div>
          ))}
        </section>
      </div>

      <aside style={{ width: 260 }}>
        <section>
          <h4 style={{ marginBottom: 6 }}>Education</h4>
          {education.map((ed, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong style={{ fontSize: 14 }}>{ed.degree}</strong>
              <div style={{ color: "#6b7280", fontSize: 13 }}>{ed.school}</div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 18 }}>
          <h4 style={{ marginBottom: 6 }}>Skills</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s, i) => <span key={i} style={{ background: "#f1f5f9", padding: "6px 10px", borderRadius: 6 }}>{s}</span>)}
          </div>
        </section>
      </aside>
    </div>
  );
}
