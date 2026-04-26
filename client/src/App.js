import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';

import LoginPage from './pages/LoginPage';
import AuctionPage from './pages/AuctionPage';
import TeamDashboard from './pages/TeamDashboard';
import AllPlayersGrid from './pages/AllPlayersGrid';
import UnsoldList from './pages/UnsoldList';
import AdminPanel from './pages/AdminPanel';
import Header from './components/Header';

// Determine socket URL based on environment
const getSocketURL = () => {
  if (process.env.REACT_APP_SOCKET_URL) {
    return process.env.REACT_APP_SOCKET_URL;
  }
  
  // In production (Vercel), use the current origin
  if (process.env.NODE_ENV === 'production') {
    return window.location.origin;
  }
  
  // In development, use localhost
  return 'http://localhost:5000';
};

const SOCKET_URL = getSocketURL();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('initial-data', (data) => {
      setCurrentPlayer(data.currentPlayer);
      setPlayers(data.players);
      setTeams(data.teams);
    });

    newSocket.on('new-player-revealed', (data) => {
      setCurrentPlayer(data.player);
      setPlayers(prev =>
        prev.map(p => p.id === data.player.id ? data.player : p)
      );
    });

    newSocket.on('player-sold-update', (data) => {
      setPlayers(prev =>
        prev.map(p => p.id === data.player.id ? data.player : p)
      );
      setTeams(prev =>
        prev.map(t => t.id === data.team.id ? data.team : t)
      );
      setCurrentPlayer(null);
    });

    newSocket.on('player-unsold-update', (data) => {
      setPlayers(prev =>
        prev.map(p => p.id === data.player.id ? data.player : p)
      );
      setCurrentPlayer(null);
    });

    return () => newSocket.close();
  }, []);

  const handleLogin = (password, asAdmin = false) => {
    // Simple auth check (In production, send to backend)
    const adminPass = 'admin123';
    const userPass = 'user123';

    if (asAdmin && password === adminPass) {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else if (!asAdmin && (password === userPass || password === adminPass)) {
      setIsAuthenticated(true);
      setIsAdmin(password === adminPass);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Header isAdmin={isAdmin} onLogout={handleLogout} />
      <main className="app-container">
        <Routes>
          <Route path="/auction" element={
            <AuctionPage currentPlayer={currentPlayer} socket={socket} />
          } />
          <Route path="/teams" element={
            <TeamDashboard teams={teams} />
          } />
          <Route path="/players" element={
            <AllPlayersGrid players={players} />
          } />
          <Route path="/unsold" element={
            <UnsoldList players={players} />
          } />
          {isAdmin && (
            <Route path="/admin" element={
              <AdminPanel socket={socket} players={players} teams={teams} currentPlayer={currentPlayer} />
            } />
          )}
          <Route path="/" element={<Navigate to="/auction" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
