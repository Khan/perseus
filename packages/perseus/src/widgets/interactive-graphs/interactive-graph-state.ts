import {normalizeCoords, normalizePoints} from "./utils";

import type {
    PerseusGraphType,
    PerseusGraphTypeSegment,
} from "../../perseus-types";
import type {Coord} from "@khanacademy/perseus";
import type {Interval, vec} from "mafs";

export type InteractiveGraphState = SegmentGraphState;

export interface SegmentGraphState extends InteractiveGraphStateCommon {
    type: "segment";
    segments: Segment[];
}

export interface InteractiveGraphStateCommon {
    hasBeenInteractedWith: boolean;
    // range = [[xMin, xMax], [yMin, yMax]] in Cartesian units
    range: [Interval, Interval];
    // snapStep = [xStep, yStep] in Cartesian units
    snapStep: vec.Vector2;
}

export type Segment = [vec.Vector2, vec.Vector2];

export function initializeGraphState(params: {
    range: [Interval, Interval];
    step: vec.Vector2;
    snapStep: vec.Vector2;
    graph: PerseusGraphType;
}): InteractiveGraphState {
    const {graph, step, snapStep, range} = params;
    switch (graph.type) {
        case "segment":
            return {
                type: "segment",
                hasBeenInteractedWith: false,
                range,
                snapStep,
                segments: getDefaultSegments({graph, step, range}),
            };
    }
    throw new Error("Mafs not yet implemented for graph type: " + graph.type);
}

const getDefaultSegments = (props: {
    graph: PerseusGraphTypeSegment;
    step: vec.Vector2;
    range: [Interval, Interval];
}): Segment[] => {
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
        let endpoints: [Coord, Coord] = [
            [-5, y],
            [5, y],
        ];
        endpoints = normalizeCoords(endpoints, props.range);
        endpoints = normalizePoints(props.range, props.step, endpoints);
        return endpoints;
    });
};
