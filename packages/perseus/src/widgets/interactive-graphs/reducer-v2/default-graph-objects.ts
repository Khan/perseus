import {
    CollinearTuple,
    PerseusGraphType,
    PerseusGraphTypeSegment
} from "../../../perseus-types";
import {Interval, vec} from "mafs";
import {Coord} from "@khanacademy/perseus";
import {normalizeCoords, normalizePoints} from "../utils";

export interface InitializeGraphStateParams<G extends PerseusGraphType> {
    graph: G;
    range: [Interval, Interval];
    step: vec.Vector2;
}

export function getDefaultSegments({
   graph,
   range,
   step,
}: InitializeGraphStateParams<PerseusGraphTypeSegment>): [vec.Vector2, vec.Vector2][] {
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

    const defaultRange: [Interval, Interval] = [
        [-10, 10],
        [-10, 10],
    ];

    return ys(graph.numSegments).map((y) => {
        let endpoints: [Coord, Coord] = [
            [-5, y],
            [5, y],
        ];
        endpoints = normalizeCoords(endpoints, defaultRange);
        endpoints = normalizePoints(range, step, endpoints);
        return endpoints;
    });
}
