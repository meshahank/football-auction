import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AuctionPage.css';
import PaperCutAnimation from '../components/PaperCutAnimation';
import { playSoldSound } from '../utils/soundEffects';

function AuctionPage({ currentPlayer, socket, isAdmin }) {
  const [player, setPlayer] = useState(currentPlayer);
  const [previousPlayerId, setPreviousPlayerId] = useState(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    // Detect when player changes from having someone to no one (sold or unsold)
    if (previousPlayerId !== null && currentPlayer === null) {
      // A player was just removed (sold or marked unsold)
      playSoldSound();
      setTriggerAnimation(true);
      
      // Reset animation trigger after animation completes
      setTimeout(() => setTriggerAnimation(false), 2500);
    }
    
    setPlayer(currentPlayer);
    setPreviousPlayerId(currentPlayer ? currentPlayer.id : null);
  }, [currentPlayer]);

  // Determine card type for background styling
  const getCardType = () => {
    if (!player) return 'default';
    return player.card ? player.card.toLowerCase().replace(/\s+/g, '-') : 'default';
  };

  // Get base price display based on card type
  const getBasePriceDisplay = () => {
    if (!player || !player.card) return '₹40 Lakh';
    
    const card = player.card.toLowerCase();
    if (card === 'iconic' || card === 'bigtime' || card === 'bigtime gk') {
      return '₹1 CR';
    } else if (card === 'epic') {
      return '₹70 Lakh';
    } else if (card === 'highlight') {
      return '₹50 Lakh';
    } else if (card === 'silver' || card === 'bronze') {
      return '₹40 Lakh';
    }
    return '₹40 Lakh';
  };

  return (
    <div className={`auction-page-fullscreen card-bg-${getCardType()}`}>
      {/* Paper Cut Animation */}
      <PaperCutAnimation trigger={triggerAnimation} />

      {/* Animated background */}
      <div className="auction-bg-container">
        <div className="auction-bg-gradient"></div>
        <div className="auction-bg-pattern"></div>
      </div>

      {/* Back Button - Top Right */}
      <Link to="/players" className="auction-back-button">← Back</Link>

      {/* Content container */}
      <div className="auction-content">
        {/* Header with Live indicator */}
        <div className="auction-header">
          <div className="auction-title-section">
            <h1 className="auction-main-title">LIVE AUCTION</h1>
            <div className="live-indicator">
              <span className="live-pulse"></span>
              <span className="live-text">LIVE</span>
            </div>
          </div>
        </div>

        {/* Player Spotlight */}
        <div className="auction-spotlight-full">
          {player ? (
            <div className="player-display-card">
              {/* Left side - Player image */}
              <div className="player-image-section">
                <div className="image-wrapper">
                  <img
                    src={player.imagePath || 'https://via.placeholder.com/500x600?text=Player'}
                    alt={player.name}
                    className="player-image-display"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/500x600?text=Player'}
                  />
                  <div className="image-overlay"></div>
                </div>
              </div>

              {/* Right side - Player details */}
              <div className="player-info-section">
                <div className="player-info-card">
                  <h2 className="player-name-large">{player.name}</h2>

                  <div className="position-badge">
                    <span>{player.position}</span>
                    {player.card && <span className="card-badge">{player.card}</span>}
                  </div>

                  <div className="details-grid">
                    <div className="detail-item">
                      <div className="detail-label">RATING</div>
                      <div className="detail-value rating-value">{player.rating}</div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">BASE PRICE</div>
                      <div className="detail-value price-value">{getBasePriceDisplay()}</div>
                    </div>
                  </div>

                  <div className="auction-meta">
                    <p className="auction-status-text">Ready for bidding</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="waiting-state">
              <div className="waiting-content">
                <div className="waiting-icon">🎯</div>
                <h2 className="waiting-title">WAITING FOR NEXT PLAYER</h2>
                <p className="waiting-subtitle">Admin will reveal the next player shortly</p>
                <div className="pulse-ring-large"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuctionPage;
