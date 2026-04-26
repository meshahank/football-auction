const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Data paths
const dataDir = path.join(__dirname, 'data');
const playersPath = path.join(dataDir, 'players.json');
const teamsPath = path.join(dataDir, 'teams.json');

// Utility functions for file operations
const readPlayers = () => {
  try {
    const data = fs.readFileSync(playersPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading players.json:', error);
    return [];
  }
};

const readTeams = () => {
  try {
    const data = fs.readFileSync(teamsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading teams.json:', error);
    return [];
  }
};

const writePlayers = (players) => {
  try {
    fs.writeFileSync(playersPath, JSON.stringify(players, null, 2));
  } catch (error) {
    console.error('Error writing players.json:', error);
  }
};

const writeTeams = (teams) => {
  try {
    fs.writeFileSync(teamsPath, JSON.stringify(teams, null, 2));
  } catch (error) {
    console.error('Error writing teams.json:', error);
  }
};

// Track current auction player
let currentPlayer = null;
let auctionLog = [];

// REST API Endpoints

// Get all players
app.get('/api/players', (req, res) => {
  const players = readPlayers();
  res.json(players);
});

// Get all teams
app.get('/api/teams', (req, res) => {
  const teams = readTeams();
  res.json(teams);
});

// Get current player in auction
app.get('/api/current-player', (req, res) => {
  res.json({ currentPlayer });
});

// Get auction log
app.get('/api/auction-log', (req, res) => {
  res.json(auctionLog);
});

// Socket.io events
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Send initial data to connected client
  socket.emit('initial-data', {
    currentPlayer,
    players: readPlayers(),
    teams: readTeams()
  });

  // Admin: Trigger random player
  socket.on('trigger-random-player', (data, callback) => {
    const isAdmin = data.isAdmin;
    if (!isAdmin) {
      callback({ success: false, message: 'Unauthorized' });
      return;
    }

    const players = readPlayers();
    const availablePlayers = players.filter(p => p.status === 'available');

    if (availablePlayers.length === 0) {
      callback({ success: false, message: 'No available players' });
      return;
    }

    // Pick random player
    const randomIndex = Math.floor(Math.random() * availablePlayers.length);
    const selectedPlayer = availablePlayers[randomIndex];

    // Update player status to 'in-auction'
    const playerIndex = players.findIndex(p => p.id === selectedPlayer.id);
    players[playerIndex].status = 'in-auction';
    writePlayers(players);

    // Set as current player
    currentPlayer = players[playerIndex];

    // Broadcast to all clients
    io.emit('new-player-revealed', {
      player: currentPlayer,
      timestamp: new Date()
    });

    auctionLog.push({
      action: 'player-revealed',
      player: currentPlayer,
      timestamp: new Date()
    });

    callback({ success: true, player: currentPlayer });
  });

  // Admin: Sell player to a team
  socket.on('sell-player', (data, callback) => {
    const { isAdmin, playerId, teamId, salePrice } = data;
    if (!isAdmin) {
      callback({ success: false, message: 'Unauthorized' });
      return;
    }

    const players = readPlayers();
    const teams = readTeams();

    // Find player
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) {
      callback({ success: false, message: 'Player not found' });
      return;
    }

    // Find team
    const teamIndex = teams.findIndex(t => t.id === teamId);
    if (teamIndex === -1) {
      callback({ success: false, message: 'Team not found' });
      return;
    }

    const player = players[playerIndex];
    const team = teams[teamIndex];

    // Check if team has enough budget
    if (team.budgetRemaining < salePrice) {
      callback({ success: false, message: 'Insufficient budget' });
      return;
    }

    // Update player
    player.status = 'sold';
    player.teamId = teamId;

    // Update team
    team.moneySpent += salePrice;
    team.budgetRemaining = team.totalBudget - team.moneySpent;
    if (!team.players) team.players = [];
    team.players.push(playerId);

    // Save updates
    writePlayers(players);
    writeTeams(teams);

    // Broadcast update
    io.emit('player-sold-update', {
      player,
      team,
      salePrice,
      timestamp: new Date()
    });

    auctionLog.push({
      action: 'player-sold',
      player,
      team,
      salePrice,
      timestamp: new Date()
    });

    currentPlayer = null;
    callback({ success: true, message: 'Player sold successfully' });
  });

  // Admin: Mark player as unsold
  socket.on('mark-unsold', (data, callback) => {
    const { isAdmin, playerId } = data;
    if (!isAdmin) {
      callback({ success: false, message: 'Unauthorized' });
      return;
    }

    const players = readPlayers();
    const playerIndex = players.findIndex(p => p.id === playerId);

    if (playerIndex === -1) {
      callback({ success: false, message: 'Player not found' });
      return;
    }

    players[playerIndex].status = 'unsold';
    writePlayers(players);

    // Broadcast update
    io.emit('player-unsold-update', {
      player: players[playerIndex],
      timestamp: new Date()
    });

    auctionLog.push({
      action: 'player-unsold',
      player: players[playerIndex],
      timestamp: new Date()
    });

    currentPlayer = null;
    callback({ success: true, message: 'Player marked as unsold' });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`AFC Auction Server running on port ${PORT}`);
});
