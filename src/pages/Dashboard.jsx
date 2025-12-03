import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useResume } from "../contexts/ResumeContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const { resumes, loadResumes } = useResume();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("resumes");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      await loadResumes();
      
      // Load analysis results
      const analysesQuery = query(
        collection(db, "resumeAnalyses"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );
      const analysesSnapshot = await getDocs(analysesQuery);
      const analysesData = analysesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAnalyses(analysesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser, loadResumes]);

  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser, loadData]);

  const getScoreColor = (score) => {
    if (score >= 90) return "#10b981";
    if (score >= 80) return "#3b82f6";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  const getPadding = () => {
    if (windowWidth < 768) return "40px 16px";
    if (windowWidth < 1024) return "60px 24px";
    return "80px 40px";
  };

  if (!currentUser) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>
            Please sign in to view your dashboard
          </h2>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⏳</div>
          <p style={{ fontSize: "1.1rem", color: "#64748b" }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f8fafc",
      padding: getPadding()
    }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{
          fontSize: windowWidth < 768 ? "2rem" : "2.5rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "8px"
        }}>
          Welcome back, {userProfile?.displayName || currentUser.displayName || currentUser.email?.split("@")[0]}!
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b" }}>
          Manage your resumes, analyses, and activity all in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: windowWidth < 768 ? "1fr" : windowWidth < 1024 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <div style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          border: "2px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📄</div>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "#3b82f6", marginBottom: "4px" }}>
            {resumes.length}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Resumes</div>
        </div>
        <div style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          border: "2px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📊</div>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "#10b981", marginBottom: "4px" }}>
            {analyses.length}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Analyses</div>
        </div>
        <div style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          border: "2px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>⭐</div>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "#f59e0b", marginBottom: "4px" }}>
            {analyses.length > 0 ? Math.round(analyses.reduce((sum, a) => sum + (a.totalScore || 0), 0) / analyses.length) : 0}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Avg Score</div>
        </div>
        <div style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          border: "2px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🚀</div>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "#8b5cf6", marginBottom: "4px" }}>
            {userProfile?.analytics?.totalExports || 0}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>Exports</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "12px",
        marginBottom: "32px",
        borderBottom: "2px solid #e5e7eb",
        paddingBottom: "0"
      }}>
        <button
          onClick={() => setActiveTab("resumes")}
          style={{
            padding: "12px 24px",
            backgroundColor: activeTab === "resumes" ? "#3b82f6" : "transparent",
            color: activeTab === "resumes" ? "#ffffff" : "#64748b",
            border: "none",
            borderRadius: "8px 8px 0 0",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderBottom: activeTab === "resumes" ? "3px solid #3b82f6" : "3px solid transparent",
            marginBottom: "-2px"
          }}
        >
          📄 My Resumes ({resumes.length})
        </button>
        <button
          onClick={() => setActiveTab("analyses")}
          style={{
            padding: "12px 24px",
            backgroundColor: activeTab === "analyses" ? "#3b82f6" : "transparent",
            color: activeTab === "analyses" ? "#ffffff" : "#64748b",
            border: "none",
            borderRadius: "8px 8px 0 0",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderBottom: activeTab === "analyses" ? "3px solid #3b82f6" : "3px solid transparent",
            marginBottom: "-2px"
          }}
        >
          📊 Resume Analyses ({analyses.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "resumes" && (
        <div>
          {resumes.length === 0 ? (
            <div style={{
              backgroundColor: "#ffffff",
              padding: "60px 40px",
              borderRadius: "12px",
              textAlign: "center",
              border: "2px solid #e5e7eb"
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📄</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>
                No resumes yet
              </h3>
              <p style={{ fontSize: "1rem", color: "#64748b", marginBottom: "24px" }}>
                Start building your first professional resume
              </p>
              <button
                onClick={() => navigate("/templates")}
                style={{
                  padding: "14px 32px",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Browse Templates
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: windowWidth < 768 ? "1fr" : windowWidth < 1024 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "24px"
            }}>
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "2px solid #e5e7eb",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor = "#3b82f6";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                  onClick={() => navigate("/build-resume", { state: { resumeId: resume.id } })}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                      {resume.data?.basicInfo?.name || "Untitled Resume"}
                    </h3>
                    <span style={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      backgroundColor: "#f8fafc",
                      padding: "4px 8px",
                      borderRadius: "6px"
                    }}>
                      {resume.template || "modern"}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "16px" }}>
                    Version {resume.version || 1} • Updated {resume.updatedAt ? new Date(resume.updatedAt.seconds * 1000).toLocaleDateString() : "Recently"}
                  </p>
                  {resume.atsScore && (
                    <div style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      backgroundColor: getScoreColor(resume.atsScore) + "20",
                      color: getScoreColor(resume.atsScore),
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      marginBottom: "12px"
                    }}>
                      ATS Score: {resume.atsScore}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/build-resume", { state: { resumeId: resume.id } });
                      }}
                      style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#3b82f6",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "analyses" && (
        <div>
          {analyses.length === 0 ? (
            <div style={{
              backgroundColor: "#ffffff",
              padding: "60px 40px",
              borderRadius: "12px",
              textAlign: "center",
              border: "2px solid #e5e7eb"
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📊</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>
                No analyses yet
              </h3>
              <p style={{ fontSize: "1rem", color: "#64748b", marginBottom: "24px" }}>
                Analyze your resume to get personalized feedback and scores
              </p>
              <button
                onClick={() => navigate("/resume-rater")}
                style={{
                  padding: "14px 32px",
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Analyze Resume
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: windowWidth < 768 ? "1fr" : windowWidth < 1024 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "24px"
            }}>
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "2px solid #e5e7eb",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
                        {analysis.fileName || "Resume Analysis"}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                        {analysis.createdAt ? new Date(analysis.createdAt.seconds * 1000).toLocaleDateString() : "Recently"}
                      </p>
                    </div>
                    <div style={{
                      fontSize: "2rem",
                      fontWeight: "800",
                      color: getScoreColor(analysis.totalScore || 0)
                    }}>
                      {analysis.totalScore || 0}
                    </div>
                  </div>
                  {analysis.summary && (
                    <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "16px", lineHeight: "1.5" }}>
                      {analysis.summary}
                    </p>
                  )}
                  {analysis.breakdown && (
                    <div style={{ marginBottom: "16px" }}>
                      {Object.entries(analysis.breakdown).slice(0, 3).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: "8px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{key}</span>
                            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: getScoreColor(value) }}>
                              {value}
                            </span>
                          </div>
                          <div style={{
                            width: "100%",
                            height: "6px",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "3px",
                            overflow: "hidden"
                          }}>
                            <div style={{
                              width: `${value}%`,
                              height: "100%",
                              backgroundColor: getScoreColor(value),
                              borderRadius: "3px"
                            }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => navigate("/resume-rater", { state: { analysisId: analysis.id } })}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#f8fafc",
                      color: "#3b82f6",
                      border: "2px solid #3b82f6",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

