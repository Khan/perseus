import {Interval, vec} from "mafs";
import {clamp} from "./clamp";
import {x, y} from "./coordinates";

export type Box = [x: Interval, y: Interval];

// Restricts the `point` to be within `box`, by clamping each coordinate to the
// corresponding interval.
export function clampToBox(box: Box, point: vec.Vector2): vec.Vector2 {
    return [
        clamp(x(point), ...x(box)),
        clamp(y(point), ...y(box))
    ]
}

// Reduces the size of `box`, trimming each corner by the given positive
// `amount`. If a component of `amount` is negative, the box is expanded in
// that dimension instead.
export function inset(amount: vec.Vector2, box: Box): Box {
    return ensureValid([
        [x(box)[0] + x(amount), x(box)[1] - x(amount)],
        [y(box)[0] + y(amount), y(box)[1] - y(amount)],
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
