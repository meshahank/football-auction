# AFC Auction Website - Complete Styling Guide

## Table of Contents
1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Border Radius](#border-radius)
5. [Components](#components)
6. [Animations & Transitions](#animations--transitions)
7. [Responsive Design](#responsive-design)

---

## Color System

### CSS Custom Properties (Root Variables)

#### Background Colors
```css
--bg-base:       #080c14;    /* Main dark background */
--bg-surface:    #0d1220;    /* Slightly lighter surface */
--bg-elevated:   #111827;    /* Elevated/card background */
--bg-glass:      rgba(255, 255, 255, 0.04);    /* Light glass effect */
--bg-glass-md:   rgba(255, 255, 255, 0.07);    /* Medium glass effect */
```

#### Accent Colors
```css
--accent:        #e8ff47;    /* Primary accent - bright yellow-green */
--accent-glow:   rgba(232, 255, 71, 0.18);    /* Accent glow effect */
--accent-2:      #ff5a5a;    /* Secondary accent - red/danger */
--accent-2-glow: rgba(255, 90, 90, 0.18);     /* Red glow effect */
--accent-3:      #3bffcb;    /* Tertiary accent - cyan/turquoise */
```

#### Text Colors
```css
--text-primary:   #f0f4ff;   /* Main text - light blue-white */
--text-secondary: #8b92a5;   /* Secondary text - muted blue-gray */
--text-muted:     #4a5168;   /* Muted text - darker gray */
```

#### Border Colors
```css
--border:        rgba(255, 255, 255, 0.07);   /* Standard border */
--border-accent: rgba(232, 255, 71, 0.3);     /* Accent border */
```

#### Status Colors
```css
--success: #22c55e;    /* Green - success/positive */
--warning: #f59e0b;    /* Orange - warning/attention */
--danger:  #ef4444;    /* Red - danger/error */
--info:    #3b82f6;    /* Blue - informational */
```

### Color Palette Summary

| Usage | Color | Hex Value | RGB/RGBA |
|-------|-------|-----------|----------|
| Dark Background | Base | #080c14 | rgb(8, 12, 20) |
| Surface/Card BG | Elevated | #111827 | rgb(17, 24, 39) |
| Primary Text | Light Blue-White | #f0f4ff | rgb(240, 244, 255) |
| Secondary Text | Muted Blue | #8b92a5 | rgb(139, 146, 165) |
| Primary Accent | Bright Yellow-Green | #e8ff47 | rgb(232, 255, 71) |
| Danger/Secondary Accent | Red | #ff5a5a | rgb(255, 90, 90) |
| Tertiary Accent | Cyan | #3bffcb | rgb(59, 255, 203) |
| Success | Green | #22c55e | rgb(34, 197, 94) |
| Warning | Orange | #f59e0b | rgb(245, 158, 11) |
| Danger | Red | #ef4444 | rgb(239, 68, 68) |
| Info | Blue | #3b82f6 | rgb(59, 130, 246) |

---

## Typography

### Font Families

#### Primary Display Font (Headings)
- **Font Name:** Syne
- **Weight:** 700, 800
- **Import:** Google Fonts CDN
- **URL:** `https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap`
- **Usage:** Page titles, card headings, large display text
- **Letter Spacing:** -0.3px to -3px (tighter)

#### Primary Body Font (Text)
- **Font Name:** Inter
- **Weights:** 300, 400, 500, 600, 700, 800, 900
- **Import:** Google Fonts CDN
- **URL:** `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap`
- **Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Usage:** Body text, labels, controls
- **Font Smoothing:** Enabled
  - `-webkit-font-smoothing: antialiased`
  - `-moz-osx-font-smoothing: grayscale`

#### Monospace Font (Code)
- **Font Name:** Source Code Pro
- **Fallback:** Courier New, monospace
- **Usage:** Code snippets, credentials display

### Typography Scale

| Element | Font Size | Weight | Line Height | Letter Spacing |
|---------|-----------|--------|-------------|-----------------|
| **Page Title** | 34px | 800 (Syne) | 1 | -1px |
| **Heading H2** | 28px | 800 (Syne) | default | -0.5px |
| **Large Heading** | 64px | 800 (Syne) | 1 | -3px |
| **Very Large Heading** | 48px | 800 (Syne) | default | -2px |
| **Card Title** | 17px | 800 (Syne) | default | -0.3px |
| **Large Text** | 16px | 400-600 (Inter) | 1.6 | 0.2px |
| **Normal Text** | 14px | 400-600 (Inter) | default | 0.2px |
| **Small Text** | 13px | 500 (Inter) | default | 0.2px |
| **Extra Small** | 11px-12px | 600-700 (Inter) | default | 0.5-0.8px |
| **Tiny Labels** | 10px | 700 (Inter) | default | 0.6-0.8px |

### Font Weight Usage

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Subtle text (rare) |
| 400 | Regular | Body text, paragraphs |
| 500 | Medium | Normal interactive elements |
| 600 | Semibold | Labels, button text |
| 700 | Bold | Headings, strong emphasis |
| 800 | Extra Bold | Display headings (Syne), large titles |
| 900 | Black | Not typically used |

---

## Spacing & Layout

### Border Radius (Rem Values)

```css
--r-sm:  6px;    /* Small: input fields, small buttons, badges */
--r-md:  12px;   /* Medium: stats boxes, small cards */
--r-lg:  20px;   /* Large: main cards, containers */
--r-xl:  28px;   /* Extra Large: spotlight containers */
```

### Radius Usage Chart

| Component | Radius | Rem Value |
|-----------|--------|-----------|
| Input Fields | 6px | --r-sm |
| Small Buttons | 6px | --r-sm |
| Badges/Pills | 99px | Circular |
| Stats Cards | 12px | --r-md |
| Team Cards | 20px | --r-lg |
| Player Cards | 20px | --r-lg |
| Main Spotlight | 28px | --r-xl |

### Padding Scales

#### Container Padding
- **App Container:** `padding: 32px 24px`
- **Header:** `padding: 0 32px`
- **Card Standard:** `padding: 28px`
- **Card Compact:** `padding: 14px` (mini stats)

#### Spacing Units (Gap/Margin)
```
4px  - Extra small gaps (badges)
6px  - Small gaps
8px  - Small form gaps
10px - Icon + text gaps
12px - Component gaps
14px - Medium gaps
16px - Standard gaps
20px - Large gaps
24px - Extra large gaps
28px - Page section spacing
32px - Major section spacing
40px - Bottom padding for pages
48px - Large spacing (details sections)
56px - Extra large (form areas)
64px - Branding sections
80px - Page sides (login)
```

### Layout Dimensions

| Element | Width/Height |
|---------|--------------|
| Header Height | 72px (64px mobile) |
| App Max Width | 1320px |
| Login Right Pane | 480px |
| Player Image Container | 380px |
| Team Card Min Width | 320px |
| Player Card Min Width | 210px |
| Small Avatar | 48px |

### Grid Layouts

#### Common Grid Patterns
```css
/* 2-column grid */
grid-template-columns: repeat(2, 1fr);

/* 3-column grid */
grid-template-columns: repeat(3, 1fr);

/* 4-column grid */
grid-template-columns: repeat(4, 1fr);

/* Auto-fill responsive grid - Teams */
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

/* Auto-fill responsive grid - Players */
grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));

/* 4-column summary strip */
grid-template-columns: repeat(4, 1fr);
```

---

## Components

### Header

**Structure:**
- **Position:** Sticky top
- **Height:** 72px
- **Z-Index:** 100
- **Background:** `rgba(8, 12, 20, 0.85)` with glass blur effect
- **Border:** `1px solid var(--border)`
- **Backdrop Filter:** `blur(20px)` with webkit support

**Logo Styling:**
```
Font: Syne 800
Size: 22px
Letter Spacing: -0.5px
Color: --text-primary
Accent Part Color: --accent (#e8ff47)
```

**Navigation Links:**
```
Font Size: 13.5px
Weight: 500
Padding: 7px 14px
Border Radius: 6px
Color: --text-secondary
Hover: --text-primary with --bg-glass background
Active: --accent color with --accent-glow background
Transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1)
```

**Admin Badge:**
```
Background: --accent-2 (#ff5a5a)
Color: #fff
Padding: 4px 10px
Border Radius: 99px (circular)
Font Size: 10px
Font Weight: 700
Text Transform: uppercase
Letter Spacing: 0.8px
```

**Logout Button:**
```
Background: transparent
Border: 1px solid --border
Padding: 7px 16px
Font Size: 13px
Color: --text-secondary
Hover: 
  - Border Color: --accent-2
  - Color: --accent-2
```

### Buttons

#### Primary Button
```css
Background: var(--accent) /* #e8ff47 */
Color: #080c14 /* dark text on light accent */
Padding: 10px 22px
Font Weight: 600
Border Radius: 6px

Hover:
  Background: #f4ff6e /* lighter yellow */
  Box Shadow: 0 0 24px var(--accent-glow)
  Transform: translateY(-1px)
```

#### Danger Button
```css
Background: var(--accent-2) /* #ff5a5a */
Color: #fff
Hover:
  Background: #ff7070
  Box Shadow: 0 0 24px var(--accent-2-glow)
  Transform: translateY(-1px)
```

#### Success Button
```css
Background: var(--success) /* #22c55e */
Color: #fff
Hover:
  Background: #34d35b
  Box Shadow: 0 0 20px rgba(34, 197, 94, 0.3)
  Transform: translateY(-1px)
```

#### Ghost Button
```css
Background: var(--bg-glass-md)
Border: 1px solid var(--border)
Color: var(--text-primary)
Hover:
  Background: var(--bg-glass)
  Border Color: rgba(255, 255, 255, 0.15)
```

#### Large Button (Full Width)
```css
Width: 100%
Padding: 14px
Font Size: 14px
Font Weight: 700
Border Radius: 6px
Letter Spacing: 0.3px
```

#### Filter Button (Pill Style)
```css
Padding: 7px 14px
Background: transparent
Border: 1px solid var(--border)
Border Radius: 99px
Font Size: 12px
Font Weight: 600
White Space: nowrap

Active State:
  Background: var(--accent)
  Border Color: var(--accent)
  Color: #080c14
```

### Cards

#### Standard Card
```css
Background: var(--bg-elevated)
Border: 1px solid var(--border)
Border Radius: 20px (--r-lg)
Padding: 28px
Transition: border-color 0.25s, box-shadow 0.25s

Hover:
  Border Color: rgba(255, 255, 255, 0.12)
  Box Shadow: 0 0 40px rgba(0, 0, 0, 0.4)
```

#### Team Card
```css
Background: var(--bg-elevated)
Border: 1px solid var(--border)
Border Radius: 20px
Padding: 24px
Border Top: 3px accent (on hover)
Position: relative

Hover:
  Border Color: rgba(255, 255, 255, 0.12)
  Transform: translateY(-4px)
```

#### Player Card (Small Grid)
```css
Background: var(--bg-elevated)
Border: 1px solid var(--border)
Border Radius: 20px
Border Top: 3px colored stripe (status-specific)
Aspect Ratio: 3/4 for image

Image Hover:
  Transform: scale(1.1)
  Transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1)

Auction Status Animation:
  Border pulsing between --border and auction color (2.2s)

Hover Effects:
  Border Color: rgba(255, 255, 255, 0.12)
  Transform: translateY(-5px)
  Box Shadow: 0 16px 40px rgba(0, 0, 0, 0.4)
```

#### Player Card Large (Spotlight)
```css
Display: grid with 2 columns
Grid: 380px (image) | 1fr (details)
Min Height: 540px
Image Side: 
  - Background: var(--bg-surface)
  - Border Right: 1px solid var(--border)
Details Side:
  - Padding: 48px
  - Flex: column with 32px gap
```

### Forms

#### Input Fields
```css
Width: 100%
Padding: 12px 16px
Background: var(--bg-surface)
Border: 1px solid var(--border)
Border Radius: 6px
Color: var(--text-primary)
Font Size: 14px
Font Family: inherit

Placeholder Color: var(--text-muted)

Focus State:
  Border Color: var(--accent)
  Box Shadow: 0 0 0 3px var(--accent-glow)
  Outline: none

Disabled State:
  Opacity: 0.35
  Cursor: not-allowed
```

#### Select Elements
```css
Same as input fields
Appearance: none (for custom styling)

Option Background: var(--bg-elevated)
Option Color: var(--text-primary)
```

#### Form Group (Label + Input)
```css
Margin Bottom: 20px

Label:
  Font Size: 12px
  Font Weight: 600
  Text Transform: uppercase
  Letter Spacing: 0.6px
  Color: var(--text-secondary)
  Margin Bottom: 8px
```

### Badges & Status Indicators

#### Status Badge
```css
Padding: 4px 10px / 8px 10px
Border Radius: 99px (circular)
Font Size: 10px / 12px
Font Weight: 700 / 800
Text Transform: uppercase
Letter Spacing: 0.5px / 0.8px
```

**Status Badge Colors:**
- **Available:** `rgba(59, 130, 246, 0.85)` - Blue text on transparent
- **In Auction:** `rgba(245, 158, 11, 0.85)` - Orange (warning color)
- **Sold:** `rgba(34, 197, 94, 0.85)` - Green (success color)
- **Unsold:** `rgba(239, 68, 68, 0.85)` - Red (danger color)

#### Admin Badge
```css
Background: --accent-2 (#ff5a5a)
Color: #fff
Padding: 4px 10px
Border Radius: 99px
Font Size: 10px
Font Weight: 700
Text Transform: uppercase
Letter Spacing: 0.8px
```

#### Live Chip (Broadcasting indicator)
```css
Display: inline-flex
Align Items: center
Gap: 7px
Padding: 6px 14px
Background: rgba(34, 197, 94, 0.12)
Border: 1px solid rgba(34, 197, 94, 0.3)
Border Radius: 99px
Font Size: 12px
Font Weight: 700
Color: var(--success)
Text Transform: uppercase

Live Dot:
  Width/Height: 7px
  Border Radius: 50%
  Background: var(--success)
  Animation: livePulse 1.4s ease-in-out infinite
```

### Tables

#### Unsold Players Table
```css
Width: 100%
Border Collapse: collapse

Header Row:
  Background: var(--bg-surface)
  Border Bottom: 1px solid var(--border)

Header Cell (th):
  Padding: 14px 18px
  Text Align: left
  Font Size: 10px
  Font Weight: 700
  Text Transform: uppercase
  Letter Spacing: 0.8px
  Color: var(--text-muted)

Body Row (tr):
  Border Bottom: 1px solid var(--border)
  Transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1)

Body Row Hover:
  Background: var(--bg-glass)

Cell (td):
  Padding: 14px 18px
  Font Size: 13px
  Color: var(--text-secondary)
  Font Variant Numeric: tabular-nums
```

### Search & Filter Section

#### Search Input
```css
Flex: 1
Min Width: 200px
Padding: 10px 16px
Background: var(--bg-surface)
Border: 1px solid var(--border)
Border Radius: 6px
Font Size: 14px

Focus:
  Border Color: var(--accent)
  Box Shadow: 0 0 0 3px var(--accent-glow)
  Outline: none
```

#### Filter Section Container
```css
Display: flex
Gap: 16px
Flex Wrap: wrap
Padding: 16px 20px
Background: var(--bg-elevated)
Border: 1px solid var(--border)
Border Radius: 20px
```

---

## Animations & Transitions

### Easing Function
```css
--ease: cubic-bezier(0.4, 0, 0.2, 1)
/* Smooth, professional motion curve */
```

### Key Animations

#### Fade Up (Page Entry)
```css
@keyframes fadeUp {
  from { 
    opacity: 0; 
    transform: translateY(16px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
Duration: 0.4s
Applied to: Pages on initial load
```

#### Live Pulse (Live Indicator)
```css
@keyframes livePulse {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.4; 
    transform: scale(1.3); 
  }
}
Duration: 1.4s ease-in-out
Applied to: Live dot in broadcast chip
```

#### Card Pulse (Auction Animation)
```css
@keyframes cardPulse {
  0%, 100% { 
    border-color: var(--border); 
  }
  50% { 
    border-color: rgba(245, 158, 11, 0.5); 
  }
}
Duration: 2.2s ease-in-out infinite
Applied to: Player cards in auction status
```

#### Puls Ring (Empty State)
```css
@keyframes pulsRing {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.7; 
  }
  50% { 
    transform: scale(1.3); 
    opacity: 0.2; 
  }
}
Duration: 1.8s ease-in-out infinite
Applied to: Empty state animation ring
```

#### Spin (Loading)
```css
@keyframes spin {
  to { 
    transform: rotate(360deg); 
  }
}
Duration: 0.7s linear infinite
Applied to: Spinner/loading indicator
```

#### Slide Down (Message Entry)
```css
@keyframes slideDown {
  from { 
    opacity: 0; 
    transform: translateY(-8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
Duration: 0.25s cubic-bezier(0.4, 0, 0.2, 1)
Applied to: Message boxes
```

#### Shake (Error Animation)
```css
@keyframes shake {
  0%, 100% { 
    transform: translateX(0); 
  }
  25% { 
    transform: translateX(-6px); 
  }
  75% { 
    transform: translateX(6px); 
  }
}
Duration: 0.3s ease-in-out
Applied to: Error messages
```

### Transition Speeds

| Duration | Usage |
|----------|-------|
| 0.15s | Hover effects, background changes |
| 0.2s | Color transitions, border changes |
| 0.25s | Card hovers, shadow changes |
| 0.3s | Form interactions, error animations |
| 0.4s | Page entry animations (fadeUp) |
| 0.5s | Progress bars, width transitions |
| 0.7s | Spinner rotation |
| 1.4s | Live pulse animation |
| 1.8s | Puls ring empty state |
| 2.2s | Card pulse (auction) |

---

## Global Styles

### Body & Document

#### Body Element
```css
Font Family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Background Color: var(--bg-base) /* #080c14 */
Color: var(--text-primary) /* #f0f4ff */
Min Height: 100vh
Overflow X: hidden
-webkit-font-smoothing: antialiased
-moz-osx-font-smoothing: grayscale
```

#### Grid Texture Overlay
```css
Position: fixed
Inset: 0
Background: linear-gradient with rgba(255,255,255,0.015) 1px grid
Background Size: 60px 60px
Pointer Events: none
Z-Index: 0
```

#### HTML Scroll
```css
Scroll Behavior: smooth
```

### Custom Scrollbar

```css
Width: 6px
Track Background: var(--bg-base)
Thumb Background: var(--border)
Thumb Border Radius: 10px
Thumb Hover Background: rgba(232, 255, 71, 0.3) /* accent-glow */
```

### Root Element
```css
Position: relative
Z-Index: 1
Min Height: 100vh
```

---

## Responsive Design

### Breakpoints

```css
768px   - Tablet/Medium devices (header adjustments)
900px   - Medium to large (2-col to 1-col grids)
600px   - Mobile/Small devices
480px   - Extra small devices (login page)
520px   - Specific player detail adjustments
```

### Media Query Adjustments

#### At 768px and below (Tablets)
```css
Header:
  - Padding: 0 16px (from 0 32px)
  - Height: 64px (from 72px)

Header Nav:
  - Gap: 2px (from 4px)
  - Font Size: 12px (from 13.5px)
  - Padding: 6px 10px (from 7px 14px)

App Container:
  - Padding: 20px 16px (from 32px 24px)

Page Title:
  - Font Size: 26px (from 34px)

Admin Grid:
  - grid-template-columns: 1fr (from repeat(2, 1fr))

Form Grid:
  - grid-template-columns: 1fr (from repeat(2, 1fr))

Button Group:
  - grid-template-columns: 1fr (from 1fr 1fr)

Teams Grid:
  - grid-template-columns: 1fr (from repeat(auto-fill, minmax(260px, 1fr)))
```

#### At 900px and below (Medium Devices)
```css
Grid 3-col to 2-col conversion
Grid 4-col to 2-col conversion
Player Card Large:
  - grid-template-columns: 1fr (from 380px 1fr)
  - Player Image: height 320px
  - Border Right: none
  - Border Bottom: 1px solid var(--border)
  - Player Details: padding 32px 28px (from 48px 48px)
  - Player Name: font-size 36px (from 48px)
```

#### At 600px and below (Mobile)
```css
Players Grid:
  - grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
  - Gap: 12px (from 18px)

Filters Section:
  - flex-direction: column
  - align-items: stretch

Player Details:
  - Padding: 24px 20px (from 32px 28px)

Player Name (Large):
  - Font Size: 28px (from 36px)

Base Price Box:
  - Font Size: 28px (from larger)

Login Right:
  - Padding: 32px 20px (from 48px 32px)

Login Brand:
  - Font Size: 48px (from 64px)
```

#### At 480px and below (Extra Small)
```css
Login Right:
  - Padding: 32px 20px (maintained)

Login Brand:
  - Font Size: 48px (maintained)
```

#### At 900px and below (Login Page)
```css
Login Left:
  - Display: none (hidden)

Login Right:
  - Flex: 1 (takes full width)
  - Padding: 48px 32px
```

---

## Decorative Elements

### Gradient Glows

#### Yellow-Green Glow (Accent Glow)
```css
radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)
/* Used for top-right accent effects on spotlight cards */
```

#### Cyan Glow (Tertiary Glow)
```css
radial-gradient(circle, rgba(59,255,203,0.05) 0%, transparent 70%)
/* Used for bottom-left accent effects */
```

#### Ellipse Glow (Radial at Angle)
```css
radial-gradient(ellipse at 80% 20%, rgba(232,255,71,0.04) 0%, transparent 60%)
/* Subtle top-right glow effect */
```

#### Center Radial (Current Player Info)
```css
radial-gradient(ellipse at 50% 0%, rgba(232,255,71,0.07) 0%, transparent 65%)
/* Glow from top center */
```

### Background Patterns

#### Grid Texture (Body ::before)
```css
Background Image: 
  linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
Background Size: 60px 60px
Opacity: Very subtle (0.015)
```

---

## Message Boxes

### Success Message
```css
Background: rgba(34,197,94,0.1)
Border Left: 3px solid var(--success) /* #22c55e */
Color: #86efac (light green)
Padding: 14px 18px
Border Radius: 6px
Font Weight: 600
Font Size: 14px
```

### Error Message
```css
Background: rgba(239,68,68,0.1)
Border Left: 3px solid var(--danger) /* #ef4444 */
Color: #fca5a5 (light red)
Padding: 14px 18px
Border Radius: 6px
Font Weight: 600
Font Size: 14px
Animation: shake 0.3s ease-in-out
```

### Error Alert Box
```css
Display: flex
Gap: 8px
Background: rgba(239, 68, 68, 0.1)
Border: 1px solid rgba(239, 68, 68, 0.3)
Color: #fca5a5
Padding: 11px 14px
Border Radius: 6px
Font Size: 13px
Font Weight: 500
Animation: shake 0.3s ease-in-out
```

---

## Stat Pills & Info Boxes

### Stat Pill
```css
Display: flex
Flex Direction: column
Align Items: center
Gap: 4px
Padding: 14px 20px
Background: var(--bg-glass)
Border: 1px solid var(--border)
Border Radius: 12px

Label (.sp-label):
  Font Size: 10px
  Font Weight: 700
  Text Transform: uppercase
  Letter Spacing: 0.6px
  Color: var(--text-secondary)

Value (.sp-value):
  Font Size: 22px
  Font Weight: 800
  Font Family: 'Syne', sans-serif
  Color: var(--text-primary)
```

### Header Stat (UnsoldList)
```css
Background: var(--bg-elevated)
Border: 1px solid var(--border)
Border Radius: 12px
Padding: 20px 32px
Min Width: 180px
Text Align: center

Label:
  Font Size: 10px
  Font Weight: 700
  Text Transform: uppercase
  Letter Spacing: 0.7px
  Color: var(--text-muted)
  Margin Bottom: 8px

Value:
  Font Family: 'Syne', sans-serif
  Font Size: 42px
  Font Weight: 800
  Color: var(--danger)
  Letter Spacing: -2px
```

### Summary Strip Item
```css
Background: var(--bg-elevated)
Border: 1px solid var(--border)
Border Radius: 12px
Padding: 20px 24px
Display: flex
Flex Direction: column
Gap: 6px

Label (.s-label):
  Font Size: 11px
  Font Weight: 700
  Text Transform: uppercase
  Letter Spacing: 0.7px
  Color: var(--text-muted)

Value (.s-value):
  Font Family: 'Syne', sans-serif
  Font Size: 28px
  Font Weight: 800
  Color: var(--text-primary)
  Letter Spacing: -1px

Color Variants:
  .accent .s-value: var(--accent)
  .green .s-value: var(--success)
  .red .s-value: var(--danger)
```

---

## Progress & Status

### Progress Track
```css
Width: 100%
Height: 5px
Background: var(--bg-glass-md)
Border Radius: 99px
Overflow: hidden
```

### Progress Fill
```css
Height: 100%
Border Radius: 99px
Background: var(--accent)
Transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1)
```

### Budget Bar
```css
Width: 100%
Height: 5px (small) or 4px (teams)
Background: var(--bg-glass-md)
Border Radius: 99px
Overflow: hidden
Margin Bottom: 6px (standard) or 8px (team)

Budget Filled:
  Height: 100%
  Background: var(--accent)
  Border Radius: 99px
  Transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1)
```

---

## Special Elements

### Divider
```css
Border: none
Border Top: 1px solid var(--border)
Margin: 24px 0
```

### Section Label
```css
Font Size: 11px
Font Weight: 700
Text Transform: uppercase
Letter Spacing: 1px
Color: var(--text-muted)
Margin Bottom: 16px
```

### Spinner/Loading
```css
Border: 2px solid var(--border)
Border Top: 2px solid var(--accent)
Border Radius: 50%
Width: 36px
Height: 36px
Animation: spin 0.7s linear infinite
Margin: 24px auto
```

---

## Z-Index Layering

```
0   - Background grid texture (body::before)
1   - Root container (#root)
100 - Header (sticky navigation)
2   - Spotlight pseudo-element
2   - Player card status stripe
```

---

## Summary of Key Design Principles

### Visual Hierarchy
1. **Color:** Yellow-green accent (#e8ff47) draws attention to primary actions
2. **Size:** Syne 800 headings (28-64px) for important content
3. **Contrast:** Light text on very dark backgrounds (WCAG AAA compliant)
4. **Spacing:** Generous padding/gaps for breathing room

### Glass Morphism
- Subtle transparent overlays: `rgba(255, 255, 255, 0.04-0.07)`
- Backdrop blur effects: `blur(20px)` on header
- Creates modern, layered appearance

### Motion Design
- Smooth easing: `cubic-bezier(0.4, 0, 0.2, 1)` throughout
- Subtle interactions: `translateY(-1px)` on hover for depth
- Purposeful animations: pulse, fade, scale for communication

### Color Psychology
- **Yellow-Green:** High energy, action, positivity (primary CTA)
- **Red:** Urgency, danger, secondary actions
- **Cyan:** Accent, modern, attention
- **Green/Orange/Blue:** Status indication (success/warning/info)
- **Dark Blues/Blacks:** Sophisticated, tech-forward, professional

### Typography
- **Display (Syne):** Bold, modern, draws attention
- **Body (Inter):** Clean, readable, professional
- Generous line-spacing and letter-spacing for luxury feel

### Spacing & Padding
- Consistent use of 4px-based scale (6px, 12px, 24px, etc.)
- Large gaps between sections (40px+) for visual separation
- Padding inside cards/containers (24-48px) for content breathing room

