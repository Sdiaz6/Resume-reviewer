// NAVBAR - Modern & Beautiful Desktop Design
// Sleek navigation with hover effects and modern styling

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={{
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
      padding: "24px 80px",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: "1600px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        
        {/* Logo */}
        <Link 
          to="/" 
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: "#1a1a1a",
            textDecoration: "none",
            letterSpacing: "-0.5px",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.color = "#3b82f6";
          }}
          onMouseOut={(e) => {
            e.target.style.color = "#1a1a1a";
          }}
        >
          Resume<span style={{ color: "#3b82f6" }}>Pro</span>
        </Link>

        {/* Navigation Links */}
        <div style={{
          display: "flex",
          gap: "48px",
          alignItems: "center"
        }}>
          <Link
            to="/"
            style={{
              fontSize: "1.05rem",
              fontWeight: "600",
              color: isActive("/") ? "#3b82f6" : "#64748b",
              textDecoration: "none",
              position: "relative",
              transition: "color 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.color = "#1a1a1a"}
            onMouseOut={(e) => {
              if (!isActive("/")) e.target.style.color = "#64748b";
            }}
          >
            Home
          </Link>
          
          <Link
            to="/about"
            style={{
              fontSize: "1.05rem",
              fontWeight: "600",
              color: isActive("/about") ? "#3b82f6" : "#64748b",
              textDecoration: "none",
              transition: "color 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.color = "#1a1a1a"}
            onMouseOut={(e) => {
              if (!isActive("/about")) e.target.style.color = "#64748b";
            }}
          >
            About
          </Link>
          
          <Link
            to="/templates"
            style={{
              fontSize: "1.05rem",
              fontWeight: "600",
              color: isActive("/templates") ? "#3b82f6" : "#64748b",
              textDecoration: "none",
              transition: "color 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.color = "#1a1a1a"}
            onMouseOut={(e) => {
              if (!isActive("/templates")) e.target.style.color = "#64748b";
            }}
          >
            Templates
          </Link>
          
          <Link
            to="/build-resume"
            style={{
              fontSize: "1.05rem",
              fontWeight: "600",
              color: "#ffffff",
              backgroundColor: "#10b981",
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#059669";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.35)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#10b981";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.25)";
            }}
          >
            Build Resume
          </Link>

          <Link
            to="/resume-rater"
            style={{
              fontSize: "1.05rem",
              fontWeight: "600",
              color: "#ffffff",
              backgroundColor: "#3b82f6",
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#2563eb";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 16px rgba(59, 130, 246, 0.35)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#3b82f6";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.25)";
            }}
          >
            Analyze Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
