# Phase 0: Testing Foundation & Performance Baselines

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Establish testing infrastructure and capture current performance metrics BEFORE making any changes.

## Why This Phase is Critical

The subagent review identified "No Testing Strategy" as the #1 critical issue. Without baseline tests and performance metrics, we have no way to verify the refactored game works identically to the original. This phase addresses that risk.

## Tasks

### Task 1: Set Up Test Infrastructure
- **What**: Configure Jest/Vitest for testing the game
- **Why**: Need test runner before writing tests
- **Implementation notes**:
  - Check if Perseus already has test setup
  - If not, add minimal test configuration
  - Install @testing-library/react if needed
  - Ensure tests can import from games/crash-course
- **Files affected**:
  - Check: `package.json`, `jest.config.js` or `vitest.config.ts`
  - Possibly add test config if missing
- **Acceptance criteria**:
  - Can run `pnpm test` successfully
  - Test runner finds test files
  - Can import game code in tests

### Task 2: Create Gameplay Snapshot Tests
- **What**: Write tests that capture current game behavior
- **Why**: Verify refactored game behaves identically
- **Implementation notes**:
  - Test game state transitions (start → story → playing → end)
  - Test obstacle spawning logic
  - Test collision detection (when does player lose life?)
  - Test question generation (all 4 types)
  - Test scoring logic
  - Use snapshot testing where appropriate
- **Files affected**:
  - New: `packages/perseus/src/__docs__/math-blaster-game.test.tsx`
  - New: `packages/perseus/src/__docs__/math-blaster-utils.test.ts`
- **Acceptance criteria**:
  - At least 10 baseline tests written
  - All tests passing
  - Cover critical game logic
  - Can re-run after refactoring

**Example tests:**
```typescript
describe("Math Blaster Game (Baseline)", () => {
    describe("Game State Transitions", () => {
        it("starts in 'start' state", () => {
            const {container} = render(<MathBlasterGame />);
            expect(container.querySelector('.startScreen')).toBeInTheDocument();
        });

        it("transitions to story after clicking start", async () => {
            const user = userEvent.setup();
            const {container} = render(<MathBlasterGame />);
            await user.click(screen.getByAltText('Start Game'));
            expect(container.querySelector('.storyScreen')).toBeInTheDocument();
        });
    });

    describe("Obstacle Generation", () => {
        it("creates obstacle with question", () => {
            const obstacle = createObstacle(800);
            expect(obstacle).toHaveProperty('id');
            expect(obstacle).toHaveProperty('question');
            expect(obstacle).toHaveProperty('x', 800);
            expect(obstacle).toHaveProperty('answered', false);
        });

        it("generates all 4 question types eventually", () => {
            const types = new Set();
            for (let i = 0; i < 100; i++) {
                const obstacle = createObstacle(800);
                const content = obstacle.question.question.content;
                if (content.includes('+')) types.add('addition');
                if (content.includes('-')) types.add('subtraction');
                if (content.includes('\\times')) types.add('multiplication');
                if (content.includes('\\div')) types.add('division');
            }
            expect(types.size).toBe(4);
        });
    });

    describe("Collision Detection", () => {
        it("detects collision when obstacle reaches collision zone", () => {
            // Test collision logic
            const obstacleX = 100;
            const obstacleWidth = 154;
            const collisionZoneX = 120;
            const characterX = 100;

            const isInZone = obstacleX < collisionZoneX &&
                             obstacleX + obstacleWidth > characterX;
            expect(isInZone).toBe(true);
        });
    });
});
```

### Task 3: Capture Performance Baselines
- **What**: Measure current game performance (FPS, load time, memory)
- **Why**: Verify refactor doesn't regress performance
- **Implementation notes**:
  - Use Chrome DevTools Performance tab
  - Record 30-second gameplay session
  - Measure FPS (should be ~60fps)
  - Measure memory usage
  - Measure asset load time
  - Document findings in a baseline file
- **Files affected**:
  - New: `PERFORMANCE_BASELINE.md` (documentation)
- **Acceptance criteria**:
  - FPS measured and documented
  - Memory usage captured
  - Load time measured
  - Have numbers to compare against later

**Baseline document template:**
```markdown
# Performance Baseline - Crash Course Game

## Test Environment
- Browser: Chrome 120
- Date: 2025-01-XX
- Build: Development mode
- Device: [Your device specs]

## Measurements

### Frame Rate
- Average FPS: 58-60 fps
- Minimum FPS: 55 fps (during heavy scenes)
- Frame time: 16-17ms

### Load Time
- Asset loading: 2.1 seconds
- Game initialization: 320ms
- Time to interactive: 2.5 seconds

### Memory
- Initial: 45MB
- After 1 minute: 52MB
- After 5 minutes: 58MB
- Memory stable (no major leaks)

### CPU Usage
- Idle: 2-5%
- During gameplay: 15-25%
- Spikes during spawning: up to 35%

## Notes
- Performance good on modern machines
- Some frame drops when multiple obstacles on screen
- Asset loading could be optimized
```

### Task 4: Document Current Behavior
- **What**: Write down how the game currently works
- **Why**: Reference for verifying refactored game
- **Implementation notes**:
  - Document game mechanics (lives, scoring, alien abduction)
  - Document edge cases (what happens when out of lives?)
  - Document audio behavior (when music changes)
  - Document visual effects (shake, cool mode, benevolence message)
  - Screenshot each game state
- **Files affected**:
  - New: `ORIGINAL_BEHAVIOR.md` (documentation)
- **Acceptance criteria**:
  - All game mechanics documented
  - Screenshots of each state
  - Edge cases noted
  - Can use as checklist after refactoring

### Task 5: Create Test Utilities
- **What**: Build helper functions for testing the game
- **Why**: Make writing tests easier
- **Implementation notes**:
  - Mock canvas context
  - Mock audio elements
  - Helper to advance game time
  - Helper to spawn obstacles
  - Helper to simulate answers
- **Files affected**:
  - New: `packages/perseus/src/__docs__/__test-utils__/game-test-utils.ts`
- **Acceptance criteria**:
  - Utilities make testing easier
  - Can mock expensive operations (canvas, audio)
  - Reusable across test files

**Example utilities:**
```typescript
// __test-utils__/game-test-utils.ts
export function mockCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = {
        clearRect: jest.fn(),
        drawImage: jest.fn(),
        fillRect: jest.fn(),
        // ... other canvas methods
    };
    canvas.getContext = jest.fn(() => ctx as any);
    return canvas;
}

export function mockAudio(): HTMLAudioElement {
    const audio = {
        play: jest.fn().mockResolvedValue(undefined),
        pause: jest.fn(),
        currentTime: 0,
        volume: 1,
        // ... other audio properties
    };
    return audio as any;
}

export function advanceGameTime(ms: number) {
    jest.advanceTimersByTime(ms);
}
```

### Task 6: Test Visual Regression (Optional)
- **What**: Capture screenshots of current game for visual comparison
- **Why**: Verify refactored game looks identical
- **Implementation notes**:
  - Use Storybook + Chromatic (if available)
  - Or manually capture screenshots
  - Save screenshots of: start screen, story pages, gameplay, victory, game over
- **Files affected**:
  - Screenshots saved in `__test-data__/screenshots/`
- **Acceptance criteria**:
  - Screenshots of all game states
  - Can compare visually after refactoring

### Task 7: Create Test Data
- **What**: Save example Perseus questions for testing
- **Why**: Consistent test data for question rendering
- **Implementation notes**:
  - Generate examples of each question type (addition, subtraction, etc.)
  - Save as TypeScript constants
  - Use in tests for consistency
- **Files affected**:
  - New: `packages/perseus/src/__docs__/__testdata__/questions.testdata.ts`
- **Acceptance criteria**:
  - Example questions for all 4 types
  - Can import in tests
  - Realistic Perseus item format

**Example:**
```typescript
// __testdata__/questions.testdata.ts
import type {PerseusItem} from "@khanacademy/perseus-core";

export const additionQuestion: PerseusItem = {
    question: {
        content: "What is $12 + 8$?\n\n[[☃ numeric-input 1]]",
        images: {},
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                options: {
                    answers: [{value: 20, status: "correct"}],
                },
                // ... full widget definition
            },
        },
    },
    // ... rest of PerseusItem
};

export const divisionQuestion: PerseusItem = { /* ... */ };
// etc.
```

### Task 8: Add Continuous Integration Tests
- **What**: Ensure tests run in CI pipeline
- **Why**: Catch regressions automatically
- **Implementation notes**:
  - Verify tests run in Perseus CI
  - If not, add test step to CI config
  - Ensure tests fail CI if they don't pass
- **Files affected**:
  - Check: `.github/workflows/` or CI config
- **Acceptance criteria**:
  - Tests run automatically on commits
  - CI fails if tests fail
  - Can see test results in pull requests

## Testing Considerations

### What to Test:
- ✅ Game state transitions
- ✅ Obstacle spawning and movement
- ✅ Collision detection
- ✅ Question generation (all types)
- ✅ Scoring logic
- ✅ Life system
- ✅ Timer/victory condition
- ✅ Perseus widget integration

### What NOT to Test (yet):
- ❌ Canvas rendering output (hard to test, verify manually)
- ❌ Audio playback (test mocking is enough)
- ❌ Specific sprite positions (too fragile)
- ❌ Animation frame timing (hard to test reliably)

### Testing Philosophy:
- Focus on **behavior**, not implementation
- Test **what the user experiences**, not internal state
- Make tests **resilient to refactoring**
- Keep tests **fast** (mock expensive operations)

## Deliverables

After this phase, you should have:
1. ✅ Test infrastructure configured
2. ✅ 10+ baseline tests written and passing
3. ✅ Performance baselines documented
4. ✅ Current behavior documented
5. ✅ Test utilities created
6. ✅ Visual regression baseline (optional)
7. ✅ Test data for Perseus questions
8. ✅ CI integration verified

## Benefits

- **Confidence**: Can refactor knowing tests will catch regressions
- **Documentation**: Tests document current behavior
- **Performance**: Have numbers to compare against
- **Speed**: Test utilities make future tests faster to write
- **Safety net**: Can experiment knowing tests will catch breaks

## Time Estimate

- Test setup: 30 minutes
- Baseline tests: 1-1.5 hours
- Performance baselines: 30 minutes
- Documentation: 30 minutes
- Test utilities: 30 minutes

**Total: 2-3 hours**

## Success Criteria

- [ ] Test runner configured and working
- [ ] At least 10 baseline tests written
- [ ] All baseline tests passing
- [ ] Performance baselines captured and documented
- [ ] Current behavior documented with screenshots
- [ ] Test utilities created
- [ ] Test data saved
- [ ] CI runs tests automatically
- [ ] Ready to begin refactoring with confidence

---

**After this phase**, you can begin refactoring knowing you have a safety net to catch regressions!
