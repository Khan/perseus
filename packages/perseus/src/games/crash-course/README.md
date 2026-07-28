# Crash Course - Educational Endless Runner

**Status**: 🚧 Under active refactoring (Phase 1 in progress)

Educational endless runner game where players answer math questions while avoiding obstacles.

## Architecture

This game uses a **custom game engine** pattern:

```
CrashCourseEngine (Pure TypeScript)
├── 60fps game loop (requestAnimationFrame)
├── Physics & collision detection
├── Sprite animation (multi-entity)
├── Canvas rendering
└── Perseus question integration

React UI (Thin wrapper)
├── Game canvas element
├── UI overlays (start, story, HUD)
├── Perseus question widget
└── Event handling (buttons, mute)
```

## Directory Structure

```
crash-course/
├── assets/              # Game assets
│   ├── sprites/         # Character, alien, car sprites
│   ├── backgrounds/     # Sky, city layers, lamps
│   ├── ui/              # Buttons, title, victory/lose screens
│   ├── audio/           # Music and sound effects
│   └── story/           # Story page images
├── engine/              # Game engine (Phase 2)
│   ├── crash-course-engine.ts  # Main engine class
│   ├── types.ts         # Type definitions
│   ├── systems/         # Reusable systems
│   └── utils/           # Helper functions
├── components/          # React UI components (Phase 3)
├── __tests__/           # Unit tests
├── __testdata__/        # Test fixtures
├── __test-utils__/      # Test helpers
└── plans/               # Refactoring documentation
```

## Current Status

### ✅ Phase 0: Testing Foundation (Complete)
- Baseline tests written
- Performance metrics captured
- Behavior documented

### 🚧 Phase 1: Setup & Architecture (In Progress)
- [x] Directory structure created
- [x] Assets organized
- [x] Engine API designed
- [x] Perseus integration interface
- [ ] Implementation in Phase 2

### 📋 Phase 2: Build Engine (Next)
- Build CrashCourseEngine class
- Implement sprite animation system
- Build game systems (Render, Audio, Assets)
- Move game logic from React

### 📋 Phase 3: UI Components (Planned)
- Extract React UI components
- Wire up engine callbacks
- Integrate Perseus widget

### 📋 Phase 4: Documentation (Planned)
- Write comprehensive docs
- Add code comments
- Performance verification

## Key Design Decisions

1. **Custom Game Engine**: Avoids React + requestAnimationFrame complexity
2. **Pure TypeScript**: Game logic independent of React
3. **60fps Game Loop**: Decoupled from React rendering
4. **Multi-Entity Sprites**: Built from start to avoid future refactoring
5. **Perseus Integration**: Standard interface for all educational games

## Documentation

See `plans/` directory for complete refactoring plan:
- [CRASH_COURSE_CONCEPT.md](./plans/CRASH_COURSE_CONCEPT.md) - Architecture vision
- [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./plans/CRASH_COURSE_IMPLEMENTATION_PLAN.md) - 5-phase plan
- [ORIGINAL_BEHAVIOR.md](./plans/ORIGINAL_BEHAVIOR.md) - Current game behavior
- [PERFORMANCE_BASELINE.md](./plans/PERFORMANCE_BASELINE.md) - Performance metrics

## Running the Game

Currently, the original game still exists at:
`packages/perseus/src/__docs__/math-blaster-game.stories.tsx`

After refactoring (Phase 3), the new version will be at:
`packages/perseus/src/games/crash-course/crash-course.stories.tsx`

## Testing

```bash
# Run tests
pnpm test packages/perseus/src/games/crash-course

# Run specific test file
pnpm test crash-course-utils.test.ts
```

## Contributing

This refactoring follows a 5-phase plan. Please see the phase documents in `plans/` before making changes.

---

**Original**: Math Blaster Game (rapid prototype)
**Refactored**: Crash Course (production-ready, maintainable)
