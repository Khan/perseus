import {scorePerseusItem} from "@khanacademy/perseus-score";
// eslint-disable-next-line testing-library/no-manual-cleanup
import {act, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {
    getFullGroupTestItem,
    getSplitGroupTestItem,
    question1,
} from "./group.testdata";

import type {UserEvent} from "@testing-library/user-event";

describe("group widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    describe("focus management", () => {
        it("should map focus event to onFocusChange", () => {
            // Arrange
            const onFocusChange = jest.fn();

            const {renderer} = renderQuestion(question1, {
                onFocusChange,
            });

            // Act
            act(() => renderer.focus());

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                ["group 2", "numeric-input 1"], // New focus
                null, // Old focus
            );
        });

        it("should map blur event to onFocusChange", async () => {
            // Arrange
            const onFocusChange = jest.fn();

            const {renderer} = renderQuestion(question1, {
                onFocusChange,
            });

            await userEvent.click(
                screen.getByRole("textbox", {
                    name: "value rounded to the nearest hundred",
                }),
            );

            // This flushes the onFocusChange call resulting from the focus()
            onFocusChange.mockClear();

            // Act
            act(() => renderer.blur());

            // Assert
            await waitFor(() =>
                expect(onFocusChange).toHaveBeenCalledWith(
                    null, // New focus
                    ["group 2", "numeric-input 2"], // Old focus
                ),
            );
        });

        it("should forward focusInputPath calls to Renderer", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            // focusPath() calls focusInputPath() on the focused widget
            act(() => renderer.focusPath(["group 2", "numeric-input 2"]));

            // Assert
            expect(screen.getAllByRole("textbox")[1]).toHaveFocus();
        });

        it("should forward blurInputPath calls to Renderer", async () => {
            // Arrange
            const {renderer} = renderQuestion(question1);
            const textbox = screen.getAllByRole("textbox")[1];

            await userEvent.click(textbox);

            // Act
            // blurPath() calls blurInputPath() on the focused widget
            act(() => renderer.blurPath(["group 2", "numeric-input 2"]));

            // Assert
            expect(textbox).not.toHaveFocus();
        });
    });

    it("should return contained renderer's getUserInput", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        await userEvent.type(screen.getAllByRole("textbox")[0], "99");

        // Act
        const userInput = renderer.getUserInputMap();

        // Assert
        expect(userInput).toEqual({
            "group 1": {
                "radio 1": {
                    selectedChoiceIds: [],
                },
            },
            "group 2": {
                "numeric-input 1": {
                    currentValue: "99",
                },
                "numeric-input 2": {
                    currentValue: "",
                },
            },
        });
    });

    it("should return contained renderer's getSerializedState", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        await userEvent.type(screen.getAllByRole("textbox")[0], "99");

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            "group 1": {
                "radio 1": {
                    alignment: "default",
                    choiceStates: [
                        {
                            correctnessShown: false,
                            highlighted: false,
                            previouslyAnswered: false,
                            rationaleShown: false,
                            readOnly: false,
                            selected: false,
                        },
                        {
                            correctnessShown: false,
                            highlighted: false,
                            previouslyAnswered: false,
                            rationaleShown: false,
                            readOnly: false,
                            selected: false,
                        },
                        {
                            correctnessShown: false,
                            highlighted: false,
                            previouslyAnswered: false,
                            rationaleShown: false,
                            readOnly: false,
                            selected: false,
                        },
                        {
                            correctnessShown: false,
                            highlighted: false,
                            previouslyAnswered: false,
                            rationaleShown: false,
                            readOnly: false,
                            selected: false,
                        },
                        {
                            correctnessShown: false,
                            highlighted: false,
                            previouslyAnswered: false,
                            rationaleShown: false,
                            readOnly: false,
                            selected: false,
                        },
                    ],
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "$45$",
                            correct: false,
                            originalIndex: 0,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "$42$",
                            correct: false,
                            originalIndex: 1,
                        },
                        {
                            id: "2-2-2-2-2",
                            content: "$30$",
                            correct: false,
                            originalIndex: 2,
                            rationale:
                                "Here's some rationale, this isn't the correct answer!",
                        },
                        {
                            id: "3-3-3-3-3",
                            content: "$18$",
                            correct: false,
                            originalIndex: 3,
                        },
                        {
                            id: "4-4-4-4-4",
                            content: "$15$",
                            correct: true,
                            originalIndex: 4,
                        },
                    ],
                    hasNoneOfTheAbove: false,
                    numCorrect: 1,
                },
            },
            "group 2": {
                "image 1": {
                    alt: "A number line labeled 200 to 300 with tick marks at every 5 units. The tick marks at 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, and 300 are labeled. A red circle labeled A is between 220 tick mark and 230 tick mark.",
                    backgroundImage: {
                        height: 80,
                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348",
                        width: 380,
                    },
                    box: [380, 80],
                    caption: "",
                    labels: [],
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    static: false,
                    title: "",
                },
                "numeric-input 1": {
                    alignment: "default",
                    answerForms: [],
                    coefficient: false,
                    currentValue: "99",
                    labelText: "value rounded to the nearest ten",
                    rightAlign: false,
                    size: "normal",
                    static: false,
                },
                "numeric-input 2": {
                    alignment: "default",
                    answerForms: [],
                    coefficient: false,
                    currentValue: "",
                    labelText: "value rounded to the nearest hundred",
                    rightAlign: false,
                    size: "normal",
                    static: false,
                },
            },
        });
    });

    it("should return score from contained Renderer", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        // Answer all widgets correctly
        await userEvent.click(screen.getByRole("button", {name: /(Choice E)/}));
        // Note(jeremy): If we don't tab away from the radio button in this
        // test, it seems like the userEvent typing doesn't land in the first
        // text field.
        await userEvent.tab();
        await userEvent.type(
            screen.getByRole("textbox", {name: /nearest ten/}),
            "230",
        );
        await userEvent.type(
            screen.getByRole("textbox", {name: /nearest hundred/}),
            "200",
        );

        const guess = renderer.getUserInputMap();
        const score = scorePerseusItem(question1, guess, "en");

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
        expect(score).toEqual({
            earned: 3,
            message: null,
            total: 3,
            type: "points",
        });
        expect(guess).toEqual({
            "group 1": {
                "radio 1": {
                    selectedChoiceIds: ["4-4-4-4-4"],
                },
            },
            "group 2": {
                "numeric-input 1": {
                    currentValue: "230",
                },
                "numeric-input 2": {
                    currentValue: "200",
                },
            },
        });
    });

    it("should return input paths from contained Renderer", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const paths = renderer.getInputPaths();

        // Assert
        expect(paths).toMatchInlineSnapshot(`
            [
              [
                "group 2",
                "numeric-input 1",
              ],
              [
                "group 2",
                "numeric-input 2",
              ],
            ]
        `);
    });

    it("handles answerless item data", () => {
        const itemData = getSplitGroupTestItem();

        expect(
            itemData.question.widgets["group 1"].options.widgets["dropdown 1"]
                .options.choices,
        ).toEqual([
            {
                content: "Incorrect",
            },
            {
                content: "Correct",
            },
        ]);
    });

    describe.each([
        ["answerless", getFullGroupTestItem()],
        ["answerful", getSplitGroupTestItem()],
    ])("given %s options", (_, {question}) => {
        it(`renders`, async () => {
            // Act
            renderQuestion(question);

            // Assert
            expect(
                screen.getByRole("combobox", {name: "Select an answer"}),
            ).toBeInTheDocument();
        });

        it(`is answerable`, async () => {
            // Act
            const {renderer} = renderQuestion(question);

            await userEvent.click(
                screen.getByRole("combobox", {name: "Select an answer"}),
            );
            await userEvent.click(
                screen.getByRole("option", {name: "Correct"}),
            );

            // Assert
            const userInput = renderer.getUserInputMap();
            expect(userInput).toEqual({
                "group 1": {
                    "dropdown 1": {
                        value: 2,
                    },
                },
            });
        });

        it(`can be scored as correct`, async () => {
            // Act
            const {renderer} = renderQuestion(question);

            await userEvent.click(
                screen.getByRole("combobox", {name: "Select an answer"}),
            );
            await userEvent.click(
                screen.getByRole("option", {name: "Correct"}),
            );

            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItemTesting(
                getFullGroupTestItem().question,
                userInput,
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it(`can be scored as incorrect`, async () => {
            // Act
            const {renderer} = renderQuestion(question);

            await userEvent.click(
                screen.getByRole("combobox", {name: "Select an answer"}),
            );
            await userEvent.click(
                screen.getByRole("option", {name: "Incorrect"}),
            );

            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItemTesting(
                getFullGroupTestItem().question,
                userInput,
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });

        it(`can be scored as invalid`, async () => {
            // Act
            const {renderer} = renderQuestion(question);

            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItemTesting(
                getFullGroupTestItem().question,
                userInput,
            );

            // Assert
            expect(score).toHaveInvalidInput();
        });
    });
});
