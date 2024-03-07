import Color from "@khanacademy/wonder-blocks-color";
import {Line, MovablePoint, vec, useMovable, useTransformContext} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {moveControlPoint, moveSegment} from "../interactive-graph-action";

import type {Segment, SegmentGraphState} from "../interactive-graph-state";
import type {MafsGraphProps} from "../types";

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
    const {onMoveSegment, segment: [pt1, pt2]} = props;
    const midpoint = vec.midpoint(pt1, pt2);
    const segment = useRef<SVGGElement>(null);
    const {dragging: draggingSegment} = useMovable({
        gestureTarget: segment,
        point: midpoint,
        onMove: (newPoint: vec.Vector2) => {
            props.onMoveSegment(vec.sub(newPoint, midpoint));
        },
        constrain: identity,
    })

    const { viewTransform: pixelMatrix, userTransform } = useTransformContext()
    const transform = vec.matrixMult(pixelMatrix, userTransform)

    const scaledPoint1 = vec.transform(pt1, transform)
    const scaledPoint2 = vec.transform(pt2, transform)

    return (
        <>
            <g ref={segment} tabIndex={0} className="movable-segment" style={{cursor: draggingSegment ? "grabbing" : "grab"}}>
                <line
                    x1={scaledPoint1[0]}
                    y1={scaledPoint1[1]}
                    x2={scaledPoint2[0]}
                    y2={scaledPoint2[1]}
                    strokeWidth={10}
                    style={{stroke: "transparent"}}
                />
                <line
                    x1={scaledPoint1[0]}
                    y1={scaledPoint1[1]}
                    x2={scaledPoint2[0]}
                    y2={scaledPoint2[1]}
                    style={{ stroke: "var(--mafs-segment-stroke-color)", strokeWidth: "var(--mafs-segment-stroke-weight)" }}
                />
            </g>
            <MovablePoint
                point={pt1}
                color={Color.blue}
                onMove={(newPoint) => {
                    props.onMovePoint(0, newPoint);
                }}
            />
            <MovablePoint
                point={pt2}
                color={Color.blue}
                onMove={(newPoint) => {
                    props.onMovePoint(1, newPoint);
                }}
            />
        </>
    );
};

function identity<T>(x: T): T {
    return x
}
