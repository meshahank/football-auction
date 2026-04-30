import React, { useEffect, useState } from 'react';
import './PaperCutAnimation.css';

function PaperCutAnimation({ trigger }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setIsAnimating(true);
      generateConfetti();
      
      // Increment key to force re-render of confetti pieces
      setKey(prev => prev + 1);

      // Reset animation after it completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  const generateConfetti = () => {
    const pieces = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#FF8B94', '#A8D8EA', '#FFD3B6', '#FF6348', '#20B2AA', '#FFD700'];
    
    // Generate more confetti for bigger impact
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2 + Math.random() * 0.8,
        size: 8 + Math.random() * 25,
        rotation: Math.random() * 360,
        curve: (Math.random() * 200 - 100),
        startAngle: Math.random() * 360,
        spinSpeed: 1 + Math.random() * 3
      });
    }
    setConfetti(pieces);
  };

  return (
    <div key={key} className={`papercut-container ${isAnimating ? 'active' : ''}`}>
      {/* Screen flash effect */}
      {isAnimating && <div className="screen-flash"></div>}
      
      {confetti.map(piece => (
        <div
          key={piece.id}
          className={`confetti-piece shape-${piece.id % 3}`}
          style={{
            '--left': `${piece.left}%`,
            '--delay': `${piece.delay}s`,
            '--duration': `${piece.duration}s`,
            '--size': `${piece.size}px`,
            '--rotation': `${piece.rotation}deg`,
            '--curve': `${piece.curve}px`,
            '--spin-speed': `${piece.spinSpeed}`,
            '--start-angle': `${piece.startAngle}deg`,
            backgroundColor: piece.color
          }}
        />
      ))}
      
      {/* Burst circles - expanding rings */}
      <div className="burst burst-1"></div>
      <div className="burst burst-2"></div>
      <div className="burst burst-3"></div>
      
      {/* Center explosion rings */}
      <div className="ring-burst ring-1"></div>
      <div className="ring-burst ring-2"></div>
      <div className="ring-burst ring-3"></div>
      
      {/* Shockwave effect */}
      <div className="shockwave"></div>
    </div>
  );
}

export default PaperCutAnimation;
