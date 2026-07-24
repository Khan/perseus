import {useRef, useState} from "react";
import * as React from "react";

import {snap} from "../../../math";
import useGraphConfig from "../../../reducer/use-graph-config";
import {TARGET_SIZE} from "../../../utils";
import {useDraggable} from "../../use-draggable";
import {useTransformVectorsToPixels} from "../../use-transform";
import {getIntersectionOfRayWithBox} from "../../utils";
import {useHitbox} from "../hitbox";
import {SVGLine} from "../svg-line";
import {Vector} from "../vector";

import {insetTipAlongRay} from "./util";

import type {vec} from "mafs";

export interface LineProps {
    start: vec.Vector2;
    end: vec.Vector2;
    ariaLabel?: string;
    ariaDescribedBy?: string;
    /* Extends the line to the edge of the graph with an arrow */
    extend?:
        | undefined
        | {
              start: boolean;
              end: boolean;
          };
    onMove: (newStart: vec.Vector2) => unknown;
}

export const Line = (props: LineProps) => {
    const {start, end, ariaLabel, ariaDescribedBy, extend, onMove} = props;

    const [startPtPx, endPtPx] = useTransformVectorsToPixels(start, end);
    const {
        range,
        graphDimensionsInPixels,
        snapStep,
        disableKeyboardInteraction,
        interactiveColor,
    } = useGraphConfig();

    const computeExtensionTip = (tail: vec.Vector2, source: vec.Vector2) =>
        insetTipAlongRay(
            tail,
            getIntersectionOfRayWithBox(source, tail, range),
            range,
            graphDimensionsInPixels,
        );

    const startExtend = extend?.start
        ? computeExtensionTip(start, end)
        : undefined;
    const endExtend = extend?.end ? computeExtensionTip(end, start) : undefined;

    const line = useRef<SVGGElement>(null);
    const lineHitboxRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    // Keyboard drag stays on the focusable SVG group.
    useDraggable({
        gestureTarget: line,
        point: start,
        onMove,
        constrainKeyboardMovement: (p) => snap(snapStep, p),
    });
    // Pointer/touch drag runs through an HTML hitbox so Safari doesn't scroll
    // the page during a drag (see hitbox.tsx).
    const {dragging} = useDraggable({
        gestureTarget: lineHitboxRef,
        point: start,
        onMove,
        constrainKeyboardMovement: (p) => snap(snapStep, p),
    });

    const lineHitbox = useHitbox({
        shape: {kind: "line", start, end, thicknessPx: TARGET_SIZE},
        hitboxRef: lineHitboxRef,
        layer: "body",
        dragging,
        onHoverChange: setHovered,
        testId: "movable-line__hitbox",
    });

    return (
        <>
            {lineHitbox}
            <g
                ref={line}
                tabIndex={disableKeyboardInteraction ? -1 : 0}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedBy}
                aria-disabled={disableKeyboardInteraction}
                className={
                    hovered
                        ? "movable-line movable-line--hover"
                        : "movable-line"
                }
                data-testid="movable-line"
                style={{cursor: dragging ? "grabbing" : "grab"}}
                // Indicate that this element is interactive.
                // As a bonus, giving this group a non-group role makes
                // the screen reader skip over its empty children.
                role="button"
            >
                {/* Pointer/touch dragging is handled by the HTML hitbox
                    (see lineHitbox); the SVG here is visual + keyboard focus. */}
                <SVGLine
                    start={startPtPx}
                    end={endPtPx}
                    className="movable-line-focus-outline"
                    style={{}}
                />
                <SVGLine
                    start={startPtPx}
                    end={endPtPx}
                    className="movable-line-focus-outline-gap"
                    style={{}}
                />
                <SVGLine
                    start={startPtPx}
                    end={endPtPx}
                    style={{
                        stroke: interactiveColor,
                        strokeWidth: "var(--movable-line-stroke-weight)",
                    }}
                    className={dragging ? "movable-dragging" : ""}
                    testId="movable-line__line"
                />
            </g>

            {/* Draw extension vectors outside of movable area */}
            {startExtend && (
                <Vector
                    tail={start}
                    tip={startExtend}
                    testId="movable-line__vector"
                />
            )}
            {endExtend && (
                <Vector
                    tail={end}
                    tip={endExtend}
                    testId="movable-line__vector"
                />
            )}
        </>
    );
};
