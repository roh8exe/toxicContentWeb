import React from 'react';
import { BarChart2, Award, TrendingUp, Globe } from 'lucide-react';
import './ModelComparison.css';

const ModelComparison = () => {
  const modelData = {
    hindi: {
      unityAI: 82,
      perspective: 84,
      llamaGuard: 60
    },
    telugu: {
      unityAI: 84,
      perspective: "No Support",
      llamaGuard: "No Support"
    }
  };

  const getScoreClass = (score) => {
    if (typeof score === 'string') return 'na';  // Add handling for "NA" values
    if (score >= 84) return 'excellent';
    if (score >= 80) return 'good';
    return 'moderate';
  };

  const formatScore = (score) => {
    return typeof score === 'string' ? score : `${score}%`;
  };

  return (
    <div className="model-comparison-section">
      <div className="comparison-header">
        <BarChart2 size={24} />
        <h2>Model Performance Comparison</h2>
        <p>See how UnityAI-Guard performs against other leading models</p>
      </div>

      <div className="comparison-grid">
        <div className="comparison-card">
          <div className="card-header">
            <h3>Hindi</h3>
            <Globe size={20} />
          </div>
          <div className="scores-container">
            <div className="score-item">
              <span className="model-name">UnityAI-Guard</span>
              <div className={`score-badge ${getScoreClass(modelData.hindi.unityAI)}`}>
                {formatScore(modelData.hindi.unityAI)}
              </div>
            </div>
            <div className="score-item">
              <span className="model-name">LLaMA Guard</span>
              <div className={`score-badge ${getScoreClass(modelData.hindi.llamaGuard)}`}>
                {formatScore(modelData.hindi.llamaGuard)}
              </div>
            </div>
            <div className="score-item">
              <span className="model-name">Perspective API</span>
              <div className={`score-badge ${getScoreClass(modelData.hindi.perspective)}`}>
                {formatScore(modelData.hindi.perspective)}
              </div>
            </div>
          </div>
        </div>

        <div className="comparison-card">
          <div className="card-header">
            <h3>Telugu</h3>
            <Globe size={20} />
          </div>
          <div className="scores-container">
            <div className="score-item">
              <span className="model-name">UnityAI-Guard</span>
              <div className={`score-badge ${getScoreClass(modelData.telugu.unityAI)}`}>
                {formatScore(modelData.telugu.unityAI)}
              </div>
            </div>
            <div className="score-item">
              <span className="model-name">LLaMA Guard</span>
              <div className={`score-badge ${getScoreClass(modelData.telugu.llamaGuard)}`}>
                {formatScore(modelData.telugu.llamaGuard)}
              </div>
            </div>
            <div className="score-item">
              <span className="model-name">Perspective API</span>
              <div className={`score-badge ${getScoreClass(modelData.telugu.perspective)}`}>
                {formatScore(modelData.telugu.perspective)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;
