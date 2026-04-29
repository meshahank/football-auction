# AFC Tournament Auction System

A real-time player auction platform for 8 teams and 56 players, built with React.js, Node.js/Express, Socket.io, and local JSON file storage.

## 🎯 Features

- **Real-time auction** with WebSocket updates
- **Admin control panel** for managing auctions
- **Team dashboards** showing budget and roster tracking
- **Live player spotlight** with premium UI
- **Player management** with status tracking (available, in-auction, sold, unsold)
- **Budget tracking** with real-time calculations

## 🏗️ Project Structure

```
auction/
├── server/
│   ├── server.js              # Main Express/Socket.io server
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   └── data/
│       ├── players.json       # 56 players data
│       └── teams.json         # 8 teams data
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js             # Main app component
│   │   ├── App.css
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── AuctionPage.js
│   │   │   ├── AdminPanel.js
│   │   │   ├── TeamDashboard.js
│   │   │   ├── AllPlayersGrid.js
│   │   │   └── UnsoldList.js
│   │   ├── components/
│   │   │   └── Header.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── package.json
└── .gitignore
```

## 🚀 Setup Instructions

### Backend Setup

1. **Navigate to project root:**
   ```bash
   cd auction
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   - Server will run on `http://localhost:5000`
   - WebSocket will be available on the same URL

### Frontend Setup

1. **Navigate to client folder:**
   ```bash
   cd client
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   - Client will run on `http://localhost:3000`
   - Auto-opens in browser

## 🔑 Demo Credentials

### Admin Account
- **Password:** `admin123`
- Access to all features + Admin Control Panel

### User Account
- **Password:** `user123`
- Read-only access to all views

## 📊 Data Structure

### Players (56 total)
```json
{
  "id": 1,
  "name": "Marcus Stevens",
  "stats": {
    "goals": 25,
    "assists": 12,
    "passes": 1250,
    "dribbles": 145
  },
  "basePrice": 50,
  "status": "available",
  "teamId": null,
  "imagePath": "/players/1.jpg"
}
```

### Teams (8 total)
```json
{
  "id": 1,
  "name": "Phoenix Rising",
  "logo": "/logos/phoenix.png",
  "totalBudget": 1000,
  "moneySpent": 0,
  "budgetRemaining": 1000,
  "players": []
}
```

## 🔌 Socket.io Events

### Admin Events

**Reveal Random Player**
```javascript
socket.emit('trigger-random-player',
  { isAdmin: true },
  (response) => console.log(response)
);
```

**Sell Player**
```javascript
socket.emit('sell-player',
  {
    isAdmin: true,
    playerId: 1,
    teamId: 1,
    salePrice: 75
  },
  (response) => console.log(response)
);
```

**Mark Unsold**
```javascript
socket.emit('mark-unsold',
  { isAdmin: true, playerId: 1 },
  (response) => console.log(response)
);
```

### Client Events

- `new-player-revealed` - Broadcast when player enters auction
- `player-sold-update` - Broadcast when player is sold
- `player-unsold-update` - Broadcast when player is marked unsold

## 📖 Pages Overview

### Public Pages (Accessible to All)

**Auction Page**
- Live player spotlight with stats
- Real-time updates via WebSocket
- Shows current player being auctioned

**Team Dashboard**
- All 8 teams with budget info
- Money spent vs. remaining budget
- Player roster count
- Auction summary

**All Players Grid**
- 56 player cards with stats
- Filter by status or search by name
- Visual indicators for sold/unsold status

**Unsold List**
- Table view of unsold players
- Sorted and searchable

### Admin-Only Pages

**Admin Control Panel**
- 🎲 Random button to reveal next player
- 💰 Sale execution form
- 💼 Real-time team budget overview
- Budget progress bars
- Status messages for actions

## 🎨 Styling Features

- **Responsive design** for mobile and desktop
- **Premium gradient backgrounds**
- **Smooth animations and transitions**
- **Real-time status indicators**
- **Color-coded status badges**

## 🔐 Security Notes

- Demo credentials are hardcoded for simplicity
- In production, implement:
  - JWT authentication
  - Secure password hashing
  - Environment variables for credentials
  - HTTPS/WSS for secure communication

## 🚀 Production Deployment

### Environment Variables
Create `.env` files for backend:
```
PORT=5000
ADMIN_PASSWORD=your_secure_admin_password
USER_PASSWORD=your_secure_user_password
```

### Database Migration
Replace JSON file storage with:
- MongoDB
- PostgreSQL
- Firebase
- AWS DynamoDB

## 📱 Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## 🐛 Troubleshooting

**WebSocket Connection Issues**
- Check if backend server is running on port 5000
- Verify CORS settings in server.js
- Check browser console for errors

**Data Not Updating**
- Ensure players.json and teams.json exist in `server/data/`
- Verify file permissions for read/write access
- Check server logs for errors

**Login Issues**
- Verify credentials (admin123 / user123)
- Clear browser cache and cookies
- Check browser console for errors

## 📄 License

MIT License - Feel free to use for educational purposes

## 🤝 Support

For issues or questions, check the server logs and browser console for detailed error messages.

---

**Built with ❤️ for AFC Tournament 2024**
