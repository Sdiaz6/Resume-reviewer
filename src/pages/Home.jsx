// HOME

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      
      {/* HERO SECTION - Large, impactful */}
      <section style={{ 
        padding: "140px 80px 100px",
        maxWidth: "1600px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: "80px",
        alignItems: "center"
      }}>
        <div>
          <div style={{
            display: "inline-block",
            backgroundColor: "#eff6ff",
            color: "#3b82f6",
            padding: "8px 20px",
            borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "24px"
          }}>
            ✨ AI-Powered Resume Tools
          </div>
          <h1 style={{ 
            fontSize: "5rem",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "28px",
            letterSpacing: "-2px",
            lineHeight: "1.1"
          }}>
            Land Your Dream Job with
            <span style={{ color: "#3b82f6" }}> AI-Powered</span> Resumes
          </h1>
          <p style={{ 
            fontSize: "1.4rem",
            color: "#64748b",
            marginBottom: "48px",
            lineHeight: "1.7",
            maxWidth: "600px"
          }}>
            Create, analyze, and optimize your resume with professional templates and intelligent AI feedback
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={() => navigate("/build-resume")}
              style={{
                backgroundColor: "#10b981",
                color: "#ffffff",
                fontSize: "1.15rem",
                fontWeight: "600",
                padding: "18px 40px",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 28px rgba(16, 185, 129, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.3)";
              }}
            >
              Build Resume
            </button>
            <button
              onClick={() => navigate("/resume-rater")}
              style={{
                backgroundColor: "#ffffff",
                color: "#3b82f6",
                fontSize: "1.15rem",
                fontWeight: "600",
                padding: "18px 40px",
                border: "2px solid #3b82f6",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#3b82f6";
                e.target.style.color = "#ffffff";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.color = "#3b82f6";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Analyze Resume
            </button>
          </div>
        </div>
        
        {/* Hero Image/Illustration */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "60px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            fontSize: "12rem",
            textAlign: "center"
          }}>
            📄
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ 
        backgroundColor: "#ffffff",
        padding: "120px 80px",
        borderTop: "1px solid #e5e7eb"
      }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 style={{ 
              fontSize: "3.5rem",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "20px",
              letterSpacing: "-1px"
            }}>
              Everything You Need to Succeed
            </h2>
            <p style={{
              fontSize: "1.3rem",
              color: "#64748b",
              maxWidth: "700px",
              margin: "0 auto"
            }}>
              Professional tools powered by AI to help you stand out
            </p>
          </div>
          
          {/* Feature Cards */}
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px"
          }}>
            {/* Feature 1 */}
            <div style={{
              backgroundColor: "#fafafa",
              padding: "48px 36px",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "#3b82f6";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}>
              <div style={{
                width: "72px",
                height: "72px",
                backgroundColor: "#3b82f6",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
                fontSize: "2.2rem"
              }}>
                ⚡
              </div>
              <h3 style={{
                fontSize: "1.6rem",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "16px"
              }}>
                AI-Powered Analysis
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "#64748b",
                lineHeight: "1.7"
              }}>
                Get instant feedback on grammar, formatting, keywords, and ATS compatibility with our advanced AI engine
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              backgroundColor: "#fafafa",
              padding: "48px 36px",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "#10b981";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}>
              <div style={{
                width: "72px",
                height: "72px",
                backgroundColor: "#10b981",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
                fontSize: "2.2rem"
              }}>
                📝
              </div>
              <h3 style={{
                fontSize: "1.6rem",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "16px"
              }}>
                Professional Templates
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "#64748b",
                lineHeight: "1.7"
              }}>
                Choose from dozens of professionally designed templates optimized for different industries and career levels
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              backgroundColor: "#fafafa",
              padding: "48px 36px",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "#f59e0b";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}>
              <div style={{
                width: "72px",
                height: "72px",
                backgroundColor: "#f59e0b",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
                fontSize: "2.2rem"
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: "1.6rem",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "16px"
              }}>
                Smart Optimization
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "#64748b",
                lineHeight: "1.7"
              }}>
                Receive personalized suggestions to improve your resume score and increase your chances of getting interviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{ 
        padding: "100px 80px",
        backgroundColor: "#fafafa"
      }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "60px",
            textAlign: "center"
          }}>
            <div>
              <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "#3b82f6", marginBottom: "12px" }}>
                50K+
              </div>
              <p style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: "500" }}>
                Resumes Analyzed
              </p>
            </div>
            <div>
              <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "#10b981", marginBottom: "12px" }}>
                95%
              </div>
              <p style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: "500" }}>
                Success Rate
              </p>
            </div>
            <div>
              <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "#f59e0b", marginBottom: "12px" }}>
                30+
              </div>
              <p style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: "500" }}>
                Templates Available
              </p>
            </div>
            <div>
              <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "#8b5cf6", marginBottom: "12px" }}>
                24/7
              </div>
              <p style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: "500" }}>
                AI Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ 
        padding: "120px 80px",
        backgroundColor: "#0f172a",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "3.5rem",
            fontWeight: "800",
            color: "#ffffff",
            marginBottom: "28px",
            letterSpacing: "-1px"
          }}>
            Ready to Create Your Perfect Resume?
          </h2>
          <p style={{ 
            fontSize: "1.3rem",
            color: "#94a3b8",
            marginBottom: "48px",
            lineHeight: "1.7"
          }}>
            Join thousands of job seekers who have successfully landed their dream jobs
          </p>
          <button
            onClick={() => navigate("/build-resume")}
            style={{
              backgroundColor: "#10b981",
              color: "#ffffff",
              fontSize: "1.2rem",
              fontWeight: "600",
              padding: "20px 48px",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 12px 28px rgba(16, 185, 129, 0.4)"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 16px 36px rgba(16, 185, 129, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 12px 28px rgba(16, 185, 129, 0.4)";
            }}
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
