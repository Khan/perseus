import {vec} from "mafs";

import {boxContainsPoint} from "./box";
import {clamp} from "./clamp";

import type {Box} from "./box";

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

// The shortest distance from a point to a line segment. Unlike the distance to
// an infinite line, this measures to the nearer endpoint when the point lies
// beyond either end of the segment.
export function pointToSegmentDistance(
    point: vec.Vector2,
    [a, b]: Segment,
): number {
    const aToB = vec.sub(b, a);
    const aToPoint = vec.sub(point, a);
    const lengthSquared = vec.squareDist(a, b);

    // A zero-length segment is just a point, so measure to it directly.
    if (lengthSquared === 0) {
        return vec.mag(aToPoint);
    }

    // How far along the segment the nearest point lies, as a fraction of its
    // length: 0 is `a`, 1 is `b`. Projecting `aToPoint` onto `aToB` gives the
    // position; dividing by the squared length scales it into that fraction.
    // Clamping keeps a point beyond either end measuring to that end rather
    // than to the infinite line through the segment.
    const nearestSegmentFraction = clamp(
        vec.dot(aToPoint, aToB) / lengthSquared,
        0,
        1,
    );
    const nearestSegmentPoint = vec.add(
        a,
        vec.scale(aToB, nearestSegmentFraction),
    );

    return vec.dist(point, nearestSegmentPoint);
}

// The shortest distance from a line segment to a box; zero when they touch.
//
// A segment is not axis-aligned, so its bounding box is a poor stand-in: for a
// 45-degree segment the box reaches far past the segment itself, and something
// comfortably clear of it would read as overlapping. This measures the segment.
export function segmentToBoxDistance(segment: Segment, box: Box): number {
    const [a, b] = segment;

    if (boxContainsPoint(box, a) || boxContainsPoint(box, b)) {
        return 0;
    }

    const [[xMin, xMax], [yMin, yMax]] = box;
    const corners: vec.Vector2[] = [
        [xMin, yMin],
        [xMax, yMin],
        [xMax, yMax],
        [xMin, yMax],
    ];
    const edges = corners.map(
        (corner, i): Segment => [corner, corners[(i + 1) % corners.length]],
    );

    for (const edge of edges) {
        if (segmentsIntersect(segment, edge)) {
            return 0;
        }
    }

    const distanceToEdge = (edge: Segment) =>
        Math.min(
            pointToSegmentDistance(edge[0], segment),
            pointToSegmentDistance(edge[1], segment),
            pointToSegmentDistance(a, edge),
            pointToSegmentDistance(b, edge),
        );

    return Math.min(...edges.map(distanceToEdge));
}
