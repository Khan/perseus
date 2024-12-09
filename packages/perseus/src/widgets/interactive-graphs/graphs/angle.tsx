import {vec} from "mafs";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {X, Y, calculateAngleInDegrees, getClockwiseAngle, polar} from "../math";
import {findIntersectionOfRays} from "../math/geometry";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {Angle} from "./components/angle-indicators";
import {trimRange} from "./components/movable-line";
import {MovablePoint} from "./components/movable-point";
import {SVGLine} from "./components/svg-line";
import {Vector} from "./components/vector";
import {srFormatNumber} from "./screenreader-text";
import {useTransformVectorsToPixels} from "./use-transform";
import {getIntersectionOfRayWithBox} from "./utils";

import type {CollinearTuple} from "../../../perseus-types";
import type {Segment} from "../math/geometry";
import type {
    AngleGraphState,
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
} from "../types";

type AngleGraphProps = MafsGraphProps<AngleGraphState>;

export function renderAngleGraph(
    state: AngleGraphState,
    dispatch: Dispatch,
): InteractiveGraphElementSuite {
    return {
        graph: <AngleGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: null,
    };
}

function AngleGraph({dispatch, graphState}: AngleGraphProps) {
    const {graphDimensionsInPixels} = useGraphConfig();

    const {coords, showAngles, range, allowReflexAngles, snapDegrees} =
        graphState;

    // Break the coords into the two end points and the center point
    const endPoints: [vec.Vector2, vec.Vector2] = [coords[0], coords[2]];
    const centerPoint = coords[1];

    // Convert the vectors to pixels for rendering the svg lines
    const angleLines: CollinearTuple[] = [
        [centerPoint, endPoints[0]],
        [centerPoint, endPoints[1]],
    ];

    const linePixelCoords = [
        useTransformVectorsToPixels(centerPoint, endPoints[0]),
        useTransformVectorsToPixels(centerPoint, endPoints[1]),
    ] as CollinearTuple[];

    // Create the SVG lines for the angle
    const svgLines = linePixelCoords.map(([startPtPx, endPtPx], i) => {
        const trimmedRange = trimRange(range, graphDimensionsInPixels);
        const endExtend = getIntersectionOfRayWithBox(
            angleLines[i][0],
            angleLines[i][1],
            trimmedRange,
        );

        return (
            <g key={`line-${i}`}>
                <SVGLine
                    start={startPtPx}
                    end={endPtPx}
                    style={{
                        stroke: "var(--movable-line-stroke-color)",
                        strokeWidth: "var(--movable-line-stroke-weight)",
                    }}
                />
                <Vector
                    tail={angleLines[i][1]}
                    tip={endExtend}
                    color={"var(--movable-line-stroke-color)"}
                />
            </g>
        );
    });

    // Create the angle indicator parameters
    const angleParams = {
        vertex: centerPoint,
        coords: endPoints,
        allowReflexAngles: allowReflexAngles || false, // Whether to allow reflex angles or not
        snapDegrees: snapDegrees || 1, // The multiple of degrees to snap to
        range: range,
        showAngles: showAngles || false, // Whether to show the angle or not
    };

    const angleLabel = getClockwiseAngle(
        [endPoints[0], centerPoint, endPoints[1]],
        allowReflexAngles,
    );

    const {strings, locale} = usePerseusI18n();

    const formatCoordinates = (x: number, y: number) => ({
        x: srFormatNumber(x, locale),
        y: srFormatNumber(y, locale),
    });

    const formatSideAriaLabel = (
        side: "terminal" | "initial",
        newPoint: vec.Vector2,
    ): string => {
        const formattedCoordinates = formatCoordinates(
            newPoint[X],
            newPoint[Y],
        );
        const label =
            side === "terminal"
                ? strings.srTerminalSideAtCoordinates(formattedCoordinates)
                : strings.srInitialSideAtCoordinates(formattedCoordinates);
        return label;
    };

    const formatVertexAriaLabel = (newPoint: vec.Vector2) => {
        const formattedVertexCoordinates = formatCoordinates(
            newPoint[X],
            newPoint[Y],
        );
        const label = showAngles
            ? strings.srVertexWithAngleAtCoordinates({
                  ...formattedVertexCoordinates,
                  angle: `${angleLabel}`,
              })
            : strings.srVertexAtCoordinates(formattedVertexCoordinates);

        return label;
    };

    const vertexAriaLabel = formatVertexAriaLabel(coords[1]);

    const initialSideAriaLabel = formatSideAriaLabel("initial", coords[2]);

    const terminalSideAriaLabel = formatSideAriaLabel("terminal", coords[0]);

    const handleSidePointMove = (
        coordIndex: number,
        newPoint: vec.Vector2,
        side: "terminal" | "initial",
    ): unknown => {
        formatVertexAriaLabel(coords[1]);
        formatSideAriaLabel(side, newPoint);
        return dispatch(actions.angle.movePoint(coordIndex, newPoint));
    };

    const handleVertexMove = (coordIndex: number, newPoint: vec.Vector2) => {
        formatVertexAriaLabel(newPoint);
        return dispatch(actions.angle.movePoint(coordIndex, newPoint));
    };

    // Render the lines, angle, and then movable points
    return (
        <>
            {svgLines}
            <Angle {...angleParams} />
            {/* vertex */}
            <MovablePoint
                point={coords[1]}
                constrain={(p) => p}
                onMove={(destination: vec.Vector2) =>
                    handleVertexMove(1, destination)
                }
                ariaLabel={vertexAriaLabel}
            />
            {/* side 1 */}
            <MovablePoint
                point={coords[0]}
                constrain={getAngleSideConstraint(
                    coords[0],
                    coords[1],
                    snapDegrees || 1,
                )}
                onMove={(destination: vec.Vector2) =>
                    handleSidePointMove(0, destination, "terminal")
                }
                ariaLabel={terminalSideAriaLabel}
            />
            {/* side 2 */}
            <MovablePoint
                point={coords[2]}
                constrain={getAngleSideConstraint(
                    coords[2],
                    coords[1],
                    snapDegrees || 1,
                )}
                onMove={(destination: vec.Vector2) =>
                    handleSidePointMove(2, destination, "initial")
                }
                ariaLabel={initialSideAriaLabel}
            />
        </>
    );
}

const positiveX: vec.Vector2 = [1, 0];
const negativeX: vec.Vector2 = [-1, 0];
const positiveY: vec.Vector2 = [0, 1];
const negativeY: vec.Vector2 = [0, -1];
export function getAngleSideConstraint(
    sidePoint: [number, number],
    vertex: [number, number],
    snapDegrees: number,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} {
    const currentAngle = calculateAngleInDegrees(vec.sub(sidePoint, vertex));

    // Find the rays that start at the current point and point up, down, left
    // and right.
    const leftRay: Segment = [sidePoint, vec.add(sidePoint, negativeX)];
    const rightRay: Segment = [sidePoint, vec.add(sidePoint, positiveX)];
    const upRay: Segment = [sidePoint, vec.add(sidePoint, positiveY)];
    const downRay: Segment = [sidePoint, vec.add(sidePoint, negativeY)];

    // find the angles that lie one snap step clockwise and counter-clockwise
    // from the current angle. These are the angles to which the side can be
    // moved.
    const oneStepCounterClockwise = currentAngle + snapDegrees;
    const oneStepClockwise = currentAngle - snapDegrees;

    // find the rays that start from the vertex and point in the direction of
    // the angles we just computed.
    const counterClockwiseRay: Segment = [
        vertex,
        vec.add(vertex, polar(1, oneStepCounterClockwise)),
    ];
    const clockwiseRay: Segment = [
        vertex,
        vec.add(vertex, polar(1, oneStepClockwise)),
    ];

    // find the intersections of those rays with the horizontal and vertical
    // rays extending from the sidePoint. These intersections are the points to
    // which sidePoint can move that will result in a rotation of `snapDegrees`.
    const left =
        findIntersectionOfRays(leftRay, counterClockwiseRay) ??
        findIntersectionOfRays(leftRay, clockwiseRay);
    const right =
        findIntersectionOfRays(rightRay, counterClockwiseRay) ??
        findIntersectionOfRays(rightRay, clockwiseRay);
    const up =
        findIntersectionOfRays(upRay, counterClockwiseRay) ??
        findIntersectionOfRays(upRay, clockwiseRay);
    const down =
        findIntersectionOfRays(downRay, counterClockwiseRay) ??
        findIntersectionOfRays(downRay, clockwiseRay);

    return {
        up: up ?? sidePoint,
        down: down ?? sidePoint,
        left: left ?? sidePoint,
        right: right ?? sidePoint,
    };
}
