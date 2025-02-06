import getGrapherPublicWidgetOptions from "./grapher-util";

import type {PerseusGrapherWidgetOptions} from "../../data-schema";

describe("getGrapherPublicWidgetOptions", () => {
    it("removes the `correct` field", () => {
        const options: PerseusGrapherWidgetOptions = {
            availableTypes: ["absolute_value"],
            correct: {
                type: "absolute_value",
                coords: [
                    [0, 0],
                    [1, 2],
                ],
            },
            graph: {
                backgroundImage: {},
                labels: ["", ""],
                markings: "none",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                rulerLabel: "",
                rulerTicks: 0,
                step: [1, 1],
            },
        };

        const publicOptions = getGrapherPublicWidgetOptions(options);

        expect(publicOptions).toEqual({
            availableTypes: ["absolute_value"],
            graph: {
                backgroundImage: {},
                labels: ["", ""],
                markings: "none",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                rulerLabel: "",
                rulerTicks: 0,
                step: [1, 1],
            },
        });
    });
});
