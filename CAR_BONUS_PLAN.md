# Implementation Plan: Car Bonus Scene

Based on: [CAR_BONUS_CONCEPT.md](./CAR_BONUS_CONCEPT.md)

## Implementation Tasks

1. **Create CarBonusScene component** (`packages/perseus/src/__docs__/car-bonus-scene.tsx`)
   - Functional component with `onComplete` callback prop
   - State management for intact → destroyed → complete
   - Use setTimeout for 3-5 second timing
   - Two car images (before/after)
   - Basic CSS styling (centered, responsive)

2. **Create Storybook story** (`packages/perseus/src/__docs__/car-bonus-scene.stories.tsx`)
   - Demo the standalone component
   - Test timing and transitions in isolation

3. **Integrate into Math Blaster game**
   - Add car bonus scene state to game flow
   - Trigger when lives reach 0
   - Transition: game → car scene → game over screen

4. **Polish**
   - Smooth fade transitions
   - Fine-tune timing
   - Test on different screen sizes
   - Run lint/format/type-check

## Notes

- Start with placeholder images if needed
- Keep it simple - just two images and timing
- Total estimated time: 2-4 hours
