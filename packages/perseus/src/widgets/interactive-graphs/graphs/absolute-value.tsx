import {Plot, vec} from "mafs";
import * as React from "react";

import {
    usePerseusI18n,
    type I18nContextType,
} from "../../../components/i18n-context";
import {X, Y} from "../math/coordinates";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {usePointAriaLabel} from "./components/build-point-aria-label";
import {ClipToGraphBounds} from "./components/clip-to-graph-bounds";
import {MovablePoint} from "./components/movable-point";
import SRDescInSVG from "./components/sr-description-within-svg";
import {srFormatNumber} from "./screenreader-text";

import type {PerseusStrings} from "../../../strings";
import type {
    AbsoluteValueGraphState,
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
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
    const slopeDescriptionId = id + "-slope";

    const {coords, pointLabels, snapStep} = graphState;
    const buildLabel = usePointAriaLabel(pointLabels);

    // Cache last valid coefficients to protect against transient invalid
    // states that can occur mid-drag (e.g., both points on the same x).
    const coeffRef = React.useRef<AbsoluteValueCoefficients>({
        m: 1,
        h: 0,
        v: 0,
    });
    const coeffs = getAbsoluteValueCoefficients(coords);
    if (Number.isFinite(coeffs.m)) {
        coeffRef.current = coeffs;
    }

    const {m, h, v} = coeffRef.current;

    const {
        srAbsoluteValueGraph,
        srAbsoluteValueVertexPoint,
        srAbsoluteValueSecondPoint,
        srAbsoluteValueDescription: srDescription,
        srAbsoluteValueSlope,
    } = describeAbsoluteValueGraph(graphState, i18n);

    return (
        <g aria-label={srAbsoluteValueGraph} aria-describedby={descriptionId}>
            <ClipToGraphBounds>
                <Plot.OfX
                    y={(x) => m * Math.abs(x - h) + v}
                    color={interactiveColor}
                    svgPathProps={{
                        "aria-hidden": true,
                    }}
                />
            </ClipToGraphBounds>
            {coords.map((coord, i) => (
                <MovablePoint
                    key={"point-" + i}
                    ariaLabel={
                        buildLabel(i, coord) ??
                        (i === 0
                            ? srAbsoluteValueVertexPoint
                            : srAbsoluteValueSecondPoint)
                    }
                    // The arm point (index 1) determines the slope, so it
                    // carries the slope description; the vertex (index 0)
                    // does not.
                    ariaDescribedBy={i === 1 ? slopeDescriptionId : undefined}
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
            <SRDescInSVG id={descriptionId}>{srDescription}</SRDescInSVG>
            <SRDescInSVG id={slopeDescriptionId}>
                {srAbsoluteValueSlope}
            </SRDescInSVG>
        </g>
    );
}

export type AbsoluteValueCoefficients = {
    m: number;
    h: number;
    v: number;
};

/**
 * Compute the coefficients [m, h, v] for f(x) = m * |x - h| + v from two
 * control points: p1 (vertex) and p2 (a point on one arm).
 */
export function getAbsoluteValueCoefficients(
    coords: ReadonlyArray<Coord>,
): AbsoluteValueCoefficients {
    const p1 = coords[0];
    const p2 = coords[1];

    const denom = p2[X] - p1[X];
    const num = p2[Y] - p1[Y];
    let m = Math.abs(num / denom);
    if (p2[Y] < p1[Y]) {
        m = -m;
    }

    return {m, h: p1[X], v: p1[Y]};
}

/**
 * Keyboard constraint for absolute value control points.
 * Skips any horizontal position where both points would share the same x.
 */
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

    const moveWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        let movedCoord = moveFunc(coordToBeMoved);
        if (movedCoord[X] === otherPoint[X]) {
            movedCoord = moveFunc(movedCoord);
        }
        return movedCoord;
    };

    return {
        up: vec.add(coordToBeMoved, [0, snapStep[Y]]),
        down: vec.sub(coordToBeMoved, [0, snapStep[Y]]),
        left: moveWithConstraint((coord) => vec.sub(coord, [snapStep[X], 0])),
        right: moveWithConstraint((coord) => vec.add(coord, [snapStep[X], 0])),
    };
};

function getAbsoluteValueDescription(
    state: AbsoluteValueGraphState,
    i18n: I18nContextType,
): string {
    const {strings} = i18n;
    const {coords} = state;
    const {locale} = i18n;
    const [p1, p2] = coords;
    const slope = getAbsoluteValueCoefficients(coords).m;

    return strings.srInteractiveElements({
        elements: strings.srAbsoluteValueInteractiveElements({
            point1X: srFormatNumber(p1[X], locale),
            point1Y: srFormatNumber(p1[Y], locale),
            point2X: srFormatNumber(p2[X], locale),
            point2Y: srFormatNumber(p2[Y], locale),
            slope: srFormatNumber(slope, locale),
        }),
    });
}

function describeAbsoluteValueGraph(
    state: AbsoluteValueGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [vertex, armPoint] = coords;

    const coeffs = getAbsoluteValueCoefficients(coords);

    const srAbsoluteValueGraph = strings.srAbsoluteValueGraph;
    const srAbsoluteValueVertexPoint = strings.srAbsoluteValueVertexPoint({
        x: srFormatNumber(vertex[X], locale),
        y: srFormatNumber(vertex[Y], locale),
    });
    const srAbsoluteValueSecondPoint = strings.srAbsoluteValueSecondPoint({
        x: srFormatNumber(armPoint[X], locale),
        y: srFormatNumber(armPoint[Y], locale),
    });
    const srAbsoluteValueDescription = buildAbsoluteValueDescription(
        coeffs,
        locale,
        strings,
    );
    const srAbsoluteValueSlope = strings.srAbsoluteValueSlope({
        slope: srFormatNumber(coeffs.m, locale),
    });

    return {
        srAbsoluteValueGraph,
        srAbsoluteValueVertexPoint,
        srAbsoluteValueSecondPoint,
        srAbsoluteValueDescription,
        srAbsoluteValueSlope,
    };
}

function buildAbsoluteValueDescription(
    coeffs: AbsoluteValueCoefficients,
    locale: string,
    strings: PerseusStrings,
): string {
    const {m, h, v} = coeffs;
    const atOrigin = h === 0 && v === 0;

    const opens =
        m < 0
            ? strings.srAbsoluteValueOpensDown
            : strings.srAbsoluteValueOpensUp;

    const vertex = atOrigin
        ? strings.srAbsoluteValueVertexOrigin
        : strings.srAbsoluteValueVertex({
              x: srFormatNumber(h, locale),
              y: srFormatNumber(v, locale),
          });

    // When the vertex is at the origin both intercepts are also at the origin,
    // so we skip them to avoid repeating "0 comma 0".
    let xIntercepts = "";
    let yIntercept = "";
    if (!atOrigin) {
        // The x-intercepts solve m·|x − h| + v = 0, i.e. |x − h| = −v/m. There
        // are two when −v/m > 0 (vertex on the opposite side of the x-axis
        // from the arms), exactly one when v = 0 (the vertex sits on the
        // x-axis), and none otherwise.
        const t = -v / m;
        if (isFinite(t) && t > 0) {
            xIntercepts = strings.srAbsoluteValueTwoXIntercepts({
                intercept1: srFormatNumber(h - t, locale),
                intercept2: srFormatNumber(h + t, locale),
            });
        } else if (t === 0) {
            xIntercepts = strings.srAbsoluteValueOneXIntercept({
                intercept: srFormatNumber(h, locale),
            });
        }

        // The y-intercept always exists: f(0) = m·|h| + v.
        yIntercept = strings.srAbsoluteValueYIntercept({
            intercept: srFormatNumber(m * Math.abs(h) + v, locale),
        });
    }

    const slope = strings.srAbsoluteValueSlope({
        slope: srFormatNumber(m, locale),
    });

    return [opens, vertex, xIntercepts, yIntercept, slope]
        .filter(Boolean)
        .join(" ");
}
