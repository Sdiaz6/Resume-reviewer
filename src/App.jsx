import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ResumeRater from "./pages/ResumeRater";
import BuildResume from "./pages/BuildResume";
import Templates from "./pages/Templates";
import Navbar from "./pages/NavBar";
import Footer from "./pages/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/resume-rater" element={<ResumeRater />} />
        <Route path="/build-resume" element={<BuildResume />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
