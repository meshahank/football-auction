import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ socket, players, teams, currentPlayer }) {
  const [salePrice, setSalePrice] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleRandomPlayer = () => {
    setLoading(true);
    setMessage('');

    socket.emit('trigger-random-player', { isAdmin: true }, (response) => {
      setLoading(false);
      if (response.success) {
        setMessage(`✅ ${response.player.name} revealed for auction!`);
        setMessageType('success');
        setSalePrice('');
        setSelectedTeamId('');
      } else {
        setMessage(`❌ ${response.message}`);
        setMessageType('error');
      }
    });
  };

  const handleSellPlayer = (e) => {
    e.preventDefault();
    setMessage('');

    if (!currentPlayer) {
      setMessage('❌ No player in auction');
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
        playerId: currentPlayer.id,
        teamId: parseInt(selectedTeamId),
        salePrice: parseInt(salePrice)
      },
      (response) => {
        setLoading(false);
        if (response.success) {
          setMessage(`✅ ${currentPlayer.name} sold successfully!`);
          setMessageType('success');
          setSalePrice('');
          setSelectedTeamId('');
        } else {
          setMessage(`❌ ${response.message}`);
          setMessageType('error');
        }
      }
    );
  };

  const handleMarkUnsold = () => {
    if (!currentPlayer) {
      setMessage('❌ No player in auction');
      setMessageType('error');
      return;
    }

    setLoading(true);
    socket.emit(
      'mark-unsold',
      {
        isAdmin: true,
        playerId: currentPlayer.id
      },
      (response) => {
        setLoading(false);
        if (response.success) {
          setMessage(`✅ ${currentPlayer.name} marked as unsold`);
          setMessageType('success');
          setSalePrice('');
          setSelectedTeamId('');
        } else {
          setMessage(`❌ ${response.message}`);
          setMessageType('error');
        }
      }
    );
  };

  const availablePlayers = players.filter(p => p.status === 'available').length;

  return (
    <div className="admin-panel">
      <h1 className="page-title">🔐 Admin Control Panel</h1>

      <div className="admin-grid">
        {/* Random Player Button Section */}
        <div className="admin-card">
          <h2>🎲 Player Selection</h2>
          <div className="stats-bar">
            <div className="stat">
              <span className="label">Available Players</span>
              <span className="value">{availablePlayers}</span>
            </div>
          </div>
          <button
            className="btn-large btn-primary"
            onClick={handleRandomPlayer}
            disabled={loading || availablePlayers === 0}
          >
            {loading ? '⏳ Loading...' : '🎲 Reveal Random Player'}
          </button>
        </div>

        {/* Current Player Info */}
        <div className="admin-card">
          <h2>👤 Current Player</h2>
          {currentPlayer ? (
            <div className="current-player-info">
              <div className="player-name-display">{currentPlayer.name}</div>
              <div className="player-status">{currentPlayer.status.toUpperCase()}</div>
              <div className="player-price">Base: ₹ {currentPlayer.basePrice} CR</div>
            </div>
          ) : (
            <div className="no-current-player">
              <p>No player in auction</p>
            </div>
          )}
        </div>
      </div>

      {/* Sell Form Section */}
      <div className="admin-card full-width">
        <h2>💰 Sale Execution</h2>
        <form onSubmit={handleSellPlayer}>
          <div className="form-grid">
            <div className="form-group">
              <label>Sale Price (₹ CR)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Enter sale price"
                disabled={!currentPlayer}
                min="0"
                step="1"
              />
            </div>

            <div className="form-group">
              <label>Select Team</label>
              <select
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                disabled={!currentPlayer}
              >
                <option value="">-- Choose a team --</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} (₹{team.budgetRemaining} CR left)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="btn-large btn-success"
              disabled={!currentPlayer || loading}
            >
              {loading ? '⏳ Processing...' : '✅ Sell Player'}
            </button>
            <button
              type="button"
              className="btn-large btn-warning"
              onClick={handleMarkUnsold}
              disabled={!currentPlayer || loading}
            >
              {loading ? '⏳ Processing...' : '⛔ Mark Unsold'}
            </button>
          </div>
        </form>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`message-box message-${messageType}`}>
          {message}
        </div>
      )}

      {/* Teams Budget Overview */}
      <div className="admin-card full-width">
        <h2>💼 Teams Budget Overview</h2>
        <div className="teams-grid">
          {teams.map(team => (
            <div key={team.id} className="team-budget-card">
              <h3>{team.name}</h3>
              <div className="budget-bar">
                <div
                  className="budget-spent"
                  style={{
                    width: `${(team.moneySpent / team.totalBudget) * 100}%`
                  }}
                ></div>
              </div>
              <div className="budget-details">
                <span>Spent: ₹{team.moneySpent} CR</span>
                <span>Remaining: ₹{team.budgetRemaining} CR</span>
              </div>
              <div className="players-count">
                {team.players ? team.players.length : 0} players
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
