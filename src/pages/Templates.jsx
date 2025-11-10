import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClassicTemplate from "./Templates/ClassicTemplate";
import ModernTemplate from "./Templates/ModernTemplate";
import PremiumTemplate from "./Templates/PremiumTemplate";

const Templates = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive padding - minimal on sides, more on top/bottom
  const getPadding = () => {
    if (windowWidth < 768) return "60px 16px"; // Mobile: minimal side padding
    if (windowWidth < 1024) return "80px 24px"; // Tablet: minimal side padding
    if (windowWidth < 1440) return "100px 32px"; // Desktop: minimal side padding
    return "120px 40px"; // Large Desktop: minimal side padding
  };

  // Responsive header padding
  const getHeaderPadding = () => {
    if (windowWidth < 768) return "0 0 40px 0";
    if (windowWidth < 1024) return "0 0 50px 0";
    return "0 0 64px 0";
  };

  // Responsive grid columns - use more of the screen
  const getGridColumns = () => {
    if (windowWidth < 768) return "1fr"; // Mobile: single column
    if (windowWidth < 1024) return "repeat(2, 1fr)"; // Tablet: 2 columns
    if (windowWidth < 1920) return "repeat(3, 1fr)"; // Desktop: 3 columns
    return "repeat(4, 1fr)"; // Very large screens: 4 columns
  };

  // Responsive font sizes
  const getTitleSize = () => {
    if (windowWidth < 768) return "2rem";
    if (windowWidth < 1024) return "2.5rem";
    if (windowWidth < 1440) return "3rem";
    return "3.5rem";
  };

  // Responsive gap between cards
  const getGap = () => {
    if (windowWidth < 768) return "20px";
    if (windowWidth < 1024) return "24px";
    return "32px";
  };

  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "Traditional and professional layout perfect for any industry",
      component: ClassicTemplate,
      premium: false
    },
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design with modern typography",
      component: ModernTemplate,
      premium: false
    },
    {
      id: "premium",
      name: "Premium",
      description: "Elegant design with enhanced visual appeal",
      component: PremiumTemplate,
      premium: true
    }
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      width: "100vw",
      maxWidth: "100vw",
      overflowX: "hidden",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      position: "relative",
      margin: 0,
      padding: 0
    }}>
      {/* Animated background overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        background: `
          linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 25%, transparent 50%, rgba(255, 255, 255, 0.1) 75%, transparent 100%),
          linear-gradient(0deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)
        `,
        backgroundSize: "200px 200px, 100% 100%",
        animation: "float 8s ease-in-out infinite"
      }}></div>

      {/* FULL WIDTH CONTENT - No side constraints */}
      <div style={{ 
        width: "100%",
        maxWidth: "100%",
        padding: getPadding(), 
        margin: 0,
        position: "relative", 
        zIndex: 1,
        boxSizing: "border-box"
      }}>
        <header style={{ 
          textAlign: "center", 
          padding: getHeaderPadding(),
          width: "100%",
          boxSizing: "border-box"
        }}>
          <div style={{
            display: "inline-block",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            color: "#ffffff",
            padding: "8px 20px",
            borderRadius: "20px",
            fontSize: windowWidth < 768 ? "0.8rem" : "0.9rem",
            fontWeight: "600",
            marginBottom: "20px",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}>
            ✨ Professional Templates
          </div>
          <h1 style={{
            fontSize: getTitleSize(),
            fontWeight: "800",
            color: "#ffffff",
            marginBottom: "20px",
            letterSpacing: "-1px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            width: "100%"
          }}>
            Choose Your Template
          </h1>
          <p style={{
            fontSize: windowWidth < 768 ? "1rem" : "1.2rem",
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "800px",
            margin: "0 auto",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
          }}>
            Select a professional resume template that matches your style and industry
          </p>
        </header>

        {/* FULL WIDTH GRID - Uses entire screen */}
        <div style={{
          display: "grid",
          gridTemplateColumns: getGridColumns(),
          gap: getGap(),
          marginBottom: windowWidth < 768 ? "32px" : "48px",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box"
        }}>
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => navigate("/build-resume", { state: { template: template.id } })}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "16px",
                padding: windowWidth < 768 ? "24px" : "32px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                width: "100%",
                boxSizing: "border-box"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.borderColor = "#3b82f6";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
            >
              <div style={{
                background: template.premium ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: "12px",
                padding: windowWidth < 768 ? "16px" : "24px",
                marginBottom: "24px",
                minHeight: windowWidth < 768 ? "250px" : "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%"
              }}>
                <div style={{
                  background: "#ffffff",
                  borderRadius: "8px",
                  padding: windowWidth < 768 ? "12px" : "20px",
                  width: "100%",
                  maxWidth: windowWidth < 768 ? "200px" : "250px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  boxSizing: "border-box"
                }}>
                  <template.component
                    basicInfo={{ name: "John Doe", email: "john@example.com" }}
                    summary="Professional summary example"
                    experience={[{ company: "Company", role: "Role", start: "2020", end: "2023", description: "Description" }]}
                    education={[{ school: "University", degree: "Degree", start: "2016", end: "2020" }]}
                    skills={["Skill 1", "Skill 2", "Skill 3"]}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div style={{ width: "100%" }}>
                  <h3 style={{
                    fontSize: windowWidth < 768 ? "1.2rem" : "1.5rem",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "8px"
                  }}>
                    {template.name}
                    {template.premium && (
                      <span style={{
                        marginLeft: "8px",
                        fontSize: "0.9rem",
                        color: "#f59e0b",
                        fontWeight: "600"
                      }}>★ Premium</span>
                    )}
                  </h3>
                  <p style={{
                    fontSize: windowWidth < 768 ? "0.85rem" : "0.95rem",
                    color: "#64748b",
                    margin: 0
                  }}>
                    {template.description}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/build-resume", { state: { template: template.id } });
                }}
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: windowWidth < 768 ? "12px 20px" : "14px 24px",
                  backgroundColor: template.premium ? "#f59e0b" : "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: windowWidth < 768 ? "0.9rem" : "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = template.premium ? "#d97706" : "#2563eb";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = template.premium ? "#f59e0b" : "#3b82f6";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {template.premium ? "Unlock Premium" : "Use Template"}
              </button>
            </div>
          ))}
        </div>

        {/* FULL WIDTH CTA SECTION */}
        <div style={{
          textAlign: "center",
          padding: windowWidth < 768 ? "32px 24px" : "48px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box"
        }}>
          <h2 style={{
            fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "16px"
          }}>
            Ready to Build Your Resume?
          </h2>
          <p style={{
            fontSize: windowWidth < 768 ? "1rem" : "1.1rem",
            color: "#64748b",
            marginBottom: "32px"
          }}>
            Start building your professional resume with our easy-to-use builder
          </p>
          <button
            onClick={() => navigate("/build-resume")}
            style={{
              padding: windowWidth < 768 ? "14px 32px" : "16px 40px",
              backgroundColor: "#10b981",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontSize: windowWidth < 768 ? "1rem" : "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#059669";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#10b981";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.3)";
            }}
          >
            Start Building →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
