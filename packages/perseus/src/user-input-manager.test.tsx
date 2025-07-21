import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import UserInputManager, {
    sharedInitializeUserInput,
} from "./user-input-manager";
import {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";

import type {
    InitializeUserInputCallback,
    RestoreUserInputFromSerializedStateCallback,
} from "./user-input-manager";
import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";
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
        "expression 1": {
            type: "expression",
            options: {
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "16+88i",
                    },
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: false,
            },
            version: {major: 1, minor: 0},
        },
    };
}

function generateExpressionSerializeState() {
    return {
        "expression 1": {
            keypadConfiguration: {
                keypadType: "EXPRESSION",
                times: false,
            },
            times: false,
            functions: [],
            buttonSets: [],
            analytics: {
                onAnalyticsEvent: expect.any(Function),
            },
            alignment: "default",
            static: false,
            showSolutions: "none",
            reviewModeRubric: null,
            reviewMode: false,
            isLastUsedWidget: false,
            linterContext: {
                contentType: "",
                highlightLint: false,
                paths: [],
                stack: ["question", "widget"],
            },
            value: "Hello world",
        },
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
                                handleUserInput("expression 1", "Hello world")
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
                                    handleUserInput("number-line 1", {
                                        numLinePosition: 0,
                                        rel: "lt",
                                        numDivisions: 10,
                                    })
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
                                    handleUserInput("group 1", {
                                        "number-line 1": {
                                            numLinePosition: 0,
                                            rel: "lt",
                                            numDivisions: 10,
                                        },
                                    })
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

    it("restores serialized State", async () => {
        let restoreCallback:
            | RestoreUserInputFromSerializedStateCallback
            | undefined;

        render(
            <UserInputManager
                widgets={generateExpressionWidgetsMap()}
                problemNum={0}
            >
                {({
                    userInput,
                    handleUserInput,
                    restoreUserInputFromSerializedState,
                }) => {
                    restoreCallback = restoreUserInputFromSerializedState;
                    return (
                        <>
                            <button
                                onClick={() =>
                                    handleUserInput(
                                        "expression 1",
                                        "Hello world",
                                    )
                                }
                            >
                                Click me
                            </button>
                            {/* this only works because Expression's UserInput is a string */}
                            <p>User input is: {userInput["expression 1"]}</p>
                        </>
                    );
                }}
            </UserInputManager>,
        );

        // Start with nothing
        expect(screen.queryByText(/Hello world/)).not.toBeInTheDocument();

        // Restore serialized state
        act(() =>
            restoreCallback?.(
                generateExpressionSerializeState(),
                generateExpressionWidgetsMap(),
            ),
        );
        expect(screen.getByText(/Hello world/)).toBeInTheDocument();
    });

    it("initializes static user input", async () => {
        const widgets: PerseusWidgetsMap = {
            "radio 1": {
                type: "radio",
                static: true,
                options: {
                    choices: [
                        {
                            content: "Correct",
                            correct: true,
                        },
                        {
                            content: "Incorrect",
                            correct: false,
                        },
                    ],
                },
            },
        };

        render(
            <UserInputManager widgets={widgets} problemNum={0}>
                {({userInput}) => {
                    return (
                        <>
                            <p>
                                User input is:{" "}
                                {userInput["radio 1"].choicesSelected.join(" ")}
                            </p>
                        </>
                    );
                }}
            </UserInputManager>,
        );

        expect(
            screen.getByText("User input is: true false"),
        ).toBeInTheDocument();
    });
});
