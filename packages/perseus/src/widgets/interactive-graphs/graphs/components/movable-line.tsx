import {vec, useMovable, useTransformContext} from "mafs";
import {useRef} from "react";
import * as React from "react";

import type {Interval} from "mafs";
import type {SVGProps} from "react";

/**
 * All vector props should be pre-transformed
 */
export const MovableLine = (props: {
    start: vec.Vector2;
    end: vec.Vector2;
    onMove: (delta: vec.Vector2) => unknown;
    extendFrom?: {
        start: boolean;
        end: boolean;
    };
    range?: [Interval, Interval];
}) => {
    const {start, end, onMove} = props;
    const midpoint = vec.midpoint(start, end);

    const {viewTransform, userTransform} = useTransformContext();
    const transformToPx = vec.matrixMult(viewTransform, userTransform);

    const startPx = vec.transform(start, transformToPx);
    const endPx = vec.transform(end, transformToPx);

    const segment = useRef<SVGGElement>(null);
    const {dragging} = useMovable({
        gestureTarget: segment,
        point: midpoint,
        onMove: (newPoint) => {
            onMove(vec.sub(newPoint, midpoint));
        },
        constrain: (p) => p,
    });

    return (
        <g
            ref={segment}
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
                start={startPx}
                end={endPx}
                style={{stroke: "transparent", strokeWidth: 44}}
            />
            <SVGLine
                start={startPx}
                end={endPx}
                style={{
                    stroke: "var(--mafs-segment-stroke-color)",
                    strokeWidth: "var(--mafs-segment-stroke-weight)",
                }}
            />
        </g>
    );
};

function SVGLine(props: {
    start: vec.Vector2;
    end: vec.Vector2;
    style: SVGProps<SVGLineElement>["style"];
}) {
    const {start, end, style} = props;
    return (
        <line
            x1={start[0]}
            y1={start[1]}
            x2={end[0]}
            y2={end[1]}
            style={style}
        />
    );
}
