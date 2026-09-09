# Phase 1: Setup, Assets & Engine Architecture

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Create directory structure, organize assets, and design the game engine API.

**Estimated Effort**: 2-3 hours

## Overview

This phase establishes the foundation for the refactoring. We'll create the new folder structure, move and organize all 40+ asset files, and design the interfaces between the game engine and React components. No behavior changes yet - just organization and architecture design.

**Important**: By the end of this phase, the original game should still work in its current location while we set up the new structure.

## Tasks

### Task 1: Create Directory Structure
- **What**: Set up the new `games/crash-course/` folder hierarchy
- **Why**: Establishes the foundation for all subsequent work
- **Implementation notes**:
  - Create base directory at `packages/perseus/src/games/crash-course/`
  - Create asset subdirectories for organization
  - Create engine directory structure
  - Create placeholder README files
- **Files affected**:
  - New: `packages/perseus/src/games/` (directory)
  - New: `packages/perseus/src/games/crash-course/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/sprites/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/backgrounds/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/ui/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/audio/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/story/` (directory)
  - New: `packages/perseus/src/games/crash-course/engine/` (directory)
  - New: `packages/perseus/src/games/crash-course/engine/systems/` (directory)
  - New: `packages/perseus/src/games/crash-course/engine/utils/` (directory)
  - New: `packages/perseus/src/games/crash-course/components/` (directory)
- **Acceptance criteria**:
  - All directories exist
  - Structure follows Perseus conventions
  - Can import from these directories

**Directory structure:**
```
packages/perseus/src/games/crash-course/
├── assets/
│   ├── sprites/
│   ├── backgrounds/
│   ├── ui/
│   ├── audio/
│   └── story/
├── engine/
│   ├── systems/
│   └── utils/
├── components/
└── README.md (placeholder)
```

---

### Task 2: Create Shared Perseus Directory
- **What**: Set up shared directory for Perseus game interfaces
- **Why**: Standard integration pattern for all educational games
- **Implementation notes**:
  - Create `games/shared/` directory
  - Create `games/shared/perseus/` subdirectory
  - This will hold the PerseusGameEngine interface
- **Files affected**:
  - New: `packages/perseus/src/games/shared/` (directory)
  - New: `packages/perseus/src/games/shared/perseus/` (directory)
- **Acceptance criteria**:
  - Shared directory exists
  - Can import from games/shared

---

### Task 3: Move Sprite Assets
- **What**: Move character, alien, and car sprites to the sprites folder
- **Why**: Groups related visual assets together
- **Implementation notes**:
  - Move character animation frames (run1-6, impact, idle)
  - Move alien sprites (alien1-3)
  - Move car sprites (car1-2)
  - Move special effects (beam)
  - Use `git mv` to preserve history
- **Files affected**:
  - Move from: `packages/perseus/src/__docs__/*.png`
  - Move to: `packages/perseus/src/games/crash-course/assets/sprites/`
  - Specific files:
    - `run1.png` → `sprites/run1.png`
    - `run2.png` → `sprites/run2.png`
    - `run3.png` → `sprites/run3.png`
    - `run4.png` → `sprites/run4.png`
    - `run5.png` → `sprites/run5.png`
    - `run6.png` → `sprites/run6.png`
    - `impact.png` → `sprites/impact.png`
    - `idle.png` → `sprites/idle.png`
    - `alien1.png` → `sprites/alien1.png`
    - `alien2.png` → `sprites/alien2.png`
    - `alien3.png` → `sprites/alien3.png`
    - `car1.png` → `sprites/car1.png`
    - `car2.png` → `sprites/car2.png`
    - `beam.png` → `sprites/beam.png`
- **Acceptance criteria**:
  - All sprite files moved to correct directory
  - Git history preserved
  - No duplicate files remain

---

### Task 4: Move Background Assets
- **What**: Move parallax layers and environment graphics
- **Why**: Separates background elements from interactive sprites
- **Implementation notes**:
  - Move sky, city layers, and ground elements
  - Move street lamp and lamp light
  - Use `git mv` to preserve history
- **Files affected**:
  - Move from: `packages/perseus/src/__docs__/*.png`
  - Move to: `packages/perseus/src/games/crash-course/assets/backgrounds/`
  - Specific files:
    - `sky.png` → `backgrounds/sky.png`
    - `city-far.png` → `backgrounds/city-far.png`
    - `city-semi-far.png` → `backgrounds/city-semi-far.png`
    - `city-semi-close.png` → `backgrounds/city-semi-close.png`
    - `city-close.png` → `backgrounds/city-close.png`
    - `streetlamp.png` → `backgrounds/streetlamp.png`
    - `lamplight.png` → `backgrounds/lamplight.png`
- **Acceptance criteria**:
  - All background files moved
  - Git history preserved

---

### Task 5: Move UI Assets
- **What**: Move buttons, screens, and UI elements
- **Why**: Keeps user interface assets separate from game graphics
- **Implementation notes**:
  - Move all button images (start, next, mute, unmute)
  - Move screen images (title, victory, lose)
  - Move bonus scene images
  - Use `git mv` to preserve history
- **Files affected**:
  - Move from: `packages/perseus/src/__docs__/*.png`
  - Move to: `packages/perseus/src/games/crash-course/assets/ui/`
  - Specific files:
    - `title.png` → `ui/title.png`
    - `start.png` → `ui/start.png`
    - `next.png` → `ui/next.png`
    - `mute.png` → `ui/mute.png`
    - `unmute.png` → `ui/unmute.png`
    - `victory.png` → `ui/victory.png`
    - `lose.png` → `ui/lose.png`
    - `bonus1.png` → `ui/bonus1.png`
    - `bonus2.png` → `ui/bonus2.png`
    - `skid.png` → `ui/skid.png`
- **Acceptance criteria**:
  - All UI assets moved
  - Easy to find buttons vs screens

---

### Task 6: Move Story Assets
- **What**: Move all 7 story page images
- **Why**: Keeps narrative content separate and organized
- **Implementation notes**:
  - Move story1 through story7 images
  - Keep sequential naming
  - Use `git mv` to preserve history
- **Files affected**:
  - Move from: `packages/perseus/src/__docs__/story*.png`
  - Move to: `packages/perseus/src/games/crash-course/assets/story/`
  - Specific files:
    - `story1.png` → `story/story1.png`
    - `story2.png` → `story/story2.png`
    - `story3.png` → `story/story3.png`
    - `story4.png` → `story/story4.png`
    - `story5.png` → `story/story5.png`
    - `story6.png` → `story/story6.png`
    - `story7.png` → `story/story7.png`
- **Acceptance criteria**:
  - All story images in story/ folder
  - Sequential numbering preserved

---

### Task 7: Move Audio Assets
- **What**: Move all audio files (.ogg)
- **Why**: Separates audio from visual assets
- **Implementation notes**:
  - Move all 4 audio files
  - Consider renaming for clarity
  - Use `git mv` to preserve history
- **Files affected**:
  - Move from: `packages/perseus/src/__docs__/*.ogg`
  - Move to: `packages/perseus/src/games/crash-course/assets/audio/`
  - Specific files:
    - `alexbouncymix2.ogg` → `audio/menu-theme.ogg`
    - `Zodik - Tedox.ogg` → `audio/game-theme-1.ogg`
    - `Zodik - Neon Owl.ogg` → `audio/game-theme-2.ogg`
    - `Game Over II.ogg` → `audio/game-over-theme.ogg`
- **Acceptance criteria**:
  - All audio files moved
  - Names are clear and descriptive

---

### Task 8: Design Engine API and Types
- **What**: Define the interfaces between engine and React
- **Why**: Clear contract before implementation, guides Phase 2
- **Implementation notes**:
  - Create type definitions for engine
  - Define GameUIState (what React needs to know)
  - Define engine public methods
  - Design Perseus integration interface
  - Document with JSDoc comments
- **Files affected**:
  - New: `games/crash-course/engine/types.ts`
  - New: `games/shared/perseus/PerseusGameEngine.ts`
- **Acceptance criteria**:
  - Types defined and documented
  - Clear API contract
  - Perseus interface defined
  - Ready for Phase 2 implementation

**Example types file:**
```typescript
// games/crash-course/engine/types.ts

import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Game state values
 */
export type GameState =
    | "start"      // Title screen
    | "story"      // Story sequence (7 pages)
    | "playing"    // Active gameplay
    | "carBonus"   // Car bonus scene
    | "gameover"   // Lost all lives
    | "victory";   // Survived 5 minutes

/**
 * Character animation states
 */
export type CharacterState =
    | "running"    // Normal running
    | "coolMode"   // After correct answer (purple tint)
    | "impact"     // Hit obstacle
    | "loss";      // Game over

/**
 * UI state exposed to React for rendering
 * Engine throttles updates to 10-15fps
 */
export type GameUIState = {
    /** Current game state */
    gameState: GameState;

    /** Current story page (1-7) */
    storyPage: number;

    /** Player score */
    score: number;

    /** Remaining lives (0-3) */
    lives: number;

    /** Formatted game time (11:55:00 → 00:00:00) */
    gameTime: string;

    /** Current Perseus question to display (or null) */
    currentQuestion: PerseusItem | null;

    /** Whether alien benevolence message should show */
    showBenevolence: boolean;
};

/**
 * Configuration for engine initialization
 */
export type EngineConfig = {
    /** Canvas element for rendering */
    canvas: HTMLCanvasElement;

    /** Callback for UI state updates (throttled) */
    onUIUpdate: (state: GameUIState) => void;

    /** Optional: Muted state */
    muted?: boolean;
};

/**
 * Obstacle data structure
 */
export type Obstacle = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    question: PerseusItem;
    answered: boolean;
    correct: boolean;
    jumped?: boolean;
    racing?: boolean;
    racingStartTime?: number;
};
```

**Perseus interface:**
```typescript
// games/shared/perseus/PerseusGameEngine.ts

import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Interface that all educational games must implement for Perseus integration.
 *
 * This provides a consistent way for games to integrate Perseus questions,
 * regardless of the game mechanics.
 *
 * Example usage:
 * ```typescript
 * class MyGameEngine implements PerseusGameEngine {
 *     getCurrentQuestion() { return this.currentQuestion; }
 *     submitAnswer(correct, points) { this.handleAnswer(correct, points); }
 *     onQuestionChange(cb) { this.questionCallback = cb; }
 * }
 * ```
 */
export interface PerseusGameEngine {
    /**
     * Get the current question that should be displayed to the player.
     * Returns null if no question is active.
     *
     * The React component will render this using ServerItemRenderer.
     */
    getCurrentQuestion(): PerseusItem | null;

    /**
     * Called when the player submits an answer to the current question.
     *
     * @param correct - Whether the answer was correct
     * @param earnedPoints - Points earned (from Perseus scoring)
     */
    submitAnswer(correct: boolean, earnedPoints: number): void;

    /**
     * Register a callback to be notified when the question changes.
     * This allows React to re-render when a new question appears.
     *
     * @param callback - Function called with new question (or null)
     */
    onQuestionChange(callback: (question: PerseusItem | null) => void): void;
}
```

---

### Task 9: Design Engine Public API
- **What**: Document the public methods React will call
- **Why**: Clear contract for Phase 3 (React integration)
- **Implementation notes**:
  - Create skeleton CrashCourseEngine class
  - Define public methods with JSDoc
  - No implementation yet, just signatures
  - Document parameters and return values
- **Files affected**:
  - New: `games/crash-course/engine/CrashCourseEngine.ts` (skeleton)
- **Acceptance criteria**:
  - All public methods defined
  - JSDoc documentation complete
  - Type signatures correct
  - Ready for Phase 2 implementation

**Example API skeleton:**
```typescript
// games/crash-course/engine/CrashCourseEngine.ts

import type {GameState, GameUIState, EngineConfig, Obstacle} from "./types";
import type {PerseusGameEngine} from "../../shared/perseus/PerseusGameEngine";
import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Crash Course game engine.
 *
 * Handles all game logic, physics, collision detection, and rendering.
 * Runs at 60fps independently of React.
 *
 * Usage:
 * ```typescript
 * const engine = new CrashCourseEngine({
 *     canvas: canvasRef.current,
 *     onUIUpdate: setUIState,
 * });
 *
 * await engine.init();
 * engine.start();
 *
 * // Later
 * engine.stop();
 * ```
 */
export class CrashCourseEngine implements PerseusGameEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gameState: GameState = "start";

    /**
     * Create a new game engine instance.
     *
     * @param config - Engine configuration
     */
    constructor(config: EngineConfig) {
        // Implementation in Phase 2
    }

    /**
     * Initialize the engine and load all assets.
     * Must be called before start().
     */
    async init(): Promise<void> {
        // Implementation in Phase 2
    }

    /**
     * Start the game loop.
     * Engine will run at 60fps until stop() is called.
     */
    start(): void {
        // Implementation in Phase 2
    }

    /**
     * Stop the game loop.
     */
    stop(): void {
        // Implementation in Phase 2
    }

    /**
     * Pause the game.
     */
    pause(): void {
        // Implementation in Phase 2
    }

    /**
     * Resume the game.
     */
    resume(): void {
        // Implementation in Phase 2
    }

    /**
     * Get current game state.
     */
    getCurrentState(): GameState {
        return this.gameState;
    }

    /**
     * Start the story sequence.
     * Transitions from "start" to "story" state.
     */
    startStory(): void {
        // Implementation in Phase 2
    }

    /**
     * Advance to next story page.
     * After page 7, transitions to "playing" state.
     */
    nextStoryPage(): void {
        // Implementation in Phase 2
    }

    /**
     * Start gameplay.
     * Transitions to "playing" state and starts timer.
     */
    startPlaying(): void {
        // Implementation in Phase 2
    }

    /**
     * Toggle audio mute.
     */
    toggleMute(): void {
        // Implementation in Phase 2
    }

    // PerseusGameEngine interface

    /**
     * Get current Perseus question to display.
     * Returns null if no question active.
     */
    getCurrentQuestion(): PerseusItem | null {
        // Implementation in Phase 2
        return null;
    }

    /**
     * Submit answer from player.
     *
     * @param correct - Whether answer was correct
     * @param earnedPoints - Points earned
     */
    submitAnswer(correct: boolean, earnedPoints: number): void {
        // Implementation in Phase 2
    }

    /**
     * Register callback for question changes.
     */
    onQuestionChange(callback: (question: PerseusItem | null) => void): void {
        // Implementation in Phase 2
    }
}
```

---

### Task 10: Copy Game Files to New Location
- **What**: Copy (don't move yet) game files to new location with new names
- **Why**: Keep original working while setting up new structure
- **Implementation notes**:
  - Copy story file as `crash-course.stories.tsx`
  - Copy utils as `crash-course-utils.ts`
  - Copy CSS as `crash-course.module.css`
  - Copy car bonus scene files
  - Keep originals in __docs__ until Phase 3
- **Files affected**:
  - Copy: `__docs__/math-blaster-game.stories.tsx` → `games/crash-course/crash-course.stories.tsx`
  - Copy: `__docs__/math-blaster-utils.ts` → `games/crash-course/crash-course-utils.ts`
  - Copy: `__docs__/math-blaster-game.module.css` → `games/crash-course/crash-course.module.css`
  - Copy: `__docs__/car-bonus-scene.tsx` → `games/crash-course/car-bonus-scene.tsx`
  - Copy: `__docs__/car-bonus-scene.module.css` → `games/crash-course/car-bonus-scene.module.css`
- **Acceptance criteria**:
  - Files copied to new location
  - Original files still work
  - New location files have updated imports

---

### Task 11: Update Import Paths in Copied Files
- **What**: Update asset import statements in the copied files
- **Why**: Make copied files work with new asset locations
- **Implementation notes**:
  - Update image imports to use new asset paths
  - Update audio imports to use new paths
  - Update CSS imports
  - Files should compile without errors
- **Files affected**:
  - Modified: `games/crash-course/crash-course.stories.tsx`
  - Modified: `games/crash-course/car-bonus-scene.tsx`
- **Acceptance criteria**:
  - All imports resolve correctly
  - No import errors when building
  - TypeScript doesn't complain

**Example import changes:**
```typescript
// Before (in __docs__)
import run1Img from "./run1.png";
import styles from "./math-blaster-game.module.css";

// After (in games/crash-course/)
import run1Img from "./assets/sprites/run1.png";
import styles from "./crash-course.module.css";
```

---

### Task 12: Update Storybook Story Metadata
- **What**: Change Storybook title to "Games/Crash Course"
- **Why**: Make it appear under "Games" section with correct name
- **Implementation notes**:
  - Update title in story metadata
  - Update component name if needed
  - Update description
  - Keep as separate story from original (both exist temporarily)
- **Files affected**:
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Story appears under "Games" in Storybook
  - Title is "Crash Course" not "Math Blaster"
  - Both old and new stories work

**Example:**
```typescript
const meta: Meta = {
    title: "Games/Crash Course",
    component: CrashCourseGame,
    parameters: {
        docs: {
            description: {
                component: `
# Crash Course

An endless runner game showcasing Perseus widget integration.
This is the refactored version with game engine architecture.

**Location**: packages/perseus/src/games/crash-course/
                `,
            },
        },
    },
};
```

---

### Task 13: Create Asset Manifest
- **What**: Create a manifest file listing all assets
- **Why**: Centralized asset loading, easy to maintain
- **Implementation notes**:
  - List all images with keys
  - List all audio with keys
  - Export as TypeScript object
  - Used by AssetLoader in Phase 2
- **Files affected**:
  - New: `games/crash-course/assets/asset-manifest.ts`
- **Acceptance criteria**:
  - All assets listed
  - Correct paths
  - Type-safe

**Example:**
```typescript
// games/crash-course/assets/asset-manifest.ts

import run1Img from "./sprites/run1.png";
import run2Img from "./sprites/run2.png";
// ... all other imports

export const SPRITE_ASSETS = {
    run1: run1Img,
    run2: run2Img,
    run3: run3Img,
    run4: run4Img,
    run5: run5Img,
    run6: run6Img,
    impact: impactImg,
    idle: idleImg,
    alien1: alien1Img,
    alien2: alien2Img,
    alien3: alien3Img,
    car1: car1Img,
    car2: car2Img,
    beam: beamImg,
} as const;

export const BACKGROUND_ASSETS = {
    sky: skyImg,
    cityFar: cityFarImg,
    citySemiFar: citySemiFarImg,
    citySemiClose: citySemiCloseImg,
    cityClose: cityCloseImg,
    streetlamp: streetlampImg,
    lamplight: lamplightImg,
} as const;

export const UI_ASSETS = {
    title: titleImg,
    start: startImg,
    next: nextImg,
    mute: muteImg,
    unmute: unmuteImg,
    victory: victoryImg,
    lose: loseImg,
    bonus1: bonus1Img,
    bonus2: bonus2Img,
    skid: skidImg,
} as const;

export const STORY_ASSETS = {
    story1: story1Img,
    story2: story2Img,
    story3: story3Img,
    story4: story4Img,
    story5: story5Img,
    story6: story6Img,
    story7: story7Img,
} as const;

export const AUDIO_ASSETS = {
    menuTheme: menuThemeAudio,
    gameTheme1: gameTheme1Audio,
    gameTheme2: gameTheme2Audio,
    gameOverTheme: gameOverThemeAudio,
} as const;

export const ALL_ASSETS = {
    sprites: SPRITE_ASSETS,
    backgrounds: BACKGROUND_ASSETS,
    ui: UI_ASSETS,
    story: STORY_ASSETS,
    audio: AUDIO_ASSETS,
} as const;
```

---

### Task 14: Verify Build and Type Checking
- **What**: Ensure everything compiles and builds correctly
- **Why**: Catch issues early before Phase 2
- **Implementation notes**:
  - Run `pnpm tsc` - should pass
  - Run `pnpm lint` - should pass
  - Run `pnpm build` - should succeed
  - Original game still works in Storybook
  - New (incomplete) game appears in Storybook
- **Files affected**:
  - N/A (verification task)
- **Acceptance criteria**:
  - TypeScript compilation passes
  - Linting passes
  - Build succeeds
  - No import errors
  - Original game works

---

### Task 15: Document Phase 1 Completion
- **What**: Create a completion checklist and summary
- **Why**: Verify everything is ready for Phase 2
- **Implementation notes**:
  - Check all directories created
  - Check all assets moved
  - Check types defined
  - Check API documented
  - Update main README
- **Files affected**:
  - New: `games/crash-course/PHASE_1_COMPLETE.md`
- **Acceptance criteria**:
  - All tasks completed
  - Checklist verified
  - Ready for Phase 2

---

## Deliverables

After this phase, you should have:

### Directory Structure ✅
```
games/
├── crash-course/
│   ├── assets/
│   │   ├── sprites/         (14 files)
│   │   ├── backgrounds/     (7 files)
│   │   ├── ui/              (10 files)
│   │   ├── audio/           (4 files)
│   │   ├── story/           (7 files)
│   │   └── asset-manifest.ts
│   ├── engine/
│   │   ├── CrashCourseEngine.ts  (skeleton with API)
│   │   ├── types.ts              (complete types)
│   │   ├── systems/              (empty, ready for Phase 2)
│   │   └── utils/                (empty, ready for Phase 2)
│   ├── components/               (empty, ready for Phase 3)
│   ├── crash-course.stories.tsx  (copied, imports updated)
│   ├── crash-course-utils.ts     (copied)
│   ├── crash-course.module.css   (copied)
│   ├── car-bonus-scene.tsx       (copied)
│   ├── car-bonus-scene.module.css (copied)
│   └── README.md
└── shared/
    └── perseus/
        └── PerseusGameEngine.ts  (interface definition)
```

### API Definitions ✅
- GameState type
- GameUIState type
- Obstacle type
- PerseusGameEngine interface
- CrashCourseEngine public API (skeleton)

### Assets Organized ✅
- 42 assets moved to proper subdirectories
- Asset manifest created
- Git history preserved

### Original Game Still Works ✅
- Files remain in __docs__
- Storybook story still functional
- No breaking changes

---

## Testing Considerations

After this phase:
1. **Build Check**: `pnpm tsc` passes
2. **Lint Check**: `pnpm lint` passes
3. **Storybook Check**: Original game still works
4. **Import Check**: New files compile without errors
5. **Git Check**: History preserved with `git mv`

---

## Benefits After This Phase

- ✅ **Clean organization** - Assets in logical folders
- ✅ **Clear API contract** - Types and interfaces defined
- ✅ **Ready for Phase 2** - Structure in place
- ✅ **Reversible** - Original game still works
- ✅ **Documented** - API fully specified with JSDoc

---

## Next Phase

**Phase 2**: Build the game engine with all systems, implementing the API we designed in this phase.

The foundation is set! 🏗️
