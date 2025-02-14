import React, { useState, useRef } from 'react';
import { ChevronDown, Users, Info, Phone, GitBranch } from 'lucide-react';
import ToxicityChecker from './checker.js';
import './App.css';

const WebsiteWithToxicityChecker = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for scroll targets
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const processRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
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
            <button onClick={() => scrollToSection(homeRef)} className="nav-link">Home</button>
            <button onClick={() => scrollToSection(aboutRef)} className="nav-link">About Us</button>
            <button onClick={() => scrollToSection(processRef)} className="nav-link">Work Process</button>
            <button onClick={() => scrollToSection(teamRef)} className="nav-link">Our Team</button>
            <button onClick={() => scrollToSection(contactRef)} className="nav-link">Contact</button>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="h-6 w-6 flex flex-col justify-between">
                <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
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
      <section ref={processRef} className="section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Input Text</h3>
              <p>Enter or paste the content you want to analyze</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Analysis</h3>
              <p>Our AI analyzes the content for toxic elements</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Results</h3>
              <p>Get instant feedback on content toxicity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section bg-gray-50">
        <div className="section-container">
          <h2 className="section-title">Our Team</h2>
          <div className="team-grid">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="team-member">
                <div className="team-avatar">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3>Team Member {member}</h3>
                <p className="text-gray-600">Role Description</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default WebsiteWithToxicityChecker;