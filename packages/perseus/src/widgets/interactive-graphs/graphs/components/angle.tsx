import {Text, vec} from "mafs";
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
    color?: string;
}

export const Angle = ({
    centerPoint,
    endPoints,
    range,
    polygonPoints,
    color = "var(--movable-line-stroke-color)",
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

    // Law of cosines
    const angle = Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));

    const startAngle = Math.atan2(startY - centerY, startX - centerX);
    const endAngle = Math.atan2(endY - centerY, endX - centerX);
    // const normalizedAngle = angle > 2 * Math.PI ? angle - 2 * Math.PI : angle;
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

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

    const angleLabelNumber = parseFloat((angle * (180 / Math.PI)).toFixed(1));
    const angleLabel = Number.isInteger(angleLabelNumber)
        ? angleLabelNumber
        : "≈ " + angleLabelNumber;

    return (
        <>
            <defs>
                <filter
                    id="background"
                    x="-5%"
                    width="110%"
                    y="0%"
                    height="100%"
                >
                    <feFlood floodColor="#FFF" floodOpacity="0.5" />
                    <feComposite operator="over" in="SourceGraphic" />
                </filter>
            </defs>
            <g
                style={{
                    transform: `var(--mafs-view-transform) var(--mafs-user-transform)`,
                }}
            >
                <path
                    d={isRightAngle(angle) ? square : arc}
                    strokeWidth={0.02}
                    fill="none"
                />
            </g>
            <Text
                x={x3}
                y={y3}
                size={15}
                svgTextProps={{
                    filter: "url(#background)",
                    fontWeight: "bold",
                }}
                // Shift position if text is too close to movable point
                attach={y3 - centerY > 0 ? "s" : "n"}
                attachDistance={
                    Math.abs(y3 - centerY) < 0.2 ||
                    vec.dist([x3, y3], centerPoint) < 0.3
                        ? 20
                        : 10
                }
            >
                {angleLabel}°
            </Text>
        </>
    );
};

const isRightAngle = (angle) => {
    if (angle > Math.PI) {
        angle = Math.abs(angle - Math.PI);
    }
    return Math.abs(angle - Math.PI / 2) < 0.01;
};

const shouldDrawArcInside = (
    midPoint: vec.Vector2,
    vertex: vec.Vector2,
    range: [Interval, Interval],
    polygonPoints: readonly vec.Vector2[],
) => {
    const throughLine = getRayIntersectionCoords(vertex, midPoint, range);

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
