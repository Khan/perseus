# Concept: Car Bonus Scene (Game Over Sequence)

## What We're Building

A comedic "bonus level" that plays when the user runs out of lives in the Math Blaster game. Inspired by the Street Fighter 2 car-smashing bonus level, but with a twist: the car self-destructs without any user interaction. It's a quick visual gag that serves as a humorous transition to the game over screen.

## Why

- **Add personality**: Makes the game over experience more memorable and fun
- **Reduce frustration**: Lightens the mood when players lose all their lives
- **Homage**: A playful reference to a classic video game moment
- **Polish**: Adds a unique touch that makes the Math Blaster game feel more complete

## Key Components

1. **Car Bonus Scene Component**: A new React component that displays the car sequence
   - Shows intact car (initial state)
   - Transitions to destroyed car (imploded state)
   - Simple two-frame "animation" (before → after)

2. **Transition Logic**: Integration into existing game flow
   - Triggered when lives reach zero
   - Smoothly transitions from main game to car scene
   - After completion, proceeds to existing game over screen

3. **Visual Assets**: Two car images
   - Before: Intact car
   - After: Imploded/destroyed car

4. **Timing System**: Controls the sequence duration
   - Total duration: 3-5 seconds
   - Possible breakdown:
     - Show intact car: ~1-2 seconds
     - Implode transition: ~0.5 seconds
     - Show destroyed car: ~1-2 seconds
   - Optional: Brief shake/anticipation effect before implode

## How It Works (High Level)

**User Flow:**

1. Player is playing an endless runner type game with math questions
2. Player loses their last life
3. Game transitions to car bonus scene
4. Car appears intact on screen
5. Brief pause (build anticipation)
6. Car suddenly implodes (image switches from before → after)
7. Brief pause (appreciate the destruction)
8. Transition to existing game over screen

**No user interaction required** - it's a passive, timed sequence.

## Technical Considerations

- **React Component**: Create a self-contained component for the car scene
- **State Management**: Needs to know when game is over (lives === 0)
- **Timing**: Use CSS transitions or React state + setTimeout for image swap
- **Assets**: Need to source/create the two car images (before/after)
- **Integration Point**: Hook into existing game over logic in Math Blaster
- **Storybook Story**: Create a story to demo and test the sequence in isolation

## Success Criteria

- [ ] Car bonus scene triggers when player runs out of lives
- [ ] Sequence displays intact car, then destroyed car
- [ ] Total duration is 3-5 seconds
- [ ] After sequence completes, game over screen appears
- [ ] Transition feels smooth and polished
- [ ] Works in Storybook for easy demonstration
- [ ] Visual gag lands (it's funny!)
- [ ] No user interaction required (truly passive)

## Open Questions

- Should there be sound effects? (Currently not planned, but could add later)
- Do we want any text on screen during the sequence? (e.g., "BONUS!" or "NICE TRY!")
- Should there be any particle effects or additional visual polish?
- What should the background look like? (Solid color, street scene, etc.)
