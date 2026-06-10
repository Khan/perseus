# Phase 2: Build Game Engine

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Extract all game logic into the CrashCourseEngine class with supporting systems, including a complete sprite animation system for managing multiple animated entities.

**Estimated Effort**: 5-7 hours (most complex phase)

## Overview

This is the core refactoring work. We're moving all game loop logic, physics, collision detection, and canvas rendering from the React component into a pure TypeScript game engine. The engine will run independently at 60fps and communicate with React via callbacks.

**Key Innovation**: Multi-entity sprite animation system built from the start, preventing future refactoring.

## Tasks

### Task 1: Create Engine Core Structure
- **What**: Set up the basic CrashCourseEngine class with game loop
- **Why**: Foundation for all game logic
- **Implementation notes**:
  - Create engine class with constructor, start(), stop(), pause()
  - Implement requestAnimationFrame loop
  - Track deltaTime between frames
  - Set up canvas context
  - Add callback for UI state updates (throttled to 10-15fps)
- **Files affected**:
  - New: `games/crash-course/engine/CrashCourseEngine.ts`
  - New: `games/crash-course/engine/types.ts`
- **Acceptance criteria**:
  - Engine can start/stop
  - Game loop runs at 60fps
  - Can pass canvas reference
  - Callback mechanism works

**Example structure:**
```typescript
// games/crash-course/engine/CrashCourseEngine.ts

type GameState = "start" | "story" | "playing" | "carBonus" | "gameover" | "victory";

type GameUIState = {
    gameState: GameState;
    storyPage: number;
    score: number;
    lives: number;
    gameTime: string;
    currentQuestion: PerseusItem | null;
};

export class CrashCourseEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private rafId: number | null = null;
    private lastTime: number = 0;
    private isRunning: boolean = false;

    private gameState: GameState = "start";
    private uiUpdateCallback: ((state: GameUIState) => void) | null = null;
    private frameCount: number = 0;

    constructor(canvas: HTMLCanvasElement, onUIUpdate: (state: GameUIState) => void) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.uiUpdateCallback = onUIUpdate;
    }

    start(): void {
        this.isRunning = true;
        this.lastTime = performance.now();
        this.loop(this.lastTime);
    }

    stop(): void {
        this.isRunning = false;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    pause(): void {
        this.isRunning = false;
    }

    resume(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.loop(this.lastTime);
        }
    }

    private loop = (currentTime: number): void => {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update game logic
        this.update(deltaTime);

        // Render game
        this.render();

        // Notify React of UI state changes (throttled to 10fps)
        this.frameCount++;
        if (this.frameCount % 6 === 0) {
            this.notifyUIUpdate();
        }

        // Continue loop
        this.rafId = requestAnimationFrame(this.loop);
    };

    private update(deltaTime: number): void {
        // Game logic goes here
        // Will be filled in subsequent tasks
    }

    private render(): void {
        // Canvas rendering goes here
        // Will be filled in subsequent tasks
    }

    private notifyUIUpdate(): void {
        if (this.uiUpdateCallback) {
            this.uiUpdateCallback(this.getUIState());
        }
    }

    private getUIState(): GameUIState {
        return {
            gameState: this.gameState,
            storyPage: this.storyPage,
            score: this.score,
            lives: this.lives,
            gameTime: this.formatGameTime(),
            currentQuestion: this.getCurrentQuestion(),
        };
    }

    // Public API for React to call
    getCurrentState(): GameState {
        return this.gameState;
    }

    startStory(): void {
        this.gameState = "story";
        this.storyPage = 1;
    }

    nextStoryPage(): void {
        if (this.storyPage < 7) {
            this.storyPage++;
        } else {
            this.startPlaying();
        }
    }

    startPlaying(): void {
        this.gameState = "playing";
        this.gameStartTime = Date.now();
        // Initialize game state
    }
}
```

---

### Task 2: Build SpriteAnimator System
- **What**: Create low-level animation controller for frame sequencing
- **Why**: Foundation for all sprite animation, reusable across games
- **Implementation notes**:
  - Support individual frame images
  - Support spritesheets (grid of frames)
  - Named animation sequences
  - FPS control, looping, callbacks
  - Visual effects (tint, flip, alpha)
  - Frame timing with deltaTime
- **Files affected**:
  - New: `games/crash-course/engine/systems/SpriteAnimator.ts`
- **Acceptance criteria**:
  - Can load individual frames or spritesheet
  - Can define named animations
  - Play/stop/pause animations
  - Update with deltaTime
  - Returns current frame image
  - Effects work (tint, flip)

**See full implementation in previous message - the complete SpriteAnimator class**

---

### Task 3: Build AnimatedSprite Class
- **What**: High-level sprite entity combining position, size, and animation
- **Why**: Makes working with sprites easier, handles position + drawing
- **Implementation notes**:
  - Wraps SpriteAnimator
  - Tracks x, y, width, height
  - Has layer property for z-ordering
  - Convenience methods (play, update, draw)
  - Returns bounding box for collision
- **Files affected**:
  - New: `games/crash-course/engine/systems/AnimatedSprite.ts`
- **Acceptance criteria**:
  - Combines animator with position
  - Can update and draw itself
  - Layer system works
  - Bounding box for collision

**See full implementation in previous message - the complete AnimatedSprite class**

---

### Task 4: Build SpriteManager System
- **What**: Manages all animated sprites in the game with batch operations
- **Why**: Central registry for all sprites, batch update/draw, layer management
- **Implementation notes**:
  - Create sprites with config
  - Register sprites by ID
  - Get sprites by ID or layer
  - Batch update all sprites
  - Batch draw with layer ordering
  - Dynamic sprite creation/removal (for obstacles)
- **Files affected**:
  - New: `games/crash-course/engine/systems/SpriteManager.ts`
- **Acceptance criteria**:
  - Can create sprites from config
  - Can retrieve sprites by ID
  - updateAll() updates all sprites
  - drawByLayers() draws in order
  - Can add/remove sprites dynamically
  - Layer system works

**See full implementation in previous message - the complete SpriteManager class**

---

### Task 5: Build RenderSystem
- **What**: Canvas drawing utilities and helpers
- **Why**: Reusable drawing operations, separate from game logic
- **Implementation notes**:
  - Basic drawing primitives (rectangle, circle, text)
  - Parallax background helpers
  - Text rendering with styles
  - Utility functions for common operations
- **Files affected**:
  - New: `games/crash-course/engine/systems/RenderSystem.ts`
- **Acceptance criteria**:
  - Helper functions for drawing
  - Clean API
  - Reusable across games

**Example:**
```typescript
// games/crash-course/engine/systems/RenderSystem.ts

export class RenderSystem {
    constructor(private ctx: CanvasRenderingContext2D) {}

    clear(): void {
        const canvas = this.ctx.canvas;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawText(
        text: string,
        x: number,
        y: number,
        style: {
            font?: string;
            color?: string;
            align?: CanvasTextAlign;
            baseline?: CanvasTextBaseline;
        } = {}
    ): void {
        this.ctx.save();

        if (style.font) this.ctx.font = style.font;
        if (style.color) this.ctx.fillStyle = style.color;
        if (style.align) this.ctx.textAlign = style.align;
        if (style.baseline) this.ctx.textBaseline = style.baseline;

        this.ctx.fillText(text, x, y);

        this.ctx.restore();
    }

    drawParallaxLayer(
        image: HTMLImageElement,
        offset: number,
        y: number,
        height: number
    ): void {
        const canvas = this.ctx.canvas;
        const width = canvas.width;

        // Draw two copies for seamless looping
        this.ctx.drawImage(image, -offset, y, width, height);
        this.ctx.drawImage(image, width - offset, y, width, height);
    }
}
```

---

### Task 6: Build AudioSystem
- **What**: Audio management with multiple tracks and volume control
- **Why**: Reusable audio handling, clean API
- **Implementation notes**:
  - Load and manage multiple audio tracks
  - Play/stop/pause functionality
  - Volume control and muting
  - Fade in/out
  - Track transitions (tedox → neon owl)
- **Files affected**:
  - New: `games/crash-course/engine/systems/AudioSystem.ts`
- **Acceptance criteria**:
  - Can load multiple tracks
  - Play/stop/pause works
  - Volume and mute work
  - Fade transitions work
  - Handles autoplay restrictions

**Example:**
```typescript
// games/crash-course/engine/systems/AudioSystem.ts

export class AudioSystem {
    private tracks = new Map<string, HTMLAudioElement>();
    private currentTrack: string | null = null;
    private isMuted: boolean = false;
    private volume: number = 0.5;

    async loadTrack(name: string, url: string, loop: boolean = false): Promise<void> {
        const audio = new Audio(url);
        audio.loop = loop;
        audio.volume = this.volume;
        this.tracks.set(name, audio);
    }

    play(trackName: string): void {
        const track = this.tracks.get(trackName);
        if (!track) {
            console.warn(`Track "${trackName}" not found`);
            return;
        }

        // Stop current track if different
        if (this.currentTrack && this.currentTrack !== trackName) {
            this.stop(this.currentTrack);
        }

        this.currentTrack = trackName;

        if (!this.isMuted) {
            track.currentTime = 0;
            track.play().catch((error) => {
                console.log(`Audio play failed: ${error}`);
            });
        }
    }

    stop(trackName: string): void {
        const track = this.tracks.get(trackName);
        if (track) {
            track.pause();
            track.currentTime = 0;
        }
    }

    stopAll(): void {
        for (const track of this.tracks.values()) {
            track.pause();
            track.currentTime = 0;
        }
        this.currentTrack = null;
    }

    setVolume(volume: number): void {
        this.volume = Math.max(0, Math.min(1, volume));
        for (const track of this.tracks.values()) {
            track.volume = this.volume;
        }
    }

    mute(): void {
        this.isMuted = true;
        for (const track of this.tracks.values()) {
            track.pause();
        }
    }

    unmute(): void {
        this.isMuted = false;
        if (this.currentTrack) {
            this.play(this.currentTrack);
        }
    }

    fadeOut(trackName: string, duration: number): void {
        const track = this.tracks.get(trackName);
        if (!track) return;

        const startVolume = track.volume;
        const startTime = Date.now();

        const fade = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            track.volume = startVolume * (1 - progress);

            if (progress < 1) {
                requestAnimationFrame(fade);
            } else {
                this.stop(trackName);
                track.volume = startVolume; // Reset volume
            }
        };

        fade();
    }
}
```

---

### Task 7: Build AssetLoader System
- **What**: Load and manage all game assets (images, audio)
- **Why**: Centralized asset loading with progress tracking and error handling
- **Implementation notes**:
  - Load images with progress tracking
  - Load audio files
  - Error handling and retries
  - Progress callbacks for loading screen
  - Return loaded assets as Map
- **Files affected**:
  - New: `games/crash-course/engine/systems/AssetLoader.ts`
- **Acceptance criteria**:
  - Can load multiple images
  - Can load multiple audio files
  - Progress tracking works
  - Error handling works
  - Returns organized assets

**Example:**
```typescript
// games/crash-course/engine/systems/AssetLoader.ts

type AssetManifest = {
    images: {[key: string]: string};
    audio: {[key: string]: string};
};

export class AssetLoader {
    private images = new Map<string, HTMLImageElement>();
    private audio = new Map<string, HTMLAudioElement>();

    async loadAll(
        manifest: AssetManifest,
        onProgress?: (progress: number) => void
    ): Promise<void> {
        const imageEntries = Object.entries(manifest.images);
        const audioEntries = Object.entries(manifest.audio);
        const total = imageEntries.length + audioEntries.length;
        let loaded = 0;

        const updateProgress = () => {
            loaded++;
            if (onProgress) {
                onProgress(loaded / total);
            }
        };

        // Load images
        const imagePromises = imageEntries.map(([key, url]) =>
            this.loadImage(url).then((img) => {
                this.images.set(key, img);
                updateProgress();
            })
        );

        // Load audio
        const audioPromises = audioEntries.map(([key, url]) =>
            this.loadAudio(url).then((audio) => {
                this.audio.set(key, audio);
                updateProgress();
            })
        );

        await Promise.all([...imagePromises, ...audioPromises]);
    }

    getImage(key: string): HTMLImageElement | undefined {
        return this.images.get(key);
    }

    getAudio(key: string): HTMLAudioElement | undefined {
        return this.audio.get(key);
    }

    private loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
            img.src = url;
        });
    }

    private loadAudio(url: string): Promise<HTMLAudioElement> {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => resolve(audio);
            audio.onerror = () => reject(new Error(`Failed to load audio: ${url}`));
            audio.src = url;
        });
    }
}
```

---

### Task 8: Implement Perseus Integration Interface
- **What**: Define and implement the Perseus question integration interface
- **Why**: Standard pattern for educational games, reusable across games
- **Implementation notes**:
  - Create PerseusGameEngine interface
  - Implement in CrashCourseEngine
  - getCurrentQuestion() for React to render
  - submitAnswer() for React to call with result
  - onQuestionChange callback for updates
- **Files affected**:
  - New: `games/shared/perseus/PerseusGameEngine.ts` (create shared directory!)
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - Interface defined and documented
  - CrashCourseEngine implements interface
  - React can get current question
  - React can submit answers
  - Callback system works

**Example:**
```typescript
// games/shared/perseus/PerseusGameEngine.ts

import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Interface that all educational games must implement for Perseus integration.
 *
 * Provides a consistent way for games to integrate Perseus questions,
 * regardless of game mechanics.
 */
export interface PerseusGameEngine {
    /**
     * Get the current question to display to the player.
     * Returns null if no question is active.
     */
    getCurrentQuestion(): PerseusItem | null;

    /**
     * Called when the player submits an answer.
     *
     * @param correct - Whether the answer was correct
     * @param earnedPoints - Points earned (from Perseus scoring)
     */
    submitAnswer(correct: boolean, earnedPoints: number): void;

    /**
     * Register callback for question state changes.
     * Allows React to re-render when questions change.
     */
    onQuestionChange(callback: (question: PerseusItem | null) => void): void;
}

// CrashCourseEngine implements this
export class CrashCourseEngine implements PerseusGameEngine {
    private currentObstacle: Obstacle | null = null;
    private questionCallback: ((q: PerseusItem | null) => void) | null = null;

    getCurrentQuestion(): PerseusItem | null {
        return this.currentObstacle?.question ?? null;
    }

    submitAnswer(correct: boolean, earnedPoints: number): void {
        if (!this.currentObstacle) return;

        this.currentObstacle.answered = true;
        this.currentObstacle.correct = correct;

        if (correct) {
            this.score += earnedPoints;
            this.enterCoolMode();
            this.currentObstacle.jumped = true; // Trigger jump
        }

        this.currentObstacle = null;
        this.questionCallback?.(null);
    }

    onQuestionChange(callback: (q: PerseusItem | null) => void): void {
        this.questionCallback = callback;
    }
}
```

---

### Task 9: Move Game State Machine to Engine
- **What**: Implement game state management in engine
- **Why**: Engine controls flow, React just displays current state
- **Implementation notes**:
  - State: start, story, playing, carBonus, gameover, victory
  - Story page tracking (1-7)
  - Timer for victory condition (5 minutes)
  - Public methods for state transitions
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - State machine works correctly
  - Story pages advance
  - Timer triggers victory
  - React can query current state

---

### Task 10: Move Physics and Collision to Engine
- **What**: Implement jump physics, obstacle movement, collision detection
- **Why**: Core game mechanics, needs to run at 60fps
- **Implementation notes**:
  - Jump physics (parabolic arc)
  - Obstacle movement (scrolling + racing away)
  - Collision detection (rectangle collision)
  - Life system
  - Alien abduction rescue mechanic
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
  - New: `games/crash-course/engine/utils/physics.ts`
  - New: `games/crash-course/engine/utils/collision.ts`
- **Acceptance criteria**:
  - Jump feels right (same as original)
  - Obstacles move correctly
  - Collision detection works
  - Life loss works
  - Alien rescue works

**Example physics utilities:**
```typescript
// games/crash-course/engine/utils/physics.ts

export function calculateJumpY(
    startTime: number,
    currentTime: number,
    groundY: number,
    jumpHeight: number,
    jumpDuration: number
): {y: number; isComplete: boolean} {
    const elapsed = currentTime - startTime;

    if (elapsed >= jumpDuration) {
        return {y: groundY, isComplete: true};
    }

    const progress = elapsed / jumpDuration;
    const height = Math.sin(progress * Math.PI) * jumpHeight;

    return {y: groundY - height, isComplete: false};
}

// games/crash-course/engine/utils/collision.ts

export function checkRectCollision(
    x1: number, y1: number, w1: number, h1: number,
    x2: number, y2: number, w2: number, h2: number
): boolean {
    return x1 < x2 + w2 && x1 + w1 > x2 &&
           y1 < y2 + h2 && y1 + h1 > y2;
}
```

---

### Task 11: Migrate Character to Sprite System
- **What**: Create character sprite using SpriteManager
- **Why**: Test sprite system, clean up character rendering
- **Implementation notes**:
  - Load character frames
  - Define run, impact animations
  - Cool mode uses tint effect
  - Update position from physics
  - Remove old character rendering code
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - Character renders via sprite system
  - Animations work (run, impact, cool mode)
  - Cool mode tint works
  - Position updates correctly

---

### Task 12: Migrate Alien to Sprite System
- **What**: Create alien sprite with blinking animation
- **Why**: Test sprite system with callbacks
- **Implementation notes**:
  - Load alien frames (3 frames)
  - Define idle, blink animations
  - Blink triggers periodically
  - Floating motion updates position
  - Abduction mode changes position
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - Alien renders via sprite system
  - Blinking works
  - Floating motion works
  - Abduction positioning works

---

### Task 13: Migrate Obstacles to Sprite System
- **What**: Create car sprites dynamically as obstacles spawn
- **Why**: Test dynamic sprite creation/removal
- **Implementation notes**:
  - When obstacle spawns, create sprite
  - When obstacle leaves screen, remove sprite
  - Car animation plays
  - Collision uses sprite bounds
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - Cars render via sprite system
  - Sprites created/destroyed correctly
  - Collision works with sprites
  - No memory leaks (sprites properly removed)

---

### Task 14: Move Parallax Background to Engine
- **What**: Implement parallax scrolling background
- **Why**: Visual effect, part of game rendering
- **Implementation notes**:
  - 5 layers (sky, cityFar, citySemiFar, citySemiClose, cityClose)
  - Different scroll speeds
  - Seamless looping
  - Use RenderSystem helpers
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - Parallax scrolling works
  - Seamless looping
  - Performance good (60fps)

---

### Task 15: Move Obstacle Spawning to Engine
- **What**: Spawn obstacles at intervals with Perseus questions
- **Why**: Core game mechanic
- **Implementation notes**:
  - Spawn every 5 seconds
  - Create Perseus question (from crash-course-utils)
  - Create car sprite
  - Track obstacles array
  - Set as current question when close
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
  - Keep: `games/crash-course/crash-course-utils.ts` (question generation)
- **Acceptance criteria**:
  - Obstacles spawn correctly
  - Perseus questions attached
  - Current question updates
  - React receives question updates

---

### Task 16: Integrate Audio with Game States
- **What**: Wire up AudioSystem to play correct music per game state
- **Why**: Audio is part of game experience
- **Implementation notes**:
  - Menu music on start screen
  - Game music during story/playing
  - Tedox → Neon Owl transition
  - Game over music
  - Mute functionality
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - Correct music plays per state
  - Transitions work
  - Mute works
  - No audio errors

---

### Task 17: Implement Timer and Victory Condition
- **What**: Track game time and trigger victory at 5 minutes
- **Why**: Win condition for the game
- **Implementation notes**:
  - Track elapsed time from game start
  - Format as game time (11:55:00 → 00:00:00)
  - Trigger victory at 5 minutes
  - Update UI state with formatted time
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - Timer counts up correctly
  - Time displays correctly
  - Victory triggers at 5 minutes
  - React receives time updates

---

### Task 18: Test Engine Independently
- **What**: Write unit tests for engine logic
- **Why**: Verify engine works without React
- **Implementation notes**:
  - Test obstacle spawning
  - Test collision detection
  - Test state transitions
  - Test Perseus integration
  - Test physics calculations
  - Mock canvas context
- **Files affected**:
  - New: `games/crash-course/engine/CrashCourseEngine.test.ts`
- **Acceptance criteria**:
  - Engine can run headless
  - Unit tests pass
  - Core mechanics tested
  - No React dependencies in tests

**Example test:**
```typescript
describe("CrashCourseEngine", () => {
    let mockCanvas: HTMLCanvasElement;
    let engine: CrashCourseEngine;
    let uiUpdates: GameUIState[] = [];

    beforeEach(() => {
        mockCanvas = document.createElement('canvas');
        engine = new CrashCourseEngine(mockCanvas, (state) => {
            uiUpdates.push(state);
        });
    });

    it("starts in 'start' state", () => {
        expect(engine.getCurrentState()).toBe("start");
    });

    it("transitions through story pages", () => {
        engine.startStory();
        expect(engine.getCurrentState()).toBe("story");

        for (let i = 0; i < 7; i++) {
            engine.nextStoryPage();
        }

        expect(engine.getCurrentState()).toBe("playing");
    });

    it("spawns obstacles with Perseus questions", () => {
        engine.startPlaying();

        // Simulate 5 seconds
        jest.advanceTimersByTime(5000);

        const question = engine.getCurrentQuestion();
        expect(question).not.toBeNull();
        expect(question).toHaveProperty('question');
    });

    it("handles correct answer", () => {
        engine.startPlaying();
        jest.advanceTimersByTime(5000);

        const initialScore = engine.getScore();
        engine.submitAnswer(true, 10);

        expect(engine.getScore()).toBe(initialScore + 10);
    });
});
```

---

### Task 19: Create Engine Constants File
- **What**: Extract all magic numbers to constants
- **Why**: Centralized configuration, easier to tune
- **Implementation notes**:
  - Canvas dimensions
  - Physics constants (gravity, jump height, speed)
  - Game config (duration, spawn interval)
  - Sprite sizes
- **Files affected**:
  - New: `games/crash-course/engine/constants.ts`
- **Acceptance criteria**:
  - All magic numbers extracted
  - Well-organized by category
  - Documented with comments

**Example:**
```typescript
// games/crash-course/engine/constants.ts

export const CANVAS = {
    WIDTH: 800,
    HEIGHT: 600,
} as const;

export const PHYSICS = {
    GROUND_Y: 450,
    SCROLL_SPEED: 2,
    JUMP_HEIGHT: 140,
    JUMP_DURATION: 1000, // milliseconds
    GRAVITY: 0.5,
} as const;

export const GAME_CONFIG = {
    DURATION: 300000, // 5 minutes
    OBSTACLE_SPAWN_INTERVAL: 5000, // 5 seconds
    COOL_MODE_DURATION: 2000, // 2 seconds
    LAMP_SPACING: 500, // pixels
} as const;

export const SPRITE_SIZES = {
    CHARACTER: 128,
    ALIEN: 96,
    CAR: 154,
} as const;

export const CHARACTER = {
    X: 100,
    WIDTH: SPRITE_SIZES.CHARACTER,
    HEIGHT: SPRITE_SIZES.CHARACTER,
    COLLISION_ZONE_X: 120,
} as const;
```

---

### Task 20: Document Engine API
- **What**: Add JSDoc comments to public engine methods
- **Why**: Clear API for React component to use
- **Implementation notes**:
  - Document constructor
  - Document public methods (start, stop, startStory, etc.)
  - Document callbacks
  - Add usage examples
- **Files affected**:
  - Modified: `games/crash-course/engine/CrashCourseEngine.ts`
- **Acceptance criteria**:
  - All public methods documented
  - Examples included
  - Clear parameter descriptions

---

## Directory Structure After This Phase

```
games/crash-course/
├── engine/
│   ├── CrashCourseEngine.ts          (Main engine class)
│   ├── CrashCourseEngine.test.ts     (Engine tests)
│   ├── types.ts                      (Engine-specific types)
│   ├── constants.ts                  (Game constants)
│   ├── systems/
│   │   ├── SpriteAnimator.ts         (Animation controller)
│   │   ├── AnimatedSprite.ts         (Sprite entity)
│   │   ├── SpriteManager.ts          (Multi-sprite management)
│   │   ├── RenderSystem.ts           (Canvas utilities)
│   │   ├── AudioSystem.ts            (Audio management)
│   │   └── AssetLoader.ts            (Asset loading)
│   └── utils/
│       ├── physics.ts                (Physics calculations)
│       └── collision.ts              (Collision detection)
├── assets/                           (From Phase 1)
│   ├── sprites/
│   ├── backgrounds/
│   ├── ui/
│   ├── audio/
│   └── story/
├── crash-course-utils.ts             (Question generation - keep as is)
└── crash-course.stories.tsx          (Will update in Phase 3)

games/shared/                         (NEW - shared across games)
└── perseus/
    └── PerseusGameEngine.ts          (Interface for Perseus integration)
```

---

## Testing Considerations

After this phase:
1. **Engine Tests**: Unit tests pass, engine runs headless
2. **Performance**: Measure FPS (should be 60fps stable)
3. **Memory**: Check for leaks (sprites properly cleaned up)
4. **Sprite System**: All entities render correctly
5. **Perseus Integration**: Questions appear and can be answered

### How to Test Without React:

```typescript
// Test engine in isolation
const canvas = document.createElement('canvas');
const engine = new CrashCourseEngine(canvas, (state) => {
    console.log("UI State:", state);
});

await engine.init();
engine.start();

// Engine runs independently!
// Should see console logs of UI state updates
```

---

## Benefits After This Phase

- ✅ **Game logic separate from React** - Clean architecture
- ✅ **60fps game loop** - Not affected by React rendering
- ✅ **Multi-entity sprite system** - Supports any number of animated sprites
- ✅ **Testable** - Can unit test engine without React
- ✅ **Reusable systems** - Sprite, audio, render systems ready to extract
- ✅ **Perseus integration** - Standard interface for educational games
- ✅ **Clear API** - React knows exactly how to communicate with engine

---

## Next Phase

**Phase 3**: Create thin React wrapper and UI components that connect to the engine via callbacks.

The hard work is done - React becomes simple after this! 🚀
