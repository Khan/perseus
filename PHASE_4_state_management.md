# Phase 4: Refactor State Management

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Simplify the dual state/ref pattern, consolidate related state, and optimize re-renders.

## Tasks

### Task 1: Audit Current State Usage
- **What**: Document all state variables and their usage patterns
- **Why**: Understand what can be consolidated before making changes
- **Implementation notes**:
  - List all useState variables (currently 30+)
  - List all useRef variables
  - Identify which state has corresponding refs
  - Identify which state is used only in game loop
  - Identify which state triggers renders
  - Create a spreadsheet or document mapping state usage
- **Files affected**:
  - Documentation only (or comments in code)
- **Acceptance criteria**:
  - Complete inventory of state/refs
  - Clear understanding of duplication
  - Identified candidates for consolidation

### Task 2: Consolidate Jump-Related State
- **What**: Merge jump state and refs into single source of truth
- **Why**: Currently has both isJumping/isJumpingRef, jumpStartTime/jumpStartTimeRef, characterY/characterYRef
- **Implementation notes**:
  - Keep refs for values needed in game loop (performance)
  - Remove duplicate state variables where possible
  - Use refs as source of truth, derive display state if needed
  - Or use state and update in batches
- **Files affected**:
  - Modified: `games/crash-course/hooks/useGameLoop.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Reduced from 6 jump-related variables to 3-4
  - No duplicate tracking
  - Jump behavior unchanged

**Before:**
```typescript
const [isJumping, setIsJumping] = useState(false);
const [jumpStartTime, setJumpStartTime] = useState(0);
const [characterY, setCharacterY] = useState(GROUND_Y);
const isJumpingRef = useRef(false);
const jumpStartTimeRef = useRef(0);
const characterYRef = useRef(GROUND_Y);
```

**After (Option 1 - Ref-only):**
```typescript
const jumpStateRef = useRef({
    isJumping: false,
    startTime: 0,
    y: GROUND_Y,
});
// Derive display state when needed for UI
const [characterY, setCharacterY] = useState(GROUND_Y);
```

**After (Option 2 - Grouped State):**
```typescript
const [jumpState, setJumpState] = useState({
    isJumping: false,
    startTime: 0,
    y: GROUND_Y,
});
// Only ref for game loop access
const jumpStateRef = useRef(jumpState);
useEffect(() => {
    jumpStateRef.current = jumpState;
}, [jumpState]);
```

### Task 3: Consolidate Alien Animation State
- **What**: Merge alien-related state variables
- **Why**: Currently has 10+ alien-related state/ref pairs
- **Implementation notes**:
  - Group alien state: frame, time, blinkState, blinkTimer, isAbducting, isReturning, isFlyingAway, etc.
  - Create AlienState type
  - Use single state object with ref for game loop
  - Reduce variable count significantly
- **Files affected**:
  - New type in: `games/crash-course/types.ts`
  - Modified: `games/crash-course/hooks/useGameLoop.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Alien state consolidated into 1-2 variables
  - Alien animations work identically
  - Code is clearer

**Before:**
```typescript
const [alienFrame, setAlienFrame] = useState(1);
const [alienTime, setAlienTime] = useState(0);
const [alienBlinkState, setAlienBlinkState] = useState("idle");
const [isAlienAbducting, setIsAlienAbducting] = useState(false);
const [isAlienReturning, setIsAlienReturning] = useState(false);
const [isAlienFlyingAway, setIsAlienFlyingAway] = useState(false);
// ... plus corresponding refs
```

**After:**
```typescript
type AlienState = {
    frame: number;
    time: number;
    blinkState: "idle" | "blink1" | "blink2";
    blinkTimer: number;
    mode: "floating" | "abducting" | "returning" | "flyingAway";
    returnStartTime?: number;
    returnStartPos?: {x: number; y: number};
    flyAwayStartTime?: number;
};

const [alienState, setAlienState] = useState<AlienState>({
    frame: 1,
    time: 0,
    blinkState: "idle",
    blinkTimer: 2000,
    mode: "floating",
});
const alienStateRef = useRef(alienState);
```

### Task 4: Consolidate Visual Effect State
- **What**: Group shake, parallax, and other visual effects
- **Why**: These are related rendering concerns
- **Implementation notes**:
  - Group: shakeOffset, isShaking, parallaxOffsets
  - Create VisualEffectsState type
  - Single state object for all visual effects
  - Simplifies render logic
- **Files affected**:
  - New type in: `games/crash-course/types.ts`
  - Modified: `games/crash-course/hooks/useGameLoop.ts`
  - Modified: `games/crash-course/utils/drawing.ts`
- **Acceptance criteria**:
  - Visual effects grouped
  - Rendering unchanged
  - Clearer code organization

**After:**
```typescript
type VisualEffectsState = {
    shake: {x: number; y: number};
    isShaking: boolean;
    parallaxOffsets: number[];
};

const [visualEffects, setVisualEffects] = useState<VisualEffectsState>({
    shake: {x: 0, y: 0},
    isShaking: false,
    parallaxOffsets: [0, 0, 0, 0, 0],
});
```

### Task 5: Use useReducer for Game State
- **What**: Convert complex game state to useReducer pattern
- **Why**: Complex state transitions are easier to manage with reducer
- **Implementation notes**:
  - Create game reducer with actions: START_GAME, SPAWN_OBSTACLE, ANSWER_CORRECT, ANSWER_INCORRECT, etc.
  - Move state update logic into reducer
  - Centralize state transitions
  - Makes state changes predictable and testable
- **Files affected**:
  - New: `games/crash-course/hooks/useGameReducer.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Complex state managed by reducer
  - State transitions clearer
  - Game behavior unchanged
  - Easier to debug state changes

**Example:**
```typescript
// hooks/useGameReducer.ts
type GameAction =
    | {type: "START_GAME"}
    | {type: "NEXT_STORY_PAGE"}
    | {type: "SPAWN_OBSTACLE"; obstacle: Obstacle}
    | {type: "ANSWER_CORRECT"; obstacleId: string; points: number}
    | {type: "ANSWER_INCORRECT"}
    | {type: "LOSE_LIFE"}
    | {type: "GAME_OVER"}
    | {type: "VICTORY"};

type GameReducerState = {
    gameState: GameState;
    storyPage: number;
    score: number;
    lives: number;
    obstacles: Obstacle[];
    currentObstacle: Obstacle | null;
};

function gameReducer(
    state: GameReducerState,
    action: GameAction,
): GameReducerState {
    switch (action.type) {
        case "START_GAME":
            return {
                ...state,
                gameState: "story",
                storyPage: 1,
                score: 0,
                lives: 3,
                obstacles: [],
            };
        case "ANSWER_CORRECT":
            return {
                ...state,
                score: state.score + action.points,
                obstacles: state.obstacles.map((obs) =>
                    obs.id === action.obstacleId
                        ? {...obs, answered: true, correct: true}
                        : obs,
                ),
            };
        // ... other cases
        default:
            return state;
    }
}

export function useGameReducer() {
    return useReducer(gameReducer, initialState);
}
```

### Task 6: Optimize Re-renders with useMemo/useCallback
- **What**: Memoize expensive calculations and callback functions
- **Why**: Prevent unnecessary re-renders, improve performance
- **Implementation notes**:
  - Identify expensive calculations (e.g., obstacle distance calculations)
  - Wrap in useMemo with proper dependencies
  - Wrap callbacks in useCallback to prevent re-creation
  - Profile before/after to verify improvement
- **Files affected**:
  - Modified: `games/crash-course/crash-course.stories.tsx`
  - Modified: `games/crash-course/hooks/useGameLoop.ts`
- **Acceptance criteria**:
  - Key calculations memoized
  - Callbacks stable across renders
  - Measurable performance improvement
  - No stale closure bugs

**Example:**
```typescript
// Memoize obstacle distance calculation
const currentObstacleDistance = useMemo(() => {
    if (!currentObstacle) return Infinity;
    const liveObstacle = obstacles.find((o) => o.id === currentObstacle.id);
    return liveObstacle ? liveObstacle.x - COLLISION_ZONE_X : Infinity;
}, [currentObstacle, obstacles]);

// Stable callback
const handleCheckAnswer = useCallback(() => {
    if (!currentObstacle) return;
    // ... answer checking logic
}, [currentObstacle, /* other dependencies */]);
```

### Task 7: Extract Separate State Hooks
- **What**: Create custom hooks for independent state domains
- **Why**: Further separation of concerns
- **Implementation notes**:
  - Create useCharacterState hook (position, state, animation)
  - Create useObstacleManager hook (spawning, movement, collision)
  - Create useAlienBehavior hook (animation, abduction, return)
  - Each hook manages its own domain
- **Files affected**:
  - New: `games/crash-course/hooks/useCharacterState.ts`
  - New: `games/crash-course/hooks/useObstacleManager.ts`
  - New: `games/crash-course/hooks/useAlienBehavior.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - State organized by domain
  - Hooks are focused and testable
  - Main component cleaner
  - Game works identically

### Task 8: Remove Unnecessary State Synchronization
- **What**: Eliminate redundant state updates and synchronization
- **Why**: Reduces complexity and potential bugs
- **Implementation notes**:
  - Identify where same value is stored in both state and ref
  - Choose one source of truth (usually ref for game loop, state for rendering)
  - Remove synchronization code
  - Use derived values where possible
- **Files affected**:
  - Modified: `games/crash-course/hooks/useGameLoop.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - No redundant updates
  - Simpler code
  - Game behavior unchanged

### Task 9: Implement Batch State Updates
- **What**: Batch multiple setState calls into single update
- **Why**: Reduces re-renders, improves performance
- **Implementation notes**:
  - Use React 18 automatic batching
  - Group related setState calls
  - Use setState callback form for dependent updates
  - Consider using unstable_batchedUpdates if needed (older React)
- **Files affected**:
  - Modified: `games/crash-course/hooks/useGameLoop.ts`
- **Acceptance criteria**:
  - Multiple updates batched
  - Fewer re-renders
  - Better performance

**Example:**
```typescript
// Before: Multiple separate updates
setScore(score + 10);
setCharacterState("coolMode");
setCoolModeEndTime(Date.now() + 2000);
setAnswerFeedback({show: true, correct: true, message: "Correct!"});

// After: Batched (React 18 does this automatically)
// Or use a single state update with reducer
dispatch({
    type: "ANSWER_CORRECT",
    points: 10,
    feedback: "Correct!",
});
```

### Task 10: Add State Performance Monitoring
- **What**: Add dev-mode logging to track state updates
- **Why**: Helps identify performance issues during development
- **Implementation notes**:
  - Use React DevTools Profiler
  - Add useEffect with logging in dev mode
  - Track render counts for expensive components
  - Add performance marks for game loop
- **Files affected**:
  - Modified: `games/crash-course/crash-course.stories.tsx`
  - Modified: `games/crash-course/hooks/useGameLoop.ts`
- **Acceptance criteria**:
  - Can identify excessive re-renders
  - Performance data available in dev mode
  - No performance impact in production

**Example:**
```typescript
if (process.env.NODE_ENV === "development") {
    useEffect(() => {
        console.log("Component rendered", {
            gameState,
            obstacles: obstacles.length,
            score,
        });
    });
}
```

## Technical Details

### State Organization After Phase 4

```typescript
// Main component state structure
const CrashCourseGame = () => {
    // Core game state (managed by reducer)
    const [gameState, dispatch] = useGameReducer();

    // UI state
    const [storyPage, setStoryPage] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [benevolenceMessage, setBenevolenceMessage] = useState(false);

    // Domain-specific hooks
    const characterState = useCharacterState(gameState);
    const obstacles = useObstacleManager(gameState);
    const alienState = useAlienBehavior(gameState, characterState);

    // Visual effects (grouped)
    const [visualEffects, setVisualEffects] = useState<VisualEffectsState>({
        shake: {x: 0, y: 0},
        isShaking: false,
        parallaxOffsets: [0, 0, 0, 0, 0],
    });

    // Infrastructure hooks
    const {images, isLoaded} = useSpriteLoader();
    const {toggleMute} = useAudioManager(gameState.gameState, isMuted);
    const {gameTime, isComplete} = useGameTimer(gameStartTime, gameState.gameState === "playing");

    // Game loop (orchestrates everything)
    useGameLoop({
        gameState,
        characterState,
        obstacles,
        alienState,
        visualEffects,
        dispatch,
    });

    // Render...
};
```

### Before vs After Comparison

| Metric | Before Phase 4 | After Phase 4 |
|--------|----------------|---------------|
| State variables | 30+ | 10-15 |
| Ref variables | 20+ | 5-10 |
| Duplicate state/ref | 15+ pairs | 0-3 pairs |
| Main component lines | 600-800 | 400-500 |
| State updates per frame | 10-15 | 3-5 (batched) |
| Re-renders per frame | 5-10 | 1-2 |

## Testing Considerations

After this phase:
1. **Performance Testing**:
   - Measure FPS before/after
   - Check render counts with React DevTools Profiler
   - Verify no performance regression
2. **Functionality Testing**:
   - Full playthrough
   - All game mechanics work
   - State transitions correct
3. **State Debugging**:
   - Use React DevTools to inspect state
   - Verify state structure is clearer
   - Check for memory leaks

## Potential Issues

### Over-optimization
- **Issue**: Premature optimization can make code harder to read
- **Mitigation**: Only optimize where there's measurable benefit
- **How to detect**: Code is complex but performance unchanged

### Stale Closures
- **Issue**: useMemo/useCallback can capture stale values
- **Mitigation**: Careful dependency management, ESLint rules
- **How to detect**: Unexpected behavior, old values being used

### useReducer Complexity
- **Issue**: Reducer can become large and complex
- **Mitigation**: Split into multiple reducers or use context
- **How to detect**: Reducer file > 300 lines

### State Synchronization Bugs
- **Issue**: Removing synchronization might break things
- **Mitigation**: Thorough testing, careful refactoring
- **How to detect**: State inconsistencies, race conditions

## Benefits After This Phase

- Cleaner, more maintainable state management
- Better performance (fewer re-renders)
- Easier to debug (centralized state logic)
- More testable (reducers are pure functions)
- Foundation for future enhancements
- Clear separation of state concerns
- Reduced cognitive load
