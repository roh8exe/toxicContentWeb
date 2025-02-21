// App.js
import React, { useState, useRef } from 'react';
import { ChevronDown, ExternalLink, Users } from 'lucide-react';
import { Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import 'react-transliterate/dist/index.css';
import ToxicityChecker from './checker.js';
import { useEffect } from 'react';
import TeamSection from './TeamSlider'; 
import WorkProcess from './WorkProcess.js';
import ShieldIllustration from './ShieldIllustration';
import './App.css';
import './animations.css';
import './bubble.css';
import './shield-illustration.css';

const WebsiteWithToxicityChecker = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [visibleSections, setVisibleSections] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbw5HxxBkUp2GU45IwyUuNRmPLeCHIl1sPQFKfRWqioZWTVK-3EO-Tzcvf2rlu2Blef15Q/exec";

    try {
      const response = await fetch(googleScriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert("Message Sent Successfully!");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert("Error sending message.");
      console.error("Error:", error);
    }
  };
  
  // Refs for scroll targets
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const processRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);
  const toxicityCheckerRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const scrollToToxicityChecker = () => {
    toxicityCheckerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Set up intersection observer for animation
  useEffect(() => {
    // Scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            entry.target.classList.add('animate-visible');
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen enhanced-website">
      {/* Bubbles Animation */}
      <div className="bubbles-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      
      {/* Navigation Bar */}
      <nav className="nav-bar enhanced-nav">
        <div className="nav-container">
          <div className="brand">
            <span className="app-title animate-glow">UnityAI-Guard</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <a onClick={() => scrollToSection(homeRef)} className="nav-link hover-effect">Home</a>
            <a onClick={() => scrollToSection(aboutRef)} className="nav-link hover-effect">About Us</a>
            <a onClick={() => scrollToSection(processRef)} className="nav-link hover-effect">Work Process</a>
            <a onClick={() => scrollToSection(teamRef)} className="nav-link hover-effect">Our Team</a>
            <a onClick={() => scrollToSection(contactRef)} className="nav-link hover-effect">Contact</a>
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

      {/* Updated Home Section with 3D Illustration */}
      <section ref={homeRef} className="hero-section enhanced-hero">
  <div className="section-container">
    <div className="hero-illustration-layout">
      {/* Text container on the left */}
      <div className="hero-text-container">
        <h1 className="hero-title gradient-text animate-on-scroll" id="hero-title">
          Detect Toxic Content <span>Instantly!</span>
        </h1>
        <p className="hero-subtitle animate-on-scroll" id="hero-subtitle">
        <span className="hero-subtitle-animated">
        Analyze and identify toxic content across multiple Indian languages. 
        </span>
        </p>
        <ChevronDown 
          className="animate-bounce-enhanced"
          onClick={scrollToToxicityChecker} />
      </div>
      
      {/* Shield illustration on the right, side by side with text */}
      <div className="shield-illustration-container animate-on-scroll" id="hero-illustration">
        <ShieldIllustration />
      </div>
    </div>
    
    <div ref={toxicityCheckerRef} className="checker-container animate-on-scroll" id="toxicity-checker"> 
      <ToxicityChecker/>
    </div>
  </div>
</section>

      {/* About Section */}
      <section ref={aboutRef} className="section enhanced-section animate-on-scroll" id="about-section">
        <div className="section-container">
          <h2 className="section-title">About Us</h2>
          <div className="feature-cards">
            <div className="feature-card animate-on-scroll" id="feature-1">
              <div className="feature-icon"></div>
              <h3>Real-time Detection</h3>
              <p>Instantly identify toxic content across platforms</p>
            </div>
            <div className="feature-card animate-on-scroll" id="feature-2">
              <div className="feature-icon"></div>
              <h3>Multi-language Support</h3>
              <p>Analyze content in various languages and dialects</p>
            </div>
            <div className="feature-card animate-on-scroll" id="feature-3">
              <div className="feature-icon"></div>
              <h3>Advanced AI</h3>
              <p>Powered by cutting-edge machine learning algorithms</p>
            </div>
          </div>
          <p className="text-gray-600 animate-on-scroll" id="about-text">
            We're dedicated to making the internet a safer place by providing advanced content moderation tools. Our AI-powered system helps identify and prevent toxic content across multiple languages and platforms.
          </p>
        </div>
      </section>

      {/* Work Process Section */}
      <section ref={processRef} className="enhanced-process-section animate-on-scroll" id="process-section">
        <WorkProcess />
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section animate-on-scroll" id="team-section">
  <TeamSection />
</section>

      {/* Contact Section */}
      <section ref={contactRef} className="section enhanced-contact-section animate-on-scroll" id="contact-section">
        <div className="section-container">
          <h2 className="section-title">Feedback Form</h2>
          <form className="contact-form enhanced-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-input enhanced-input" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-input enhanced-input" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea name="message" className="form-textarea enhanced-input" rows="4" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="analyze-button enhanced-button">Send Message</button>
          </form>
        </div>
      </section>

      <section className="profile-section enhanced-profile-section bg-white py-16 animate-on-scroll" id="profile-section">
        <div className="section-container">
          <div className="profile-content text-center max-w-3xl mx-auto">
            {/* Profile Name */}
            {/* <h2 className="text-3xl font-bold text-gray-900 mb-4">Prof. Mayank Singh</h2> */}
            
            {/* Address */}
            <div className="address-info text-gray-600 mb-8 space-y-2">
              
              <p>Indian Institute of Technology Gandhinagar</p>
              <p>Palaj, Gandhinagar – 382355, Gujarat</p>
            </div>

            {/* Social Media Links */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="social-links">
                <a href="https://x.com/lingoiitgn" className="social-link twitter" target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </a>
                <a href="https://www.linkedin.com/company/lingo-labs-iitgn/" className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                  <Linkedin />
                </a>
                <a href="https://github.com/lingo-iitgn" className="social-link github" target="_blank" rel="noopener noreferrer">
                  <Github />
                </a>
                <a href="https://www.youtube.com/@LingoResearchGroupIITGN" className="social-link youtube" target="_blank" rel="noopener noreferrer">
                  <Youtube />
                </a>
                <a href="https://lingo.iitgn.ac.in/" className="social-link ExternalLink" target="_blank" rel="noopener noreferrer">
                  <ExternalLink />
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