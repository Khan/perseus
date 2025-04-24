import {angles} from "@khanacademy/kmath";
import {vec} from "mafs";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {X, Y} from "../math";
import {findIntersectionOfRays} from "../math/geometry";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {Angle} from "./components/angle-indicators";
import {trimRange} from "./components/movable-line";
import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {SVGLine} from "./components/svg-line";
import {Vector} from "./components/vector";
import {srFormatNumber} from "./screenreader-text";
import {useTransformVectorsToPixels} from "./use-transform";
import {getIntersectionOfRayWithBox} from "./utils";

import type {I18nContextType} from "../../../components/i18n-context";
import type {Segment} from "../math/geometry";
import type {
    AngleGraphState,
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
} from "../types";
import type {CollinearTuple} from "@khanacademy/perseus-core";

const {calculateAngleInDegrees, getClockwiseAngle, polar} = angles;

type AngleGraphProps = MafsGraphProps<AngleGraphState>;

export function renderAngleGraph(
    state: AngleGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <AngleGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getAngleGraphDescription(state, i18n),
    };
}

function AngleGraph(props: AngleGraphProps) {
    const {dispatch, graphState} = props;
    const {graphDimensionsInPixels, interactiveColor} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

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
                        stroke: interactiveColor,
                        strokeWidth: "var(--movable-line-stroke-weight)",
                    }}
                    testId="angle-graph__line"
                />
                <Vector
                    tail={angleLines[i][1]}
                    tip={endExtend}
                    testId="angle-graph__vector"
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

    // Aria strings
    const {
        srAngleGraphAriaLabel,
        srAngleGraphAriaDescription,
        srAngleStartingSide,
        srAngleEndingSide,
        srAngleVertex,
    } = describeAngleGraph(graphState, i18n);

    // Render the lines, angle, and then movable points
    return (
        <g aria-label={srAngleGraphAriaLabel} aria-describedby={descriptionId}>
            {svgLines}
            <Angle {...angleParams} />
            {/* vertex */}
            <MovablePoint
                point={coords[1]}
                sequenceNumber={1}
                constrain={(p) => p}
                onMove={(destination: vec.Vector2) =>
                    dispatch(actions.angle.movePoint(1, destination))
                }
                ariaLabel={srAngleVertex}
            />
            {/* side 1 */}
            <MovablePoint
                point={coords[0]}
                sequenceNumber={2}
                constrain={getAngleSideConstraint(
                    coords[0],
                    coords[1],
                    snapDegrees || 1,
                )}
                onMove={(destination: vec.Vector2) =>
                    dispatch(actions.angle.movePoint(0, destination))
                }
                ariaLabel={srAngleEndingSide}
            />
            {/* side 2 */}
            <MovablePoint
                point={coords[2]}
                sequenceNumber={3}
                constrain={getAngleSideConstraint(
                    coords[2],
                    coords[1],
                    snapDegrees || 1,
                )}
                onMove={(destination: vec.Vector2) =>
                    dispatch(actions.angle.movePoint(2, destination))
                }
                ariaLabel={srAngleStartingSide}
            />
            <SRDescInSVG id={descriptionId}>
                {srAngleGraphAriaDescription}
            </SRDescInSVG>
        </g>
    );
}

function getAngleGraphDescription(
    state: AngleGraphState,
    i18n: I18nContextType,
): string {
    const {strings, locale} = i18n;
    const {coords} = state;

    return strings.srInteractiveElements({
        elements: strings.srAngleInteractiveElements({
            vertexX: srFormatNumber(coords[1][X], locale),
            vertexY: srFormatNumber(coords[1][Y], locale),
            startingSideX: srFormatNumber(coords[2][X], locale),
            startingSideY: srFormatNumber(coords[2][Y], locale),
            endingSideX: srFormatNumber(coords[0][X], locale),
            endingSideY: srFormatNumber(coords[0][Y], locale),
        }),
    });
}

function describeAngleGraph(
    state: AngleGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords, allowReflexAngles} = state;
    const [endingSide, vertex, startingSide] = coords;

    const angleMeasure = srFormatNumber(
        getClockwiseAngle(coords, allowReflexAngles),
        locale,
    );

    const srAngleGraphAriaLabel = strings.srAngleGraphAriaLabel;
    const srAngleGraphAriaDescription = strings.srAngleGraphAriaDescription({
        angleMeasure,
        vertexX: srFormatNumber(vertex[X], locale),
        vertexY: srFormatNumber(vertex[Y], locale),
        startingSideX: srFormatNumber(startingSide[X], locale),
        startingSideY: srFormatNumber(startingSide[Y], locale),
        endingSideX: srFormatNumber(endingSide[X], locale),
        endingSideY: srFormatNumber(endingSide[Y], locale),
    });
    const srAngleStartingSide = strings.srAngleStartingSide({
        x: srFormatNumber(startingSide[X], locale),
        y: srFormatNumber(startingSide[Y], locale),
    });
    const srAngleEndingSide = strings.srAngleEndingSide({
        x: srFormatNumber(endingSide[X], locale),
        y: srFormatNumber(endingSide[Y], locale),
    });
    const srAngleVertex = strings.srAngleVertexWithAngleMeasure({
        x: srFormatNumber(vertex[X], locale),
        y: srFormatNumber(vertex[Y], locale),
        angleMeasure,
    });

    return {
        srAngleGraphAriaLabel,
        srAngleGraphAriaDescription,
        srAngleStartingSide,
        srAngleEndingSide,
        srAngleVertex,
    };
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
