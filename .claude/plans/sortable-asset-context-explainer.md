# Sortable AssetContext integration — design notes

Companion doc to the PR titled "Wire Sortable into AssetContext for
stable Chromatic snapshots." Reviewers don't need to read this to
approve the change, but it explains *why* the fix is shaped the way it
is and what trade-offs were considered.

## The problem

The `WithTeX` story under `matcher-initial-state-regression.stories.tsx`
had `chromatic: {delay: 1000}` attached to it. That parameter tells
Chromatic to wait one full second after the page "loads" before taking
the snapshot. The delay was a workaround for visible layout shift in
the Matcher widget when its cards contain TeX — the snapshot would
sometimes capture mid-layout, producing diffs that weren't real visual
changes.

A 1000ms hardcoded delay is brittle: it's pessimistic in the common
case (slowing every snapshot run by a second) and optimistic on
slow CI hardware (might still snapshot before things settle). The
deeper issue is that the widget wasn't telling Perseus's renderer
when it was actually done rendering.

## Background: Perseus already has a "rendered" system

Perseus's `ServerItemRenderer` exposes an `onRendered(true)` callback
that fires when the question is fully ready — fully-loaded images,
fully-typeset math, etc. The mechanism is `AssetContext`: any component
that does async work registers a key (`setAssetStatus(key, false)`)
during construction, then flips it true when the work finishes. The
renderer waits until every registered key is true before firing
`onRendered(true)`.

Two callers were already participating:

- `<TeX>` registers its formula text as a key, flips it true when
  MathJax fires `onRender` for the typesetting pass.
- `<SvgImage>` registers its URL, flips it true when the image loads.

So when MathJax typesets the matcher's TeX content, the renderer
*does* know about it. The renderer's `onRendered` was firing once TeX
finished. The problem is that's *not* when the matcher is visually
done.

## The render cascade

The Matcher widget contains two `Sortable` columns. Each Sortable lays
out its draggable cards using a JavaScript-driven measurement pass —
it reads each card's `outerWidth`/`outerHeight` from the DOM, then
applies the maximum as a constraint so cards line up in clean rows
or columns. Matcher in turn reads each Sortable's measurements and
syncs the heights across both columns.

The ordering, in time:

1. Renderer mounts. `<TeX>` components register their formulas with
   AssetContext. MathJax begins typesetting in the background.
2. MathJax finishes a formula. `<TeX>` flips `setAssetStatus(true)`
   for that formula.
3. The DOM size of that card has now changed (TeX glyph rendered).
4. The Sortable containing that card receives an `onRender` from its
   Draggable child. It debounces (20ms) and re-measures.
5. The new measurement might differ from the old one (taller now).
   `onMeasure` fires up to Matcher.
6. Matcher's `onMeasureLeft`/`onMeasureRight` setStates the new
   `leftHeight`/`rightHeight`. The constraint passed back down to
   each Sortable changes.
7. Sortable receives new constraints → clears its measurements → re-
   measures on the next frame → fires `onMeasure` again with possibly
   the same values (now that constraints are stable).
8. Eventually measurements converge. The cards stop moving.

The renderer's `onRendered` was firing somewhere around step 2 — TeX
typeset is done, and that's all the renderer knew to wait for. Steps
3–8 happen *after* `onRendered`, which is when Chromatic snapshots,
and that's when the snapshot can capture mid-cascade.

## The fix

Have Sortable participate in AssetContext too, so the renderer waits
for measurement convergence in addition to TeX typeset.

The shape, in `packages/perseus/src/components/sortable.tsx`:

- Each Sortable instance gets a unique asset key (`sortable-N`,
  generated from a module-level counter).
- The constructor calls `setAssetStatus(key, false)`.
- `componentWillUnmount` calls `setAssetStatus(key, true)` and clears
  any pending timer (so the renderer doesn't stay blocked on a
  Sortable that no longer exists).
- The interesting part: in the `setState` callback inside
  `measureItems`, after the new dimensions have been applied, we:
  1. Re-assert `setAssetStatus(key, false)` (a measurement just
     happened, so we are *not* settled).
  2. Clear any in-flight quiescence timer.
  3. Schedule a new 50ms timer that will call
     `setAssetStatus(key, true)` if no further measurement arrives.

The result: the renderer's `onRendered` waits for both TeX typeset
*and* a 50ms-quiet window after the most recent Sortable measurement.
The 1000ms Chromatic delay can be removed.

## Why a timer instead of "compare two measurements in a row"

A natural alternative: detect convergence by comparing each new
measurement to the previous, and report settled when they're equal.
That has two problems:

1. **First measurement.** There's nothing to compare it to. You'd
   need a "second measurement equals first" pattern, which means
   the *first* settle never fires until something happens to trigger
   a no-op second measurement.
2. **Re-entry.** A measurement after we've already reported settled
   (e.g. because Matcher's constraint round-trip happened later than
   expected) needs to flip us back to unsettled. A debounce-style
   timer handles this cleanly: any new measurement resets the timer,
   so we're always reporting "true if quiet, false if not."

The timer also handles spurious re-renders gracefully — you don't
have to teach Sortable what counts as a "real" measurement change vs.
noise.

## Why 50ms

Educated guess. The constraints at play:

- The existing `_.debounce(remeasureItems, 20)` inside Sortable
  silences rapid TeX `onRender` calls. So measurements naturally
  arrive in 20ms-or-greater intervals.
- Matcher's constraint round-trip (Sortable measures → Matcher
  setStates → constraints prop change → Sortable clears + re-
  measures) is one React render cycle plus a `setTimeout(0)` —
  let's call it ~5–15ms.

50ms is roughly twice the largest of those intervals, giving some
headroom but not so much that we noticeably slow the renderer's
`onRendered` callback in the common case.

If Chromatic is still flaky after this lands, **the first lever to
reach for is bumping `SORTABLE_SETTLED_MS`**. 100ms or 150ms would
be reasonable next stops. The cost is purely "renderer waits a bit
longer before reporting rendered" — invisible to users.

## Why setState callback rather than `componentDidUpdate`

`componentDidUpdate` fires on every state change, including unrelated
ones (the dragging state machine, animation states, etc.). We only
want to count measurement events. The `setState` callback inside
`measureItems` is the precise hook that says "a measurement just
finished" — using it keeps the asset-status churn proportional to
the actual layout activity.

## Asset key uniqueness

A class component can't use `useId`, so we use a module-level counter
incremented in the field initializer. Per-instance unique, stable for
the instance's lifetime, deterministic enough for tests. `Math.random()`
would work but could theoretically collide; uuid would be overkill.

The counter is *not* reset between renders or HMR — that's fine,
because the only thing that matters is uniqueness within the lifetime
of a single AssetContext provider, which is one renderer mount.

## Unmount semantics

When a Sortable unmounts, we call `setAssetStatus(key, true)` rather
than removing the key. The asset-context API doesn't expose removal,
and "true" is the right semantic anyway: the work is done because
the component is gone. The renderer's check is
`Object.values(assetStatuses).every(Boolean)`, which a stale `true`
satisfies.

If we left it as `false`, an unmounted Sortable would block
`onRendered` forever — a real bug in dynamic content scenarios.

## Test verification (mutation testing)

The test suite in `packages/perseus/src/components/__tests__/sortable.test.tsx`
adds 5 tests under `Sortable AssetContext integration`. To make sure
each test actually catches a specific regression (and isn't a false
positive that would always pass), we ran a mutation-testing pass:

| Mutation in production code | Tests that turned red |
|---|---|
| Remove constructor `setAssetStatus(false)` call | All 5 (constructor call is also test scaffold) |
| Remove the 50ms timer scheduling | "marks itself loaded after the quiescence window"; "resets the quiescence timer when a new measurement arrives" |
| Remove `clearTimeout` (no reset on new measurement) | Only "resets the quiescence timer when a new measurement arrives" |
| No-op `componentWillUnmount` | Only "clears the pending timer and marks itself loaded on unmount" |

The last three mutations are surgical kills — exactly the right test
detected each broken behavior, and no false positives. This gives
confidence that each test is testing what it claims to test.

## Test infrastructure note

The new tests mock `$.fn.outerWidth`/`outerHeight` in `beforeEach`
to return non-zero values. This isn't because the code under test
needs it — it's because jsdom returns 0 for layout properties, which
makes `componentDidUpdate`'s reset condition (`!width && !height`)
true on every update, creating an infinite measure loop in test that
production never hits. Mocking these mirrors the real DOM and lets
measurements stabilize.

The tests also call `Sortable#measureItems` directly via a ref inside
`act()` rather than letting it fire via the natural
`setTimeout(0, measureItems)` path. The reason: React 18 commits
state updates inside a microtask that jest's fake timers don't flush,
so the `setState` callback inside `measureItems` (where we schedule
the quiescence timer) doesn't fire reliably when driven via fake-
timer-fired `setTimeout`. Calling `measureItems` directly inside
`act()` forces React to flush synchronously, which makes the timing
deterministic. This is a known footgun whenever you mix React 18
with jest fake timers and class component `setState` callbacks.

## What this does *not* change

- Sorter widget — doesn't currently pass `onMeasure`, but it now
  participates in AssetContext too because the wiring is at the
  Sortable level. This is intentional. Sorter doesn't have a
  Chromatic flakiness story today, but having the renderer correctly
  wait on Sortable measurement is the right behavior universally.
- TeX typeset detection — already worked, untouched.
- The renderer's `onRendered` API surface — same callback, same
  contract, just waits on more keys now.

## Risks

1. **`onRendered` fires later than before.** Any code path that
   relied on `onRendered` firing as soon as TeX was typeset (rather
   than after layout settled) will see a small delay (50ms + the
   measure cascade). I scanned `onRendered` test usage and didn't
   find anything that asserts on this timing, but it's worth a
   reviewer second look.
2. **The 50ms guess might be too short for slow CI.** If Chromatic
   is still flaky, the fix is to bump `SORTABLE_SETTLED_MS`.
3. **Sortable instances that mount but never measure** would stay
   `false` forever and block `onRendered`. This shouldn't happen
   in practice (Sortable always measures on mount) but is worth
   knowing.