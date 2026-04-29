import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TeamDetail.css';

function TeamDetail({ teams, players }) {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const team = teams.find(t => t.id === parseInt(teamId));

  if (!team) {
    return (
      <div className="team-detail">
        <button className="back-button" onClick={() => navigate('/teams')}>
          ← Back to Teams
        </button>
        <div className="not-found">
          <h2>Team not found</h2>
          <p>The team you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Get all players for this team
  const teamPlayers = team.players
    .map(playerId => players.find(p => p.id === playerId))
    .filter(Boolean);

  const getBudgetUsagePct = Math.round((team.moneySpent / team.totalBudget) * 100);

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
    <div className="team-detail">
      <button className="back-button" onClick={() => navigate('/teams')}>
        ← Back to Teams
      </button>

      {/* Team Header */}
      <div className="team-detail-header">
        <img
          src={team.logo || 'https://via.placeholder.com/150'}
          alt={team.name}
          className="team-detail-logo"
          onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
        />
        <div className="team-detail-info">
          <h1 className="team-detail-name">{team.name}</h1>
          <p className="team-detail-manager">Manager: {team.manager || 'N/A'}</p>
        </div>
      </div>

      {/* Team Stats Cards */}
      <div className="team-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Budget</span>
          <span className="stat-value">₹{team.totalBudget} CR</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Money Spent</span>
          <span className="stat-value spent">₹{team.moneySpent} CR</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Budget Remaining</span>
          <span className="stat-value remaining">₹{team.budgetRemaining} CR</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Budget Used</span>
          <span className="stat-value">{getBudgetUsagePct}%</span>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div className="budget-progress-section">
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-filled"
              style={{ width: `${getBudgetUsagePct}%` }}
            />
          </div>
          <span className="progress-label">{getBudgetUsagePct}% Budget Utilization</span>
        </div>
      </div>

      {/* Players Section */}
      <div className="players-section">
        <h2 className="players-title">Team Players ({teamPlayers.length})</h2>
        
        {teamPlayers.length > 0 ? (
          <div className="team-players-grid">
            {teamPlayers.map(player => (
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
            ))}
          </div>
        ) : (
          <div className="no-players-message">
            <p>😕 No players in this team yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamDetail;
