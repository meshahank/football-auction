import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamDashboard.css';

function TeamDashboard({ teams }) {
  const navigate = useNavigate();

  const getTotalPlayers = (t) => t.players ? t.players.length : 0;
  const totalSold = teams.reduce((s, t) => s + (t.players ? t.players.length : 0), 0);
  const totalSpent = teams.reduce((s, t) => s + t.moneySpent, 0);
  const totalLeft = teams.reduce((s, t) => s + t.budgetRemaining, 0);

  const handleTeamClick = (teamId) => {
    navigate(`/teams/${teamId}`);
  };

  return (
    <div className="team-dashboard">
      <h1 className="page-title">Teams</h1>

      {/* Summary strip */}
      <div className="summary-strip">
        <div className="summary-strip-item">
          <span className="s-label">Total Teams</span>
          <span className="s-value">{teams.length}</span>
        </div>
        <div className="summary-strip-item accent">
          <span className="s-label">Players Sold</span>
          <span className="s-value">{totalSold}</span>
        </div>
        <div className="summary-strip-item red">
          <span className="s-label">Total Spent</span>
          <span className="s-value">₹{totalSpent} CR</span>
        </div>
        <div className="summary-strip-item green">
          <span className="s-label">Budget Left</span>
          <span className="s-value">₹{totalLeft} CR</span>
        </div>
      </div>

      {/* Team cards - simplified view */}
      <div className="teams-grid">
        {teams.map(team => (
          <div
            key={team.id}
            className="team-card-simplified"
            onClick={() => handleTeamClick(team.id)}
          >
            <img
              src={team.logo || 'https://via.placeholder.com/120'}
              alt={team.name}
              className="team-card-logo"
              onError={(e) => e.target.src = 'https://via.placeholder.com/120'}
            />
            <div className="team-card-info">
              <h3 className="team-card-name">{team.name}</h3>
              <p className="team-card-manager">Manager: {team.manager || 'N/A'}</p>
              <p className="team-card-players">Players: {getTotalPlayers(team)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamDashboard;
