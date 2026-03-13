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

    const {coords, snapStep} = graphState;

    // Cache last valid coefficients to protect against transient invalid
    // states that can occur mid-drag (e.g., both points on the same x).
    const coeffRef = React.useRef<AbsoluteValueCoefficients>({
        m: 1,
        h: 0,
        v: 0,
    });
    const coeffs = getAbsoluteValueCoefficients(coords);
    if (coeffs !== undefined) {
        coeffRef.current = coeffs;
    }

    const {m, h, v} = coeffRef.current;

    const {
        srAbsoluteValueGraph,
        srAbsoluteValueVertexPoint,
        srAbsoluteValueSecondPoint,
        srAbsoluteValueDescription: srDescription,
    } = describeAbsoluteValueGraph(graphState, i18n);

    return (
        <g aria-label={srAbsoluteValueGraph} aria-describedby={descriptionId}>
            <Plot.OfX
                y={(x) => m * Math.abs(x - h) + v}
                color={interactiveColor}
                svgPathProps={{
                    "aria-hidden": true,
                }}
            />
            {coords.map((coord, i) => (
                <MovablePoint
                    key={"point-" + i}
                    ariaLabel={
                        i === 0
                            ? srAbsoluteValueVertexPoint
                            : srAbsoluteValueSecondPoint
                    }
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
 *
 * Returns undefined if p1 and p2 share the same x-coordinate (slope undefined).
 */
export function getAbsoluteValueCoefficients(
    coords: ReadonlyArray<Coord>,
): AbsoluteValueCoefficients | undefined {
    const p1 = coords[0];
    const p2 = coords[1];

    const denom = p2[X] - p1[X];
    if (denom === 0) {
        return undefined;
    }

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

    return strings.srInteractiveElements({
        elements: strings.srAbsoluteValueInteractiveElements({
            point1X: srFormatNumber(p1[X], locale),
            point1Y: srFormatNumber(p1[Y], locale),
            point2X: srFormatNumber(p2[X], locale),
            point2Y: srFormatNumber(p2[Y], locale),
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
    const m = coeffs?.m ?? 1;
    const vertexStr = `${srFormatNumber(vertex[X], locale)} comma ${srFormatNumber(vertex[Y], locale)}`;

    const srAbsoluteValueGraph = strings.srAbsoluteValueGraph;
    const srAbsoluteValueVertexPoint = strings.srAbsoluteValueVertexPoint({
        x: srFormatNumber(vertex[X], locale),
        y: srFormatNumber(vertex[Y], locale),
    });
    const srAbsoluteValueSecondPoint = strings.srAbsoluteValueSecondPoint({
        x: srFormatNumber(armPoint[X], locale),
        y: srFormatNumber(armPoint[Y], locale),
    });
    const srAbsoluteValueDescription = strings.srAbsoluteValueDescription({
        vertex: vertexStr,
        slope: srFormatNumber(m, locale),
    });

    return {
        srAbsoluteValueGraph,
        srAbsoluteValueVertexPoint,
        srAbsoluteValueSecondPoint,
        srAbsoluteValueDescription,
    };
}
