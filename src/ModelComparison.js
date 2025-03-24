import React from 'react';
import { BarChart2, Award, TrendingUp, Globe } from 'lucide-react';
import './ModelComparison.css';

const ModelComparison = () => {
  const modelData = {
    hindi: {
      unityAI: 84,
      perspective: 84,
      llamaGuard: 60
    },
    telugu: {
      unityAI: 88,
      perspective: "No Support",
      llamaGuard: "No Support"
    },
    punjabi: {
      unityAI: 80,
      perspective: "No Support",
      llamaGuard: "No Support"
    },
    marathi: {
      unityAI: 89,
      perspective: "No Support",
      llamaGuard: "No Support"
    },
    urdu: {
      unityAI: 84,
      perspective: "No Support",
      llamaGuard: "No Support"
    }
  };

  const getScoreClass = (score) => {
    if (typeof score === 'string') return 'na';
    if (score >= 84) return 'excellent';
    if (score >= 80) return 'good';
    return 'moderate';
  };

  const formatScore = (score) => {
    return typeof score === 'string' ? score : `${score}%`;
  };

  const languages = Object.keys(modelData);

  return (
    <div className="model-comparison-section">
      <div className="comparison-header">
        <BarChart2 size={24} />
        <h2>Model Performance Comparison</h2>
        <p>See how UnityAI-Guard performs against other leading models across Indian languages</p>
      </div>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="language-header">Language</th>
              <th className="model-header">
                <div className="model-header-content">
                  <span className="model-title">UnityAI-Guard</span>
                  <Award size={16} className="model-icon" />
                </div>
              </th>
              <th className="model-header">
                <div className="model-header-content">
                  <span className="model-title">LLaMA Guard</span>
                  <TrendingUp size={16} className="model-icon" />
                </div>
              </th>
              <th className="model-header">
                <div className="model-header-content">
                  <span className="model-title">Perspective API</span>
                  <Globe size={16} className="model-icon" />
                </div>
              </th>
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
                <td className="score-cell">
                  <div className={`score-badge ${getScoreClass(modelData[language].unityAI)}`}>
                    {formatScore(modelData[language].unityAI)}
                  </div>
                </td>
                <td className="score-cell">
                  <div className={`score-badge ${getScoreClass(modelData[language].llamaGuard)}`}>
                    {formatScore(modelData[language].llamaGuard)}
                  </div>
                </td>
                <td className="score-cell">
                  <div className={`score-badge ${getScoreClass(modelData[language].perspective)}`}>
                    {formatScore(modelData[language].perspective)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelComparison;