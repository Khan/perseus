# Absolute Value Graph — Interactive Graph Widget

## Overview

The absolute value graph type adds support for `f(x) = m * |x - h| + v` to the Interactive
Graph widget. Learners interact with the graph by dragging two movable control points: the
vertex and a point on one arm. Content creators can configure the correct answer, starting
positions, and axis settings in the editor.

The implementation follows the patterns established by the sinusoid graph type throughout:
state management, rendering, scoring, and editor support all mirror the sinusoid structure
as closely as possible.

### Learner Experience

- An absolute value graph renders as a V-shape using two movable control points
- The curve updates in real time as either point is dragged
- Both upward-opening (`m > 0`) and downward-opening (`m < 0`) orientations are supported
- Keyboard navigation works on both points (arrow keys move by snap step, skipping invalid positions)
- Screen reader announces the graph label and point positions
- The widget renders correctly on mobile

### Content Creator Experience

- "Absolute value" appears in the Interactive Graph editor's answer type dropdown
- The editor displays the equation in the format `y = m|x - h| + v`
- Control points can be dragged in the editor to set the correct answer
- Start coordinates are configurable (where points appear before the learner interacts)
- Switching away from absolute value and back preserves graph state

## Mathematical Model

The absolute value curve uses the form:

```
f(x) = m * |x - h| + v
```

Where:
- `h` = horizontal offset (x-coordinate of the vertex) = `p1[x]`
- `v` = vertical offset (y-coordinate of the vertex) = `p1[y]`
- `m` = slope of each arm, computed from the two control points

### Two-Point Definition

- `p1` = vertex of the V (the corner/apex)
- `p2` = any point on one arm (determines slope and direction)

**Coefficient extraction** (see `getAbsoluteValueCoefficients` in `absolute-value.tsx`):

```
denom = p2[x] - p1[x]
num   = p2[y] - p1[y]

m = |num / denom|
if (p2[y] < p1[y]) m = -m

h = p1[x]
v = p1[y]
```

`Math.abs` on the raw slope ensures that placing `p2` on either side of the vertex does not
affect the slope magnitude — only the sign of `m` (open up vs. open down) matters.

### Constraint

`p2[x]` cannot equal `p1[x]` — that would make `denom = 0` and leave the coefficients
undefined. Keyboard movement skips any position that would cause this.

### Scoring

Two absolute value graphs are equal if `[m, h, v]` all match within floating-point tolerance.
No canonical normalization is required — the vertex `(h, v)` uniquely defines the graph's
position and `m` uniquely defines its shape and orientation. Scoring uses
`approximateDeepEqual` following the sinusoid pattern.

## Key Files

| File | Role |
|------|------|
| `graphs/absolute-value.tsx` | Rendering, coefficient extraction, keyboard constraints, screen reader descriptions |
| `graphs/absolute-value.test.tsx` | Unit tests for the component and `getAbsoluteValueCoefficients` |
| `reducer/initialize-graph-state.ts` | `getAbsoluteValueCoords()` — default and start coordinate logic |
| `reducer/interactive-graph-reducer.ts` | `movePoint` action with same-x constraint |
| `reducer/interactive-graph-state.ts` | `getGradableGraph()` branch mapping state → `PerseusGraphTypeAbsoluteValue` |
| `mafs-state-to-interactive-graph.ts` | Live equation string mapping |
| `packages/perseus-core/src/data-schema.ts` | `PerseusGraphTypeAbsoluteValue` type |
| `packages/perseus/src/widgets/interactive-graphs/types.ts` | `AbsoluteValueGraphState` |
| `packages/perseus-score/.../score-interactive-graph.ts` | Scoring branch |
| `packages/perseus-editor/.../graph-type-selector.tsx` | "Absolute value" dropdown option |
| `packages/perseus-editor/.../start-coords-settings.tsx` | Start coordinate editor UI |

## Decision Record

### 1. Type name `"absolute-value"` (hyphenated, not `"absolute_value"`)

**Context:** The legacy Grapher widget uses `"absolute_value"` (underscore). All Interactive
Graph types use hyphenated names (`"linear-system"`, `"sinusoid"`, `"ray"`, etc.).

**Decision:** Use `"absolute-value"` to follow the existing Interactive Graph convention.

**Consequences:** The two type strings are distinct; no confusion between Grapher data and
Interactive Graph data at runtime or in TypeScript. Serialized content from the old Grapher
widget is not affected.

---

### 2. Two-point model (vertex + arm point)

**Context:** Several models could represent an absolute value graph — three points, one point
plus equation coefficients, etc. The Grapher widget already uses a vertex + arm point model.

**Decision:** Use the same two-point model: `p1` is the vertex and `p2` is any point on one
arm. This is ported directly from the Grapher implementation.

**Consequences:** Content creators have an intuitive direct-manipulation handle on both the
position and shape of the graph. The model is simple to understand and implement.

---

### 3. Single `Plot.OfX` (no segment splitting)

**Context:** The tangent graph type requires splitting the curve into segments at each
asymptote to work around a Mafs rendering limitation. Absolute value is continuous everywhere.

**Decision:** Use a single `<Plot.OfX y={(x) => m * Math.abs(x - h) + v} />` with no
segment splitting.

**Consequences:** The rendering code is simpler than tangent and does not require the
asymptote-detection helpers. If the Mafs discontinuity issue is ever resolved, there is
nothing to remove here.

---

### 4. No canonical normalization for scoring

**Context:** Sinusoid and tangent can represent the same curve with different coefficient
signs, requiring canonical normalization before comparison. Absolute value does not have
this ambiguity — each graph has exactly one vertex and one slope.

**Decision:** Compare coefficients `[m, h, v]` directly using `approximateDeepEqual`,
with no normalization step.

**Consequences:** The scoring branch is simpler than sinusoid/tangent. No edge cases around
sign-flipping or period-shifting.

---

### 5. `coeffRef` fallback for transient invalid states

**Context:** Mid-drag, `p1` and `p2` can momentarily share the same x-coordinate, making
`getAbsoluteValueCoefficients` return `undefined`. Without a fallback, the graph would
briefly disappear or throw.

**Decision:** Cache the last valid `{m, h, v}` in a `React.useRef`. If the current
coefficients are undefined, render using the cached values.

**Consequences:** The graph remains stable and visible throughout a drag gesture. This is
the same guard used by sinusoid and quadratic.

---

### 6. `getAbsoluteValueCoefficients` exported from `absolute-value.tsx`

**Context:** Scoring (`score-interactive-graph.ts`) needs to extract coefficients from
coordinates. Sinusoid and tangent put their coefficient helpers in `kmath/coefficients.ts`
for cross-package reuse.

**Decision:** Export `getAbsoluteValueCoefficients` directly from `absolute-value.tsx` and
import it into the scoring module. No new file added to `kmath`.

**Consequences:** The coefficient logic lives in one place and is reachable from scoring
without introducing a new `kmath` file. If a third consumer needs the function later, it can
be moved to `kmath` at that point.
