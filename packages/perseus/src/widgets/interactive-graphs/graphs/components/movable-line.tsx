import {useMovable, vec} from "mafs";
import {useRef, useState} from "react";
import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {snap, TARGET_SIZE} from "../../utils";
import {useTransformVectorsToPixels} from "../use-transform";
import {getIntersectionOfRayWithBox} from "../utils";

import {MovablePointView} from "./movable-point-view";
import {SVGLine} from "./svg-line";
import {Vector} from "./vector";

import type {Interval} from "mafs";

type Props = {
    points: Readonly<[vec.Vector2, vec.Vector2]>;
    onMovePoint?: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveLine?: (delta: vec.Vector2) => unknown;
    color?: string;
    /* Extends the line to the edge of the graph with an arrow */
    extend?: {
        start: boolean;
        end: boolean;
    };
};

export const MovableLine = (props: Props) => {
    const {
        onMoveLine = () => {},
        onMovePoint = () => {},
        color,
        points: [start, end],
        extend,
    } = props;

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
        useControlPoint(start, color, (p) => onMovePoint(0, p));
    const {visiblePoint: visiblePoint2, focusableHandle: focusableHandle2} =
        useControlPoint(end, color, (p) => onMovePoint(1, p));

    const line = (
        <Line
            start={start}
            end={end}
            stroke={color}
            extend={extend}
            onMove={onMoveLine}
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

function useControlPoint(
    point: vec.Vector2,
    color: string | undefined,
    onMovePoint: (newPoint: vec.Vector2) => unknown,
) {
    const {snapStep} = useGraphConfig();
    const [focused, setFocused] = useState(false);
    const keyboardHandleRef = useRef<SVGGElement>(null);
    useMovable({
        gestureTarget: keyboardHandleRef,
        point,
        onMove: onMovePoint,
        constrain: (p) => snap(snapStep, p),
    });

    const visiblePointRef = useRef<SVGGElement>(null);
    const {dragging} = useMovable({
        gestureTarget: visiblePointRef,
        point,
        onMove: onMovePoint,
        constrain: (p) => snap(snapStep, p),
    });

    const focusableHandle = (
        <g
            data-testid="movable-point__focusable-handle"
            tabIndex={0}
            ref={keyboardHandleRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
    );
    const visiblePoint = (
        <MovablePointView
            point={point}
            dragging={dragging}
            color={color}
            ref={visiblePointRef}
            focusBehavior={{type: "controlled", showFocusRing: focused}}
        />
    );

    return {
        focusableHandle,
        visiblePoint,
    };
}

const defaultStroke = "var(--movable-line-stroke-color)";

type LineProps = {
    start: vec.Vector2;
    end: vec.Vector2;
    onMove: (delta: vec.Vector2) => unknown;
    stroke?: string | undefined;
    /* Extends the line to the edge of the graph with an arrow */
    extend?:
        | undefined
        | {
              start: boolean;
              end: boolean;
          };
};

const Line = (props: LineProps) => {
    const {start, end, onMove, extend, stroke = defaultStroke} = props;

    const [startPtPx, endPtPx] = useTransformVectorsToPixels(start, end);
    const {range, graphDimensionsInPixels, snapStep} = useGraphConfig();

    let startExtend: vec.Vector2 | undefined = undefined;
    let endExtend: vec.Vector2 | undefined = undefined;

    if (extend) {
        const trimmedRange = trimRange(range, graphDimensionsInPixels);
        startExtend = extend.start
            ? getIntersectionOfRayWithBox(start, end, trimmedRange)
            : undefined;
        endExtend = extend.end
            ? getIntersectionOfRayWithBox(end, start, trimmedRange)
            : undefined;
    }

    const line = useRef<SVGGElement>(null);
    const {dragging} = useMovable({
        gestureTarget: line,
        point: start,
        onMove: (newPoint) => {
            onMove(vec.sub(newPoint, start));
        },
        constrain: (p) => snap(snapStep, p),
    });

    return (
        <>
            <g
                ref={line}
                tabIndex={0}
                className="movable-line"
                data-testid="movable-line"
                style={{cursor: dragging ? "grabbing" : "grab"}}
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
                        stroke,
                        strokeWidth: "var(--movable-line-stroke-weight)",
                    }}
                    className={dragging ? "movable-dragging" : ""}
                    testId="movable-line__line"
                />
            </g>

            {/* Draw extension vectors outside of movable area */}
            {startExtend && (
                <Vector tail={start} tip={startExtend} color={stroke} />
            )}
            {endExtend && <Vector tail={end} tip={endExtend} color={stroke} />}
        </>
    );
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
    return [trim(xRange, graphUnitsToTrimX), trim(yRange, graphUnitsToTrimY)];
}

function trim(interval: Interval, amount: number): Interval {
    if (size(interval) < amount * 2) {
        return [0, 0];
    }
    return [interval[0] + amount, interval[1] - amount];
}

function size(interval: Interval): number {
    return interval[1] - interval[0];
}
