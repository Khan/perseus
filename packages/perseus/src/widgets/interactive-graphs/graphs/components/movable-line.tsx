import {vec, useMovable, useTransformContext, Vector} from "mafs";
import {useRef} from "react";
import * as React from "react";

import type {Interval, VectorProps} from "mafs";
import type {SVGProps} from "react";

export const MovableLine = (props: {
    start: vec.Vector2;
    end: vec.Vector2;
    onMove: (delta: vec.Vector2) => unknown;
    extend?: {
        start: boolean;
        end: boolean;
        range: [Interval, Interval];
    };
}) => {
    const {start, end, onMove, extend} = props;
    const midpoint = vec.midpoint(start, end);

    const {viewTransform, userTransform} = useTransformContext();
    const transformToPx = vec.matrixMult(viewTransform, userTransform);

    const startPtPx = vec.transform(start, transformToPx);
    const endPtPx = vec.transform(end, transformToPx);

    // for SVGLine props
    let startExtendPx = startPtPx;
    let endExtendPx = endPtPx;

    // for Mafs Vector props
    let startExtend: vec.Vector2 | undefined = undefined;
    let endExtend: vec.Vector2 | undefined = undefined;

    if (extend) {
        if (extend.start) {
            startExtend = getExtensionCoords(end, start, extend.range);
            startExtendPx = extend.start
                ? vec.transform(startExtend, transformToPx)
                : startPtPx;
        }
        if (extend.end) {
            endExtend = getExtensionCoords(start, end, extend.range);
            endExtendPx = extend.end
                ? vec.transform(endExtend, transformToPx)
                : endPtPx;
        }
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
        <g
            ref={line}
            tabIndex={0}
            className="movable-line"
            style={{cursor: dragging ? "grabbing" : "grab"}}
        >
            {/**
             * This transparent line creates a nice big click/touch target.
             * 44 is touch best practice and AAA compliant for WCAG
             * https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
             */}
            <SVGLine
                start={startExtendPx}
                end={endExtendPx}
                style={{stroke: "transparent", strokeWidth: 44}}
            />
            <SVGLine
                start={startPtPx}
                end={endPtPx}
                style={{
                    stroke: "var(--mafs-line-stroke-color)",
                    strokeWidth: "var(--mafs-line-stroke-weight)",
                }}
                dragging={dragging}
            />
            {startExtend && (
                <StyledVector
                    tail={start}
                    tip={startExtend}
                    dragging={dragging}
                />
            )}
            {endExtend && (
                <StyledVector tail={end} tip={endExtend} dragging={dragging} />
            )}
        </g>
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
            className={dragging ? "movable-line-dragging" : undefined}
        />
    );
}

const StyledVector = (props: VectorProps & {dragging?: boolean}) => (
    <Vector
        {...props}
        weight={props.dragging ? 4 : props.weight}
        color="var(--mafs-line-stroke-color)"
    />
);

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
