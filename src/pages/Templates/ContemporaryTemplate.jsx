import React from "react";

export default function ContemporaryTemplate({ basicInfo = {}, summary = "", experience = [], education = [], skills = [], color = "#10b981" }) {
  return (
    <div style={{ color: "#0f172a", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", lineHeight: "1.4" }}>
      <header style={{ backgroundColor: color, color: "#ffffff", padding: "12px 16px", marginBottom: "12px" }}>
        <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>{basicInfo.name || "Your Name"}</h1>
        <div style={{ marginTop: "4px", fontSize: "10px", opacity: 0.9 }}>
          {basicInfo.email && <span>{basicInfo.email} • </span>}
          {basicInfo.phone && <span>{basicInfo.phone} • </span>}
          {basicInfo.linkedin && <span>{basicInfo.linkedin}</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: "12px", padding: "0 16px" }}>
          <h2 style={{ fontSize: "13px", margin: "0 0 6px 0", fontWeight: "600", color: color }}>Summary</h2>
          <p style={{ margin: 0, color: "#374151", fontSize: "10px" }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: "12px", padding: "0 16px" }}>
          <h2 style={{ fontSize: "13px", margin: "0 0 8px 0", fontWeight: "600", color: color }}>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <strong style={{ fontSize: "11px" }}>{e.role || "Role"}</strong>
                  <div style={{ color: "#6b7280", fontSize: "10px" }}>{e.company}</div>
                </div>
                <div style={{ color: "#6b7280", fontSize: "9px" }}>{e.start} - {e.end}</div>
              </div>
              <div style={{ marginTop: "4px", fontSize: "10px", color: "#374151" }}>{e.description}</div>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: "12px", padding: "0 16px" }}>
          <h2 style={{ fontSize: "13px", margin: "0 0 8px 0", fontWeight: "600", color: color }}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <strong style={{ fontSize: "11px" }}>{edu.degree || "Degree"}</strong>
              <div style={{ color: "#6b7280", fontSize: "10px" }}>{edu.school} • {edu.start} - {edu.end}</div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ padding: "0 16px" }}>
          <h2 style={{ fontSize: "13px", margin: "0 0 8px 0", fontWeight: "600", color: color }}>Skills</h2>
          <div style={{ fontSize: "10px", color: "#374151" }}>{skills.join(" • ")}</div>
        </section>
      )}
    </div>
  );
}

