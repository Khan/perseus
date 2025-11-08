# Crash Course - Original Game Behavior

**Date captured**: 2025-01-07
**Purpose**: Document current game behavior before refactoring

## Game Overview

Crash Course is an educational endless runner where the player answers math questions while avoiding car obstacles. The game runs for 5 minutes (game time: 11:55pm to midnight), with increasing difficulty.

## Game Constants

```
Canvas: 800x600px
Ground level: 450px from top
Scroll speed: 2px/frame (base)
Character position: X=100
Jump height: 140px
Jump duration: 1000ms
Obstacle spawn interval: 5000ms
Collision zone: X=248 (character + width + 20)
Cool mode duration: 2000ms after correct answer
Lamp spacing: 500px
Game duration: 5 minutes (300,000ms)
```

## Game States

### 1. Start Screen (`"start"`)
- **Display**: Title image, start button, mute/unmute toggle
- **Music**: Alex Bouncy Mix (looped)
- **Actions**:
  - Click start → transition to story
  - Mute toggle works

### 2. Story Screen (`"story"`)
- **Display**: 7 story pages with next button
- **Music**: Alex Bouncy Mix continues
- **Actions**:
  - Click next → advance to next page
  - Page 7 next → transition to playing state
  - Can skip through quickly

### 3. Playing State (`"playing"`)
- **Display**: Running character, scrolling background, obstacles, HUD
- **Music**: Tedox (plays once) → Neon Owl (loops)
- **Mechanics**: Core gameplay (see below)

### 4. Car Bonus (`"carBonus"`)
- **Trigger**: Answer the final question (special car obstacle)
- **Display**: Bonus screen showing racing car animation
- **Duration**: 3 seconds
- **Actions**: Auto-transition to victory

### 5. Victory Screen (`"victory"`)
- **Trigger**: Survive 5 minutes without losing all lives
- **Display**: Victory image, final score, "Play Again" button
- **Music**: Victory sound
- **Actions**: Click play again → restart game

### 6. Game Over Screen (`"gameover"`)
- **Trigger**: Lose all 3 lives
- **Display**: Game over image, final score, "Play Again" button
- **Music**: Game Over II
- **Actions**: Click play again → restart game

## Core Gameplay Mechanics

### Character States

1. **Running** (`"running"`)
   - Default state
   - 6-frame running animation (8fps)
   - Character at ground level (Y=450)

2. **Cool Mode** (`"coolMode"`)
   - Activated after correct answer
   - Lasts 2000ms
   - Purple tinted running animation
   - Same 6-frame cycle

3. **Impact** (`"impact"`)
   - Shows when wrong answer given
   - Impact sprite displayed
   - Brief state before returning to running

4. **Loss** (`"loss"`)
   - Shows when life is lost
   - Impact sprite displayed
   - Triggers alien abduction

### Obstacle System

**Obstacle Properties:**
- Spawn at X=800 (off-screen right)
- Width/Height: 154px (car sprite at 0.6 scale)
- Contains Perseus question (one of 4 types)
- Moves left at scroll speed

**Obstacle Lifecycle:**
1. Spawns every 5000ms at X=800
2. Scrolls left with background
3. When enters collision zone (X < 248):
   - If not answered: Present question to player
   - If answered correctly: Disappears, score++, cool mode activated
   - If answered incorrectly: Disappears, lose life, alien abduction
   - If unanswered when passed: Nothing happens (missed)
4. Removed when off-screen (X < -200)

**Final Obstacle:**
- Special car obstacle with jump mechanic
- Answering triggers car bonus scene
- Leads to victory

### Question Types

1. **Addition**: $a + b$ (numeric input, 1-50 range)
2. **Subtraction**: $a - b$ (numeric input, 10-50 range, positive results)
3. **Multiplication**: $a \times b$ (numeric input, 2-12 range)
4. **Division**: $a \div b$ (radio widget, 4 choices, 2-12 range, exact division)

### Life System

- Start with 3 lives
- Lose 1 life for incorrect answer
- No way to gain lives
- 0 lives = game over

### Scoring System

- Start at 0 points
- +1 point per correct answer
- No points deducted for wrong answers
- Final score displayed at end

### Timer System

- Game time: 11:55:00 → 12:00:00
- Real time: 5 minutes
- Display format: "HH:MM:SS"
- Timer counts up toward midnight
- Reaching midnight = victory (if still alive)

### Alien Abduction System

**Triggered when**: Player loses a life (wrong answer)

**Sequence:**
1. Alien appears at top of screen (300x300px sprite)
2. Floats with gentle wave motion
3. Blinks periodically (2-5 second intervals)
4. Beam animation appears below alien
5. Character is "abducted" (pulled up by beam)
6. Alien and character fly off screen to the right
7. **"BENEVOLENCE" message** appears briefly
8. Alien returns from right, drops character
9. Gameplay resumes

**Alien States:**
- Idle floating (wave motion)
- Abducting (beam active, character pulled up)
- Flying away (with character)
- Returning (flying back)
- Dropping character

### Visual Effects

**Parallax Scrolling (5 layers):**
1. Sky (static)
2. City far (0.3x speed)
3. City semi-far (0.5x speed)
4. City semi-close (0.8x speed)
5. City close (1.0x speed)
6. Street lamps (1.0x speed, spawn every 500px)

**Lamp Lights:**
- Glow effect below each lamp
- Scrolls with lamp

**Screen Shake:**
- Triggers on wrong answer
- Brief shake effect
- Returns to normal

**Cool Mode Visual:**
- Purple tint on character sprites
- Applied during 2-second cool mode window

### Audio System

**Music Tracks:**
1. **Menu/Story**: Alex Bouncy Mix (looped, 50% volume)
2. **Early Gameplay**: Tedox (plays once, 50% volume)
3. **Extended Gameplay**: Neon Owl (loops, 50% volume)
   - Auto-starts when Tedox ends
4. **Game Over**: Game Over II (plays once, 50% volume)

**Music Transitions:**
- Start → Story: Continue menu music
- Story → Playing: Switch to Tedox
- Tedox ends → Neon Owl (seamless)
- Playing → Game Over: Switch to game over music
- Any state → Start: Switch to menu music

**Mute Toggle:**
- Available on all screens
- Mutes/unmutes all audio
- State persists across game states

### HUD Display (During Gameplay)

**Top bar shows:**
- Score (left)
- Lives (middle, as count)
- Timer (right)

**Question Overlay:**
- Appears when obstacle enters collision zone
- Semi-transparent background
- Perseus widget rendered (numeric-input or radio)
- Submit button
- Feedback message on answer

### Input Handling

**Mouse:**
- Click buttons (start, next, play again, mute)
- Click to answer questions (radio choices)

**Keyboard:**
- Type numeric answers
- Enter to submit

**Perseus Widget:**
- Integrated via ServerItemRenderer
- Full Perseus scoring system
- Supports numeric-input and radio widgets

## Edge Cases & Special Behaviors

### Multiple Obstacles

- Only one obstacle on screen at a time in current implementation
- Spawn interval ensures spacing

### Obstacle Miss

- If player doesn't answer before obstacle passes, nothing happens
- No penalty for missed questions
- Next obstacle will spawn on schedule

### Jump Mechanic (Final Question Only)

- Final obstacle can be jumped over
- Jump triggers car racing animation
- Leads to bonus scene

### Music Overlap Prevention

- Stopping one track before starting another
- Handles browser autoplay restrictions gracefully

### Screen Shake Timing

- Shake effect is brief (< 500ms)
- Doesn't affect gameplay
- Visual feedback only

### Benevolence Message

- Shows briefly after alien abduction
- Humorous element
- Doesn't affect gameplay

### Game Loop Performance

- Runs at 60fps (requestAnimationFrame)
- State updates throttled (React setState)
- Dual state/ref pattern for real-time values

## Known Issues/Quirks

1. **Dual State Pattern**: Some values stored in both state and refs for performance
2. **Complex Dependencies**: Large useEffect dependency arrays
3. **Tight Coupling**: Game logic mixed with rendering
4. **State Management**: 30+ state variables
5. **No Pause**: Game can't be paused once started
6. **No Save**: No progress saving between sessions
7. **Fixed Difficulty**: No difficulty settings
8. **One Life Type**: No way to earn extra lives

## UI/UX Details

### Button Styles

- Hover effects on clickable images
- Cursor changes to pointer
- No disabled states

### Question Display

- Question appears in overlay
- Semi-transparent dark background
- White text
- Clear submit button

### Feedback Messages

- Correct: Green text, positive message
- Incorrect: Red text, negative message
- Brief display duration

### Score Display

- Large, readable font
- Updates immediately on correct answer

### Lives Display

- Numeric count
- Updates immediately on loss

### Timer Display

- Always visible during gameplay
- Countdown format to midnight
- Updates in real-time

## Assets Used

**Character Sprites:**
- run1-6.png (6 running frames, 128x128)
- impact.png (impact effect, 128x128)

**Obstacles:**
- car1.png, car2.png (car obstacles, 256x256)

**Aliens:**
- alien1-3.png (3 alien frames, 300x300)
- beam.png (abduction beam)

**Backgrounds:**
- sky.png (800x600)
- city-far.png, city-semi-far.png, city-semi-close.png, city-close.png
- streetlamp.png, lamplight.png

**UI:**
- title.png, start.png, next.png
- victory.png, lose.png
- mute.png, unmute.png
- story1-7.png (7 story pages)

**Audio:**
- alexbouncymix2.ogg (menu music)
- Zodik-Tedox.ogg (gameplay music)
- Zodik-NeonOwl.ogg (extended gameplay music)
- GameOverII.ogg (game over music)

---

**This document captures the current behavior for verification after refactoring.**
