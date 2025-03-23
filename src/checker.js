import React, { useState, useEffect, useRef } from 'react';
import { ReactTransliterate } from 'react-transliterate';
import {
    Mic,
    AlertTriangle,
    Shield,
    ChevronRight,
    BarChart2,
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
        { code: 'hi', name: 'Hindi', transliterateCode: 'hi', disabled: false },
        { code: 'te', name: 'Telugu', transliterateCode: 'te', disabled: false },
        { code: 'pa', name: 'Punjabi', transliterateCode: 'pa', disabled: false },
        { code: 'mr', name: 'Marathi', transliterateCode: 'mr', disabled: false },
        { code: 'ur', name: 'Urdu', transliterateCode: 'ur', disabled: false },
        { code: 'ml', name: 'Malayalam', transliterateCode: 'ml', disabled: true },
        { code: 'bn', name: 'Bengali', transliterateCode: 'bn', disabled: true },
        { code: 'ta', name: 'Tamil', transliterateCode: 'ta', disabled: true },
        { code: 'gu', name: 'Gujarati', transliterateCode: 'gu', disabled: true },
        { code: 'kn', name: 'Kannada', transliterateCode: 'kn', disabled: true },
        { code: 'or', name: 'Odia', transliterateCode: 'or', disabled: true },
        { code: 'en', name: 'English', transliterateCode: 'en', disabled: true }

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
            recognitionRef.current.lang = selectedLang?.code || 'hi';
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
                body: JSON.stringify({ text, lang: selectedLanguage }),
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
        if (score < 15) {
            return { message: 'Low Toxicity', className: 'low', icon: '😎' };
        } else if (score >= 15 && score < 30) {
            return { message: 'Slightly Toxic', className: 'moderate', icon: '😵‍💫' };
        } else if (score >= 30 && score < 50) {
            return { message: 'Moderately Toxic', className: 'moderate', icon: '😡' };
        } else {
            return { message: 'Highly Toxic', className: 'high', icon: '🤬' };
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
                            <option key={lang.code} value={lang.code} disabled={lang.disabled}>
                                {lang.name}
                            </option>
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
                                    <div className="toxicity-message-content">
                                        <span style={{ marginRight: '8px', fontSize: '1.2em' }}>{scoreInfo.icon}</span>
                                        <h3>{scoreInfo.message}</h3>
                                    </div>
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
