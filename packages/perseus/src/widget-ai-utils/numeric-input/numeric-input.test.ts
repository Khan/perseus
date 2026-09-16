import {
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies-data";
import {registerWidgets} from "../../widgets" /* widget-manifest import */;
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import {numericInputRegistration} from "../../widgets/numeric-input" /* widget-manifest import */;

import type {UserEvent} from "@testing-library/user-event";

// widget-manifest setup: start
function registerManifestWidgets(): void {
    registerWidgets([numericInputRegistration]);
}
registerManifestWidgets();
// widget-manifest setup: end
const question: PerseusRenderer = generateTestPerseusRenderer({
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [generateNumericInputAnswer({value: 1252})],
                labelText: "Input your answer here",
            }),
        }),
    },
});

describe("numeric input widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act;
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            "838",
        );

        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
            widgets: {
                "numeric-input 1": {
                    type: "numeric-input",
                    label: "Input your answer here",
                    userInput: {
                        value: "838",
                    },
                },
            },
        });
    });
});
