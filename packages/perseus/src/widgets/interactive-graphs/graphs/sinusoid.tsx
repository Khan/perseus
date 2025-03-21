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
    SinusoidGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {NamedSineCoefficient} from "@khanacademy/kmath";
import type {Coord} from "@khanacademy/perseus-core";

export function renderSinusoidGraph(
    state: SinusoidGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <SinusoidGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getSinusoidDescription(state, i18n),
    };
}

type SinusoidGraphProps = MafsGraphProps<SinusoidGraphState>;

function SinusoidGraph(props: SinusoidGraphProps) {
    const {dispatch, graphState} = props;
    const {interactiveColor} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

    // Destructure the coordinates from the graph state
    // Note: The order of the coordinates is important:
    // The coords[0] is the root and the coords[1] is the first peak
    const {coords, snapStep} = graphState;

    // The coefficients are used to calculate the sinusoid equation, plot the graph, and to indicate
    // to content creators the currently selected "correct answer" in the Content Editor.
    // While we should technically never have invalid coordinates, we want to ensure that
    // we have a fallback so that the graph can still be plotted without crashing.
    const coeffRef = React.useRef<NamedSineCoefficient>({
        amplitude: 1,
        angularFrequency: 1,
        phase: 1,
        verticalOffset: 0,
    });
    const coeffs = getSinusoidCoefficients(coords);

    // If the coefficients are valid, update the reference
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    // Aria strings
    const {
        srSinusoidGraph,
        srSinusoidDescription,
        srSinusoidRootPoint,
        srSinusoidPeakPoint,
    } = describeSinusoidGraph(graphState, i18n);

    return (
        <g
            // Outer graph minimal description
            aria-label={srSinusoidGraph}
            aria-describedby={descriptionId}
        >
            <Plot.OfX
                y={(x) => computeSine(x, coeffRef.current)}
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
                        i === 0 ? srSinusoidRootPoint : srSinusoidPeakPoint
                    }
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    constrain={getSinusoidKeyboardConstraint(
                        coords,
                        snapStep,
                        i,
                    )}
                    onMove={(destination) =>
                        dispatch(actions.sinusoid.movePoint(i, destination))
                    }
                />
            ))}
            <SRDescInSVG id={descriptionId}>
                {srSinusoidDescription}
            </SRDescInSVG>
        </g>
    );
}

export const getSinusoidKeyboardConstraint = (
    coords: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
    pointIndex: number,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    // Separate the two points into their own variables, and determine which point is being moved
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

// Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
export const computeSine = function (
    x: number, // x-coordinate
    sinusoidCoefficients: NamedSineCoefficient,
) {
    // Break down the coefficients for the sine function to improve readability
    const {
        amplitude: a,
        angularFrequency: b,
        phase: c,
        verticalOffset: d,
    } = sinusoidCoefficients;

    return a * Math.sin(b * x - c) + d;
};

export const getSinusoidCoefficients = (
    coords: ReadonlyArray<Coord>,
): NamedSineCoefficient | undefined => {
    // It's assumed that p1 is the root and p2 is the first peak
    const p1 = coords[0];
    const p2 = coords[1];

    // If the x-coordinates are the same, we are unable to calculate the coefficients
    if (p2[X] === p1[X]) {
        return;
    }

    // Resulting coefficients are canonical for this sine curve
    const amplitude = p2[Y] - p1[Y];
    const angularFrequency = Math.PI / (2 * (p2[X] - p1[X]));
    const phase = p1[X] * angularFrequency;
    const verticalOffset = p1[Y];

    return {amplitude, angularFrequency, phase, verticalOffset};
};

function getSinusoidDescription(
    state: SinusoidGraphState,
    i18n: I18nContextType,
): string {
    const strings = describeSinusoidGraph(state, i18n);
    return strings.srSinusoidInteractiveElements;
}

function describeSinusoidGraph(
    state: SinusoidGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [root, peak] = coords;

    const diffX = Math.abs(peak[X] - root[X]);
    const diffY = Math.abs(peak[Y] - root[Y]);

    const formattedRoot = {
        x: srFormatNumber(root[X], locale),
        y: srFormatNumber(root[Y], locale),
    };
    const formattedPeak = {
        x: srFormatNumber(peak[X], locale),
        y: srFormatNumber(peak[Y], locale),
    };

    const srSinusoidGraph = strings.srSinusoidGraph;
    const srSinusoidDescription = strings.srSinusoidDescription({
        minValue: srFormatNumber(root[Y] - diffY, locale),
        maxValue: srFormatNumber(root[Y] + diffY, locale),
        cycleStart: srFormatNumber(root[X] - 2 * diffX, locale),
        cycleEnd: srFormatNumber(root[X] + 2 * diffX, locale),
    });
    const srSinusoidRootPoint = strings.srSinusoidRootPoint(formattedRoot);
    const srSinusoidPeakPoint =
        peak[Y] === root[Y]
            ? strings.srSinusoidFlatPoint(formattedPeak)
            : peak[Y] > root[Y]
              ? strings.srSinusoidMaxPoint(formattedPeak)
              : strings.srSinusoidMinPoint(formattedPeak);
    const srSinusoidInteractiveElements = strings.srInteractiveElements({
        elements: strings.srSinusoidInteractiveElements({
            point1X: srFormatNumber(root[X], locale),
            point1Y: srFormatNumber(root[Y], locale),
            point2X: srFormatNumber(peak[X], locale),
            point2Y: srFormatNumber(peak[Y], locale),
        }),
    });

    return {
        srSinusoidGraph,
        srSinusoidDescription,
        srSinusoidRootPoint,
        srSinusoidPeakPoint,
        srSinusoidInteractiveElements,
    };
}
