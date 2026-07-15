import * as React from "react";
import {useContext} from "react";
import {createPortal} from "react-dom";

import useGraphConfig from "../../reducer/use-graph-config";
import {dimensionsToPixels, pointToPixel} from "../use-transform";

import {HitboxLayerContext} from "./hitbox-layer-context";

import type {vec} from "mafs";

/**
 * Drag hitbox for an interactive-graph element, rendered as a real HTML element
 * in the graph's overlay layer rather than as SVG. Safari doesn't reliably
 * honor `touch-action` on SVG, so under the container's `touch-action: pan-y`
 * an SVG hitbox lets a drag scroll the page; a real HTML element's
 * `touch-action: none` is honored everywhere. See {@link HitboxLayerContext}.
 *
 * All coordinates are **graph-space**; this hook converts them to the overlay's
 * pixel space with the same `pointToPixel` transform movable points use, so
 * hitboxes line up exactly with the SVG shapes they cover.
 */
export type HitboxShape =
    // Square centered on a point (movable points, arrowheads).
    | {kind: "box"; center: vec.Vector2; sizePx: number}
    // Thick segment between two points (lines, vectors, asymptotes).
    | {kind: "line"; start: vec.Vector2; end: vec.Vector2; thicknessPx: number}
    // Ellipse centered on a point with graph-space radii (circles).
    | {kind: "ellipse"; center: vec.Vector2; radius: vec.Vector2}
    // Filled polygon through its vertices (polygon bodies).
    | {kind: "polygon"; vertices: ReadonlyArray<vec.Vector2>};

type HitboxParams = {
    shape: HitboxShape;
    /** Assigned to the hitbox element; use as the `useDraggable` gestureTarget. */
    hitboxRef: React.RefObject<HTMLDivElement>;
    /**
     * Stacking within the overlay. Point/vertex handles ("handle") sit above
     * shape bodies ("body") so a vertex on a segment/polygon stays grabbable.
     */
    layer?: "handle" | "body";
    cursor?: string;
    dragging?: boolean;
    onClick?: () => void;
    onHoverChange?: (hovered: boolean) => void;
    testId?: string;
};

export function useHitbox(params: HitboxParams): React.ReactNode {
    const {
        shape,
        hitboxRef,
        layer = "handle",
        cursor,
        dragging = false,
        onClick,
        onHoverChange,
        testId,
    } = params;
    const layerEl = useContext(HitboxLayerContext);
    const graphConfig = useGraphConfig();

    // Overlay not mounted yet (SSR / first render); no hitbox yet.
    if (!layerEl) {
        return null;
    }

    return createPortal(
        // This <div> is a pointer-only hit surface: keyboard and assistive-tech
        // interaction live on the sibling SVG element (a focusable
        // `role="button"`), so it's `aria-hidden` and carries no role/tabindex
        // (no duplicate control, no extra tab stop). The jsx-a11y rules are
        // disabled for the same reason — pointer input only.
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
            ref={hitboxRef}
            aria-hidden={true}
            data-testid={testId}
            style={{
                position: "absolute",
                touchAction: "none",
                pointerEvents: "auto",
                // Handles above bodies so a vertex on a shape stays grabbable.
                zIndex: layer === "body" ? 1 : 2,
                cursor: dragging ? "grabbing" : cursor ?? "grab",
                ...shapeStyle(shape, graphConfig),
            }}
            onClick={onClick}
            onPointerEnter={() => onHoverChange?.(true)}
            onPointerLeave={() => onHoverChange?.(false)}
        />,
        layerEl,
    );
}

// Translates a graph-space shape into absolute-position CSS for the overlay.
function shapeStyle(
    shape: HitboxShape,
    graphConfig: Parameters<typeof pointToPixel>[1],
): React.CSSProperties {
    switch (shape.kind) {
        case "box": {
            const [x, y] = pointToPixel(shape.center, graphConfig);
            return {
                left: x,
                top: y,
                width: shape.sizePx,
                height: shape.sizePx,
                transform: "translate(-50%, -50%)",
            };
        }
        case "line": {
            const [sx, sy] = pointToPixel(shape.start, graphConfig);
            const [ex, ey] = pointToPixel(shape.end, graphConfig);
            const dx = ex - sx;
            const dy = ey - sy;
            const length = Math.hypot(dx, dy);
            const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
            return {
                // Center the rectangle on the line's midpoint, then rotate it to
                // the line's angle — an exact match for the SVG hit-line.
                left: (sx + ex) / 2,
                top: (sy + ey) / 2,
                width: length,
                height: shape.thicknessPx,
                transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
            };
        }
        case "ellipse": {
            const [cx, cy] = pointToPixel(shape.center, graphConfig);
            const [[rxPx, ryPx]] = dimensionsToPixels(
                [shape.radius],
                graphConfig,
            );
            return {
                left: cx,
                top: cy,
                width: rxPx * 2,
                height: ryPx * 2,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
            };
        }
        case "polygon": {
            const pts = shape.vertices.map((v) => pointToPixel(v, graphConfig));
            const xs = pts.map((p) => p[0]);
            const ys = pts.map((p) => p[1]);
            const minX = Math.min(...xs);
            const minY = Math.min(...ys);
            const maxX = Math.max(...xs);
            const maxY = Math.max(...ys);
            // `clip-path` clips both painting and pointer hit-testing, so only
            // touches inside the polygon are captured; the rest of the bounding
            // box falls through to the SVG/page (scroll / other handles).
            const clip = pts
                .map(([px, py]) => `${px - minX}px ${py - minY}px`)
                .join(", ");
            return {
                left: minX,
                top: minY,
                width: maxX - minX,
                height: maxY - minY,
                clipPath: `polygon(${clip})`,
            };
        }
    }
}
