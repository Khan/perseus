import getInteractiveGraphPublicWidgetOptions from "./interactive-graph-util";

import type {PerseusInteractiveGraphWidgetOptions} from "../../data-schema";

describe("getInteractiveGraphPublicWidgetOptions", () => {
    it("removes the `correct` field", () => {
        const options: PerseusInteractiveGraphWidgetOptions = {
            correct: {
                type: "angle",
                coords: [
                    [0, 0],
                    [1, 1],
                    [2, 2],
                ],
                match: "congruent",
            },
            graph: {type: "angle"},
            markings: "none",
            range: [
                [0, 10],
                [0, 10],
            ],
            showAxisArrows: {
                xMin: true,
                xMax: true,
                yMin: true,
                yMax: true,
            },
            showProtractor: false,
            step: [1, 1],
            lockedFigures: [],
        };

        const publicOptions = getInteractiveGraphPublicWidgetOptions(options);

        expect(publicOptions).toEqual({
            graph: {type: "angle"},
            markings: "none",
            range: [
                [0, 10],
                [0, 10],
            ],
            showAxisArrows: {
                xMin: true,
                xMax: true,
                yMin: true,
                yMax: true,
            },
            showProtractor: false,
            step: [1, 1],
            lockedFigures: [],
        });
    });
});
