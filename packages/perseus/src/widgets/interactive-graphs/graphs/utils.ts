import type {Coord} from "@khanacademy/perseus";
import type {Interval, vec} from "mafs";

/**
 * Given a ray and a rectangular box, find the point where the ray intersects
 * the edge of the box. Assumes the `initialPoint` is inside the box.
 * @param initialPoint - The starting point of the ray.
 * @param throughPoint - A point that the ray passes through. Must be different from initialPoint.
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
    const inverseSlope = 1 / slope;

    const xExtreme = xDiff < 0 ? xMin : xMax;
    const yExtreme = yDiff < 0 ? yMin : yMax;

    const yAtXExtreme = aY + (xExtreme - aX) * slope;
    const xAtYExtreme = aX + (yExtreme - aY) * inverseSlope;

    switch (true) {
        // does the ray exit the graph bounding box via the left or right edge?
        case isBetween(yAtXExtreme, yMin, yMax):
            return [xExtreme, yAtXExtreme];

        // does the ray exit the graph bounding box via the top or bottom edge?
        case isBetween(xAtYExtreme, xMin, xMax):
            return [xAtYExtreme, yExtreme];

        default:
            return [xExtreme, yExtreme];
    }
};

function isBetween(x: number, low: number, high: number) {
    return x >= low && x <= high;
}

export function getArrayWithoutDuplicates(array: Array<Coord>): Array<Coord> {
    const returnArray: Array<Coord> = [];

    for (const coordPair of array) {
        if (
            // Check if the coordPair is not already in the returnArray
            !returnArray.some(
                ([x, y]) => x === coordPair[0] && y === coordPair[1],
            )
        ) {
            returnArray.push(coordPair);
        }
    }

    return returnArray;
}
