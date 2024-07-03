import {vec} from "mafs";
import * as React from "react";

import {clockwise} from "../../../../util/geometry";
import {getIntersectionOfRayWithBox as getRangeIntersectionVertex} from "../utils";

import {MafsCssTransformWrapper} from "./css-transform-wrapper";
import {TextLabel} from "./text-label";

import type {CollinearTuple} from "../../../../perseus-types";
import type {Interval} from "mafs";

interface PolygonAngleProps {
    centerPoint: vec.Vector2;
    endPoints: [vec.Vector2, vec.Vector2];
    polygonLines: readonly CollinearTuple[];
    active: boolean;
    range: [Interval, Interval];
    showAngles: boolean;
    snapTo: "grid" | "angles" | "sides";
}

export const PolygonAngle = ({
    centerPoint,
    endPoints,
    range,
    polygonLines,
    showAngles,
    snapTo,
}: PolygonAngleProps) => {
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
        return isRightPolygonAngle(angle) ? (
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
        polygonLines,
    );

    const largeArcFlag = isOutside ? 1 : 0;
    const sweepFlag = isOutside ? 1 : 0;

    const arc = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;

    let angleInDegrees = angle * (180 / Math.PI);
    // If we have triggered "largArcFlag", the angle should be greater than 180
    if (isOutside) {
        angleInDegrees = 360 - angleInDegrees;
    }

    // Only want to show whole numbers when in angles mode
    const angleLabelNumber = parseFloat(
        angleInDegrees.toFixed(snapTo === "angles" ? 0 : 1),
    );
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

interface AngleProps {
    vertex: vec.Vector2;
    coords: [vec.Vector2, vec.Vector2];
    showAngles: boolean;
    allowReflexAngles: boolean;
    angleOffsetDeg: number;
    snapDegrees: number;
    range: [Interval, Interval];
}

export const Angle = ({
    vertex,
    coords,
    showAngles,
    allowReflexAngles,
    range,
}: AngleProps) => {
    // Check if the points are clockwise or not, depending on whether we allow reflex angles
    const areClockwise = clockwise([...coords, vertex]) && !allowReflexAngles;

    // Reverse the coordinates accordingly to ensure the angle is calculated correctly
    const clockwiseCoords = areClockwise ? coords : coords.reverse();

    // Calculate the angles between the two points
    const startAngle = findAngle(clockwiseCoords[0], vertex);
    const endAngle = findAngle(clockwiseCoords[1], vertex);
    const angle = (startAngle + 360 - endAngle) % 360;
    const halfAngle = (angle / 2) % 360;
    const angleLabel = parseFloat(angle.toFixed(0)); // Only want to show whole angles

    // Check if the angle is reflexive and if we should allow it
    const isReflexive = angle > 180;

    // Break out the necessary points for the arc calculation
    const [centerX, centerY] = vertex;
    const [point1, point2] = clockwiseCoords;
    const [startX, startY] = point1;
    const [endX, endY] = point2;
    const a = vec.dist(vertex, point1);
    const b = vec.dist(vertex, point2);

    // Set the radius of the arc
    const radius = 2;

    // Calculate the end points of the arc
    const y1 = centerY + ((startY - centerY) / a) * radius;
    const x2 = centerX + ((endX - centerX) / b) * radius;
    const x1 = centerX + ((startX - centerX) / a) * radius;
    const y2 = centerY + ((endY - centerY) / b) * radius;

    // Used to calculate the inside of the angle and to create square
    const [x3, y3] = vec.add(
        vertex,
        vec.add(vec.sub([x1, y1], vertex), vec.sub([x2, y2], vertex)),
    );

    // Determine whether the arc should be drawn outside the angle
    const isOutside = shouldDrawArcOutside([x3, y3], vertex, range, [
        [vertex, point1],
        [vertex, point2],
    ]);

    // Determine the flags for the arc
    // If the angle is outside OR reflexive, we want to draw a large arc
    // If the angle is outside AND reflexive, we want to sweep the arc
    const largeArcFlag = isOutside || isReflexive ? 1 : 0;
    const sweepFlag = isOutside && isReflexive ? 1 : 0;

    // Create the SVG path for the arc
    const arc = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;

    // Calculate the text position based on the angle and depending on whether it is reflexive, and if it is allowed to be reflexive
    // We want to scale the current radius to ensure the text is outside the arc, and we're multiplying the angle by -1 to ensure the
    // text moves in the correct direction.
    const offset = scaledPolarDeg(radius * 1.5, -1 * halfAngle);
    const [textX, textY] = vec.add(vertex, offset);

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

            {!isReflexive && isRightAngle(angle) ? (
                <RightAngleSquare
                    start={[x1, y1]}
                    vertex={[x2, y2]}
                    end={[x3, y3]}
                />
            ) : (
                <MafsCssTransformWrapper>
                    <path
                        d={arc}
                        strokeWidth="2000"
                        fill="none"
                        className={"angle-arc"}
                    />
                </MafsCssTransformWrapper>
            )}
            {showAngles && (
                <TextLabel x={textX} y={areClockwise ? -textY : textY}>
                    {angleLabel}°
                </TextLabel>
            )}
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

const isRightPolygonAngle = (angle: number) =>
    Math.abs(angle - Math.PI / 2) < 0.01;
const isRightAngle = (angle: number) => Math.round(angle) === 90;

/**
 * Determines if an angle is an inside (false) or outside (true) angle.
 * They way, we know to flip the `largeArc` and `sweepArc` flags.
 * Uses the priciple that a ray from a point inside a polygon will intersect
 * with an odd number of lines, while a ray from a point outside the polygon
 * will intersect with an even number of lines.
 * https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
 */
export const shouldDrawArcOutside = (
    midpoint: vec.Vector2,
    vertex: vec.Vector2,
    range: [Interval, Interval],
    polygonLines: readonly CollinearTuple[],
) => {
    // Create a ray from the midpoint (inside angle) to the edge of the range
    const rangeIntersectionPoint = getRangeIntersectionVertex(
        midpoint,
        vertex,
        range,
    );

    let lineIntersectionCount = 0;

    polygonLines.forEach(
        (line) =>
            linesIntersect([vertex, rangeIntersectionPoint], line) &&
            lineIntersectionCount++,
    );

    // If the number of intersections is even, the angle is inside the polygon
    return !isEven(lineIntersectionCount);
};

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

const findAngle = (
    point1: vec.Vector2,
    point2: vec.Vector2,
    vertex?: vec.Vector2,
): number => {
    if (vertex === undefined) {
        const x = point1[0] - point2[0];
        const y = point1[1] - point2[1];
        if (!x && !y) {
            return 0;
        }
        return (180 + (Math.atan2(-y, -x) * 180) / Math.PI + 360) % 360;
    }
    return findAngle(point1, vertex) - findAngle(point2, vertex);
};

function scaledPolarRad(radius: number, radians: number): vec.Vector2 {
    return [
        radius * Math.cos(radians),
        radius * Math.sin(radians) * -1, // SVG flips y axis
    ];
}

function scaledPolarDeg(radius: number, degrees): vec.Vector2 {
    const radians = (degrees * Math.PI) / 180;
    return scaledPolarRad(radius, radians);
}
