# Card Type to Background Mapping

## Automatic Background Selection

The auction page automatically selects the appropriate background based on the player's card type. Here's the complete mapping:

### Card Type Classifications

```
Rating 111           → Iconic         → white.jpg
Rating 110-108       → Bigtime        → black.jpg
Rating 108 (GK)      → Bigtime GK     → white.jpg
Rating 107-104       → Epic           → blue.jpg
Rating 103-100       → Highlight      → gold.jpg
Rating 98-96         → Silver         → silver.jpg
Rating 95-93         → Bronze         → bronze.jpg
No Player/Default    → (Default)      → default.jpg
```

## CSS Class Names Used

The component dynamically adds CSS classes based on card type:

- `card-bg-iconic` → Uses `white.jpg`
- `card-bg-bigtime` → Uses `black.jpg`
- `card-bg-bigtime-gk` → Uses `white.jpg`
- `card-bg-epic` → Uses `blue.jpg`
- `card-bg-highlight` → Uses `gold.jpg`
- `card-bg-silver` → Uses `silver.jpg`
- `card-bg-bronze` → Uses `bronze.jpg`
- `card-bg-default` → Uses `default.jpg`

## Player Data Structure

Each player object includes:
```json
{
  "id": 1,
  "name": "Player Name",
  "position": "CB",
  "basePrice": 70,
  "rating": 111,
  "card": "Iconic",
  "status": "available",
  "teamId": null,
  "imagePath": "/players/player.png"
}
```

The `card` field automatically determines which background to use.

## Background Overlay

Each background applies a semi-transparent color overlay to ensure text remains readable:

- **Iconic/Bigtime GK (White):** Light overlay `rgba(255, 255, 255, 0.15)`
- **Bigtime (Black):** Dark overlay `rgba(0, 0, 0, 0.85)`
- **Epic (Blue):** Blue overlay `rgba(30, 58, 138, 0.88)`
- **Highlight (Gold):** Gold overlay `rgba(120, 81, 0, 0.88)`
- **Silver (Silver):** Silver overlay `rgba(192, 192, 192, 0.2)`
- **Bronze (Bronze):** Brown overlay `rgba(139, 69, 19, 0.88)`

Additionally, a vignette effect darkens the edges to focus on the player card.

## Adding Custom Backgrounds

1. Place your background image in this folder
2. Name it exactly as specified (e.g., `white.jpg`, `blue.jpg`)
3. Reload the application
4. The background will automatically update when players of that card type appear

No code changes needed!
