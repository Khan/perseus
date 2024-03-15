import {vec, useMovable} from "mafs";
import {useRef} from "react";
import * as React from "react";

import type {Interval} from "mafs";
import type {SVGProps} from "react";

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
            className="movable-segment"
            style={{cursor: dragging ? "grabbing" : "grab"}}
        >
            {/* This transparent line creates a nice big click target. */}
            <SVGLine
                start={start}
                end={end}
                style={{stroke: "transparent", strokeWidth: 30}}
            />
            <SVGLine
                start={start}
                end={end}
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
