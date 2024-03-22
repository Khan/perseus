import {vec} from "mafs";
import * as React from "react";

import {clockwise} from "../../../../util/geometry";
import {getRayIntersectionCoords as getRangeIntersectionVertex} from "../utils";

import {TextLabel} from "./text-label";

import type {CollinearTuple} from "../../../../perseus-types";
import type {Interval} from "mafs";

interface Props {
    centerPoint: vec.Vector2;
    endPoints: [vec.Vector2, vec.Vector2];
    polygonPoints: readonly vec.Vector2[];
    active: boolean;
    range: [Interval, Interval];
    color?: string;
}

export const Angle = ({
    centerPoint,
    endPoints,
    range,
    polygonPoints,
}: Props) => {
    const [centerX, centerY] = centerPoint;
    const areClockwise = clockwise([centerPoint, ...endPoints]);
    const [[startX, startY], [endX, endY]] = areClockwise
        ? endPoints
        : endPoints.reverse();

    const radius = 0.3;

    const a = vec.dist(centerPoint, endPoints[0]);
    const b = vec.dist(centerPoint, endPoints[1]);
    const c = vec.dist(endPoints[0], endPoints[1]);

    const y1 = centerY + ((startY - centerY) / a) * radius;
    const x2 = centerX + ((endX - centerX) / b) * radius;
    const x1 = centerX + ((startX - centerX) / a) * radius;
    const y2 = centerY + ((endY - centerY) / b) * radius;

    // Fourth point that would create a rhomboid
    // Used to calculate the inside of the angle and to create square
    const [x3, y3] = vec.add(
        centerPoint,
        vec.add(vec.sub([x1, y1], centerPoint), vec.sub([x2, y2], centerPoint)),
    );

    // Midpoint betwen ends of arc
    const isInside = shouldDrawArcInside(
        [x3, y3],
        centerPoint,
        range,
        polygonPoints,
    );

    const largeArcFlag = isInside ? 1 : 0;
    const sweepFlag = isInside ? 1 : 0;

    const arc = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
    const square = `M ${x1} ${y1} L ${x3} ${y3} M ${x3} ${y3} L ${x2} ${y2}`;

    // Law of cosines
    const angle = Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));

    let angleInDegrees = angle * (180 / Math.PI);
    // If we have triggered "largArcFlag", the angle should be greater than 180
    if (isInside) {
        angleInDegrees = 360 - angleInDegrees;
    }

    const angleLabelNumber = parseFloat(angleInDegrees.toFixed(1));
    const angleLabel = Number.isInteger(angleLabelNumber)
        ? angleLabelNumber
        : "≈ " + angleLabelNumber;

    return (
        <>
            <g
                style={{
                    transform: `var(--mafs-view-transform) var(--mafs-user-transform)`,
                }}
            >
                <path
                    d={!isInside && isRightAngle(angle) ? square : arc}
                    strokeWidth={0.02}
                    fill="none"
                />
            </g>
            <TextLabel
                x={x3}
                y={y3}
                attach={y3 - centerY > 0 ? "s" : "n"}
                attachDistance={
                    Math.abs(y3 - centerY) < 0.2 ||
                    vec.dist([x3, y3], centerPoint) < 0.3
                        ? 20
                        : 10
                }
            >
                {angleLabel}°
            </TextLabel>
        </>
    );
};

const isRightAngle = (angle) => Math.abs(angle - Math.PI / 2) < 0.01;

const shouldDrawArcInside = (
    midPoint: vec.Vector2,
    vertex: vec.Vector2,
    range: [Interval, Interval],
    polygonPoints: readonly vec.Vector2[],
) => {
    const rangeIntersectionPoint = getRangeIntersectionVertex(
        vertex,
        midPoint,
        range,
    );

    const lines = getLines(polygonPoints);
    let lineIntersections = 0;

    lines.forEach(
        (line) =>
            linesIntersect([vertex, rangeIntersectionPoint], line) &&
            lineIntersections++,
    );

    // The intersection check will sometimes return false if it intersects with
    // another vertex, so in the case we get 0 intersections, we check for points.
    if (lineIntersections === 0) {
        // find point in array
        const midpointIndex = polygonPoints.findIndex(
            ([x, y]) => x === midPoint[0] && y === midPoint[1],
        );
        // get array sans point and adjacent points
        const [prev, next] = [
            (midpointIndex - 1 + polygonPoints.length) % polygonPoints.length,
            (midpointIndex + 1) % polygonPoints.length,
        ];
        const [[lineAx, lineAy], [lineBx, lineBy]] = [
            midPoint,
            rangeIntersectionPoint,
        ];
        for (let i = 0; i < polygonPoints.length; i++) {
            if ([prev, midpointIndex, next].includes(i)) {
                continue;
            }
            const [x, y] = polygonPoints[i];
            const intersectsPoint =
                (y - lineAy) * (lineBx - lineAx) ===
                (lineBy - lineAy) * (x - lineAx);
            if (intersectsPoint) {
                return false;
            }
        }
        return true;
    }

    // If the number of intersections is even, the angle is inside the polygon
    return isEven(lineIntersections);
};

const getLines = (points: readonly vec.Vector2[]): CollinearTuple[] =>
    points.map((point, i) => {
        const next = points[(i + 1) % points.length];
        return [point, next];
    });

// https://stackoverflow.com/a/24392281/7347484
// The "intersects" function in geometry doesn't seem to work for this use case
const linesIntersect = (
    [[a, b], [c, d]]: CollinearTuple,
    [[p, q], [r, s]]: CollinearTuple,
) => {
    const determinant = (c - a) * (s - q) - (r - p) * (d - b);
    if (determinant === 0) {
        return false;
    } else {
        const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / determinant;
        const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / determinant;
        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
};

const isEven = (n: number) => n % 2 === 0;
