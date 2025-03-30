import React from 'react';
import { BarChart2, Award, TrendingUp, Globe, Server, Cpu, Zap } from 'lucide-react';
import './ModelComparison.css';

const ModelComparison = () => {
  const modelData = {
    hindi: {
      unityAI: 86.63,
      perspective: 84,
      llamaGuard: 60,
     // mBERT: 82.52,
    //  llama32: 83.99,
     // ayaExpanse: 86.63
    },
    telugu: {
      unityAI: 88.54,
      perspective: "No Support",
      llamaGuard: "No Support",
    //  mBERT: 93.10,
     // llama32: 88.48,
     // ayaExpanse: 88.18
    },
    punjabi: {
      unityAI: 80.29,
      perspective: "No Support",
      llamaGuard: "No Support",
     // mBERT: 76.50,
     // llama32: 80.29,
      //ayaExpanse: 80.14
    },
    marathi: {
      unityAI: 89.39,
      perspective: "No Support",
      llamaGuard: "No Support",
     // mBERT: 86.76,
     // llama32: 89.37,
     // ayaExpanse: 89.39
    },
    urdu: {
      unityAI: 87.06,
      perspective: "No Support",
      llamaGuard: "No Support",
      //mBERT: 82.20,
     // llama32: 84.45,
     // ayaExpanse: 87.06
    },
    gujarati: {
      unityAI: 99.21,
      perspective: "No Support",
      llamaGuard: "No Support",
     // mBERT: 99.76,
     //llama32: 99.03,
     // ayaExpanse: 99.21
    },
    tamil: {
      unityAI: "na",
      perspective: "No Support",
      llamaGuard: "No Support",
     // mBERT: 99.76,
     //llama32: 99.03,
     // ayaExpanse: 99.21
    }
  };

  const getScoreClass = (score) => {
    if (typeof score === 'string') return 'na';
    if (score >= 84) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 75) return 'average';
    return 'moderate';
  };

  const formatScore = (score) => {
    return typeof score === 'string' ? score : `${score.toFixed(1)}%`;
  };

  const languages = Object.keys(modelData);

  // Define model metadata for icons and displaynames
  const modelMetadata = {
    unityAI: { icon: Award, name: "UnityAI-Guard", shortName: "UnityAI-Guard" },
    llamaGuard: { icon: TrendingUp, name: "LLaMA Guard", shortName: "LLaMA Guard" },
   // mBERT: { icon: Server, name: "mBERT", shortName: "mBERT" },
   // llama32: { icon: Cpu, name: "Llama-3.2-1B", shortName: "Llama-3.2-1B" },
    perspective: { icon: Globe, name: "Perspective API", shortName: "Perspective API" },
   // ayaExpanse: { icon: Zap, name: "Aya-Expanse-8B", shortName: "Aya-Expanse-8B" }
  };

  // Order the models in a specific sequence
  const modelOrder = ['unityAI',  'llamaGuard', 'perspective'];

  return (
    <div className="model-comparison-section">
      <div className="comparison-header">
        <BarChart2 size={28} className="header-icon" />
        <h2>Content Moderation Model Performance</h2>
        <p>Accuracy comparison across Indian languages (%)</p>
      </div>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="language-header">Language</th>
              {modelOrder.map(modelKey => (
                <th key={modelKey} className="model-header">
                  <div className="model-header-content">
                    <span className="model-title">{modelMetadata[modelKey].shortName}</span>
                    {React.createElement(modelMetadata[modelKey].icon, { 
                      size: 16, 
                      className: "model-icon" 
                    })}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {languages.map((language) => (
              <tr key={language} className="language-row">
                <td className="language-cell">
                  <div className="language-name">
                    <Globe size={16} className="language-icon" />
                    <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
                  </div>
                </td>
                {modelOrder.map(modelKey => (
                  <td key={`${language}-${modelKey}`} className="score-cell">
                    <div className={`score-badge ${getScoreClass(modelData[language][modelKey])}`}>
                      {formatScore(modelData[language][modelKey])}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="score-legend">
        <div className="legend-item">
          <div className="legend-color excellent"></div>
          <span>Excellent: 84% and above</span>
        </div>
        <div className="legend-item">
          <div className="legend-color good"></div>
          <span>Good: 80-84%</span>
        </div>
        <div className="legend-item">
          <div className="legend-color average"></div>
          <span>Average: 75-80%</span>
        </div>
        <div className="legend-item">
          <div className="legend-color moderate"></div>
          <span>Moderate: below 75%</span>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;