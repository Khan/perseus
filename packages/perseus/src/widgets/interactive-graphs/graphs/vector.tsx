import {angles} from "@khanacademy/kmath";
import {vec} from "mafs";
import * as React from "react";
import {useRef, useState} from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import {snap, X, Y} from "../math";
import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";
import {TARGET_SIZE} from "../utils";

import Hairlines from "./components/hairlines";
import {MovablePillHandle} from "./components/movable-pill-handle";
import SRDescInSVG from "./components/sr-description-within-svg";
import {SVGLine} from "./components/svg-line";
import {useControlArrowhead} from "./components/use-control-arrowhead";
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

// The visible line is pulled back slightly from the tip so its stroke
// doesn't poke past the arrowhead shape.
const LINE_PULLBACK_PX = 4;

// Radius of the static tail dot.
const TAIL_DOT_RADIUS = 6;

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
    const {markings} = useGraphConfig();
    const id = React.useId();
    const pointsDescriptionId = id + "-points";

    // Aria label strings
    const {
        srVectorGraph,
        srVectorPoints,
        srVectorTipPoint,
        srVectorGrabHandle,
    } = describeVectorGraph(props.graphState, {strings, locale});

    // The tip arrowhead's drag/focus state drives the hairlines,
    // which must render before everything else (behind the line
    // and drag handle in SVG paint order).
    const tipArrowhead = useTipArrowhead({
        tail,
        tip,
        ariaLabel: srVectorTipPoint,
        ariaDescribedBy: pointsDescriptionId,
        onMove: (destination) => dispatch(actions.vector.moveTip(destination)),
    });

    const showHairlines =
        (tipArrowhead.dragging || tipArrowhead.focused) && markings !== "none";

    return (
        <g aria-label={srVectorGraph} aria-describedby={pointsDescriptionId}>
            {/* Hairlines render first so they paint behind everything */}
            {showHairlines && <Hairlines point={tip} />}

            {/* Body grab handle — translates the entire vector */}
            <VectorBody
                tail={tail}
                tip={tip}
                ariaLabel={srVectorGrabHandle}
                ariaDescribedBy={pointsDescriptionId}
                onMove={(delta) => dispatch(actions.vector.moveVector(delta))}
            />

            {/* Tip arrowhead — draggable, changes direction and magnitude */}
            {tipArrowhead.focusableHandle}
            {tipArrowhead.visibleArrowhead}

            {/* Hidden SR description */}
            <SRDescInSVG id={pointsDescriptionId}>{srVectorPoints}</SRDescInSVG>
        </g>
    );
};

type VectorBodyProps = {
    tail: vec.Vector2;
    tip: vec.Vector2;
    ariaLabel: string;
    ariaDescribedBy: string;
    onMove: (delta: vec.Vector2) => unknown;
};

// The vector body is the grab handle for translating the entire vector.
// Dragging it moves both the tail and tip by the same delta, preserving
// the vector's length and direction. It renders the visible line and the
// pill-shaped drag handle.
const VectorBody = (props: VectorBodyProps) => {
    const {tail, tip, ariaLabel, ariaDescribedBy, onMove} = props;
    const {snapStep, disableKeyboardInteraction, interactiveColor} =
        useGraphConfig();
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    const [tailPx, tipPx] = useTransformVectorsToPixels(tail, tip);

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

    // Calculate angle for drag handle rotation
    const direction = vec.sub(tipPx, tailPx);
    const dirMag = vec.mag(direction);
    const angleDeg = calculateAngleInDegrees(direction);

    const lineEndPx: vec.Vector2 =
        dirMag > 0
            ? [
                  tipPx[X] - (direction[X] / dirMag) * LINE_PULLBACK_PX,
                  tipPx[Y] - (direction[Y] / dirMag) * LINE_PULLBACK_PX,
              ]
            : tipPx;

    // Drag handle position: centered on the line.
    const handleT = 1 / 2;
    const handlePx: vec.Vector2 = [
        tailPx[X] + (tipPx[X] - tailPx[X]) * handleT,
        tailPx[Y] + (tipPx[Y] - tailPx[Y]) * handleT,
    ];

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
            {/* Transparent hit target for dragging the whole vector */}
            <SVGLine
                start={tailPx}
                end={lineEndPx}
                style={{stroke: "transparent", strokeWidth: TARGET_SIZE}}
            />
            {/* Visible line from tail to tip, pulled back slightly */}
            <SVGLine
                start={tailPx}
                end={lineEndPx}
                className={`movable-vector-line ${active ? "movable-dragging" : ""}`}
                testId="movable-vector__line"
            />
            {/* Tail dot — inside the body group so hovering/dragging
                it activates the line's hover state and drag behavior */}
            <circle
                cx={tailPx[X]}
                cy={tailPx[Y]}
                r={TAIL_DOT_RADIUS}
                fill={interactiveColor}
                data-testid="vector-tail-dot"
            />
            {/* Drag handle pill — only visible on hover / focus / drag */}
            {active && (
                <MovablePillHandle
                    center={handlePx}
                    rotation={angleDeg}
                    active={active}
                    focused={focused}
                />
            )}
        </g>
    );
};

type TipArrowheadParams = {
    tail: vec.Vector2;
    tip: vec.Vector2;
    ariaLabel: string;
    ariaDescribedBy: string;
    onMove: (destination: vec.Vector2) => unknown;
};

// Hook that sets up the draggable arrowhead control at the tip of the
// vector. Returns the rendered elements plus drag/focus state (used by
// VectorGraph to render hairlines at the correct SVG paint order).
function useTipArrowhead(params: TipArrowheadParams) {
    const {tail, tip, ariaLabel, ariaDescribedBy, onMove} = params;
    const {snapStep} = useGraphConfig();

    // Compute the angle so the arrowhead points along the vector
    const [tailPx, tipPx] = useTransformVectorsToPixels(tail, tip);
    const direction = vec.sub(tipPx, tailPx);
    const angleDeg = calculateAngleInDegrees(direction);

    return useControlArrowhead({
        ariaLabel,
        ariaDescribedBy,
        point: tip,
        angle: angleDeg,
        sequenceNumber: 1,
        onMove,
        constrain: getVectorTipKeyboardConstraint(tail, tip, snapStep),
    });
}

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
