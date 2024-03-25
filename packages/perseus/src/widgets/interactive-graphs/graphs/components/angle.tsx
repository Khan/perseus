import {Text, vec} from "mafs";
import * as React from "react";

import {clockwise} from "../../../../util/geometry";
import {getRayIntersectionCoords as getRangeIntersectionVertex} from "../utils";

import {MafsCssTransformWrapper} from "./css-transform-wrapper";

import type {CollinearTuple} from "../../../../perseus-types";
import type {Interval} from "mafs";

interface Props {
    centerPoint: vec.Vector2;
    endPoints: [vec.Vector2, vec.Vector2];
    polygonPoints: readonly vec.Vector2[];
    active: boolean;
    range: [Interval, Interval];
    showAngles: boolean;
}

export const Angle = ({
    centerPoint,
    endPoints,
    range,
    polygonPoints,
    showAngles,
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

    if (!showAngles) {
        return isRightAngle(angle) ? (
            <RightAngleSquare
                start={[x1, y1]}
                vertex={[x2, y2]}
                end={[x3, y3]}
            />
        ) : null;
    }

    // Midpoint betwen ends of arc
    const isOutside = shouldDrawArcOutside(
        [x3, y3],
        centerPoint,
        range,
        polygonPoints,
    );

    const largeArcFlag = isOutside ? 1 : 0;
    const sweepFlag = isOutside ? 1 : 0;

    const arc = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;

    let angleInDegrees = angle * (180 / Math.PI);
    // If we have triggered "largArcFlag", the angle should be greater than 180
    if (isOutside) {
        angleInDegrees = 360 - angleInDegrees;
    }

    const angleLabelNumber = parseFloat(angleInDegrees.toFixed(1));
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

            {!isOutside && isRightAngle(angle) ? (
                <RightAngleSquare
                    start={[x1, y1]}
                    vertex={[x2, y2]}
                    end={[x3, y3]}
                />
            ) : (
                <MafsCssTransformWrapper>
                    <path d={arc} strokeWidth={0.02} fill="none" />
                </MafsCssTransformWrapper>
            )}

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

/**
 * This is broken out into its own component so that it can be used for an early return
 * (see line 55 or https://github.com/Khan/perseus/blob/84bbd882b11d16871e1b813a0b901f3b903d5479/packages/perseus/src/widgets/interactive-graphs/graphs/components/angle.tsx#L53-L57)
 */
const RightAngleSquare = ({
    start: [x1, y1],
    vertex: [x2, y2],
    end: [x3, y3],
}) => (
    <MafsCssTransformWrapper>
        <path
            d={`M ${x1} ${y1} L ${x3} ${y3} M ${x3} ${y3} L ${x2} ${y2}`}
            strokeWidth={0.02}
            fill="none"
        />
    </MafsCssTransformWrapper>
);

const isRightAngle = (angle: number) => Math.abs(angle - Math.PI / 2) < 0.01;

/**
 * Determines if an angle is an inside (false) or outside (true) angle.
 * They way, we know to flip the `largeArc` and `sweepArc` flags.
 */
export const shouldDrawArcOutside = (
    midpoint: vec.Vector2,
    vertex: vec.Vector2,
    range: [Interval, Interval],
    polygonPoints: readonly vec.Vector2[],
) => {
    // Create a ray from the midpoint (inside angle) to the edge of the range
    const rangeIntersectionPoint = getRangeIntersectionVertex(
        midpoint,
        vertex,
        range,
    );

    const lines = getLines(polygonPoints);
    let lineIntersections = 0;

    lines.forEach(
        (line) =>
            linesIntersect([vertex, rangeIntersectionPoint], line) &&
            lineIntersections++,
    );

    // If the number of intersections is even, the angle is inside the polygon
    return !isEven(lineIntersections);
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
