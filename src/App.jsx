import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ResumeRater from "./pages/ResumeRater";
import BuildResume from "./pages/BuildResume";
import Footer from "./pages/Footer";
import Navbar from "./pages/NavBar";
import "./App.css";

/*
function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "15px",
            padding: "8px 16px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
              animation: "shimmer 4s ease-in-out infinite"
            }}></div>
            <div style={{
              width: "55px",
              height: "55px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 20%, #f093fb 60%, #4facfe 100%)",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 rgba(0, 0, 0, 0.1)",
              position: "relative",
              overflow: "hidden",
              transform: "rotate(-8deg)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              border: "2px solid rgba(255, 255, 255, 0.2)"
            }}>
              <div style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
                animation: "shimmer 3s ease-in-out infinite"
              }}></div>
              <span style={{ 
                fontSize: "2.2rem", 
                color: "#ffffff",
                fontWeight: "700",
                zIndex: 1,
                position: "relative",
                textShadow: "0 3px 6px rgba(0, 0, 0, 0.4)",
                transform: "rotate(8deg)",
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))"
              }}>📋</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ 
                background: "linear-gradient(135deg, #ffffff 0%, #f093fb 40%, #4facfe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "1.9rem",
                fontWeight: "900",
                letterSpacing: "-0.8px",
                lineHeight: "1",
                textShadow: "0 3px 15px rgba(0, 0, 0, 0.4)",
                fontFamily: "'Montserrat', 'Playfair Display', serif"
              }}>
                RESUME
              </span>
              <span style={{ 
                background: "linear-gradient(135deg, #4facfe 0%, #f093fb 40%, #667eea 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "1.5rem",
                fontWeight: "800",
                letterSpacing: "3px",
                lineHeight: "1",
                textTransform: "uppercase",
                opacity: "0.95",
                fontFamily: "'Montserrat', 'Playfair Display', serif"
              }}>
                REVIEW
              </span>
            </div>
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/resume-rater" className="nav-link">Review Tool</Link>
        </div>
      </div>
    </nav>
  );
} */

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />  {/* now using your NavBar.jsx */}
      <div className="content-wrapper container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume-rater" element={<ResumeRater />} />
          <Route path="/build-resume" element={<BuildResume />} /> {/* ← new route */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
