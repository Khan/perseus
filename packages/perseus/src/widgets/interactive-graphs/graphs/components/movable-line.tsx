import {vec, useMovable} from "mafs";
import {useRef} from "react";
import * as React from "react";

import {TARGET_SIZE} from "../../utils";
import {useTransform} from "../use-transform";
import {getRayIntersectionCoords} from "../utils";

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
    extend?: {
        start: boolean;
        end: boolean;
        range: [Interval, Interval];
    };
};

export const MovableLine = (props: Props) => {
    const {start, end, onMove, extend, stroke = defaultStroke} = props;
    const midpoint = vec.midpoint(start, end);

    const [startPtPx, endPtPx] = useTransform(start, end);

    let startExtend: vec.Vector2 | undefined = undefined;
    let endExtend: vec.Vector2 | undefined = undefined;

    if (extend) {
        startExtend = extend.start
            ? getRayIntersectionCoords(end, start, extend.range)
            : undefined;
        endExtend = extend.end
            ? getRayIntersectionCoords(start, end, extend.range)
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
                data-test-id="movable-line"
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
