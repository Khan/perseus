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

### Where the crash actually surfaces: the iframe's own reducer

The crash fires inside the **preview iframe's own `InteractiveGraph` instance**, not in the
editor's inline copy. The editor's reducer `onChange` flows out to the editor page, which
pushes the resulting widget JSON into the preview iframe via `postMessage`
(`iframe-content-renderer.tsx` / `preview-with-iframe.tsx`, on every edit plus ~twice/second).
The iframe renders its own `ServerItemRenderer` → `InteractiveGraph` → `StatefulMafsGraph`,
with its **own** reducer.

That iframe-side reducer has the *same* desync window as any other instance: it seeds
`state.type` from the `graph` prop at mount and only catches up to a newly-posted `graph.type`
via the deferred `useReinitializeOnGraphChange` effect. When a new `graph` arrives over
`postMessage` and a `changeSnapStep`/`changeRange` effect fires in that one-commit window, the
serialize effect runs `mafsStateToInteractiveGraph(staleState, newGraph)` → mismatch → throw.
The `MessagePort` frame in the stack is just the boundary that *delivers* the new prop; the
desync is the ordinary `useReinitializeOnGraphChange` lag, applied to the iframe instance.

This whole loop is reproducible in-package via `editor-page-with-storybook-preview.tsx`, so
the crash can be exercised end-to-end in Storybook (no webapp host involved).

### Why the stale type is "none"

The `none` default (see below) means a freshly-created graph's posted `graph.type` is `"none"`
until the author picks a real type — and the type-switch is exactly a `graph.type` change that
the iframe reducer must catch up to, reproducing the desync with `state.type === "none"`.

Note: `InteractiveGraphEditor.serialize()` does **not** independently bake a stale `"none"`
into the JSON. It sets `json.graph.type` from `getUserInput()` (`getGradableGraph`), which
already anchors the result type to the stored `graph` prop in every non-throwing branch (it
either returns `{...initialGraph}` or throws on a type mismatch). So `correct.type` already
tracks the stored type; the posting path is not the source of the bad type — the iframe
reducer lag is. (This is why fix **C** below is effectively a no-op.)

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
- **C (investigated — effectively a no-op, don't bother):** the idea was to have `serialize()`
  take `type` from the stored `props.graph` instead of `getUserInput()`. But `getGradableGraph`
  (behind `getUserInput()`) already anchors the returned type to the stored `graph` prop in
  every non-throwing branch, so `correct.type` already equals `props.graph.type`. The change
  produces an identical value and does not address the iframe-reducer lag that actually throws.
- **Not a fix:** reverting the `none` default — only reduces frequency, fights the #3754 UX
  decision, and leaves the desync class intact.

## The iframe loop is in perseus (not webapp)

Earlier notes flagged the in-iframe behavior as an unexamined webapp concern. That was wrong:
the entire editor → `postMessage` → preview-iframe loop lives in `perseus-editor`
(`iframe-content-renderer.tsx`, `preview-with-iframe.tsx`, `editor-page.tsx`) and reproduces in
Storybook via `editor-page-with-storybook-preview.tsx`. The crash is the iframe instance's own
`StatefulMafsGraph` reducer lagging a newly-posted `graph.type` — the same
`useReinitializeOnGraphChange` desync described above, so fix **A** addresses it directly. A
regression test can drive the Storybook preview loop end-to-end rather than relying only on the
mocked-`useReinitializeOnGraphChange` test.
