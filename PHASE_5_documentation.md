# Phase 5: Documentation and Polish

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Add comprehensive documentation, finalize naming, verify everything works, and clean up.

## Tasks

### Task 1: Create Main README
- **What**: Write comprehensive README for the crash-course game
- **Why**: Documents purpose, architecture, how to run, and how to extend
- **Implementation notes**:
  - Create README.md in games/crash-course/
  - Include: overview, features, how to play, architecture, development guide
  - Add ASCII architecture diagram
  - Link to Perseus documentation
  - Document known issues/limitations
- **Files affected**:
  - New: `games/crash-course/README.md`
- **Acceptance criteria**:
  - README covers all key aspects
  - Clear instructions for developers
  - Architecture diagram included
  - Well-formatted and readable

**README Outline:**
```markdown
# Crash Course

An educational endless runner game demonstrating Perseus widget integration.

## Overview
[What it is, purpose, proof of concept status]

## Features
[List of game features]

## How to Play
[User instructions]

## How to Run
[Developer instructions]

## Architecture
[Component breakdown, data flow, hooks]
[ASCII diagram]

## Project Structure
[Directory tree with explanations]

## Key Technologies
[React, Perseus, Canvas, etc.]

## Development Guide
[How to modify, extend, debug]

## Testing
[How to test]

## Known Issues
[Current limitations]

## Future Enhancements
[Ideas for improvement]

## Credits
[Asset sources, music credits]
```

### Task 2: Add JSDoc Comments to Functions
- **What**: Add JSDoc documentation to all exported functions and hooks
- **Why**: Improves discoverability and IDE support
- **Implementation notes**:
  - Document all exported functions in utils/
  - Document all custom hooks
  - Include: description, parameters, return values, examples
  - Use TypeScript types in JSDoc
- **Files affected**:
  - Modified: All files in `games/crash-course/utils/`
  - Modified: All files in `games/crash-course/hooks/`
  - Modified: `games/crash-course/components/` files
- **Acceptance criteria**:
  - All public APIs documented
  - JSDoc shows in IDE tooltips
  - Examples included where helpful

**Example:**
```typescript
/**
 * Calculates the character's Y position during a jump using a parabolic arc.
 *
 * The jump follows a sine wave pattern for smooth, natural-looking motion.
 *
 * @param startTime - When the jump started (timestamp)
 * @param currentTime - Current time (timestamp)
 * @param groundY - Y coordinate of the ground
 * @param jumpHeight - Maximum height of the jump in pixels
 * @param jumpDuration - Total duration of the jump in milliseconds
 * @returns Object containing the current Y position and whether jump is complete
 *
 * @example
 * ```typescript
 * const {y, isComplete} = calculateJumpY(
 *   Date.now() - 500,  // Started 500ms ago
 *   Date.now(),
 *   450,  // Ground at y=450
 *   140,  // Jump 140 pixels high
 *   1000  // 1 second total
 * );
 * ```
 */
export function calculateJumpY(
    startTime: number,
    currentTime: number,
    groundY: number,
    jumpHeight: number,
    jumpDuration: number,
): {y: number; isComplete: boolean} {
    // Implementation
}
```

### Task 3: Add Inline Code Comments
- **What**: Add explanatory comments for complex logic
- **Why**: Makes code easier to understand and maintain
- **Implementation notes**:
  - Add comments for non-obvious logic
  - Explain "why" not "what" (code shows what)
  - Document complex algorithms (jump physics, collision detection)
  - Explain magic numbers if any remain
  - Add TODO comments for known issues
- **Files affected**:
  - Modified: All TypeScript files with complex logic
- **Acceptance criteria**:
  - Complex sections have explanatory comments
  - Code intent is clear
  - Future maintainers can understand logic

**Example:**
```typescript
// Calculate parabolic jump arc using sine wave for smooth motion.
// Progress goes from 0 to 1 over JUMP_DURATION, sine gives us
// smooth acceleration at start/end of jump.
const progress = jumpProgress / JUMP_DURATION;
const jumpHeight = Math.sin(progress * Math.PI) * JUMP_HEIGHT;
const newY = GROUND_Y - jumpHeight;
```

### Task 4: Document Component Props
- **What**: Add comments/documentation for complex component props
- **Why**: Makes components easier to use
- **Implementation notes**:
  - Add JSDoc to component prop types
  - Document callback signatures
  - Explain non-obvious prop requirements
  - Add usage examples in comments
- **Files affected**:
  - Modified: All files in `games/crash-course/components/`
- **Acceptance criteria**:
  - All props documented
  - Callback signatures clear
  - Components easy to use

**Example:**
```typescript
/**
 * Props for the QuestionOverlay component.
 */
type QuestionOverlayProps = {
    /** The current obstacle/question to display */
    obstacle: Obstacle;

    /**
     * Remaining distance in pixels before collision.
     * Used to calculate timer bar progress.
     */
    remainingDistance: number;

    /**
     * Callback fired when user clicks "Check Answer".
     * Should validate the answer and update game state.
     */
    onCheckAnswer: () => void;

    /**
     * Feedback to display after answer submission.
     * If show is false, no feedback is displayed.
     */
    answerFeedback: {
        show: boolean;
        correct: boolean;
        message: string;
    };
};
```

### Task 5: Update Storybook Story Documentation
- **What**: Enhance the Storybook story with controls and documentation
- **Why**: Makes the demo more interactive and informative
- **Implementation notes**:
  - Update story metadata with detailed description
  - Add Storybook controls for configurable parameters (if applicable)
  - Add links to source code
  - Document how to use in Storybook
- **Files affected**:
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Story has detailed description
  - Controls work (if applicable)
  - Easy to explore in Storybook

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

An endless runner game showcasing Perseus widget integration in an educational gaming context.

## Features
- **Educational Content**: Integrates real Perseus math questions
- **Progressive Difficulty**: Questions spawn every 5 seconds
- **Time-Based Challenge**: Survive for 5 minutes to win
- **Multiple Question Types**: Addition, subtraction, multiplication, division
- **Dynamic Animations**: Parallax backgrounds, alien behaviors, character states
- **Story Mode**: 7-page narrative introduction

## Technical Highlights
- Canvas-based rendering at 60fps
- Custom React hooks for game logic
- Perseus ServerItemRenderer integration
- Audio management with multiple tracks
- Complex state management

## How to Play
1. Click "Start" on the title screen
2. Watch the story sequence
3. Answer math questions to jump over obstacles
4. Survive until midnight (5 minutes) to win

## Architecture
See /games/crash-course/README.md for detailed architecture documentation.
                `,
            },
        },
        layout: "fullscreen",
    },
};
```

### Task 6: Add Architecture Diagram
- **What**: Create ASCII art or diagram showing component relationships
- **Why**: Visual aid for understanding the system
- **Implementation notes**:
  - Create clear ASCII diagram
  - Show data flow
  - Show component hierarchy
  - Include in README and code comments
- **Files affected**:
  - Modified: `games/crash-course/README.md`
- **Acceptance criteria**:
  - Diagram is clear and accurate
  - Shows key relationships
  - Easy to understand

**Example:**
```
┌─────────────────────────────────────────────────────────────┐
│                     CrashCourseGame                         │
│                   (Main Orchestrator)                       │
└─────────────┬───────────────────────────────────────────────┘
              │
    ┌─────────┼─────────┬──────────┬──────────┬──────────┐
    │         │         │          │          │          │
    ▼         ▼         ▼          ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Sprite  │ │Audio   │ │Game    │ │Game    │ │Character│ │Obstacle│
│Loader  │ │Manager │ │Timer   │ │Loop    │ │State   │ │Manager │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
                                      │
                        ┌─────────────┼─────────────┐
                        ▼             ▼             ▼
                    ┌────────┐   ┌────────┐   ┌────────┐
                    │Drawing │   │Physics │   │Collision│
                    │Utils   │   │Utils   │   │Detection│
                    └────────┘   └────────┘   └────────┘

Game State Flow:
START → STORY (7 pages) → PLAYING → [VICTORY | CAR_BONUS → GAMEOVER]
```

### Task 7: Document Known Issues and Limitations
- **What**: Create a list of current limitations and technical debt
- **Why**: Transparency about what needs improvement
- **Implementation notes**:
  - List performance limitations
  - Document browser compatibility issues
  - Note areas that could be improved
  - Explain proof-of-concept limitations
- **Files affected**:
  - Modified: `games/crash-course/README.md`
  - New: `games/crash-course/TECHNICAL_DEBT.md` (optional)
- **Acceptance criteria**:
  - Known issues documented
  - Workarounds noted
  - Future work identified

**Example:**
```markdown
## Known Issues

### Performance
- Game loop may stutter on older devices (requires 60fps)
- Large number of obstacles can impact performance
- No frame-skipping or adaptive quality

### Browser Compatibility
- Requires HTML5 Canvas support
- Audio autoplay blocked until user interaction
- Not tested in all browsers

### Accessibility
- No keyboard-only navigation
- Screen reader support limited
- No visual settings (contrast, motion reduction)

### Mobile
- Not optimized for touch controls
- On-screen keyboard may cover game area
- Performance varies significantly

### Technical Debt
- Some duplicate state/ref patterns remain (performance trade-offs)
- Game loop could be further optimized
- Asset loading could use better error handling
- No unit tests yet
```

### Task 8: Add Development Guide
- **What**: Document how to modify and extend the game
- **Why**: Helps future developers work on the codebase
- **Implementation notes**:
  - Explain how to add new question types
  - Document how to modify game parameters
  - Show how to add new screens/states
  - Explain testing approach
- **Files affected**:
  - Modified: `games/crash-course/README.md`
- **Acceptance criteria**:
  - Common modifications documented
  - Extension points identified
  - Examples provided

**Example:**
```markdown
## Development Guide

### Adding a New Question Type

1. Add generator function in `crash-course-utils.ts`:
```typescript
function generateNewTypeQuestion(): PerseusItem {
    // Create Perseus item
}
```

2. Update `generateQuestion()` to include new type:
```typescript
const types = ["addition", "subtraction", "multiplication", "division", "newType"];
```

### Modifying Game Parameters

All game parameters are in `constants.ts`. Common modifications:

- **Game Speed**: Adjust `PHYSICS.SCROLL_SPEED`
- **Difficulty**: Adjust `GAME_CONFIG.OBSTACLE_SPAWN_INTERVAL`
- **Game Length**: Adjust `GAME_CONFIG.DURATION`

### Adding a New Screen

1. Create component in `components/NewScreen.tsx`
2. Add state to GameState type: `type GameState = ... | "newScreen"`
3. Add rendering in main component:
```typescript
{gameState === "newScreen" && <NewScreen onComplete={handleComplete} />}
```
```

### Task 9: Verify All Naming is Consistent
- **What**: Final pass to ensure no "math-blaster" references remain
- **Why**: Professional polish, consistency
- **Implementation notes**:
  - Search codebase for "math-blaster", "mathblaster", "MathBlaster"
  - Update any remaining references to "crash-course", "CrashCourse"
  - Check comments, variable names, class names
  - Update any console.log statements
- **Files affected**:
  - Any files with remaining old naming
- **Acceptance criteria**:
  - No "math-blaster" references
  - Consistent "crash-course" naming throughout
  - Professional appearance

### Task 10: Final Testing and Cleanup
- **What**: Comprehensive testing and code cleanup
- **Why**: Ensure everything works before completion
- **Implementation notes**:
  - Full playthrough of the game
  - Test all screens and transitions
  - Verify assets load correctly
  - Check audio playback
  - Run linting: `pnpm lint`
  - Run type checking: `pnpm tsc`
  - Test in Storybook
  - Remove any commented-out code
  - Remove debug/console.log statements
  - Remove unused imports
- **Files affected**:
  - All files in `games/crash-course/`
- **Acceptance criteria**:
  - Game works perfectly
  - No console errors
  - Lint passes
  - Type check passes
  - No debug code remains
  - Code is clean and professional

### Task 11: Create Migration Guide
- **What**: Document the changes made during refactoring
- **Why**: Helps team understand what changed
- **Implementation notes**:
  - Summarize major changes
  - Document new file structure
  - Note breaking changes (if any)
  - Provide before/after comparisons
- **Files affected**:
  - New: `games/crash-course/MIGRATION.md`
- **Acceptance criteria**:
  - Changes clearly documented
  - Team can understand refactoring
  - Before/after comparisons included

**Example:**
```markdown
# Migration Guide

This document summarizes the refactoring from math-blaster to crash-course.

## What Changed

### File Organization
- **Before**: All files in `packages/perseus/src/__docs__/`
- **After**: Organized in `packages/perseus/src/games/crash-course/`

### Component Structure
- **Before**: 1 monolithic 1673-line file
- **After**: 20+ focused files with clear responsibilities

### Asset Organization
- **Before**: 40+ assets scattered in `__docs__/`
- **After**: Assets organized in subdirectories by type

### State Management
- **Before**: 30+ state variables, 20+ refs, heavy duplication
- **After**: Consolidated state with hooks and reducer pattern

## File Mapping

| Old Location | New Location |
|--------------|--------------|
| `__docs__/math-blaster-game.stories.tsx` | `games/crash-course/crash-course.stories.tsx` |
| `__docs__/math-blaster-utils.ts` | `games/crash-course/crash-course-utils.ts` |
| ... | ... |

## Breaking Changes

None - this is an internal refactoring. The Storybook story moved from "Math Blaster Game" to "Games/Crash Course".
```

### Task 12: Optional - Clean Up Original Files
- **What**: Remove old files from __docs__ once verified
- **Why**: Prevent confusion, clean up codebase
- **Implementation notes**:
  - **ONLY DO THIS AFTER PHASE 5 IS COMPLETE AND TESTED**
  - Delete math-blaster files from __docs__
  - Delete asset files that were moved
  - Update any references
  - Commit as separate change
- **Files affected**:
  - Deleted: All math-blaster files in `__docs__/`
  - Deleted: All moved asset files
- **Acceptance criteria**:
  - Old files removed
  - No broken references
  - Game still works
  - Git history preserved (if using git mv)

## Technical Details

### Documentation Standards

Follow these guidelines:
- Use Markdown for all documentation
- Keep paragraphs short (3-4 sentences max)
- Use code examples liberally
- Include visual diagrams where helpful
- Link between documents
- Use proper heading hierarchy
- Include table of contents for long docs

### JSDoc Standards

```typescript
/**
 * Brief one-line description.
 *
 * Longer description if needed. Can span multiple lines.
 * Explain the "why" and important context.
 *
 * @param paramName - Description of parameter
 * @param anotherParam - Another description
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 *
 * @example
 * ```typescript
 * // Usage example
 * const result = functionName(arg1, arg2);
 * ```
 *
 * @see {@link RelatedFunction} for related functionality
 */
```

## Testing Considerations

After this phase:
1. **Documentation Review**: Have someone else read the docs
2. **Final Playthrough**: Complete game session
3. **Storybook Check**: Verify story displays correctly
4. **Build Verification**: `pnpm build` succeeds
5. **Link Checking**: All documentation links work

## Benefits After This Phase

- Comprehensive documentation for future developers
- Clear understanding of system architecture
- Easy to onboard new contributors
- Professional, polished codebase
- Clear path for future enhancements
- Well-documented APIs and components
- Project is "complete" and ready for use/extension

## Project Completion Checklist

- [ ] Main README created and comprehensive
- [ ] All public APIs have JSDoc documentation
- [ ] Complex logic has inline comments
- [ ] Component props documented
- [ ] Storybook story enhanced
- [ ] Architecture diagram included
- [ ] Known issues documented
- [ ] Development guide written
- [ ] All naming consistent (no "math-blaster")
- [ ] Full testing completed successfully
- [ ] Migration guide created
- [ ] Original files cleaned up (optional)
- [ ] Lint passes
- [ ] Type check passes
- [ ] Game works perfectly in Storybook
- [ ] Team review completed
- [ ] Ready for production use
