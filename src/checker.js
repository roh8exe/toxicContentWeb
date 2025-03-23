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
    Activity,
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Send,
    CheckCircle
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

    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackInitiated, setFeedbackInitiated] = useState(false);
    const [feedbackRating, setFeedbackRating] = useState(5);
    const [feedbackLabels, setFeedbackLabels] = useState([]);
    const [feedbackComment, setFeedbackComment] = useState('');
    const [otherFeedback, setOtherFeedback] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [helpfulAnswer, setHelpfulAnswer] = useState('');
    const [responseRelevantAnswer, setResponseRelevantAnswer] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState(false);

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

    const availableFeedbackLabels = [
        { id: 1, label: 'Violent Crimes' },
        { id: 2, label: 'Non-Violent Crimes' },
        { id: 3, label: 'Sex-Related Crimes' },
        { id: 4, label: 'Child Sexual Exploitation' },
        { id: 5, label: 'Defamation' },
        { id: 6, label: 'Specialized Advice' },
        { id: 7, label: 'Privacy' },
        { id: 8, label: 'Intellectual Property' },
        { id: 9, label: 'Indiscriminate Weapons' },
        { id: 10, label: 'Hate' },
        { id: 11, label: 'Suicide & Self-Harm' },
        { id: 12, label: 'Sexual Content' },
        { id: 13, label: 'Elections' },
        { id: 14, label: 'Code Interpreter Abuse' },
        { id: 15, label: 'Other' }
    ];
    
    useEffect(() => {
      let timeoutId;
      if (feedbackSuccess) {
          timeoutId = setTimeout(() => {
              setFeedbackSuccess(false);
          }, 15000);
      }
      
      return () => {
          if (timeoutId) clearTimeout(timeoutId);
      };
    }, [feedbackSuccess]);
    
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

    const analyzeToxicity = async (withFeedback = false) => {
      if (!text.trim()) {
          setError('Please enter some text to analyze.');
          return;
      }

      setError(null);
      setIsAnalyzing(true);

      try {
          const payload = { text, lang: selectedLanguage };

          // Include feedback only if explicitly submitted
          if (withFeedback) {
              payload.was_helpful = helpfulAnswer;
              payload.response_relevant = responseRelevantAnswer;
              payload.feedback_rating = feedbackRating;
              payload.feedback_labels = feedbackLabels.map(id => {
                  const label = availableFeedbackLabels.find(label => label.id === id)?.label;
                  return label === 'Other' ? `Other: ${otherFeedback}` : label;
              });
              payload.other_feedback = otherFeedback;
              payload.log_to_sheet = true;  // explicit indicator for backend logging
          } else {
              payload.log_to_sheet = false;
          }

          const response = await fetch("http://127.0.0.1:2026/predict", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (!response.ok || data.error) {
              throw new Error(data.error || "Failed to fetch toxicity analysis.");
          }

          setToxicityScore(data.toxicity_score);

          if (withFeedback) {
              // Set feedback success state to true
              setFeedbackSuccess(true);
              setFeedbackInitiated(false);
              setHelpfulAnswer('');
              setResponseRelevantAnswer('');
              setFeedbackRating(5);
              setFeedbackLabels([]);
              setOtherFeedback('');
              setShowOtherInput(false);
              setShowFeedback(false);
          }

      } catch (error) {
          console.error("⚠️ Error:", error.message);
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

    const initiateUserFeedback = () => {
        setFeedbackRating(5);
        setFeedbackLabels([]);
        setFeedbackComment('');
        setOtherFeedback('');
        setShowOtherInput(false);
        setFeedbackInitiated(true);
    };

    const toggleFeedbackLabel = (id) => {
        setFeedbackLabels(prev => {
            if (prev.includes(id)) {
                if (id === 15) setShowOtherInput(false);
                return prev.filter(labelId => labelId !== id);
            } else {
                if (id === 15) setShowOtherInput(true);
                return [...prev, id];
            }
        });
    };

    const handleRatingChange = (rating) => {
        setFeedbackRating(rating);
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
                    onClick={() => analyzeToxicity(false)}
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
                          
                        {/* Success message - placed inside the results container */}
                        {feedbackSuccess && (
                            <div className="toxicity-success-message">
                                <CheckCircle size={18} />
                                Thank you for your feedback! Your response has been successfully submitted.
                            </div>
                        )}

                        {!feedbackInitiated ? (
                             <div className="toxicity-feedback-prompt">
                             <p>Provide feedback</p>
                             <div className="toxicity-feedback-buttons">
                                 <button
                                     className="toxicity-feedback-button"
                                     onClick={() => {
                                         setHelpfulAnswer('Yes');
                                         initiateUserFeedback();
                                     }}
                                 >
                                     <ThumbsUp size={18} />
                                     Yes
                                 </button>
                             </div>
                         </div>
                        ) : (
                            <div className="toxicity-feedback-form">
                                <h3 className="toxicity-feedback-title">
                                    <MessageCircle size={18} />
                                    Provide Your Feedback
                                </h3>

                                <div className="toxicity-feedback-section">
                                    <p className="toxicity-feedback-question">Is the response relevant for the given prompt? *</p>
                                    <div className="toxicity-feedback-options">
                                      <label className="toxicity-radio-label">
                                        <input
                                          type="radio"
                                          name="relevance"
                                          value="Yes"
                                          checked={responseRelevantAnswer === 'Yes'}
                                          onChange={(e) => setResponseRelevantAnswer(e.target.value)}
                                        />
                                        <span className="toxicity-radio-button">✔</span>
                                        <span>Yes</span>
                                      </label>

                                      <label className="toxicity-radio-label">
                                        <input
                                          type="radio"
                                          name="relevance"
                                          value="No"
                                          checked={responseRelevantAnswer === 'No'}
                                          onChange={(e) => setResponseRelevantAnswer(e.target.value)}
                                        />
                                        <span className="toxicity-radio-button">✖</span>
                                        <span>No</span>
                                      </label>
                                    </div>
                                </div>

                                <div className="toxicity-feedback-section">
                                    <p className="toxicity-feedback-question">Does the response include any of the following?</p>
                                    <div className="toxicity-feedback-labels">
                                        {availableFeedbackLabels.map(label => (
                                            <div
                                                key={label.id}
                                                className={`toxicity-feedback-label ${feedbackLabels.includes(label.id) ? 'selected' : ''}`}
                                                onClick={() => toggleFeedbackLabel(label.id)}
                                            >
                                                <span className="toxicity-label-number">{label.id}</span>
                                                <span>{label.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {showOtherInput && (
                                        <div className="toxicity-other-input-container">
                                            <input
                                                type="text"
                                                className="toxicity-other-input"
                                                placeholder="Please specify other feedback..."
                                                value={otherFeedback}
                                                onChange={(e) => setOtherFeedback(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="toxicity-feedback-section">
                                    <p className="toxicity-feedback-question">Rate the quality of the response: *</p>
                                    <div className="toxicity-rating">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
                                            <button
                                                key={rating}
                                                className={`toxicity-rating-button ${feedbackRating === rating ? 'selected' : ''}`}
                                                onClick={() => handleRatingChange(rating)}
                                            >
                                                {rating}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="toxicity-feedback-actions">
                                    <button
                                        className="toxicity-feedback-cancel"
                                        onClick={() => {
                                            setFeedbackInitiated(false);
                                            setHelpfulAnswer('');
                                            setResponseRelevantAnswer('');
                                            setFeedbackRating(5);
                                            setFeedbackLabels([]);
                                            setOtherFeedback('');
                                            setShowOtherInput(false);
                                        }}
                                    >
                                        Discard
                                    </button>
                                    <button
                                        className="toxicity-feedback-submit"
                                        onClick={() => analyzeToxicity(true)}
                                    >
                                        <Send size={16} />
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToxicityChecker;