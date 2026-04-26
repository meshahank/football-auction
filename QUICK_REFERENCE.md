# AFC Auction System - Quick Reference

## 📋 File Locations and What They Do

### Backend Files
| File | Purpose |
|------|---------|
| `server/server.js` | Main Express/Socket.io server, all auction logic |
| `server/middleware/auth.js` | Authentication helpers |
| `server/data/players.json` | 56 player profiles |
| `server/data/teams.json` | 8 teams with budgets |

### Frontend Files
| File | Purpose |
|------|---------|
| `client/src/App.js` | Main router, Socket.io setup |
| `client/src/pages/LoginPage.js` | Authentication screen |
| `client/src/pages/AuctionPage.js` | Live player auction display |
| `client/src/pages/AdminPanel.js` | Admin controls (reveal, sell, unsold) |
| `client/src/pages/TeamDashboard.js` | Team budgets and rosters |
| `client/src/pages/AllPlayersGrid.js` | Grid of all 56 players |
| `client/src/pages/UnsoldList.js` | Table of unsold players |

### CSS & Styling
Each component has a corresponding `.css` file for styling.

## 🎯 Key Features

### Admin Features
- **Random Reveal**: Click to reveal random available player
- **Sell Player**: Enter price, select team, confirm sale
- **Mark Unsold**: Move player to unsold list
- **Budget Dashboard**: See all teams' spending

### User Features
- **Live Auction**: Watch player being auctioned (real-time)
- **Team Dashboard**: See which players each team bought
- **All Players**: Browse all 56 players with filters
- **Unsold List**: View players that didn't sell

## 🔐 Logins

```
Admin:  admin123  (Full access)
User:   user123   (Read-only)
```

## ⚡ Player Statuses

| Status | Meaning |
|--------|---------|
| `available` | Ready to be auctioned |
| `in-auction` | Currently being auctioned |
| `sold` | Sold to a team |
| `unsold` | Didn't sell, available for later |

## 🎲 Admin Auction Flow

1. Click **"🎲 Reveal Random Player"**
   - System picks random available player
   - Player appears on Auction Page for everyone

2. Everyone watches in real-time on Auction Page

3. Admin enters **Sale Price** (in ₹ Crores)

4. Admin selects **Team** from dropdown
   - System checks if team has budget

5. Admin clicks **"✅ Sell Player"**
   - Player status → sold
   - Team budget updated
   - Everyone sees update live

6. Alternative: Click **"⛔ Mark Unsold"**
   - Player status → unsold
   - Can be auctioned later

## 🏗️ Project Structure

```
auction/
├── backend files
│   ├── server/server.js (main server)
│   ├── server/data/ (players & teams JSON)
│   └── server/middleware/ (auth)
├── frontend files
│   ├── client/src/ (React components)
│   └── client/public/ (HTML)
└── config & docs
    ├── package.json (backend)
    ├── README.md (setup guide)
    ├── DEVELOPER.md (advanced guide)
    └── .env.example
```

## 🚀 Start Commands

**Backend:**
```bash
npm install
npm start
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd client
npm install
npm start
# Opens http://localhost:3000
```

## 🔌 Real-time Events

**From Server (Broadcasts):**
- `new-player-revealed` → New player entering auction
- `player-sold-update` → Player sold to team
- `player-unsold-update` → Player marked unsold

**To Server (Admin Only):**
- `trigger-random-player` → Reveal random player
- `sell-player` → Sell to team with price
- `mark-unsold` → Mark as unsold

## 📊 Data Examples

**Player Object:**
```json
{
  "id": 1,
  "name": "Marcus Stevens",
  "stats": {"runs": 1250, "wickets": 12, "avg": 42.5, "sr": 145},
  "basePrice": 50,
  "status": "available",
  "teamId": null,
  "imagePath": "/players/1.jpg"
}
```

**Team Object:**
```json
{
  "id": 1,
  "name": "Phoenix Rising",
  "logo": "/logos/phoenix.png",
  "totalBudget": 1000,
  "moneySpent": 350,
  "budgetRemaining": 650,
  "players": [1, 5, 12, 23]
}
```

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't connect to server | Make sure backend is running on 5000 |
| WebSocket fails | Check CORS settings in server.js |
| Data not saving | Verify players.json & teams.json exist |
| Can't sell player | Check team has budget remaining |
| Updates not showing | Refresh page or check WebSocket connection |

## 💡 Pro Tips

- **Budget Check**: Admin Panel shows each team's remaining budget in real-time
- **Search Players**: Use the search on "All Players" page to find players fast
- **Unsold Tracking**: Players can be marked unsold and auctioned later
- **Live Sync**: All users see updates instantly - no refresh needed
- **Stats Detail**: Each player has runs, wickets, average, and strike rate

## 🎨 Responsive Design

The system works on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

All pages adapt their layout for smaller screens.

---

**Remember:** This is a demo system using file-based storage. For production, migrate to a database like PostgreSQL or MongoDB.

**Keyboard Shortcut:** On Login page, press Enter after typing password to submit.

---

*Built for AFC Tournament 2024* 🏆
