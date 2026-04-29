import React from 'react';
import './UnsoldList.css';

function UnsoldList({ players }) {
  const unsoldPlayers = players.filter(p => p.status === 'unsold');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return '✅';
      case 'in-auction':
        return '🔄';
      case 'sold':
        return '✔️';
      case 'unsold':
        return '❌';
      default:
        return '';
    }
  };

  return (
    <div className="unsold-list">
      <h1 className="page-title">⛔ Unsold Players</h1>

      <div className="unsold-header">
        <div className="header-stat">
          <span className="label">Total Unsold</span>
          <span className="value">{unsoldPlayers.length}</span>
        </div>
      </div>

      {unsoldPlayers.length > 0 ? (
        <div className="unsold-container">
          <div className="unsold-players-grid">
            {unsoldPlayers.map((player) => (
              <div key={player.id} className="unsold-player-card">
                <div className="unsold-player-image-container">
                  <img
                    src={player.imagePath || 'https://via.placeholder.com/120?text=Player'}
                    alt={player.name}
                    className="unsold-player-image"
                    onError={(e) =>
                      e.target.src = 'https://via.placeholder.com/120?text=Player'
                    }
                  />
                  <div className="status-badge unsold">
                    {getStatusIcon('unsold')} Unsold
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-unsold">
          <div className="empty-state">
            <h3>✅ No unsold players</h3>
            <p>All players have been either sold or are available.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UnsoldList;
