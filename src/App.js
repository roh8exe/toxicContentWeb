import React, { useState, useRef } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import 'react-transliterate/dist/index.css';
import ToxicityChecker from './checker.js';
import { useEffect } from 'react';
import TeamSlider from './TeamSlider'; // Import the TeamSlider component
import WorkProcess from './WorkProcess.js';
import './App.css';

const WebsiteWithToxicityChecker = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Refs for scroll targets
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const processRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="brand">
            <span className="app-title">ToxiGuard</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <a onClick={() => scrollToSection(homeRef)} className="nav-link">Home</a>
            <a onClick={() => scrollToSection(aboutRef)} className="nav-link">About Us</a>
            <a onClick={() => scrollToSection(processRef)} className="nav-link">Work Process</a>
            <a onClick={() => scrollToSection(teamRef)} className="nav-link">Our Team</a>
            <a onClick={() => scrollToSection(contactRef)} className="nav-link">Contact</a>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen}>
            <div>
           <span />
            <span />
           <span />
          </div>
        </button>
        </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMenuOpen ? '' : 'hidden'}`}>
          <button onClick={() => scrollToSection(homeRef)} className="mobile-menu-link">Home</button>
          <button onClick={() => scrollToSection(aboutRef)} className="mobile-menu-link">About Us</button>
          <button onClick={() => scrollToSection(processRef)} className="mobile-menu-link">Work Process</button>
          <button onClick={() => scrollToSection(teamRef)} className="mobile-menu-link">Our Team</button>
         <button onClick={() => scrollToSection(contactRef)} className="mobile-menu-link">Contact</button>
        </div>
      </nav>

      {/* Home Section */}
      <section ref={homeRef} className="hero-section">
        <div className="section-container">
          <h1 className="hero-title">
            Detect Toxic Content <span>Instantly</span>
          </h1>
          <p className="hero-subtitle">
            Analyze and identify toxic content across multiple languages
          </p>
          <ChevronDown className="w-8 h-8 mx-auto animate-bounce" />
          <ToxicityChecker/>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section bg-gray-50">
        <div className="section-container">
          <h2 className="section-title">About Us</h2>
          <p className="text-gray-600">
            We're dedicated to making the internet a safer place by providing advanced content moderation tools. Our AI-powered system helps identify and prevent toxic content across multiple languages and platforms.
          </p>
        </div>
      </section>

      {/* Work Process Section */}
      <section ref={processRef}>
        <WorkProcess />
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section bg-gray-50">
        <div className="section-container">
          <h2 className="section-title">Our Team</h2>
          <TeamSlider /> {/* Use TeamSlider component here */}
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
      <section ref={contactRef} className="section">
        <div className="section-container">
          <h2 className="section-title">Contact Us</h2>
          <form className="contact-form">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" rows="4"></textarea>
            </div>
            <button type="submit" className="analyze-button">Send Message</button>
          </form>
        </div>
      </section>
<section className="profile-section bg-white py-16">
      <div className="section-container">
        <div className="profile-content text-center max-w-3xl mx-auto">
          {/* Profile Name */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Prof. Mayank Singh</h2>
          
          {/* Address */}
          <div className="address-info text-gray-600 mb-8 space-y-2">
            <p>AB 13/402 B,</p>
            <p>Indian Institute of Technology Gandhinagar</p>
            <p>Palaj, Gandhinagar – 382355, Gujarat</p>
          </div>

          {/* Social Media Links */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center gap-6">
              <a href="https://x.com/lingoiitgn" className="social-link twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={24} />
              </a>
              <a href="https://www.linkedin.com/company/lingo-labs-iitgn/" className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/lingo-iitgn" className="social-link github" target="_blank" rel="noopener noreferrer">
                <Github size={24} />
              </a>
              <a href="https://www.youtube.com/@LingoResearchGroupIITGN" className="social-link youtube" target="_blank" rel="noopener noreferrer">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default WebsiteWithToxicityChecker;