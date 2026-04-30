import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UnsoldSale.css';

function UnsoldSale({ players, teams, socket }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [salePrice, setSalePrice] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showMenu, setShowMenu] = useState(false);

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

  const getBasePriceDisplay = () => {
    if (!selectedPlayer || !selectedPlayer.card) return '₹40 Lakh';
    
    const card = selectedPlayer.card.toLowerCase();
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

  const handleSellPlayer = (e) => {
    e.preventDefault();
    setMessage('');

    if (!selectedPlayer) {
      setMessage('❌ Please select a player');
      setMessageType('error');
      return;
    }

    if (!salePrice || !selectedTeamId) {
      setMessage('❌ Please enter price and select team');
      setMessageType('error');
      return;
    }

    setLoading(true);
    socket.emit(
      'sell-player',
      {
        isAdmin: true,
        playerId: selectedPlayer.id,
        teamId: parseInt(selectedTeamId),
        salePrice: parseFloat(salePrice)
      },
      (response) => {
        setLoading(false);
        if (response.success) {
          setMessage(`✅ ${selectedPlayer.name} sold successfully!`);
          setMessageType('success');
          setSalePrice('');
          setSelectedTeamId('');
          setSelectedPlayer(null);
        } else {
          setMessage(`❌ ${response.message}`);
          setMessageType('error');
        }
      }
    );
  };

  return (
    <div className="unsold-sale-page">
      {/* Navigation Menu - Floating */}
      <div className={`auction-nav-menu ${showMenu ? 'open' : ''}`}>
        <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>
        <nav className="nav-links">
          <Link to="/auction" className="nav-link" onClick={() => setShowMenu(false)}>🔴 Live</Link>
          <Link to="/teams" className="nav-link" onClick={() => setShowMenu(false)}>👥 Teams</Link>
          <Link to="/players" className="nav-link" onClick={() => setShowMenu(false)}>⭐ Players</Link>
          <Link to="/unsold" className="nav-link" onClick={() => setShowMenu(false)}>📋 Unsold</Link>
          <Link to="/unsold-sale" className="nav-link active" onClick={() => setShowMenu(false)}>💳 Sell Unsold</Link>
        </nav>
      </div>

      {/* Header */}
      <div className="unsold-sale-header">
        <h1 className="page-title">💳 Sell Unsold Players</h1>
        <div className="header-subtitle">Auction completed? Sell remaining players here</div>
      </div>

      {/* Main Content */}
      <div className="unsold-sale-container">
        <div className="unsold-sale-content">
          {/* Players Grid - Left Side */}
          <div className="players-section">
            <h2>Available Unsold Players ({unsoldPlayers.length})</h2>
            {unsoldPlayers.length > 0 ? (
              <div className="unsold-players-grid">
                {unsoldPlayers.map((player) => (
                  <div
                    key={player.id}
                    className={`unsold-player-card ${selectedPlayer?.id === player.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedPlayer(player);
                      setSalePrice('');
                      setSelectedTeamId('');
                      setMessage('');
                    }}
                  >
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
                    <div className="player-card-info">
                      <div className="player-card-name">{player.name}</div>
                      <div className="player-card-position">{player.position}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-unsold-players">
                <p>No unsold players to sell</p>
              </div>
            )}
          </div>

          {/* Sale Form - Right Side */}
          <div className="sale-form-section">
            {selectedPlayer ? (
              <div className="sale-form-card">
                <h2>Sale Details</h2>
                
                {/* Selected Player Info */}
                <div className="selected-player-display">
                  <img
                    src={selectedPlayer.imagePath || 'https://via.placeholder.com/150?text=Player'}
                    alt={selectedPlayer.name}
                    className="selected-player-image"
                    onError={(e) =>
                      e.target.src = 'https://via.placeholder.com/150?text=Player'
                    }
                  />
                  <div className="selected-player-info">
                    <h3>{selectedPlayer.name}</h3>
                    <p className="position-text">{selectedPlayer.position}</p>
                    <p className="rating-text">Rating: {selectedPlayer.rating}</p>
                    <p className="card-text">Card: {selectedPlayer.card}</p>
                    <p className="base-price-text">Base Price: {getBasePriceDisplay()}</p>
                  </div>
                </div>

                {/* Sale Form */}
                <form onSubmit={handleSellPlayer} className="sale-form">
                  <div className="form-group">
                    <label>Sale Price (₹ CR or Lakh)</label>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="e.g., 5 CR or 0.5 CR (50 Lakh)"
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Select Team</label>
                    <select
                      value={selectedTeamId}
                      onChange={(e) => setSelectedTeamId(e.target.value)}
                      required
                    >
                      <option value="">-- Choose a team --</option>
                      {teams.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name} (₹{team.budgetRemaining} CR left)
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-large btn-success"
                    disabled={loading}
                  >
                    {loading ? '⏳ Processing...' : '✅ Sell Player'}
                  </button>

                  <button
                    type="button"
                    className="btn-large btn-secondary"
                    onClick={() => {
                      setSelectedPlayer(null);
                      setSalePrice('');
                      setSelectedTeamId('');
                      setMessage('');
                    }}
                    disabled={loading}
                  >
                    Clear Selection
                  </button>
                </form>

                {/* Message Display */}
                {message && (
                  <div className={`message-box message-${messageType}`}>
                    {message}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-player-selected">
                <div className="empty-state">
                  <div className="empty-icon">👈</div>
                  <h3>Select a Player</h3>
                  <p>Choose an unsold player from the list to sell</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnsoldSale;
