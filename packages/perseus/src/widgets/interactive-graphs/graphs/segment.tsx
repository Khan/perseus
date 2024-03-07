import {vec, useMovable, useTransformContext} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {moveControlPoint, moveSegment} from "../interactive-graph-action";
import {MovablePoint} from "../movable-point";

import type {Segment, SegmentGraphState} from "../interactive-graph-state";
import type {MafsGraphProps} from "../types";
import type {SVGProps} from "react";

type SegmentProps = MafsGraphProps<SegmentGraphState>;

export const SegmentGraph = (props: SegmentProps) => {
    const {dispatch} = props;
    const {segments, snapStep, range} = props.graphState;

    return (
        <>
            {segments.map((segment, i) => (
                <SegmentView
                    key={i}
                    segment={segment}
                    snaps={snapStep}
                    range={range}
                    onMoveSegment={(delta: vec.Vector2) => {
                        dispatch(moveSegment(i, delta));
                    }}
                    onMovePoint={(
                        endpointIndex: number,
                        destination: vec.Vector2,
                    ) =>
                        dispatch(
                            moveControlPoint(i, endpointIndex, destination),
                        )
                    }
                    data-testid={"segment" + i}
                />
            ))}
        </>
    );
};

const SegmentView = (props: {
    segment: Readonly<Segment>;
    snaps: [number, number];
    range: [[number, number], [number, number]];
    onMovePoint: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveSegment: (delta: vec.Vector2) => unknown;
}) => {
    const {
        onMoveSegment,
        segment: [pt1, pt2],
    } = props;
    const midpoint = vec.midpoint(pt1, pt2);
    const segment = useRef<SVGGElement>(null);
    const {dragging: isDraggingSegment} = useMovable({
        gestureTarget: segment,
        point: midpoint,
        onMove: (newPoint: vec.Vector2) => {
            onMoveSegment(vec.sub(newPoint, midpoint));
        },
        constrain: (p) => p,
    });

    const {viewTransform, userTransform} = useTransformContext();
    const transformToPx = vec.matrixMult(viewTransform, userTransform);

    const pt1Px = vec.transform(pt1, transformToPx);
    const pt2Px = vec.transform(pt2, transformToPx);

    return (
        <>
            <g
                ref={segment}
                tabIndex={0}
                className="movable-segment"
                style={{cursor: isDraggingSegment ? "grabbing" : "grab"}}
            >
                {/* This transparent line creates a nice big click target. */}
                <SVGLine
                    start={pt1Px}
                    end={pt2Px}
                    style={{stroke: "transparent", strokeWidth: 30}}
                />
                <SVGLine
                    start={pt1Px}
                    end={pt2Px}
                    style={{
                        stroke: "var(--mafs-segment-stroke-color)",
                        strokeWidth: "var(--mafs-segment-stroke-weight)",
                    }}
                />
            </g>
            <MovablePoint
                point={pt1}
                onMove={(newPoint) => {
                    props.onMovePoint(0, newPoint);
                }}
            />
            <MovablePoint
                point={pt2}
                onMove={(newPoint) => {
                    props.onMovePoint(1, newPoint);
                }}
            />
        </>
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
