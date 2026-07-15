import * as React from "react";

/**
 * DOM node of the HTML overlay that sits directly above the interactive graph's
 * SVG. Movable points portal an HTML hitbox `<div>` (with `touch-action: none`)
 * into this layer and use it as their drag gesture target.
 *
 * Why an HTML overlay instead of an SVG hitbox: Safari does NOT reliably honor
 * `touch-action` on SVG elements. With the graph container set to
 * `touch-action: pan-y` (so the page can scroll over the graph), an SVG hitbox
 * with `touch-action: none` is ignored and a vertical point-drag scrolls the
 * page instead of moving the point. `touch-action` on a *real* HTML element is
 * honored on every engine (it's why Mafs' own `.MafsView` HTML container worked
 * before), so the compositor blocks scrolling the instant a touch lands on the
 * point — no first-frame race and no JS `preventDefault` fallback.
 *
 * The layer is `pointer-events: none` so touches on empty graph area fall
 * through to the SVG (page scroll / click-to-add-point); each hitbox `<div>`
 * re-enables pointer events for itself.
 *
 * Null before the layer mounts (SSR / first client render); points render no
 * hitbox until it's available.
 *
 * UPSTREAM (Mafs): this HTML-overlay hitbox technique — together with relaxing
 * `.MafsView { touch-action: none }` in `mafs/core.css` — is the fix to
 * contribute to Mafs' own `MovablePoint`/`useMovable` so every library consumer
 * gets scroll-over-graph with working drags. Perseus forked those components
 * (this file, `use-draggable.ts`, `use-control-point.tsx`, `MovablePointView`
 * are all Perseus-owned), so an upstream change won't flow back here
 * automatically — keep the two in sync if/when the Mafs PR lands.
 */
export const HitboxLayerContext = React.createContext<HTMLElement | null>(null);
