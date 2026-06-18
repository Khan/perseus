import {coefficients as kmathCoefficients} from "@khanacademy/kmath";
import {Plot} from "mafs";
import * as React from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {boundToEdgeAndSnapToGrid} from "../utils";

import {usePointAriaLabel} from "./components/build-point-aria-label";
import {ClipToGraphBounds} from "./components/clip-to-graph-bounds";
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

import type {PerseusStrings} from "../../../strings";
import type {
    ExponentialGraphState,
    MafsGraphProps,
    Dispatch,
    InteractiveGraphElementSuite,
} from "../types";
import type {ExponentialCoefficient} from "@khanacademy/kmath";
import type {Coord} from "@khanacademy/perseus-core";
import type {Interval, vec} from "mafs";

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

    const {coords, pointLabels, asymptote, snapStep} = graphState;
    const buildLabel = usePointAriaLabel(pointLabels);

    // When the asymptote sits between the two points there is no valid
    // exponential that fits — coeffs will be undefined, and we skip
    // rendering the curve below.
    const coeffs = getExponentialCoefficients(coords, asymptote);

    const asymptoteY = asymptote;
    const yMin = range[1][0];
    const yMax = range[1][1];
    const yPadding = (yMax - yMin) * 4;

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
    const handleCoord = getAsymptoteHandleCoord("horizontal", range, asymptote);

    const [leftPx, rightPx, midPx] = useTransformVectorsToPixels(
        asymptoteLeft,
        asymptoteRight,
        handleCoord,
    );

    return (
        <g aria-label={srExponentialGraph} aria-describedby={descriptionId}>
            <MovableAsymptote
                start={leftPx}
                end={rightPx}
                mid={midPx}
                point={handleCoord}
                onMove={(newPoint) =>
                    dispatch(actions.exponential.moveCenter(newPoint))
                }
                constrainKeyboardMovement={(p) =>
                    skipAsymptoteKeyboardOverPoint(
                        p,
                        asymptote,
                        coords,
                        handleCoord,
                        snapStep,
                        "horizontal",
                    )
                }
                orientation="horizontal"
                ariaLabel={srExponentialAsymptote}
            >
                {coeffs !== undefined && (
                    <ClipToGraphBounds>
                        <Plot.OfX
                            y={(x) => {
                                const y = computeExponential(x, coeffs);
                                if (
                                    y < yMin - yPadding ||
                                    y > yMax + yPadding
                                ) {
                                    return NaN;
                                }
                                return y;
                            }}
                            color={interactiveColor}
                            svgPathProps={{
                                "aria-hidden": true,
                                style: {pointerEvents: "none"},
                            }}
                        />
                    </ClipToGraphBounds>
                )}
            </MovableAsymptote>
            {coords.map((coord, i) => (
                <MovablePoint
                    ariaLabel={
                        buildLabel(i, coord) ??
                        (i === 0 ? srExponentialPoint1 : srExponentialPoint2)
                    }
                    key={"point-" + i}
                    point={coord}
                    sequenceNumber={i + 1}
                    constrain={getExponentialKeyboardConstraint(
                        coords,
                        asymptote,
                        snapStep,
                        i,
                        range,
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

export const getExponentialKeyboardConstraint = (
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
    const handleCoord = getAsymptoteHandleCoord("horizontal", range, asymptote);

    return getAsymptoteGraphKeyboardConstraint(
        coords,
        snapStep,
        pointIndex,
        (coord) => {
            // The reducer clamps the destination via boundToEdgeAndSnapToGrid
            // before applying its own collision checks. We must predict
            // the clamped position to avoid accepting coords that the
            // reducer will silently reject.
            const clamped = boundToEdgeAndSnapToGrid(coord, {snapStep, range});
            const clampedX = clamped[X];
            const clampedY = clamped[Y];

            // Both points must have different x-values
            if (coord[X] === otherPoint[X] || clampedX === otherPoint[X]) {
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

// The formatted point coordinates and asymptote value shared across the
// exponential description string templates.
type ExponentialDescriptionArgs = {
    point1X: string;
    point1Y: string;
    point2X: string;
    point2Y: string;
    asymptoteY: string;
};

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

    // coeffs is undefined when the asymptote sits between the two points and
    // no valid exponential fits — the description falls back to a plain sentence.
    const coeffs = getExponentialCoefficients(coords, asymptote);
    const descriptionArgs: ExponentialDescriptionArgs = {
        point1X: formattedPoint1.x,
        point1Y: formattedPoint1.y,
        point2X: formattedPoint2.x,
        point2Y: formattedPoint2.y,
        asymptoteY: asymptoteYFormatted,
    };

    return {
        srExponentialGraph: strings.srExponentialGraph,
        srExponentialDescription: buildExponentialDescription(
            coeffs,
            descriptionArgs,
            strings,
            locale,
        ),
        srExponentialAsymptote: strings.srExponentialAsymptote({
            asymptoteY: asymptoteYFormatted,
        }),
        // When no curve is plotted, drop the "on an exponential curve"
        // phrasing in favor of plain point coordinates.
        srExponentialPoint1:
            coeffs === undefined
                ? strings.srPointAtCoordinates({num: 1, ...formattedPoint1})
                : strings.srExponentialPoint1(formattedPoint1),
        srExponentialPoint2:
            coeffs === undefined
                ? strings.srPointAtCoordinates({num: 2, ...formattedPoint2})
                : strings.srExponentialPoint2(formattedPoint2),
        srExponentialInteractiveElements: strings.srInteractiveElements({
            elements: strings.srExponentialInteractiveElements(descriptionArgs),
        }),
    };
}

function buildExponentialDescription(
    coeffs: ExponentialCoefficient | undefined,
    args: ExponentialDescriptionArgs,
    strings: PerseusStrings,
    locale: string,
): string {
    // No exponential fits these points (e.g. the asymptote sits between them),
    // so no curve is plotted.
    if (coeffs === undefined) {
        return strings.srExponentialNoCurve(args);
    }

    const {a, b, c} = coeffs;

    // The directional sentence describes the flat tail running along the
    // asymptote (where e^(b*x) -> 0): a positive b trails toward negative
    // infinity (paired with "from the right"); a negative b trails toward
    // positive infinity (paired with "from the left"). Both halves track
    // sign(b), so only these two sentences occur.
    const base =
        b < 0
            ? strings.srExponentialDescriptionLeftPos(args)
            : strings.srExponentialDescriptionRightNeg(args);

    // f(x) - c = a*e^(b*x) is always sign(a), so the curve sits entirely
    // above (a > 0) or below (a < 0) the asymptote.
    const position =
        a > 0
            ? strings.srExponentialAboveAsymptote
            : strings.srExponentialBelowAsymptote;

    // The y-intercept always exists; the x-intercept only when -c/a > 0.
    const yIntercept = srFormatNumber(a + c, locale);
    const ratio = -c / a;
    const intercepts =
        ratio > 0
            ? strings.srExponentialIntercepts({
                  xIntercept: srFormatNumber(Math.log(ratio) / b, locale),
                  yIntercept,
              })
            : strings.srExponentialYIntercept({yIntercept});

    return `${base} ${position} ${intercepts}`;
}
