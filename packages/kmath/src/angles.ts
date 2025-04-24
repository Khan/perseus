// This file contains helper functions for working with angles.

import {clockwise} from "./geometry";

import type {Coord} from "@khanacademy/perseus-core";

export function convertDegreesToRadians(degrees: number): number {
    return (degrees / 180) * Math.PI;
}

export function convertRadiansToDegrees(radians: number): number {
    const degree = (radians / Math.PI) * 180;
    // Account for floating point errors.
    return Number(degree.toPrecision(15));
}

// Returns a value between -180 and 180, inclusive. The angle is measured
// between the positive x-axis and the given vector.
export function calculateAngleInDegrees([x, y]: Coord): number {
    return (Math.atan2(y, x) * 180) / Math.PI;
}

// Converts polar coordinates to cartesian. The th(eta) parameter is in degrees.
export function polar(r: number | Coord, th: number): Coord {
    if (typeof r === "number") {
        r = [r, r];
    }
    th = (th * Math.PI) / 180;
    return [r[0] * Math.cos(th), r[1] * Math.sin(th)];
}
// This function calculates the angle between two points and an optional vertex.
// If the vertex is not provided, the angle is measured between the two points.
// This does not account for reflex angles or clockwise position.
export const getAngleFromVertex = (point: Coord, vertex: Coord): number => {
    const x = point[0] - vertex[0];
    const y = point[1] - vertex[1];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!x && !y) {
        return 0;
    }
    return (180 + (Math.atan2(-y, -x) * 180) / Math.PI + 360) % 360;
};

// This function calculates the clockwise angle between three points,
// and is used to generate the labels and equation strings of the
// current angle for the interactive graph.
export const getClockwiseAngle = (
    coords: [Coord, Coord, Coord],
    allowReflexAngles: boolean = false,
): number => {
    const coordsCopy = [...coords];
    // The coords are saved as [point1, vertex, point2] in the interactive graph
    const areClockwise = clockwise([
        coordsCopy[0],
        coordsCopy[2],
        coordsCopy[1],
    ]);

    // We may need to reverse the coordinates if we allow
    // reflex angles and the points are not in clockwise order.
    const shouldReverseCoords = !areClockwise || allowReflexAngles;

    // Reverse the coordinates accordingly to ensure the angle is calculated correctly
    const clockwiseCoords = shouldReverseCoords
        ? coordsCopy.reverse()
        : coordsCopy;

    // Calculate the angles between the two points and get the difference
    // between the two angles to get the clockwise angle.
    const startAngle = getAngleFromVertex(
        clockwiseCoords[0],
        clockwiseCoords[1],
    );
    const endAngle = getAngleFromVertex(clockwiseCoords[2], clockwiseCoords[1]);
    const angle = (startAngle + 360 - endAngle) % 360;
    return angle;
};
