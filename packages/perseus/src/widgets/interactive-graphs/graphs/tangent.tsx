import {Plot, vec} from "mafs";
import * as React from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {X, Y} from "../math/coordinates";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {GraphBoundsSvg} from "./components/graph-bounds-svg";
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
    const {interactiveColor, range} = useGraphConfig();
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

    // WORKAROUND for Mafs discontinuity rendering — see getPlotSegments().
    const xRange: [number, number] = [range[0][0], range[0][1]];
    const segments = getPlotSegments(coeffRef.current, xRange);

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
            <GraphBoundsSvg>
                {segments.map(([segStart, segEnd], i) => (
                    <Plot.OfX
                        key={`tangent-segment-${i}`}
                        y={(x) => computeTangent(x, coeffRef.current)}
                        domain={[segStart, segEnd]}
                        color={interactiveColor}
                        svgPathProps={{
                            // Use aria-hidden to hide the line from screen readers
                            // so it doesn't read as "image" with no context.
                            // This is okay because the graph has its own aria-label.
                            "aria-hidden": true,
                        }}
                    />
                ))}
            </GraphBoundsSvg>
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
// Returns NaN near asymptotes as a defensive backup to prevent
// Mafs from drawing connecting lines across discontinuities..
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

    // Check proximity to asymptote: tan has asymptotes at arg = π/2 + nπ,
    // i.e., (arg - π/2) is a multiple of π. Normalize the fractional part
    // to [-0.5, 0.5) and check if near 0.
    const arg = b * x - c;
    const normalized = ((arg - Math.PI / 2) / Math.PI) % 1;
    const distToAsymptote = Math.abs(
        normalized > 0.5
            ? normalized - 1
            : normalized < -0.5
              ? normalized + 1
              : normalized,
    );
    if (distToAsymptote < 0.001) {
        return NaN;
    }

    return a * Math.tan(arg) + d;
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

// Compute the x-positions of vertical asymptotes within a given x-range.
// Asymptotes occur where b*x - c = π/2 + n*π, i.e. x = (c + π/2 + n*π) / b
function getAsymptotePositions(
    coeffs: NamedTangentCoefficient,
    xRange: [number, number],
): number[] {
    const {angularFrequency: b, phase: c} = coeffs;
    if (b === 0) {
        return [];
    }

    const period = Math.PI / Math.abs(b);
    const referenceAsymptote = (c + Math.PI / 2) / b;
    const asymptotes: number[] = [];

    // Walk left from the reference asymptote
    let x = referenceAsymptote;
    while (x > xRange[0] - period) {
        if (x > xRange[0] && x < xRange[1]) {
            asymptotes.push(x);
        }
        x -= period;
    }

    // Walk right from the reference asymptote
    x = referenceAsymptote + period;
    while (x < xRange[1] + period) {
        if (x > xRange[0] && x < xRange[1]) {
            asymptotes.push(x);
        }
        x += period;
    }

    return asymptotes.sort((a, b) => a - b);
}

// TODO: LEMS-2262
// WORKAROUND: Mafs Plot.OfX renders a single SVG <path> and skips
// non-finite points but uses "L" (lineTo) for the next valid point,
// which draws vertical lines across discontinuities like asymptotes.
// We split the curve into separate Plot.OfX segments between asymptotes
// so each gets its own SVG path element.
//
// Tracked upstream: https://github.com/stevenpetryk/mafs/issues/133
//
// To remove this workaround:
// 1. Delete getPlotSegments() and getAsymptotePositions()
// 2. Replace the segments.map(...) in TangentGraph with a single:
//    <Plot.OfX y={(x) => computeTangent(x, coeffRef.current)}
//        color={interactiveColor} svgPathProps={{"aria-hidden": true}} />
function getPlotSegments(
    coeffs: NamedTangentCoefficient,
    xRange: [number, number],
): Array<[number, number]> {
    const asymptotes = getAsymptotePositions(coeffs, xRange);
    // Small epsilon to avoid plotting at exactly the asymptote
    const eps = 0.01;
    const segments: Array<[number, number]> = [];

    let start = xRange[0];
    for (const asymptote of asymptotes) {
        segments.push([start, asymptote - eps]);
        start = asymptote + eps;
    }
    segments.push([start, xRange[1]]);

    return segments;
}

function getTangentDescription(
    state: TangentGraphState,
    i18n: I18nContextType,
): string {
    return describeTangentGraph(state, i18n).srTangentInteractiveElements;
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
