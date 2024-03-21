import {vec} from "mafs";
import * as React from "react";

import {clockwise} from "../../../../util/geometry";

import {getRayIntersectionCoords} from "./movable-line";

import type {CollinearTuple} from "../../../../perseus-types";
import type {Interval} from "mafs";

interface Props {
    centerPoint: vec.Vector2;
    endPoints: [vec.Vector2, vec.Vector2];
    polygonPoints: readonly vec.Vector2[];
    active: boolean;
    range: [Interval, Interval];
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

    const startAngle = Math.atan2(startY - centerY, startX - centerX);
    const endAngle = Math.atan2(endY - centerY, endX - centerX);
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    // Midpoint betwen ends of arc
    const isInside = shouldDrawArcInside(
        [
            [x1, y1],
            [x2, y2],
        ],
        centerPoint,
        range,
        polygonPoints,
    );

    const largeArcFlag = isInside ? 1 : 0;
    const sweepFlag = isInside ? 1 : 0;
    // isClockwise ? 0 : 1;

    const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;

    return (
        <>
            <g
                style={{
                    transform: `var(--mafs-view-transform) var(--mafs-user-transform)`,
                }}
            >
                <path d={d} strokeWidth={0.02} fill="none" />
            </g>
        </>
    );
};

const shouldDrawArcInside = (
    [[x1, y1], [x2, y2]]: CollinearTuple,
    vertex: vec.Vector2,
    range: [Interval, Interval],
    polygonPoints: readonly vec.Vector2[],
) => {
    // Midpoint betwen ends of arc
    const midpoint = vec.midpoint([x1, y1], [x2, y2]);
    const throughLine = getRayIntersectionCoords(vertex, midpoint, range);

    const lines = getLines(polygonPoints);
    let blackLineIntersections = 0;

    lines.forEach(
        (line) =>
            linesIntersect([vertex, throughLine], line) &&
            blackLineIntersections++,
    );

    // If the number of intersections is even, the angle is inside the polygon
    return isEven(blackLineIntersections);
};

const getLines = (points: readonly vec.Vector2[]): CollinearTuple[] =>
    points.map((point, i) => {
        const next = points[(i + 1) % points.length];
        return [point, next];
    });

// https://stackoverflow.com/a/24392281/7347484
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
