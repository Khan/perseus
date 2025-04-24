import {vec} from "mafs";
import {useRef} from "react";
import * as React from "react";

import {inset, snap, size} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {TARGET_SIZE} from "../../utils";
import {useDraggable} from "../use-draggable";
import {useTransformVectorsToPixels} from "../use-transform";
import {getIntersectionOfRayWithBox} from "../utils";

import {SVGLine} from "./svg-line";
import {useControlPoint} from "./use-control-point";
import {Vector} from "./vector";

import type {AriaLive} from "../../types";
import type {Interval} from "mafs";

type Props = {
    points: Readonly<[vec.Vector2, vec.Vector2]>;
    ariaLabels?: {
        point1AriaLabel?: string;
        point2AriaLabel?: string;
        grabHandleAriaLabel?: string;
    };
    // Extra graph information to be read by screen readers
    ariaDescribedBy?: string;
    /* Extends the line to the edge of the graph with an arrow */
    extend?: {
        start: boolean;
        end: boolean;
    };
    onMovePoint?: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveLine?: (delta: vec.Vector2) => unknown;
};

export const MovableLine = (props: Props) => {
    const {
        points: [start, end],
        ariaLabels,
        ariaDescribedBy,
        extend,
        onMoveLine = () => {},
        onMovePoint = () => {},
    } = props;

    const {snapStep} = useGraphConfig();

    // Aria live states for (0) point 1, (1) point 2, and (2) grab handle.
    // When moving an element, set its aria live to "polite" and the others
    // to "off". Otherwise, other connected elements that move at the same
    // time might override the currently focused element's aria live.
    const [ariaLives, setAriaLives] = React.useState<Array<AriaLive>>([
        "off",
        "off",
        "off",
    ]);

    // We use separate focusableHandle elements, instead of letting the movable
    // points themselves be focusable, to allow the tab order of the points to
    // be different from the rendering order. We had to solve for the following
    // constraints:
    // - SVG has no equivalent of z-index, so the order of elements in the
    //   document determines the order in which they're painted. We want the
    //   movable line segment to render behind its endpoints (it looks weird
    //   otherwise) so we have to render the line first.
    // - There isn't a browser-native way to customize tab order, other than
    //   setting tabindex > 0. But that bumps elements to the front of the
    //   tab order for the entire page, which is not what we want.
    const {visiblePoint: visiblePoint1, focusableHandle: focusableHandle1} =
        useControlPoint({
            ariaLabel: ariaLabels?.point1AriaLabel,
            ariaDescribedBy: ariaDescribedBy,
            ariaLive: ariaLives[0],
            point: start,
            sequenceNumber: 1,
            onMove: (p) => {
                setAriaLives(["polite", "off", "off"]);
                onMovePoint(0, p);
            },
            constrain: getMovableLineKeyboardConstraint(
                [start, end],
                snapStep,
                0,
            ),
        });
    const {visiblePoint: visiblePoint2, focusableHandle: focusableHandle2} =
        useControlPoint({
            ariaLabel: ariaLabels?.point2AriaLabel,
            ariaDescribedBy: ariaDescribedBy,
            ariaLive: ariaLives[1],
            point: end,
            sequenceNumber: 2,
            onMove: (p) => {
                setAriaLives(["off", "polite", "off"]);
                onMovePoint(1, p);
            },
            constrain: getMovableLineKeyboardConstraint(
                [start, end],
                snapStep,
                1,
            ),
        });

    const line = (
        <Line
            ariaLabel={ariaLabels?.grabHandleAriaLabel}
            ariaDescribedBy={ariaDescribedBy}
            ariaLive={ariaLives[2]}
            start={start}
            end={end}
            extend={extend}
            onMove={(delta) => {
                setAriaLives(["off", "off", "polite"]);
                onMoveLine(delta);
            }}
        />
    );

    return (
        <>
            {focusableHandle1}
            {line}
            {focusableHandle2}
            {visiblePoint1}
            {visiblePoint2}
        </>
    );
};

type LineProps = {
    start: vec.Vector2;
    end: vec.Vector2;
    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaLive?: AriaLive;
    /* Extends the line to the edge of the graph with an arrow */
    extend?:
        | undefined
        | {
              start: boolean;
              end: boolean;
          };
    onMove: (delta: vec.Vector2) => unknown;
};

const Line = (props: LineProps) => {
    const {start, end, ariaLabel, ariaDescribedBy, ariaLive, extend, onMove} =
        props;

    const [startPtPx, endPtPx] = useTransformVectorsToPixels(start, end);
    const {
        range,
        graphDimensionsInPixels,
        snapStep,
        disableKeyboardInteraction,
        interactiveColor,
    } = useGraphConfig();

    let startExtend: vec.Vector2 | undefined = undefined;
    let endExtend: vec.Vector2 | undefined = undefined;

    if (extend) {
        const trimmedRange = trimRange(range, graphDimensionsInPixels);
        startExtend = extend.start
            ? getIntersectionOfRayWithBox(end, start, trimmedRange)
            : undefined;
        endExtend = extend.end
            ? getIntersectionOfRayWithBox(start, end, trimmedRange)
            : undefined;
    }

    const line = useRef<SVGGElement>(null);
    const {dragging} = useDraggable({
        gestureTarget: line,
        point: start,
        onMove: (newPoint) => {
            onMove(vec.sub(newPoint, start));
        },
        constrainKeyboardMovement: (p) => snap(snapStep, p),
    });

    return (
        <>
            <g
                ref={line}
                tabIndex={disableKeyboardInteraction ? -1 : 0}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedBy}
                aria-live={ariaLive}
                aria-disabled={disableKeyboardInteraction}
                className="movable-line"
                data-testid="movable-line"
                style={{cursor: dragging ? "grabbing" : "grab"}}
                // Indicate that this element is interactive.
                // As a bonus, giving this group a non-group role makes
                // the screen reader skip over its empty children.
                role="button"
            >
                {/**
                 * This transparent line creates a nice big click/touch target.
                 */}
                <SVGLine
                    start={startPtPx}
                    end={endPtPx}
                    style={{stroke: "transparent", strokeWidth: TARGET_SIZE}}
                />
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

export const getMovableLineKeyboardConstraint = (
    line: [vec.Vector2, vec.Vector2],
    snapStep: vec.Vector2,
    pointIndex: number,
): {
    up: vec.Vector2;
    down: vec.Vector2;
    left: vec.Vector2;
    right: vec.Vector2;
} => {
    // Separate the two points into their own variables, and determine which point is being moved
    const coordToBeMoved = line[pointIndex];
    const otherPoint = line[1 - pointIndex];

    // Create a helper function that moves the point and then checks
    // if it overlaps with the other point in the line after the move.
    const movePointWithConstraint = (
        moveFunc: (coord: vec.Vector2) => vec.Vector2,
    ): vec.Vector2 => {
        // Move the point
        let movedCoord = moveFunc(coordToBeMoved);
        // If the moved point overlaps with the other point in the line,
        // move the point again.
        if (vec.dist(movedCoord, otherPoint) === 0) {
            movedCoord = moveFunc(movedCoord);
        }
        return movedCoord;
    };

    // Check if the new point will overlap the other point.
    // If it will, we need to snap the point to the left or right an additional
    // snapStep to avoid overlap.
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

export function trimRange(
    range: [Interval, Interval],
    graphDimensionsInPixels: vec.Vector2,
): [Interval, Interval] {
    const pixelsToTrim = 4;
    const [xRange, yRange] = range;
    const [pixelsWide, pixelsTall] = graphDimensionsInPixels;
    const graphUnitsPerPixelX = size(xRange) / pixelsWide;
    const graphUnitsPerPixelY = size(yRange) / pixelsTall;
    const graphUnitsToTrimX = pixelsToTrim * graphUnitsPerPixelX;
    const graphUnitsToTrimY = pixelsToTrim * graphUnitsPerPixelY;
    return inset([graphUnitsToTrimX, graphUnitsToTrimY], range);
}
