import React from "react";

export default function CurrentTemplate({ basicInfo = {}, summary = "", experience = [], education = [], skills = [], color = "#2563eb" }) {
  return (
    <div style={{ color: "#0f172a", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", lineHeight: "1.4" }}>
      <header style={{ backgroundColor: color, color: "#ffffff", padding: "14px 16px", marginBottom: "14px" }}>
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "800", letterSpacing: "-0.5px" }}>{basicInfo.name || "Your Name"}</h1>
        <div style={{ marginTop: "6px", fontSize: "10px", opacity: 0.95 }}>
          {basicInfo.email && <span>{basicInfo.email} • </span>}
          {basicInfo.phone && <span>{basicInfo.phone}</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: "14px", padding: "0 16px" }}>
          <h2 style={{ fontSize: "14px", margin: "0 0 8px 0", fontWeight: "700", color: color, borderBottom: `2px solid ${color}`, paddingBottom: "4px" }}>Summary</h2>
          <p style={{ margin: 0, color: "#374151", fontSize: "10px" }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: "14px", padding: "0 16px" }}>
          <h2 style={{ fontSize: "14px", margin: "0 0 10px 0", fontWeight: "700", color: color, borderBottom: `2px solid ${color}`, paddingBottom: "4px" }}>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "12px" }}>{e.role || "Role"}</strong>
                <span style={{ color: "#6b7280", fontSize: "9px", fontWeight: "600" }}>{e.start} - {e.end}</span>
              </div>
              <div style={{ color: color, fontSize: "10px", fontWeight: "600", marginBottom: "4px" }}>{e.company}</div>
              <div style={{ fontSize: "10px", color: "#374151" }}>{e.description}</div>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: "14px", padding: "0 16px" }}>
          <h2 style={{ fontSize: "14px", margin: "0 0 8px 0", fontWeight: "700", color: color, borderBottom: `2px solid ${color}`, paddingBottom: "4px" }}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px" }}>{edu.degree || "Degree"}</strong>
              <div style={{ color: "#6b7280", fontSize: "10px" }}>{edu.school} • {edu.start} - {edu.end}</div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ padding: "0 16px" }}>
          <h2 style={{ fontSize: "14px", margin: "0 0 8px 0", fontWeight: "700", color: color, borderBottom: `2px solid ${color}`, paddingBottom: "4px" }}>Skills</h2>
          <div style={{ fontSize: "10px", color: "#374151" }}>{skills.join(" • ")}</div>
        </section>
      )}
    </div>
  );
}

