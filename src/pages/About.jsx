import React, { useState, useEffect } from "react";

const About = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  return (
    <div style={{ 
      width: "100vw", 
      maxWidth: "100vw", 
      overflowX: "hidden", 
      margin: 0, 
      padding: 0,
      position: "relative",
      left: 0,
      right: 0
    }}>
      {/* Hero Section - Full Width */}
      <section style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        padding: windowWidth < 768 ? "100px 0 60px" : "120px 0 80px",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        boxSizing: "border-box"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 25%, transparent 50%, rgba(255, 255, 255, 0.1) 75%, transparent 100%),
            linear-gradient(0deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)
          `,
          backgroundSize: "200px 200px, 100% 100%",
          animation: "float 8s ease-in-out infinite"
        }}></div>
        <div style={{ 
          maxWidth: "100%", 
          width: "100%", 
          padding: getPadding(), 
          margin: "0 auto", 
          position: "relative", 
          zIndex: 1, 
          textAlign: "center", 
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h1 style={{ 
            fontSize: windowWidth < 768 ? "2.5rem" : windowWidth < 1024 ? "3.5rem" : "4.5rem", 
            fontWeight: "900",
            color: "#ffffff",
            marginBottom: "25px",
            fontFamily: "'Montserrat', 'Playfair Display', serif",
            letterSpacing: "-1px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            width: "100%"
          }}>
            About Us
          </h1>
          <p style={{ 
            fontSize: windowWidth < 768 ? "1.2rem" : windowWidth < 1024 ? "1.4rem" : "1.6rem", 
            color: "rgba(255, 255, 255, 0.9)",
            fontWeight: "500",
            fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
            letterSpacing: "0.3px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "900px",
            margin: "0 auto",
            width: "100%"
          }}>
            We're passionate about helping job seekers land their dream careers through intelligent resume analysis and optimization.
          </p>
        </div>
      </section>

      {/* Mission & Team Section - Combined Full Width White Section */}
      <section style={{ 
        background: "#ffffff",
        padding: windowWidth < 768 ? "80px 0" : "100px 0",
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        position: "relative",
        boxSizing: "border-box"
      }}>
        <div style={{ 
          maxWidth: "100%", 
          width: "100%", 
          padding: getPadding(), 
          margin: "0 auto", 
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Mission Section */}
          <div style={{ 
            textAlign: "center", 
            marginBottom: windowWidth < 768 ? "60px" : "80px",
            width: "100%"
          }}>
            <h2 style={{ 
              color: "#1e293b", 
              fontSize: windowWidth < 768 ? "2rem" : windowWidth < 1024 ? "2.5rem" : "3rem", 
              fontWeight: "800",
              fontFamily: "'Montserrat', 'Playfair Display', serif",
              letterSpacing: "-0.5px",
              marginBottom: "40px"
            }}>
              Our Mission
            </h2>
            <p style={{ 
              color: "#64748b", 
              fontSize: windowWidth < 768 ? "1rem" : windowWidth < 1024 ? "1.15rem" : "1.3rem",
              fontWeight: "400",
              fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
              lineHeight: "1.8",
              maxWidth: "1000px",
              margin: "0 auto",
              width: "100%"
            }}>
              To democratize access to professional resume optimization tools, making it easier for job seekers to present their best selves to potential employers. We believe everyone deserves a fair chance at their dream job.
            </p>
          </div>

          {/* Team Section */}
          <div style={{ width: "100%" }}>
            <h2 style={{ 
              color: "#1e293b", 
              fontSize: windowWidth < 768 ? "2rem" : windowWidth < 1024 ? "2.5rem" : "3rem", 
              fontWeight: "800",
              fontFamily: "'Montserrat', 'Playfair Display', serif",
              letterSpacing: "-0.5px",
              textAlign: "center",
              marginBottom: windowWidth < 768 ? "40px" : "60px"
            }}>
              Meet the Team
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: windowWidth < 768 ? "1fr" : windowWidth < 1024 ? "repeat(2, 1fr)" : "repeat(3, 1fr)", 
              gap: windowWidth < 768 ? "30px" : "40px",
              width: "100%",
              maxWidth: "100%",
              justifyContent: "center",
              justifyItems: "center"
            }}>
              {/* Michael Serbeh */}
              <div style={{ 
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: windowWidth < 768 ? "30px 20px" : "40px 30px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
              }}
              >
                <div style={{
                  width: windowWidth < 768 ? "80px" : "100px",
                  height: windowWidth < 768 ? "80px" : "100px",
                  borderRadius: "20px",
                  margin: "0 auto 25px",
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                  border: "3px solid #e5e7eb"
                }}>
                  <img 
                    src="/michael-profilepic.jpg?v=1" 
                    alt="Michael Serbeh"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "17px"
                    }}
                  />
                </div>
                <h3 style={{ 
                  color: "#1e293b", 
                  fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
                  fontWeight: "800",
                  fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                  marginBottom: "12px",
                  letterSpacing: "0.5px"
                }}>
                  Michael Serbeh
                </h3>
                <p style={{ 
                  color: "#667eea", 
                  fontSize: windowWidth < 768 ? "0.95rem" : "1.1rem",
                  fontWeight: "600",
                  fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "16px"
                }}>
                  Lead Developer & AI Specialist
                </p>
                <p style={{ 
                  color: "#64748b", 
                  fontSize: windowWidth < 768 ? "0.9rem" : "1rem",
                  fontWeight: "400",
                  fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
                  lineHeight: "1.6",
                  marginBottom: "20px"
                }}>
                  Passionate tech enthusiast specializing in AI, ML, Cybersecurity, and Software Engineering. Currently at Stetson University, creating innovative solutions to help job seekers optimize their resumes and land dream positions.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  <a href="https://github.com/Michael5577" target="_blank" rel="noopener noreferrer" style={{ 
                    color: "#667eea", 
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.3s ease"
                  }}>
                    GitHub
                  </a>
                  <span style={{ color: "#ff6b9d", fontSize: "1.2rem" }}>✦</span>
                  <a href="https://www.linkedin.com/in/michael-serbeh-421895281/" target="_blank" rel="noopener noreferrer" style={{ 
                    color: "#f5576c", 
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.3s ease"
                  }}>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Silvana Diaz */}
              <div style={{ 
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: windowWidth < 768 ? "30px 20px" : "40px 30px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
              }}
              >
                <div style={{
                  width: windowWidth < 768 ? "80px" : "100px",
                  height: windowWidth < 768 ? "80px" : "100px",
                  borderRadius: "20px",
                  margin: "0 auto 25px",
                  boxShadow: "0 8px 20px rgba(79, 172, 254, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                  border: "3px solid #e5e7eb"
                }}>
                  <img 
                    src="/silvana-profile.jpg?v=1" 
                    alt="Silvana Diaz"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "17px"
                    }}
                  />
                </div>
                <h3 style={{ 
                  color: "#1e293b", 
                  fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
                  fontWeight: "800",
                  fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                  marginBottom: "12px",
                  letterSpacing: "0.5px"
                }}>
                  Silvana Diaz
                </h3>
                <p style={{ 
                  color: "#4facfe", 
                  fontSize: windowWidth < 768 ? "0.95rem" : "1.1rem",
                  fontWeight: "600",
                  fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "16px"
                }}>
                  Creative Designer & Brand Specialist
                </p>
                <p style={{ 
                  color: "#64748b", 
                  fontSize: windowWidth < 768 ? "0.9rem" : "1rem",
                  fontWeight: "400",
                  fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
                  lineHeight: "1.6",
                  marginBottom: "20px"
                }}>
                  Talented designer with a keen eye for aesthetics and brand identity. Specializes in creating visually stunning and user-friendly interfaces that engage and delight users.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  <a href="https://github.com/Sdiaz6" target="_blank" rel="noopener noreferrer" style={{ 
                    color: "#4facfe", 
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.3s ease"
                  }}>
                    GitHub
                  </a>
                  <span style={{ color: "#ff6b9d", fontSize: "1.2rem" }}>✦</span>
                  <a href="https://www.linkedin.com/in/silvana-diaz-8612662b5" target="_blank" rel="noopener noreferrer" style={{ 
                    color: "#f5576c", 
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.3s ease"
                  }}>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Gillian Dodge */}
              <div style={{ 
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: windowWidth < 768 ? "30px 20px" : "40px 30px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
              }}
              >
                <div style={{
                  width: windowWidth < 768 ? "80px" : "100px",
                  height: windowWidth < 768 ? "80px" : "100px",
                  borderRadius: "20px",
                  margin: "0 auto 25px",
                  boxShadow: "0 8px 20px rgba(240, 147, 251, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                  border: "3px solid #e5e7eb"
                }}>
                  <img 
                    src="/gillian-profile.jpeg?v=1" 
                    alt="Gillian Dodge"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "17px"
                    }}
                  />
                </div>
                <h3 style={{ 
                  color: "#1e293b", 
                  fontSize: windowWidth < 768 ? "1.5rem" : "2rem",
                  fontWeight: "800",
                  fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                  marginBottom: "12px",
                  letterSpacing: "0.5px"
                }}>
                  Gillian Dodge
                </h3>
                <p style={{ 
                  color: "#f093fb", 
                  fontSize: windowWidth < 768 ? "0.95rem" : "1.1rem",
                  fontWeight: "600",
                  fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "16px"
                }}>
                  Software Developer & Data Analyst
                </p>
                <p style={{ 
                  color: "#64748b", 
                  fontSize: windowWidth < 768 ? "0.9rem" : "1rem",
                  fontWeight: "400",
                  fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
                  lineHeight: "1.6",
                  marginBottom: "20px"
                }}>
                  Skilled software developer with expertise in data analysis and performance optimization. Passionate about using technology to solve real-world problems and improve team performance.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  <a href="https://github.com/gilliandodge" target="_blank" rel="noopener noreferrer" style={{ 
                    color: "#f093fb", 
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.3s ease"
                  }}>
                    GitHub
                  </a>
                  <span style={{ color: "#ff6b9d", fontSize: "1.2rem" }}>✦</span>
                  <a href="http://linkedin.com/in/gillian-dodge" target="_blank" rel="noopener noreferrer" style={{ 
                    color: "#f5576c", 
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.3s ease"
                  }}>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
