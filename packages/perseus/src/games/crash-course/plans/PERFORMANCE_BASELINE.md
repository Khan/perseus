# Performance Baseline - Crash Course Game

## Test Environment

- **Browser**: Chrome 131
- **Date**: 2025-01-07
- **Build**: Development mode (Storybook)
- **Device**: [To be filled in when measuring]
- **OS**: macOS 24.5.0 (Darwin)

## How to Measure

### Frame Rate (FPS)
1. Open Storybook: `pnpm storybook`
2. Navigate to Games > Crash Course
3. Open Chrome DevTools (F12)
4. Go to Performance tab
5. Click "Record" button
6. Start the game and play for 30 seconds
7. Stop recording
8. Check the FPS chart for:
   - Average FPS
   - Minimum FPS
   - Frame time (should be ~16-17ms for 60fps)

### Load Time
1. Open Performance tab before loading page
2. Start recording
3. Refresh page
4. Stop when game is interactive
5. Check timeline for:
   - Asset loading time
   - JavaScript execution time
   - Time to interactive

### Memory Usage
1. Open Chrome DevTools Memory tab
2. Take heap snapshot before starting game
3. Play game for 1 minute
4. Take another snapshot
5. Play for 5 minutes total
6. Take final snapshot
7. Compare memory growth

### CPU Usage
1. Use Activity Monitor (macOS) or Task Manager (Windows)
2. Monitor Chrome Helper process
3. Record CPU % during:
   - Idle (game loaded but not started)
   - Active gameplay
   - Heavy scenes (alien abduction, multiple obstacles)

## Measurements (To Be Filled)

### Frame Rate

```
Average FPS: ___ fps (target: 58-60)
Minimum FPS: ___ fps (should stay above 55)
Frame time: ___ ms (target: 16-17ms)
Frame drops: ___ (count any drops below 50fps)
```

**Notes:**
- When do frame drops occur? (e.g., alien abduction, multiple animations)
- Are frame rates consistent throughout 5-minute gameplay?

### Load Time

```
Asset loading: ___ seconds
- Image assets: ___ seconds
- Audio assets: ___ seconds

JavaScript execution: ___ ms
Game initialization: ___ ms
Time to interactive: ___ seconds (total)
```

**Notes:**
- Which assets take longest to load?
- Is there any blocking during load?

### Memory Usage

```
Initial (game loaded): ___ MB
After 1 minute: ___ MB
After 5 minutes: ___ MB
Memory growth rate: ___ MB/minute

Peak memory: ___ MB
Memory stable: Yes/No
```

**Notes:**
- Are there memory leaks?
- Does memory keep growing or stabilize?
- Check for leaked listeners or intervals

### CPU Usage

```
Idle (game loaded): ___ %
During gameplay: ___ %
Peak CPU (heavy scenes): ___ %

Average over 5 minutes: ___ %
```

**Notes:**
- Is CPU usage reasonable?
- Any unexpected spikes?

### Network

```
Total asset size: ___ MB
Number of requests: ___
Caching: ___ (describe caching behavior)
```

## Performance Bottlenecks to Watch

### Potential Issues

1. **Canvas Drawing**
   - Multiple sprites drawn each frame
   - Parallax layers (5 layers)
   - Character animation (6 frames)
   - Are draw calls optimized?

2. **State Management**
   - 30+ state variables
   - Frequent setState calls
   - Dual state/ref pattern
   - Could cause unnecessary re-renders

3. **Game Loop**
   - requestAnimationFrame + React
   - Mixing game loop with React rendering
   - Potential timing issues

4. **Asset Loading**
   - 30+ images loaded on mount
   - 4 audio files
   - Sequential vs parallel loading?

5. **Audio Management**
   - Multiple audio tracks
   - Transitions between tracks
   - Memory usage of audio buffers

6. **Perseus Widget Rendering**
   - ServerItemRenderer re-rendering
   - Question widget complexity
   - Math rendering (MathJax)

## Comparison Points for After Refactoring

After refactoring to game engine architecture, we expect:

**Improvements:**
- ✅ More consistent frame rate (engine at 60fps, React throttled)
- ✅ Lower CPU usage (less React re-rendering)
- ✅ Better memory stability (cleaner lifecycle)
- ✅ Faster initialization (optimized asset loading)

**Should maintain:**
- ✅ Same visual quality
- ✅ Same responsiveness
- ✅ Same load time (or better)

**Accept if:**
- Frame rate stays 55-60fps
- No significant memory leaks
- Load time under 3 seconds
- Gameplay feels smooth

## Notes

- Test in both development and production builds
- Test on different machines (if possible)
- Test with browser extensions disabled
- Clear cache between tests for consistency

---

**Fill in measurements before starting refactoring to establish baseline.**
