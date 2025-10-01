import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
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
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
          <h1 style={{ 
            fontSize: "5.2rem", 
            marginBottom: "30px",
            lineHeight: "1.05",
            fontFamily: "'Montserrat', 'Playfair Display', serif",
            fontWeight: "900",
            letterSpacing: "-1.5px",
            color: "#ffffff",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
          }}>
            Welcome to <span className="accent" style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Resume Review</span>
          </h1>
          <p style={{ 
            fontSize: "1.9rem", 
            marginBottom: "20px",
            fontWeight: "500",
            fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
            letterSpacing: "0.3px",
            lineHeight: "1.6",
            color: "rgba(255, 255, 255, 0.95)",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
          }}>
            Your professional tool to improve resumes and land dream jobs
          </p>
          <p style={{ 
            fontSize: "1.3rem", 
            marginBottom: "45px",
            opacity: "0.9",
            fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
            fontWeight: "400",
            letterSpacing: "0.2px",
            color: "rgba(255, 255, 255, 0.9)",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
          }}>
            Trusted by 50,000+ job seekers • 95% success rate • Instant analysis
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/resume-rater" className="btn-custom" style={{ 
              padding: "18px 40px", 
              fontSize: "1.3rem",
              textDecoration: "none"
            }}>
              Get Started
            </Link>
            <Link to="/about" className="btn-custom" style={{ 
              padding: "18px 40px", 
              fontSize: "1.3rem",
              background: "transparent",
              border: "2px solid #ffcad4",
              textDecoration: "none"
            }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.75) 100%)",
        backdropFilter: "blur(20px)",
        padding: "80px 40px",
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
            linear-gradient(45deg, transparent 0%, rgba(102, 126, 234, 0.05) 25%, transparent 50%, rgba(240, 147, 251, 0.05) 75%, transparent 100%)
          `,
          backgroundSize: "100px 100px",
          animation: "float 10s ease-in-out infinite"
        }}></div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{ 
            color: "#1e293b", 
            fontSize: "2.8rem", 
            marginBottom: "60px",
            fontWeight: "800",
            fontFamily: "'Montserrat', 'Playfair Display', serif",
            letterSpacing: "-0.5px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
          }}>
            Join Thousands of Successful Job Seekers
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "40px" 
          }}>
            {[
              { number: "50K+", label: "Resumes Analyzed" },
              { number: "95%", label: "Success Rate" },
              { number: "2.3x", label: "More Interviews" },
              { number: "24/7", label: "AI Analysis" }
            ].map((stat, index) => (
              <div key={index} className="card-custom" style={{ 
                padding: "30px 20px",
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <div style={{ 
                  fontSize: "3.2rem", 
                  fontWeight: "800", 
                  color: "#1e293b",
                  marginBottom: "12px",
                  fontFamily: "'Montserrat', 'Poppins', sans-serif",
                  letterSpacing: "-0.5px"
                }}>
                  {stat.number}
                </div>
                <div style={{ 
                  fontSize: "1.2rem", 
                  fontWeight: "600",
                  color: "#64748b",
                  fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                  letterSpacing: "0.3px"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        background: "#fff0f5", 
        padding: "100px 40px" 
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="section-title">Why Choose Resume Rater?</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
            gap: "40px" 
          }}>
            <div className="card-custom" style={{ 
              padding: "40px 30px",
              textAlign: "left"
            }}>
              <div style={{ 
                fontSize: "3rem", 
                marginBottom: "20px",
                textAlign: "center",
                color: "#667eea"
              }}>
                ⚡
              </div>
              <h3 style={{ 
                fontSize: "1.6rem", 
                marginBottom: "18px",
                textAlign: "center",
                fontFamily: "'Poppins', 'Source Sans Pro', sans-serif",
                fontWeight: "700",
                color: "#1e293b",
                letterSpacing: "0.3px"
              }}>
                Advanced Analysis Engine
              </h3>
              <p style={{ 
                fontSize: "1.15rem", 
                lineHeight: "1.7",
                textAlign: "center",
                fontFamily: "'Source Sans Pro', 'Inter', sans-serif",
                fontWeight: "500",
                color: "#64748b",
                letterSpacing: "0.2px"
              }}>
                Our advanced system analyzes your resume across 6 key dimensions: content quality, 
                formatting, keyword optimization, ATS compatibility, achievement impact, and professional tone.
              </p>
            </div>
            
            <div className="card-custom" style={{ 
              padding: "40px 30px",
              textAlign: "left"
            }}>
              <div style={{ 
                fontSize: "3rem", 
                marginBottom: "20px",
                textAlign: "center",
                color: "#667eea"
              }}>
                ⚡
              </div>
              <h3 style={{ 
                fontSize: "1.5rem", 
                marginBottom: "15px",
                textAlign: "center"
              }}>
                Instant Results
              </h3>
              <p style={{ 
                fontSize: "1.1rem", 
                lineHeight: "1.6",
                textAlign: "center"
              }}>
                Get comprehensive feedback in under 30 seconds. No waiting, no delays - 
                just instant, actionable insights to improve your resume immediately.
              </p>
            </div>
            
            <div className="card-custom" style={{ 
              padding: "40px 30px",
              textAlign: "left"
            }}>
              <div style={{ 
                fontSize: "3rem", 
                marginBottom: "20px",
                textAlign: "center",
                color: "#667eea"
              }}>
                🎯
              </div>
              <h3 style={{ 
                fontSize: "1.5rem", 
                marginBottom: "15px",
                textAlign: "center"
              }}>
                Personalized Feedback
              </h3>
              <p style={{ 
                fontSize: "1.1rem", 
                lineHeight: "1.6",
                textAlign: "center"
              }}>
                Receive tailored recommendations based on your specific resume content. 
                Our system provides human-like feedback that's both encouraging and constructive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ 
        background: "#ffffff", 
        padding: "100px 40px" 
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="section-title">How It Works</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "50px",
            marginTop: "60px"
          }}>
            {[
              { 
                step: "1", 
                title: "Upload Your Resume", 
                description: "Simply drag and drop your resume file or click to browse. We support PDF, DOCX, and TXT formats.",
                icon: "📄"
              },
              { 
                step: "2", 
                title: "System Analysis", 
                description: "Our advanced system analyzes your resume across multiple dimensions in real-time, providing comprehensive insights.",
                icon: "🔍"
              },
              { 
                step: "3", 
                title: "Get Results", 
                description: "Receive detailed scores, personalized feedback, and actionable recommendations to improve your resume.",
                icon: "📊"
              }
            ].map((item, index) => (
              <div key={index} style={{ 
                textAlign: "center",
                position: "relative"
              }}>
                <div style={{ 
                  width: "80px", 
                  height: "80px", 
                  background: "#ffcad4", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  margin: "0 auto 25px",
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#ffffff"
                }}>
                  {item.step}
                </div>
                <div style={{ 
                  fontSize: "3rem", 
                  marginBottom: "20px" 
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  color: "#667eea", 
                  fontSize: "1.4rem", 
                  marginBottom: "15px",
                  fontWeight: "600"
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  color: "#667eea", 
                  fontSize: "1rem", 
                  lineHeight: "1.6",
                  maxWidth: "280px",
                  margin: "0 auto"
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: "linear-gradient(135deg, #ffcad4 0%, #ffd3e0 100%)", 
        padding: "80px 40px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ 
            color: "#ffffff", 
            fontSize: "3rem", 
            marginBottom: "25px",
            fontWeight: "700"
          }}>
            Ready to Land Your Dream Job?
          </h2>
          <p style={{ 
            color: "#ffffff", 
            fontSize: "1.3rem", 
            marginBottom: "40px",
            opacity: "0.9"
          }}>
            Join thousands of successful job seekers who have improved their resumes with our advanced analysis system.
          </p>
          <Link to="/resume-rater" className="btn-custom" style={{ 
            padding: "20px 50px", 
            fontSize: "1.4rem",
            textDecoration: "none",
            background: "#ffffff",
            color: "#ffcad4",
            fontWeight: "700"
          }}>
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
