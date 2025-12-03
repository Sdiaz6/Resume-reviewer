import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClassicTemplate from "./Templates/ClassicTemplate";
import ModernTemplate from "./Templates/ModernTemplate";
import PremiumTemplate from "./Templates/PremiumTemplate";
import ContemporaryTemplate from "./Templates/ContemporaryTemplate";
import CurrentTemplate from "./Templates/CurrentTemplate";
import InnovativeTemplate from "./Templates/InnovativeTemplate";
import BasicTemplate from "./Templates/BasicTemplate";
import PolishedTemplate from "./Templates/PolishedTemplate";

const Templates = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedColor, setSelectedColor] = useState(null);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const colors = [
    { name: "Grey", value: "#6b7280" },
    { name: "Black", value: "#1f2937" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Yellow", value: "#f59e0b" },
    { name: "Red", value: "#ef4444" },
    { name: "Purple", value: "#8b5cf6" }
  ];

  const styles = ["All", "Professional", "Creative", "Modern", "Classic", "Minimalist"];

  const allTemplates = [
    {
      id: "contemporary",
      name: "Contemporary",
      description: "Perfect for management or business roles needing a polished format",
      component: ContemporaryTemplate,
      category: "Professional",
      premium: false,
      defaultColor: "#10b981"
    },
    {
      id: "current",
      name: "Current",
      description: "Ideal for fast-paced industries like tech or product management",
      component: CurrentTemplate,
      category: "Modern",
      premium: false,
      defaultColor: "#2563eb"
    },
    {
      id: "innovative",
      name: "Innovative",
      description: "For artists or creatives wanting a visually engaging resume",
      component: InnovativeTemplate,
      category: "Creative",
      premium: false,
      defaultColor: "#10b981"
    },
    {
      id: "basic",
      name: "Basic",
      description: "For senior professionals highlighting career achievements",
      component: BasicTemplate,
      category: "Classic",
      premium: false,
      defaultColor: "#3b82f6"
    },
    {
      id: "polished",
      name: "Polished",
      description: "For entry-level roles where clarity and simplicity are key",
      component: PolishedTemplate,
      category: "Minimalist",
      premium: false,
      defaultColor: "#3b82f6"
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional and professional layout perfect for any industry",
      component: ClassicTemplate,
      category: "Classic",
      premium: false,
      defaultColor: "#1f2937"
    },
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design with modern typography",
      component: ModernTemplate,
      category: "Modern",
      premium: false,
      defaultColor: "#3b82f6"
    },
    {
      id: "premium",
      name: "Premium",
      description: "Elegant design with enhanced visual appeal",
      component: PremiumTemplate,
      category: "Professional",
      premium: true,
      defaultColor: "#f59e0b"
    }
  ];

  const filteredTemplates = allTemplates.filter(template => {
    const styleMatch = selectedStyle === "All" || template.category === selectedStyle;
    return styleMatch;
  });

  const getPadding = () => {
    if (windowWidth < 768) return "40px 16px";
    if (windowWidth < 1024) return "60px 24px";
    if (windowWidth < 1440) return "80px 32px";
    return "100px 40px";
  };

  const getGridColumns = () => {
    if (windowWidth < 768) return "1fr";
    if (windowWidth < 1024) return "repeat(2, 1fr)";
    if (windowWidth < 1920) return "repeat(3, 1fr)";
    return "repeat(4, 1fr)";
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      width: "100vw",
      maxWidth: "100vw",
      overflowX: "hidden",
      backgroundColor: "#f8fafc",
      position: "relative",
      margin: 0,
      padding: 0
    }}>
      <div style={{ 
        width: "100%",
        maxWidth: "100%",
        padding: getPadding(), 
        margin: 0,
        position: "relative", 
        zIndex: 1,
        boxSizing: "border-box"
      }}>
        {/* Header */}
        <header style={{ 
          textAlign: "center", 
          padding: windowWidth < 768 ? "40px 0" : "60px 0",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <h1 style={{
            fontSize: windowWidth < 768 ? "2rem" : windowWidth < 1024 ? "2.5rem" : "3rem",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "16px",
            letterSpacing: "-1px"
          }}>
            Resume Templates
          </h1>
          <p style={{
            fontSize: windowWidth < 768 ? "1rem" : "1.1rem",
            color: "#64748b",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            Choose from professional resume templates designed for every industry
          </p>
        </header>

        {/* Filters Section */}
        <div style={{
          display: "flex",
          flexDirection: windowWidth < 768 ? "column" : "row",
          gap: "24px",
          marginBottom: "40px",
          alignItems: windowWidth < 768 ? "stretch" : "center",
          justifyContent: "space-between",
          padding: windowWidth < 768 ? "0" : "0 20px"
        }}>
          {/* Style Filter */}
          <div style={{ position: "relative", flex: windowWidth < 768 ? "1" : "0 0 auto" }}>
            <div
              onClick={() => setShowStyleDropdown(!showStyleDropdown)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                backgroundColor: "#ffffff",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                cursor: "pointer",
                minWidth: windowWidth < 768 ? "100%" : "200px",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <span style={{ fontSize: "1rem", fontWeight: "600", color: "#0f172a" }}>
                Style: {selectedStyle}
              </span>
              <span style={{ fontSize: "1.2rem", color: "#64748b" }}>
                {showStyleDropdown ? "▲" : "▼"}
              </span>
            </div>
            {showStyleDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "8px",
                backgroundColor: "#ffffff",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                zIndex: 100,
                overflow: "hidden"
              }}>
                {styles.map((style) => (
                  <div
                    key={style}
                    onClick={() => {
                      setSelectedStyle(style);
                      setShowStyleDropdown(false);
                    }}
                    style={{
                      padding: "12px 20px",
                      cursor: "pointer",
                      backgroundColor: selectedStyle === style ? "#eff6ff" : "#ffffff",
                      color: selectedStyle === style ? "#3b82f6" : "#0f172a",
                      fontWeight: selectedStyle === style ? "600" : "500",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      if (selectedStyle !== style) {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedStyle !== style) {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                      }
                    }}
                  >
                    {style}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Color Options */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            flex: windowWidth < 768 ? "1" : "0 0 auto"
          }}>
            <span style={{ fontSize: "1rem", fontWeight: "600", color: "#0f172a", whiteSpace: "nowrap" }}>
              Colors:
            </span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(selectedColor === color.value ? null : color.value)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: color.value,
                    border: selectedColor === color.value ? "3px solid #3b82f6" : "2px solid #e5e7eb",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: selectedColor === color.value ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "none"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    if (selectedColor !== color.value) {
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: getGridColumns(),
          gap: windowWidth < 768 ? "24px" : "32px",
          marginBottom: "60px",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          padding: windowWidth < 768 ? "0" : "0 20px"
        }}>
          {filteredTemplates.map((template) => {
            const templateColor = selectedColor || template.defaultColor;
            return (
              <div
                key={template.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: windowWidth < 768 ? "20px" : "24px",
                  border: "2px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
                  e.currentTarget.style.borderColor = templateColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                {/* Template Preview */}
                <div style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  padding: windowWidth < 768 ? "12px" : "16px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: windowWidth < 768 ? "220px" : "260px",
                  maxHeight: windowWidth < 768 ? "240px" : "280px",
                  overflow: "hidden",
                  position: "relative"
                }}>
                  <div style={{
                    background: "#ffffff",
                    borderRadius: "8px",
                    padding: windowWidth < 768 ? "8px" : "12px",
                    width: "100%",
                    maxWidth: windowWidth < 768 ? "180px" : "220px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    boxSizing: "border-box",
                    transform: "scale(0.85)",
                    transformOrigin: "top center"
                  }}>
                    <template.component
                      basicInfo={{ name: "John Doe", email: "john@example.com" }}
                      summary="Professional summary example"
                      experience={[{ company: "Company", role: "Role", start: "2020", end: "2023", description: "Description" }]}
                      education={[{ school: "University", degree: "Degree", start: "2016", end: "2020" }]}
                      skills={["Skill 1", "Skill 2", "Skill 3"]}
                      color={templateColor}
                    />
                  </div>
                </div>

                {/* Template Info */}
                <div style={{ 
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px"
                    }}>
                      <h3 style={{
                        fontSize: windowWidth < 768 ? "1.2rem" : "1.4rem",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: 0
                      }}>
                        {template.name}
                      </h3>
                      {template.premium && (
                        <span style={{
                          fontSize: "0.75rem",
                          color: "#f59e0b",
                          fontWeight: "700",
                          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                          padding: "4px 10px",
                          borderRadius: "12px"
                        }}>
                          ★ Premium
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: windowWidth < 768 ? "0.875rem" : "0.95rem",
                      color: "#64748b",
                      margin: 0,
                      lineHeight: "1.5",
                      marginBottom: "20px"
                    }}>
                      {template.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/build-resume", { state: { template: template.id, color: templateColor } });
                    }}
                    style={{
                      width: "100%",
                      padding: windowWidth < 768 ? "12px 20px" : "14px 24px",
                      backgroundColor: templateColor,
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: windowWidth < 768 ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxSizing: "border-box",
                      marginTop: "auto"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = "0.9";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = "1";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {template.premium ? "Unlock Premium" : "Use This Template"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Templates;
