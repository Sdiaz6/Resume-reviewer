import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ResumeRater from "./pages/ResumeRater";
import Footer from "./components/Footer";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">Resume Rater</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/resume-rater" className="nav-link">Resume Tool</Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="content-wrapper container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume-rater" element={<ResumeRater />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
