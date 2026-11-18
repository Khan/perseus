import {clamp} from "./clamp";
import {X, Y} from "./coordinates";
import {MAX, MIN, trim} from "./interval";

import type {Interval, vec} from "mafs";

export type Box = [x: Interval, y: Interval];

// Restricts the `point` to be within `box`, by clamping each coordinate to the
// corresponding interval.
export function clampToBox(box: Box, point: vec.Vector2): vec.Vector2 {
    return [clamp(point[X], ...box[X]), clamp(point[Y], ...box[Y])];
}

// Reduces the size of `box`, trimming each corner by the given positive
// `amount`. If a component of `amount` is negative, the box is expanded in
// that dimension instead.
export function inset(amount: vec.Vector2, box: Box): Box {
    return [trim(amount[X], box[X]), trim(amount[Y], box[Y])];
}

// The area the two boxes share; zero when they don't overlap.
export function overlapArea(a: Box, b: Box): number {
    const width =
        Math.min(a[X][MAX], b[X][MAX]) - Math.max(a[X][MIN], b[X][MIN]);
    const height =
        Math.min(a[Y][MAX], b[Y][MAX]) - Math.max(a[Y][MIN], b[Y][MIN]);

    if (width <= 0 || height <= 0) {
        return 0;
    }
    return width * height;
}

// The distance from a box to a point; zero when the point is inside the box.
export function boxToPointDistance(box: Box, point: vec.Vector2): number {
    // Distance along each axis to the nearest edge, zero on an axis where the
    // point lies within the box's span.
    const dx = Math.max(box[X][MIN] - point[X], 0, point[X] - box[X][MAX]);
    const dy = Math.max(box[Y][MIN] - point[Y], 0, point[Y] - box[Y][MAX]);

    return Math.hypot(dx, dy);
}

// The gap between a box and a circle: positive when they are clear of each
// other, negative when they overlap (the depth of the overlap).
export function boxToCircleGap(
    box: Box,
    center: vec.Vector2,
    radius: number,
): number {
    return boxToPointDistance(box, center) - radius;
}

// Returns true if the point lies within the box, inclusive of its edges.
export function boxContainsPoint(box: Box, point: vec.Vector2): boolean {
    return (
        point[X] >= box[X][MIN] &&
        point[X] <= box[X][MAX] &&
        point[Y] >= box[Y][MIN] &&
        point[Y] <= box[Y][MAX]
    );
}
