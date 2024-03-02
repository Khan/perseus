import {vector as kvector} from "@khanacademy/kmath";
import Color from "@khanacademy/wonder-blocks-color";
import {Line, MovablePoint, vec} from "mafs";
import * as React from "react";

import {moveControlPoint, moveSegment} from "../interactive-graph-action";
import {constrain} from "../utils";

import type {Coord} from "../../../interactive2/types";
import type {PerseusGraphTypeSegment} from "../../../perseus-types";
import type {InteractiveGraphAction} from "../interactive-graph-action";
import type {InteractiveGraphState} from "../interactive-graph-state";
import type {MafsGraphProps} from "../types";

export type SegmentProps = MafsGraphProps<PerseusGraphTypeSegment>;

export const SegmentGraph = (props: {
    graphState: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => {
    const {dispatch} = props;
    const {segments, snapStep, range} = props.graphState;

    return (
        <>
            {segments.map((segment, i) => (
                <Segment
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
                    onChange={() => {}}
                    data-testid={"segment" + i}
                />
            ))}
        </>
    );
};

const Segment = (props: {
    segment: ReadonlyArray<Coord>;
    snaps: [number, number];
    range: [[number, number], [number, number]];
    onMovePoint: (endpointIndex: number, destination: vec.Vector2) => unknown;
    onMoveSegment: (delta: vec.Vector2) => unknown;
    onChange: (coords: [[number, number], [number, number]]) => void;
}) => {
    const [pt1, pt2] = props.segment;

    const constrainToGrid = (coord, originalPoint, bannedPoint?: Coord) => {
        const constrained = constrain(coord, props.snaps, props.range);
        if (bannedPoint && kvector.equal(constrained, bannedPoint)) {
            return originalPoint;
        }
        return constrained;
    };

    function shiftSegment(shiftBy: vec.Vector2) {
        const [newPt1, newPt2] = shiftEndpoints(
            pt1,
            pt2,
            shiftBy,
            constrainToGrid,
        );
        props.onChange([newPt1, newPt2]);
    }

    const midpoint = vec.midpoint(pt1, pt2);

    return (
        <>
            <Line.Segment point1={pt1} point2={pt2} />
            <MovablePoint
                point={midpoint}
                color={Color.blue}
                onMove={(newPoint) => {
                    props.onMoveSegment(vec.sub(newPoint, midpoint))
                }}
            />
            <MovablePoint
                point={pt1}
                color={Color.blue}
                onMove={(newPoint) => {
                    props.onMovePoint(0, newPoint);
                    props.onChange([constrainToGrid(newPoint, pt1, pt2), pt2]);
                }}
            />
            <MovablePoint
                point={pt2}
                color={Color.blue}
                onMove={(newPoint) => {
                    props.onMovePoint(1, newPoint);
                    props.onChange([pt1, constrainToGrid(newPoint, pt2, pt1)]);
                }}
            />
        </>
    );
};

export function shiftEndpoints(
    start: Coord,
    end: Coord,
    shiftBy: vec.Vector2,
    constrainPoint: (point: Coord, originalPoint: Coord) => Coord,
) {
    const newStart = constrainPoint(vec.add(start, shiftBy), start);
    const newEnd = constrainPoint(vec.add(end, shiftBy), end);
    if (!kvector.equal(vec.sub(end, start), vec.sub(newEnd, newStart))) {
        return [start, end];
    }
    return [newStart, newEnd];
}
