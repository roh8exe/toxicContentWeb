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
import './checker.css';

const ToxicityChecker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [text, setText] = useState('');
  const [toxicityScore, setToxicityScore] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const languages = [
    { code: 'hi', name: 'Hindi', transliterateCode: 'hi' },
    { code: 'te', name: 'Telugu', transliterateCode: 'te' },
    { code: 'pa', name: 'Punjabi', transliterateCode:'pa'}
  ];

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

      recognitionRef.current.onerror = () => {
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
      setError(null);
      const selectedLang = languages.find(lang => lang.code === selectedLanguage);
      recognitionRef.current.lang = selectedLang?.code || 'hi';  // Ensure correct language for speech recognition
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
      const response = await fetch("http://127.0.0.1:2026/predict", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: selectedLanguage }),  // Ensure lang is sent
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to fetch toxicity analysis.");
      }
  
      setToxicityScore(data.toxicity);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreInfo = (score) => {
    if (score < 30) {
      return { message: 'Low toxicity detected', className: 'low', icon: <CheckCircle size={18} /> };
    } else if (score < 70) {
      return { message: 'Moderate toxicity detected', className: 'moderate', icon: <AlertCircle size={18} /> };
    } else {
      return { message: 'High toxicity detected', className: 'high', icon: <XCircle size={18} /> };
    }
  };

  return (
    <div className="toxicity-card">
      <div className="toxicity-card-header">
        <h1 className="toxicity-card-title">
          <Shield size={24} style={{ marginRight: '10px' }} />
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
            <Globe size={16} style={{ marginRight: '8px' }} />
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
            <FileText size={16} style={{ marginRight: '8px' }} />
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
            />
            <button 
              className={`toxicity-mic-button ${isListening ? 'listening' : ''}`} 
              onClick={toggleListening}
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
              Analyzing...
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
                  style={{ width: `${toxicityScore}%`, backgroundColor: `hsl(${120 - toxicityScore * 1.2}, 70%, 50%)` }} 
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
                  </div>
                  <span className={`toxicity-score-badge ${scoreInfo.className}`}>
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
