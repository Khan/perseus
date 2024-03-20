import {vec, useMovable, useTransformContext, Vector} from "mafs";
import {useRef} from "react";
import * as React from "react";

import {TARGET_SIZE} from "../../utils";

import type {Interval} from "mafs";
import type {SVGProps} from "react";

const defaultStroke = "var(--movable-line-stroke-color)";

export const MovableLine = (props: {
    start: vec.Vector2;
    end: vec.Vector2;
    onMove: (delta: vec.Vector2) => unknown;
    stroke?: string;
    /* Extends the line to the edge of the graph with an arrow */
    extend?: {
        start: boolean;
        end: boolean;
        range: [Interval, Interval];
    };
}) => {
    const {start, end, onMove, extend, stroke = defaultStroke} = props;
    const midpoint = vec.midpoint(start, end);

    const {viewTransform, userTransform} = useTransformContext();
    const transformToPx = vec.matrixMult(viewTransform, userTransform);

    const startPtPx = vec.transform(start, transformToPx);
    const endPtPx = vec.transform(end, transformToPx);

    let startExtend: vec.Vector2 | undefined = undefined;
    let endExtend: vec.Vector2 | undefined = undefined;

    if (extend) {
        startExtend = extend.start
            ? getExtensionCoords(end, start, extend.range)
            : undefined;
        endExtend = extend.end
            ? getExtensionCoords(start, end, extend.range)
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
                    style={{
                        stroke,
                        strokeWidth: "var(--movable-line-stroke-weight)",
                    }}
                    dragging={dragging}
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

function SVGLine(props: {
    start: vec.Vector2;
    end: vec.Vector2;
    style: SVGProps<SVGLineElement>["style"];
    dragging?: boolean;
}) {
    const {start, end, style, dragging} = props;
    return (
        <line
            x1={start[0]}
            y1={start[1]}
            x2={end[0]}
            y2={end[1]}
            style={style}
            className={dragging ? "movable-dragging" : undefined}
        />
    );
}

/**
 * Given two points, find the tips that extends through the points to the edge of the range.
 * @param collinearPoint - The point that the line passes through. Needed to establish slope.
 * @param extendFrom - The point that the line extends from to the edge of the graph.
 */
const getExtensionCoords = (
    collinearPoint: vec.Vector2,
    extendFrom: vec.Vector2,
    range: [Interval, Interval],
): [number, number] => {
    // edges of the graph
    const [[xMin, xMax], [yMin, yMax]] = range;
    const [aX, aY] = collinearPoint;
    const [bX, bY] = extendFrom;

    const yDiff = bY - aY;
    const xDiff = bX - aX;
    const slope = yDiff / xDiff;

    const yAtXMin = slope * (xMin - aX) + aY;
    const yAtXMax = slope * (xMax - aX) + aY;
    const xAtYMin = (yMin - aY) / slope + aX;
    const xAtYMax = (yMax - aY) / slope + aX;

    // clock analogy to describe quadrants
    switch (true) {
        // 12 o'clock to 2:59
        case yDiff > 0 && xDiff >= 0:
            return xAtYMax > xMax ? [xMax, yAtXMax] : [xAtYMax, yMax];
        // 3 o'clock to 5:59
        case yDiff <= 0 && xDiff > 0:
            // xAtYMin evaluates to -Infinity here, so we use absolute value
            return Math.abs(xAtYMin) > xMax ? [xMax, yAtXMax] : [xAtYMin, yMin];
        // 9 o'clock to 11:59
        case yDiff >= 0 && xDiff < 0:
            return xAtYMax < xMin ? [xMin, yAtXMin] : [xAtYMax, yMax];
        // 6 o'clock to 8:59
        case yDiff < 0 && xDiff <= 0:
            return xAtYMin < xMin ? [xMin, yAtXMin] : [xAtYMin, yMin];
        default:
            return [xMax, yAtXMax];
    }
};
