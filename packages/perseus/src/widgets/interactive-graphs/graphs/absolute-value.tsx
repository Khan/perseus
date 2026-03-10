import {Plot, vec} from "mafs";
import * as React from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {X, Y} from "../math/coordinates";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {srFormatNumber} from "./screenreader-text";

import type {
    AbsoluteValueGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {Coord} from "@khanacademy/perseus-core";

export function renderAbsoluteValueGraph(
    state: AbsoluteValueGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <AbsoluteValueGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getAbsoluteValueDescription(
            state,
            i18n,
        ),
    };
}

type AbsoluteValueGraphProps = MafsGraphProps<AbsoluteValueGraphState>;

function AbsoluteValueGraph(props: AbsoluteValueGraphProps) {
    const {dispatch, graphState} = props;
    const {interactiveColor} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

    const {coords, snapStep} = graphState;

    // The coefficients are used to calculate the absolute value equation and
    // plot the graph. We use a ref to maintain the last valid coefficients
    // so the graph can still render without crashing if coords are temporarily invalid.
    const coeffRef = React.useRef<AbsoluteValueCoefficients>({
        m: 1,
        h: 0,
        k: 0,
    });
    const coeffs = getAbsoluteValueCoefficients(coords);

    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    const {
        srAbsoluteValueGraph,
        srAbsoluteValueDescription,
        srAbsoluteValueVertexPoint,
        srAbsoluteValueSecondPoint,
    } = describeAbsoluteValueGraph(graphState, i18n);

    return (
        <g aria-label={srAbsoluteValueGraph} aria-describedby={descriptionId}>
            <Plot.OfX
                y={(x) => computeAbsoluteValue(x, coeffRef.current)}
                color={interactiveColor}
                svgPathProps={{
                    "aria-hidden": true,
                }}
            />
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={
                        i === 0
                            ? srAbsoluteValueVertexPoint
                            : srAbsoluteValueSecondPoint
                    }
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    constrain={getAbsoluteValueKeyboardConstraint(
                        coords,
                        snapStep,
                        i,
                    )}
                    onMove={(destination) =>
                        dispatch(
                            actions.absoluteValue.movePoint(i, destination),
                        )
                    }
                />
            ))}
            <SRDescInSVG id={descriptionId}>
                {srAbsoluteValueDescription}
            </SRDescInSVG>
        </g>
    );
}

export const getAbsoluteValueKeyboardConstraint = (
    coords: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
    pointIndex: number,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    const coordToBeMoved = coords[pointIndex];
    const otherPoint = coords[1 - pointIndex];

    // Prevent the two points from sharing the same x-coordinate.
    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        let movedCoord = moveFunc(coordToBeMoved);
        if (movedCoord[X] === otherPoint[X]) {
            movedCoord = moveFunc(movedCoord);
        }
        return movedCoord;
    };

    return {
        up: movePointWithConstraint((coord) =>
            vec.add(coord, [0, snapStep[1]]),
        ),
        down: movePointWithConstraint((coord) =>
            vec.sub(coord, [0, snapStep[1]]),
        ),
        left: movePointWithConstraint((coord) =>
            vec.sub(coord, [snapStep[0], 0]),
        ),
        right: movePointWithConstraint((coord) =>
            vec.add(coord, [snapStep[0], 0]),
        ),
    };
};

export type AbsoluteValueCoefficients = {
    m: number;
    h: number;
    k: number;
};

// Returns the coefficients {m, h, k} for f(x) = m * |x - h| + k,
// or undefined if the two coords share the same x-coordinate.
export const getAbsoluteValueCoefficients = (
    coords: ReadonlyArray<Coord>,
): AbsoluteValueCoefficients | undefined => {
    const vertex = coords[0]; // (h, k)
    const second = coords[1]; // (x2, y2)

    const h = vertex[X];
    const k = vertex[Y];
    const x2 = second[X];
    const y2 = second[Y];

    if (x2 === h) {
        return undefined;
    }

    const m = (y2 - k) / Math.abs(x2 - h);

    return {m, h, k};
};

// Plot f(x) = m * |x - h| + k
export const computeAbsoluteValue = function (
    x: number,
    coefficients: AbsoluteValueCoefficients,
) {
    const {m, h, k} = coefficients;
    return m * Math.abs(x - h) + k;
};

function getAbsoluteValueDescription(
    state: AbsoluteValueGraphState,
    i18n: I18nContextType,
): string {
    const strings = describeAbsoluteValueGraph(state, i18n);
    return strings.srAbsoluteValueInteractiveElements;
}

function describeAbsoluteValueGraph(
    state: AbsoluteValueGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [vertex, second] = coords;

    const coeffs = getAbsoluteValueCoefficients(coords);
    const slope = coeffs !== undefined ? srFormatNumber(coeffs.m, locale) : "0";

    const formattedVertex = {
        x: srFormatNumber(vertex[X], locale),
        y: srFormatNumber(vertex[Y], locale),
    };
    const formattedSecond = {
        x: srFormatNumber(second[X], locale),
        y: srFormatNumber(second[Y], locale),
    };

    const srAbsoluteValueGraph = strings.srAbsoluteValueGraph;
    const srAbsoluteValueDescription = strings.srAbsoluteValueDescription({
        vertex: `${formattedVertex.x}, ${formattedVertex.y}`,
        slope,
    });
    const srAbsoluteValueVertexPoint =
        strings.srAbsoluteValueVertexPoint(formattedVertex);
    const srAbsoluteValueSecondPoint =
        strings.srAbsoluteValueSecondPoint(formattedSecond);
    const srAbsoluteValueInteractiveElements = strings.srInteractiveElements({
        elements: strings.srAbsoluteValueInteractiveElements({
            point1X: formattedVertex.x,
            point1Y: formattedVertex.y,
            point2X: formattedSecond.x,
            point2Y: formattedSecond.y,
        }),
    });

    return {
        srAbsoluteValueGraph,
        srAbsoluteValueDescription,
        srAbsoluteValueVertexPoint,
        srAbsoluteValueSecondPoint,
        srAbsoluteValueInteractiveElements,
    };
}
