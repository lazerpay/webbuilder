import React from 'react';

interface LogoProps {
  size?: number;
}

export function Logo({ size = 40 }: LogoProps) {
  const gradientId = `logo-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        style={{ marginRight: '12px' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#3730a3" />
          </linearGradient>
        </defs>
        
        {/* Blob shape */}
        <path
          d="M50,10 C70,10 90,25 90,45 C90,65 75,85 55,90 C35,85 10,70 10,50 C10,30 30,10 50,10 Z"
          fill={`url(#${gradientId})`}
          style={{
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
          }}
        />
        
        {/* Letter W */}
        <text
          x="50"
          y="65"
          textAnchor="middle"
          style={{
            fontFamily: '"Sour Gummy", cursive',
            fontSize: '36px',
            fontWeight: '700',
            fill: 'white',
            userSelect: 'none'
          }}
        >
          W
        </text>
      </svg>
      
      <span 
        style={{ 
          fontFamily: '"Sour Gummy", cursive',
          fontSize: '24px',
          fontWeight: '700',
          color: '#4f46e5',
          letterSpacing: '-0.5px'
        }}
      >
        WebBuilder
      </span>
    </div>
  );
}