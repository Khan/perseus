# WB Announcer Implementation in Interactive Graphs

## Overview

This document defines how to integrate the `@khanacademy/wonder-blocks-announcer` package into
Perseus interactive graphs, replacing the current SVG `aria-live` attribute pattern with
programmatic announcements via `announceMessage`.

**Wonder Blocks Announcer docs:** https://khan.github.io/wonder-blocks/?path=/docs/packages-announcer--docs

---

## Why Migrate from SVG `aria-live` to `announceMessage`

Interactive graphs currently toggle `aria-live` between `"polite"` and `"off"` directly on SVG
`<g>` elements to prevent conflicting announcements when multiple elements move simultaneously
(e.g., a line's grab handle and its two endpoints all move together).

This approach has several problems:

- **SVG aria-live support is inconsistent.** Browser/screen reader combinations handle
  `aria-live` on SVG elements differently. NVDA+Chrome and VoiceOver+Safari behave differently,
  and some combinations silently drop announcements.
- **The toggle pattern is fragile.** Getting "polite"/"off" coordination right requires careful
  state management spread across multiple components (see `movable-line.tsx` lines 53–57 as an
  example of this complexity).
- **Mutation timing matters.** Native ARIA live regions require a specific clear-then-write
  cycle to trigger announcements. Updating `aria-label` and `aria-live` in the same render can
  cause the announcement to be skipped.

`announceMessage` solves all of these by routing all announcements through a dedicated, stable
live region in the document `<body>` (or modal, if active), and manages the mutation cycle
internally.

---

## WB Announcer API

```typescript
import {announceMessage} from "@khanacademy/wonder-blocks-announcer";

announceMessage({
    message,           // string — the text to announce
    level,             // "polite" (default) | "assertive"
    debounceThreshold, // ms — trailing-edge debounce (default 250ms)
    initialTimeout,    // ms — delay before injecting into DOM (default 150ms, helps VoiceOver)
}): Promise<string>
```

| Parameter           | Default    | When to change                                                                |
| ------------------- | ---------- | ----------------------------------------------------------------------------- |
| `level`             | `"polite"` | Use `"assertive"` only for errors or urgent alerts that must interrupt        |
| `debounceThreshold` | `250`      | Increase (e.g. 150–300ms) during continuous drag; decrease for discrete moves |
| `initialTimeout`    | `150`      | Rarely need to change; the default handles Safari/VoiceOver timing            |

Other exports used in modal contexts:

```typescript
import {attachAnnouncerToModal, detachAnnouncerFromModal} from "@khanacademy/wonder-blocks-announcer";
```

Call these when a Perseus widget is rendered inside a WB modal to route announcements into the
modal's live region instead of the document root. Interactive graphs are not currently rendered
in modals, so these can be ignored for now.

---

## Current Usage in Perseus (Reference Patterns)

### Pattern 1 — Debounced continuous updates (`free-response.tsx`)

Character count announcements fire on every keystroke, so they use a high debounce threshold and
switch level based on error state:

```typescript
// packages/perseus/src/widgets/free-response/free-response.tsx
import {announceMessage} from "@khanacademy/wonder-blocks-announcer";

announceCharacterCount = (message: string, isOverLimit: boolean) => {
    const level = isOverLimit ? "assertive" : "polite";
    announceMessage({message, level, debounceThreshold: 750});
};
```

### Pattern 2 — Discrete state change (`radio-widget.tsx`)

Choice selection announcements are discrete (not continuous), so no debounce is needed:

```typescript
// packages/perseus/src/widgets/radio/radio-widget.tsx
import {announceMessage} from "@khanacademy/wonder-blocks-announcer";

announceMessage({message: screenReaderMessage});

// Workaround for WB-2240: clear the region after multi-select announcement
// so the next identical selection is re-announced.
if (props.multipleSelect) {
    setTimeout(() => {
        announceMessage({message: ""});
    }, 300);
}
```

> **Note:** The WB-2240 workaround (clearing with `""` after 300ms) should be checked before
> adopting — if the bug is fixed in a newer WB release, skip the setTimeout.

---

## Architecture: State-Driven Announcements

Interactive graphs use a different pattern from the other widgets above. Rather than calling
`announceMessage` directly inside component `onMove` handlers, announcements flow through the
reducer as state — keeping all announcement logic centralized in one place and out of the
render layer.

### How it works

```
User moves a point
  → dispatch(actions.pointGraph.movePoint(i, destination))
  → doMovePoint() in the reducer sets state.announcement = localized string
  → useEffect in StatefulMafsGraph fires when state.announcement changes
  → announceMessage({message: state.announcement, debounceThreshold: 150})
```

### Key state fields (`InteractiveGraphStateCommon`)

```typescript
// types.ts
export interface InteractiveGraphStateCommon {
    // ...existing fields...
    announcement: string | null;  // set by the reducer on move actions
    strings?: PerseusStrings;     // i18n strings, provided via initializeGraphState
    locale?: string;              // locale, provided via initializeGraphState
}
```

`strings` and `locale` are optional so that test fixtures that construct state directly do not
need to supply them.

### Where strings/locale come from

`StatefulMafsGraph` calls `usePerseusI18n()` and passes `strings` and `locale` into the
reducer's initial state via `initializeGraphState`. They are also included whenever a
`REINITIALIZE` action is dispatched (e.g., when graph type or numPoints changes):

```typescript
// stateful-mafs-graph.tsx
const {strings, locale} = usePerseusI18n();
const latestStringsRef = useLatestRef(strings);
const latestLocaleRef = useLatestRef(locale);

const [state, dispatch] = React.useReducer(
    interactiveGraphReducer,
    {...props, strings, locale},
    initializeGraphState,
);

// On graph-config changes, reinitialize with the latest strings/locale.
// useLatestRef is used (not the closure values) to avoid making strings/locale
// dependencies of this effect, which would trigger a full reinitialize — and
// reset user coordinates — on every locale change.
dispatch(reinitialize({
    ...latestPropsRef.current,
    strings: latestStringsRef.current,
    locale: latestLocaleRef.current,
}));
```

### Where `announceMessage` is called

A single `useEffect` in `StatefulMafsGraph` fires whenever `state.announcement` changes:

```typescript
// stateful-mafs-graph.tsx
useEffect(() => {
    if (state.announcement) {
        announceMessage({
            message: state.announcement,
            debounceThreshold: 150,
        });
    }
}, [state.announcement]);
```

This is the only place `announceMessage` needs to be called for interactive graphs — adding
announcements to a new graph type only requires setting `state.announcement` in the reducer.

---

## How to Implement for a New Graph Type

### Step 1 — Set `announcement` in the reducer's move handler

Find the `do*` function for the graph type's primary move action and set `state.announcement`
using the snapped/final coordinates and `state.strings`:

```typescript
// Example: inside doMovePoint, case "point"
case "point": {
    const snappedPoint = boundToEdgeAndSnapToGrid(action.destination, state);
    return {
        ...state,
        hasBeenInteractedWith: true,
        focusedPointIndex: action.index,
        coords: setAtIndex({
            array: state.coords,
            index: action.index,
            newValue: snappedPoint,
        }),
        announcement: state.strings
            ? state.strings.srPointAtCoordinates({
                  num: action.index + 1,
                  x: srFormatNumber(snappedPoint[X], state.locale ?? "en"),
                  y: srFormatNumber(snappedPoint[Y], state.locale ?? "en"),
              })
            : null,
    };
}
```

Always read coordinates from the snapped/bounded result — not from `action.destination` — so
the announcement matches what is actually rendered.

### Step 2 — Announce compound movements from the right handler

When multiple elements move together (e.g., a line's grab handle moves both endpoints), set
`announcement` only in the handler for the element the user is directly interacting with.
Handlers for co-moving elements should leave `announcement: null` (or omit it, letting the
`...state` spread carry through `null`).

Because `announceMessage` uses a trailing-edge debounce, if two move handlers somehow both set
`announcement` in the same synchronous dispatch cycle, the last one wins — but the preferred
approach is to only set it once, in the primary handler.

### Step 3 — Remove `aria-live` from SVG elements for the migrated graph type

SVG `aria-live` is no longer needed once the reducer handles announcements. Pass `ariaLive="off"`
to `MovablePoint`, `MovableLine`, etc., or remove the prop entirely if the component defaults to
`"off"`.

Keep `aria-label` and `aria-describedby` — these provide the static on-focus description and
are unrelated to the dynamic announcement mechanism.

### Step 4 — Choose debounce threshold

The `useEffect` in `StatefulMafsGraph` uses `debounceThreshold: 150` for all graph types. This
is appropriate for keyboard arrow-key moves. If a graph type needs different debounce behaviour,
the threshold can be stored in state alongside `announcement` — but 150ms has worked well for
the point graph.

| Interaction type      | Recommended `debounceThreshold` |
| --------------------- | ------------------------------- |
| Keyboard arrow-key    | `150` ms                        |
| Continuous mouse drag | `200`–`300` ms                  |

---

## What NOT to Change

- `aria-label` on interactive elements — still needed for on-focus announcements
- `aria-describedby` pointing to `<SRDescInSVG>` hidden elements — still needed for
  supplemental descriptions (graph bounds, instructions, etc.)
- `role="button"` or `role="slider"` on interactive elements
- The `AriaLive` type in `types.ts` — remove once all usages are gone, but keep until fully
  migrated to avoid breaking in-progress work

---

## Known Limitation

If a user attempts to move a point to a position it already occupies (e.g., pressing an arrow
key against a grid boundary), the reducer returns the same `announcement` string as the previous
move. React's `useEffect` only fires when the dependency changes, so no announcement is made.
This is acceptable for now — if the position didn't change, there is nothing new to announce.
A seq-counter on the announcement object could fix this edge case if it becomes a problem.

---

## Testing Checklist

For each migrated graph type, verify:

- [ ] Moving a point announces its new coordinates
- [ ] Moving a compound shape (line, circle) announces from the active handle only — not from
  co-moving elements
- [ ] Rapid arrow-key moves do not flood the screen reader (debounce is working)
- [ ] Focusing a point reads the `aria-label` (static description), not an announcement
- [ ] Announcements work inside a WB modal if the graph is ever rendered in one
- [ ] `pnpm test` passes for the widget
