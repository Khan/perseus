import {
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
    generateRadioWidget,
    type PerseusWidgetsMap,
    type UserInputMap,
} from "@khanacademy/perseus-core";
import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import UserInputManager, {
    sharedInitializeUserInput,
} from "./user-input-manager";
import {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";

import type {InitializeUserInputCallback} from "./user-input-manager";
import type {UserEvent} from "@testing-library/user-event";

function generateNumberLineMap(): PerseusWidgetsMap {
    return {
        "number-line 1": {
            type: "number-line",
            options: {
                isInequality: true,
                labelRange: [null, null],
                initialX: null,
                tickStep: 1,
                labelStyle: "decimal",
                labelTicks: true,
                snapDivisions: 2,
                range: [-4, 4],
                static: false,
                correctRel: "eq",
                numDivisions: null,
                divisionRange: [1, 10],
                correctX: -2.5,
                isTickCtrl: false,
            },
        },
    };
}

function generateGroupedNumberLineMap(): PerseusWidgetsMap {
    return {
        "group 1": {
            type: "group",
            options: {
                content: "[[☃ number-line 1]]",
                widgets: generateNumberLineMap(),
                images: {},
            },
        },
    };
}

function generateExpressionWidgetsMap(): PerseusWidgetsMap {
    return {
        "expression 1": generateExpressionWidget({
            options: generateExpressionOptions({
                answerForms: [
                    generateExpressionAnswerForm({
                        considered: "correct",
                        form: true,
                        value: "16+88i",
                    }),
                ],
            }),
        }),
    };
}

describe("sharedInitializeUserInput", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    it("initializes a number line", () => {
        expect(sharedInitializeUserInput(generateNumberLineMap(), 0)).toEqual({
            "number-line 1": {
                numDivisions: 8,
                // number line initial state is the bottom of the range: -4 here
                numLinePosition: -4,
                rel: "ge",
            },
        });
    });

    it("initializes a number line in a group", () => {
        expect(
            sharedInitializeUserInput(generateGroupedNumberLineMap(), 0),
        ).toEqual({
            "group 1": {
                "number-line 1": {
                    numDivisions: 8,
                    // number line initial state is the bottom of the range: -4 here
                    numLinePosition: -4,
                    rel: "ge",
                },
            },
        });
    });

    /**
     * Regression LEMS-3321: this is a safety net if for some reason
     * a PerseusRenderer doesn't happen to have `widgets` which is a
     * bug we ran into.
     */
    it("handles undefined widget options", () => {
        expect(sharedInitializeUserInput(undefined, 0)).toEqual({});
    });
});

describe("UserInputManager", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders", () => {
        render(
            <UserInputManager
                widgets={generateExpressionWidgetsMap()}
                problemNum={0}
            >
                {() => <p>Hello world</p>}
            </UserInputManager>,
        );

        expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("updates user input", async () => {
        render(
            <UserInputManager
                widgets={generateExpressionWidgetsMap()}
                problemNum={0}
            >
                {({userInput, handleUserInput}) => (
                    <>
                        <button
                            onClick={() =>
                                handleUserInput(
                                    "expression 1",
                                    "Hello world",
                                    false,
                                )
                            }
                        >
                            Click me
                        </button>
                        {/* this only works because Expression's UserInput is a string */}
                        <p>User input is: {userInput["expression 1"]}</p>
                    </>
                )}
            </UserInputManager>,
        );

        expect(screen.queryByText(/Hello world/)).not.toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", {name: "Click me"}));
        expect(screen.getByText(/Hello world/)).toBeInTheDocument();
    });

    it("initializes user input", async () => {
        let initializeCallback: InitializeUserInputCallback | undefined;

        render(
            <UserInputManager widgets={generateNumberLineMap()} problemNum={0}>
                {({userInput, handleUserInput, initializeUserInput}) => {
                    initializeCallback = initializeUserInput;
                    return (
                        <>
                            <button
                                onClick={() =>
                                    handleUserInput(
                                        "number-line 1",
                                        {
                                            numLinePosition: 0,
                                            rel: "lt",
                                            numDivisions: 10,
                                        },
                                        false,
                                    )
                                }
                            >
                                Click me
                            </button>
                            <p>
                                User input is:{" "}
                                {userInput["number-line 1"].numLinePosition}
                            </p>
                        </>
                    );
                }}
            </UserInputManager>,
        );

        // Start with nothing
        // number line initial state is the bottom of the range: -4 here
        expect(screen.getByText("User input is: -4")).toBeInTheDocument();

        // Make sure we have user input state
        await userEvent.click(screen.getByRole("button", {name: "Click me"}));
        expect(screen.getByText("User input is: 0")).toBeInTheDocument();

        // Return to nothing
        act(() => initializeCallback?.(generateNumberLineMap(), 0));
        expect(screen.getByText("User input is: -4")).toBeInTheDocument();
    });

    it("initializes user input in groups", async () => {
        let initializeCallback: InitializeUserInputCallback | undefined;

        render(
            <UserInputManager
                widgets={generateGroupedNumberLineMap()}
                problemNum={0}
            >
                {({userInput, handleUserInput, initializeUserInput}) => {
                    initializeCallback = initializeUserInput;
                    return (
                        <>
                            <button
                                onClick={() =>
                                    handleUserInput(
                                        "group 1",
                                        {
                                            "number-line 1": {
                                                numLinePosition: 0,
                                                rel: "lt",
                                                numDivisions: 10,
                                            },
                                        },
                                        false,
                                    )
                                }
                            >
                                Click me
                            </button>
                            <p>
                                User input is:{" "}
                                {
                                    userInput["group 1"]["number-line 1"]
                                        .numLinePosition
                                }
                            </p>
                        </>
                    );
                }}
            </UserInputManager>,
        );

        // Start with nothing
        // number line initial state is the bottom of the range: -4 here
        expect(screen.getByText("User input is: -4")).toBeInTheDocument();

        // Make sure we have user input state
        await userEvent.click(screen.getByRole("button", {name: "Click me"}));
        expect(screen.getByText("User input is: 0")).toBeInTheDocument();

        // Return to nothing
        act(() => initializeCallback?.(generateGroupedNumberLineMap(), 0));
        expect(screen.getByText("User input is: -4")).toBeInTheDocument();
    });

    it("initializes static user input", async () => {
        const renderSpy = jest.fn();
        const widgets: PerseusWidgetsMap = {
            "radio 1": generateRadioWidget({
                static: true,
                options: {
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "Correct",
                            correct: true,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "Incorrect",
                            correct: false,
                        },
                    ],
                },
            }),
        };

        render(
            <UserInputManager widgets={widgets} problemNum={0}>
                {({userInput}) => renderSpy(userInput)}
            </UserInputManager>,
        );

        expect(renderSpy).toHaveBeenCalledWith({
            "radio 1": {
                selectedChoiceIds: ["0-0-0-0-0"],
            },
        });
    });

    it("accepts an initial user input", async () => {
        const renderSpy = jest.fn();

        const widgets: PerseusWidgetsMap = {
            "radio 1": generateRadioWidget({
                static: false,
                options: {
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "Correct",
                            correct: true,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "Incorrect",
                            correct: false,
                        },
                    ],
                },
            }),
        };

        const initialUserInput: UserInputMap = {
            "radio 1": {
                selectedChoiceIds: ["0-0-0-0-0"],
            },
        };

        render(
            <UserInputManager
                widgets={widgets}
                problemNum={0}
                initialUserInput={initialUserInput}
            >
                {({userInput}) => renderSpy(userInput)}
            </UserInputManager>,
        );

        expect(renderSpy).toHaveBeenCalledWith({
            "radio 1": {
                selectedChoiceIds: ["0-0-0-0-0"],
            },
        });
    });

    it("allows initial user input to be changed", async () => {
        const widgets: PerseusWidgetsMap = {
            "radio 1": generateRadioWidget({
                static: false,
                options: {
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "Correct",
                            correct: true,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "Incorrect",
                            correct: false,
                        },
                    ],
                },
            }),
        };

        const initialUserInput: UserInputMap = {
            "radio 1": {
                selectedChoiceIds: ["0-0-0-0-0"],
            },
        };

        render(
            <UserInputManager
                widgets={widgets}
                problemNum={0}
                initialUserInput={initialUserInput}
            >
                {({userInput, handleUserInput}) => {
                    return (
                        <>
                            <p>
                                User input is:{" "}
                                {userInput["radio 1"].selectedChoiceIds.join(
                                    " ",
                                )}
                            </p>
                            <button
                                onClick={() =>
                                    handleUserInput(
                                        "radio 1",
                                        {
                                            selectedChoiceIds: ["1-1-1-1-1"],
                                        },
                                        false,
                                    )
                                }
                            >
                                Click me
                            </button>
                        </>
                    );
                }}
            </UserInputManager>,
        );

        expect(
            screen.getByText("User input is: 0-0-0-0-0"),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", {name: "Click me"}));
        expect(
            screen.getByText("User input is: 1-1-1-1-1"),
        ).toBeInTheDocument();
    });
});
