import React from "react";

export default function PremiumTemplate({ basicInfo = {}, summary = "", experience = [], education = [], skills = [] }) {
  return (
    <div style={{ fontFamily: "Georgia, serif", color: "#0f172a" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid #eef2ff", paddingBottom: 10, marginBottom: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>{basicInfo.name || "Your Name"}</h1>
          <div style={{ color: "#475569" }}>{basicInfo.email} {basicInfo.phone && `• ${basicInfo.phone}`}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ background: "#111827", color: "#fff", padding: "6px 10px", borderRadius: 8, display: "inline-block", fontWeight: 700 }}>Premium</div>
        </div>
      </div>

      {summary && (
        <section style={{ marginBottom: 12 }}>
          <h2 style={{ margin: "6px 0", fontSize: 16 }}>Professional Summary</h2>
          <p style={{ margin: 0, color: "#374151" }}>{summary}</p>
        </section>
      )}

      <section style={{ marginTop: 12 }}>
        <h3 style={{ marginBottom: 8 }}>Experience</h3>
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ fontSize: 15 }}>{e.role}</strong>
              <span style={{ color: "#6b7280" }}>{e.start} - {e.end}</span>
            </div>
            <div style={{ color: "#374151" }}>{e.company}</div>
            <div style={{ marginTop: 6 }}>{e.description}</div>
          </div>
        ))}
      </section>

      <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: 8 }}>Education</h4>
          {education.map((ed, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{ed.degree}</strong>
              <div style={{ color: "#6b7280" }}>{ed.school} ({ed.start} - {ed.end})</div>
            </div>
          ))}
        </div>

        <aside style={{ width: 220 }}>
          <h4 style={{ marginBottom: 8 }}>Skills</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s, i) => <span key={i} style={{ background: "#111827", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>{s}</span>)}
          </div>
        </aside>
      </div>
    </div>
  );
}
