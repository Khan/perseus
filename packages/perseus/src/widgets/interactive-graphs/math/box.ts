import {Interval, vec} from "mafs";
import {clamp} from "./clamp";

export type Box = [x: Interval, y: Interval];

// Restricts the `point` to be within `box`, by clamping each coordinate to the
// corresponding interval.
export function clampToBox(box: Box, point: vec.Vector2): vec.Vector2 {
    return [
        // TODO: x and y coordinate functions
        clamp(point[0], ...box[0]),
        clamp(point[1], ...box[1])
    ]
}

// Reduces the size of `box`, trimming each corner by the given positive
// `amount`. If a component of `amount` is negative, the box is expanded in
// that dimension instead.
export function inset(amount: vec.Vector2, box: Box): Box {
    return ensureValid([
        [box[0][0] + amount[0], box[0][1] - amount[0]],
        [box[1][0] + amount[1], box[1][1] - amount[1]],
    ]);
}

export function ensureValid(box: Box): Box {
    let [[xMin, xMax], [yMin, yMax]] = box
    if (xMin > xMax) {
        xMin = xMax = average(xMin, xMax);
    }
    if (yMin > yMax) {
        yMin = yMax = average(yMin, yMax);
    }
    return [[xMin, xMax], [yMin, yMax]]
}

function average(a: number, b: number): number {
    return (a + b) / 2
}
