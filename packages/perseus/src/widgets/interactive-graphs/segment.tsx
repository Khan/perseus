import {useMovablePoint, Line} from "mafs";
import * as React from "react";

import {Grid} from "./grid";
import {constrain, normalizeCoords, normalizePoints} from "./utils";

import type {MafsGraphProps} from "./types";
import type {Coord} from "../../interactive2/types";
import type {PerseusGraphTypeSegment} from "../../perseus-types";

type SegmentProps = MafsGraphProps<PerseusGraphTypeSegment>;

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

export const SegmentsGraph = (props: SegmentProps) => {
    const segments = getSegmentCoords(props);
    return (
        <>
            {!props.usesLegacyBackgoundImage && <Grid {...props} />}
            {segments.map((segment, i) => (
                <Segment
                    key={i}
                    segment={segment}
                    snaps={props.snapStep}
                    range={props.range}
                />
            ))}
        </>
    );
};

const Segment = (props: {
    segment: ReadonlyArray<Coord>;
    snaps: [number, number];
    range: [[number, number], [number, number]];
}) => {
    const [start, end] = props.segment;
    const p1 = useMovablePoint(start, {
        constrain: (coord) => constrain(coord, props.snaps, props.range),
    });
    const p2 = useMovablePoint(end, {
        constrain: (coord) => constrain(coord, props.snaps, props.range),
    });
    return (
        <>
            <Line.Segment point1={p1.point} point2={p2.point} />
            {p1.element}
            {p2.element}
        </>
    );
};
