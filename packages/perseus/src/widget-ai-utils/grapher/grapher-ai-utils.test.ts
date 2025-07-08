import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./grapher-ai-utils";

import type {
    PerseusGrapherUserInput,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

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

describe("Grapher AI utils", () => {
    it("it returns JSON with the expected format and fields for a linear graph", () => {
        const userInput: PerseusGrapherUserInput = {
            type: "linear",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const renderProps: any = {
            availableTypes: ["linear"],
            graph: {
                range: [0, 10, 0, 10],
                labels: ["x", "y"],
                step: 1,
                gridStep: 1,
                snapStep: 1,
                backgroundImage: {url: "http://khanaacademy.org/image.jpg"},
            },
            userInput,
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "grapher",
            options: {
                availableTypes: ["linear"],
                range: [0, 10, 0, 10],
                labels: ["x", "y"],
                tickStep: 1,
                gridStep: 1,
                snapStep: 1,
                backgroundImageUrl: "http://khanaacademy.org/image.jpg",
            },
            userInput: {
                type: "linear",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        });
    });

    it('it returns JSON with the expected format and fields for a "logarithm" graph', () => {
        const userInput: any = {
            type: "logarithm",
            coords: [
                [0, 0],
                [1, 1],
            ],
            asymptote: [-1, 4],
        };

        const renderProps: any = {
            availableTypes: ["lograithm"],
            graph: {
                range: [0, 10, 0, 10],
                labels: ["x", "y"],
                step: 1,
                gridStep: 1,
                snapStep: 1,
                backgroundImage: {url: ""},
            },
            userInput,
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "grapher",
            options: {
                availableTypes: ["lograithm"],
                range: [0, 10, 0, 10],
                labels: ["x", "y"],
                tickStep: 1,
                gridStep: 1,
                snapStep: 1,
                backgroundImageUrl: "",
            },
            userInput: {
                type: "logarithm",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
                asymptote: [-1, 4],
            },
        });
    });

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
