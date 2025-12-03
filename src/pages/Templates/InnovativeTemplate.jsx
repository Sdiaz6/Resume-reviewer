import React from "react";

export default function InnovativeTemplate({ basicInfo = {}, summary = "", experience = [], education = [], skills = [], color = "#10b981" }) {
  return (
    <div style={{ color: "#0f172a", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", lineHeight: "1.5" }}>
      <div style={{ display: "flex", marginBottom: "14px" }}>
        <div style={{ width: "40px", backgroundColor: color, marginRight: "12px" }}></div>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: "19px", fontWeight: "800", color: color }}>{basicInfo.name || "Your Name"}</h1>
          <div style={{ marginTop: "6px", fontSize: "10px", color: "#6b7280" }}>
            {basicInfo.email && <span>{basicInfo.email} • </span>}
            {basicInfo.phone && <span>{basicInfo.phone}</span>}
          </div>
        </div>
      </div>

      {summary && (
        <section style={{ marginBottom: "14px", paddingLeft: "52px" }}>
          <h2 style={{ fontSize: "13px", margin: "0 0 6px 0", fontWeight: "700", color: color }}>Summary</h2>
          <p style={{ margin: 0, color: "#374151", fontSize: "10px" }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: "14px", paddingLeft: "52px" }}>
          <h2 style={{ fontSize: "13px", margin: "0 0 10px 0", fontWeight: "700", color: color }}>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "10px", position: "relative", paddingLeft: "16px" }}>
              <div style={{ position: "absolute", left: 0, top: "4px", width: "8px", height: "8px", backgroundColor: color, borderRadius: "50%" }}></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "11px" }}>{e.role || "Role"}</strong>
                <span style={{ color: "#6b7280", fontSize: "9px" }}>{e.start} - {e.end}</span>
              </div>
              <div style={{ color: color, fontSize: "10px", fontWeight: "600", marginBottom: "4px" }}>{e.company}</div>
              <div style={{ fontSize: "10px", color: "#374151" }}>{e.description}</div>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: "14px", paddingLeft: "52px" }}>
          <h2 style={{ fontSize: "13px", margin: "0 0 8px 0", fontWeight: "700", color: color }}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px", position: "relative", paddingLeft: "16px" }}>
              <div style={{ position: "absolute", left: 0, top: "4px", width: "8px", height: "8px", backgroundColor: color, borderRadius: "50%" }}></div>
              <strong style={{ fontSize: "11px" }}>{edu.degree || "Degree"}</strong>
              <div style={{ color: "#6b7280", fontSize: "10px" }}>{edu.school} • {edu.start} - {edu.end}</div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ paddingLeft: "52px" }}>
          <h2 style={{ fontSize: "13px", margin: "0 0 8px 0", fontWeight: "700", color: color }}>Skills</h2>
          <div style={{ fontSize: "10px", color: "#374151" }}>{skills.join(" • ")}</div>
        </section>
      )}
    </div>
  );
}

