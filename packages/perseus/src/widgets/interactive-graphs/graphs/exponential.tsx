import {
    coefficients as kmathCoefficients,
    type ExponentialCoefficient,
} from "@khanacademy/kmath";
import {Plot, vec} from "mafs";
import * as React from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {snap, X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovableAsymptote} from "./components/movable-asymptote";
import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {srFormatNumber} from "./screenreader-text";
import {useTransformVectorsToPixels} from "./use-transform";

import type {
    ExponentialGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {Coord} from "@khanacademy/perseus-core";

const {getExponentialCoefficients} = kmathCoefficients;

export function renderExponentialGraph(
    state: ExponentialGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <ExponentialGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getExponentialDescription(state, i18n),
    };
}

type ExponentialGraphProps = MafsGraphProps<ExponentialGraphState>;

function ExponentialGraph(props: ExponentialGraphProps) {
    const {dispatch, graphState} = props;
    const {interactiveColor, range} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

    const {coords, asymptote, snapStep} = graphState;

    // Cache last valid coefficients so the graph doesn't break during
    // transient invalid states (e.g. mid-drag where points share an x-value).
    const coeffRef = React.useRef<ExponentialCoefficient>({
        a: 1,
        b: 1,
        c: 0,
    });
    const coeffs = getExponentialCoefficients(coords, asymptote);
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    const asymptoteY = asymptote;
    const yMin = range[1][0];
    const yMax = range[1][1];
    const yPadding = (yMax - yMin) * 2;

    // Aria strings
    const {
        srExponentialGraph,
        srExponentialDescription,
        srExponentialPoint1,
        srExponentialPoint2,
        srExponentialAsymptote,
    } = describeExponentialGraph(graphState, i18n);

    // The asymptote is a full-width horizontal line.
    const asymptoteLeft: vec.Vector2 = [range[0][0], asymptoteY];
    const asymptoteRight: vec.Vector2 = [range[0][1], asymptoteY];
    const asymptoteMidX = (range[0][0] + range[0][1]) / 2;
    const asymptoteMid: vec.Vector2 = [asymptoteMidX, asymptoteY];

    const [leftPx, rightPx, midPx] = useTransformVectorsToPixels(
        asymptoteLeft,
        asymptoteRight,
        asymptoteMid,
    );

    return (
        <g aria-label={srExponentialGraph} aria-describedby={descriptionId}>
            <MovableAsymptote
                start={leftPx}
                end={rightPx}
                mid={midPx}
                point={asymptoteLeft}
                onMove={(newPoint) =>
                    dispatch(actions.exponential.moveCenter(newPoint))
                }
                constrainKeyboardMovement={(p) =>
                    constrainAsymptoteKeyboard(p, coords, snapStep)
                }
                orientation="horizontal"
                ariaLabel={srExponentialAsymptote}
            />
            <Plot.OfX
                y={(x) => {
                    const y = computeExponential(x, coeffRef.current);
                    if (y < yMin - yPadding || y > yMax + yPadding) {
                        return NaN;
                    }
                    return y;
                }}
                color={interactiveColor}
                svgPathProps={{
                    "aria-hidden": true,
                }}
            />
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={
                        i === 0 ? srExponentialPoint1 : srExponentialPoint2
                    }
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    constrain={getExponentialKeyboardConstraint(
                        coords,
                        asymptote,
                        snapStep,
                        i,
                    )}
                    onMove={(destination) =>
                        dispatch(actions.exponential.movePoint(i, destination))
                    }
                />
            ))}
            <SRDescInSVG id={descriptionId}>
                {srExponentialDescription}
            </SRDescInSVG>
        </g>
    );
}

// Horizontal drag handle — wide pill with horizontal dot grid.

// Keyboard constraint for the asymptote. When the next snapped position
// would land between or on the curve points, snap past all of them in the
// direction of travel. Mirrors logarithm's constrainAsymptoteKeyboard with
// Y-axis instead of X.
export const constrainAsymptoteKeyboard = (
    p: vec.Vector2,
    coords: ReadonlyArray<Coord>,
    snapStep: vec.Vector2,
): vec.Vector2 => {
    const snapped = snap(snapStep, p);
    let newY = snapped[Y];
    const stepY = snapStep[Y];

    const topMost = Math.max(coords[0][Y], coords[1][Y]);
    const bottomMost = Math.min(coords[0][Y], coords[1][Y]);

    const allAbove = coords[0][Y] > newY && coords[1][Y] > newY;
    const allBelow = coords[0][Y] < newY && coords[1][Y] < newY;

    if (!allAbove && !allBelow) {
        const midpoint = (topMost + bottomMost) / 2;
        if (newY >= midpoint) {
            newY = topMost + stepY;
        } else {
            newY = bottomMost - stepY;
        }
    }

    // Can't land exactly on a point — skip one more step
    if (newY === coords[0][Y] || newY === coords[1][Y]) {
        if (newY >= (topMost + bottomMost) / 2) {
            newY += stepY;
        } else {
            newY -= stepY;
        }
    }

    return [snapped[X], newY];
};

export const getExponentialKeyboardConstraint = (
    coords: ReadonlyArray<Coord>,
    asymptote: number,
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
    const asymptoteY = asymptote;

    const isValidPosition = (coord: vec.Vector2): boolean => {
        if (coord[Y] === asymptoteY) {
            return false;
        }
        if (coord[X] === otherPoint[X]) {
            return false;
        }
        // Crossing the asymptote is allowed — the reducer reflects
        // the other point so both end up on the same side.
        return true;
    };

    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        let movedCoord = moveFunc(coordToBeMoved);
        for (let i = 0; i < 3 && !isValidPosition(movedCoord); i++) {
            movedCoord = moveFunc(movedCoord);
        }
        if (!isValidPosition(movedCoord)) {
            return coordToBeMoved;
        }
        return movedCoord;
    };

    return {
        up: movePointWithConstraint((coord) =>
            vec.add(coord, [0, snapStep[Y]]),
        ),
        down: movePointWithConstraint((coord) =>
            vec.sub(coord, [0, snapStep[Y]]),
        ),
        left: movePointWithConstraint((coord) =>
            vec.sub(coord, [snapStep[X], 0]),
        ),
        right: movePointWithConstraint((coord) =>
            vec.add(coord, [snapStep[X], 0]),
        ),
    };
};

// Plot an exponential of the form: f(x) = a * e^(b * x) + c
const computeExponential = function (
    x: number,
    coefficients: ExponentialCoefficient,
) {
    const {a, b, c} = coefficients;
    return a * Math.exp(b * x) + c;
};

function getExponentialDescription(
    state: ExponentialGraphState,
    i18n: I18nContextType,
): string {
    const strings = describeExponentialGraph(state, i18n);
    return strings.srExponentialInteractiveElements;
}

function describeExponentialGraph(
    state: ExponentialGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords, asymptote} = state;
    const [point1, point2] = coords;

    const formattedPoint1 = {
        x: srFormatNumber(point1[X], locale),
        y: srFormatNumber(point1[Y], locale),
    };
    const formattedPoint2 = {
        x: srFormatNumber(point2[X], locale),
        y: srFormatNumber(point2[Y], locale),
    };
    const asymptoteYFormatted = srFormatNumber(asymptote, locale);

    return {
        srExponentialGraph: strings.srExponentialGraph,
        srExponentialDescription: strings.srExponentialDescription({
            point1X: formattedPoint1.x,
            point1Y: formattedPoint1.y,
            point2X: formattedPoint2.x,
            point2Y: formattedPoint2.y,
            asymptoteY: asymptoteYFormatted,
        }),
        srExponentialAsymptote: strings.srExponentialAsymptote({
            asymptoteY: asymptoteYFormatted,
        }),
        srExponentialPoint1: strings.srExponentialPoint1(formattedPoint1),
        srExponentialPoint2: strings.srExponentialPoint2(formattedPoint2),
        srExponentialInteractiveElements: strings.srInteractiveElements({
            elements: strings.srExponentialInteractiveElements({
                point1X: srFormatNumber(point1[X], locale),
                point1Y: srFormatNumber(point1[Y], locale),
                point2X: srFormatNumber(point2[X], locale),
                point2Y: srFormatNumber(point2[Y], locale),
                asymptoteY: asymptoteYFormatted,
            }),
        }),
    };
}
