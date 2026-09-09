# Concept: Crash Course Game Reorganization

## What We're Building

A complete refactoring and reorganization of the "Crash Course" (formerly "math-blaster") game from a rapid prototype into a maintainable, well-structured proof of concept. The game is an endless runner that integrates Perseus widgets to create an educational gaming experience where players answer math questions to jump over obstacles.

**Key Change**: Moving from a React-heavy implementation to a **custom game engine architecture** that separates game logic from UI rendering, making the code more maintainable and setting a pattern for future educational games.

## Why

The current implementation exists as a 1673-line monolithic React component in the `__docs__` directory with:
- All game logic, rendering, and UI in a single file
- 40+ asset files scattered in the root `__docs__` folder
- Inconsistent naming (still using "math-blaster" in many places)
- Complex state management with 30+ state variables and parallel ref tracking
- React + requestAnimationFrame hooks causing complex dependency management
- No documentation or code comments
- Difficult to understand, modify, or maintain

This refactoring will transform it into a clean, maintainable proof of concept that demonstrates best practices for building Perseus-based educational games while establishing a reusable pattern for future games.

## Key Components

### 1. **Game Engine Architecture (NEW)**
- **Custom TypeScript game engine** - Pure TypeScript class, no React dependencies
- **60fps game loop** - Independent of React rendering
- **System-based organization** - Render, Audio, Asset loading systems
- **Clear API** - Public methods for React to call (start, stop, answerQuestion)
- **Testable** - Can unit test game logic without React

**Architecture:**
```
CrashCourseEngine (pure TypeScript)
├── Game Loop (60fps)
│   ├── update() - Physics, collision, spawning
│   └── render() - Canvas drawing
├── Systems
│   ├── RenderSystem - Canvas drawing helpers
│   ├── AudioSystem - Music/sound management
│   └── AssetLoader - Image/audio loading
└── Perseus Integration
    └── Question presentation/answer handling

React Component (thin wrapper)
├── Canvas element
├── UI Overlays (HUD, Question, Screens)
└── Communicates with engine via callbacks
```

### 2. **New Directory Structure**
- **Location**: `packages/perseus/src/games/crash-course/`
- **Assets**: Organized into subdirectories by type
  - `assets/sprites/` - Character animations, aliens, cars
  - `assets/backgrounds/` - Sky, city layers, ground elements
  - `assets/ui/` - Buttons, icons, screens
  - `assets/audio/` - Music and sound effects
  - `assets/story/` - Story page images
- **Engine**: Game logic in pure TypeScript
  - `engine/CrashCourseEngine.ts` - Main game engine
  - `engine/systems/` - Reusable systems (render, audio, assets)
  - `engine/types.ts` - Game-specific types
- **Components**: React UI only
  - `components/` - Screen components, HUD, overlays
  - No game logic in components

### 3. **Component Breakdown**
React handles UI only, game engine handles logic:
- `CrashCourseGame.tsx` - Main component, thin wrapper (< 150 lines)
- `engine/CrashCourseEngine.ts` - Game engine class (300-400 lines)
- `engine/systems/RenderSystem.ts` - Canvas drawing utilities
- `engine/systems/AudioSystem.ts` - Audio management
- `engine/systems/AssetLoader.ts` - Asset loading
- `components/QuestionOverlay.tsx` - Perseus question rendering
- `components/HUD.tsx` - Score, timer, lives display
- `components/StartScreen.tsx` - Title screen
- `components/StoryScreen.tsx` - Story page viewer
- `components/VictoryScreen.tsx` - Victory end screen
- `components/GameOverScreen.tsx` - Game over end screen
- `components/CarBonusScene.tsx` - Existing, just move it
- `types.ts` - Shared TypeScript types

### 4. **Asset Organization**
Move and rename all 40+ assets from `__docs__` to proper subdirectories with consistent naming:
- Use kebab-case for all filenames
- Group by functionality (character, environment, UI, audio)
- Update all import paths throughout the codebase

### 5. **Documentation**
- `README.md` - Overview, how to run, architecture explanation
- Inline code comments explaining complex logic
- JSDoc comments for exported functions and components
- Architecture diagram (ASCII art in README)
- System documentation for each major component

### 6. **Code Quality Improvements**
- **Separation of Concerns**: Game logic vs. UI completely separated
- **Testability**: Game engine is pure TypeScript, easily testable
- **Performance**: Game runs at 60fps, UI updates throttled to 10-15fps
- **Maintainability**: Clear responsibilities, focused modules
- **Extensibility**: Systems can be reused for future games
- **Type Safety**: Comprehensive TypeScript types
- **Error Handling**: Proper error boundaries and fallbacks

## How It Works (High Level)

### User Flow
1. **Start Screen** → Player sees title, clicks "Start"
2. **Story Sequence** → 7-page narrative introduction
3. **Gameplay** → Endless runner with Perseus questions, 5-minute timer
4. **End State** → Either victory (survived 5 min) or game over (ran out of lives)

### Technical Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                   CrashCourseGame                           │
│                   (React Component)                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           <canvas ref={canvasRef} />                  │  │
│  │        (Game engine draws here)                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  UI Overlays (React):                                 │  │
│  │  - HUD (score, time, lives)                          │  │
│  │  - QuestionOverlay (Perseus widgets)                 │  │
│  │  - Screens (start, story, victory, game over)       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│              ▲ UI State Updates (throttled 10fps)          │
│              │                                             │
└──────────────┼─────────────────────────────────────────────┘
               │
               │ onStateChange callback
               │
┌──────────────┴─────────────────────────────────────────────┐
│           CrashCourseEngine                                 │
│           (Pure TypeScript)                                 │
│                                                             │
│  Game Loop (60fps):                                        │
│  ┌─────────────┐      ┌─────────────┐                     │
│  │  update()   │  →   │  render()   │  → requestAnimationFrame
│  │             │      │             │                      │
│  │ - Physics   │      │ - Canvas    │                     │
│  │ - Collision │      │   drawing   │                     │
│  │ - Spawning  │      │ - Sprites   │                     │
│  └─────────────┘      └─────────────┘                     │
│                                                             │
│  Systems:                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐     │
│  │ RenderSystem │ │ AudioSystem  │ │ AssetLoader  │     │
│  └──────────────┘ └──────────────┘ └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **Engine runs independently** - 60fps game loop
2. **Engine notifies React** - Throttled UI state updates (10-15fps)
3. **React renders UI** - Overlays, HUD, Perseus questions
4. **React calls engine** - Player actions (answerQuestion, start, stop)

## Technical Considerations

### Game Engine Benefits
- **Performance**: Game loop not blocked by React re-renders
- **Testability**: Pure TypeScript, can unit test without mounting React
- **Maintainability**: Clear separation between game logic and UI
- **Reusability**: Systems can be shared with future games
- **Debugging**: Can run engine headless for testing

### Perseus Integration
- React component handles ServerItemRenderer (Perseus widgets)
- Engine exposes `getCurrentQuestion()` for React to render
- React calls `engine.answerQuestion(result)` with scoring result
- Clean interface between game and Perseus

### Browser Compatibility
- Requires HTML5 Canvas support
- Audio autoplay requires user interaction
- Modern JavaScript features (ES6+)
- TypeScript compiled to ES2019+

### Performance
- Game loop: 60fps (requestAnimationFrame)
- UI updates: 10-15fps (throttled)
- Canvas redraws: Every frame
- React re-renders: Only when UI state changes

### Naming Consistency
- Transition all references from "math-blaster" to "crash-course"
- Update Storybook title from "Math Blaster Game" to "Crash Course"
- Consistent file naming convention throughout

## Success Criteria

- [ ] Game moved to `packages/perseus/src/games/crash-course/`
- [ ] All assets organized in appropriate subdirectories
- [ ] Game engine architecture implemented (pure TypeScript)
- [ ] Systems extracted (Render, Audio, AssetLoader)
- [ ] React component is thin wrapper (< 200 lines)
- [ ] All naming updated from "math-blaster" to "crash-course"
- [ ] README.md with architecture documentation
- [ ] Unit tests for game engine logic
- [ ] Code comments explaining complex logic
- [ ] No functionality lost - game plays identically to before
- [ ] Storybook story works and appears under "Games/Crash Course"
- [ ] All TypeScript types properly defined
- [ ] Code passes existing linting and type checking
- [ ] Performance maintained or improved (60fps)
- [ ] Game engine is testable without React
- [ ] Clear API for future games to follow same pattern

## Future Enhancements

### For This Game (Out of Scope for Refactor)
- Additional question types or difficulty levels
- Sound effects (only music currently)
- Mobile/touch controls
- Save/load game state
- Leaderboards

### For Future Games (Extensibility)
- **Reusable Systems**: RenderSystem, AudioSystem, AssetLoader can be shared
- **Base Engine**: Could extract common game loop logic to BaseGameEngine
- **Perseus Integration**: QuestionOverlay component could work for other games
- **Shared Types**: Perseus game engine interface for consistency
- **Testing Utilities**: Test harness for game engines

This refactoring establishes a **pattern for educational games at Khan Academy** while keeping the implementation pragmatic and focused on the current needs.
