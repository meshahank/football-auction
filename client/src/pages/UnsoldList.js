import React from 'react';
import './UnsoldList.css';

function UnsoldList({ players }) {
  const unsoldPlayers = players.filter(p => p.status === 'unsold');

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
          <table className="unsold-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Passes</th>
                <th>Dribbles</th>
                <th>Base Price</th>
              </tr>
            </thead>
            <tbody>
              {unsoldPlayers.map((player) => (
                <tr key={player.id} className="table-row">
                  <td className="player-cell">
                    <div className="player-info">
                      <img
                        src={player.imagePath || 'https://via.placeholder.com/40'}
                        alt={player.name}
                        className="player-thumb"
                        onError={(e) =>
                          e.target.src = 'https://via.placeholder.com/40'
                        }
                      />
                      <span className="player-name">{player.name}</span>
                    </div>
                  </td>
                  <td>{player.stats.goals}</td>
                  <td>{player.stats.assists}</td>
                  <td>{player.stats.passes}</td>
                  <td>{player.stats.dribbles}</td>
                  <td className="base-price">₹{player.basePrice} CR</td>
                </tr>
              ))}
            </tbody>
          </table>
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
