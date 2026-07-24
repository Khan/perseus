import * as React from "react";

/**
 * DOM node of the HTML overlay above the graph's SVG. Movable points portal an
 * HTML hitbox `<div>` (`touch-action: none`) into it as their drag target.
 *
 * Why HTML, not an SVG hitbox: Safari ignores `touch-action` on SVG, so under
 * the container's `touch-action: pan-y` a vertical point-drag scrolls the page.
 * `touch-action` on real HTML is honored everywhere, so no scroll and no JS
 * fallback. The layer is `pointer-events: none` (empty area falls through to
 * scroll / add-point); each hitbox opts back in. Null until the layer mounts.
 *
 * UPSTREAM (Mafs): this technique + relaxing `.MafsView { touch-action: none }`
 * in `mafs/core.css` is the fix to contribute to Mafs' `MovablePoint`. Perseus
 * forked these components, so keep them in sync if that PR lands.
 */
export const HitboxLayerContext = React.createContext<HTMLElement | null>(null);
