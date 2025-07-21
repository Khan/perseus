import {act} from "@testing-library/react";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./number-line-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

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
                isInequality: false,
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

describe("NumberLine AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const userInput: any = {
            numLinePosition: 5,
            numDivisions: 10,
        };

        const renderProps: any = {
            range: [0, 10],
            numDivisions: 10,
            snapDivisions: 2,
            userInput,
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "number-line",
            options: {
                range: [0, 10],
                snapDivisions: 2,
            },
            userInput: {
                numLinePosition: 5,
                numDivisions: 10,
            },
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const userInputPosition = -2.5;
        const [numberLine] = renderer.findWidgets("number-line 1");
        act(() => numberLine.movePosition(userInputPosition));

        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "$E=2.5$\n\n**Move the dot to $-E$ on the number line.**\n\n\n[[\u2603 number-line 1]]",
            widgets: {
                "number-line 1": {
                    type: "number-line",
                    options: {
                        range: [-4, 4],
                        snapDivisions: 2,
                    },
                    userInput: {
                        numLinePosition: -2.5,
                        numDivisions: 6,
                        rel: "eq",
                    },
                },
            },
        });
    });
});
