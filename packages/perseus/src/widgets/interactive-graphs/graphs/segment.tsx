import {Line, MovablePoint, vec} from "mafs";
import * as React from "react";
import {vector as kvector} from "../../../../../kmath"

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
import Color from "@khanacademy/wonder-blocks-color";

export type SegmentProps = MafsGraphProps<PerseusGraphTypeSegment>;

const getSegmentCoords = (
    props: SegmentProps,
): ReadonlyArray<ReadonlyArray<Coord>> => {
    const coords = props.graph.coords;
    if (coords) {
        return coords;
    }

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

const updateSegmentsArray = (
    segments: ReadonlyArray<ReadonlyArray<Coord>>,
    index: number,
    segment: ReadonlyArray<Coord>,
) => segments.map((seg: any, i: any) => (index === i ? segment : seg));

export const SegmentGraph = (props: SegmentProps) => {
    const segments = getSegmentCoords(props);

    const handleChange = (i: number, segment: any) =>
        props.onGraphChange((current) => ({
            ...current,
            coords: current.coords
                ? updateSegmentsArray(current.coords, i, segment)
                : updateSegmentsArray(segments, i, segment),
        }));

    return (
        <>
            {segments.map((segment, i) => (
                <Segment
                    key={i}
                    i={i}
                    segment={segment}
                    snaps={props.snapStep}
                    range={props.range}
                    onChange={handleChange}
                    data-testid={"segment" + i}
                />
            ))}
        </>
    );
};

const Segment = (props: {
    i: number;
    segment: ReadonlyArray<Coord>;
    snaps: [number, number];
    range: [[number, number], [number, number]];
    onChange: (
        index: number,
        coords: [[number, number], [number, number]],
    ) => void;
}) => {
    const [start, end] = props.segment;
    const {point: pt1, element: el1, setPoint: setPoint1} = useInteractivePoint(
        start,
        props.snaps,
        props.range,
        () => pt1,
        () => [pt2]
    );
    const {point: pt2, element: el2, setPoint: setPoint2} = useInteractivePoint(
        end,
        props.snaps,
        props.range,
        () => pt2,
        () => [pt1]
    );

    function shiftSegment(shiftBy: vec.Vector2) {
        const [newPt1, newPt2] = shiftEndpoints(pt1, pt2, shiftBy, (coord) => constrain(coord, props.snaps, props.range))
        setPoint1(newPt1)
        setPoint2(newPt2)
    }

    useEffectAfterFirstRender(
        () => props.onChange(props.i, [pt1, pt2]),
        [pt1, pt2],
    );

    const midpoint = vec.midpoint(pt1, pt2)

    return (
        <>
            <Line.Segment point1={pt1} point2={pt2} />
            <MovablePoint point={midpoint} color={Color.blue} onMove={(newPoint) => shiftSegment(vec.sub(newPoint, midpoint))}/>
            {el1}
            {el2}
        </>
    );
};

export function shiftEndpoints(start: Coord, end: Coord, shiftBy: vec.Vector2, constrainPoint: (point: Coord) => Coord) {
    let newStart = constrainPoint(vec.add(start, shiftBy));
    let newEnd = constrainPoint(vec.add(end, shiftBy));
    if (!kvector.equal(vec.sub(end, start), vec.sub(newEnd, newStart))) {
        return [start, end]
    }
    return [newStart, newEnd]
}
