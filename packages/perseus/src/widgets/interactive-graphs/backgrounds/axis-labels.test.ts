import {getLabelPosition, fontSize} from "./axis-labels";

import type {GraphDimensions} from "../types";

describe("getLabelPosition", () => {
    it("should return the correct position for the default graph", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "onAxis";
        const expected = [
            [400, 200], // X Label at [Right edge of the graph, vertical center of the graph]
            [200, -2 * fontSize], // Y Label at [Horizontal center of the graph, 2x fontSize above the top edge]
        ];

        expect(getLabelPosition(graphInfo, labelLocation)).toEqual(expected);
    });

    it("should return the correct position for labels set to alongEdge", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "alongEdge";
        const expected = [
            [200, 400 + fontSize], // X Label at [Horizontal center of the graph, 1x fontSize below the bottom edge]
            [-fontSize, 200 - fontSize], // Y label at [1x fontSize to the left of the left edge, vertical center of the graph]
        ];

        expect(getLabelPosition(graphInfo, labelLocation)).toEqual(expected);
    });

    it("should return the correct position for labels set to alongEdge with wholly negative ranges", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [-10, -5],
                [-10, -5],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "alongEdge";
        const expected = [
            [200, 400 + fontSize], // X Label at [Horizontal center of the graph, 1x fontSize below the bottom edge]
            [-14, 200 - fontSize], // Y label at [1x fontSize to the left of the left edge, vertical center of the graph]
        ];

        expect(getLabelPosition(graphInfo, labelLocation)).toEqual(expected);
    });

    it("should return the correct position for labels set to alongEdge with wholly positive ranges", () => {
        const graphInfo: GraphDimensions = {
            range: [
                [5, 10],
                [5, 10],
            ],
            width: 400,
            height: 400,
        };
        const labelLocation = "alongEdge";
        const expected = [
            [200, 400 + 3 * fontSize], // X Label at [Horizontal center of the graph, 3x fontSize below the bottom edge]
            [-3 * fontSize, 200 - fontSize], // Y label at [3x fontSize to the left of the left edge, vertical center of the graph]
        ];

        expect(getLabelPosition(graphInfo, labelLocation)).toEqual(expected);
    });
});
