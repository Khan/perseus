# Phase 3: Extract Game Logic and Hooks

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Move game loop, audio management, sprite loading, and utilities into custom hooks and utility functions.

## Tasks

### Task 1: Create Constants File
- **What**: Extract all magic numbers and configuration into a constants file
- **Why**: Centralized configuration, easier to tune game behavior
- **Implementation notes**:
  - Extract all CAPS constants from main file
  - Group by category (canvas, physics, timing, spawning)
  - Export as named constants
- **Files affected**:
  - New: `games/crash-course/constants.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - All magic numbers moved to constants
  - Constants organized by category
  - Main file imports constants
  - Game behavior unchanged

**Example:**
```typescript
// constants.ts
export const CANVAS = {
    WIDTH: 800,
    HEIGHT: 600,
} as const;

export const PHYSICS = {
    GROUND_Y: 450,
    SCROLL_SPEED: 2,
    JUMP_HEIGHT: 140,
    JUMP_DURATION: 1000,
} as const;

export const GAME_CONFIG = {
    DURATION: 300000, // 5 minutes
    OBSTACLE_SPAWN_INTERVAL: 5000,
    COOL_MODE_DURATION: 2000,
    LAMP_SPACING: 500,
} as const;
```

### Task 2: Extract Drawing Utilities
- **What**: Move all canvas drawing functions to utilities file
- **Why**: Separates rendering logic from game logic
- **Implementation notes**:
  - Extract drawGame function and helper drawing code
  - Create functions for: drawBackground, drawCharacter, drawObstacles, drawAlien, drawLamps
  - Accept canvas context and necessary state as parameters
  - Keep pure functions (no side effects)
- **Files affected**:
  - New: `games/crash-course/utils/drawing.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - All drawing code in utilities
  - Functions are pure (testable)
  - Game renders identically
  - Main file 200-300 lines shorter

**Example:**
```typescript
// utils/drawing.ts
export function drawBackground(
    ctx: CanvasRenderingContext2D,
    spriteImages: Map<string, HTMLImageElement>,
    bgOffsets: number[],
): void {
    // Background drawing logic
}

export function drawCharacter(
    ctx: CanvasRenderingContext2D,
    spriteImages: Map<string, HTMLImageElement>,
    characterState: CharacterState,
    frame: number,
    x: number,
    y: number,
    shake: {x: number; y: number},
): void {
    // Character drawing logic
}
```

### Task 3: Extract Physics Utilities
- **What**: Move physics calculations to utilities file
- **Why**: Makes physics logic testable and reusable
- **Implementation notes**:
  - Extract jump calculation logic
  - Extract collision detection logic
  - Extract parallax calculation logic
  - Create pure functions that return new values
- **Files affected**:
  - New: `games/crash-course/utils/physics.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Physics calculations extracted
  - Functions are pure and testable
  - Game physics unchanged
  - Unit tests can be added easily

**Example:**
```typescript
// utils/physics.ts
export function calculateJumpY(
    startTime: number,
    currentTime: number,
    groundY: number,
    jumpHeight: number,
    jumpDuration: number,
): {y: number; isComplete: boolean} {
    const jumpProgress = currentTime - startTime;
    if (jumpProgress >= jumpDuration) {
        return {y: groundY, isComplete: true};
    }

    const progress = jumpProgress / jumpDuration;
    const height = Math.sin(progress * Math.PI) * jumpHeight;
    return {y: groundY - height, isComplete: false};
}

export function checkCollision(
    obstacleX: number,
    obstacleWidth: number,
    collisionZoneX: number,
    characterX: number,
): boolean {
    return obstacleX < collisionZoneX && obstacleX + obstacleWidth > characterX;
}
```

### Task 4: Create useSpriteLoader Hook
- **What**: Extract sprite loading logic into a custom hook
- **Why**: Reusable image loading, cleaner separation
- **Implementation notes**:
  - Create hook that loads all game images
  - Return {images: Map, isLoaded: boolean}
  - Handle loading errors gracefully
  - Use useEffect for loading
- **Files affected**:
  - New: `games/crash-course/hooks/useSpriteLoader.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Hook loads all sprites
  - Returns loaded state
  - Handles errors
  - Main file simplified

**Example:**
```typescript
// hooks/useSpriteLoader.ts
export function useSpriteLoader(): {
    images: Map<string, HTMLImageElement>;
    isLoaded: boolean;
} {
    const [images, setImages] = useState(new Map());
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Image loading logic
    }, []);

    return {images, isLoaded};
}
```

### Task 5: Create useAudioManager Hook
- **What**: Extract audio playback logic into a custom hook
- **Why**: Centralizes audio management, easier to debug
- **Implementation notes**:
  - Create hook that manages all 4 audio tracks
  - Handle play/pause/stop/volume
  - Handle music transitions (tedox → neon owl)
  - Accept gameState and isMuted as inputs
  - Return toggleMute function
- **Files affected**:
  - New: `games/crash-course/hooks/useAudioManager.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Audio plays correctly per game state
  - Transitions work smoothly
  - Mute/unmute works
  - Cleanup on unmount

**Example:**
```typescript
// hooks/useAudioManager.ts
export function useAudioManager(
    gameState: GameState,
    isMuted: boolean,
): {
    toggleMute: () => void;
} {
    const menuAudioRef = useRef<HTMLAudioElement | null>(null);
    const gameAudioRef = useRef<HTMLAudioElement | null>(null);
    // ... other refs

    useEffect(() => {
        // Setup audio
        return () => {
            // Cleanup
        };
    }, []);

    useEffect(() => {
        // Handle audio based on gameState and isMuted
    }, [gameState, isMuted]);

    const toggleMute = useCallback(() => {
        // Toggle logic
    }, []);

    return {toggleMute};
}
```

### Task 6: Create useGameTimer Hook
- **What**: Extract game time tracking into a hook
- **Why**: Separates time management from game loop
- **Implementation notes**:
  - Track elapsed time from game start
  - Calculate display time (11:55:00 → 00:00:00)
  - Check for victory condition (5 minutes elapsed)
  - Return {gameTime: string, isComplete: boolean}
- **Files affected**:
  - New: `games/crash-course/hooks/useGameTimer.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Timer updates correctly
  - Victory detected at 5 minutes
  - Time display formatted correctly
  - Hook is reusable

**Example:**
```typescript
// hooks/useGameTimer.ts
export function useGameTimer(
    gameStartTime: number,
    isPlaying: boolean,
): {
    gameTime: string;
    isComplete: boolean;
} {
    const [gameTime, setGameTime] = useState("11:55:00");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            const elapsed = Date.now() - gameStartTime;
            // Calculate and update time
        }, 100);

        return () => clearInterval(interval);
    }, [gameStartTime, isPlaying]);

    return {gameTime, isComplete};
}
```

### Task 7: Extract Game Loop Core Logic
- **What**: Create a hook for the main game loop
- **Why**: Most complex piece, needs careful extraction
- **Implementation notes**:
  - Create useGameLoop hook
  - Accept necessary state and refs as parameters
  - Handle: obstacle movement, collision detection, spawning, animation updates
  - Return updated state values
  - Use requestAnimationFrame internally
  - Keep drawGame call separate (rendering stays in component)
- **Files affected**:
  - New: `games/crash-course/hooks/useGameLoop.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Game loop runs at 60fps
  - All game mechanics work
  - State updates correctly
  - No performance regression

**Example:**
```typescript
// hooks/useGameLoop.ts
export function useGameLoop(
    gameState: GameState,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    spriteImages: Map<string, HTMLImageElement>,
    // ... other parameters
): {
    obstacles: Obstacle[];
    walkFrame: number;
    characterY: number;
    // ... other game state
} {
    // Game loop implementation
    // Uses useEffect with requestAnimationFrame
    // Updates and returns game state
}
```

### Task 8: Create Obstacle Management Utilities
- **What**: Extract obstacle-related functions to utilities
- **Why**: Obstacle logic is complex and can be isolated
- **Implementation notes**:
  - Keep createObstacle from crash-course-utils
  - Add: updateObstaclePositions, checkObstacleCollisions, removeOffscreenObstacles
  - Add: findCurrentObstacle
  - Pure functions that operate on obstacle arrays
- **Files affected**:
  - Modified: `games/crash-course/crash-course-utils.ts`
  - New: `games/crash-course/utils/obstacles.ts` (or extend existing utils)
- **Acceptance criteria**:
  - Obstacle functions extracted
  - Functions are pure and testable
  - Game obstacle behavior unchanged

**Example:**
```typescript
// utils/obstacles.ts
export function updateObstaclePositions(
    obstacles: Obstacle[],
    scrollSpeed: number,
    currentTime: number,
): Obstacle[] {
    return obstacles.map((obs) => {
        let speed = scrollSpeed;
        if (obs.racing && obs.racingStartTime) {
            const racingDuration = currentTime - obs.racingStartTime;
            const acceleration = Math.min(racingDuration / 500, 5);
            speed = scrollSpeed * (1 + acceleration * 2);
        }
        return {...obs, x: obs.x - speed};
    });
}

export function removeOffscreenObstacles(
    obstacles: Obstacle[],
): Obstacle[] {
    return obstacles.filter((obs) => obs.x + obs.width >= 0);
}
```

### Task 9: Create Alien Animation Utilities
- **What**: Extract alien behavior logic to utilities
- **Why**: Alien has complex animation states (floating, blinking, abducting)
- **Implementation notes**:
  - Create functions for: calculateAlienPosition, updateAlienBlinkState
  - Handle floating motion calculations
  - Handle blink timing and state transitions
  - Handle abduction and return animations
- **Files affected**:
  - New: `games/crash-course/utils/alien.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Alien behavior extracted
  - Animations work identically
  - Functions are testable

### Task 10: Create Hooks Directory and Index
- **What**: Organize all hooks with barrel export
- **Why**: Clean imports, clear organization
- **Implementation notes**:
  - Create `games/crash-course/hooks/` directory
  - Move all hook files into hooks/
  - Create index.ts with re-exports
  - Update imports in main file
- **Files affected**:
  - New: `games/crash-course/hooks/index.ts`
  - All hook files in hooks/
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - All hooks in hooks/ folder
  - Barrel export works
  - Imports simplified

### Task 11: Create Utils Directory and Index
- **What**: Organize all utilities with barrel export
- **Why**: Clean organization, discoverable utilities
- **Implementation notes**:
  - Create `games/crash-course/utils/` directory if not exists
  - Organize: drawing.ts, physics.ts, obstacles.ts, alien.ts
  - Create index.ts with re-exports
  - Move crash-course-utils.ts content to appropriate files
- **Files affected**:
  - New: `games/crash-course/utils/index.ts`
  - All utility files in utils/
  - Modified imports
- **Acceptance criteria**:
  - All utilities organized
  - Barrel export works
  - No duplicate code

### Task 12: Update Main Component to Use Hooks
- **What**: Replace inline logic with hook calls
- **Why**: Dramatically reduces main file complexity
- **Implementation notes**:
  - Replace sprite loading useEffect with useSpriteLoader
  - Replace audio useEffects with useAudioManager
  - Replace game loop useEffect with useGameLoop
  - Replace timer logic with useGameTimer
  - Pass hook results to components
- **Files affected**:
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Main file reduced to ~600-800 lines
  - All hooks integrated
  - Game plays identically
  - No functionality lost

## Technical Details

### Hook Organization

```
games/crash-course/
├── hooks/
│   ├── useSpriteLoader.ts      (~80 lines)
│   ├── useAudioManager.ts      (~150 lines)
│   ├── useGameTimer.ts         (~50 lines)
│   ├── useGameLoop.ts          (~300-400 lines)
│   └── index.ts                (~5 lines)
├── utils/
│   ├── drawing.ts              (~200 lines)
│   ├── physics.ts              (~100 lines)
│   ├── obstacles.ts            (~150 lines)
│   ├── alien.ts                (~100 lines)
│   └── index.ts                (~5 lines)
├── constants.ts                (~50 lines)
└── crash-course.stories.tsx    (~600-800 lines, down from 1200)
```

### Main Component After Extraction

```typescript
// crash-course.stories.tsx (simplified)
const CrashCourseGame = (): React.ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const itemRendererRef = useRef<ServerItemRenderer>(null);

    // Basic state
    const [gameState, setGameState] = useState<GameState>("start");
    const [storyPage, setStoryPage] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    // Custom hooks
    const {images: spriteImages, isLoaded} = useSpriteLoader();
    const {toggleMute} = useAudioManager(gameState, isMuted);
    const {gameTime, isComplete: timeUp} = useGameTimer(gameStartTime, gameState === "playing");
    const gameLoopState = useGameLoop(
        gameState,
        canvasRef,
        spriteImages,
        // ... other params
    );

    // Handle time up
    useEffect(() => {
        if (timeUp) setGameState("victory");
    }, [timeUp]);

    // Render
    return (
        <View>
            <div className={styles.gameContainer}>
                <canvas ref={canvasRef} {...canvasDimensions} />

                <MuteButton
                    isMuted={isMuted}
                    muteImage={spriteImages.get("mute")}
                    unmuteImage={spriteImages.get("unmute")}
                    onToggle={() => setIsMuted(!isMuted)}
                />

                {gameState === "start" && (
                    <StartScreen {...startScreenProps} />
                )}

                {gameState === "playing" && (
                    <>
                        <HUD {...hudProps} />
                        {currentObstacle && <QuestionOverlay {...questionProps} />}
                    </>
                )}

                {/* Other game states */}
            </div>
        </View>
    );
};
```

## Testing Considerations

After this phase:
1. **Functionality Testing**: Game must play identically
2. **Performance Testing**: Verify 60fps maintained
3. **Hook Testing**: Hooks can be tested in isolation
4. **Utility Testing**: Utils can be unit tested
5. **Regression Testing**: Full game playthrough

## Potential Issues

### Hook Dependencies
- **Issue**: Complex dependency arrays in useEffect
- **Mitigation**: Use useCallback/useMemo, careful dependency management
- **How to detect**: Infinite re-render loops, stale closures

### Game Loop Performance
- **Issue**: Hook extraction might impact performance
- **Mitigation**: Profile before/after, use refs for values needed in game loop
- **How to detect**: FPS drops, stuttering animation

### State Synchronization
- **Issue**: Hooks updating state independently might cause conflicts
- **Mitigation**: Careful state design, consider useReducer for complex state
- **How to detect**: Inconsistent state, race conditions

### requestAnimationFrame Cleanup
- **Issue**: Animation frame must be canceled properly
- **Mitigation**: Return cleanup function from useEffect
- **How to detect**: Memory leaks, continued animation after unmount

## Benefits After This Phase

- Main component reduced from 1200 to ~600-800 lines
- Game logic testable in isolation
- Hooks are reusable
- Utilities can be unit tested
- Clear separation of concerns
- Easier to debug and maintain
- Foundation for Phase 4 optimization
