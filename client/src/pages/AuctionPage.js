import React, { useEffect, useState } from 'react';
import './AuctionPage.css';

function AuctionPage({ currentPlayer, socket }) {
  const [player, setPlayer] = useState(currentPlayer);

  useEffect(() => { setPlayer(currentPlayer); }, [currentPlayer]);

  return (
    <div className="auction-page">
      {/* Top bar */}
      <div className="auction-topbar">
        <h1 className="page-title">Live Auction</h1>
        <div className="live-chip">
          <span className="live-dot" />
          Live
        </div>
      </div>

      {/* Spotlight */}
      <div className="auction-spotlight">
        {player ? (
          <div className="player-card-large">
            {/* Image */}
            <div className="player-image-container">
              <img
                src={player.imagePath || 'https://via.placeholder.com/400x533?text=Player'}
                alt={player.name}
                className="player-image"
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x533?text=Player'}
              />
              <div className={`player-status-badge ${player.status}`}>
                {player.status === 'in-auction' ? '🔴 In Auction' : player.status.toUpperCase()}
              </div>
            </div>

            {/* Details */}
            <div className="player-details">
              <h2 className="player-name">{player.name}</h2>

              <div className="base-price-box">
                <span className="label">Base Price</span>
                <span className="price">₹{player.basePrice} CR</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-player-box">
            <div className="empty-state">
              <span className="empty-state-icon">🎯</span>
              <h3>Waiting for next player</h3>
              <p>Admin will reveal the next player shortly.</p>
              <div className="pulse-ring" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuctionPage;
