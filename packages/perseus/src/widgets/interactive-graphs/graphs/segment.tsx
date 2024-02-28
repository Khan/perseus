import {Line} from "mafs";
import * as React from "react";

import {
    normalizeCoords,
    normalizePoints,
    useEffectAfterFirstRender,
    useInteractivePoint,
} from "../utils";

import type {Coord} from "../../../interactive2/types";
import type {PerseusGraphTypeSegment} from "../../../perseus-types";
import type {MafsGraphProps} from "../types";

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
    const {point: pt1, element: el1} = useInteractivePoint(
        start,
        props.snaps,
        props.range,
    );
    const {point: pt2, element: el2} = useInteractivePoint(
        end,
        props.snaps,
        props.range,
    );

    useEffectAfterFirstRender(
        () => props.onChange(props.i, [pt1, pt2]),
        [pt1, pt2],
    );

    return (
        <>
            <Line.Segment point1={pt1} point2={pt2} />
            {el1}
            {el2}
        </>
    );
};
