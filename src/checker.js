import React, { useState, useEffect, useRef } from 'react';
import { ReactTransliterate } from 'react-transliterate';
import { Mic } from 'lucide-react';
import 'react-transliterate/dist/index.css';
import './checker.css';

const ToxicityChecker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [text, setText] = useState('');
  const [toxicityScore, setToxicityScore] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  

  // Language mapping for transliteration
  const languages = [
    { code: 'en', name: 'English', transliterateCode: 'en' },
    { code: 'hi', name: 'Hindi', transliterateCode: 'hi' },
    { code: 'bn', name: 'Bengali', transliterateCode: 'bn' },
    { code: 'gu', name: 'Gujarati', transliterateCode: 'gu' },
    { code: 'pa', name: 'Punjabi', transliterateCode: 'pa' },
    { code: 'ta', name: 'Tamil', transliterateCode: 'ta' },
    { code: 'te', name: 'Telugu', transliterateCode: 'te' },
    { code: 'mr', name: 'Marathi', transliterateCode: 'mr' },
    { code: 'ur', name: 'Urdu', transliterateCode: 'ur' },
    { code: 'sa', name: 'Sanskrit', transliterateCode: 'sa' },
    { code: 'ml', name: 'Malayalam', transliterateCode: 'ml' },
    { code: 'kn', name: 'Kannada', transliterateCode: 'kn' },
    { code: 'or', name: 'Odia', transliterateCode: 'or' },
    { code: 'as', name: 'Assamese', transliterateCode: 'bn' } // Assamese uses Bengali script
  ];

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ');
        setText(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        setError('Speech recognition failed. Please try again.');
        setIsListening(false);
      };
    } else {
      setError('Speech recognition is not supported in your browser.');
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    const selectedLang = languages.find(lang => lang.code === selectedLanguage);
    recognitionRef.current.lang = selectedLang?.code || 'en';
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
  };

  const analyzeToxicity = async () => {
    if (!text.trim()) {
        setError('Please enter some text to analyze.');
        return;
      }
    try {
      const mockResponse = { score: Math.floor(Math.random() * 100) };
      setToxicityScore(mockResponse.score);
    } catch (error) {
      setError('Failed to analyze toxicity. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <div className="nav-content">
        </div>
      </nav>

      <div className="main-content">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title" >Content Toxicity Analyzer</h1>
          </div>
          <div className="card-content">
            {error && <div className="error-message">{error}</div>}

            <div className="input-group">
              <label className="input-label">Select Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="language-select"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Enter Text to Analyze</label>
              <div className="input-wrapper">
                <ReactTransliterate
                  renderComponent={(props) => <textarea {...props} className="text-input" />}
                  value={text}
                  onChangeText={setText}
                  lang={languages.find(l => l.code === selectedLanguage)?.transliterateCode || 'en'}
                  containerClassName="custom-suggestion-box" 
                />
                <button className={`mic-button ${isListening ? 'listening' : ''}`} onClick={toggleListening}>
                <Mic size={20} />
                </button>
              </div>
            </div>

            <button onClick={analyzeToxicity} className="analyze-button">
              Analyze Toxicity
            </button>

            {toxicityScore !== null && (
              <div className="results-container">
                <h3>Analysis Results</h3>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${toxicityScore}%`, backgroundColor: `hsl(${120 - toxicityScore * 1.2}, 70%, 50%)` }} />
                  </div>
                  <span>{toxicityScore}%</span>
                </div>
                <p>{toxicityScore < 30 ? 'Low toxicity' : toxicityScore < 70 ? 'Moderate toxicity' : 'High toxicity'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToxicityChecker;