import {Line} from "mafs";
import * as React from "react";

import {Grid} from "../grid";
import {normalizeCoords, normalizePoints, useInteractivePoint} from "../utils";

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

export const SegmentGraph = (props: SegmentProps) => {
    const segments = getSegmentCoords(props);

    React.useEffect(() => {
        // set initial state
        props.onChange((current) => ({
            ...current,
            coords: segments,
        }));
    });

    return (
        <>
            {!props.usesLegacyGrid && <Grid {...props} />}
            {segments.map((segment, i) => (
                <Segment
                    key={i}
                    i={i}
                    segment={segment}
                    snaps={props.snapStep}
                    range={props.range}
                    onChange={props.onChange}
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
    onChange: SegmentProps["onChange"];
}) => {
    const [start, end] = props.segment;
    const p1 = useInteractivePoint(start, props.snaps, props.range);
    const p2 = useInteractivePoint(end, props.snaps, props.range);

    React.useEffect(() => {
        // update state when points move
        const segment = [p1.point, p2.point];
        props.onChange((current) => ({
            ...current,
            coords: current.coords
                ? current.coords.map((c, i) => (i === props.i ? segment : c))
                : [segment],
        }));
    });

    return (
        <>
            <Line.Segment point1={p1.point} point2={p2.point} />
            {p1.element}
            {p2.element}
        </>
    );
};
