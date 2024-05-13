import type {CollinearTuple} from "../../../perseus-types";
import type {Interval, vec} from "mafs";

export function calculateAngleInDegrees([x, y]: vec.Vector2) {
    return (Math.atan2(y, x) * 180) / Math.PI;
}

/**
 * Given a ray and a rectangular box, find the point where the ray intersects
 * the edge of the box. Assumes the `initialPoint` is inside the box.
 * @param initialPoint - A point that the ray passes through. Must be different from initialPoint.
 * @param throughPoint - The starting point of the ray.
 * @param box - The box with which to intersect the ray, in the form [[xMin, xMax], [yMin, yMax]]
 */
export const getIntersectionOfRayWithBox = (
    initialPoint: vec.Vector2,
    throughPoint: vec.Vector2,
    box: [x: Interval, y: Interval],
): [number, number] => {
    const [[xMin, xMax], [yMin, yMax]] = box;
    const [aX, aY] = initialPoint;
    const [bX, bY] = throughPoint;

    const yDiff = bY - aY;
    const xDiff = bX - aX;
    const slope = yDiff / xDiff;
    const inverseSlope = 1 / slope

    const yAtXMin = aY + (xMin - aX) * slope;
    const yAtXMax = aY + (xMax - aX) * slope;
    const xAtYMin = aX + (yMin - aY) * inverseSlope;
    const xAtYMax = aX + (yMax - aY) * inverseSlope;

    // clock analogy to describe quadrants
    switch (true) {
        // 6 o'clock
        case yDiff < 0 && xDiff === 0:
            return [aX + 0, yMin]
        // 12 o'clock
        case yDiff > 0 && xDiff === 0:
            return [aX + 0, yMax]
        // 9 o'clock
        case yDiff === 0 && xDiff < 0:
            return [xMin, aY + 0]
        // 3 o'clock
        case yDiff === 0 && xDiff > 0:
            return [xMax, aY + 0]

        case yDiff > 0 && xDiff > 0 && xAtYMax > xMax:
        case yDiff < 0 && xDiff > 0 && xAtYMin > xMax:
            return [xMax, yAtXMax]

        case yDiff < 0 && xDiff > 0:
        case yDiff < 0 && xDiff < 0 && xAtYMin >= xMin:
            return [xAtYMin, yMin];

        case yDiff < 0 && xDiff < 0 && xAtYMin < xMin:
        case yDiff > 0 && xDiff < 0 && xAtYMax < xMin:
            return [xMin, yAtXMin];

        case yDiff > 0 && xDiff > 0 && xAtYMax <= xMax:
        case yDiff > 0 && xDiff < 0:
            return [xAtYMax, yMax];

        default:
            return [xMax, yAtXMax];
    }
};

export const getLines = (points: readonly vec.Vector2[]): CollinearTuple[] => {
    return points.map((point, i) => {
        const next = points[(i + 1) % points.length];
        return [point, next];
    });
};
