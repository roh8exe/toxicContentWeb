import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ChevronLeft, Globe, Code, Server, Shield, Lock, Terminal, FileCode, AlertTriangle } from 'lucide-react';
import './ApiDocs.css';
import './animations.css';
import './bubble.css';

const ApiDocs = () => {
  const [activeTab, setActiveTab] = useState('python');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    purpose: ''
  });
  const [apiKey, setApiKey] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState({});

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const generateApiKey = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const prefix = 'unityai-';
      let result = prefix;
      for (let i = 0; i < 24; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const newApiKey = generateApiKey();
    setApiKey(newApiKey);
    setFormSubmitted(true);

    // Normally here you'd POST to your backend
    console.log("User Data:", formData);
    console.log("Generated API Key:", newApiKey);
  };

  const copyToClipboard = (text, id = 'apikey') => {
    navigator.clipboard.writeText(text);
    
    if (id === 'apikey') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopiedSnippet({...copiedSnippet, [id]: true});
      setTimeout(() => 
        setCopiedSnippet(prev => ({...prev, [id]: false})), 
        2000
      );
    }
  };

  // Set up intersection observer for animation
  useEffect(() => {
    // Scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            entry.target.classList.add('animate-visible');
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

  const codeSnippets = {
    python: `import requests

headers = {
    "X-API-Key": "your_api_key_here",
    "Content-Type": "application/json"
}

data = {
    "text": "तू बहुत गंदा है",
    "lang": "hi"
}

response = requests.post(
    "https://lingo.iitgn.ac.in/unityai-guard/api", 
    headers=headers,
    json=data
)

print(response.json())`,
    nodejs: `const axios = require('axios');

const headers = {
  'X-API-Key': 'your_api_key_here',
  'Content-Type': 'application/json'
};

const data = {
  text: "तू बहुत गंदा है",
  lang: "hi"
};

axios.post('https://lingo.iitgn.ac.in/unityai-guard/api', data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,
    curl: `curl -X POST https://lingo.iitgn.ac.in/unityai-guard/api \\
-H "Content-Type: application/json" \\
-H "X-API-Key: your_api_key_here" \\
-d '{ "text": "तू बहुत गंदा है", "lang": "hi" }'`
  };

  const supportedLanguages = [
    { name: 'Hindi', code: 'hi' },
    { name: 'Telugu', code: 'te' },
    { name: 'Marathi', code: 'mr' },
    { name: 'Punjabi', code: 'pa' }
  ];

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
      </div>
      
      {/* Navigation Bar */}
      <nav className="nav-bar enhanced-nav">
        <div className="nav-container">
          <div className="brand">
            <Link to="/" className="app-title animate-glow">UnityAI-Guard</Link>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link hover-effect">
              <span className="flex items-center">
                <ChevronLeft size={16} className="mr-1" />
                Back to Home
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* API Docs Content */}
      <div className="api-docs-container enhanced-section animate-on-scroll" id="api-docs-section">
        <div className="section-container">
          
          {/* Hero Section with Features */}
          <div className="api-hero animate-on-scroll" id="api-hero">
            <div className="api-hero-content">
              <span className="api-docs-subtitle">DOCUMENTATION</span>
              <h2 className="section-title gradient-text">API Documentation</h2>
              <p className="api-docs-description">
                Use UnityAI Guard's API to detect toxic content across multiple Indian languages with our
                easy-to-integrate REST API.
              </p>
            </div>
            
            <div className="api-hero-illustration">
              <div className="api-illustration">
                <svg width="300" height="240" viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="30" width="240" height="180" rx="8" fill="#E6F0FF" stroke="#007BFF" strokeWidth="2"/>
                  <rect x="50" y="60" width="180" height="30" rx="4" fill="#CCE5FF"/>
                  <rect x="50" y="110" width="180" height="70" rx="4" fill="#CCE5FF"/>
                  <circle cx="65" cy="45" r="5" fill="#FF5F56"/>
                  <circle cx="85" cy="45" r="5" fill="#FFBD2E"/>
                  <circle cx="105" cy="45" r="5" fill="#27C93F"/>
                  <path d="M110 125L120 140H100L110 125Z" fill="#007BFF"/>
                  <path d="M150 125C150 119.477 154.477 115 160 115H180C185.523 115 190 119.477 190 125V145C190 150.523 185.523 155 180 155H160C154.477 155 150 150.523 150 145V125Z" fill="#007BFF"/>
                  <rect x="60" y="70" width="40" height="10" rx="2" fill="#007BFF"/>
                  <rect x="110" y="70" width="60" height="10" rx="2" fill="#0056B3"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="api-feature-grid animate-on-scroll" id="api-features">
            <div className="api-feature-card">
              <div className="api-feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="api-feature-title">Content Safety</h3>
              <p className="api-feature-description">Protect your platform from harmful content with accurate toxicity detection</p>
            </div>
            
            <div className="api-feature-card">
              <div className="api-feature-icon">
                <Globe size={24} />
              </div>
              <h3 className="api-feature-title">Multi-language</h3>
              <p className="api-feature-description">Support for multiple Indian languages to handle diverse user bases</p>
            </div>
            
            <div className="api-feature-card">
              <div className="api-feature-icon">
                <Terminal size={24} />
              </div>
              <h3 className="api-feature-title">Simple Integration</h3>
              <p className="api-feature-description">Easy-to-use REST API with clear documentation and examples</p>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* API Key Generator Card */}
          <div className="api-docs-card api-key-section animate-on-scroll" id="api-key-card">
            <div className="card-icon">
              <Lock size={20} />
            </div>
            <h3 className="card-title">Get Your API Key</h3>

            {formSubmitted ? (
              <div className="api-key-success">
                <div className="success-icon">✓</div>
                <h4>Your API key has been generated!</h4>
                <div className="api-key-display">
                  <input 
                    type="text" 
                    value={apiKey} 
                    readOnly 
                    className="api-key-input" 
                    aria-label="Your API key"
                  />
                  <button 
                    onClick={() => copyToClipboard(apiKey)} 
                    className="copy-button"
                    aria-label="Copy API key to clipboard"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="api-key-notice">
                  Save this key securely. For security reasons, it won't be shown again.
                </p>
                <button 
                  className="new-key-button"
                  onClick={() => setFormSubmitted(false)}
                >
                  <Shield size={16} />
                  Generate New Key
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="api-key-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name*</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    className="form-input enhanced-input"
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email*</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    className="form-input enhanced-input"
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="affiliation">Affiliation*</label>
                  <input 
                    type="text" 
                    id="affiliation"
                    name="affiliation" 
                    className="form-input enhanced-input"
                    value={formData.affiliation} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="purpose">Purpose*</label>
                  <textarea 
                    id="purpose"
                    name="purpose" 
                    rows="4" 
                    className="form-textarea enhanced-input"
                    value={formData.purpose} 
                    onChange={handleChange} 
                    required
                  ></textarea>
                </div>

                <button type="submit" className="analyze-button enhanced-button">
                  Request API Key
                </button>
              </form>
            )}
          </div>

          {/* Disclaimer Box MOVED BELOW API KEY SECTION */}
          <div className="disclaimer-box animate-on-scroll" id="disclaimer">
            <div className="disclaimer-icon">
              <AlertTriangle size={20} />
            </div>
            <div className="disclaimer-content">
              <h4>Important Notice</h4>
              <p>By using this API, you acknowledge that:</p>
              <ul>
                <li>Text inputs will be logged anonymously and may be used to improve our models</li>
                <li>The API is provided for research and educational purposes only</li>
                <li>Detection results may not be 100% accurate and should be used as guidance only</li>
                <li>You are responsible for compliance with applicable laws and regulations</li>
              </ul>
            </div>
          </div>

          {/* Endpoint Card */}
          <div className="api-docs-card animate-on-scroll" id="endpoint-card">
            <div className="card-icon">
              <Server size={20} />
            </div>
            <h3 className="card-title">API Endpoint</h3>
            <div className="code-block-container">
              <div className="code-title-bar">
                <div className="title">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span>endpoint.txt</span>
                </div>
                <span className="language-tag">URL</span>
                <button 
                  className="code-copy-button"
                  onClick={() => copyToClipboard('https://lingo.iitgn.ac.in/unityai-guard/api', 'endpoint')}
                >
                  {copiedSnippet['endpoint'] ? <Check size={14} /> : <Copy size={14} />}
                  {copiedSnippet['endpoint'] ? 'Copied' : 'Copy'}
                </button>
              </div>
              <code className="code-block">
                POST https://lingo.iitgn.ac.in/unityai-guard/api
              </code>
            </div>
          </div>

          {/* Authentication Card */}
          <div className="api-docs-card animate-on-scroll" id="auth-card">
            <div className="card-icon">
              <Lock size={20} />
            </div>
            <h3 className="card-title">Authentication</h3>
            <p>Add your API key to the request headers:</p>
            <div className="code-block-container">
              <div className="code-title-bar">
                <div className="title">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span>auth-header.txt</span>
                </div>
                <span className="language-tag">HTTP</span>
                <button 
                  className="code-copy-button"
                  onClick={() => copyToClipboard('X-API-Key: your_api_key_here', 'auth')}
                >
                  {copiedSnippet['auth'] ? <Check size={14} /> : <Copy size={14} />}
                  {copiedSnippet['auth'] ? 'Copied' : 'Copy'}
                </button>
              </div>
              <code className="code-block">
                X-API-Key: your_api_key_here
              </code>
            </div>
          </div>

          {/* Languages Note MOVED UP */}
          <div className="api-docs-note animate-on-scroll" id="lang-note">
            <p><strong>Note:</strong> Automatic language detection is coming soon!</p>
            <p><strong>Supported Languages:</strong></p>
            
            <div className="language-chips">
              {supportedLanguages.map(lang => (
                <div key={lang.code} className="language-chip">
                  {lang.name}
                  <span className="language-chip-code">{lang.code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Request Structure Card */}
          <div className="api-docs-card animate-on-scroll" id="request-card">
            <div className="card-icon">
              <Code size={20} />
            </div>
            <h3 className="card-title">Request Body</h3>
            <div className="code-block-container">
              <div className="code-title-bar">
                <div className="title">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span>request.json</span>
                </div>
                <span className="language-tag">JSON</span>
                <button 
                  className="code-copy-button"
                  onClick={() => copyToClipboard('{\n  "text": "तू बहुत गंदा है",\n  "lang": "hi"\n}', 'request')}
                >
                  {copiedSnippet['request'] ? <Check size={14} /> : <Copy size={14} />}
                  {copiedSnippet['request'] ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="code-block code-json" dangerouslySetInnerHTML={{
                __html: `{
    <span class="key">"text"</span>: <span class="string">"तू बहुत गंदा है"</span>,
    <span class="key">"lang"</span>: <span class="string">"hi"</span>
  }`
              }} />
            </div>
          </div>

          {/* Code Samples Card */}
          <div className="api-docs-card animate-on-scroll" id="code-samples-card">
            <div className="card-icon">
              <FileCode size={20} />
            </div>
            <h3 className="card-title">Code Samples</h3>
            <div className="tabs">
              <div className="tab-buttons">
                {['python', 'nodejs', 'curl'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-button ${activeTab === tab ? 'active-tab' : ''}`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="tab-content">
                <div className="code-block-container">
                  <div className="code-title-bar">
                    <div className="title">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                      <span>example.{activeTab === 'nodejs' ? 'js' : activeTab}</span>
                    </div>
                    <span className="language-tag">{activeTab}</span>
                    <button 
                      className="code-copy-button"
                      onClick={() => copyToClipboard(codeSnippets[activeTab], activeTab)}
                    >
                      {copiedSnippet[activeTab] ? <Check size={14} /> : <Copy size={14} />}
                      {copiedSnippet[activeTab] ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className={`code-block code-${activeTab}`}>
                    {codeSnippets[activeTab]}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Response Card */}
          <div className="api-docs-card animate-on-scroll" id="response-card">
            <div className="card-icon">
              <Server size={20} />
            </div>
            <h3 className="card-title">Sample Response</h3>
            <div className="code-block-container">
              <div className="code-title-bar">
                <div className="title">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span>response.json</span>
                </div>
                <span className="language-tag">JSON</span>
                <button 
                  className="code-copy-button"
                  onClick={() => copyToClipboard('{\n  "confidence": 78.24,\n  "is_toxic": true,\n}', 'response')}
                >
                  {copiedSnippet['response'] ? <Check size={14} /> : <Copy size={14} />}
                  {copiedSnippet['response'] ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="code-block code-json" dangerouslySetInnerHTML={{
                __html: `{
  <span class="key">"confidence"</span>: <span class="number">78.24</span>,
  <span class="key">"is_toxic"</span>: <span class="boolean">true</span>
}`
              }} />
            </div>
          </div>

          {/* Response Codes Card */}
          <div className="api-docs-card animate-on-scroll" id="codes-card">
            <div className="card-icon">
              <Code size={20} />
            </div>
            <h3 className="card-title">Response Codes</h3>
            <div className="table-container">
              <table className="response-codes-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>200</td><td>Success</td></tr>
                  <tr><td>400</td><td>Bad Request - Invalid input</td></tr>
                  <tr><td>401</td><td>Unauthorized - API key missing/invalid</td></tr>
                  <tr><td>429</td><td>Rate Limit Exceeded</td></tr>
                  <tr><td>500</td><td>Server Error</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;