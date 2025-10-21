import React from "react";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        padding: "120px 40px 80px",
        position: "relative",
        overflow: "hidden"
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
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ 
            fontSize: "4.5rem", 
            fontWeight: "900",
            color: "#ffffff",
            marginBottom: "25px",
            fontFamily: "'Montserrat', 'Playfair Display', serif",
            letterSpacing: "-1px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
          }}>
            About Us
          </h1>
          <p style={{ 
            fontSize: "1.6rem", 
            color: "rgba(255, 255, 255, 0.9)",
            fontWeight: "500",
            fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
            letterSpacing: "0.3px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            We're passionate about helping job seekers land their dream careers through intelligent resume analysis and optimization.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ 
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.75) 100%)",
        backdropFilter: "blur(20px)",
        padding: "100px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(60deg, transparent 0%, rgba(102, 126, 234, 0.05) 25%, transparent 50%, rgba(240, 147, 251, 0.05) 75%, transparent 100%)
          `,
          backgroundSize: "150px 150px",
          animation: "float 12s ease-in-out infinite"
        }}></div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{ 
            color: "#1e293b", 
            fontSize: "3rem", 
            fontWeight: "800",
            fontFamily: "'Montserrat', 'Playfair Display', serif",
            letterSpacing: "-0.5px",
            marginBottom: "40px"
          }}>
            Our Mission
          </h2>
          <p style={{ 
            color: "#64748b", 
            fontSize: "1.3rem",
            fontWeight: "400",
            fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
            lineHeight: "1.8",
            maxWidth: "900px",
            margin: "0 auto"
          }}>
            To democratize access to professional resume optimization tools, making it easier for job seekers to present their best selves to potential employers. We believe everyone deserves a fair chance at their dream job.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ 
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.75) 100%)",
        backdropFilter: "blur(20px)",
        padding: "80px 40px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(60deg, transparent 0%, rgba(102, 126, 234, 0.05) 25%, transparent 50%, rgba(240, 147, 251, 0.05) 75%, transparent 100%)
          `,
          backgroundSize: "150px 150px",
          animation: "float 12s ease-in-out infinite"
        }}></div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{ 
            color: "#1e293b", 
            fontSize: "3rem", 
            fontWeight: "800",
            fontFamily: "'Montserrat', 'Playfair Display', serif",
            letterSpacing: "-0.5px",
            textAlign: "center",
            marginBottom: "60px"
          }}>
            Meet the Team
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
            gap: "50px",
            marginTop: "60px"
          }}>
            {/* Michael Serbeh */}
            <div style={{ 
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.75) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "25px",
              padding: "40px 30px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(102, 126, 234, 0.2)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                transform: "scaleX(0)",
                transition: "transform 0.3s ease"
              }}></div>
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "25px",
                margin: "0 auto 30px",
                boxShadow: "0 12px 30px rgba(102, 126, 234, 0.4)",
                position: "relative",
                overflow: "hidden",
                transform: "rotate(-5deg)",
                transition: "transform 0.3s ease",
                border: "3px solid rgba(255, 255, 255, 0.3)"
              }}>
                <img 
                  src="/michael-profilepic.jpg?v=1" 
                  alt="Michael Serbeh"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "22px"
                  }}
                />
              </div>
              <h3 style={{ 
                color: "#1e293b", 
                fontSize: "2rem",
                fontWeight: "800",
                fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                marginBottom: "15px",
                letterSpacing: "0.5px"
              }}>
                Michael Serbeh
              </h3>
              <p style={{ 
                color: "#667eea", 
                fontSize: "1.1rem",
                fontWeight: "600",
                fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}>
                Lead Developer & AI Specialist
              </p>
              <p style={{ 
                color: "#64748b", 
                fontSize: "1rem",
                fontWeight: "400",
                fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
                lineHeight: "1.6",
                marginBottom: "25px"
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
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.75) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "25px",
              padding: "40px 30px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(79, 172, 254, 0.2)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)",
                transform: "scaleX(0)",
                transition: "transform 0.3s ease"
              }}></div>
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "25px",
                margin: "0 auto 30px",
                boxShadow: "0 12px 30px rgba(79, 172, 254, 0.4)",
                position: "relative",
                overflow: "hidden",
                transform: "rotate(-5deg)",
                transition: "transform 0.3s ease",
                border: "3px solid rgba(255, 255, 255, 0.3)"
              }}>
                <img 
                  src="/silvana-profile.jpg?v=1" 
                  alt="Silvana Diaz"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "22px"
                  }}
                />
              </div>
              <h3 style={{ 
                color: "#1e293b", 
                fontSize: "2rem",
                fontWeight: "800",
                fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                marginBottom: "15px",
                letterSpacing: "0.5px"
              }}>
                Silvana Diaz
              </h3>
              <p style={{ 
                color: "#4facfe", 
                fontSize: "1.1rem",
                fontWeight: "600",
                fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}>
                Creative Designer & Brand Specialist
              </p>
              <p style={{ 
                color: "#64748b", 
                fontSize: "1rem",
                fontWeight: "400",
                fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
                lineHeight: "1.6",
                marginBottom: "25px"
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
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.75) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "25px",
              padding: "40px 30px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(240, 147, 251, 0.2)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
                transform: "scaleX(0)",
                transition: "transform 0.3s ease"
              }}></div>
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "25px",
                margin: "0 auto 30px",
                boxShadow: "0 12px 30px rgba(240, 147, 251, 0.4)",
                position: "relative",
                overflow: "hidden",
                transform: "rotate(-5deg)",
                transition: "transform 0.3s ease",
                border: "3px solid rgba(255, 255, 255, 0.3)"
              }}>
                <img 
                  src="/gillian-profile.jpeg?v=1" 
                  alt="Gillian Dodge"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "22px"
                  }}
                />
              </div>
              <h3 style={{ 
                color: "#1e293b", 
                fontSize: "2rem",
                fontWeight: "800",
                fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                marginBottom: "15px",
                letterSpacing: "0.5px"
              }}>
                Gillian Dodge
              </h3>
              <p style={{ 
                color: "#f093fb", 
                fontSize: "1.1rem",
                fontWeight: "600",
                fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "20px"
              }}>
                Software Developer & Data Analyst
              </p>
              <p style={{ 
                color: "#64748b", 
                fontSize: "1rem",
                fontWeight: "400",
                fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
                lineHeight: "1.6",
                marginBottom: "25px"
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
      </section>
    </div>
  );
};

export default About;