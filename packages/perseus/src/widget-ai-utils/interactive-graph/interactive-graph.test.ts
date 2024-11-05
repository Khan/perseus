import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import {
    angleQuestion,
    circleQuestion,
    linearQuestion,
    linearSystemQuestion,
    pointQuestion,
    polygonQuestion,
    quadraticQuestion,
    rayQuestion,
    segmentQuestion,
    sinusoidQuestion,
} from "../../widgets/interactive-graphs/interactive-graph.testdata";
import {trueForAllMafsSupportedGraphTypes} from "../../widgets/interactive-graphs/mafs-supported-graph-types";

import type {InteractiveGraphPromptJSON} from "./prompt-utils";
import type {UserEvent} from "@testing-library/user-event";

const apiOptions = {
    flags: {mafs: trueForAllMafsSupportedGraphTypes},
};

describe("interactive-graph widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should get prompt JSON for an angle graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(angleQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            angleQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "angle",
                    angleOffsetDegrees: 1,
                    startCoords: undefined,
                },
                backgroundImageUrl: questionOptions.backgroundImage?.url,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [6.998933866094739, 0.12216684506098452],
                    [0, 0],
                    [6.535062985480412, 2.5085756468171017],
                ],
                angleOffsetDegrees: 1,
            },
        });
    });

    it("should get prompt JSON for a circle graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(circleQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            circleQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "circle",
                    startParams: {
                        center: [0, 0],
                        radius: 2,
                    },
                },
                backgroundImageUrl: null,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                center: [0, 0],
                radius: 2,
            },
        });
    });

    it("should get prompt JSON for a linear graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(linearQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            linearQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "linear",
                    startCoords: undefined,
                },
                backgroundImageUrl: null,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [-5, 5],
                    [5, 5],
                ],
            },
        });
    });

    it("should get prompt JSON for a linear system graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(linearSystemQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            linearSystemQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "linear-system",
                    startCoords: undefined,
                },
                backgroundImageUrl: null,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [
                        [-5, 5],
                        [5, 5],
                    ],
                    [
                        [-5, -5],
                        [5, -5],
                    ],
                ],
            },
        });
    });

    it("should get prompt JSON for a point graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(pointQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            pointQuestion.widgets["interactive-graph 1"].options;

        // Act
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "point",
                    numPoints: "unlimited",
                },
                backgroundImageUrl: questionOptions.backgroundImage?.url,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [],
            },
        });
    });

    it("should get prompt JSON for a polygon graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(polygonQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            polygonQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "polygon",
                    match: undefined,
                    numSides: 3,
                    startCoords: undefined,
                },
                backgroundImageUrl: null,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [3.5, 2],
                    [2.5, 4],
                    [1.5, 2],
                ],
            },
        });
    });

    it("should get prompt JSON for a quadratic graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(quadraticQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            quadraticQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "quadratic",
                    startCoords: undefined,
                },
                backgroundImageUrl: null,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [-5, 5],
                    [0, -5],
                    [5, 5],
                ],
            },
        });
    });

    it("should get prompt JSON for a ray graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(rayQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            rayQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "ray",
                    startCoords: undefined,
                },
                backgroundImageUrl: null,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [-5, 5],
                    [5, 5],
                ],
            },
        });
    });

    it("should get prompt JSON for a segment graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(segmentQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            segmentQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "segment",
                    numSegments: 1,
                    startCoords: undefined,
                },
                backgroundImageUrl: null,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [
                        [-5, 5],
                        [5, 5],
                    ],
                ],
            },
        });
    });

    it("should get prompt JSON for a sinusoid graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(sinusoidQuestion, apiOptions);
        const widget = renderer.getWidgetInstance("interactive-graph 1");
        const questionOptions =
            sinusoidQuestion.widgets["interactive-graph 1"].options;

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = widget?.getPromptJSON?.() as InteractiveGraphPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "sinusoid",
                    startCoords: undefined,
                },
                backgroundImageUrl: questionOptions.backgroundImage?.url,
                range: questionOptions.range,
                labels: questionOptions.labels,
            },
            userInput: {
                coords: [
                    [0, 0],
                    [3, 2],
                ],
            },
        });
    });
});
