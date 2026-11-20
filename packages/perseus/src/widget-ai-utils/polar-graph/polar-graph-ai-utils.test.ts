import {
    generatePolarGraphLimaconGraph,
    generatePolarGraphLockedFigure,
    generatePolarGraphOptions,
    generatePolarGraphPointGraph,
    getPolarGraphPublicWidgetOptions,
} from "@khanacademy/perseus-core";

import {getPromptJSON} from "./polar-graph-ai-utils";

describe("getPromptJSON", () => {
    it("names each point in both cartesian and polar form", () => {
        // Arrange
        const options = getPolarGraphPublicWidgetOptions(
            generatePolarGraphOptions({
                angleUnit: "radians",
                graph: generatePolarGraphPointGraph({numPoints: 1}),
            }),
        );

        // Act
        const json = getPromptJSON(options, {type: "point", coords: [[0, 2]]});

        // Assert
        expect(json).toEqual({
            type: "polar-graph",
            options: {
                maxRadius: 5,
                radiusStep: 1,
                angleStepDegrees: 15,
                angleUnit: "radians",
                graph: {type: "point", numPoints: 1},
                lockedFigures: [],
                lockedLabels: [],
            },
            userInput: {
                type: "point",
                points: [{x: 0, y: 2, r: 2, thetaDegrees: 90}],
            },
        });
    });

    it("reports no points before the learner has interacted", () => {
        // Arrange
        const options = getPolarGraphPublicWidgetOptions(
            generatePolarGraphOptions(),
        );

        // Act
        const json = getPromptJSON(options, undefined);

        // Assert
        expect(json.userInput.points).toEqual([]);
    });
});

describe("getPromptJSON locked figures", () => {
    it("describes each locked figure with its equation", () => {
        // Arrange
        const options = getPolarGraphPublicWidgetOptions(
            generatePolarGraphOptions({
                lockedFigures: [
                    generatePolarGraphLockedFigure(
                        generatePolarGraphLimaconGraph({
                            coords: [
                                [4, 0],
                                [0, 0],
                            ],
                        }),
                    ),
                ],
            }),
        );

        // Act
        const json = getPromptJSON(options, undefined);

        // Assert
        expect(json.options.lockedFigures).toEqual([
            {
                type: "limacon",
                points: [
                    {x: 4, y: 0, r: 4, thetaDegrees: 0},
                    {x: 0, y: 0, r: 0, thetaDegrees: 0},
                ],
                equation: {
                    form: "r = a + b cos(theta - phi)",
                    a: 2,
                    b: 2,
                    phiDegrees: 0,
                },
                labels: [],
            },
        ]);
    });
});
