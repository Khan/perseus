import {clamp} from "./clamp";
import {X, Y} from "./coordinates";
import {MAX, MIN} from "./interval";

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
    return ensureValid([
        [box[X][MIN] + amount[X], box[X][MAX] - amount[X]],
        [box[Y][MIN] + amount[Y], box[Y][MAX] - amount[Y]],
    ]);
}

export function ensureValid(box: Box): Box {
    let [[xMin, xMax], [yMin, yMax]] = box;
    if (xMin > xMax) {
        xMin = xMax = average(xMin, xMax);
    }
    if (yMin > yMax) {
        yMin = yMax = average(yMin, yMax);
    }
    return [
        [xMin, xMax],
        [yMin, yMax],
    ];
}

function average(a: number, b: number): number {
    return (a + b) / 2;
}
