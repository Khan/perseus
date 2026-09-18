# Phase 3: Extract UI Components & Wire Up

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Create React components for UI overlays and connect them to the game engine.

**Estimated Effort**: 2-3 hours

## Overview

Now that the engine is working, we build the React wrapper. This phase is much simpler than the original plan because the engine handles all game logic. React becomes a thin UI layer that:
- Renders canvas for the engine
- Shows UI overlays (screens, HUD, questions)
- Calls engine methods in response to user actions

The engine runs at 60fps, React updates at 10-15fps when UI state changes.

## Tasks

### Task 1: Create Main Component Wrapper
- **What**: Build the main CrashCourseGame component that wraps the engine
- **Why**: Connects React to the engine
- **Implementation notes**:
  - Create ref for canvas element
  - Create engine instance in useEffect
  - Initialize engine and start it
  - Listen for UI state updates
  - Clean up on unmount
  - Render canvas + UI overlays based on state
- **Files affected**:
  - New: `games/crash-course/CrashCourseGame.tsx` (replaces .stories.tsx main component)
  - Modified: `games/crash-course/crash-course.stories.tsx` (just exports the component now)
- **Acceptance criteria**:
  - Engine initializes and starts
  - Canvas renders
  - UI state updates trigger re-renders
  - Engine stops on unmount
  - No memory leaks

**Example structure:**
```typescript
// games/crash-course/CrashCourseGame.tsx

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import {CrashCourseEngine} from "./engine/CrashCourseEngine";
import type {GameUIState} from "./engine/types";
import styles from "./crash-course.module.css";

// UI components (will create in subsequent tasks)
import {StartScreen} from "./components/StartScreen";
import {StoryScreen} from "./components/StoryScreen";
import {HUD} from "./components/HUD";
import {QuestionOverlay} from "./components/QuestionOverlay";
import {VictoryScreen} from "./components/VictoryScreen";
import {GameOverScreen} from "./components/GameOverScreen";
import {MuteButton} from "./components/MuteButton";
import {BenevolenceMessage} from "./components/BenevolenceMessage";
import {CarBonusScene} from "./car-bonus-scene";

/**
 * Crash Course - An endless runner educational game.
 *
 * Integrates Perseus widgets with game mechanics.
 * Players answer math questions to jump over obstacles.
 */
export const CrashCourseGame = (): React.ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<CrashCourseEngine | null>(null);

    const [uiState, setUIState] = useState<GameUIState | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize engine
    useEffect(() => {
        if (!canvasRef.current) return;

        const engine = new CrashCourseEngine({
            canvas: canvasRef.current,
            onUIUpdate: setUIState,
            muted: isMuted,
        });

        engineRef.current = engine;

        // Initialize and start engine
        engine.init().then(() => {
            setIsLoading(false);
            engine.start();
        });

        // Cleanup
        return () => {
            engine.stop();
            engineRef.current = null;
        };
    }, []);

    // Handle mute toggle
    const handleToggleMute = () => {
        setIsMuted(!isMuted);
        engineRef.current?.toggleMute();
    };

    // Handle answer submission from QuestionOverlay
    const handleCheckAnswer = (correct: boolean, points: number) => {
        engineRef.current?.submitAnswer(correct, points);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!uiState) {
        return <div>Initializing...</div>;
    }

    return (
        <View>
            <div className={styles.gameContainer}>
                {/* Canvas - engine draws here */}
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className={styles.gameCanvas}
                />

                {/* Mute button - always visible */}
                <MuteButton
                    isMuted={isMuted}
                    onToggle={handleToggleMute}
                />

                {/* Start screen */}
                {uiState.gameState === "start" && (
                    <StartScreen
                        onStart={() => engineRef.current?.startStory()}
                    />
                )}

                {/* Story screen */}
                {uiState.gameState === "story" && (
                    <StoryScreen
                        page={uiState.storyPage}
                        onNext={() => engineRef.current?.nextStoryPage()}
                    />
                )}

                {/* Playing state - HUD and question */}
                {uiState.gameState === "playing" && (
                    <>
                        <HUD
                            score={uiState.score}
                            lives={uiState.lives}
                            gameTime={uiState.gameTime}
                        />

                        {uiState.currentQuestion && (
                            <QuestionOverlay
                                question={uiState.currentQuestion}
                                onCheckAnswer={handleCheckAnswer}
                            />
                        )}

                        {uiState.showBenevolence && <BenevolenceMessage />}
                    </>
                )}

                {/* Car bonus scene */}
                {uiState.gameState === "carBonus" && (
                    <CarBonusScene
                        onComplete={() => {
                            // Engine will transition to gameover
                        }}
                    />
                )}

                {/* Victory screen */}
                {uiState.gameState === "victory" && (
                    <VictoryScreen
                        score={uiState.score}
                        onPlayAgain={() => engineRef.current?.startStory()}
                    />
                )}

                {/* Game over screen */}
                {uiState.gameState === "gameover" && (
                    <GameOverScreen
                        score={uiState.score}
                        onPlayAgain={() => engineRef.current?.startStory()}
                    />
                )}
            </div>
        </View>
    );
};
```

---

### Task 2: Create StartScreen Component
- **What**: Title screen with start button
- **Why**: Clean separation of UI concerns
- **Implementation notes**:
  - Display title image
  - Show start button
  - Handle click to start
  - Use existing CSS styles
- **Files affected**:
  - New: `games/crash-course/components/StartScreen.tsx`
- **Acceptance criteria**:
  - Renders title correctly
  - Start button triggers callback
  - Styling preserved

**Example:**
```typescript
// games/crash-course/components/StartScreen.tsx

import * as React from "react";
import titleImg from "../assets/ui/title.png";
import startImg from "../assets/ui/start.png";
import styles from "../crash-course.module.css";

type StartScreenProps = {
    onStart: () => void;
};

export const StartScreen = ({onStart}: StartScreenProps): React.ReactElement => {
    return (
        <div className={styles.startScreen}>
            <img
                src={titleImg}
                alt="Crash Course"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />
            <img
                src={startImg}
                alt="Start Game"
                onClick={onStart}
                className={styles.startButton}
            />
        </div>
    );
};
```

---

### Task 3: Create StoryScreen Component
- **What**: Story page viewer with navigation
- **Why**: Separates story UI from game logic
- **Implementation notes**:
  - Display current story page image
  - Show next button (or start button on page 7)
  - Handle navigation
  - Use existing CSS styles
- **Files affected**:
  - New: `games/crash-course/components/StoryScreen.tsx`
- **Acceptance criteria**:
  - Shows correct story page
  - Next button works
  - Final page shows start button
  - Images load correctly

**Example:**
```typescript
// games/crash-course/components/StoryScreen.tsx

import * as React from "react";
import styles from "../crash-course.module.css";

// Import all story images
import story1Img from "../assets/story/story1.png";
import story2Img from "../assets/story/story2.png";
import story3Img from "../assets/story/story3.png";
import story4Img from "../assets/story/story4.png";
import story5Img from "../assets/story/story5.png";
import story6Img from "../assets/story/story6.png";
import story7Img from "../assets/story/story7.png";
import nextImg from "../assets/ui/next.png";
import startImg from "../assets/ui/start.png";

const STORY_IMAGES = [
    story1Img,
    story2Img,
    story3Img,
    story4Img,
    story5Img,
    story6Img,
    story7Img,
];

type StoryScreenProps = {
    page: number; // 1-7
    onNext: () => void;
};

export const StoryScreen = ({page, onNext}: StoryScreenProps): React.ReactElement => {
    const storyImg = STORY_IMAGES[page - 1];
    const isLastPage = page === 7;
    const buttonImg = isLastPage ? startImg : nextImg;
    const buttonAlt = isLastPage ? "Start" : "Next";

    return (
        <div className={styles.storyScreen}>
            <img
                src={storyImg}
                alt={`Story page ${page}`}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
            />
            <img
                src={buttonImg}
                alt={buttonAlt}
                onClick={onNext}
                className={styles.storyNextButton}
            />
        </div>
    );
};
```

---

### Task 4: Create HUD Component
- **What**: Heads-up display showing score, time, lives
- **Why**: Clean UI component for gameplay info
- **Implementation notes**:
  - Display score
  - Display formatted game time
  - Display lives as alien emojis
  - Background gradient
  - Use existing CSS styles
- **Files affected**:
  - New: `games/crash-course/components/HUD.tsx`
- **Acceptance criteria**:
  - All info displays correctly
  - Lives show/fade appropriately
  - Background gradient applies
  - Positioning correct

**Example:**
```typescript
// games/crash-course/components/HUD.tsx

import * as React from "react";
import styles from "../crash-course.module.css";

type HUDProps = {
    score: number;
    lives: number;
    gameTime: string;
};

export const HUD = ({score, lives, gameTime}: HUDProps): React.ReactElement => {
    return (
        <>
            <div className={styles.hudBackground} />
            <div className={styles.hud}>
                <div className={styles.gameTime}>{gameTime}</div>

                <div className={styles.score}>Score: {score}</div>

                <div className={styles.lives}>
                    <span>Alien Benevolence:</span>
                    <span className={lives > 0 ? styles.alien : `${styles.alien} ${styles.alienLost}`}>
                        👽
                    </span>
                    <span className={lives > 1 ? styles.alien : `${styles.alien} ${styles.alienLost}`}>
                        👽
                    </span>
                    <span className={lives > 2 ? styles.alien : `${styles.alien} ${styles.alienLost}`}>
                        👽
                    </span>
                </div>
            </div>
        </>
    );
};
```

---

### Task 5: Create QuestionOverlay Component
- **What**: Perseus question renderer with timer and check button
- **Why**: Handles Perseus widget integration
- **Implementation notes**:
  - Render Perseus question using ServerItemRenderer
  - Timer bar (visual only, engine tracks actual time)
  - Check answer button
  - Answer feedback display
  - Score answer using Perseus scoring
  - Pass result to engine
- **Files affected**:
  - New: `games/crash-course/components/QuestionOverlay.tsx`
- **Acceptance criteria**:
  - Perseus widget renders
  - Check answer works
  - Scoring works
  - Feedback displays
  - Engine receives result

**Example:**
```typescript
// games/crash-course/components/QuestionOverlay.tsx

import * as React from "react";
import {useRef, useState} from "react";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {ServerItemRenderer} from "../server-item-renderer";
import {storybookDependenciesV2} from "../../../../testing/test-dependencies";

import type {PerseusItem} from "@khanacademy/perseus-core";
import styles from "../crash-course.module.css";

type QuestionOverlayProps = {
    question: PerseusItem;
    onCheckAnswer: (correct: boolean, points: number) => void;
};

export const QuestionOverlay = ({
    question,
    onCheckAnswer,
}: QuestionOverlayProps): React.ReactElement => {
    const itemRendererRef = useRef<ServerItemRenderer>(null);
    const [feedback, setFeedback] = useState<{
        show: boolean;
        correct: boolean;
        message: string;
    }>({show: false, correct: false, message: ""});

    const handleCheck = () => {
        const userInput = itemRendererRef.current?.getUserInput();
        if (!userInput) return;

        try {
            const result = scorePerseusItem(question.question, userInput, "en");

            const isCorrect =
                result.type === "points" &&
                result.earned === result.total &&
                result.earned > 0;

            const points = result.type === "points" ? result.earned : 0;

            if (isCorrect) {
                setFeedback({
                    show: true,
                    correct: true,
                    message: "Correct! 🎉",
                });

                // Notify engine
                onCheckAnswer(true, points);

                // Clear feedback after delay
                setTimeout(() => {
                    setFeedback({show: false, correct: false, message: ""});
                }, 1000);
            } else {
                setFeedback({
                    show: true,
                    correct: false,
                    message:
                        result.type === "invalid"
                            ? "Please enter an answer!"
                            : "Try again! You can keep answering until you get it right!",
                });
            }
        } catch (error) {
            console.error("Error scoring answer:", error);
        }
    };

    // Handle Enter key
    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleCheck();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <div className={styles.questionOverlay}>
            <ServerItemRenderer
                ref={itemRendererRef}
                item={question}
                dependencies={storybookDependenciesV2}
                problemNum={0}
                apiOptions={{isMobile: false}}
            />

            <button className={styles.checkButton} onClick={handleCheck}>
                Check Answer
            </button>

            {feedback.show && (
                <div
                    className={
                        feedback.correct
                            ? `${styles.feedback} ${styles.feedbackCorrect}`
                            : `${styles.feedback} ${styles.feedbackIncorrect}`
                    }
                >
                    {feedback.message}
                </div>
            )}
        </div>
    );
};
```

---

### Task 6: Create VictoryScreen Component
- **What**: Victory screen with play again button
- **Why**: Clean victory UI
- **Implementation notes**:
  - Display victory image
  - Show final score
  - Play again button
  - Use existing CSS styles
- **Files affected**:
  - New: `games/crash-course/components/VictoryScreen.tsx`
- **Acceptance criteria**:
  - Victory image displays
  - Score displays
  - Play again works

---

### Task 7: Create GameOverScreen Component
- **What**: Game over screen with play again button
- **Why**: Clean game over UI
- **Implementation notes**:
  - Display lose image
  - Show final score
  - Play again button
  - Use existing CSS styles
- **Files affected**:
  - New: `games/crash-course/components/GameOverScreen.tsx`
- **Acceptance criteria**:
  - Game over image displays
  - Score displays
  - Play again works

---

### Task 8: Create MuteButton Component
- **What**: Mute/unmute toggle button
- **Why**: Simple reusable component
- **Implementation notes**:
  - Display mute or unmute icon
  - Toggle on click
  - Always visible
- **Files affected**:
  - New: `games/crash-course/components/MuteButton.tsx`
- **Acceptance criteria**:
  - Correct icon shows
  - Click toggles mute
  - Positioning preserved

**Example:**
```typescript
// games/crash-course/components/MuteButton.tsx

import * as React from "react";
import muteImg from "../assets/ui/mute.png";
import unmuteImg from "../assets/ui/unmute.png";
import styles from "../crash-course.module.css";

type MuteButtonProps = {
    isMuted: boolean;
    onToggle: () => void;
};

export const MuteButton = ({isMuted, onToggle}: MuteButtonProps): React.ReactElement => {
    return (
        <img
            src={isMuted ? muteImg : unmuteImg}
            alt={isMuted ? "Unmute" : "Mute"}
            onClick={onToggle}
            className={styles.muteButton}
        />
    );
};
```

---

### Task 9: Create BenevolenceMessage Component
- **What**: "BENEVOLENCE" message animation
- **Why**: Shows when alien saves player
- **Implementation notes**:
  - Display text with animation
  - Auto-hide after 2 seconds
  - Use CSS animation
- **Files affected**:
  - New: `games/crash-course/components/BenevolenceMessage.tsx`
- **Acceptance criteria**:
  - Message displays
  - Animation plays
  - Auto-hides

**Example:**
```typescript
// games/crash-course/components/BenevolenceMessage.tsx

import * as React from "react";
import styles from "../crash-course.module.css";

export const BenevolenceMessage = (): React.ReactElement => {
    return <div className={styles.benevolenceMessage}>BENEVOLENCE</div>;
};
```

---

### Task 10: Create Components Index
- **What**: Barrel export for all components
- **Why**: Clean imports in main component
- **Implementation notes**:
  - Export all components from index.ts
  - Simplifies imports
- **Files affected**:
  - New: `games/crash-course/components/index.ts`
- **Acceptance criteria**:
  - All components exported
  - Can import from components/

**Example:**
```typescript
// games/crash-course/components/index.ts

export {StartScreen} from "./StartScreen";
export {StoryScreen} from "./StoryScreen";
export {HUD} from "./HUD";
export {QuestionOverlay} from "./QuestionOverlay";
export {VictoryScreen} from "./VictoryScreen";
export {GameOverScreen} from "./GameOverScreen";
export {MuteButton} from "./MuteButton";
export {BenevolenceMessage} from "./BenevolenceMessage";
```

---

### Task 11: Update Storybook Story
- **What**: Update story file to use new component
- **Why**: Keep Storybook working
- **Implementation notes**:
  - Import CrashCourseGame component
  - Export as default story
  - Update metadata if needed
- **Files affected**:
  - Modified: `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Story exports component
  - Works in Storybook
  - Title is "Games/Crash Course"

**Example:**
```typescript
// games/crash-course/crash-course.stories.tsx

import type {Meta, StoryObj} from "@storybook/react-vite";
import {CrashCourseGame} from "./CrashCourseGame";

const meta: Meta<typeof CrashCourseGame> = {
    title: "Games/Crash Course",
    component: CrashCourseGame,
    parameters: {
        docs: {
            description: {
                component: "Educational endless runner with Perseus question integration.",
            },
        },
        layout: "fullscreen",
    },
};

export default meta;

type Story = StoryObj<typeof CrashCourseGame>;

export const Default: Story = {};
```

---

### Task 12: Test Full Game Flow
- **What**: Play through entire game to verify everything works
- **Why**: Integration testing
- **Implementation notes**:
  - Start game
  - Go through story
  - Play game
  - Answer questions
  - Verify all screens
  - Check audio
  - Test mute
- **Files affected**:
  - N/A (testing task)
- **Acceptance criteria**:
  - Full game flow works
  - All screens display
  - Questions work
  - Audio works
  - No console errors
  - Game plays identically to original

---

### Task 13: Remove Old Files (Optional)
- **What**: Remove original files from __docs__ now that new version works
- **Why**: Clean up, avoid confusion
- **Implementation notes**:
  - **ONLY do this if new version is fully working**
  - Delete math-blaster files from __docs__
  - Keep one commit that can be reverted if needed
- **Files affected**:
  - Deleted: `__docs__/math-blaster-game.stories.tsx`
  - Deleted: `__docs__/math-blaster-utils.ts`
  - Deleted: `__docs__/math-blaster-game.module.css`
  - Deleted: (assets already moved in Phase 1)
- **Acceptance criteria**:
  - Old files removed
  - New version works
  - Can rollback if needed

---

## Component Structure After This Phase

```
games/crash-course/
├── components/
│   ├── StartScreen.tsx           (~30 lines)
│   ├── StoryScreen.tsx           (~40 lines)
│   ├── HUD.tsx                   (~40 lines)
│   ├── QuestionOverlay.tsx       (~100 lines)
│   ├── VictoryScreen.tsx         (~30 lines)
│   ├── GameOverScreen.tsx        (~30 lines)
│   ├── MuteButton.tsx            (~20 lines)
│   ├── BenevolenceMessage.tsx    (~10 lines)
│   └── index.ts                  (~10 lines)
├── CrashCourseGame.tsx           (~150 lines)
├── crash-course.stories.tsx      (~20 lines)
└── ... (engine files from Phase 2)
```

---

## Testing Considerations

After this phase:
1. **Visual Testing**: All screens display correctly
2. **Interaction Testing**: Buttons and input work
3. **Perseus Integration**: Questions render and score correctly
4. **Audio**: Music plays, transitions work, mute works
5. **Performance**: Still 60fps, no jank
6. **Baseline Tests**: Compare against Phase 0 tests

---

## Benefits After This Phase

- ✅ **Clean React components** - Each screen is separate
- ✅ **Thin wrapper** - Main component is < 200 lines
- ✅ **Perseus integration works** - Questions render and score
- ✅ **Game fully playable** - All functionality restored
- ✅ **Performance good** - 60fps maintained
- ✅ **Maintainable** - Clear separation of concerns

---

## Next Phase

**Phase 4**: Add documentation, verify tests pass, finalize everything.

The refactoring is almost complete! 🎉
