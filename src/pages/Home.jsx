import React from "react";

const Home = () => {
  return (
    <div>
      <section className="hero-section">
        <h1>Welcome to <span className="accent">Resume Rater</span></h1>
        <p>Your AI-powered tool to improve resumes and job matches</p>
        <button className="btn-custom mt-3">Get Started</button>
      </section>

      <section>
        <h2 className="section-title">Features</h2>
        <div className="card-custom">
          <h3>Instant AI Feedback</h3>
          <p>Check grammar, formatting, and keyword match instantly.</p>
        </div>
        <div className="card-custom">
          <h3>Actionable Advice</h3>
          <p>Get clear suggestions to improve your resume immediately.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
