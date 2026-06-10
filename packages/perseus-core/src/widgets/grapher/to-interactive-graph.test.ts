import {describe, it, expect} from "@jest/globals";

import {generateGrapherWidgetOptions} from "../../utils/generators/grapher-widget-generator";

import {convertGrapherOptionsToInteractiveGraph} from "./to-interactive-graph";

describe("convertGrapherOptionsToInteractiveGraph", () => {
    it("returns null given a graph with multiple available function types", () => {
        const grapher = generateGrapherWidgetOptions({
            availableTypes: ["sinusoid", "linear"],
        });
        expect(convertGrapherOptionsToInteractiveGraph(grapher)).toBe(null);
    });

    it("returns null given a quadratic graph", () => {
        const grapher = generateGrapherWidgetOptions({
            availableTypes: ["quadratic"],
        });
        expect(convertGrapherOptionsToInteractiveGraph(grapher)).toBe(null);
    });

    it("converts the 'correct' field if present", () => {
        const grapher = generateGrapherWidgetOptions({
            availableTypes: ["sinusoid"],
            correct: {
                type: "sinusoid",
                coords: [
                    [1, 2],
                    [3, 4],
                ],
            },
        });

        const ig = convertGrapherOptionsToInteractiveGraph(grapher);

        expect(ig?.correct).toEqual({
            type: "sinusoid",
            coords: [
                [1, 2],
                [3, 4],
            ],
        });
    });

    it("defaults the 'correct' field if missing", () => {
        const grapher = generateGrapherWidgetOptions({
            availableTypes: ["sinusoid"],
            correct: undefined,
        });

        const ig = convertGrapherOptionsToInteractiveGraph(grapher);

        expect(ig?.correct).toEqual({
            type: "sinusoid",
        });
    });
});
