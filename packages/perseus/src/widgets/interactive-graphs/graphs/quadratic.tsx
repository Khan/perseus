import {Plot, vec} from "mafs";
import * as React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {srFormatNumber} from "./screenreader-text";
import {
    getQuadraticPointString,
    getQuadraticVertexString,
    getQuadraticXIntercepts,
} from "./utils";

import type {I18nContextType} from "../../../components/i18n-context";
import type {Coord} from "../../../interactive2/types";
import type {
    QuadraticGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {QuadraticCoefficient, QuadraticCoords} from "@khanacademy/kmath";

export function renderQuadraticGraph(
    state: QuadraticGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <QuadraticGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getQuadraticGraphDescription(
            state,
            i18n,
        ),
    };
}

type QuadraticGraphProps = MafsGraphProps<QuadraticGraphState>;

function QuadraticGraph(props: QuadraticGraphProps) {
    const {dispatch, graphState} = props;

    const {coords, snapStep} = graphState;
    const {interactiveColor} = useGraphConfig();

    const {strings, locale} = usePerseusI18n();
    const id = React.useId();
    const quadraticDirectionId = id + "-direction";
    const quadraticVertexId = id + "-vertex";
    const quadraticInterceptsId = id + "-intercepts";

    // The coefficients are used to calculate the quadratic equation, plot the graph, and to indicate
    // to content creators the currently selected "correct answer". ex: y = 0.200x^2 + 0.000x + 0.000
    // While we should technically never have invalid coordinates, we want to ensure that we have a fallback
    const coeffRef = React.useRef<QuadraticCoefficient>([0, 0, 0]);
    const coeffs = getQuadraticCoefficients(coords);
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    // Destructure the coefficients for calculating the quadratic equation
    const [a, b, c] = coeffRef.current;

    // Calculate the y value based on the current x value
    const y = (x) => (a * x + b) * x + c;

    // Aria strings
    const {
        srQuadraticGraph,
        srQuadraticDirection,
        srQuadraticVertex,
        srQuadraticXIntercepts,
        srQuadraticYIntercept,
    } = describeQuadraticGraph(graphState, {strings, locale});

    return (
        <g
            // Outer graph minimal description
            aria-label={srQuadraticGraph}
            aria-describedby={`${quadraticDirectionId} ${quadraticVertexId} ${quadraticInterceptsId}`}
        >
            <Plot.OfX
                y={y}
                color={interactiveColor}
                svgPathProps={{
                    // Use aria-hidden to hide the line from screen readers
                    // so it doesn't read as "image" with no context.
                    // This is okay because the graph has its own aria-label.
                    "aria-hidden": true,
                }}
            />
            {coords.map((coord, i) => {
                const srQuadraticPoint = getQuadraticPointString(
                    i + 1,
                    coord,
                    strings,
                    locale,
                );
                // Vertex might not exist if the quadratic graph is a line
                const srVertex = srQuadraticVertex
                    ? ` ${srQuadraticVertex}`
                    : "";

                return (
                    <MovablePoint
                        key={"point-" + i}
                        ariaLabel={`${srQuadraticPoint}${srVertex}`}
                        point={coord}
                        sequenceNumber={i + 1}
                        constrain={getQuadraticKeyboardConstraint(
                            coords,
                            snapStep,
                            i,
                        )}
                        onMove={(destination) =>
                            dispatch(
                                actions.quadratic.movePoint(i, destination),
                            )
                        }
                    />
                );
            })}
            {/* Hidden elements to provide the descriptions for the
                `aria-describedby` properties */}
            {srQuadraticDirection && (
                <SRDescInSVG id={quadraticDirectionId}>
                    {srQuadraticDirection}
                </SRDescInSVG>
            )}
            {srQuadraticVertex && (
                <SRDescInSVG id={quadraticVertexId}>
                    {srQuadraticVertex}
                </SRDescInSVG>
            )}
            <SRDescInSVG id={quadraticInterceptsId}>
                {srQuadraticXIntercepts
                    ? `${srQuadraticXIntercepts} ${srQuadraticYIntercept}`
                    : `${srQuadraticYIntercept}`}
            </SRDescInSVG>
        </g>
    );
}

// Get the quadratic coefficients from the 3 control points
// These equations were originally set up in 2013 and may require some
// additional comments to help clarify the quadratic formula manipulations
// Origin: https://phabricator.khanacademy.org/D2413
export const getQuadraticCoefficients = (
    coords: QuadraticCoords,
): QuadraticCoefficient | undefined => {
    const p1 = coords[0];
    const p2 = coords[1];
    const p3 = coords[2];

    // If the denominator is 0, we are going to return undefined as we are
    // unable to calculate the quadratic coefficients when they hit infinity
    const denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
    if (denom === 0) {
        return;
    }

    const a =
        (p3[0] * (p2[1] - p1[1]) +
            p2[0] * (p1[1] - p3[1]) +
            p1[0] * (p3[1] - p2[1])) /
        denom;
    const b =
        (p3[0] * p3[0] * (p1[1] - p2[1]) +
            p2[0] * p2[0] * (p3[1] - p1[1]) +
            p1[0] * p1[0] * (p2[1] - p3[1])) /
        denom;
    const c =
        (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
            p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
            p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) /
        denom;
    return [a, b, c];
};

function getQuadraticGraphDescription(
    state: QuadraticGraphState,
    i18n: I18nContextType,
): string {
    const strings = describeQuadraticGraph(state, i18n);
    return strings.srQuadraticInteractiveElements;
}

type QuadraticGraphDescriptionStrings = {
    srQuadraticGraph: string;
    srQuadraticDirection?: string;
    srQuadraticVertex?: string;
    srQuadraticXIntercepts?: string;
    srQuadraticYIntercept: string;
    srQuadraticInteractiveElements: string;
};

// Exported for testing
export function describeQuadraticGraph(
    state: QuadraticGraphState,
    i18n: I18nContextType,
): QuadraticGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const coeffs = getQuadraticCoefficients(state.coords);
    const [a, b, c] = coeffs ?? [0, 0, 0];

    const vertex: Coord = [-b / (2 * a), c - (b * b) / (4 * a)];
    const xIntercepts = getQuadraticXIntercepts(a, b, c);

    // Aria label strings
    const srQuadraticGraph = strings.srQuadraticGraph;
    const srQuadraticFaceUp = strings.srQuadraticFaceUp;
    const srQuadraticFaceDown = strings.srQuadraticFaceDown;
    // The graph only has a direction if it is not a line.
    const srQuadraticDirection =
        a === 0 ? undefined : a > 0 ? srQuadraticFaceUp : srQuadraticFaceDown;
    // Only describe vertex if the quadratic graph is not a line.
    // (Undefined means the quadratic graph is a line and has no vertex.)
    const srQuadraticVertex =
        a !== 0 ? getQuadraticVertexString(vertex, strings) : undefined;
    // Undefined means the quadratic graph has no x-intercepts,
    // such as when the graph is a horizontal line.
    const srQuadraticXIntercepts =
        xIntercepts.length === 2
            ? strings.srQuadraticTwoXIntercepts({
                  intercept1: srFormatNumber(xIntercepts[0], locale),
                  intercept2: srFormatNumber(xIntercepts[1], locale),
              })
            : xIntercepts.length === 1
              ? strings.srQuadraticOneXIntercept({
                    intercept: srFormatNumber(xIntercepts[0], locale),
                })
              : undefined;
    const srQuadraticYIntercept = strings.srQuadraticYIntercept({
        intercept: srFormatNumber(c, locale),
    });

    const srQuadraticInteractiveElements = strings.srInteractiveElements({
        elements: strings.srQuadraticInteractiveElements({
            point1X: srFormatNumber(state.coords[0][0], locale),
            point1Y: srFormatNumber(state.coords[0][1], locale),
            point2X: srFormatNumber(state.coords[1][0], locale),
            point2Y: srFormatNumber(state.coords[1][1], locale),
            point3X: srFormatNumber(state.coords[2][0], locale),
            point3Y: srFormatNumber(state.coords[2][1], locale),
        }),
    });

    return {
        srQuadraticGraph,
        srQuadraticDirection,
        srQuadraticVertex,
        srQuadraticXIntercepts,
        srQuadraticYIntercept,
        srQuadraticInteractiveElements,
    };
}

export const getQuadraticKeyboardConstraint = (
    coords: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
    pointMoved: number,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    // Make newCoords mutable
    const newCoords: QuadraticCoords = [coords[0], coords[1], coords[2]];

    // Get the point that is being moved
    const coordToBeMoved = newCoords[pointMoved];

    // Create a function to validate and adjust the movement of the point
    const movePointWithConstraint = (
        moveFunc: (coord: Coord) => Coord,
    ): Coord => {
        // Move the point the desired direction
        let movedCoord = moveFunc(coordToBeMoved);
        newCoords[pointMoved] = movedCoord;

        // If these new coordinates are valid, return the moved coord
        if (areCoordsValid(newCoords)) {
            return movedCoord;
        }

        // If the new coordinates are invalid, we need to move the point an additional
        // snapStep to avoid creating an invalid quadratic graph.
        movedCoord = moveFunc(movedCoord);
        newCoords[pointMoved] = movedCoord;

        // If these updated coordinates are valid now, we can return the new coordinates.
        if (areCoordsValid(newCoords)) {
            return movedCoord;
        }

        // Otherwise, if the new coordinates are still invalid, we need to move the point one final snapStep.
        // This is to support the edge case where all of the points are each exactly one snapStep away
        // from each other.
        // Eg. When coords = [[0, 0], [1, 0], [2, 0]], snapStep = [1, 1], and we're moving coords[0] to the right.
        return moveFunc(movedCoord);
    };

    return {
        up: vec.add(coordToBeMoved, [0, snapStep[1]]),
        down: vec.sub(coordToBeMoved, [0, snapStep[1]]),
        // For horizontal movement, we need to ensure that the points are not on the same vertical line.
        left: movePointWithConstraint((coord) =>
            vec.sub(coord, [snapStep[0], 0]),
        ),
        right: movePointWithConstraint((coord) =>
            vec.add(coord, [snapStep[0], 0]),
        ),
    };
};

const areCoordsValid = (coords: QuadraticCoords): boolean => {
    const p1 = coords[0];
    const p2 = coords[1];
    const p3 = coords[2];

    // If any of the points share the same x-coordinate,
    // we are unable to calculate the coefficients, and the graph is invalid.
    if (p1[0] === p2[0] || p2[0] === p3[0] || p1[0] === p3[0]) {
        return false;
    }

    return true;
};
