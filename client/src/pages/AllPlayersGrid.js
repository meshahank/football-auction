import React, { useState } from 'react';
import './AllPlayersGrid.css';

function AllPlayersGrid({ players }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = players.filter(player => {
    const statusMatch =
      filterStatus === 'all' || player.status === filterStatus;
    const searchMatch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'in-auction':
        return 'status-auction';
      case 'sold':
        return 'status-sold';
      case 'unsold':
        return 'status-unsold';
      default:
        return '';
    }
  };

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
    <div className="all-players-grid">
      <h1 className="page-title">👥 All Players Grid</h1>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({players.length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'available' ? 'active' : ''}`}
            onClick={() => setFilterStatus('available')}
          >
            Available ({players.filter(p => p.status === 'available').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'in-auction' ? 'active' : ''}`}
            onClick={() => setFilterStatus('in-auction')}
          >
            In Auction ({players.filter(p => p.status === 'in-auction').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'sold' ? 'active' : ''}`}
            onClick={() => setFilterStatus('sold')}
          >
            Sold ({players.filter(p => p.status === 'sold').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'unsold' ? 'active' : ''}`}
            onClick={() => setFilterStatus('unsold')}
          >
            Unsold ({players.filter(p => p.status === 'unsold').length})
          </button>
        </div>
      </div>

      <div className="players-grid">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <div key={player.id} className={`player-card ${getStatusColor(player.status)}`}>
              <div className="player-card-image">
                <img
                  src={player.imagePath || 'https://via.placeholder.com/200?text=Player'}
                  alt={player.name}
                  onError={(e) =>
                    e.target.src =
                      'https://via.placeholder.com/200?text=Player' 
                  }
                />
                <div className={`status-badge ${player.status}`}>
                  {getStatusIcon(player.status)} {player.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-players-message">
            <p>😕 No players found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPlayersGrid;
