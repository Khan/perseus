/**
 * Line Utils
 * A line is an array of two points e.g. [[-5, 0], [5, 0]].
 */

import * as kpoint from "./point";
import * as kvector from "./vector";

import type {Point} from "./point";

export type Line = [Point, Point];

export function distanceToPoint(line: Line, point: Point): number {
    return kpoint.distanceToLine(point, line);
}

export function reflectPoint(line: Line, point: Point): Point {
    return kpoint.reflectOverLine(point, line);
}

export function midpoint(line: Line): Point {
    return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
}

export function equal(line1: Line, line2: Line, tolerance?: number): boolean {
    // TODO: A nicer implementation might just check collinearity of
    // vectors using underscore magick
    // Compare the directions of the lines
    const v1 = kvector.subtract(line1[1], line1[0]);
    const v2 = kvector.subtract(line2[1], line2[0]);
    if (!kvector.collinear(v1, v2, tolerance)) {
        return false;
    }
    // If the start point is the same for the two lines, then they are the same
    if (kpoint.equal(line1[0], line2[0])) {
        return true;
    }
    // Make sure that the direction to get from line1 to
    // line2 is the same as the direction of the lines
    const line1ToLine2Vector = kvector.subtract(line2[0], line1[0]);
    return kvector.collinear(v1, line1ToLine2Vector, tolerance);
}
