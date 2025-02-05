import getInteractiveGraphPublicWidgetOptions from "./interactive-graph-util";

import type {PerseusInteractiveGraphWidgetOptions} from "@khanacademy/perseus-core";

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
            showProtractor: false,
            step: [1, 1],
        };

        const publicOptions = getInteractiveGraphPublicWidgetOptions(options);

        expect(publicOptions).toEqual({
            graph: {type: "angle"},
            markings: "none",
            range: [
                [0, 10],
                [0, 10],
            ],
            showProtractor: false,
            step: [1, 1],
        });
    });
});
