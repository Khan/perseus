import {coefficients as kmathCoefficients} from "@khanacademy/kmath";
import {Plot} from "mafs";
import * as React from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {X, Y, snap} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {bound} from "../utils";

import {MovableAsymptote} from "./components/movable-asymptote";
import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {srFormatNumber} from "./screenreader-text";
import {useTransformVectorsToPixels} from "./use-transform";
import {
    getAsymptoteGraphKeyboardConstraint,
    getAsymptoteHandleCoord,
    skipAsymptoteKeyboardOverPoint,
} from "./utils";

import type {
    LogarithmGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {LogarithmCoefficient} from "@khanacademy/kmath";
import type {Coord} from "@khanacademy/perseus-core";
import type {Interval, vec} from "mafs";

const {getLogarithmCoefficients} = kmathCoefficients;

export function renderLogarithmGraph(
    state: LogarithmGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <LogarithmGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getLogarithmDescription(state, i18n),
    };
}

type LogarithmGraphProps = MafsGraphProps<LogarithmGraphState>;

function LogarithmGraph(props: LogarithmGraphProps) {
    const {dispatch, graphState} = props;
    const {interactiveColor, range} = useGraphConfig();
    const i18n = usePerseusI18n();
    const id = React.useId();
    const descriptionId = id + "-description";

    const {coords, asymptote, snapStep} = graphState;

    // When the asymptote sits between the two points there is no valid
    // logarithm that fits — coeffs will be undefined, and we skip
    // rendering the curve below.
    const coeffs = getLogarithmCoefficients(coords, asymptote);

    const asymptoteX = asymptote;
    const xMin = range[0][0];
    const xMax = range[0][1];
    const yMin = range[1][0];
    const yMax = range[1][1];

    // Aria strings
    const {
        srLogarithmGraph,
        srLogarithmDescription,
        srLogarithmPoint1,
        srLogarithmPoint2,
        srLogarithmAsymptote,
    } = describeLogarithmGraph(graphState, i18n);

    // The asymptote is a full-height vertical line.
    const asymptoteBottom: vec.Vector2 = [asymptoteX, yMin];
    const asymptoteTop: vec.Vector2 = [asymptoteX, yMax];
    const handleCoord = getAsymptoteHandleCoord("vertical", range, asymptote);

    const [bottomPx, topPx, midPx] = useTransformVectorsToPixels(
        asymptoteBottom,
        asymptoteTop,
        handleCoord,
    );

    return (
        <g aria-label={srLogarithmGraph} aria-describedby={descriptionId}>
            <MovableAsymptote
                start={bottomPx}
                end={topPx}
                mid={midPx}
                point={handleCoord}
                onMove={(newPoint) =>
                    dispatch(actions.logarithm.moveCenter(newPoint))
                }
                constrainKeyboardMovement={(p) =>
                    skipAsymptoteKeyboardOverPoint(
                        p,
                        asymptote,
                        coords,
                        handleCoord,
                        snapStep,
                        "vertical",
                    )
                }
                orientation="vertical"
                ariaLabel={srLogarithmAsymptote}
            >
                {coeffs !== undefined &&
                    renderLogarithmCurve({
                        coeffs,
                        coords,
                        asymptoteX,
                        xMin,
                        xMax,
                        yMin,
                        yMax,
                        interactiveColor,
                    })}
            </MovableAsymptote>
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={i === 0 ? srLogarithmPoint1 : srLogarithmPoint2}
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    constrain={getLogarithmKeyboardConstraint(
                        coords,
                        asymptote,
                        snapStep,
                        i,
                        range,
                    )}
                    onMove={(destination) =>
                        dispatch(actions.logarithm.movePoint(i, destination))
                    }
                />
            ))}
            <SRDescInSVG id={descriptionId}>
                {srLogarithmDescription}
            </SRDescInSVG>
        </g>
    );
}

export const getLogarithmKeyboardConstraint = (
    coords: ReadonlyArray<Coord>,
    asymptote: number,
    snapStep: vec.Vector2,
    pointIndex: number,
    range: [Interval, Interval],
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    const otherPoint = coords[1 - pointIndex];
    const handleCoord = getAsymptoteHandleCoord("vertical", range, asymptote);

    return getAsymptoteGraphKeyboardConstraint(
        coords,
        snapStep,
        pointIndex,
        (coord) => {
            // The reducer clamps the destination via boundAndSnapToGrid
            // before applying its own collision checks. We must predict
            // the clamped position to avoid accepting coords that the
            // reducer will silently reject.
            const clamped = snap(
                snapStep,
                bound({snapStep, range, point: coord}),
            );
            const clampedX = clamped[X];
            const clampedY = clamped[Y];

            // Both points must have different x-values
            // (same x makes the coefficient computation degenerate)
            if (coord[X] === otherPoint[X] || clampedX === otherPoint[X]) {
                return false;
            }
            // Both points must have different y-values
            if (coord[Y] === otherPoint[Y] || clampedY === otherPoint[Y]) {
                return false;
            }
            // Point cannot overlap the asymptote's drag handle
            if (clampedX === handleCoord[X] && clampedY === handleCoord[Y]) {
                return false;
            }
            return true;
        },
    );
};

// Plot a logarithm of the form: f(x) = a * ln(b * x + c)
const computeLogarithm = function (
    coefficients: LogarithmCoefficient,
    x: number,
) {
    const {a, b, c} = coefficients;
    const arg = b * x + c;
    if (arg <= 0) {
        return NaN;
    }
    return a * Math.log(arg);
};

// Compute the domain boundary so the curve starts off-screen. Unlike
// exponential (which uses a y-padding NaN cutoff because the curve exits
// horizontally), the logarithm curve exits vertically — y → ±∞ as x →
// asymptote. A y-padding cutoff would end the SVG path near the asymptote,
// causing a visible discontinuity. Instead, we solve for the x where the
// curve reaches a y-value safely beyond the visible range, so the SVG
// path begins off-screen for any coefficient values.
//
// For f(x) = a * ln(b*x + c), solving y = targetY for x:
//   x = (e^(targetY / a) - c) / b
function renderLogarithmCurve({
    coeffs,
    coords,
    asymptoteX,
    xMin,
    xMax,
    yMin,
    yMax,
    interactiveColor,
}: {
    coeffs: LogarithmCoefficient;
    coords: ReadonlyArray<Coord>;
    asymptoteX: number;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    interactiveColor: string | undefined;
}): React.ReactNode {
    const offScreenMargin = 2; // graph units beyond visible edge
    const {a, b, c} = coeffs;
    // Near the asymptote, y → -∞ if a > 0, or +∞ if a < 0
    const targetY = a > 0 ? yMin - offScreenMargin : yMax + offScreenMargin;
    const computedX = (Math.exp(targetY / a) - c) / b;
    const computedOffset = Math.abs(computedX - asymptoteX);
    // Use the computed offset if valid, otherwise fall back to 1e-8
    const domainOffset =
        isFinite(computedOffset) && computedOffset > 0 ? computedOffset : 1e-8;
    const pointsRightOfAsymptote = coords[0][X] > asymptoteX;

    return (
        <Plot.OfX
            y={(x) => computeLogarithm(coeffs, x)}
            color={interactiveColor}
            svgPathProps={{
                "aria-hidden": true,
                style: {pointerEvents: "none"},
            }}
            domain={
                pointsRightOfAsymptote
                    ? [asymptoteX + domainOffset, xMax]
                    : [xMin, asymptoteX - domainOffset]
            }
        />
    );
}

function getLogarithmDescription(
    state: LogarithmGraphState,
    i18n: I18nContextType,
): string {
    const strings = describeLogarithmGraph(state, i18n);
    return strings.srLogarithmInteractiveElements;
}

function describeLogarithmGraph(
    state: LogarithmGraphState,
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
    const asymptoteXFormatted = srFormatNumber(asymptote, locale);

    return {
        srLogarithmGraph: strings.srLogarithmGraph,
        srLogarithmDescription: strings.srLogarithmDescription({
            point1X: formattedPoint1.x,
            point1Y: formattedPoint1.y,
            point2X: formattedPoint2.x,
            point2Y: formattedPoint2.y,
            asymptoteX: asymptoteXFormatted,
        }),
        srLogarithmAsymptote: strings.srLogarithmAsymptote({
            asymptoteX: asymptoteXFormatted,
        }),
        srLogarithmPoint1: strings.srLogarithmPoint1(formattedPoint1),
        srLogarithmPoint2: strings.srLogarithmPoint2(formattedPoint2),
        srLogarithmInteractiveElements: strings.srInteractiveElements({
            elements: strings.srLogarithmInteractiveElements({
                point1X: srFormatNumber(point1[X], locale),
                point1Y: srFormatNumber(point1[Y], locale),
                point2X: srFormatNumber(point2[X], locale),
                point2Y: srFormatNumber(point2[Y], locale),
                asymptoteX: asymptoteXFormatted,
            }),
        }),
    };
}
