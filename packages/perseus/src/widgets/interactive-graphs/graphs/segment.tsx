import {vector as kvector} from "../../../../../kmath";
import Color from "@khanacademy/wonder-blocks-color";
import {Line, MovablePoint, vec} from "mafs";
import * as React from "react";

import {
    constrain,
    normalizeCoords,
    normalizePoints,
    useEffectAfterFirstRender,
    useInteractivePoint,
} from "../utils";

import type {Coord} from "../../../interactive2/types";
import type {PerseusGraphTypeSegment} from "../../../perseus-types";
import type {MafsGraphProps} from "../types";

export type SegmentProps = MafsGraphProps<PerseusGraphTypeSegment>;

const getDefaultSegments = (
    props: SegmentProps,
): ReadonlyArray<ReadonlyArray<Coord>> => {
    const ys = (n?: number) => {
        switch (n) {
            case 2:
                return [5, -5];
            case 3:
                return [5, 0, -5];
            case 4:
                return [6, 2, -2, -6];
            case 5:
                return [6, 3, 0, -3, -6];
            case 6:
                return [5, 3, 1, -1, -3, -5];
            default:
                return [5];
        }
    };

    return ys(props.graph.numSegments).map((y) => {
        let segment: Coord[] = [
            [-5, y],
            [5, y],
        ];
        segment = normalizeCoords(segment, props.range);
        segment = normalizePoints(props.range, props.step, segment);
        return segment;
    });
};

function updateAtIndex<T>(
    array: ReadonlyArray<T>,
    index: number,
    newValue: T,
) {
    return array.map((orig, i) => (index === i ? newValue : orig));
}

export const SegmentGraph = (props: SegmentProps) => {
    const {coords: segments = getDefaultSegments(props)} = props.graph

    const handleChange = (i: number) => (segment: ReadonlyArray<Coord>) => {
        props.onGraphChange({
            ...props.graph,
            coords: updateAtIndex(segments, i, segment),
        });
    }

    return (
        <>
            {segments.map((segment, i) => (
                <Segment
                    key={i}
                    segment={segment}
                    snaps={props.snapStep}
                    range={props.range}
                    onChange={handleChange(i)}
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
    onChange: (
        coords: [[number, number], [number, number]],
    ) => void;
}) => {
    const [pt1, pt2] = props.segment;

    const constrainToGrid = (coord, originalPoint, bannedPoint?: Coord) => {
        const constrained = constrain(coord, props.snaps, props.range);
        if (bannedPoint && kvector.equal(constrained, bannedPoint)) {
            return originalPoint
        }
        return constrained
    }


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
                onMove={(newPoint) => shiftSegment(vec.sub(newPoint, midpoint))}
            />
            <MovablePoint
                point={pt1}
                color={Color.blue}
                onMove={(newPoint) =>
                    props.onChange([constrainToGrid(newPoint, pt1, pt2), pt2])
                }
            />
            <MovablePoint
                point={pt2}
                color={Color.blue}
                onMove={(newPoint) =>
                    props.onChange([pt1, constrainToGrid(newPoint, pt2, pt1)])
                }
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
