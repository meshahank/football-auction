# 🎨 Background Installation Guide

## Quick Start

You have 6 background image slots to fill:

| File Name | Card Type | Color | Players |
|-----------|-----------|-------|---------|
| `white.jpg` | Iconic & Bigtime GK | White | Arshad (111), Hanan, Murshid (108 GK) |
| `black.jpg` | Bigtime | Black | Jalal, Hanan B, Hasan, Yaseen, etc. (110-108) |
| `blue.jpg` | Epic | Blue | Amaan, Nabhan, Shaheer, etc. (107-104) |
| `gold.jpg` | Highlight | Gold | Adil KT, Anwar, Salih, etc. (103-100) |
| `silver.jpg` | Silver | Silver | Shamil, Amish, Abshaar, etc. (98-96) |
| `bronze.jpg` | Bronze | Bronze | Nabeel, Habis, Shabeeh, etc. (95-93) |

## How to Add Your Backgrounds

### Step 1: Prepare Your Images
- Dimensions: **1920x1080px minimum** (or larger for better quality)
- Format: **JPG** (recommended for web)
- File size: **< 500KB each** (optimize for web)

### Step 2: Name Your Files
Save your images with EXACT filenames:
- `white.jpg`
- `black.jpg`
- `blue.jpg`
- `gold.jpg`
- `silver.jpg`
- `bronze.jpg`
- `default.jpg` (optional, for waiting state)

### Step 3: Upload to This Folder
Place the files in: `client/public/backgrounds/`

Directory structure:
```
auction/
├── client/
│   └── public/
│       └── backgrounds/
│           ├── white.jpg ✓
│           ├── black.jpg ✓
│           ├── blue.jpg ✓
│           ├── gold.jpg ✓
│           ├── silver.jpg ✓
│           ├── bronze.jpg ✓
│           ├── default.jpg ✓ (optional)
│           ├── README.md
│           ├── CARD_MAPPING.md
│           └── INSTALLATION.md (this file)
```

### Step 4: Reload Application
Simply refresh your browser. The backgrounds will load automatically!

## Finding Background Images

### Free Stock Photo Websites
1. **Unsplash** - unsplash.com
   - Search: "white background texture", "black background", etc.
   
2. **Pexels** - pexels.com
   - High-quality free photos

3. **Pixabay** - pixabay.com
   - Large collection of images

4. **Freepik** - freepik.com
   - Free with account

### Search Terms for Each Background

- **White:** "white texture background", "minimal white", "elegant white background"
- **Black:** "black dark background", "dark texture", "black professional background"
- **Blue:** "blue background texture", "royal blue", "deep blue background"
- **Gold:** "gold background", "gold texture", "golden luxury background"
- **Silver:** "silver background", "metallic silver", "grey texture"
- **Bronze:** "bronze background", "brown texture", "warm brown background"

## Image Optimization Tips

### Using Online Tools
1. **TinyJPG.com** - Compress JPG files without quality loss
2. **ImageOptim** - Optimize images for web
3. **Photopea.com** - Free online editor (resize, crop, etc.)

### Basic Requirements
- ✅ Minimum 1920x1080px
- ✅ JPG format
- ✅ Under 500KB file size
- ✅ High contrast (for text readability)
- ✅ No watermarks

## Common Issues & Solutions

### Background Not Showing
**Problem:** Uploaded image not appearing
**Solution:** 
- Check filename spelling (must be lowercase)
- Verify file is in `client/public/backgrounds/` folder
- Refresh browser (Ctrl+F5 for hard refresh)
- Check browser console for errors

### Blurry Background
**Problem:** Image looks pixelated
**Solution:**
- Use higher resolution source image (2560x1440+ recommended)
- Avoid stretching small images

### Text Not Readable
**Problem:** Player details hard to read over background
**Solution:**
- Choose images with good contrast
- CSS overlay automatically applied (semi-transparent)
- Vignette effect darkens edges automatically

### File Size Too Large
**Problem:** Images loading slowly
**Solution:**
- Compress using TinyJPG.com
- Use "Export as" in image editor with quality ~75-85%
- Target size: 200-500KB per image

## Advanced Customization

If you want to adjust the overlay opacity or style, edit `client/src/pages/AuctionPage.css`:

```css
/* Find this section: */
.auction-page-fullscreen.card-bg-white .auction-bg-gradient {
  background-image: 
    url('/backgrounds/white.jpg'),
    linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(240, 240, 240, 0.15) 100%);
}

/* Adjust the rgba values:
   rgba(R, G, B, OPACITY)
   Change OPACITY: 0 = invisible, 1 = opaque
   Lower values = more visible background, higher values = darker overlay */
```

## Success Checklist

- [ ] All 6 images prepared (1920x1080px, JPG format)
- [ ] Files renamed exactly (white.jpg, black.jpg, etc.)
- [ ] Files uploaded to `client/public/backgrounds/`
- [ ] Application reloaded
- [ ] Backgrounds appear when viewing different players
- [ ] Text is readable over backgrounds
- [ ] No console errors

## Need Help?

Refer to:
- `README.md` - Detailed background specifications
- `CARD_MAPPING.md` - Card type to background mappings
- Check browser console (F12) for any errors

## Example Directory After Setup

```
client/public/backgrounds/
├── white.jpg (Iconic/Bigtime GK - light/clean)
├── black.jpg (Bigtime - dark/bold)
├── blue.jpg (Epic - royal blue)
├── gold.jpg (Highlight - rich gold/yellow)
├── silver.jpg (Silver - metallic gray)
├── bronze.jpg (Bronze - warm brown)
└── default.jpg (Optional - professional blue)
```

Done! The auction page will now show different backgrounds for each card type. 🎉
