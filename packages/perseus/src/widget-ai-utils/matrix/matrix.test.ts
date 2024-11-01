import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {MatrixPromptJSON} from "./prompt-utils";
import type {PerseusRenderer} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

const question: PerseusRenderer = {
    content:
        "**Perform the row operation, $R_3 \\leftrightarrow R_2$, on the following matrix.**\n\n$\\left[\\begin{array} {ccc}\n5 & -2 & 1 & 1 \\\\\n3 & 0 & 0 & -2 \\\\\n1 & 1 & 7 & -3 \\end{array} \\right] $\n\n[[\u2603 matrix 1]]\n",
    images: {},
    widgets: {
        "matrix 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "matrix",
            options: {
                cursorPosition: [0, 0],
                suffix: "",
                answers: [
                    [5, -2, 1, 1],
                    [1, 1, 7, -3],
                    [3, 0, 0, -2],
                ],
                prefix: "",
                static: false,
                matrixBoardSize: [3, 4],
            },
            alignment: "default",
        },
    },
};

describe("matrix widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("Should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);
        const widget = renderer.getWidgetInstance("matrix 1");

        // Act
        const row1 = ["1", "2", "3", "4"];
        const row2 = ["5", "6", "7", "8"];
        const row3 = ["9", "10", "11", "12"];
        const userInput = [...row1, ...row2, ...row3];

        const textboxes = await screen.findAllByRole("textbox");
        for (let i = 0; i < textboxes.length; i++) {
            await userEvent.type(textboxes[i], userInput[i]);
        }

        const json = widget?.getPromptJSON?.() as MatrixPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "matrix",
            options: {
                width: 4,
                height: 3,
            },
            userInput: {
                answerRows: [row1, row2, row3],
            },
        });
    });
});
