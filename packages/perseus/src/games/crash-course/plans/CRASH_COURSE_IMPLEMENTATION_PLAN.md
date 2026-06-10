# Implementation Plan: Crash Course Game Reorganization

Based on: [CRASH_COURSE_CONCEPT.md](./CRASH_COURSE_CONCEPT.md)

## Overview

This refactoring transforms the Crash Course game from a 1673-line monolithic React component into a well-organized, maintainable game with a **custom game engine architecture**. The key innovation is separating game logic (pure TypeScript) from UI rendering (React), which solves the React + requestAnimationFrame complexity and establishes a reusable pattern for future educational games.

**Strategy**: Build game engine first, then wrap with React UI

## Key Architectural Decision

**Game Engine Pattern**: Instead of refactoring React hooks and state management, we're extracting all game logic into a pure TypeScript game engine class. This:
- Eliminates React + game loop complexity
- Makes game logic testable without React
- Runs at 60fps independently
- Throttles UI updates to 10-15fps
- Sets pattern for future games

## Phases

### Phase 0: Testing Foundation & Performance Baselines
**Goal**: Establish testing infrastructure and capture current performance metrics before making any changes

**Estimated Effort**: 2-3 hours

This phase ensures we can verify the refactored game works identically and performs as well (or better) than the original. Critical for catching regressions.

**Details**: See `PHASE_0_testing_foundation.md`

---

### Phase 1: Setup, Assets & Engine Architecture
**Goal**: Create directory structure, organize assets, and design the game engine API

**Estimated Effort**: 2-3 hours

Sets up the foundation by creating folders, moving assets, and defining the interfaces between the game engine and React. No behavior changes yet - just organization and API design.

**Details**: See `PHASE_1_setup_assets_architecture.md`

---

### Phase 2: Build Game Engine
**Goal**: Extract all game logic into the CrashCourseEngine class with supporting systems

**Estimated Effort**: 5-7 hours

The core refactoring work. Move all game loop logic, physics, collision detection, and canvas rendering from the React component into a pure TypeScript game engine. This is the most complex phase but well-defined by the API designed in Phase 1.

**Details**: See `PHASE_2_build_engine.md`

---

### Phase 3: Extract UI Components & Wire Up
**Goal**: Create React components for UI overlays and connect them to the game engine

**Estimated Effort**: 2-3 hours

Now that the engine is working, build the React wrapper. Extract UI components (screens, HUD, question overlay) and connect them to the game engine via callbacks. React becomes a thin UI layer.

**Details**: See `PHASE_3_ui_components.md`

---

### Phase 4: Documentation & Polish
**Goal**: Add comprehensive documentation, verify everything works, and finalize

**Estimated Effort**: 2-3 hours

Write documentation explaining the architecture, add code comments, verify tests pass, ensure performance is maintained, and clean up any rough edges.

**Details**: See `PHASE_4_documentation_polish.md`

---

## Dependencies

**Sequential Phases**:
- Phase 0 must be first (establishes testing baseline)
- Phase 1 must be before Phase 2 (creates structure and API)
- Phase 2 must be before Phase 3 (engine must exist before UI connects to it)
- Phase 4 is last (documents completed work)

**Clear Boundaries**:
- Each phase has a clear completion point
- Each phase leaves the code in a working state
- Can pause between phases for review
- Can rollback to previous phase if needed

## Testing Strategy

### After Phase 0:
- Baseline tests exist
- Performance metrics captured
- Can compare against these after each phase

### After Phase 1:
- `pnpm tsc` - Type checking passes
- `pnpm lint` - Linting passes
- Assets are accessible at new paths
- Original game still works

### After Phase 2:
- Unit tests for engine logic pass
- Engine can run headless (without React)
- Performance benchmarks meet or exceed baseline
- Game plays identically in Storybook

### After Phase 3:
- Full integration tests pass
- React components render correctly
- Perseus widget integration works
- All screens and transitions work
- Audio plays correctly

### After Phase 4:
- Documentation is complete and accurate
- All tests pass
- Code is clean and commented
- Ready for production use

## Rollback Strategy

### Git Strategy:
- Create feature branch: `refactor/crash-course-engine`
- Commit after each major task (not just each phase)
- Tag after each phase: `phase-0-complete`, `phase-1-complete`, etc.
- Can revert to any tag if issues arise

### Mid-Phase Rollback:
- Each task within a phase should be atomic
- Commit after each task with clear message
- Can rollback individual tasks without losing phase progress

### Feature Flag (Optional):
```typescript
// Can keep both implementations temporarily
const USE_ENGINE = process.env.USE_ENGINE || false;

export default USE_ENGINE ? CrashCourseGameEngine : CrashCourseGameLegacy;
```

## Performance Budget

**Frame Rate**:
- Target: 60fps game rendering
- Minimum: 55fps sustained
- UI updates: 10-15fps (acceptable)

**Load Time**:
- Asset loading: < 3 seconds
- Game initialization: < 500ms

**Memory**:
- No memory leaks during gameplay
- Memory stable over 5-minute session

**Build Size**:
- Code size: < 100KB (minified)
- Assets: Current size acceptable (~10MB total)

## Risk Mitigation

### High-Risk Areas & Mitigations:

**1. Game Loop Extraction (Phase 2)**
- **Risk**: Complex logic, easy to introduce bugs
- **Mitigation**:
  - Thorough unit tests before refactoring
  - Extract incrementally (move one system at a time)
  - Test at each step
  - Use baseline tests to catch regressions

**2. Perseus Integration (Phase 3)**
- **Risk**: Question rendering might break
- **Mitigation**:
  - Keep Perseus integration in React (don't move to engine)
  - Test question answering thoroughly
  - Use existing Perseus test data

**3. Performance Regression (All Phases)**
- **Risk**: Changes might slow down the game
- **Mitigation**:
  - Capture baselines in Phase 0
  - Profile after each phase
  - Use throttling for UI updates
  - Keep game loop pure (no heavy operations)

**4. Asset Loading (Phase 1)**
- **Risk**: Assets might not load after moving
- **Mitigation**:
  - Test asset loading separately
  - Use AssetLoader system with error handling
  - Verify build output includes assets
  - Test in production build mode

## Timeline Estimate

- **Phase 0**: 2-3 hours (testing foundation)
- **Phase 1**: 2-3 hours (setup and architecture)
- **Phase 2**: 5-7 hours (build engine - most complex)
- **Phase 3**: 2-3 hours (UI components)
- **Phase 4**: 2-3 hours (documentation)

**Total**: 13-19 hours of focused work

**Realistic Schedule**:
- Week 1: Phase 0 + Phase 1
- Week 2: Phase 2 (engine extraction)
- Week 3: Phase 3 + Phase 4

Can be compressed or extended based on available time. Natural break points after each phase.

## Benefits of This Approach

### Compared to Original Plan:

**Simpler**:
- ❌ No complex hook dependency management
- ❌ No dual state/ref patterns
- ❌ No React + requestAnimationFrame conflicts
- ✅ Game logic is plain TypeScript
- ✅ Clear separation of concerns

**More Testable**:
- ✅ Can unit test engine without React
- ✅ Can run engine headless
- ✅ Pure functions easy to test
- ✅ Clear interfaces to mock

**Better Performance**:
- ✅ 60fps game loop (not affected by React)
- ✅ UI updates throttled (fewer re-renders)
- ✅ No unnecessary React overhead in game logic

**Future-Proof**:
- ✅ Pattern for future games
- ✅ Systems can be shared across games
- ✅ Clear API for game engines
- ✅ Perseus integration pattern established

## Success Criteria

### Phase 0 Complete:
- [ ] Test infrastructure set up
- [ ] Baseline tests written and passing
- [ ] Performance metrics captured
- [ ] Ready to begin refactoring

### Phase 1 Complete:
- [ ] New directory structure exists
- [ ] All assets moved and organized
- [ ] Engine API designed and typed
- [ ] Original game still works

### Phase 2 Complete:
- [ ] Game engine class implemented
- [ ] All systems extracted (Render, Audio, AssetLoader)
- [ ] Game runs at 60fps
- [ ] Unit tests pass
- [ ] Engine can run headless

### Phase 3 Complete:
- [ ] React component is thin wrapper
- [ ] UI components extracted
- [ ] Perseus integration works
- [ ] All screens functional
- [ ] Game plays identically to original

### Phase 4 Complete:
- [ ] README and documentation complete
- [ ] Code comments added
- [ ] All tests passing
- [ ] Performance meets budget
- [ ] Ready for production

### Overall Success:
- [ ] Game moved to `games/crash-course/`
- [ ] Clean architecture (engine + UI)
- [ ] All tests passing
- [ ] Performance maintained or improved
- [ ] Documentation comprehensive
- [ ] Pattern established for future games
- [ ] No functionality lost
- [ ] Code is maintainable

## Next Steps

After completing this plan:

1. **Review with team** - Get feedback on architecture
2. **Start with Phase 0** - Establish testing foundation
3. **Work incrementally** - Complete each phase fully before moving on
4. **Test thoroughly** - Use baseline tests to catch regressions
5. **Document as you go** - Don't leave documentation for the end

The game engine architecture will make this refactoring cleaner and set a great precedent for future educational games at Khan Academy!
