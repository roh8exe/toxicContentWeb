// ShieldIllustration.js
import React from 'react';

const ShieldIllustration = () => {
  return (
    <div className="shield-illustration-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="shield-svg">
        {/* Definitions for gradients and filters */}
        <defs>
          {/* Shield gradients */}
          <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0095ff" />
            <stop offset="100%" stopColor="#0056b3" />
          </linearGradient>
          <linearGradient id="shield-inner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6610f2" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Shield highlight */}
          <linearGradient id="shield-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          
          {/* Text scanning effect */}
          <linearGradient id="scanning-effect" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="45%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.7)" />
            <stop offset="55%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            <animate attributeName="y1" from="0%" to="100%" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y2" from="100%" to="200%" dur="3s" repeatCount="indefinite" />
          </linearGradient>
          
          {/* Pulse animation */}
          <radialGradient id="pulse-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            <animate attributeName="r" values="50%;80%;50%" dur="4s" repeatCount="indefinite" />
          </radialGradient>
        </defs>
        
        {/* Background elements */}
        <circle cx="400" cy="300" r="200" fill="url(#pulse-gradient)" opacity="0.3" />
        
        {/* Data streams */}
        <g>
          {/* Vertical data streams */}
          <g opacity="0.5">
            <path d="M250,100 L250,500" stroke="#0095ff" strokeWidth="2" strokeDasharray="10,15" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="100" dur="10s" repeatCount="indefinite" />
            </path>
            <path d="M300,150 L300,450" stroke="#0095ff" strokeWidth="2" strokeDasharray="8,12" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="100" dur="7s" repeatCount="indefinite" />
            </path>
            <path d="M500,150 L500,450" stroke="#0095ff" strokeWidth="2" strokeDasharray="15,10" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="12s" repeatCount="indefinite" />
            </path>
            <path d="M550,100 L550,500" stroke="#0095ff" strokeWidth="2" strokeDasharray="12,8" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="9s" repeatCount="indefinite" />
            </path>
          </g>
          
          {/* Circular data paths */}
          <path d="M400,300 m-180,0 a180,180 0 1,0 360,0 a180,180 0 1,0 -360,0" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10,15" opacity="0.2">
            <animate attributeName="stroke-dashoffset" from="0" to="100" dur="30s" repeatCount="indefinite" />
          </path>
          <path d="M400,300 m-150,0 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0" fill="none" stroke="#6610f2" strokeWidth="1" strokeDasharray="5,10" opacity="0.2">
            <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="20s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* 3D Shield */}
        <g transform="translate(400, 300) scale(1.2)">
          {/* Shield back/shadow */}
          <path d="M-100,-140 C-100,-140 -100,60 -100,60 C-100,110 0,170 0,170 C0,170 100,110 100,60 C100,60 100,-140 100,-140 L-100,-140" 
                fill="#0066cc" opacity="0.3" transform="translate(5, 5)" />
          
          {/* Shield main body with 3D effect */}
          <path d="M-100,-140 C-100,-140 -100,60 -100,60 C-100,110 0,170 0,170 C0,170 100,110 100,60 C100,60 100,-140 100,-140 L-100,-140" 
                fill="url(#shield-gradient)" />
          
          {/* Inner shield */}
          <path d="M-75,-115 C-75,-115 -75,50 -75,50 C-75,90 0,140 0,140 C0,140 75,90 75,50 C75,50 75,-115 75,-115 L-75,-115" 
                fill="url(#shield-inner-gradient)" />
          
          {/* Shield highlight */}
          <path d="M-75,-115 L-75,50 C-75,90 0,140 0,140 C0,140 75,90 75,50 L75,-115 Z" 
                fill="url(#shield-highlight)" opacity="0.3" />
          
          {/* Check mark */}
          <path d="M-30,20 L-10,40 L40,-10" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          
          {/* Scanning effect overlay */}
          <path d="M-75,-115 L-75,50 C-75,90 0,140 0,140 C0,140 75,90 75,50 L75,-115 Z" 
                fill="url(#scanning-effect)" />
        </g>
        
        {/* Digital elements around shield */}
        <g opacity="0.7">
          {/* Binary code circles */}
          <g fontFamily="monospace" fontSize="10" fill="#3b82f6" opacity="0.5">
            <text x="180" y="200">01001</text>
            <text x="200" y="220">10110</text>
            <text x="170" y="240">01100</text>
            <text x="580" y="210">10011</text>
            <text x="560" y="230">01010</text>
            <text x="590" y="250">10101</text>
          </g>
          
          {/* Small decorative elements */}
          <circle cx="200" cy="300" r="5" fill="#3b82f6" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="300" r="5" fill="#6610f2" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="220" cy="350" r="3" fill="#3b82f6" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="580" cy="350" r="3" fill="#6610f2" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="5s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Glow effect layer */}
        <circle cx="400" cy="300" r="120" fill="url(#shield-inner-gradient)" opacity="0.1" filter="url(#glow)" />
      </svg>
    </div>
  );
};

export default ShieldIllustration;