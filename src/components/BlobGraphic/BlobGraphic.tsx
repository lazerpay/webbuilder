import React from 'react';
import styled from '@emotion/styled';

const BlobContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlobSvg = styled.svg`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1));
  animation: blobFloat 8s ease-in-out infinite;

  @keyframes blobFloat {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) scale(1);
    }
    33% { 
      transform: translateY(-15px) rotate(2deg) scale(1.02);
    }
    66% { 
      transform: translateY(10px) rotate(-1deg) scale(0.98);
    }
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(20px);
  animation: pulse 4s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.1); }
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  .floating-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: floatDot 6s ease-in-out infinite;
  }
  
  .dot-1 {
    top: 20%;
    left: 15%;
    animation-delay: 0s;
  }
  
  .dot-2 {
    top: 60%;
    right: 20%;
    animation-delay: 2s;
  }
  
  .dot-3 {
    bottom: 25%;
    left: 25%;
    animation-delay: 4s;
  }

  @keyframes floatDot {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
    50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
  }
`;

interface BlobGraphicProps {
  primaryColor?: string;
  secondaryColor?: string;
  size?: number;
}

export function BlobGraphic({ 
  primaryColor = '#fbbf24', 
  secondaryColor = '#f59e0b',
  size = 400 
}: BlobGraphicProps) {
  return (
    <BlobContainer style={{ width: size, height: size }}>
      <GlowEffect />
      
      <BlobSvg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.7" />
          </linearGradient>
          
          <linearGradient id="blobGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Main blob shape */}
        <path
          d="M200,50 C280,50 350,120 350,200 C350,280 280,350 200,350 C120,350 50,280 50,200 C50,120 120,50 200,50 Z"
          fill="url(#blobGradient)"
          opacity="0.9"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Secondary blob for depth */}
        <path
          d="M200,80 C250,80 290,120 290,170 C290,220 250,260 200,260 C150,260 110,220 110,170 C110,120 150,80 200,80 Z"
          fill="url(#blobGradient2)"
          opacity="0.6"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 200 200"
            to="0 200 200"
            dur="15s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Inner highlight */}
        <circle
          cx="200"
          cy="180"
          r="60"
          fill="rgba(255, 255, 255, 0.3)"
          opacity="0.8"
        >
          <animate
            attributeName="r"
            values="60;70;60"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.4;0.8"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </BlobSvg>
      
      <FloatingElements>
        <div className="floating-dot dot-1" />
        <div className="floating-dot dot-2" />
        <div className="floating-dot dot-3" />
      </FloatingElements>
    </BlobContainer>
  );
}