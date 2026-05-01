# Plan: Break Up score-interactive-graph.ts

## Context

`score-interactive-graph.ts` contains a 430-line if-else chain handling 15 graph types. The goal is to extract each graph type's scoring logic into its own `sub-scorers/score-{type}.ts` file (with matching tests), reducing the main file to a thin dispatcher. The `linear` scorer is already extracted as a reference implementation on `break-up-ig-scorer`. Each graph type gets its own PR to keep reviews small.

## Reference Pattern (from score-linear)

**Sub-scorer signature:**
```typescript
export function scoreX(
    userInput: PerseusGraphTypeX,
    rubric: PerseusGraphTypeX,
): PerseusScore
```

- Sub-scorer owns the null-coords check → returns `{type: "invalid", message: null}`
- Main file's dispatch simplifies to: `return scoreX(userInput, rubric.correct)`
- Remove the `userInput.coords != null` guard from the outer `else if` condition in `score-interactive-graph.ts` (the sub-scorer handles it)

**Files created per PR:**
- `packages/perseus-score/src/widgets/interactive-graph/sub-scorers/score-{type}.ts`
- `packages/perseus-score/src/widgets/interactive-graph/sub-scorers/score-{type}.test.ts`

**Critical files to modify:**
- `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts`

**Type imports come from:** `@khanacademy/perseus-core` (e.g. `PerseusGraphTypeLinearSystem`, `PerseusGraphTypeSegment`, etc.)

## PR Order and Details

PRs 1–14 are purely additive — each one only creates new files and does not touch `score-interactive-graph.ts`. PR 15 wires everything up in a single mechanical change to the dispatcher.

### PR 1 — `linear-system`
**Logic (lines 73–97):** Two pairs of collinear checks; accepts lines in either order (swapped).
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, correct (same order), correct (swapped order), incorrect

### PR 2 — `ray`
**Logic (lines 337–354):** Exact match on start point (`guess[0] ≈ correct[0]`) + collinear check on direction point.
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, correct (same direction, different point), incorrect start, incorrect direction

### PR 3 — `segment`
**Logic (lines 320–336):** `deepClone` both, `_.invoke(arr, "sort").sort()` on each, then `approximateDeepEqual`.
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, correct (points in different order), incorrect

### PR 4 — `circle`
**Logic (lines 248–262):** `approximateDeepEqual(center)` + `approximateEqual(radius)`. Circle uses `center`/`radius` fields, not `coords`.
**Invalid:** `userInput.center == null || userInput.radius == null || rubric.center == null || rubric.radius == null`
**Tests:** missing center, missing radius, correct, incorrect center, incorrect radius

### PR 5 — `point`
**Logic (lines 263–289):** Slice both coord arrays, sort, `approximateDeepEqual`. Throws if rubric coords is null.
**Invalid:** `!userInput.coords` (rubric null throws — preserve that behavior)
**Tests:** missing user coords, correct (coords in different order), incorrect

### PR 6 — `vector`
**Logic (lines 411–448):** Two match modes.
- `congruent`: compare `⟨dx, dy⟩` components → `approximateDeepEqual`
- `exact` (default): compare both tail and tip
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, correct exact, incorrect exact, correct congruent (same delta), incorrect congruent (different delta)

### PR 7 — `polygon`
**Logic (lines 290–319):** Four match modes based on `rubric.match`:
- `similar`: `similar(guess, correct, Infinity)`
- `congruent`: `similar(guess, correct, DEFAULT_TOLERANCE)`
- `approx`: `similar(guess, correct, 0.1)`
- default (exact): sort both, `approximateDeepEqual`
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, each of the four match modes (correct + incorrect)

### PR 8 — `angle`
**Logic (lines 355–410):** Most complex — clockwise detection, conditional coord reversal, two match modes.
- Checks if `coords` is null → returns invalid directly
- `areClockwise = clockwise([coords[0], coords[2], coords[1]])`
- If clockwise and `!allowReflexAngles`, reverse coords
- `congruent`: compare `getClockwiseAngle` values with `approximateEqual`
- `exact`: vertex exact + collinear rays
**Invalid:** `!coords` (not `!userInput.coords` — the angle case uses `coords` alias)
**Tests:** missing coords, congruent match (correct + incorrect), exact match (correct + incorrect), reflexAngle variants

### PR 9 — `quadratic`
**Logic (lines 98–115):** `getQuadraticCoefficients` on both, `approximateDeepEqual`.
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, correct, incorrect

### PR 10 — `sinusoid`
**Logic (lines 116–142):** `getSinusoidCoefficients` → `canonicalSineCoefficients` on both, `approximateDeepEqual`.
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, correct, incorrect, correct with canonical equivalence (phase-shifted)

### PR 11 — `tangent`
**Logic (lines 222–247):** `getTangentCoefficients` → `canonicalTangentCoefficients` on both, `approximateDeepEqual`.
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, correct, incorrect, canonical equivalence

### PR 12 — `absolute-value`
**Logic (lines 201–221):** `getAbsoluteValueCoefficients` on both, check `!= undefined`, `approximateDeepEqual`.
**Invalid:** `!userInput.coords || !rubric.coords`
**Tests:** missing coords, correct, incorrect

### PR 13 — `exponential`
**Logic (lines 143–171):** `getExponentialCoefficients(coords, asymptote)` on both; compare `[a, b, c]` arrays.
**Invalid:** `!userInput.coords || userInput.asymptote == null || !rubric.coords || rubric.asymptote == null`
**Tests:** missing coords, missing asymptote, correct, incorrect

### PR 14 — `logarithm`
**Logic (lines 172–200):** Same pattern as exponential using `getLogarithmCoefficients`.
**Invalid:** same as exponential
**Tests:** same shape as exponential

### PR 15 — Hook up all sub-scorers in `score-interactive-graph.ts`
Import all 14 sub-scorers and replace each inline if-else block with a single dispatch call. Result: `score-interactive-graph.ts` reduces to: null-input guard, none-type guard, `hasValue` check, and a flat dispatch to 14 sub-scorer calls.

## Verification

For each PR:
```bash
pnpm --filter perseus-score test  # all tests pass
pnpm tsc                           # no type errors
pnpm lint                          # no lint errors
```

The existing `score-interactive-graph.test.ts` must stay green throughout — it covers the dispatcher behavior and should not be modified.
