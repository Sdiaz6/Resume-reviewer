// NAVBAR - Modern & Beautiful Desktop Design
// Sleek navigation with hover effects and modern styling

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, userProfile } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

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
            to="/job-boards"
            style={{
              fontSize: "1.05rem",
              fontWeight: "600",
              color: isActive("/job-boards") ? "#3b82f6" : "#64748b",
              textDecoration: "none",
              transition: "color 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.color = "#1a1a1a"}
            onMouseOut={(e) => {
              if (!isActive("/job-boards")) e.target.style.color = "#64748b";
            }}
          >
            Job Boards
          </Link>

          <Link
            to="/blog"
            style={{
              fontSize: "1.05rem",
              fontWeight: "600",
              color: isActive("/blog") ? "#3b82f6" : "#64748b",
              textDecoration: "none",
              transition: "color 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.color = "#1a1a1a"}
            onMouseOut={(e) => {
              if (!isActive("/blog")) e.target.style.color = "#64748b";
            }}
          >
            Blog
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

          {currentUser ? (
            <>
              <Link
                to="/analytics"
                style={{
                  fontSize: "1.05rem",
                  fontWeight: "600",
                  color: isActive("/analytics") ? "#3b82f6" : "#64748b",
                  textDecoration: "none",
                  transition: "color 0.2s ease"
                }}
                onMouseOver={(e) => e.target.style.color = "#1a1a1a"}
                onMouseOut={(e) => {
                  if (!isActive("/analytics")) e.target.style.color = "#64748b";
                }}
              >
                Analytics
              </Link>
              <div style={{ position: "relative", marginLeft: "12px", paddingLeft: "12px", borderLeft: "1px solid #e5e7eb" }} ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    backgroundColor: showUserMenu ? "#f8fafc" : "transparent",
                    border: "2px solid",
                    borderColor: showUserMenu ? "#3b82f6" : "#e5e7eb",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    if (!showUserMenu) {
                      e.currentTarget.style.borderColor = "#3b82f6";
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!showUserMenu) {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: "700",
                    fontSize: "0.9rem"
                  }}>
                    {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                  </div>
                  <span style={{
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    color: "#0f172a"
                  }}>
                    {currentUser.displayName || userProfile?.displayName || currentUser.email?.split("@")[0]}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {showUserMenu ? "▲" : "▼"}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    backgroundColor: "#ffffff",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                    minWidth: "220px",
                    zIndex: 1000,
                    overflow: "hidden"
                  }}>
                    <div style={{
                      padding: "16px",
                      borderBottom: "1px solid #e5e7eb",
                      backgroundColor: "#f8fafc"
                    }}>
                      <div style={{
                        fontSize: "0.9rem",
                        fontWeight: "700",
                        color: "#0f172a",
                        marginBottom: "4px"
                      }}>
                        {currentUser.displayName || userProfile?.displayName || "User"}
                      </div>
                      <div style={{
                        fontSize: "0.85rem",
                        color: "#64748b"
                      }}>
                        {currentUser.email}
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      style={{
                        display: "block",
                        padding: "12px 16px",
                        color: "#0f172a",
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                        borderBottom: "1px solid #f1f5f9"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                        e.currentTarget.style.color = "#3b82f6";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#0f172a";
                      }}
                    >
                      📊 My Dashboard
                    </Link>
                    <Link
                      to="/analytics"
                      onClick={() => setShowUserMenu(false)}
                      style={{
                        display: "block",
                        padding: "12px 16px",
                        color: "#0f172a",
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                        borderBottom: "1px solid #f1f5f9"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                        e.currentTarget.style.color = "#3b82f6";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#0f172a";
                      }}
                    >
                      📈 Analytics
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "transparent",
                        color: "#dc2626",
                        border: "none",
                        textAlign: "left",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#fef2f2";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                fontSize: "1.05rem",
                fontWeight: "600",
                color: "#ffffff",
                backgroundColor: "#667eea",
                padding: "12px 24px",
                borderRadius: "10px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#5568d3";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.35)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#667eea";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.25)";
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
