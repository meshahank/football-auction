# AFC Auction System - Developer Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (3000)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ App.js (Router + Socket.io Client)                   │   │
│  │  ├── LoginPage (Auth)                                │   │
│  │  ├── AuctionPage (Live Auction)                      │   │
│  │  ├── AdminPanel (Admin Only)                         │   │
│  │  ├── TeamDashboard                                   │   │
│  │  ├── AllPlayersGrid                                  │   │
│  │  └── UnsoldList                                      │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │ Socket.io
                     │ REST API
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                 Node.js/Express (5000)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Server.js (Express + Socket.io)                      │   │
│  │  ├── REST Endpoints                                  │   │
│  │  ├── Socket Event Handlers                           │   │
│  │  └── File I/O (JSON)                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                        │                                     │
│                        ▼                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Data Layer                                           │   │
│  │  ├── server/data/players.json (56 players)          │   │
│  │  └── server/data/teams.json (8 teams)               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Backend: server.js

**Responsibilities:**
- Express server setup with CORS
- Socket.io server for real-time communication
- File system operations for data persistence
- REST API endpoints
- Admin action handlers

**Key Functions:**
```javascript
readPlayers()           // Load players from JSON
readTeams()             // Load teams from JSON
writePlayers(players)   // Save players to JSON
writeTeams(teams)       // Save teams to JSON
```

**Socket Events:**
1. `connection` - New client connects
2. `trigger-random-player` - Admin reveals random player
3. `sell-player` - Admin sells player to team
4. `mark-unsold` - Admin marks player unsold
5. `disconnect` - Client disconnects

### Frontend: React Components

**App.js**
- Router setup
- Socket.io connection management
- Global state: currentPlayer, players, teams
- Authentication state management

**LoginPage.js**
- Toggle between Admin/User modes
- Password validation
- Credentials: admin123 / user123

**AuctionPage.js**
- Real-time display of current player
- Player stats visualization
- Listens to `new-player-revealed` events
- Responds to live updates

**AdminPanel.js**
- Random Player button (disabled if no available players)
- Sale form with price and team selector
- Mark unsold button
- Budget overview for all teams
- Real-time message feedback

**TeamDashboard.js**
- Grid layout of all 8 teams
- Budget spent vs. remaining
- Players bought per team
- Auction summary statistics

**AllPlayersGrid.js**
- 56 player cards in responsive grid
- Filter by status (all, available, in-auction, sold, unsold)
- Search by player name
- Visual status indicators

**UnsoldList.js**
- Table view of unsold players
- Player stats and base price
- Thumbnail images

## Data Flow

### Auction Reveal Flow
1. Admin clicks "Reveal Random Player"
2. Frontend emits `trigger-random-player` to backend
3. Backend:
   - Selects random player with status='available'
   - Updates player status to 'in-auction'
   - Saves to players.json
   - Emits `new-player-revealed` to all clients
4. All clients receive update and display new player

### Player Sale Flow
1. Admin enters price and selects team
2. Frontend emits `sell-player` with playerId, teamId, salePrice
3. Backend:
   - Validates budget availability
   - Updates player: status='sold', teamId=<teamId>
   - Updates team: moneySpent += salePrice, budgetRemaining -= salePrice
   - Saves both to JSON files
   - Emits `player-sold-update` to all clients
4. All clients update displays
5. currentPlayer reset to null

## File Structure Details

```
auction/
├── server/
│   ├── server.js                  (Main server file)
│   ├── middleware/
│   │   └── auth.js               (Auth utilities)
│   ├── data/
│   │   ├── players.json          (56 players)
│   │   └── teams.json            (8 teams)
│   └── package.json
├── client/
│   ├── public/
│   │   └── index.html            (HTML entry)
│   ├── src/
│   │   ├── App.js               (Main component)
│   │   ├── App.css              (Global styles)
│   │   ├── index.js             (React entry)
│   │   ├── index.css            (Global styles)
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── LoginPage.css
│   │   │   ├── AuctionPage.js
│   │   │   ├── AuctionPage.css
│   │   │   ├── AdminPanel.js
│   │   │   ├── AdminPanel.css
│   │   │   ├── TeamDashboard.js
│   │   │   ├── TeamDashboard.css
│   │   │   ├── AllPlayersGrid.js
│   │   │   ├── AllPlayersGrid.css
│   │   │   ├── UnsoldList.js
│   │   │   └── UnsoldList.css
│   │   └── components/
│   │       ├── Header.js
│   │       └── Header.css
│   └── package.json
├── package.json
├── README.md                      (User guide)
├── DEVELOPER.md                   (This file)
├── .gitignore
├── .env.example
├── setup.sh                       (Setup for Unix)
└── setup.bat                      (Setup for Windows)
```

## Extending the System

### Adding New Socket Events

**Backend (server.js):**
```javascript
socket.on('new-event-name', (data, callback) => {
  // Process data
  // Send response
  callback({ success: true, message: '...' });

  // Broadcast to all clients
  io.emit('event-broadcast', { data });
});
```

**Frontend (Component.js):**
```javascript
useEffect(() => {
  socket.on('event-broadcast', (data) => {
    // Update state
  });
}, [socket]);

// Emit event
socket.emit('new-event-name', { data }, (response) => {
  console.log(response);
});
```

### Adding New Pages

1. Create `src/pages/NewPage.js`
2. Create `src/pages/NewPage.css`
3. Add route in `App.js`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```
4. Add navigation link in `Header.js`

### Modifying Player/Team Data

**players.json Schema:**
```json
{
  "id": number,
  "name": string,
  "stats": {
    "goals": number,
    "assists": number,
    "passes": number,
    "dribbles": number
  },
  "basePrice": number (in CR),
  "status": "available" | "in-auction" | "sold" | "unsold",
  "teamId": number | null,
  "imagePath": string
}
```

**teams.json Schema:**
```json
{
  "id": number,
  "name": string,
  "logo": string (path),
  "totalBudget": number (in CR),
  "moneySpent": number,
  "budgetRemaining": number,
  "players": number[] (player IDs)
}
```

## Testing

### Manual Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend connects to backend
- [ ] Login works with both credentials
- [ ] Admin: Random button reveals a player
- [ ] Admin: Can see player without budget
- [ ] Admin: Can select team and set price
- [ ] Admin: Can sell player
- [ ] Admin: Budget updates for team
- [ ] User: Can see live updates
- [ ] User: Cannot access Admin Panel
- [ ] All pages load and respond
- [ ] Responsive design works on mobile

### Testing Admin Flow

1. Login as Admin (admin123)
2. Go to Admin Panel
3. Click "Reveal Random Player"
4. Verify player appears in Auction Page
5. Enter sale price (e.g., 75)
6. Select team from dropdown
7. Click "Sell Player"
8. Verify:
   - Player status changes to "sold"
   - Team budget updates
   - Player appears on Team Dashboard
   - Message confirms sale

## Performance Optimization

### Current Features
- Minimal re-renders with React
- Efficient socket.io usage
- JSON file caching on server

### Future Improvements
- Database (MongoDB/PostgreSQL)
- Redis caching
- Pagination for large datasets
- Image optimization/CDN
- Server-side rendering for initial load

## Troubleshooting

### WebSocket Connection Fails
- Check backend is running: `http://localhost:5000`
- Verify CORS in server.js
- Check firewall settings
- Browser console shows error details

### Data Not Persisting
- Verify `server/data/` directory exists
- Check file permissions (read/write access)
- Verify JSON syntax in *.json files
- Check server logs for file I/O errors

### Admin Actions Not Working
- Verify logged in as Admin (admin123)
- Check players available for auction
- Verify team has sufficient budget
- Check browser console for errors

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Verify CSS files are loaded
- Check browser console for CSS errors
- Ensure responsive breakpoints match device

## Security Considerations

⚠️ **Development Demo Only** - This system uses hardcoded credentials and file-based storage.

### For Production:
1. Implement JWT authentication
2. Hash and salt passwords
3. Use environment variables for secrets
4. Migrate to database (PostgreSQL/MongoDB)
5. Implement HTTPS/WSS
6. Add rate limiting
7. Implement input validation/sanitization
8. Add audit logging
9. Implement role-based access control (RBAC)
10. Regular security audits

---

**Last Updated:** 2024
**Version:** 1.0.0
