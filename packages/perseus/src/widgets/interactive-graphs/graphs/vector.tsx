import {angles} from "@khanacademy/kmath";
import {vec} from "mafs";
import * as React from "react";
import {useRef, useState} from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {snap, X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {TARGET_SIZE} from "../utils";

import {Arrowhead} from "./components/arrowhead";
import {PillDragHandle} from "./components/pill-drag-handle";
import SRDescInSVG from "./components/sr-description-within-svg";
import {SVGLine} from "./components/svg-line";
import {useControlPoint} from "./components/use-control-point";
import {srFormatNumber} from "./screenreader-text";
import {useDraggable} from "./use-draggable";
import {useTransformVectorsToPixels} from "./use-transform";

import type {I18nContextType} from "../../../components/i18n-context";
import type {
    Dispatch,
    InteractiveGraphElementSuite,
    MafsGraphProps,
    VectorGraphState,
} from "../types";

const {calculateAngleInDegrees} = angles;

// The arrowhead extends past the tip by this many grid steps along
// the vector direction, so it's clearly visible beyond the draggable dot.
const ARROW_EXTENSION_GRID_STEPS = 1.5;

// The extension line is pulled back by this many pixels from the arrowhead
// tip so the line stroke doesn't poke past the arrowhead shape.
const ARROW_LINE_PULLBACK_PX = 3;

export function renderVectorGraph(
    state: VectorGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <VectorGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getVectorGraphDescription(state, i18n),
    };
}

type Props = MafsGraphProps<VectorGraphState>;

const VectorGraph = (props: Props) => {
    const {dispatch} = props;
    const {coords} = props.graphState;
    const [tail, tip] = coords;

    const {strings, locale} = usePerseusI18n();
    const {gridStep, interactiveColor} = useGraphConfig();
    const id = React.useId();
    const pointsDescriptionId = id + "-points";

    // Compute arrowhead position past the tip along the vector direction
    const graphDir = vec.sub(tip, tail);
    const arrowTip: vec.Vector2 =
        vec.mag(graphDir) > 0
            ? vec.add(
                  tip,
                  vec.scale(
                      vec.normalize(graphDir),
                      gridStep[X] * ARROW_EXTENSION_GRID_STEPS,
                  ),
              )
            : tip;
    const [tailPx, tipPx] = useTransformVectorsToPixels(tail, tip);
    const direction = vec.sub(tipPx, tailPx);
    const angleDeg = calculateAngleInDegrees(direction);

    // Aria label strings
    const {
        srVectorGraph,
        srVectorPoints,
        srVectorTipPoint,
        srVectorGrabHandle,
    } = describeVectorGraph(props.graphState, {strings, locale});

    return (
        <g aria-label={srVectorGraph} aria-describedby={pointsDescriptionId}>
            {/* Body grab handle — translates the entire vector */}
            <VectorBody
                tail={tail}
                tip={tip}
                arrowTip={arrowTip}
                ariaLabel={srVectorGrabHandle}
                ariaDescribedBy={pointsDescriptionId}
                onMove={(delta) => dispatch(actions.vector.moveVector(delta))}
            />

            {/* Tip point — draggable, changes direction and magnitude */}
            <TipPoint
                tail={tail}
                tip={tip}
                ariaLabel={srVectorTipPoint}
                ariaDescribedBy={pointsDescriptionId}
                onMove={(destination) =>
                    dispatch(actions.vector.moveTip(destination))
                }
            />

            {/* Arrowhead — rendered last so it paints on top of the
                thickened line and tip point dot */}
            <Arrowhead
                angle={angleDeg}
                tip={arrowTip}
                color={interactiveColor}
                strokeWidth={2}
            />

            {/* Hidden SR description */}
            <SRDescInSVG id={pointsDescriptionId}>{srVectorPoints}</SRDescInSVG>
        </g>
    );
};

type VectorBodyProps = {
    tail: vec.Vector2;
    tip: vec.Vector2;
    arrowTip: vec.Vector2;
    ariaLabel: string;
    ariaDescribedBy: string;
    onMove: (delta: vec.Vector2) => unknown;
};

// The vector body is the grab handle for translating the entire vector.
// Dragging it moves both the tail and tip by the same delta, preserving
// the vector's length and direction. It renders the visible line, the
// extension line to the arrowhead, and the pill-shaped drag handle.
const VectorBody = (props: VectorBodyProps) => {
    const {tail, tip, arrowTip, ariaLabel, ariaDescribedBy, onMove} = props;
    const {snapStep, disableKeyboardInteraction} = useGraphConfig();
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    const [tailPx, tipPx, arrowTipPx] = useTransformVectorsToPixels(
        tail,
        tip,
        arrowTip,
    );

    const bodyRef = useRef<SVGGElement>(null);
    const {dragging} = useDraggable({
        gestureTarget: bodyRef,
        point: tail,
        onMove: (newPoint) => {
            onMove(vec.sub(newPoint, tail));
        },
        onDragEnd: () => {
            // Blur the grab handle when a mouse drag ends to prevent
            // a lingering focus ring after the user releases.
            bodyRef.current?.blur();
        },
        constrainKeyboardMovement: (p) => snap(snapStep, p),
    });

    // Calculate angle for arrowhead and drag handle rotation
    const direction = vec.sub(tipPx, tailPx);
    const dirMag = vec.mag(direction);
    const angleDeg = calculateAngleInDegrees(direction);

    // Drag handle position: ~1/3 along the line from tail to tip,
    // giving more room near the tip point (matches design mockup).
    const handleT = 1 / 3;
    const handlePx: vec.Vector2 = [
        tailPx[X] + (tipPx[X] - tailPx[X]) * handleT,
        tailPx[Y] + (tipPx[Y] - tailPx[Y]) * handleT,
    ];

    // Pull the extension line back slightly from the arrowhead tip
    // so the line stroke doesn't poke past the arrowhead shape,
    // particularly while in the bolder focused state.
    const extensionEndPx: vec.Vector2 =
        dirMag > 0
            ? [
                  arrowTipPx[X] -
                      (direction[X] / dirMag) * ARROW_LINE_PULLBACK_PX,
                  arrowTipPx[Y] -
                      (direction[Y] / dirMag) * ARROW_LINE_PULLBACK_PX,
              ]
            : arrowTipPx;

    const active = hovered || dragging || focused;

    return (
        <g
            ref={bodyRef}
            tabIndex={disableKeyboardInteraction ? -1 : 0}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-disabled={disableKeyboardInteraction}
            aria-live="polite"
            className="movable-line"
            data-testid="movable-vector"
            style={{cursor: dragging ? "grabbing" : "grab"}}
            role="button"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            {/* Transparent hit target */}
            <SVGLine
                start={tailPx}
                end={tipPx}
                style={{stroke: "transparent", strokeWidth: TARGET_SIZE}}
            />
            {/* Visible line — stops at tip point */}
            <SVGLine
                start={tailPx}
                end={tipPx}
                className={`movable-vector-line ${active ? "movable-dragging" : ""}`}
                testId="movable-vector__line"
            />
            {/* Extension line from tip toward arrowhead — pulled back
                slightly so the line doesn't poke past the arrowhead */}
            <SVGLine
                start={tipPx}
                end={extensionEndPx}
                className={`movable-vector-line ${active ? "movable-dragging" : ""}`}
            />
            {/* Drag handle pill, rotated to align with vector */}
            <PillDragHandle
                center={handlePx}
                rotation={angleDeg}
                active={active}
                focused={focused}
            />
        </g>
    );
};

type TipPointProps = {
    tail: vec.Vector2;
    tip: vec.Vector2;
    ariaLabel: string;
    ariaDescribedBy: string;
    onMove: (destination: vec.Vector2) => unknown;
};

// The tip is the only draggable point on the vector. Moving it changes
// the vector's direction and magnitude while the tail stays fixed.
const TipPoint = (props: TipPointProps) => {
    const {tail, tip, ariaLabel, ariaDescribedBy, onMove} = props;
    const {snapStep} = useGraphConfig();

    const {focusableHandle, visiblePoint} = useControlPoint({
        ariaLabel,
        ariaDescribedBy,
        point: tip,
        sequenceNumber: 1,
        onMove,
        constrain: getVectorTipKeyboardConstraint(tail, tip, snapStep),
    });

    return (
        <>
            {focusableHandle}
            {visiblePoint}
        </>
    );
};

// Keyboard constraint for the tip point: prevents overlap with the tail.
// If a move would place the tip on the tail, skip to the next snap step.
export const getVectorTipKeyboardConstraint = (
    tail: vec.Vector2,
    tip: vec.Vector2,
    snapStep: vec.Vector2,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    const moveWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        let moved = moveFunc(tip);
        // If the moved tip overlaps with the tail, move again
        if (vec.dist(moved, tail) === 0) {
            moved = moveFunc(moved);
        }
        return moved;
    };

    return {
        up: moveWithConstraint((coord) => vec.add(coord, [0, snapStep[Y]])),
        down: moveWithConstraint((coord) => vec.sub(coord, [0, snapStep[Y]])),
        left: moveWithConstraint((coord) => vec.sub(coord, [snapStep[X], 0])),
        right: moveWithConstraint((coord) => vec.add(coord, [snapStep[X], 0])),
    };
};

function getVectorGraphDescription(
    state: VectorGraphState,
    i18n: I18nContextType,
) {
    const strings = describeVectorGraph(state, i18n);
    return strings.srVectorInteractiveElement;
}

// Exported for testing
export function describeVectorGraph(
    state: VectorGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {coords} = state;
    const [tail, tip] = coords;
    const {strings, locale} = i18n;

    const srVectorGraph = strings.srVectorGraph;
    const srVectorPoints = strings.srVectorPoints({
        tailX: srFormatNumber(tail[X], locale),
        tailY: srFormatNumber(tail[Y], locale),
        tipX: srFormatNumber(tip[X], locale),
        tipY: srFormatNumber(tip[Y], locale),
    });
    const srVectorTipPoint = strings.srVectorTipPoint({
        x: srFormatNumber(tip[X], locale),
        y: srFormatNumber(tip[Y], locale),
    });
    const srVectorGrabHandle = strings.srVectorGrabHandle({
        tailX: srFormatNumber(tail[X], locale),
        tailY: srFormatNumber(tail[Y], locale),
        tipX: srFormatNumber(tip[X], locale),
        tipY: srFormatNumber(tip[Y], locale),
    });

    const srVectorInteractiveElement = strings.srInteractiveElements({
        elements: [srVectorGraph, srVectorPoints].join(" "),
    });

    return {
        srVectorGraph,
        srVectorPoints,
        srVectorTipPoint,
        srVectorGrabHandle,
        srVectorInteractiveElement,
    };
}
