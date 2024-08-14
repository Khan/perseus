import {vec} from "mafs";

export type Segment = [vec.Vector2, vec.Vector2];

// Determines whether two line segments have exactly one intersection point.
// The segments are treated as "open" - that is, not inclusive of their
// endpoints.
// Algorithm from https://stackoverflow.com/a/24392281/7347484
export const segmentsIntersect = (
    [[a, b], [c, d]]: Segment,
    [[p, q], [r, s]]: Segment,
): boolean => {
    const determinant = (c - a) * (s - q) - (r - p) * (d - b);
    if (determinant === 0) {
        return false;
    } else {
        const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / determinant;
        const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / determinant;
        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
};

// Finds the unique intersection point between two rays. Returns undefined if
// there is not exactly one intersection point. The first point in each of the
// given ray "segments" should be the initial point of the ray. The second point
// can be any arbitrary point on the ray different from the initial point.
export function findIntersectionOfRays(
    [[a, b], [c, d]]: Segment,
    [[p, q], [r, s]]: Segment,
): vec.Vector2 | undefined {
    // See https://stackoverflow.com/a/24392281/7347484 for an explanation of
    // the determinant and lambda values.
    const determinant = (c - a) * (s - q) - (r - p) * (d - b);
    if (determinant === 0) {
        return undefined;
    } else {
        const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / determinant;
        const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / determinant;
        if (lambda <= 0 || gamma >= 1) {
            return undefined;
        }
        const initialPoint: vec.Vector2 = [a, b];
        const direction = vec.sub([c, d], initialPoint);
        return vec.add(initialPoint, vec.scale(direction, lambda));
    }
}
