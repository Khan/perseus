# LEMS-3853: Minified React Error #185 (Graphie Images)

**TL;DR:** `setupGraphie` called `setState` once per label inside a loop, but `this.state` doesn't update synchronously between calls — all iterations spread the same stale base, so only the last label survived. `zoomSize` resolution broke the `shouldComponentUpdate` guard that was hiding this, exposing Graphie to bad intermediate states and causing it to re-run `setupGraphie` infinitely. Fix: accumulate all label updates in a plain object and call `setState` once.

---

## Background

React error #185 ("Maximum update depth exceeded") fires when `setState` is called in a loop that React can't terminate — typically when a state update triggers a re-render that triggers another state update without a clean exit condition.

LEMS-3743 fixed one instance of this by adding `_isLoadingGraphie` to prevent `loadResources()` from being called multiple times during async loading. But the error continued appearing in production on pages with Graphie Images. This ticket (LEMS-3853) addresses the remaining loop.

---

## The Two Bugs That Combined

### Bug 1: Stale `this.state` in setState loop

In `SvgImage.setupGraphie`, `setState` was called once per label:

```ts
// OLD CODE
_.map(options.labels, (labelData) => {
    // ...render label to DOM...
    this.setState({
        labelsRendered: {
            ...this.state.labelsRendered,  // ← reads this.state at call time
            [labelData.content]: true,
        },
    });
});
```

`this.state` in a class component does **not** update synchronously with each `setState` call. React batches the updates — `this.state` still points to the old state until React commits. So with labels A, B, C:

```
Initial state: labelsRendered: {}

Iteration 1: this.state.labelsRendered is {} → queues setState({ labelsRendered: {A: true} })
Iteration 2: this.state.labelsRendered is STILL {} → queues setState({ labelsRendered: {B: true} })
Iteration 3: this.state.labelsRendered is STILL {} → queues setState({ labelsRendered: {C: true} })

React processes queue:
  applies {A: true} → state: {A: true}
  applies {B: true} → state: {B: true}   ← overwrites A
  applies {C: true} → state: {C: true}   ← overwrites A, B

Final state: {C: true}  ← WRONG. Should be {A: true, B: true, C: true}
```

**Without any external interference**, `shouldComponentUpdate` in `SvgImage` would save us — it only allows re-renders when `wasLoaded !== nextLoaded` (i.e. when `imageLoaded` or `dataLoaded` changes). Those don't change during `setupGraphie`, so Graphie never sees the bad intermediate states. The final state is wrong but React can't see it — the loop stops.

### Bug 2: `zoomSize` resolution breaks the protection

`ImageComponent` has a `useEffect` that calls `getImageSizeModern` to fetch the natural image dimensions, then calls `setZoomSize`. This is async and resolves shortly after the image loads — right around the same time `setupGraphie` is running its setState storm.

When `zoomSize` resolves, `ImageComponent` re-renders and passes new `width`/`height` props to `SvgImage`. This triggers `shouldComponentUpdate` to return `true` (props changed), bypassing the `wasLoaded` guard. `SvgImage` re-renders mid-storm, and `Graphie` sees a new `_.pick(this.state, "labels")` object reference at a moment when `labelsRendered` is in an inconsistent intermediate state. `Graphie.componentDidUpdate` compares options via `approximateDeepEqual` — but with the options reference churned mid-storm, it sees a "change" and calls `_setupGraphie()` again, which calls `setupGraphie` again, which starts a new setState storm.

**`zoomSize` is the ignition. The setState storm is the fuel.**

---

## The Loop in Full

```
ImageComponent
│
├── renders SvgImage (with width/height from zoomSize state)
│
└── useEffect: getImageSizeModern() ──────────────────────────────┐
                                                                   │ (async, resolves later)
                                                                   │
SvgImage (on mount)                                               │
│                                                                  │
├── componentDidMount → loadResources()                           │
│       └── loadGraphie() ─────────────────────────────────┐      │
│                                                           │ (async)
│                                               [async resolves]  │
│                                                           │      │
│                                    callback fires ────────┘      │
│                                    setState({ dataLoaded, labels })
│                                            │                     │
│                                    SvgImage re-renders           │
│                                    <Graphie> mounts              │
│                                    Graphie.componentDidMount     │
│                                    → _setupGraphie()             │
│                                    → setupGraphie() called       │
│                                            │                     │
│                              ┌─────────────┤                     │
│                              │  OLD CODE   │                     │
│                              │  label A → setState() ──► re-render #1
│                              │  label B → setState() ──► re-render #2
│                              │  label C → setState() ──► re-render #3
│                              │             │                     │
│                              │             │        [zoomSize resolves here]
│                              │             │                     │
│                              │             │         setZoomSize() ◄──────┘
│                              │             │                ▼
│                              │             │     ImageComponent re-renders
│                              │             │     SvgImage gets new width/height props
│                              │             │                ▼
│                              │         ~~~~│~~~~ interleaves with label setState storm ~~~~
│                              │             │                ▼
│                              │             │     Graphie.componentDidUpdate
│                              │             │     approximateDeepEqual(options, prevOptions)
│                              │             │     → options reference churned mid-storm
│                              │             │     → re-calls _setupGraphie() ◄── LOOP
│                              │             │
│                              ├─────────────┤
│                              │  NEW CODE   │
│                              │  all labels → newLabelsRendered{}
│                              │              └─► single setState() ──► re-render #1 (only one)
│                              │                          │
│                              │              [zoomSize may still resolve here]
│                              │                          ▼
│                              │              Graphie.componentDidUpdate
│                              │              approximateDeepEqual → labels unchanged → NO re-setup ✓
│                              └─────────────┘
```

---

## Why Each Iteration Is Self-Sustaining (No Second `zoomSize` Needed)

After `zoomSize` fires once and kicks off the loop, subsequent iterations are self-sustaining. The setState storm alone keeps churning the options reference enough for `approximateDeepEqual` to keep seeing "changes" — `zoomSize` doesn't need to fire again. That's why the error hits React's update depth limit (~50 nested updates) rather than stopping after two cycles.

---

## The Fix

Accumulate all label updates into a plain object and call `setState` once:

```ts
// NEW CODE
const newLabelsRendered: LabelsRenderedMap = {};
_.map(options.labels, (labelData) => {
    // ...render label to DOM...
    newLabelsRendered[labelData.content] = true;
});
this.setState({
    labelsRendered: {
        ...this.state.labelsRendered,
        ...newLabelsRendered,
    },
});
```

One `setState` → one re-render from this path → `Graphie` gets stable options → `approximateDeepEqual` returns equal → no re-setup. The state transition is also now correct: `labelsRendered` goes from `{}` to `{A: true, B: true, C: true}` atomically.

---

*Co-authored by Claude Sonnet 4.6 <noreply@anthropic.com>*