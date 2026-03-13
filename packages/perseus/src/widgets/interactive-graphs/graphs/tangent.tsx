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
    TangentGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {NamedTangentCoefficient} from "@khanacademy/kmath";
import type {Coord} from "@khanacademy/perseus-core";

export function renderTangentGraph(
    state: TangentGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <TangentGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getTangentDescription(state, i18n),
    };
}

type TangentGraphProps = MafsGraphProps<TangentGraphState>;

function TangentGraph(props: TangentGraphProps) {
    const {dispatch, graphState} = props;
    const {interactiveColor} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

    // Destructure the coordinates from the graph state
    // coords[0] is the inflection point (where tan crosses the midline)
    // coords[1] is a quarter-period away (where amplitude is reached)
    const {coords, snapStep} = graphState;

    // The coefficients are used to calculate the tangent equation, plot
    // the graph, and to indicate to content creators the currently selected
    // "correct answer" in the Content Editor. While we should technically
    // never have invalid coordinates, we want to ensure that we have a
    // fallback so that the graph can still be plotted without crashing.
    const coeffRef = React.useRef<NamedTangentCoefficient>({
        amplitude: 1,
        angularFrequency: 1,
        phase: 1,
        verticalOffset: 0,
    });
    const coeffs = getTangentCoefficients(coords);

    // If the coefficients are valid, update the reference
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    // Aria strings
    const {
        srTangentGraph,
        srTangentDescription,
        srTangentInflectionPoint,
        srTangentSecondPoint,
    } = describeTangentGraph(graphState, i18n);

    return (
        <g
            // Outer graph minimal description
            aria-label={srTangentGraph}
            aria-describedby={descriptionId}
        >
            <Plot.OfX
                y={(x) => computeTangent(x, coeffRef.current)}
                color={interactiveColor}
                svgPathProps={{
                    // Use aria-hidden to hide the line from screen readers
                    // so it doesn't read as "image" with no context.
                    // This is okay because the graph has its own aria-label.
                    "aria-hidden": true,
                }}
            />
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={
                        i === 0
                            ? srTangentInflectionPoint
                            : srTangentSecondPoint
                    }
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    constrain={getTangentKeyboardConstraint(
                        coords,
                        snapStep,
                        i,
                    )}
                    onMove={(destination) =>
                        dispatch(actions.tangent.movePoint(i, destination))
                    }
                />
            ))}
            <SRDescInSVG id={descriptionId}>{srTangentDescription}</SRDescInSVG>
        </g>
    );
}

export const getTangentKeyboardConstraint = (
    coords: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
    pointIndex: number,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    // Separate the two points and determine which point is being moved
    const coordToBeMoved = coords[pointIndex];
    const otherPoint = coords[1 - pointIndex];

    // Create a helper function that checks if the new point is on the same
    // vertical line as the other point. If it is, we need to move the point
    // an additional snapStep.
    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        // Move the point
        let movedCoord = moveFunc(coordToBeMoved);
        // If the moved point overlaps with the other point in the line,
        // move the point again.
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

// Plot a tangent of the form: f(x) = a * tan(b * x - c) + d
export const computeTangent = function (
    x: number,
    tangentCoefficients: NamedTangentCoefficient,
) {
    const {
        amplitude: a,
        angularFrequency: b,
        phase: c,
        verticalOffset: d,
    } = tangentCoefficients;

    return a * Math.tan(b * x - c) + d;
};

export const getTangentCoefficients = (
    coords: ReadonlyArray<Coord>,
): NamedTangentCoefficient | undefined => {
    // p1 is the inflection point (where tan = 0 relative to the midline)
    // p2 is a quarter-period away (where the curve reaches amplitude)
    const p1 = coords[0];
    const p2 = coords[1];

    // If the x-coordinates are the same, we are unable to calculate the coefficients
    if (p2[X] === p1[X]) {
        return;
    }

    const amplitude = p2[Y] - p1[Y];
    const angularFrequency = Math.PI / (4 * (p2[X] - p1[X]));
    const phase = p1[X] * angularFrequency;
    const verticalOffset = p1[Y];

    return {amplitude, angularFrequency, phase, verticalOffset};
};

function getTangentDescription(
    state: TangentGraphState,
    i18n: I18nContextType,
): string {
    const strings = describeTangentGraph(state, i18n);
    return strings.srTangentInteractiveElements;
}

function describeTangentGraph(
    state: TangentGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [inflection, secondPoint] = coords;

    const formattedInflection = {
        x: srFormatNumber(inflection[X], locale),
        y: srFormatNumber(inflection[Y], locale),
    };
    const formattedSecondPoint = {
        x: srFormatNumber(secondPoint[X], locale),
        y: srFormatNumber(secondPoint[Y], locale),
    };

    const srTangentGraph = strings.srTangentGraph;
    const srTangentDescription = strings.srTangentDescription({
        inflectionX: srFormatNumber(inflection[X], locale),
        inflectionY: srFormatNumber(inflection[Y], locale),
    });
    const srTangentInflectionPoint =
        strings.srTangentInflectionPoint(formattedInflection);
    const srTangentSecondPoint =
        strings.srTangentSecondPoint(formattedSecondPoint);
    const srTangentInteractiveElements = strings.srInteractiveElements({
        elements: strings.srTangentInteractiveElements({
            point1X: srFormatNumber(inflection[X], locale),
            point1Y: srFormatNumber(inflection[Y], locale),
            point2X: srFormatNumber(secondPoint[X], locale),
            point2Y: srFormatNumber(secondPoint[Y], locale),
        }),
    });

    return {
        srTangentGraph,
        srTangentDescription,
        srTangentInflectionPoint,
        srTangentSecondPoint,
        srTangentInteractiveElements,
    };
}
