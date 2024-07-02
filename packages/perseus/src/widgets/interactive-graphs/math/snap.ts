import type {vec} from "mafs";

// Rounds each component of `point` to the nearest multiple of the
// corresponding component of `snapStep`. E.g. if the snap step is [2, 3],
// the x-coord of the point will be rounded to the nearest multiple of 2, and
// the y-coord of the point will be rounded to the nearest multiple of 3.
export function snap(snapStep: vec.Vector2, point: vec.Vector2): vec.Vector2 {
    const [requestedX, requestedY] = point;
    const [snapX, snapY] = snapStep;
    return [
        Math.round(requestedX / snapX) * snapX,
        Math.round(requestedY / snapY) * snapY,
    ];
}
