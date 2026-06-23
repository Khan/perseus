import {vec} from "mafs";

import {inset, size} from "../../../math";

import type {Interval} from "mafs";

export const getMovableLineKeyboardConstraint = (
    line: [vec.Vector2, vec.Vector2],
    snapStep: vec.Vector2,
    pointIndex: number,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    // Separate the two points into their own variables, and determine which point is being moved
    const coordToBeMoved = line[pointIndex];
    const otherPoint = line[1 - pointIndex];

    // Create a helper function that moves the point and then checks
    // if it overlaps with the other point in the line after the move.
    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        // Move the point
        let movedCoord = moveFunc(coordToBeMoved);
        // If the moved point overlaps with the other point in the line,
        // move the point again.
        if (vec.dist(movedCoord, otherPoint) === 0) {
            movedCoord = moveFunc(movedCoord);
        }
        return movedCoord;
    };

    // Check if the new point will overlap the other point.
    // If it will, we need to snap the point to the left or right an additional
    // snapStep to avoid overlap.
    return {
        up: movePointWithConstraint((coord) =>
            vec.add(coord, [0, snapStep[1]]),
        ),
        down: movePointWithConstraint((coord) =>
            vec.sub(coord, [0, snapStep[1]]),
        ),
        left: movePointWithConstraint((coord) =>
            vec.sub(coord, [snapStep[0], 0]),
        ),
        right: movePointWithConstraint((coord) =>
            vec.add(coord, [snapStep[0], 0]),
        ),
    };
};

// Inset extensions from the graph edge so the arrowhead isn't clipped.
const GRAPH_EDGE_INSET_PX = 4;

export function trimRange(
    range: [Interval, Interval],
    graphDimensionsInPixels: vec.Vector2,
): [Interval, Interval] {
    const [xRange, yRange] = range;
    const [pixelsWide, pixelsTall] = graphDimensionsInPixels;
    const graphUnitsPerPixelX = size(xRange) / pixelsWide;
    const graphUnitsPerPixelY = size(yRange) / pixelsTall;
    const graphUnitsToTrimX = GRAPH_EDGE_INSET_PX * graphUnitsPerPixelX;
    const graphUnitsToTrimY = GRAPH_EDGE_INSET_PX * graphUnitsPerPixelY;
    return inset([graphUnitsToTrimX, graphUnitsToTrimY], range);
}

/**
 * Returns `tip` pulled back toward `tail` by GRAPH_EDGE_INSET_PX, measured
 * in pixel space (not graph units) so the inset looks the same regardless
 * of axis scale. Used to keep arrowhead glyphs from being clipped by the
 * viewport edge.
 */
export function insetTipAlongRay(
    tail: vec.Vector2,
    tip: vec.Vector2,
    range: [Interval, Interval],
    graphDimensionsInPixels: vec.Vector2,
): vec.Vector2 {
    // Direction from tail to tip, in graph units.
    const dx = tip[0] - tail[0];
    const dy = tip[1] - tail[1];

    // Conversion factors from graph units to pixels on each axis. These
    // can differ when the x and y axes have different scales.
    const [pixelsWide, pixelsTall] = graphDimensionsInPixels;
    const pxPerUnitX = pixelsWide / size(range[0]);
    const pxPerUnitY = pixelsTall / size(range[1]);

    // Length of the ray in pixel space. We measure in pixels (not graph
    // units) so the inset is a fixed visual distance regardless of scale.
    const lenPx = Math.hypot(dx * pxPerUnitX, dy * pxPerUnitY);
    if (lenPx === 0) {
        // tail and tip coincide; no direction to inset along.
        return tip;
    }

    // Fraction of the ray that equals GRAPH_EDGE_INSET_PX in pixel space.
    // Subtract that fraction of the (graph-unit) direction from `tip`.
    const scale = GRAPH_EDGE_INSET_PX / lenPx;
    return [tip[0] - dx * scale, tip[1] - dy * scale];
}
