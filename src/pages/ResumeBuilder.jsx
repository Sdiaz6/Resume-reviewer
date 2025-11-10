import React, { useState, useEffect, useCallback, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import RichTextEditor from "../components/RichTextEditor";

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [atsScore, setAtsScore] = useState(null);
  const [atsWarnings, setAtsWarnings] = useState([]);
  const [lastSaved, setLastSaved] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({
    header: false,
    summary: false,
    experience: false,
    education: false,
    skills: false,
    projects: false
  });
  const [visibility, setVisibility] = useState({
    phone: true,
    linkedin: true,
    github: false,
    address: true,
    fullUrls: true
  });
  const previewRef = React.useRef();
  const previewContainerRef = React.useRef();
  const [previewScale, setPreviewScale] = useState(1);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      portfolio: "",
      address: "",
      summary: ""
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      certifications: []
    },
    projects: []
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleVisibility = (field) => {
    setVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Handle window resize - Full responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate preview scale to fit A4 in container
  useEffect(() => {
    const calculateScale = () => {
      if (!previewContainerRef.current || !isDesktop) return;
      const container = previewContainerRef.current;
      const containerWidth = container.clientWidth - 40; // padding
      const containerHeight = container.clientHeight - 40;
      
      // A4 dimensions in pixels at 96 DPI
      const a4Width = 210 * 3.779527559; // 210mm to pixels
      const a4Height = 297 * 3.779527559; // 297mm to pixels
      
      // Calculate scale to fit both width and height
      const scaleX = containerWidth / a4Width;
      const scaleY = containerHeight / a4Height;
      const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
      
      setPreviewScale(scale);
    };
    
    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [isDesktop]);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resumeBuilderData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setResumeData(parsed);
      if (parsed.visibility) setVisibility(parsed.visibility);
    }
  }, []);

  // Debounce auto-save and ATS checks to prevent excessive re-renders during typing
  const autoSaveTimeoutRef = useRef(null);
  
  useEffect(() => {
    // Clear any pending auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    // Debounce to prevent re-renders while user is actively typing
    autoSaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem("resumeBuilderData", JSON.stringify({ ...resumeData, visibility }));
      // Check ATS compatibility whenever data changes
      const result = checkATSCompatibility(resumeData);
      setAtsScore(result.score);
      setAtsWarnings(result.warnings);
      // Update last saved time
      setLastSaved(new Date().toLocaleTimeString());
    }, 1000); // 1 second debounce - longer than editor's 400ms
  }, [resumeData, visibility]);

  // PDF Export
  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageWidth;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData.personalInfo.fullName || "resume"}-resume.pdf`);
  };

  // Print
  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: `${resumeData.personalInfo.fullName || "resume"}-resume`
  });

  const handlePrintClick = () => {
    handlePrint();
  };

  // ATS Compatibility Checker
  const checkATSCompatibility = (data) => {
    let score = 100;
    const warnings = [];

    // Check personal info
    if (!data.personalInfo.fullName) {
      score -= 10;
      warnings.push("Missing full name");
    }
    if (!data.personalInfo.email) {
      score -= 10;
      warnings.push("Missing email address");
    }
    if (!data.personalInfo.summary || (typeof data.personalInfo.summary === 'string' && data.personalInfo.summary.replace(/<[^>]*>/g, '').length < 50)) {
      score -= 5;
      warnings.push("Professional summary is too short or missing");
    }

    // Check experience
    if (data.experience.length === 0) {
      score -= 15;
      warnings.push("No work experience added");
    } else {
      data.experience.forEach((exp, index) => {
        if (!exp.jobTitle || !exp.company) {
          score -= 5;
          warnings.push(`Experience ${index + 1}: Missing job title or company`);
        }
        if (!exp.startDate) {
          score -= 3;
          warnings.push(`Experience ${index + 1}: Missing start date`);
        }
        if (!exp.responsibilities || exp.responsibilities.length === 0 || exp.responsibilities.every(r => !r.trim())) {
          score -= 5;
          warnings.push(`Experience ${index + 1}: Missing job responsibilities`);
        }
        // Check for quantifiable achievements
        const hasNumbers = /\d+/.test(exp.achievements || "");
        if (!hasNumbers && (!exp.achievements || exp.achievements.length < 10)) {
          warnings.push(`Experience ${index + 1}: Consider adding quantifiable achievements (e.g., "increased sales by 25%")`);
        }
        // Check for action verbs
        const actionVerbs = /(led|managed|developed|created|implemented|increased|improved|achieved|delivered|executed|designed|built|optimized)/i;
        const responsibilitiesText = (exp.responsibilities || []).join(" ");
        if (!actionVerbs.test(responsibilitiesText)) {
          warnings.push(`Experience ${index + 1}: Use stronger action verbs (Led, Managed, Developed, etc.)`);
        }
      });
    }

    // Check education
    if (data.education.length === 0) {
      score -= 10;
      warnings.push("No education added");
    } else {
      data.education.forEach((edu, index) => {
        if (!edu.degree || !edu.institution) {
          score -= 5;
          warnings.push(`Education ${index + 1}: Missing degree or institution`);
        }
      });
    }

    // Check skills
    if (data.skills.technical.length === 0) {
      score -= 10;
      warnings.push("No technical skills added");
    }

    // Ensure score doesn't go below 0
    score = Math.max(0, score);

    return { score, warnings: [...new Set(warnings)] };
  };

  // Stable callback ref for summary updates - never changes
  const summaryOnChangeRef = useRef(null);
  const summaryUpdateTimeoutRef = useRef(null);
  
  useEffect(() => {
    summaryOnChangeRef.current = (value) => {
      // Debounce state updates to prevent excessive re-renders
      if (summaryUpdateTimeoutRef.current) {
        clearTimeout(summaryUpdateTimeoutRef.current);
      }
      summaryUpdateTimeoutRef.current = setTimeout(() => {
        setResumeData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, summary: value }
        }));
      }, 500); // Longer debounce to prevent re-renders during typing
    };
  }, []);

  // Stable callback for RichTextEditor onChange - never changes
  const handleSummaryChange = useCallback((value) => {
    if (summaryOnChangeRef.current) {
      summaryOnChangeRef.current(value);
    }
  }, []);

  const updatePersonalInfo = useCallback((field, value) => {
    if (field === "summary") {
      // For summary, use the ref callback directly - no debouncing
      if (summaryOnChangeRef.current) {
        summaryOnChangeRef.current(value);
      }
    } else {
      // For other fields, update immediately
      setResumeData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value }
      }));
    }
  }, []);

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        responsibilities: [""],
        achievements: ""
      }]
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: "",
        institution: "",
        location: "",
        graduationDate: "",
        gpa: "",
        coursework: ""
      }]
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateSkills = (category, skills) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: skills }
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: "",
        description: "",
        technologies: "",
        link: ""
      }]
    }));
  };

  const updateProject = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Collapsible Section Component
  const CollapsibleSection = ({ title, isCollapsed, onToggle, children, icon }) => (
    <div style={{
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginBottom: "15px",
      overflow: "hidden"
    }}>
      <div
        onClick={onToggle}
        style={{
          padding: "18px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.05)",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px" }}>{icon}</span>
          <h3 style={{ color: "#ffffff", margin: 0, fontSize: "18px", fontWeight: "600" }}>
            {title}
          </h3>
        </div>
        <span style={{ color: "#ffffff", fontSize: "18px", transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s ease" }}>
          ▼
        </span>
      </div>
      {!isCollapsed && (
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ 
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #581c87 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Top Navigation Bar */}
      <nav style={{
        background: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(10px)",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        flexShrink: 0,
        zIndex: 100
      }}>
        <Link to="/" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
          textDecoration: "none",
          color: "#ffffff",
          fontWeight: "700",
          fontSize: "20px"
        }}>
          <span>📋</span>
          <span>RESUME REVIEW</span>
        </Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/" className="nav-link" style={{ color: "#ffffff", textDecoration: "none", fontSize: "14px" }}>Home</Link>
          <Link to="/about" className="nav-link" style={{ color: "#ffffff", textDecoration: "none", fontSize: "14px" }}>About Us</Link>
          <Link to="/resume-rater" className="nav-link" style={{ color: "#ffffff", textDecoration: "none", fontSize: "14px" }}>Review Tool</Link>
          <Link to="/build-resume" className="nav-link" style={{ color: "#ffffff", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Build Resume</Link>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ 
        flex: 1,
        display: "grid",
        gridTemplateColumns: isDesktop ? "42% 58%" : "1fr",
        gap: 0,
        height: "100%",
        overflow: "hidden"
      }}>
        {/* Left Panel - Resume Builder (Simplify Style) */}
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          padding: isDesktop ? "25px" : "15px",
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%"
        }}>
          {/* Header - Auto-save indicator */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: "25px",
            paddingBottom: "20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <h2 style={{ color: "#ffffff", margin: 0, fontSize: isDesktop ? "24px" : "20px", fontWeight: "700" }}>
              {resumeData.personalInfo.fullName || "New Resume"}
            </h2>
            {lastSaved && (
              <div style={{ 
                color: "#94a3b8", 
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}>
                <span>💾</span>
                <span>Saved {lastSaved}</span>
              </div>
            )}
          </div>

          {/* ATS Score Banner */}
          {atsScore !== null && (
            <div style={{
              background: atsScore >= 80 
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : atsScore >= 60
                ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              padding: "15px 20px",
              borderRadius: "12px",
              marginBottom: "25px",
              color: "#ffffff"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <div style={{ fontSize: "12px", opacity: 0.9, marginBottom: "3px" }}>ATS Compatibility</div>
                  <div style={{ fontSize: "28px", fontWeight: "800" }}>{atsScore}/100</div>
                </div>
                {atsWarnings.length > 0 && (
                  <div style={{ fontSize: "13px" }}>
                    {atsWarnings.length} {atsWarnings.length === 1 ? "issue" : "issues"}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resume Header Section - Collapsible */}
          <CollapsibleSection
            title="Resume Header"
            icon="📋"
            isCollapsed={collapsedSections.header}
            onToggle={() => toggleSection("header")}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input
                type="text"
                placeholder="Full Name *"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email *"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Location (e.g., DeLand, FL, USA)"
                value={resumeData.personalInfo.address}
                onChange={(e) => updatePersonalInfo("address", e.target.value)}
                style={inputStyle}
              />
              
              {/* Toggle Options */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "10px",
                marginTop: "10px"
              }}>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "14px"
                }}>
                  <input
                    type="checkbox"
                    checked={visibility.phone}
                    onChange={() => toggleVisibility("phone")}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{visibility.phone ? "Hide" : "Show"} Phone</span>
                </label>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "14px"
                }}>
                  <input
                    type="checkbox"
                    checked={visibility.linkedin}
                    onChange={() => toggleVisibility("linkedin")}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{visibility.linkedin ? "Hide" : "Show"} LinkedIn</span>
                </label>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "14px"
                }}>
                  <input
                    type="checkbox"
                    checked={visibility.github}
                    onChange={() => toggleVisibility("github")}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{visibility.github ? "Hide" : "Show"} GitHub</span>
                </label>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "14px"
                }}>
                  <input
                    type="checkbox"
                    checked={visibility.address}
                    onChange={() => toggleVisibility("address")}
                    style={{ cursor: "pointer" }}
                  />
                  <span>{visibility.address ? "Hide" : "Show"} Location</span>
                </label>
              </div>

              {visibility.phone && (
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  style={inputStyle}
                />
              )}
              {(visibility.linkedin || !resumeData.personalInfo.linkedin) && (
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                  style={inputStyle}
                />
              )}
              {(visibility.github || !resumeData.personalInfo.github) && (
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo("github", e.target.value)}
                  style={inputStyle}
                />
              )}
              <label style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "14px",
                marginTop: "5px"
              }}>
                <input
                  type="checkbox"
                  checked={visibility.fullUrls}
                  onChange={() => toggleVisibility("fullUrls")}
                  style={{ cursor: "pointer" }}
                />
                <span>Show Full URLs</span>
              </label>
            </div>
          </CollapsibleSection>

          {/* Professional Summary - Collapsible with Rich Text Editor */}
          <CollapsibleSection
            title="Professional Summary"
            icon="📝"
            isCollapsed={collapsedSections.summary}
            onToggle={() => toggleSection("summary")}
          >
            <div>
              <RichTextEditor
                value={resumeData.personalInfo.summary || ""}
                onChange={handleSummaryChange}
                placeholder="Write a summary about yourself"
              />
              <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => toggleSection("summary")}
                  style={{
                    padding: "8px 16px",
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "13px"
                  }}
                >
                  Hide Summary
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Professional Experience - Collapsible */}
          <CollapsibleSection
            title="Professional Experience"
            icon="💼"
            isCollapsed={collapsedSections.experience}
            onToggle={() => toggleSection("experience")}
          >
            <div>
              <button 
                onClick={addExperience} 
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  marginBottom: "20px"
                }}
              >
                + Add Experience
              </button>
              {resumeData.experience.length === 0 ? (
                <p style={{ color: "#94a3b8", textAlign: "center", padding: "30px" }}>
                  No experience added yet. Click "Add Experience" to get started.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      padding: "20px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <h4 style={{ color: "#ffffff", margin: 0 }}>Experience #{index + 1}</h4>
                        {resumeData.experience.length > 1 && (
                          <button
                            onClick={() => removeExperience(index)}
                            style={{
                              background: "#f5576c",
                              color: "#ffffff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "12px" }}>
                        <input
                          type="text"
                          placeholder="Job Title *"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(index, "jobTitle", e.target.value)}
                          style={inputStyle}
                        />
                        <input
                          type="text"
                          placeholder="Company *"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          style={inputStyle}
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={exp.location}
                          onChange={(e) => updateExperience(index, "location", e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "12px" }}>
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                          style={inputStyle}
                        />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                          style={inputStyle}
                          disabled={exp.current}
                        />
                        <label style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "8px", 
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}>
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(index, "current", e.target.checked)}
                          />
                          Currently working here
                        </label>
                      </div>
                      <textarea
                        placeholder="Responsibilities (one per line) *"
                        value={exp.responsibilities?.join("\n") || ""}
                        onChange={(e) => updateExperience(index, "responsibilities", e.target.value.split("\n"))}
                        style={{ ...inputStyle, minHeight: "100px", resize: "vertical", marginBottom: "12px" }}
                      />
                      <textarea
                        placeholder="Key Achievements (quantifiable results)"
                        value={exp.achievements}
                        onChange={(e) => updateExperience(index, "achievements", e.target.value)}
                        style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CollapsibleSection>

          {/* Education - Collapsible */}
          <CollapsibleSection
            title="Education"
            icon="🎓"
            isCollapsed={collapsedSections.education}
            onToggle={() => toggleSection("education")}
          >
            <div>
              <button 
                onClick={addEducation} 
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  marginBottom: "20px"
                }}
              >
                + Add Education
              </button>
              {resumeData.education.length === 0 ? (
                <p style={{ color: "#94a3b8", textAlign: "center", padding: "30px" }}>
                  No education added yet. Click "Add Education" to get started.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      padding: "20px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <h4 style={{ color: "#ffffff", margin: 0 }}>Education #{index + 1}</h4>
                        {resumeData.education.length > 1 && (
                          <button
                            onClick={() => removeEducation(index)}
                            style={{
                              background: "#f5576c",
                              color: "#ffffff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                        <input
                          type="text"
                          placeholder="Degree *"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          style={inputStyle}
                        />
                        <input
                          type="text"
                          placeholder="Institution *"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          style={inputStyle}
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={edu.location}
                          onChange={(e) => updateEducation(index, "location", e.target.value)}
                          style={inputStyle}
                        />
                        <input
                          type="month"
                          placeholder="Graduation Date"
                          value={edu.graduationDate}
                          onChange={(e) => updateEducation(index, "graduationDate", e.target.value)}
                          style={inputStyle}
                        />
                        <input
                          type="text"
                          placeholder="GPA (optional)"
                          value={edu.gpa}
                          onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                          style={inputStyle}
                        />
                        <textarea
                          placeholder="Relevant Coursework (optional)"
                          value={edu.coursework}
                          onChange={(e) => updateEducation(index, "coursework", e.target.value)}
                          style={{ ...inputStyle, minHeight: "80px", resize: "vertical", gridColumn: "1 / -1" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CollapsibleSection>

          {/* Skills - Collapsible */}
          <CollapsibleSection
            title="Skills"
            icon="🛠️"
            isCollapsed={collapsedSections.skills}
            onToggle={() => toggleSection("skills")}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ color: "#ffffff", display: "block", marginBottom: "10px", fontWeight: "600" }}>
                  Technical Skills (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., JavaScript, React, Python, Node.js"
                  value={resumeData.skills.technical.join(", ")}
                  onChange={(e) => updateSkills("technical", e.target.value.split(",").map(s => s.trim()).filter(s => s))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ color: "#ffffff", display: "block", marginBottom: "10px", fontWeight: "600" }}>
                  Soft Skills (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Leadership, Communication, Problem Solving"
                  value={resumeData.skills.soft.join(", ")}
                  onChange={(e) => updateSkills("soft", e.target.value.split(",").map(s => s.trim()).filter(s => s))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ color: "#ffffff", display: "block", marginBottom: "10px", fontWeight: "600" }}>
                  Languages (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., English (Native), Spanish (Fluent)"
                  value={resumeData.skills.languages.join(", ")}
                  onChange={(e) => updateSkills("languages", e.target.value.split(",").map(s => s.trim()).filter(s => s))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ color: "#ffffff", display: "block", marginBottom: "10px", fontWeight: "600" }}>
                  Certifications (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., AWS Certified, PMP Certification"
                  value={resumeData.skills.certifications.join(", ")}
                  onChange={(e) => updateSkills("certifications", e.target.value.split(",").map(s => s.trim()).filter(s => s))}
                  style={inputStyle}
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Projects - Collapsible */}
          <CollapsibleSection
            title="Projects & Outside Experience"
            icon="🚀"
            isCollapsed={collapsedSections.projects}
            onToggle={() => toggleSection("projects")}
          >
            <div>
              <button 
                onClick={addProject} 
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  marginBottom: "20px"
                }}
              >
                + Add Project
              </button>
              {resumeData.projects.length === 0 ? (
                <p style={{ color: "#94a3b8", textAlign: "center", padding: "30px" }}>
                  No projects added yet. This section is optional.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {resumeData.projects.map((proj, index) => (
                    <div key={index} style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      padding: "20px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <h4 style={{ color: "#ffffff", margin: 0 }}>Project #{index + 1}</h4>
                        <button
                          onClick={() => removeProject(index)}
                          style={{
                            background: "#f5576c",
                            color: "#ffffff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px"
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Project Name *"
                        value={proj.name}
                        onChange={(e) => updateProject(index, "name", e.target.value)}
                        style={{ ...inputStyle, marginBottom: "12px" }}
                      />
                      <textarea
                        placeholder="Description *"
                        value={proj.description}
                        onChange={(e) => updateProject(index, "description", e.target.value)}
                        style={{ ...inputStyle, minHeight: "100px", resize: "vertical", marginBottom: "12px" }}
                      />
                      <input
                        type="text"
                        placeholder="Technologies Used (comma-separated)"
                        value={proj.technologies}
                        onChange={(e) => updateProject(index, "technologies", e.target.value)}
                        style={{ ...inputStyle, marginBottom: "12px" }}
                      />
                      <input
                        type="url"
                        placeholder="Project Link / GitHub URL"
                        value={proj.link}
                        onChange={(e) => updateProject(index, "link", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CollapsibleSection>

          {/* Template Selector */}
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "20px",
            marginTop: "15px"
          }}>
            <h3 style={{ color: "#ffffff", marginBottom: "15px", fontSize: "18px", fontWeight: "600" }}>
              🎨 Choose Template
            </h3>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
              gap: "12px" 
            }}>
              {[
                { id: "modern", name: "Modern" },
                { id: "classic", name: "Classic" },
                { id: "technical", name: "Technical" },
                { id: "executive", name: "Executive" }
              ].map(template => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  style={{
                    background: selectedTemplate === template.id
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "rgba(255, 255, 255, 0.05)",
                    padding: "12px",
                    borderRadius: "8px",
                    border: selectedTemplate === template.id
                      ? "2px solid #667eea"
                      : "2px solid rgba(255, 255, 255, 0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "center"
                  }}
                >
                  <div style={{ color: "#ffffff", fontSize: "14px", fontWeight: "600" }}>{template.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview (Desktop) or Below (Mobile) */}
        {isDesktop ? (
          <div style={{
            background: "#e5e7eb",
            padding: "0",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "15px 25px",
              background: "#ffffff",
              borderBottom: "2px solid #e2e8f0",
              zIndex: 10,
              flexShrink: 0
            }}>
              <h3 style={{ color: "#1e293b", margin: 0, fontSize: "16px", fontWeight: "700" }}>Live Preview</h3>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={handlePrintClick}
                  style={{
                    padding: "8px 16px",
                    background: "#667eea",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}
                >
                  Print
                </button>
                <button
                  onClick={handleExportPDF}
                  style={{
                    padding: "8px 16px",
                    background: "#f5576c",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}
                >
                  Export PDF
                </button>
              </div>
            </div>
            <div 
              ref={previewContainerRef}
              style={{ 
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "20px",
                overflow: "auto",
                background: "#e5e7eb"
              }}
            >
              <div ref={previewRef} style={{ 
                width: "210mm",
                height: "297mm",
                background: "#ffffff",
                padding: "20mm",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                position: "relative",
                transform: `scale(${previewScale})`,
                transformOrigin: "top center",
                marginTop: "20px"
              }}>
                <ResumePreview data={resumeData} template={selectedTemplate} visibility={visibility} />
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            marginTop: "20px",
            background: "#e5e7eb",
            padding: "0",
            overflow: "hidden",
            borderRadius: "12px"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "15px 20px",
              background: "#ffffff",
              borderBottom: "2px solid #e2e8f0",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <h3 style={{ color: "#1e293b", margin: 0, fontSize: "16px", fontWeight: "700" }}>Live Preview</h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  onClick={handlePrintClick}
                  style={{
                    padding: "8px 16px",
                    background: "#667eea",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    whiteSpace: "nowrap"
                  }}
                >
                  Print
                </button>
                <button
                  onClick={handleExportPDF}
                  style={{
                    padding: "8px 16px",
                    background: "#f5576c",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    whiteSpace: "nowrap"
                  }}
                >
                  Export PDF
                </button>
              </div>
            </div>
            <div style={{ 
              padding: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              background: "#e5e7eb",
              overflowX: "auto",
              overflowY: "auto"
            }}>
              <div ref={previewRef} style={{ 
                width: "210mm",
                height: "297mm",
                minHeight: "297mm",
                background: "#ffffff",
                padding: "20mm",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                position: "relative"
              }}>
                <ResumePreview data={resumeData} template={selectedTemplate} visibility={visibility} />
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

// Resume Preview Component with Template Support and Visibility Controls
const ResumePreview = ({ data, template, visibility }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  // Template styles
  const templateStyles = {
    modern: {
      primaryColor: "#667eea",
      headerColor: "#667eea",
      accentColor: "#764ba2",
      borderStyle: "2px solid #667eea",
      headerFont: "'Inter', sans-serif",
      bodyFont: "'Inter', sans-serif"
    },
    classic: {
      primaryColor: "#1e293b",
      headerColor: "#1e293b",
      accentColor: "#475569",
      borderStyle: "1px solid #cbd5e1",
      headerFont: "'Playfair Display', serif",
      bodyFont: "'Source Sans Pro', sans-serif"
    },
    technical: {
      primaryColor: "#3b82f6",
      headerColor: "#3b82f6",
      accentColor: "#2563eb",
      borderStyle: "2px solid #3b82f6",
      headerFont: "'Montserrat', sans-serif",
      bodyFont: "'Roboto', sans-serif"
    },
    executive: {
      primaryColor: "#1e293b",
      headerColor: "#1e293b",
      accentColor: "#475569",
      borderStyle: "1px solid #94a3b8",
      headerFont: "'Playfair Display', serif",
      bodyFont: "'Source Sans Pro', sans-serif"
    }
  };

  const styles = templateStyles[template] || templateStyles.modern;

  // Get contact info based on visibility
  const getContactInfo = () => {
    const contacts = [];
    if (visibility.phone && data.personalInfo.phone) {
      contacts.push(data.personalInfo.phone);
    }
    if (data.personalInfo.email) {
      contacts.push(data.personalInfo.email);
    }
    if (visibility.address && data.personalInfo.address) {
      contacts.push(data.personalInfo.address);
    }
    if (visibility.linkedin && data.personalInfo.linkedin) {
      contacts.push(visibility.fullUrls ? data.personalInfo.linkedin : "LinkedIn");
    }
    if (visibility.github && data.personalInfo.github) {
      contacts.push(visibility.fullUrls ? data.personalInfo.github : "GitHub");
    }
    return contacts;
  };

  return (
    <div style={{ 
      fontFamily: styles.bodyFont,
      color: "#1e293b",
      lineHeight: "1.7",
      fontSize: "11pt",
      width: "100%",
      height: "100%",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header - ATS Friendly, Big and Formal */}
      <div style={{ 
        borderBottom: styles.borderStyle, 
        paddingBottom: "8pt", 
        marginBottom: "10pt" 
      }}>
        <h1 style={{ 
          fontSize: "24pt", 
          marginBottom: "8px", 
          color: "#1e293b",
          fontFamily: styles.headerFont,
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          lineHeight: "1.2",
          marginTop: "0"
        }}>
          {data.personalInfo.fullName?.toUpperCase() || "YOUR NAME"}
        </h1>
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "12px", 
          fontSize: "9pt", 
          color: "#475569",
          fontFamily: styles.bodyFont,
          fontWeight: "400"
        }}>
          {getContactInfo().map((contact, i) => (
            <span key={i}>{contact}</span>
          ))}
        </div>
      </div>

      {/* Summary - ATS Standard Section */}
      {data.personalInfo.summary && (
        <div style={{ marginBottom: "12pt" }}>
          <h2 style={{ 
            fontSize: "11pt", 
            marginBottom: "6pt", 
            color: "#1e293b",
            fontFamily: styles.headerFont,
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            borderBottom: "1.5pt solid #1e293b",
            paddingBottom: "3pt",
            marginTop: "0"
          }}>PROFESSIONAL SUMMARY</h2>
          <div 
            style={{ 
              fontSize: "10pt",
              fontFamily: styles.bodyFont,
              lineHeight: "1.5",
              color: "#1e293b",
              marginTop: "4pt"
            }}
            dangerouslySetInnerHTML={{ __html: data.personalInfo.summary }}
          />
        </div>
      )}

      {/* Experience - ATS Standard Format */}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: "12pt" }}>
          <h2 style={{ 
            fontSize: "11pt", 
            marginBottom: "8pt", 
            color: "#1e293b",
            fontFamily: styles.headerFont,
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            borderBottom: "1.5pt solid #1e293b",
            paddingBottom: "3pt",
            marginTop: "0"
          }}>PROFESSIONAL EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: "10pt" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4pt", flexWrap: "wrap" }}>
                <div style={{ flex: "1", minWidth: "200px" }}>
                  <div style={{ fontSize: "10.5pt", fontWeight: "700", color: "#1e293b", marginBottom: "2pt" }}>
                    {exp.jobTitle?.toUpperCase() || "JOB TITLE"}
                  </div>
                  <div style={{ fontSize: "9.5pt", color: "#475569", fontWeight: "600" }}>
                    {exp.company || "Company Name"} {exp.location && `• ${exp.location}`}
                  </div>
                </div>
                <div style={{ fontSize: "9pt", color: "#64748b", fontWeight: "500", whiteSpace: "nowrap", marginLeft: "8pt" }}>
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul style={{ 
                  fontSize: "9.5pt", 
                  paddingLeft: "18pt", 
                  margin: "4pt 0 0 0",
                  lineHeight: "1.4",
                  color: "#1e293b"
                }}>
                  {exp.responsibilities.filter(r => r && r.trim()).map((resp, i) => (
                    <li key={i} style={{ marginBottom: "3pt" }}>{resp}</li>
                  ))}
                </ul>
              )}
              {exp.achievements && exp.achievements.trim() && (
                <div style={{ marginTop: "6pt", fontSize: "9pt", color: "#475569", fontStyle: "italic" }}>
                  <strong>Achievements: </strong>{exp.achievements}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education - ATS Standard Format */}
      {data.education.length > 0 && (
        <div style={{ marginBottom: "12pt" }}>
          <h2 style={{ 
            fontSize: "11pt", 
            marginBottom: "8pt", 
            color: "#1e293b",
            fontFamily: styles.headerFont,
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            borderBottom: "1.5pt solid #1e293b",
            paddingBottom: "3pt",
            marginTop: "0"
          }}>EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: "8pt" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: "1", minWidth: "200px" }}>
                  <div style={{ fontSize: "10.5pt", fontWeight: "700", color: "#1e293b", marginBottom: "2pt" }}>
                    {edu.degree || "Degree"}
                  </div>
                  <div style={{ fontSize: "9.5pt", color: "#475569", fontWeight: "600" }}>
                    {edu.institution || "Institution"}
                    {edu.location && ` • ${edu.location}`}
                  </div>
                </div>
                {edu.graduationDate && (
                  <div style={{ fontSize: "9pt", color: "#64748b", fontWeight: "500", whiteSpace: "nowrap", marginLeft: "8pt" }}>
                    {formatDate(edu.graduationDate + "-01")}
                  </div>
                )}
              </div>
              {edu.gpa && (
                <div style={{ fontSize: "9pt", color: "#475569", marginTop: "3pt" }}>
                  <strong>GPA: </strong>{edu.gpa}
                </div>
              )}
              {edu.coursework && (
                <div style={{ fontSize: "9pt", color: "#475569", marginTop: "4pt" }}>
                  <strong>Relevant Coursework: </strong>{edu.coursework}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills - ATS Keyword Rich */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0 || data.skills.certifications.length > 0) && (
        <div style={{ marginBottom: "12pt" }}>
          <h2 style={{ 
            fontSize: "11pt", 
            marginBottom: "8pt", 
            color: "#1e293b",
            fontFamily: styles.headerFont,
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            borderBottom: "1.5pt solid #1e293b",
            paddingBottom: "3pt",
            marginTop: "0"
          }}>SKILLS</h2>
          {data.skills.technical.length > 0 && (
            <div style={{ marginBottom: "6pt" }}>
              <strong style={{ fontSize: "10pt", color: "#1e293b" }}>Technical Skills: </strong>
              <span style={{ fontSize: "9.5pt", color: "#475569" }}>{data.skills.technical.join(", ")}</span>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div style={{ marginBottom: "6pt" }}>
              <strong style={{ fontSize: "10pt", color: "#1e293b" }}>Soft Skills: </strong>
              <span style={{ fontSize: "9.5pt", color: "#475569" }}>{data.skills.soft.join(", ")}</span>
            </div>
          )}
          {data.skills.languages.length > 0 && (
            <div style={{ marginBottom: "6pt" }}>
              <strong style={{ fontSize: "10pt", color: "#1e293b" }}>Languages: </strong>
              <span style={{ fontSize: "9.5pt", color: "#475569" }}>{data.skills.languages.join(", ")}</span>
            </div>
          )}
          {data.skills.certifications.length > 0 && (
            <div>
              <strong style={{ fontSize: "10pt", color: "#1e293b" }}>Certifications: </strong>
              <span style={{ fontSize: "9.5pt", color: "#475569" }}>{data.skills.certifications.join(", ")}</span>
            </div>
          )}
        </div>
      )}

      {/* Projects - ATS Format */}
      {data.projects.length > 0 && (
        <div style={{ marginBottom: "12pt" }}>
          <h2 style={{ 
            fontSize: "11pt", 
            marginBottom: "8pt", 
            color: "#1e293b",
            fontFamily: styles.headerFont,
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            borderBottom: "1.5pt solid #1e293b",
            paddingBottom: "3pt",
            marginTop: "0"
          }}>PROJECTS & OUTSIDE EXPERIENCE</h2>
          {data.projects.map((proj, index) => (
            <div key={index} style={{ marginBottom: "8pt" }}>
              <div style={{ fontSize: "10.5pt", fontWeight: "700", color: "#1e293b", marginBottom: "4pt" }}>
                {proj.name?.toUpperCase() || "PROJECT NAME"}
                {proj.technologies && (
                  <span style={{ fontSize: "9.5pt", fontWeight: "400", color: "#475569", marginLeft: "6pt" }}>
                    ({proj.technologies})
                  </span>
                )}
              </div>
              {proj.description && (
                <div style={{ fontSize: "9.5pt", color: "#1e293b", lineHeight: "1.4", marginTop: "4pt" }}>
                  {proj.description}
                </div>
              )}
              {proj.link && (
                <div style={{ fontSize: "9pt", color: "#3b82f6", marginTop: "3pt" }}>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "none" }}>
                    View Project →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "#ffffff",
  fontSize: "16px",
  fontFamily: "'Inter', sans-serif"
};

export default ResumeBuilder;
