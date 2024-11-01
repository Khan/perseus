import {act} from "@testing-library/react";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {NumberLinePromptJSON} from "./prompt-utils";
import type {PerseusRenderer} from "../../perseus-types";

export const question: PerseusRenderer = {
    content:
        "$E=2.5$\n\n**Move the dot to $-E$ on the number line.**\n\n\n[[\u2603 number-line 1]]",
    images: {},
    widgets: {
        "number-line 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "number-line",
            options: {
                labelRange: [null, null],
                initialX: null,
                tickStep: 1,
                labelStyle: "decimal",
                labelTicks: true,
                snapDivisions: 2,
                range: [-4, 4],
                static: false,
                correctRel: "eq",
                numDivisions: 6,
                divisionRange: [1, 10],
                correctX: -2.5,
            },
            alignment: "default",
        },
    },
};

describe("number-line widget", () => {
    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);
        const widget = renderer.getWidgetInstance("number-line 1");
        const questionOptions = question.widgets["number-line 1"].options;

        // Act
        const userInputPosition = -2.5;
        const [numberLine] = renderer.findWidgets("number-line 1");
        act(() => numberLine.movePosition(userInputPosition));

        const json = widget?.getPromptJSON?.() as NumberLinePromptJSON;

        // Assert
        expect(json).toEqual({
            type: "number-line",
            options: {
                range: questionOptions.range,
                numDivisions: questionOptions.numDivisions,
                snapDivisions: questionOptions.snapDivisions,
            },
            userInput: {
                numLinePosition: userInputPosition,
                numDivisions: questionOptions.numDivisions,
            },
        });
    });
});
