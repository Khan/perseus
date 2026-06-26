# Interactive Graph editor crash: "Invariant failed" on step edits

## Symptom

In the interactive-graph editor, editing **Tick Step / Grid Step** values can crash the
preview with a bare `Error: Invariant failed`, and the graph fails to render. Reported
while changing Grid Step toward `(5,5)` (e.g. passing through `(5,1)`), but the specific
step values are incidental.

Production stack (messages stripped by the prod build, so the bare text):

```
at invariant$2 (...)
at mafsStateToInteractiveGraph (...)
at ... (the StatefulMafsGraph onChange effect)
at MessagePort.Lt (...)        <- editor -> preview-iframe postMessage boundary
```

## Root cause

The throw is the type-guard invariant in `mafsStateToInteractiveGraph(state, originalGraph)`
(`mafs-state-to-interactive-graph.ts`): it asserts `state.type === originalGraph.type`.

It's called from `StatefulMafsGraph`'s serialize effect whenever the reducer `state` changes
(`stateful-mafs-graph.tsx`):

```js
useEffect(() => {
    if (prevState.current !== state) {
        onChange(mafsStateToInteractiveGraph(state, graph));
    }
    prevState.current = state;
}, [onChange, state, graph]);
```

The crash needs `state.type !== graph.type`. Observed: **`state.type === "none"`** while
`graph.type` is the real type (e.g. `"segment"`).

### Why the types desync

1. `state` is seeded **once** at mount from `props.graph` via
   `useReducer(..., initializeGraphState)`. It only catches up to a new `graph.type` via the
   **deferred effect** `useReinitializeOnGraphChange`. That one-commit gap is the desync window.
2. `changeSnapStep` / `changeRange` are effects that fire on step/range edits and produce a
   **new `state` object that preserves the current type** (they don't change type). They're
   declared *before* `useReinitializeOnGraphChange`.
3. So if a step edit's `changeSnapStep` runs while `state` is still the stale type, the
   serialize effect runs `mafsStateToInteractiveGraph(staleState, newGraph)` → mismatch.

### Why the stale type is "none" (and why it recurs long after picking a type)

Reinitialization is fast (next commit), so a settled graph shouldn't have a stale state.
The `"none"` keeps getting **re-seeded**, via the editor ⇄ preview-iframe cycle:

- The editor **unmounts/remounts** the inline preview graph on every `valid` toggle: when a
  step field is briefly empty, `valid` becomes a string and the editor swaps the graph for a
  `<div className="perseus-error">` (`interactive-graph-editor.tsx`). Re-typing flips `valid`
  back → the `InteractiveGraph` **remounts** → reducer re-seeds from `props.graph`.
- `InteractiveGraphEditor.serialize()` derives the saved/posted `json.graph.type` from the
  **live reducer state** (`getUserInput()`), not from the stored graph field
  (`interactive-graph-editor.tsx`, ~lines 257-260). So a transiently-`"none"` reducer state
  gets baked into the JSON.
- `IframeContentRenderer` pushes that JSON to the preview iframe via `postMessage`
  (on every edit, plus ~twice/second). The iframe re-renders and the `state`/`graph` type
  mismatch surfaces there → the crash.

### Why the `none` default amplifies it

PR **#3754** (`18aba08759`, "[Interactive Graph] Update the order of the graph type drop
down") changed the widget default from `linear` to `none`:

```diff
 graph:   { type: "linear" }  ->  { type: "none" }
 correct: { type: "linear", coords: null }  ->  { type: "none" }
```

`none` is a non-usable placeholder, so **every** new graph must transition away from it during
setup — exactly when range/grid/snap are being configured. That makes the stale type
specifically `"none"` and turns a rare race into a common one. (It is *not* the root cause; a
`linear` default would still desync on a type switch.)

## Fix applied

A guard in the serialize effect (`stateful-mafs-graph.tsx`) — only serialize when types agree:

```js
if (prevState.current !== state && state.type === graph.type) {
    onChange(mafsStateToInteractiveGraph(state, graph));
}
```

Skipping the mismatched serialization is correct (the state is about to be reinitialized to
match `graph` anyway). Verified: the throw reproduces without the guard and is gone with it;
answer-type changes still serialize correctly (onChange fires with the new type once state
catches up, never with the stale type).

Regression test: `stateful-mafs-graph-typeguard.test.tsx` — mocks `useReinitializeOnGraphChange`
to a no-op to deterministically recreate the "state lags graph type" window (jsdom batches
away the real async race).

## Possible deeper fixes (not yet done)

- **A (strongest root fix):** make reinitialization synchronous (render-phase reconcile
  instead of a deferred effect) so `state.type` can never lag `graph.type` across a commit.
  Touches `useReinitializeOnGraphChange`'s `hasBeenInteractedWith` / first-render-skip logic —
  needs grading-path testing.
- **B:** stop the editor unmount/remount on every `valid` toggle (show the error as a banner,
  keep the graph mounted). Removes the re-seed driver and the per-keystroke flicker.
- **C:** `serialize()` should take `type` from the stored `props.graph` (stable), using
  `getUserInput()` only for coords — stops a transient state type from being posted.
- **Not a fix:** reverting the `none` default — only reduces frequency, fights the #3754 UX
  decision, and leaves the desync class intact.

## Open question (lives in webapp, not perseus)

The exact in-iframe host (`perseus-frame`) behavior — how each posted update is applied
(remount vs prop update) and why the iframe's own reducer reads `none` — is in webapp and was
not inspected. The guard fixes the crash regardless.
