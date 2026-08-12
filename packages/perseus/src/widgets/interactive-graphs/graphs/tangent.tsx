import {Plot, vec} from "mafs";
import * as React from "react";
import invariant from "tiny-invariant";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {X, Y} from "../math/coordinates";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {ClipToGraphBounds} from "./components/clip-to-graph-bounds";
import {DashedAsymptoteLine} from "./components/dashed-asymptote-line";
import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {describeTangentGraph} from "./strings/tangent";
import {useTransformVectorsToPixels} from "./use-transform";

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
        interactiveElementsDescription: describeTangentGraph(state, i18n)
            .srTangentInteractiveElements,
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

    // The coefficients are used to calculate the tangent equation, plot the
    // graph, and to indicate to content creators the currently selected
    // "correct answer" in the Content Editor. A genuine tangent requires two
    // control points that differ in both x and y. The reducer enforces this,
    // so invalid coefficients — undefined for a vertical line, amplitude 0 for
    // a horizontal one — should never reach render. Assert it here to narrow
    // the type and surface the bug if a degenerate state ever slips through
    // (e.g. hand-authored coordinates).
    const coeffs = getTangentCoefficients(coords);
    invariant(
        coeffs !== undefined && coeffs.amplitude !== 0,
        "Tangent requires two control points that differ in both x and y.",
    );

    // Asymptote positions derive from the two control points, so they move
    // live with the points. Used for both the dashed lines and the segment
    // splitting that works around the Mafs discontinuity below.
    const xRange: [number, number] = [range[0][0], range[0][1]];
    const yRange: [number, number] = [range[1][0], range[1][1]];

    const asymptotes = getAsymptotePositions(coeffs, xRange);

    // WORKAROUND for Mafs discontinuity rendering — see getPlotSegments().
    const segments = getPlotSegments(asymptotes, xRange);

    // Aria strings
    const {
        srTangentGraph,
        srTangentDescription,
        srTangentInflectionPoint,
        srTangentControlPoint,
    } = describeTangentGraph(graphState, i18n);

    return (
        <g
            // Outer graph minimal description
            aria-label={srTangentGraph}
            aria-describedby={descriptionId}
        >
            <TangentAsymptotes
                asymptotes={asymptotes}
                yRange={yRange}
                color={interactiveColor}
            />
            <ClipToGraphBounds>
                {segments.map(([segStart, segEnd], i) => (
                    <Plot.OfX
                        key={`tangent-segment-${i}`}
                        y={(x) => computeTangent(x, coeffs)}
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
            </ClipToGraphBounds>
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={
                        i === 0
                            ? srTangentInflectionPoint
                            : srTangentControlPoint
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

    // Create a helper function that checks if the new point lands on the same
    // vertical or horizontal line as the other point. If it does, we move the
    // point an additional snapStep so the two points never share an x (which
    // makes the frequency undefined) or a y (which zeroes the amplitude) —
    // neither of which is a valid tangent. This mirrors the reducer guard so
    // arrow keys step over the degenerate position instead of stalling on it.
    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        // Move the point
        let movedCoord = moveFunc(coordToBeMoved);
        // If the moved point lines up with the other point, move it again.
        if (
            movedCoord[X] === otherPoint[X] ||
            movedCoord[Y] === otherPoint[Y]
        ) {
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
// This workaround is expected to stay: the upstream fix was declined (LEMS-4010
// "Won't Do"). See __docs__/notes/mafs-workarounds.md for the rationale.
//
// If it is ever removed (would require the upstream "discontinuities prop" fix):
// 1. Delete getPlotSegments(). KEEP getAsymptotePositions() — since LEMS-4100 it
//    also feeds the visible dashed asymptote lines (TangentAsymptotes), not just
//    the segment splitting, so it can't be removed.
// 2. Replace the segments.map(...) in TangentGraph with a single:
//    <Plot.OfX y={(x) => computeTangent(x, coeffs)}
//        color={interactiveColor} svgPathProps={{"aria-hidden": true}} />
function getPlotSegments(
    asymptotes: ReadonlyArray<number>,
    xRange: [number, number],
): Array<[number, number]> {
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

// Renders the tangent's vertical asymptotes as dashed lines, styled like the
// exp/log graph asymptotes. Unlike those (one draggable asymptote in graph
// state), a tangent's asymptotes derive from the control points — so they're
// visible and announced to screen readers, but not independently interactive.
function TangentAsymptotes(props: {
    asymptotes: ReadonlyArray<number>;
    yRange: [number, number];
    color: string | undefined;
}) {
    const {asymptotes, yRange, color} = props;

    // Flatten endpoints to [bottom, top, bottom, top, ...] so one transform
    // call converts every asymptote's endpoints to pixel space.
    const endpoints: vec.Vector2[] = asymptotes.flatMap((x): vec.Vector2[] => [
        [x, yRange[0]],
        [x, yRange[1]],
    ]);
    const pixels = useTransformVectorsToPixels(...endpoints);

    return (
        <>
            {asymptotes.map((x, i) => (
                <DashedAsymptoteLine
                    key={`asymptote-${x}`}
                    start={pixels[i * 2]}
                    end={pixels[i * 2 + 1]}
                    color={color}
                    testId="tangent-asymptote__line"
                />
            ))}
        </>
    );
}
