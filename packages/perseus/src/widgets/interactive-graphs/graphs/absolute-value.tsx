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
import {describeAbsoluteValueGraph} from "./strings/absolute-value";
import {srFormatNumber} from "./strings/format-number";
import {getAbsoluteValueCoefficients} from "./utils";

import type {AbsoluteValueCoefficients} from "./utils";
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
