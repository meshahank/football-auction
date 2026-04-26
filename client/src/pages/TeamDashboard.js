import React from 'react';
import './TeamDashboard.css';

function TeamDashboard({ teams }) {
  const getTotalPlayers    = (t) => t.players ? t.players.length : 0;
  const getBudgetUsagePct  = (t) => Math.round((t.moneySpent / t.totalBudget) * 100);

  const totalSold  = teams.reduce((s, t) => s + (t.players ? t.players.length : 0), 0);
  const totalSpent = teams.reduce((s, t) => s + t.moneySpent, 0);
  const totalLeft  = teams.reduce((s, t) => s + t.budgetRemaining, 0);

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

      {/* Team cards */}
      <div className="teams-container">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <div className="team-header">
              <img
                src={team.logo || 'https://via.placeholder.com/48'}
                alt={team.name}
                className="team-logo"
                onError={(e) => e.target.src = 'https://via.placeholder.com/48'}
              />
              <h2 className="team-name">{team.name}</h2>
            </div>

            <div className="budget-section">
              <div className="budget-stat">
                <span className="stat-label">Budget</span>
                <span className="stat-value">₹{team.totalBudget} CR</span>
              </div>
              <div className="budget-stat">
                <span className="stat-label">Spent</span>
                <span className="stat-value spent">₹{team.moneySpent} CR</span>
              </div>
              <div className="budget-stat">
                <span className="stat-label">Left</span>
                <span className="stat-value remaining">₹{team.budgetRemaining} CR</span>
              </div>
            </div>

            <div className="budget-bar-container">
              <div className="budget-bar">
                <div
                  className="budget-filled"
                  style={{ width: `${getBudgetUsagePct(team)}%` }}
                />
              </div>
              <span className="budget-percent">{getBudgetUsagePct(team)}% used</span>
            </div>

            <div className="players-info">
              <div className="players-count">
                <span className="count-label">Players Acquired</span>
                <span className="count-value">{getTotalPlayers(team)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamDashboard;
