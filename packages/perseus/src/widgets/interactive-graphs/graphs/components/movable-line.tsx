import {vec, useMovable} from "mafs";
import {useRef} from "react";
import * as React from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {TARGET_SIZE} from "../../utils";
import {useTransformVectorsToPixels} from "../use-transform";
import {getIntersectionOfRayWithBox} from "../utils";

import {SVGLine} from "./svg-line";
import {Vector} from "./vector";

import type {Interval} from "mafs";

const defaultStroke = "var(--movable-line-stroke-color)";

type Props = {
    start: vec.Vector2;
    end: vec.Vector2;
    onMove: (delta: vec.Vector2) => unknown;
    stroke?: string;
    /* Extends the line to the edge of the graph with an arrow */
    extend?: undefined | {
        start: boolean;
        end: boolean;
        range: [Interval, Interval];
    };
};

export const MovableLine = (props: Props) => {
    const {start, end, onMove, extend, stroke = defaultStroke} = props;
    const midpoint = vec.midpoint(start, end);

    const [startPtPx, endPtPx] = useTransformVectorsToPixels(start, end);
    const {graphDimensionsInPixels} = useGraphConfig();

    let startExtend: vec.Vector2 | undefined = undefined;
    let endExtend: vec.Vector2 | undefined = undefined;

    if (extend) {
        const trimmedRange = trimRange(extend.range, graphDimensionsInPixels);
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
        point: midpoint,
        onMove: (newPoint) => {
            onMove(vec.sub(newPoint, midpoint));
        },
        constrain: (p) => p,
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
