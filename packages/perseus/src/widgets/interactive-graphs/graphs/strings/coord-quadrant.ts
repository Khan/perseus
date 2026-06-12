import {srFormatNumber} from "./format-number";

import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {Coord} from "@khanacademy/perseus-core";

type GraphLocations = "origin" | "x-axis" | "y-axis" | 1 | 2 | 3 | 4;

export function getCoordQuadrant(coord: Coord): GraphLocations {
    const [unroundedX, unroundedY] = coord;
    const x = Number(unroundedX.toFixed(3));
    const y = Number(unroundedY.toFixed(3));

    if (x === 0 && y === 0) {
        return "origin";
    }

    if (y === 0) {
        return "x-axis";
    }

    if (x === 0) {
        return "y-axis";
    }

    if (x > 0 && y > 0) {
        return 1;
    }

    if (x < 0 && y > 0) {
        return 2;
    }

    if (x < 0 && y < 0) {
        return 3;
    }

    return 4;
}

export function getQuadraticVertexString(
    vertex: Coord,
    strings: PerseusStrings,
): string {
    const location = getCoordQuadrant(vertex);

    switch (location) {
        case "origin":
            return strings.srQuadraticGraphVertexOrigin;
        case "x-axis":
            return strings.srQuadraticGraphVertexXAxis;
        case "y-axis":
            return strings.srQuadraticGraphVertexYAxis;
        default:
            return strings.srQuadraticGraphVertexQuadrant({quadrant: location});
    }
}

export function getQuadraticPointString(
    pointNumber,
    coord: Coord,
    strings: PerseusStrings,
    locale: string,
): string {
    const location = getCoordQuadrant(coord);
    const [x, y] = coord;

    switch (location) {
        case "origin":
            return strings.srQuadraticPointOrigin({pointNumber: pointNumber});
        case "x-axis":
        case "y-axis":
            return strings.srQuadraticPointAxis({
                pointNumber: pointNumber,
                x: srFormatNumber(x, locale),
                y: srFormatNumber(y, locale),
            });
        default:
            return strings.srQuadraticPointQuadrant({
                pointNumber: pointNumber,
                quadrant: location,
                x: srFormatNumber(x, locale),
                y: srFormatNumber(y, locale),
            });
    }
}
