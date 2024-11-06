import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";

const question: PerseusRenderer = {
    content: "**Graph $5x+3y=15$.**\n\n[[☃ grapher 1]]",
    images: {},
    widgets: {
        "grapher 1": {
            type: "grapher",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                correct: {
                    type: "linear",
                    coords: [
                        [0, 5],
                        [3, 0],
                    ],
                },
                availableTypes: ["linear"],
                graph: {
                    editableSettings: ["graph", "snap", "image"],
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    labels: ["x", "y"],
                    step: [1, 1],
                    gridStep: [1, 1],
                    snapStep: [1, 1],
                    valid: true,
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    rulerLabel: "",
                    rulerTicks: 10,
                    showTooltips: false,
                    showProtractor: false,
                    showRuler: false,
                },
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

describe("grapher widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "**Graph $5x+3y=15$.**\n\n[[☃ grapher 1]]",
            widgets: {
                "grapher 1": {
                    type: "grapher",
                    options: {
                        availableTypes: ["linear"],
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["x", "y"],
                        tickStep: [1, 1],
                        gridStep: [1, 1],
                        snapStep: [1, 1],
                        backgroundImageUrl: null,
                    },
                    userInput: {
                        type: "linear",
                        coords: null,
                    },
                },
            },
        });
    });
});
