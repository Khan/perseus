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
import type {Coord} from "@khanacademy/perseus-core";

type NamedTangentCoefficient = {
    amplitude: number;
    angularFrequency: number;
    phase: number;
    verticalOffset: number;
};

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
    const firstAsymptote = (c + Math.PI / 2) / b;

    const asymptotes: number[] = [];
    // Walk left from first asymptote
    let x = firstAsymptote;
    while (x > xRange[0] - period) {
        if (x > xRange[0] && x < xRange[1]) {
            asymptotes.push(x);
        }
        x -= period;
    }
    // Walk right from first asymptote
    x = firstAsymptote + period;
    while (x < xRange[1] + period) {
        if (x > xRange[0] && x < xRange[1]) {
            asymptotes.push(x);
        }
        x += period;
    }

    return asymptotes.sort((a, b) => a - b);
}

// WORKAROUND: Mafs Plot.OfX renders a single SVG <path> and skips
// non-finite points but uses "L" (lineTo) for the next valid point,
// which draws vertical lines across discontinuities like asymptotes.
// We split the curve into separate Plot.OfX segments between asymptotes
// so each gets its own SVG path element.
//
// This can be removed if Mafs fixes the path generation to start a new
// "M" (moveTo) after non-finite gaps instead of continuing with "L".
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

function TangentGraph(props: TangentGraphProps) {
    const {dispatch, graphState} = props;
    const {interactiveColor, range} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

    const {coords, snapStep} = graphState;

    // Fallback coefficients in case coords become invalid
    const coeffRef = React.useRef<NamedTangentCoefficient>({
        amplitude: 1,
        angularFrequency: 1,
        phase: 1,
        verticalOffset: 0,
    });
    const coeffs = getTangentCoefficients(coords);

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
        srTangentPoint1,
        srTangentPoint2,
    } = describeTangentGraph(graphState, i18n);

    return (
        <g aria-label={srTangentGraph} aria-describedby={descriptionId}>
            {segments.map(([segStart, segEnd], i) => (
                <Plot.OfX
                    key={`tangent-segment-${i}`}
                    y={(x) => computeTangent(x, coeffRef.current)}
                    domain={[segStart, segEnd]}
                    color={interactiveColor}
                    svgPathProps={{
                        "aria-hidden": true,
                    }}
                />
            ))}
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={i === 0 ? srTangentPoint1 : srTangentPoint2}
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

const getTangentKeyboardConstraint = (
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

// Plot a tangent of the form: f(x) = a * tan(b * x - c) + d
// Returns NaN near vertical asymptotes to break the SVG path,
// preventing Mafs from drawing connecting lines across discontinuities.
const computeTangent = function (
    x: number,
    tangentCoefficients: NamedTangentCoefficient,
) {
    const {
        amplitude: a,
        angularFrequency: b,
        phase: c,
        verticalOffset: d,
    } = tangentCoefficients;

    // Check proximity to asymptote: asymptotes occur where
    // b*x - c = π/2 + n*π. We check if the argument is close
    // to any odd multiple of π/2.
    const arg = b * x - c;
    const distToAsymptote = Math.abs(((arg / Math.PI + 0.5) % 1) - 0.5);
    // If we're very close to an asymptote, return NaN to
    // create a gap in the SVG path.
    if (distToAsymptote < 0.001) {
        return NaN;
    }

    return a * Math.tan(arg) + d;
};

const getTangentCoefficients = (
    coords: ReadonlyArray<Coord>,
): NamedTangentCoefficient | undefined => {
    const p1 = coords[0];
    const p2 = coords[1];

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
    const [point1, point2] = coords;

    const formattedPoint1 = {
        x: srFormatNumber(point1[X], locale),
        y: srFormatNumber(point1[Y], locale),
    };
    const formattedPoint2 = {
        x: srFormatNumber(point2[X], locale),
        y: srFormatNumber(point2[Y], locale),
    };

    const srTangentGraph = strings.srTangentGraph;
    const srTangentDescription = strings.srTangentDescription({
        point1X: formattedPoint1.x,
        point1Y: formattedPoint1.y,
        point2X: formattedPoint2.x,
        point2Y: formattedPoint2.y,
    });
    const srTangentPoint1 = strings.srTangentPoint1(formattedPoint1);
    const srTangentPoint2 = strings.srTangentPoint2(formattedPoint2);
    const srTangentInteractiveElements = strings.srInteractiveElements({
        elements: strings.srTangentInteractiveElements({
            point1X: srFormatNumber(point1[X], locale),
            point1Y: srFormatNumber(point1[Y], locale),
            point2X: srFormatNumber(point2[X], locale),
            point2Y: srFormatNumber(point2[Y], locale),
        }),
    });

    return {
        srTangentGraph,
        srTangentDescription,
        srTangentPoint1,
        srTangentPoint2,
        srTangentInteractiveElements,
    };
}
