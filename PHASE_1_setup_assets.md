# Phase 1: Setup and Asset Organization

**Part of**: [CRASH_COURSE_IMPLEMENTATION_PLAN.md](./CRASH_COURSE_IMPLEMENTATION_PLAN.md)

**Goal**: Create the new directory structure and organize all 40+ asset files into proper subdirectories with consistent naming.

## Tasks

### Task 1: Create Directory Structure
- **What**: Set up the new `games/crash-course/` folder hierarchy
- **Why**: Establishes the foundation for all subsequent work
- **Implementation notes**:
  - Create base directory at `packages/perseus/src/games/crash-course/`
  - Create asset subdirectories for organization
  - Create placeholder files to prevent empty directory issues
- **Files affected**:
  - New: `packages/perseus/src/games/crash-course/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/sprites/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/backgrounds/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/ui/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/audio/` (directory)
  - New: `packages/perseus/src/games/crash-course/assets/story/` (directory)
- **Acceptance criteria**:
  - Directory structure exists
  - All asset subdirectories created
  - Structure follows Perseus conventions

### Task 2: Move and Organize Sprite Assets
- **What**: Move character, alien, and car sprites to the sprites folder
- **Why**: Groups related visual assets together
- **Implementation notes**:
  - Move character animation frames (run1-6, impact, idle)
  - Move alien sprites (alien1-3)
  - Move car sprites (car1-2)
  - Move special effects (beam)
  - Keep original names or use kebab-case consistently
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
  - No duplicate files remain in __docs__

### Task 3: Move and Organize Background Assets
- **What**: Move parallax layers and environment graphics
- **Why**: Separates background elements from interactive sprites
- **Implementation notes**:
  - Move sky, city layers, and ground elements
  - Move street lamp and lamp light
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
  - Logical organization by depth/layer

### Task 4: Move and Organize UI Assets
- **What**: Move buttons, screens, and UI elements
- **Why**: Keeps user interface assets separate from game graphics
- **Implementation notes**:
  - Move all button images (start, next, mute, unmute)
  - Move screen images (title, victory, lose)
  - Move bonus scene images
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

### Task 5: Move and Organize Story Assets
- **What**: Move all 7 story page images
- **Why**: Keeps narrative content separate and organized
- **Implementation notes**:
  - Move story1 through story7 images
  - Keep sequential naming for easy identification
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

### Task 6: Move and Organize Audio Assets
- **What**: Move all audio files (.ogg)
- **Why**: Separates audio from visual assets
- **Implementation notes**:
  - Move all 4 audio files
  - Consider renaming for clarity (optional)
- **Files affected**:
  - Move from: `packages/perseus/src/__docs__/*.ogg`
  - Move to: `packages/perseus/src/games/crash-course/assets/audio/`
  - Specific files:
    - `alexbouncymix2.ogg` → `audio/menu-theme.ogg` (or keep original name)
    - `Zodik - Tedox.ogg` → `audio/game-theme-1.ogg` (or keep original)
    - `Zodik - Neon Owl.ogg` → `audio/game-theme-2.ogg` (or keep original)
    - `Game Over II.ogg` → `audio/game-over-theme.ogg` (or keep original)
- **Acceptance criteria**:
  - All audio files moved
  - Names are clear and descriptive

### Task 7: Move TypeScript/CSS Files
- **What**: Move the game components and utilities to the new location
- **Why**: Consolidates all game code in one place
- **Implementation notes**:
  - Move main story file, utils, CSS, and car bonus scene
  - Rename files from "math-blaster" to "crash-course"
  - Update internal references
- **Files affected**:
  - Move and rename:
    - `__docs__/math-blaster-game.stories.tsx` → `games/crash-course/crash-course.stories.tsx`
    - `__docs__/math-blaster-game.module.css` → `games/crash-course/crash-course.module.css`
    - `__docs__/math-blaster-utils.ts` → `games/crash-course/crash-course-utils.ts`
    - `__docs__/car-bonus-scene.tsx` → `games/crash-course/car-bonus-scene.tsx`
    - `__docs__/car-bonus-scene.module.css` → `games/crash-course/car-bonus-scene.module.css`
    - `__docs__/car-bonus-scene.stories.tsx` → `games/crash-course/car-bonus-scene.stories.tsx` (or delete if not needed)
- **Acceptance criteria**:
  - All code files in games/crash-course/
  - Consistent "crash-course" naming
  - No "math-blaster" references in filenames

### Task 8: Update Import Paths in Main Component
- **What**: Update all asset import statements to point to new locations
- **Why**: Make the code work after moving assets
- **Implementation notes**:
  - Update image imports to use new asset paths
  - Update audio imports to use new paths
  - Update relative imports for CSS and utilities
  - Search for `from "./` and update paths
- **Files affected**:
  - `games/crash-course/crash-course.stories.tsx` (main file)
  - `games/crash-course/car-bonus-scene.tsx`
- **Acceptance criteria**:
  - All imports resolve correctly
  - No import errors when building
  - TypeScript doesn't complain

### Task 9: Update Import Paths in CarBonusScene
- **What**: Update asset imports in the CarBonusScene component
- **Why**: Ensure CarBonusScene works after asset reorganization
- **Implementation notes**:
  - Update any image imports (bonus1, bonus2, skid)
  - Update CSS import path if needed
- **Files affected**:
  - `games/crash-course/car-bonus-scene.tsx`
- **Acceptance criteria**:
  - CarBonusScene imports work
  - No broken image references

### Task 10: Update Storybook Story Metadata
- **What**: Change Storybook title and component references
- **Why**: Make it appear under "Games" section with correct name
- **Implementation notes**:
  - Change `title: "Games/Crash Course"` in story metadata
  - Update component name references
  - Update description to reflect new name
- **Files affected**:
  - `games/crash-course/crash-course.stories.tsx`
- **Acceptance criteria**:
  - Story appears under "Games" in Storybook
  - Title is "Crash Course" not "Math Blaster"
  - Description is accurate

## Technical Details

### Import Path Examples

**Before (in __docs__):**
```typescript
import run1Img from "./run1.png";
import styles from "./math-blaster-game.module.css";
```

**After (in games/crash-course/):**
```typescript
import run1Img from "./assets/sprites/run1.png";
import styles from "./crash-course.module.css";
```

### Directory Structure Result
```
packages/perseus/src/games/crash-course/
├── assets/
│   ├── sprites/
│   │   ├── run1.png
│   │   ├── run2.png
│   │   ├── run3.png
│   │   ├── run4.png
│   │   ├── run5.png
│   │   ├── run6.png
│   │   ├── impact.png
│   │   ├── idle.png
│   │   ├── alien1.png
│   │   ├── alien2.png
│   │   ├── alien3.png
│   │   ├── car1.png
│   │   ├── car2.png
│   │   └── beam.png
│   ├── backgrounds/
│   │   ├── sky.png
│   │   ├── city-far.png
│   │   ├── city-semi-far.png
│   │   ├── city-semi-close.png
│   │   ├── city-close.png
│   │   ├── streetlamp.png
│   │   └── lamplight.png
│   ├── ui/
│   │   ├── title.png
│   │   ├── start.png
│   │   ├── next.png
│   │   ├── mute.png
│   │   ├── unmute.png
│   │   ├── victory.png
│   │   ├── lose.png
│   │   ├── bonus1.png
│   │   ├── bonus2.png
│   │   └── skid.png
│   ├── story/
│   │   ├── story1.png
│   │   ├── story2.png
│   │   ├── story3.png
│   │   ├── story4.png
│   │   ├── story5.png
│   │   ├── story6.png
│   │   └── story7.png
│   └── audio/
│       ├── menu-theme.ogg (or original name)
│       ├── game-theme-1.ogg
│       ├── game-theme-2.ogg
│       └── game-over-theme.ogg
├── crash-course.stories.tsx (main game component)
├── crash-course.module.css
├── crash-course-utils.ts
├── car-bonus-scene.tsx
└── car-bonus-scene.module.css
```

## Testing Considerations

After this phase:
1. **Build Check**: Run `pnpm tsc` - should have no errors
2. **Lint Check**: Run `pnpm lint` - should pass
3. **Storybook Check**:
   - Run `pnpm storybook`
   - Navigate to "Games/Crash Course"
   - Verify game loads and displays start screen
   - All images should load correctly
   - Audio should be available (test mute button)

## Potential Issues

### Import Resolution
- **Issue**: Webpack/Vite may need configuration to resolve asset imports
- **Mitigation**: Perseus likely already configured for this, but verify
- **How to detect**: Build errors about unresolved imports

### Asset Loading
- **Issue**: Some assets might not load if paths are incorrect
- **Mitigation**: Systematic testing of each screen
- **How to detect**: Console errors, broken images in Storybook

### File System Case Sensitivity
- **Issue**: macOS is case-insensitive but Linux is case-sensitive
- **Mitigation**: Use consistent casing (lowercase with hyphens)
- **How to detect**: Works locally but fails in CI

### Git History
- **Issue**: Moving files loses git history
- **Mitigation**: Use `git mv` instead of regular `mv` to preserve history
- **How to detect**: Check `git log --follow` on moved files
