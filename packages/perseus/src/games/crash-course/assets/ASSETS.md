# Crash Course Assets

This directory contains all game assets organized by type.

## Directory Structure

```
assets/
├── sprites/      # Character, alien, and car sprites
├── backgrounds/  # Sky, city layers, and environmental elements
├── ui/           # UI elements (buttons, titles, screens)
├── audio/        # Music tracks and sound effects
└── story/        # Story sequence images
```

## Asset Inventory

### Sprites (`sprites/`)

**Character Animation (128x128px)**:
- `run1.png` through `run6.png` - Running animation (6 frames)
- `impact.png` - Impact/collision effect

**Aliens (300x300px)**:
- `alien1.png`, `alien2.png`, `alien3.png` - Alien animation frames
- `beam.png` - Abduction beam effect

**Obstacles**:
- `car1.png`, `car2.png` - Car obstacles (256x256px)

### Backgrounds (`backgrounds/`)

**Sky & City Layers (parallax scrolling)**:
- `sky.png` - Static sky background (800x600px)
- `city-far.png` - Distant city layer (slowest parallax)
- `city-semi-far.png` - Semi-distant city layer
- `city-semi-close.png` - Semi-close city layer
- `city-close.png` - Closest city layer (fastest parallax)

**Environmental**:
- `streetlamp.png` - Street lamp sprite
- `lamplight.png` - Lamp glow effect

### UI (`ui/`)

**Screens**:
- `title.png` - Game title logo
- `start.png` - Start button
- `victory.png` - Victory screen
- `lose.png` - Game over screen

**Buttons**:
- `next.png` - Next button (story pages)
- `mute.png` - Mute audio icon
- `unmute.png` - Unmute audio icon

**Special**:
- `bonus1.png`, `bonus2.png` - Car bonus animation frames
- `skid.png` - Skid mark effect

### Story (`story/`)

**Story Sequence (7 pages)**:
- `story1.png` through `story7.png` - Narrative intro sequence

### Audio (`audio/`)

**Music Tracks (OGG format)**:
- `alexbouncymix2.ogg` - Menu/story music (loops)
- `Zodik - Tedox.ogg` - Gameplay music (plays once)
- `Zodik - Neon Owl.ogg` - Extended gameplay music (loops)
- `Game Over II.ogg` - Game over music

**Sound Effects (WAV format)**:
- `bonusgame.wav` - Bonus level music
- `explosion.wav` - Explosion sound
- `tires_squal_loop.wav` - Tire squeal sound

## Import Examples

### In Engine/Systems (Phase 2)

```typescript
// Import sprites
import run1 from "../assets/sprites/run1.png";
import alien1 from "../assets/sprites/alien1.png";

// Import backgrounds
import skyImg from "../assets/backgrounds/sky.png";
import cityFar from "../assets/backgrounds/city-far.png";

// Import UI
import titleImg from "../assets/ui/title.png";
import startBtn from "../assets/ui/start.png";

// Import audio
import menuMusic from "../assets/audio/alexbouncymix2.ogg";
import gameplayMusic from "../assets/audio/Zodik - Tedox.ogg";

// Import story
import story1 from "../assets/story/story1.png";
```

### In React Components (Phase 3)

```typescript
// UI assets for overlays
import titleImg from "../../assets/ui/title.png";
import startBtn from "../../assets/ui/start.png";
import muteIcon from "../../assets/ui/mute.png";
```

## Asset Manifest

For the AssetLoader system (Phase 2), assets will be defined in a manifest:

```typescript
const ASSET_MANIFEST = {
    images: {
        // Sprites
        run1: run1Img,
        run2: run2Img,
        // ... etc

        // Backgrounds
        sky: skyImg,
        cityFar: cityFarImg,
        // ... etc
    },
    audio: {
        menu: menuMusic,
        gameplay: gameplayMusic,
        extended: neonOwlMusic,
        gameover: gameOverMusic,
    },
};
```

## File Formats

- **Images**: PNG (with transparency where needed)
- **Audio**: OGG Vorbis (web-optimized)

## Size Guidelines

- Character sprites: 128x128px
- Alien sprites: 300x300px
- Car sprites: 256x256px
- Backgrounds: 800x600px (full canvas) or wider for parallax
- UI elements: Variable (optimized for 800x600 canvas)

## Asset Credits

- Music: Zodik, Alex
- Art: [To be added]

## Notes for Phase 2

When building the AssetLoader:
1. Load all images on init()
2. Create Image elements for each sprite
3. Create Audio elements for each track
4. Track loading progress
5. Resolve promise when all loaded
6. Provide getImage() and getAudio() accessors

---

**All assets moved from**: `packages/perseus/src/__docs__/`
**Moved to**: `packages/perseus/src/games/crash-course/assets/`
**Date**: 2025-01-07 (Phase 1)
