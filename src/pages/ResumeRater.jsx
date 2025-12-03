// RESUME RATER 

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { analyzeResumeWithGemini } from "../config/gemini";
import { analyzeResumeWithDeepSeek } from "../config/deepseek";
import { readPDF } from "../utils/pdfReader";

function ResumeRater() {
  const { currentUser } = useAuth();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPadding = () => {
    if (windowWidth < 768) return "0 16px";
    if (windowWidth < 1024) return "0 24px";
    if (windowWidth < 1440) return "0 32px";
    return "0 40px";
  };
  // ALL STATE - Keeping everything from original
  const [file, setFile] = useState(null);
  const [previewContent, setPreviewContent] = useState("");
  const [scoreResult, setScoreResult] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const analysisSteps = [
    "Reading your resume...",
    "Analyzing content structure...",
    "Checking keyword optimization...",
    "Evaluating formatting...",
    "Assessing ATS compatibility...",
    "Generating personalized feedback..."
  ];

  // ALL ORIGINAL FUNCTIONS - Keeping complete functionality
  const simulateAnalysis = async () => {
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  const extractTextFromFile = async (file) => {
    try {
      let extractedText = "";
      
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        // For text files, read directly
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.onerror = () => reject(new Error("Failed to read text file"));
          reader.readAsText(file);
        });
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        // Use proper PDF parsing
        try {
          extractedText = await readPDF(file);
          if (!extractedText || extractedText.trim().length < 10) {
            throw new Error("PDF appears to be empty or contains only images");
          }
          return extractedText.trim();
        } catch (pdfError) {
          console.error("PDF parsing error:", pdfError);
          throw new Error("Could not extract text from PDF. Make sure the PDF contains selectable text (not just images).");
        }
      } else if (file.type.includes('word') || file.type.includes('document') || file.name.endsWith('.docx')) {
        // For DOCX files, try to extract text
        // Note: Full DOCX parsing would require mammoth or similar library
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            // DOCX files are ZIP archives, so we can't easily parse them without a library
            // For now, show a helpful message
            reject(new Error("DOCX files require additional processing. Please convert to PDF or TXT format, or use the resume builder to create your resume."));
          };
          reader.onerror = () => reject(new Error("Failed to read DOCX file"));
          reader.readAsArrayBuffer(file);
        });
      } else {
        // For other file types, try to read as text
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target.result;
            // Clean up the text
            const cleaned = content.toString().replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
            if (cleaned.length < 10) {
              reject(new Error("File appears to be empty or binary. Please use a text-based file format."));
            } else {
              resolve(cleaned);
            }
          };
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsText(file);
        });
      }
    } catch (error) {
      throw new Error("Failed to extract text from file: " + error.message);
    }
  };

  // Fallback analysis function (used if Gemini API fails)
  const analyzeResumeTextFallback = (resumeText) => {
    let contentQuality = 70;
    let formatStructure = 70;
    let keywordOptimization = 70;
    let atsCompatibility = 70;
    let achievementImpact = 70;
    let professionalTone = 70;

    // Basic pattern matching analysis
    if (/\d+%|\$\d+|\d+\+/.test(resumeText)) contentQuality += 15;
    if (/(led|managed|developed|created|implemented)/i.test(resumeText)) achievementImpact += 15;
    if (/(javascript|python|react|node|sql|aws|docker|git)/i.test(resumeText)) keywordOptimization += 10;
    if (/(experience|education|skills)/i.test(resumeText)) formatStructure += 15;
    if (/(email|phone|linkedin|github)/i.test(resumeText)) atsCompatibility += 10;
    if (!/(awesome|cool|amazing|super|totally)/i.test(resumeText)) professionalTone += 15;

    const totalScore = Math.round((contentQuality + formatStructure + keywordOptimization + atsCompatibility + achievementImpact + professionalTone) / 6);

    const advice = [];
    if (!/\d+%|\$\d+/.test(resumeText)) advice.push("Add specific metrics like 'increased sales by 25%' to demonstrate impact");
    if (!/(led|managed|developed)/i.test(resumeText)) advice.push("Start bullet points with strong action verbs like 'Led', 'Managed', or 'Developed'");
    if (!/(javascript|python|react)/i.test(resumeText)) advice.push("Include relevant technical skills for your target role");
    if (!/(email|phone)/i.test(resumeText)) advice.push("Ensure contact information is clearly visible");

    const strengths = [];
    if (/\d+%|\$\d+/.test(resumeText)) strengths.push("Strong quantified achievements");
    if (/(led|managed)/i.test(resumeText)) strengths.push("Effective action verbs");
    if (/(javascript|python|react)/i.test(resumeText)) strengths.push("Relevant technical skills");

    const improvements = [];
    if (!/\d+%|\$\d+/.test(resumeText)) improvements.push("Add more quantifiable metrics");
    if (!/(led|managed)/i.test(resumeText)) improvements.push("Use stronger action verbs");

    return {
      total: totalScore,
      breakdown: {
      "Content Quality": Math.min(100, contentQuality),
      "Format & Structure": Math.min(100, formatStructure),
      "Keyword Optimization": Math.min(100, keywordOptimization),
      "ATS Compatibility": Math.min(100, atsCompatibility),
      "Achievement Impact": Math.min(100, achievementImpact),
      "Professional Tone": Math.min(100, professionalTone)
      },
      advice: advice.length > 0 ? advice : ["Good content overall - continue refining"],
      strengths: strengths.length > 0 ? strengths : ["Professional presentation"],
      improvements: improvements.length > 0 ? improvements : ["Continue refining for maximum impact"],
      summary: totalScore >= 85 ? "Outstanding resume with excellent content and structure!" : 
               totalScore >= 75 ? "Solid resume with good structure and content." : 
               "Good foundation with room for improvement.",
      isRealAnalysis: false
    };
  };

  const handleUploadAndScore = async () => {
    if (!file) return;
    setLoading(true);
    setAnalysisStep(0);
    
    await simulateAnalysis();
    
    try {
      const resumeText = await extractTextFromFile(file);
      if (!resumeText || resumeText.trim().length < 50) {
        throw new Error("Could not extract sufficient text");
      }
      
      // Try AI analysis with multiple providers (DeepSeek -> Gemini -> Fallback)
      let aiAnalysis;
      try {
        console.log("🤖 Using DeepSeek R1 AI for analysis...");
        aiAnalysis = await analyzeResumeWithDeepSeek(resumeText);
      } catch (deepseekError) {
        console.warn("DeepSeek API failed, trying Gemini:", deepseekError);
        try {
          console.log("🤖 Using Google Gemini AI for analysis...");
          aiAnalysis = await analyzeResumeWithGemini(resumeText);
        } catch (geminiError) {
          console.warn("Gemini API failed, using fallback analysis:", geminiError);
          // Fallback to pattern matching if both APIs fail
          aiAnalysis = analyzeResumeTextFallback(resumeText);
        }
      }
      
      setScoreResult(aiAnalysis);
      
      // Save analysis to Firestore and update analytics if user is logged in
      if (currentUser) {
        try {
          await addDoc(collection(db, "resumeAnalyses"), {
            userId: currentUser.uid,
            fileName: file.name,
            totalScore: aiAnalysis.total,
            breakdown: aiAnalysis.breakdown,
            advice: aiAnalysis.advice,
            strengths: aiAnalysis.strengths,
            improvements: aiAnalysis.improvements,
            summary: aiAnalysis.summary,
            aiModel: aiAnalysis.aiModel || "fallback",
            createdAt: serverTimestamp()
          });
          
          // Update user analytics
          try {
            const { doc, getDoc, updateDoc } = await import('firebase/firestore');
            const userRef = doc(db, 'users', currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const currentAnalytics = userDoc.data().analytics || {};
              await updateDoc(userRef, {
                'analytics.totalAnalyses': (currentAnalytics.totalAnalyses || 0) + 1,
                'analytics.lastAnalysisDate': serverTimestamp()
              });
            }
          } catch (analyticsError) {
            console.error("Error updating analytics:", analyticsError);
            // Don't throw - analysis still worked
          }
        } catch (error) {
          console.error("Error saving analysis:", error);
          // Don't throw - analysis still worked, just didn't save
        }
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Analysis failed: " + err.message);
    } finally {
      setLoading(false);
      setAnalysisStep(0);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit. Please upload a smaller file.");
        return;
      }
      setFile(selectedFile);
      setScoreResult(null);
      try {
        const content = await extractTextFromFile(selectedFile);
        setPreviewContent(content);
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to read file: " + error.message);
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "#10b981";
    if (score >= 80) return "#3b82f6";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    return "Needs Improvement";
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa", padding: windowWidth < 768 ? "60px 0" : "80px 0", width: "100vw", maxWidth: "100vw", overflowX: "hidden" }}>
      <div style={{ maxWidth: "100%", width: "100%", padding: getPadding(), margin: "0 auto", boxSizing: "border-box" }}>
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{ 
            display: "inline-block",
            backgroundColor: "#dbeafe",
            color: "#2563eb",
            padding: "8px 20px",
              borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "24px"
          }}>
            🤖 Powered by DeepSeek R1 & Gemini AI
            </div>
          <h1 style={{ 
            fontSize: windowWidth < 768 ? "2.5rem" : windowWidth < 1024 ? "3.5rem" : "4.5rem",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "24px",
            letterSpacing: "-2px"
          }}>
            Resume Analyzer
          </h1>
          <p style={{ 
            fontSize: windowWidth < 768 ? "1.1rem" : "1.4rem",
            color: "#64748b", 
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.7"
          }}>
            Upload your resume for professional AI-powered feedback and optimization suggestions
          </p>
        </div>

        {/* UPLOAD SECTION - 2 COLUMNS */}
          <div style={{ 
          display: "grid",
          gridTemplateColumns: windowWidth < 768 ? "1fr" : "1.2fr 1fr",
          gap: windowWidth < 768 ? "24px" : "40px",
          marginBottom: "60px"
        }}>
          {/* LEFT: Upload Zone */}
          <div style={{
            backgroundColor: "#ffffff",
            padding: "48px",
            borderRadius: "24px",
            border: "2px solid #e5e7eb"
          }}>
            <h2 style={{
              fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "32px",
            display: "flex", 
            alignItems: "center", 
              gap: "12px"
          }}>
              <span style={{
              width: "40px",
              height: "40px",
                backgroundColor: "#3b82f6",
                borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
                fontSize: "1.3rem",
                fontWeight: "800"
              }}>1</span>
              Upload Your Resume
            </h2>
          
            {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
              onClick={() => {
                const fileInput = document.getElementById('fileInput');
                if (fileInput) fileInput.click();
              }}
            style={{
                border: dragActive ? "3px dashed #3b82f6" : "3px dashed #cbd5e1",
                borderRadius: "16px",
                padding: windowWidth < 768 ? "40px 20px" : "60px",
              textAlign: "center",
                backgroundColor: dragActive ? "#eff6ff" : "#f8fafc",
              cursor: "pointer",
                transition: "all 0.3s ease",
                marginBottom: "24px"
            }}
          >
              <div style={{ fontSize: windowWidth < 768 ? "3rem" : "4.5rem", marginBottom: "20px", color: dragActive ? "#3b82f6" : "#94a3b8" }}>
                📄
            </div>
            <p style={{ 
                fontSize: windowWidth < 768 ? "1.1rem" : "1.3rem",
                color: "#0f172a",
              fontWeight: "600",
                marginBottom: "10px"
            }}>
                {file ? `✓ ${file.name}` : "Drop your resume here or click to upload"}
            </p>
            <p style={{ 
                fontSize: "1.05rem",
                color: "#64748b"
            }}>
                Supports .txt, .pdf, .docx (Max 10MB)
            </p>
      </div>

          <input
            id="fileInput"
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={async (e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                // Validate file size (10MB limit)
                if (selectedFile.size > 10 * 1024 * 1024) {
                  alert("File size exceeds 10MB limit. Please upload a smaller file.");
                  e.target.value = ""; // Reset input
                  return;
                }
                setFile(selectedFile);
                setScoreResult(null);
                try {
                  const content = await extractTextFromFile(selectedFile);
                  setPreviewContent(content);
                } catch (error) {
                    console.error("Error:", error);
                    alert("Failed to read file: " + error.message);
                }
              }
            }}
            style={{ display: "none" }}
          />
          
            {/* Action Buttons */}
          {file && (
              <div style={{ display: "flex", flexDirection: windowWidth < 768 ? "column" : "row", gap: "16px" }}>
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPreview(!showPreview);
                  }}
                style={{ 
                    flex: 1,
                    padding: "16px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    border: "2px solid #3b82f6",
                    backgroundColor: showPreview ? "#3b82f6" : "#ffffff",
                    color: showPreview ? "#ffffff" : "#3b82f6",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                }}
              >
                  {showPreview ? "Hide Preview" : "👁️ Preview Resume"}
              </button>
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUploadAndScore();
                  }}
                  disabled={loading}
                style={{ 
                    flex: 1,
                    padding: "16px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    border: "none",
                    backgroundColor: loading ? "#94a3b8" : "#3b82f6",
                    color: "#ffffff",
                    borderRadius: "12px",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: loading ? "none" : "0 4px 12px rgba(59, 130, 246, 0.3)"
                }}
              >
                  {loading ? "⏳ Analyzing..." : "🚀 Analyze Resume"}
              </button>
            </div>
          )}
        </div>

          {/* RIGHT: Features/Info */}
          <div style={{
            backgroundColor: "#ffffff",
            padding: windowWidth < 768 ? "32px" : "48px",
            borderRadius: "24px",
            border: "2px solid #e5e7eb"
          }}>
            <h3 style={{
              fontSize: windowWidth < 768 ? "1.3rem" : "1.6rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "28px"
            }}>
              What We Analyze
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: "✓", text: "Content Quality", color: "#3b82f6" },
                { icon: "✓", text: "Format & Structure", color: "#10b981" },
                { icon: "✓", text: "Keyword Optimization", color: "#f59e0b" },
                { icon: "✓", text: "ATS Compatibility", color: "#8b5cf6" },
                { icon: "✓", text: "Achievement Impact", color: "#ef4444" },
                { icon: "✓", text: "Professional Tone", color: "#06b6d4" }
              ].map((feature, i) => (
                <div key={i} style={{
              display: "flex", 
              alignItems: "center", 
                  gap: "16px",
                  padding: "16px 20px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  borderLeft: `4px solid ${feature.color}`
                }}>
                  <span style={{ fontSize: "1.5rem", color: feature.color }}>{feature.icon}</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#0f172a" }}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PREVIEW SECTION */}
        {previewContent && showPreview && (
          <div style={{
            backgroundColor: "#ffffff",
            padding: windowWidth < 768 ? "32px" : "48px",
            borderRadius: "24px",
            marginBottom: "60px",
            border: "2px solid #e5e7eb"
          }}>
            <div style={{ display: "flex", flexDirection: windowWidth < 768 ? "column" : "row", justifyContent: "space-between", alignItems: windowWidth < 768 ? "flex-start" : "center", gap: windowWidth < 768 ? "16px" : "0", marginBottom: "28px" }}>
              <h3 style={{
                fontSize: windowWidth < 768 ? "1.4rem" : "1.8rem",
                fontWeight: "700",
                color: "#0f172a",
                margin: 0
              }}>
                📄 Resume Preview
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#f1f5f9",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#64748b",
                  cursor: "pointer"
                }}
              >
                ✕ Close
              </button>
            </div>
            <div style={{ 
              backgroundColor: "#f8fafc",
              padding: windowWidth < 768 ? "20px" : "32px",
              borderRadius: "12px",
              maxHeight: "600px",
              overflowY: "auto",
              border: "1px solid #e5e7eb"
            }}>
              {previewContent ? (
                <div style={{ 
                  color: "#0f172a",
                  whiteSpace: "pre-wrap", 
                  fontSize: windowWidth < 768 ? "0.9rem" : "1rem",
                  lineHeight: "1.8",
                  margin: 0,
                  fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
                }}>
                  {previewContent}
                </div>
              ) : (
                <div style={{ 
                  textAlign: "center", 
                  padding: "40px",
                  color: "#64748b"
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📄</div>
                  <p>No preview content available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LOADING SECTION */}
          {loading && (
            <div style={{ 
            backgroundColor: "#ffffff",
            padding: "60px",
            borderRadius: "24px",
            textAlign: "center",
            marginBottom: "60px",
            border: "2px solid #e5e7eb"
            }}>
            <div style={{ fontSize: "4rem", marginBottom: "24px", animation: "pulse 2s infinite" }}>⚙️</div>
              <p style={{ 
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "24px"
              }}>
                {analysisSteps[analysisStep] || analysisSteps[0]}
              </p>
              <div style={{ 
                width: "100%", 
              maxWidth: "600px",
              margin: "0 auto",
              height: "12px",
              backgroundColor: "#e5e7eb",
              borderRadius: "6px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${((analysisStep + 1) / analysisSteps.length) * 100}%`,
                  height: "100%",
                backgroundColor: "#3b82f6",
                transition: "width 0.8s ease",
                borderRadius: "6px"
                }}></div>
              </div>
        </div>
      )}

        {/* RESULTS SECTION */}
      {scoreResult && (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            
            {/* Overall Score Card - BIG */}
            <div style={{ 
              backgroundColor: "#ffffff",
              padding: windowWidth < 768 ? "40px 24px" : "60px",
              borderRadius: "24px",
              textAlign: "center", 
              border: "2px solid #e5e7eb",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)"
            }}>
              <h2 style={{
                fontSize: windowWidth < 768 ? "1.6rem" : "2.2rem",
                fontWeight: "700", 
                color: "#0f172a",
                marginBottom: "32px"
              }}>
                Your Resume Score
              </h2>
              <div style={{
                fontSize: windowWidth < 768 ? "4.5rem" : "7rem",
                fontWeight: "800",
                color: getScoreColor(scoreResult.total),
                marginBottom: "16px",
                lineHeight: "1"
              }}>
                {scoreResult.total}
              </div>
              <div style={{ 
                fontSize: windowWidth < 768 ? "1.2rem" : "1.6rem",
                color: "#64748b",
                marginBottom: "24px"
              }}>
                out of 100
              </div>
              <div style={{ 
                display: "inline-block",
                padding: windowWidth < 768 ? "12px 24px" : "14px 36px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                fontSize: windowWidth < 768 ? "1.1rem" : "1.4rem",
                fontWeight: "700",
                color: getScoreColor(scoreResult.total),
                border: `3px solid ${getScoreColor(scoreResult.total)}`
              }}>
                {getScoreLabel(scoreResult.total)}
              </div>
              {scoreResult.isRealAnalysis && (
                <div style={{
                  marginTop: "24px",
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#dbeafe",
                  borderRadius: "20px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#2563eb"
                }}>
                  🤖 {scoreResult.aiModel === "DeepSeek R1" ? "Powered by DeepSeek R1 AI" : 
                      scoreResult.aiModel === "Gemini Pro" ? "Powered by Google Gemini AI" : 
                      "Real AI Analysis"}
                </div>
              )}
            </div>

            {/* Summary */}
            {scoreResult.summary && (
              <div style={{
                backgroundColor: "#3b82f6",
                padding: windowWidth < 768 ? "32px" : "48px",
                borderRadius: "24px",
                color: "#ffffff"
              }}>
                <h3 style={{
                  fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
                  fontWeight: "700",
                  marginBottom: "20px"
                }}>
                  📊 Summary
                </h3>
                <p style={{
                fontSize: windowWidth < 768 ? "1.1rem" : "1.3rem",
                  lineHeight: "1.8",
                  margin: 0
                }}>
                  {scoreResult.summary}
                </p>
              </div>
            )}

            {/* Score Breakdown - GRID */}
            <div style={{
              backgroundColor: "#ffffff",
              padding: windowWidth < 768 ? "32px" : "48px",
              borderRadius: "24px",
              border: "2px solid #e5e7eb"
            }}>
              <h3 style={{
                fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "36px"
              }}>
                📈 Detailed Breakdown
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: windowWidth < 768 ? "1fr" : "repeat(2, 1fr)",
                gap: "24px"
              }}>
                {Object.entries(scoreResult.breakdown).map(([category, score]) => (
                <div key={category} style={{ 
                    backgroundColor: "#f8fafc",
                    padding: "28px",
                    borderRadius: "16px",
                    border: "2px solid #e5e7eb",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                }}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                      marginBottom: "16px"
                  }}>
                    <span style={{ 
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#0f172a"
                    }}>
                      {category}
                    </span>
                    <span style={{ 
                        fontSize: "2rem",
                        fontWeight: "800",
                        color: getScoreColor(score)
                    }}>
                        {score}
                    </span>
                  </div>
                  <div style={{ 
                    width: "100%", 
                      height: "12px",
                      backgroundColor: "#e5e7eb",
                      borderRadius: "6px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${score}%`,
                      height: "100%",
                      backgroundColor: getScoreColor(score),
                        transition: "width 1.2s ease",
                        borderRadius: "6px"
                    }}></div>
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Strengths & Improvements - 2 COLUMNS */}
                <div style={{ 
              display: "grid",
              gridTemplateColumns: windowWidth < 768 ? "1fr" : "repeat(2, 1fr)",
              gap: windowWidth < 768 ? "24px" : "40px"
                  }}>
            {/* Strengths */}
                <div style={{ 
                backgroundColor: "#f0fdf4",
                padding: windowWidth < 768 ? "32px" : "48px",
                borderRadius: "24px",
                border: "2px solid #86efac"
                }}>
                <h3 style={{
                  fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
                  fontWeight: "700",
                  color: "#166534",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <span style={{ fontSize: "2.5rem" }}>✓</span>
                  Strengths
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {scoreResult.strengths.map((strength, i) => {
                      const strengthObj = typeof strength === 'object' ? strength : { title: strength, description: strength, snippet: "" };
                      return (
                        <div key={i} style={{ 
                          padding: "20px 24px",
                          backgroundColor: "#ffffff",
                          borderRadius: "12px",
                          border: "1px solid #86efac"
                        }}>
                          <div style={{ display: "flex", alignItems: "start", gap: "12px", marginBottom: strengthObj.snippet ? "12px" : "0" }}>
                            <span style={{ fontSize: "1.4rem", color: "#166534" }}>✓</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "1.15rem", color: "#166534", fontWeight: "600", marginBottom: "6px" }}>
                                {strengthObj.title}
                              </div>
                              <div style={{ fontSize: "1rem", color: "#166534", fontWeight: "400", lineHeight: "1.6" }}>
                                {strengthObj.description}
                              </div>
                              {strengthObj.snippet && (
                                <div style={{ 
                                  marginTop: "10px",
                                  padding: "10px 14px",
                                  backgroundColor: "#f0fdf4",
                                  borderRadius: "8px",
                                  borderLeft: "3px solid #10b981"
                                }}>
                                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "4px", fontWeight: "600" }}>
                                    Example from your resume:
                                  </div>
                                  <div style={{ fontSize: "0.9rem", color: "#166534", fontStyle: "italic" }}>
                                    "{strengthObj.snippet}"
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              {/* Improvements */}
                <div style={{ 
                backgroundColor: "#fef2f2",
                padding: windowWidth < 768 ? "32px" : "48px",
                borderRadius: "24px",
                border: "2px solid #fca5a5"
                }}>
                <h3 style={{
                  fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
                  fontWeight: "700",
                  color: "#991b1b",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <span style={{ fontSize: "2.5rem" }}>→</span>
                  Areas to Improve
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {scoreResult.improvements.map((improvement, i) => {
                      const improvementObj = typeof improvement === 'object' ? improvement : { title: improvement, description: improvement, snippet: "", suggestion: improvement };
                      return (
                        <div key={i} style={{ 
                          padding: "20px 24px",
                          backgroundColor: "#ffffff",
                          borderRadius: "12px",
                          border: "1px solid #fca5a5"
                        }}>
                          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
                            <span style={{ fontSize: "1.4rem", color: "#991b1b" }}>→</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "1.15rem", color: "#991b1b", fontWeight: "600", marginBottom: "6px" }}>
                                {improvementObj.title}
                              </div>
                              <div style={{ fontSize: "1rem", color: "#991b1b", fontWeight: "400", lineHeight: "1.6", marginBottom: improvementObj.snippet ? "10px" : "0" }}>
                                {improvementObj.description}
                              </div>
                              {improvementObj.snippet && (
                                <div style={{ 
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  padding: "10px 14px",
                                  backgroundColor: "#fef2f2",
                                  borderRadius: "8px",
                                  borderLeft: "3px solid #ef4444"
                                }}>
                                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "4px", fontWeight: "600" }}>
                                    Current text:
                                  </div>
                                  <div style={{ fontSize: "0.9rem", color: "#991b1b", fontStyle: "italic" }}>
                                    "{improvementObj.snippet}"
                                  </div>
                                </div>
                              )}
                              {improvementObj.suggestion && (
                                <div style={{ 
                                  marginTop: improvementObj.snippet ? "10px" : "10px",
                                  padding: "10px 14px",
                                  backgroundColor: "#fef2f2",
                                  borderRadius: "8px",
                                  borderLeft: "3px solid #10b981"
                                }}>
                                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "4px", fontWeight: "600" }}>
                                    💡 Suggestion:
                                  </div>
                                  <div style={{ fontSize: "0.95rem", color: "#166534", fontWeight: "500" }}>
                                    {improvementObj.suggestion}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            {/* Recommendations */}
              <div style={{ 
              backgroundColor: "#ffffff",
              padding: windowWidth < 768 ? "32px" : "48px",
              borderRadius: "24px",
              border: "2px solid #e5e7eb"
            }}>
              <h3 style={{
                fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "32px"
              }}>
                💡 Personalized Recommendations
              </h3>
                {scoreResult.advice.map((advice, i) => {
                  const adviceObj = typeof advice === 'object' ? advice : { title: advice, description: advice, snippet: "", suggestion: advice };
                  return (
                    <div key={i} style={{ 
                      backgroundColor: "#f8fafc",
                      padding: "24px 28px",
                      borderRadius: "16px",
                      marginBottom: "16px",
                      border: "2px solid #e5e7eb"
                    }}>
                      <div style={{ display: "flex", gap: "20px", alignItems: "start" }}>
                        <span style={{ 
                          width: "36px",
                          height: "36px",
                          backgroundColor: "#3b82f6",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                          fontSize: "1.2rem",
                          fontWeight: "800",
                          flexShrink: 0
                        }}>
                          {i + 1}
                        </span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ 
                            fontSize: "1.2rem",
                            color: "#0f172a",
                            margin: "0 0 8px 0",
                            fontWeight: "700"
                          }}>
                            {adviceObj.title}
                          </h4>
                          <p style={{ 
                            fontSize: "1.05rem",
                            color: "#0f172a",
                            margin: "0 0 12px 0",
                            lineHeight: "1.7",
                            fontWeight: "400"
                          }}>
                            {adviceObj.description}
                          </p>
                          {adviceObj.snippet && (
                            <div style={{ 
                              marginBottom: "12px",
                              padding: "12px 16px",
                              backgroundColor: "#ffffff",
                              borderRadius: "8px",
                              borderLeft: "3px solid #3b82f6"
                            }}>
                              <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "6px", fontWeight: "600" }}>
                                📝 From your resume:
                              </div>
                              <div style={{ fontSize: "0.95rem", color: "#0f172a", fontStyle: "italic", lineHeight: "1.6" }}>
                                "{adviceObj.snippet}"
                              </div>
                            </div>
                          )}
                          {adviceObj.suggestion && (
                            <div style={{ 
                              padding: "12px 16px",
                              backgroundColor: "#eff6ff",
                              borderRadius: "8px",
                              borderLeft: "3px solid #10b981"
                            }}>
                              <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "6px", fontWeight: "600" }}>
                                💡 Action to take:
                              </div>
                              <div style={{ fontSize: "1rem", color: "#166534", fontWeight: "500", lineHeight: "1.6" }}>
                                {adviceObj.suggestion}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            {/* Try Again Button */}
            <div style={{ textAlign: "center", paddingTop: "20px" }}>
              <button
                onClick={() => {
                  setScoreResult(null);
                  setFile(null);
                  setPreviewContent("");
                  setShowPreview(false);
                }}
                style={{
                  padding: "18px 48px",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(59, 130, 246, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
                }}
              >
                🔄 Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeRater;
