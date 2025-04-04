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

// Returns true if the point is within the range of the graph.
export function isInBound({
    range,
    point,
}: {
    range: [Interval, Interval];
    point: vec.Vector2;
}): boolean {
    return (
        point[X] >= range[X][MIN] &&
        point[X] <= range[X][MAX] &&
        point[Y] >= range[Y][MIN] &&
        point[Y] <= range[Y][MAX]
    );
}
