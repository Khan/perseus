import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import UserInputManager from "./user-input-manager";
import {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";

import type {
    InitializeUserInputCallback,
    RestoreUserInputFromSerializedStateCallback,
} from "./user-input-manager";
import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

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
        question: {
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
        },
        hints: [],
    };
}

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
            <UserInputManager
                widgets={generateExpressionWidgetsMap()}
                problemNum={0}
            >
                {({userInput, handleUserInput, initializeUserInput}) => {
                    initializeCallback = initializeUserInput;
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

        // Make sure we have user input state
        await userEvent.click(screen.getByRole("button", {name: "Click me"}));
        expect(screen.getByText(/Hello world/)).toBeInTheDocument();

        // Return to nothing
        act(() => initializeCallback?.(generateExpressionWidgetsMap(), 0));
        expect(screen.queryByText(/Hello world/)).not.toBeInTheDocument();
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

    // TODO
    it.skip("initializes static user input", () => {});
});
