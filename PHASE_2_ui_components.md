# Phase 2: Extract UI Components

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Break out all screen and overlay components from the monolithic 1673-line file into separate, focused components.

## Tasks

### Task 1: Create Types File
- **What**: Extract all TypeScript types and interfaces into a shared types file
- **Why**: Allows components to import types without circular dependencies
- **Implementation notes**:
  - Create `types.ts` in crash-course directory
  - Export all game-related types: GameState, CharacterState, SpriteFrame, Obstacle
  - Import from crash-course-utils if needed
- **Files affected**:
  - New: `games/crash-course/types.ts`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - All types exported from central location
  - No type duplication between files
  - TypeScript compilation succeeds

### Task 2: Extract StartScreen Component
- **What**: Create standalone StartScreen component
- **Why**: Reduces main file by ~50 lines, makes start screen independently testable
- **Implementation notes**:
  - Extract JSX from gameState === "start" block
  - Accept props: imagesLoaded, titleImage, startButton, onStart
  - Handle loading state internally
  - Apply styles from crash-course.module.css
- **Files affected**:
  - New: `games/crash-course/components/StartScreen.tsx`
  - Modified: `games/crash-course/crash-course.stories.tsx` (remove inline JSX)
- **Acceptance criteria**:
  - StartScreen renders independently
  - Start button click triggers callback
  - Loading state displayed correctly
  - Images load properly

### Task 3: Extract StoryScreen Component
- **What**: Create standalone StoryScreen component with page navigation
- **Why**: Isolates story functionality, makes it reusable
- **Implementation notes**:
  - Extract JSX from gameState === "story" block
  - Accept props: currentPage (1-7), storyImages, nextButton, startButton, onNext
  - Handle page transitions
  - Show appropriate button (next vs start) based on page
- **Files affected**:
  - New: `games/crash-course/components/StoryScreen.tsx`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Story pages display correctly
  - Page navigation works
  - Final page shows start button
  - Images load for all 7 pages

### Task 4: Extract GameOverScreen Component
- **What**: Create standalone game over screen component
- **Why**: Separates end state UI from main game logic
- **Implementation notes**:
  - Extract JSX from gameState === "gameover" block
  - Accept props: loseImage, startButton, onPlayAgain
  - Simple presentation component
- **Files affected**:
  - New: `games/crash-course/components/GameOverScreen.tsx`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Game over screen displays
  - Play again button works
  - Styling preserved

### Task 5: Extract VictoryScreen Component
- **What**: Create standalone victory screen component
- **Why**: Separates victory UI from main game
- **Implementation notes**:
  - Extract JSX from gameState === "victory" block
  - Accept props: victoryImage, startButton, onPlayAgain
  - Simple presentation component
- **Files affected**:
  - New: `games/crash-course/components/VictoryScreen.tsx`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Victory screen displays
  - Play again button works
  - Styling preserved

### Task 6: Extract HUD Component
- **What**: Create heads-up display component showing score, time, lives
- **Why**: Separates UI overlay from game canvas logic
- **Implementation notes**:
  - Extract JSX from gameState === "playing" HUD blocks
  - Accept props: score, gameTime, lives
  - Include the HUD background gradient
  - Self-contained styling
- **Files affected**:
  - New: `games/crash-course/components/HUD.tsx`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - HUD displays all info correctly
  - Lives indicators show/fade properly
  - Background gradient applies
  - Positioning correct

### Task 7: Extract QuestionOverlay Component
- **What**: Create component for displaying Perseus questions with timer
- **Why**: Complex component deserves its own file, easier to maintain
- **Implementation notes**:
  - Extract JSX from Question Overlay block (lines ~1396-1481)
  - Accept props: obstacle, remainingDistance, onCheckAnswer, answerFeedback
  - Include timer bar logic and calculation
  - Include ServerItemRenderer integration
  - Forward ref to itemRenderer
- **Files affected**:
  - New: `games/crash-course/components/QuestionOverlay.tsx`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Questions display correctly
  - Timer bar animates properly
  - Check answer button works
  - Feedback displays correctly
  - Perseus integration maintained

### Task 8: Extract MuteButton Component
- **What**: Create simple mute/unmute button component
- **Why**: Reusable UI element, simple extraction
- **Implementation notes**:
  - Extract JSX from mute button block
  - Accept props: isMuted, muteImage, unmuteImage, onToggle
  - Simple presentational component
- **Files affected**:
  - New: `games/crash-course/components/MuteButton.tsx`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Button displays correct icon
  - Click toggles mute state
  - Positioning preserved
  - Hover effects work

### Task 9: Extract BenevolenceMessage Component
- **What**: Create component for "BENEVOLENCE" message animation
- **Why**: Self-contained animation, can be reused
- **Implementation notes**:
  - Extract JSX from benevolenceMessage block
  - Accept props: show (boolean)
  - Handle animation automatically when shown
  - Include CSS animation
- **Files affected**:
  - New: `games/crash-course/components/BenevolenceMessage.tsx`
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Message displays when triggered
  - Animation plays correctly
  - Fades out after 2 seconds
  - Centered properly

### Task 10: Create Components Directory and Index
- **What**: Organize all components in a subdirectory with barrel export
- **Why**: Clean imports, clear organization
- **Implementation notes**:
  - Create `games/crash-course/components/` directory
  - Move all component files into components/
  - Create `index.ts` with re-exports
  - Update imports in main file
- **Files affected**:
  - New: `games/crash-course/components/index.ts`
  - All component files moved to components/
  - Modified: `games/crash-course/crash-course.stories.tsx` (update imports)
- **Acceptance criteria**:
  - All components in components/ folder
  - Barrel export works
  - Main file imports simplified

### Task 11: Update Main Component to Use Extracted Components
- **What**: Replace inline JSX with component imports
- **Why**: Dramatically reduces main file size
- **Implementation notes**:
  - Replace each game state's inline JSX with component usage
  - Pass appropriate props to each component
  - Maintain existing behavior
  - Verify callbacks work correctly
- **Files affected**:
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Main file reduced by 400-500 lines
  - All screens still work
  - No functionality lost
  - Props passed correctly

## Technical Details

### Component Props Pattern

**Example: StartScreen**
```typescript
// components/StartScreen.tsx
import * as React from "react";
import styles from "../crash-course.module.css";

type StartScreenProps = {
    imagesLoaded: boolean;
    titleImage?: HTMLImageElement;
    startButton?: HTMLImageElement;
    onStart: () => void;
};

export const StartScreen = ({
    imagesLoaded,
    titleImage,
    startButton,
    onStart,
}: StartScreenProps): React.ReactElement => {
    if (!imagesLoaded) {
        return (
            <div className={styles.startScreen}>
                <p>Loading sprites...</p>
            </div>
        );
    }

    return (
        <div className={styles.startScreen}>
            {titleImage && (
                <img
                    src={titleImage.src}
                    alt="Grand Khan Auto"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
            )}
            {startButton && (
                <img
                    src={startButton.src}
                    alt="Start Game"
                    onClick={onStart}
                    className={styles.startButton}
                />
            )}
        </div>
    );
};
```

### Barrel Export Pattern

**components/index.ts**
```typescript
export {StartScreen} from "./StartScreen";
export {StoryScreen} from "./StoryScreen";
export {GameOverScreen} from "./GameOverScreen";
export {VictoryScreen} from "./VictoryScreen";
export {HUD} from "./HUD";
export {QuestionOverlay} from "./QuestionOverlay";
export {MuteButton} from "./MuteButton";
export {BenevolenceMessage} from "./BenevolenceMessage";
```

### Usage in Main Component

**Before:**
```typescript
{gameState === "start" && (
    <div className={styles.startScreen}>
        {!imagesLoaded && <p>Loading sprites...</p>}
        {imagesLoaded && (/* 20+ lines of JSX */)}
    </div>
)}
```

**After:**
```typescript
import {StartScreen} from "./components";

{gameState === "start" && (
    <StartScreen
        imagesLoaded={imagesLoaded}
        titleImage={spriteImagesRef.current.get("title")}
        startButton={spriteImagesRef.current.get("start")}
        onStart={startGame}
    />
)}
```

## Component Organization

```
games/crash-course/
├── components/
│   ├── StartScreen.tsx          (~40 lines)
│   ├── StoryScreen.tsx          (~50 lines)
│   ├── GameOverScreen.tsx       (~35 lines)
│   ├── VictoryScreen.tsx        (~35 lines)
│   ├── HUD.tsx                  (~60 lines)
│   ├── QuestionOverlay.tsx      (~120 lines)
│   ├── MuteButton.tsx           (~25 lines)
│   ├── BenevolenceMessage.tsx   (~20 lines)
│   └── index.ts                 (~10 lines)
├── crash-course.stories.tsx     (now ~1200 lines, down from 1673)
└── ...
```

## Testing Considerations

After this phase:
1. **Visual Testing**: Each component should display correctly in Storybook
2. **Interaction Testing**:
   - Start screen → Story → Game → End screens flow
   - Buttons trigger correct callbacks
   - Question overlay displays and accepts answers
   - HUD updates correctly
3. **Regression Testing**: Game plays identically to before

## Potential Issues

### Prop Drilling
- **Issue**: May need to pass many props through components
- **Mitigation**: Use composition, consider context for deeply nested state
- **How to detect**: Components with 10+ props

### Ref Forwarding
- **Issue**: QuestionOverlay needs ref to ServerItemRenderer
- **Mitigation**: Use React.forwardRef properly
- **How to detect**: getUserInput() calls fail

### CSS Module Scope
- **Issue**: Components need access to parent CSS module
- **Mitigation**: Import from parent, or create component-specific styles
- **How to detect**: Missing styles in components

### State Management
- **Issue**: Components need access to game state
- **Mitigation**: Pass state as props, prepare for Phase 4 refactor
- **How to detect**: Components can't access needed state

## Benefits After This Phase

- Main component reduced from 1673 to ~1200 lines
- 8 new reusable, testable components
- Clearer separation of concerns
- Easier to understand code structure
- Individual components can be documented/tested
- Foundation for Phase 3 (logic extraction)
