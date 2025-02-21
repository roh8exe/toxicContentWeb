import React, { useState, useEffect, useRef } from 'react';
import { ReactTransliterate } from 'react-transliterate';
import { 
  Mic, 
  AlertTriangle, 
  Shield, 
  ChevronRight, 
  BarChart2, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Globe,
  FileText,
  Activity
} from 'lucide-react';
import 'react-transliterate/dist/index.css';
import './checker.css';  // Keep your original CSS for compatibility

const ToxicityChecker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [text, setText] = useState('');
  const [toxicityScore, setToxicityScore] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  // Language mapping for transliteration
  const languages = [
    //{ code: 'as', name: 'Assamese', transliterateCode: 'bn' },
    //{ code: 'bn', name: 'Bengali', transliterateCode: 'bn' },
    // { code: 'en', name: 'English', transliterateCode: 'en' },
   // { code: 'gu', name: 'Gujarati', transliterateCode: 'gu' },
    { code: 'hi', name: 'Hindi', transliterateCode: 'hi' },
   //{ code: 'kn', name: 'Kannada', transliterateCode: 'kn' },
    //{ code: 'ml', name: 'Malayalam', transliterateCode: 'ml' },
    //{ code: 'mr', name: 'Marathi', transliterateCode: 'mr' },
    //{ code: 'or', name: 'Odia', transliterateCode: 'or' },
   // { code: 'pa', name: 'Punjabi', transliterateCode: 'pa' },
   // { code: 'sa', name: 'Sanskrit', transliterateCode: 'sa' },
   // { code: 'ta', name: 'Tamil', transliterateCode: 'ta' },
    { code: 'te', name: 'Telugu', transliterateCode: 'te' },
    //{ code: 'ur', name: 'Urdu', transliterateCode: 'ur' }
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
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setError(null); // Clear any previous errors
      const selectedLang = languages.find(lang => lang.code === selectedLanguage);
      recognitionRef.current.lang = selectedLang?.code || 'en';
      recognitionRef.current.start();
    }
  };

  const analyzeToxicity = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
  
    setError(null);
    setIsAnalyzing(true);
  
    try {
      const response = await fetch("http://10.196.35.8:2026/predict", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch toxicity analysis.");
      }
  
      const data = await response.json();
      setToxicityScore(data.toxicity);
    } catch (error) {
      setError("Failed to analyze toxicity. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
     

  // Function to get the appropriate score message and class
  const getScoreInfo = (score) => {
    if (score < 30) {
      return {
        message: 'Low toxicity detected',
        description: 'The content appears to be safe and appropriate.',
        className: 'toxicity-result-message-low',
        badgeClass: 'toxicity-score-badge-low',
        icon: <CheckCircle size={18} />
      };
    } else if (score < 70) {
      return {
        message: 'Moderate toxicity detected',
        description: 'The content contains some potentially inappropriate elements.',
        className: 'toxicity-result-message-moderate',
        badgeClass: 'toxicity-score-badge-moderate',
        icon: <AlertCircle size={18} />
      };
    } else {
      return {
        message: 'High toxicity detected',
        description: 'The content contains highly inappropriate or harmful elements.',
        className: 'toxicity-result-message-high',
        badgeClass: 'toxicity-score-badge-high',
        icon: <XCircle size={18} />
      };
    }
  };

  return (
    <div className="toxicity-card">
      <div className="toxicity-card-header">
        <h1 className="toxicity-card-title">
          <Shield size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          Content Toxicity Analyzer
        </h1>
      </div>
      
      <div className="toxicity-card-content">
        {error && (
          <div className="toxicity-error-message">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <div className="toxicity-input-group">
          <label className="toxicity-input-label">
            <Globe size={16} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
            Select Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="toxicity-language-select"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div className="toxicity-input-group">
          <label className="toxicity-input-label">
            <FileText size={16} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
            Enter Text to Analyze
          </label>
          <div className="toxicity-input-wrapper">
            <ReactTransliterate
              renderComponent={(props) => 
                <textarea {...props} 
                  className="toxicity-text-input" 
                  placeholder="Type or paste content to analyze for toxicity..."
                />
              }
              value={text}
              onChangeText={setText}
              lang={languages.find(l => l.code === selectedLanguage)?.transliterateCode || 'en'}
              containerClassName="toxicity-custom-suggestion-box"
            />
            <button 
              className={`toxicity-mic-button ${isListening ? 'listening' : ''}`} 
              onClick={toggleListening}
              aria-label={isListening ? "Stop listening" : "Start listening"}
              title={isListening ? "Stop listening" : "Start listening"}
            >
              <Mic size={20} />
            </button>
          </div>
        </div>

        <button 
          onClick={analyzeToxicity} 
          className="toxicity-analyze-button"
          disabled={isAnalyzing || !text.trim()}
        >
          {isAnalyzing ? (
            <>
              <Activity size={18} />
              Analyzing<span className="loading-dots">...</span>
            </>
          ) : (
            <>
              <Shield size={18} />
              Analyze Toxicity
              <ChevronRight size={18} />
            </>
          )}
        </button>

        {toxicityScore !== null && (
          <div className="toxicity-results-container">
            <h3>
              <BarChart2 size={20} />
              Analysis Results
            </h3>
            
            <div className="toxicity-progress-container">
              <div className="toxicity-progress-bar">
                <div 
                  className="toxicity-progress-fill" 
                  style={{ 
                    width: `${toxicityScore}%`, 
                    backgroundColor: `hsl(${120 - toxicityScore * 1.2}, 70%, 50%)` 
                  }} 
                />
              </div>
              <span className="toxicity-score-value">{toxicityScore}%</span>
            </div>
            
            {(() => {
              const scoreInfo = getScoreInfo(toxicityScore);
              return (
                <div className={`toxicity-result-message ${scoreInfo.className}`}>
                  {scoreInfo.icon}
                  <div>
                    <strong>{scoreInfo.message}</strong>
                    <div>{scoreInfo.description}</div>
                  </div>
                  <span className={`toxicity-score-badge ${scoreInfo.badgeClass}`}>
                    {toxicityScore}%
                  </span>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToxicityChecker;