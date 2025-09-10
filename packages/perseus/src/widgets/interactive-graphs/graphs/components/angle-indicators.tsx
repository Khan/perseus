import {angles, geometry} from "@khanacademy/kmath";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {vec} from "mafs";
import * as React from "react";

import {segmentsIntersect} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {
    getIntersectionOfRayWithBox as getRangeIntersectionVertex,
    calculateScaledRadius,
} from "../utils";

import {MafsCssTransformWrapper} from "./css-transform-wrapper";
import {TextLabel} from "./text-label";

import type {SnapTo} from "../../types";
import type {CollinearTuple} from "@khanacademy/perseus-core";
import type {Interval} from "mafs";

const {clockwise} = geometry;
const {getAngleFromVertex} = angles;

interface PolygonAngleProps {
    centerPoint: vec.Vector2;
    endPoints: [vec.Vector2, vec.Vector2];
    areEndPointsClockwise: boolean;
    showAngles: boolean;
    snapTo: SnapTo;
}

export const PolygonAngle = ({
    centerPoint,
    endPoints,
    showAngles,
    snapTo,
    areEndPointsClockwise,
}: PolygonAngleProps) => {
    const {range} = useGraphConfig();
    const [centerX, centerY] = centerPoint;
    const [[startX, startY], [endX, endY]] = areEndPointsClockwise
        ? endPoints
        : endPoints.reverse(); // Make endpoints always clockwise

    const radius = calculateScaledRadius(range);

    const a = vec.dist(centerPoint, endPoints[0]);
    const b = vec.dist(centerPoint, endPoints[1]);
    const c = vec.dist(endPoints[0], endPoints[1]);

    let lawOfCosinesRadicand = (a ** 2 + b ** 2 - c ** 2) / (2 * a * b);

    // If the equation results in a number greater than 1 or less than -1.
    // Correct to ensure a valid angle.
    // This ensures we are not producing NaN results from Math.acos.
    if (lawOfCosinesRadicand < -1 || lawOfCosinesRadicand > 1) {
        lawOfCosinesRadicand = Math.round(lawOfCosinesRadicand);
    }

    // Law of cosines
    const angle = Math.acos(lawOfCosinesRadicand);

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
                nonScalingStroke={true}
            />
        ) : null;
    }

    // Note: Need to pass in endpoints in a clockwise order for the cross product.
    const isConcave = isConcavePolygonVertex(centerPoint, endPoints);

    const largeArcFlag = isConcave ? 1 : 0;

    const arc = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

    let angleInDegrees = angle * (180 / Math.PI);
    // If we have triggered "largArcFlag", the angle should be greater than 180
    if (isConcave) {
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

            {!isConcave && isRightPolygonAngle(angle) ? (
                <RightAngleSquare
                    start={[x1, y1]}
                    vertex={[x2, y2]}
                    end={[x3, y3]}
                    nonScalingStroke={true}
                />
            ) : (
                <Arc arc={arc} nonScalingStroke={true} />
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
    const areClockwise = clockwise([...coords, vertex]);
    const shouldReverseCoords = areClockwise && !allowReflexAngles;

    // Reverse the coordinates accordingly to ensure the angle is calculated correctly
    const clockwiseCoords = shouldReverseCoords ? coords : coords.reverse();

    // Calculate the angles between the two points
    const startAngle = getAngleFromVertex(clockwiseCoords[0], vertex);
    const endAngle = getAngleFromVertex(clockwiseCoords[1], vertex);
    const angle = (startAngle + 360 - endAngle) % 360;

    // Check if the angle is reflexive
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

    // We only ever want to show whole angles
    const angleLabel = parseFloat(angle.toFixed(0)); // Only want to show whole angles

    // Calculate the text position based on the angle and whether we allow reflex angles
    // Let's try the angle bisector method to find the midpoint of the arc
    const [textX, textY] = calculateBisectorPoint(
        point1,
        point2,
        vertex,
        isReflexive,
        allowReflexAngles,
        radius,
    );

    // Determine the color style for the arc when interactive vs disabled
    const {disableKeyboardInteraction} = useGraphConfig();
    const arcClassName = disableKeyboardInteraction
        ? "angle-arc-static"
        : "angle-arc-interactive";

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

            {isRightAngle(angle) ? (
                <RightAngleSquare
                    start={[x1, y1]}
                    vertex={[x2, y2]}
                    end={[x3, y3]}
                    className={arcClassName}
                />
            ) : (
                <Arc arc={arc} className={arcClassName} />
            )}
            {showAngles && (
                <TextLabel x={textX} y={textY} color={color.blue}>
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
    className,
    nonScalingStroke,
}: {
    start: vec.Vector2;
    vertex: vec.Vector2;
    end: vec.Vector2;
    className?: string;
    nonScalingStroke?: boolean;
}) => (
    <MafsCssTransformWrapper>
        <path
            // Use aria-hidden to hide the line from screen readers
            // so it doesn't read as "image" with no context.
            // The elements using this should have their own aria-labels,
            // so this is okay.
            aria-hidden={true}
            d={`M ${x1} ${y1} L ${x3} ${y3} M ${x3} ${y3} L ${x2} ${y2}`}
            strokeWidth={1}
            fill="none"
            className={className}
            data-testid="angle-indicators__right-angle"
            // "non-scaling-stroke" stops the stroke from scaling with different ranges
            vectorEffect={nonScalingStroke ? "non-scaling-stroke" : "none"}
        />
    </MafsCssTransformWrapper>
);

// We're conditionally adding the class name here so that we can style the arc differently
// based on whether it's an angle or a polygon angle
const Arc = ({
    arc,
    className,
    nonScalingStroke,
}: {
    arc: string;
    className?: string;
    nonScalingStroke?: boolean;
}) => {
    return (
        <MafsCssTransformWrapper>
            <path
                // Use aria-hidden to hide the line from screen readers
                // so it doesn't read as "image" with no context.
                // The elements using this should have their own aria-labels,
                // so this is okay.
                aria-hidden={true}
                d={arc}
                strokeWidth={1}
                fill="none"
                className={className}
                data-testid="angle-indicators__arc"
                // "non-scaling-stroke" stops the stroke from scaling with different ranges
                vectorEffect={nonScalingStroke ? "non-scaling-stroke" : "none"}
            />
        </MafsCssTransformWrapper>
    );
};

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
            segmentsIntersect([vertex, rangeIntersectionPoint], line) &&
            lineIntersectionCount++,
    );

    // If the number of intersections is even, the angle is inside the polygon
    return !isEven(lineIntersectionCount);
};

const isEven = (n: number) => n % 2 === 0;

/**
 * Determines if an angle is an convex (false) or concave (true) angle.
 * Uses the cross product to determine if the angle is outside the polygon.
 * If the cross product is positive for a clockwise angle, the angle is concave.
 * NOTE: This always has to take in clockwise endpoints. It cannot determine
 * if the endpoints are clockwise itself - this has to be checked by the
 * caller. This is because of edge cases involving concave polygons.
 */
export function isConcavePolygonVertex(
    centerPoint: vec.Vector2,
    clockwiseEndpoints: [vec.Vector2, vec.Vector2],
) {
    // Use cross product to determine if the angle is outside the polygon.
    // If the vertex is concave, the cross product will be positive with
    // the assumed clockwise points.
    const v1 = vec.sub(clockwiseEndpoints[1], centerPoint);
    const v2 = vec.sub(clockwiseEndpoints[0], centerPoint);
    const crossProduct = v1[0] * v2[1] - v1[1] * v2[0];
    return crossProduct > 0;
}

// This function calculates the bisector point of an angle formed by two points
// and a vertex. It is used to position the angle label so that it is always
// outside the arc at the exact midpoint of the angle.
// Reflex angles make use of polar coordinates to determine the correct direction
function calculateBisectorPoint(
    point1: vec.Vector2,
    point2: vec.Vector2,
    vertex: vec.Vector2,
    isReflex: boolean,
    allowReflex: boolean,
    arcRadius: number,
): vec.Vector2 {
    const [originX, originY] = vertex;
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    // Convert the Cartesian Coordinates to vectors
    const vectorA = [x1 - originX, y1 - originY];
    const vectorB = [x2 - originX, y2 - originY];

    // Calculate the average angle of the vectors
    // so that we can point the bisector in the correct direction using polar coordinates
    const angleA = Math.atan2(vectorA[1], vectorA[0]);
    const angleB = Math.atan2(vectorB[1], vectorB[0]);

    // Calculate the average of these two angles
    let averageAngle = (angleA + angleB) / 2;
    const angleRadians = Math.abs(angleA - angleB);

    // Adjust the average angle to point in the correct direction
    // and to account for reflex angles and a bug with 180 degrees
    // that occurs due to our angleOffsetDegrees option in the graph
    if (allowReflex) {
        // If the resulting angles are less than 180 degrees,
        // or if the user has flipped the points on the interactive element
        // ensure that we have the correct direction for the reflex angle
        if ((angleRadians <= Math.PI && isReflex) || angleB > angleA) {
            averageAngle += Math.PI; // Add 180 degrees
        }
    } else {
        // If the resulting angles are greater than 180 degrees, adjust
        // to get the correct angle, as we already know that the angle is not reflexive
        // This fixes a bug that occurs at 180 degrees due to our angleOffsetDegrees option in the graph
        if (angleRadians > Math.PI) {
            averageAngle -= Math.PI; // Subract 180 degrees
        }
    }

    // Convert the average angle back to Cartesian coordinates
    const sum = [Math.cos(averageAngle), Math.sin(averageAngle)];

    // Calculate the magnitude of the sum to normalize it
    const sumMagnitude = Math.sqrt(sum[0] ** 2 + sum[1] ** 2);
    const bisectorDirection = [sum[0] / sumMagnitude, sum[1] / sumMagnitude];

    // Calculate the initial distance of the bisector direction from the origin
    const initialDistance = Math.sqrt(
        bisectorDirection[0] ** 2 + bisectorDirection[1] ** 2,
    );

    // Determine the minimum radius to ensure that the text is always outside the arc
    const requiredDistance = arcRadius * 1.75;
    let radius = requiredDistance / initialDistance;

    // Apply radius only if the initial distance is less than required
    if (initialDistance >= requiredDistance) {
        radius = 1; // Use the unit vector as is
    }

    // Scale the bisector direction by the radius
    const bisectorPoint: vec.Vector2 = [
        bisectorDirection[0] * radius,
        bisectorDirection[1] * radius,
    ];

    // Add the vertex to the bisector point to get the final position
    // to ensure that the angle label moves with the interactive element
    const scaledBisector = vec.add(bisectorPoint, vertex);
    return scaledBisector;
}
