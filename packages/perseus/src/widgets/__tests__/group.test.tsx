import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {cleanup, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

// TODO(FEI-3857): Include in jest setup so that we don't need to import it everywhere
import "@testing-library/jest-dom/extend-expect";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import * as Perseus from "../../index";
import {traverse} from "../../traversal";
import {question1} from "../__testdata__/group.testdata";

import {renderQuestion} from "./renderQuestion";

describe("group widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should render annotations if groupAnnotator provided", () => {
        // Arrange
        const groupAnnotator = jest.fn().mockImplementation((...args) => {
            return (
                <div data-widget-id={args[1]}>{`Group Widget: ${args[1]}`}</div>
            );
        });

        // Act
        renderQuestion(question1, {
            groupAnnotator,
        });

        // Assert
        // Annotations should be in the DOM
        const annotations = screen.getAllByText(/Group Widget:/);
        expect(annotations).toHaveLength(2);
        expect(annotations[0]).toHaveTextContent("Group Widget: group 1");
        expect(annotations[1]).toHaveTextContent("Group Widget: group 2");
    });

    describe("focus management", () => {
        it("should map focus event to onFocusChange", () => {
            // Arrange
            const onFocusChange = jest.fn();

            const {renderer} = renderQuestion(question1, {
                onFocusChange,
            });

            // Act
            renderer.focus();
            jest.runOnlyPendingTimers();

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                ["group 1", "radio 1"], // New focus
                null, // Old focus
            );
        });

        it("should map blur event to onFocusChange", () => {
            // Arrange
            const onFocusChange = jest.fn();

            const {renderer} = renderQuestion(question1, {
                onFocusChange,
            });

            screen.getAllByRole("textbox")[1].focus();

            // This flushes the onFocusChange call resulting from the focus()
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            onFocusChange.mockClear();

            // Act
            renderer.blur();
            // There's two levels of <Renderer /> here (our main one and one inside
            // the group widget) so we have to wait twice for all the focus
            // management timers to resolve.
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                null, // New focus
                ["group 2", "numeric-input 2"], // Old focus
            );
        });

        it("should forward focusInputPath calls to Renderer", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            // focusPath() calls focusInputPath() on the focused widget
            renderer.focusPath(["group 2", "numeric-input 2"]);

            // Assert
            expect(screen.getAllByRole("textbox")[1]).toHaveFocus();
        });

        it("should forward blurInputPath calls to Renderer", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);
            const textbox = screen.getAllByRole("textbox")[1];

            textbox.focus();
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();

            // Act
            // blurPath() calls blurInputPath() on the focused widget
            renderer.blurPath(["group 2", "numeric-input 2"]);

            // Assert
            expect(textbox).not.toHaveFocus();
        });
    });

    it("should call onInteractWithWidget when internal widget interacted with", () => {
        // Arrange
        const onInteractWithWidget = jest.fn();

        render(
            <RenderStateRoot>
                <Perseus.Renderer
                    content={question1.content}
                    images={question1.images}
                    widgets={question1.widgets}
                    problemNum={0}
                    reviewMode={false}
                    onInteractWithWidget={onInteractWithWidget}
                />
            </RenderStateRoot>,
        );

        // Act
        userEvent.type(screen.getAllByRole("textbox")[0], "99");
        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();

        // Assert
        // NOTE: The numeric-input that we typed into is in the second group.
        expect(onInteractWithWidget).toHaveBeenCalledWith("group 2");
    });

    it("should return contained renderer's getUserInput", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        userEvent.type(screen.getAllByRole("textbox")[0], "99");

        // Act
        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toMatchInlineSnapshot(`
            [
              [
                {
                  "choicesSelected": [
                    false,
                    false,
                    false,
                    false,
                    false,
                  ],
                },
              ],
              [
                {
                  "currentValue": "99",
                },
                {
                  "currentValue": "",
                },
                null,
              ],
            ]
        `);
    });

    it("should return contained renderer's getSerializedState", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        userEvent.type(screen.getAllByRole("textbox")[0], "99");

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toMatchInlineSnapshot(`
            {
              "group 1": {
                "radio 1": {
                  "choices": [
                    {
                      "content": "$45$",
                      "correct": false,
                      "originalIndex": 0,
                    },
                    {
                      "content": "$42$",
                      "correct": false,
                      "originalIndex": 1,
                    },
                    {
                      "clue": "Here's a clue, this isn't the correct answer!",
                      "content": "$30$",
                      "correct": false,
                      "originalIndex": 2,
                    },
                    {
                      "content": "$18$",
                      "correct": false,
                      "originalIndex": 3,
                    },
                    {
                      "content": "$15$",
                      "correct": true,
                      "originalIndex": 4,
                    },
                  ],
                  "countChoices": undefined,
                  "deselectEnabled": undefined,
                  "hasNoneOfTheAbove": false,
                  "multipleSelect": false,
                  "numCorrect": 1,
                  "selectedChoices": [
                    false,
                    false,
                    false,
                    false,
                    true,
                  ],
                },
              },
              "group 2": {
                "image 1": {
                  "alt": "A number line labeled 200 to 300 with tick marks at every 5 units. The tick marks at 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, and 300 are labeled. A red circle labeled A is between 220 tick mark and 230 tick mark.",
                  "backgroundImage": {
                    "height": 80,
                    "url": "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348",
                    "width": 380,
                  },
                  "box": [
                    380,
                    80,
                  ],
                  "caption": "",
                  "labels": [],
                  "range": [
                    [
                      0,
                      10,
                    ],
                    [
                      0,
                      10,
                    ],
                  ],
                  "static": false,
                  "title": "",
                },
                "numeric-input 1": {
                  "answerForms": [],
                  "coefficient": false,
                  "currentValue": "99",
                  "labelText": "value rounded to the nearest ten",
                  "rightAlign": false,
                  "size": "normal",
                  "static": false,
                },
                "numeric-input 2": {
                  "answerForms": [],
                  "coefficient": false,
                  "labelText": "value rounded to the nearest hundred",
                  "rightAlign": false,
                  "size": "normal",
                  "static": false,
                },
              },
              "radio 1": {
                "choices": [
                  {
                    "content": "",
                    "correct": false,
                    "originalIndex": 0,
                  },
                  {
                    "content": "",
                    "correct": false,
                    "originalIndex": 1,
                  },
                  {
                    "content": "",
                    "correct": false,
                    "originalIndex": 2,
                  },
                  {
                    "content": "",
                    "correct": false,
                    "originalIndex": 3,
                  },
                  {
                    "content": "",
                    "correct": true,
                    "originalIndex": 4,
                  },
                ],
                "countChoices": undefined,
                "deselectEnabled": undefined,
                "hasNoneOfTheAbove": false,
                "multipleSelect": false,
                "numCorrect": 1,
                "selectedChoices": [
                  false,
                  false,
                  false,
                  false,
                  true,
                ],
              },
            }
        `);
    });

    it("should be able to restore serialized state", () => {
        // This test checks the state restoration by serializing state with one
        // renderer and then restore it to a different one.

        // Arrange
        const {renderer} = renderQuestion(question1);
        userEvent.click(screen.getAllByRole("radio")[4]);
        userEvent.type(screen.getAllByRole("textbox")[0], "1000");
        userEvent.type(screen.getAllByRole("textbox")[1], "9999");

        const state = renderer.getSerializedState();
        cleanup(); // Resets the DOM

        const {renderer: renderer1} = renderQuestion(question1);

        // Act
        renderer1.restoreSerializedState(state);

        // Assert
        expect(screen.getAllByRole("radio")[4]).toBeChecked();
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("1000");
        expect(screen.getAllByRole("textbox")[1]).toHaveValue("9999");
    });

    it("should return score from contained Renderer", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        // Answer all widgets correctly
        userEvent.click(screen.getAllByRole("radio")[4]);
        userEvent.type(screen.getAllByRole("textbox")[0], "230");
        userEvent.type(screen.getAllByRole("textbox")[1], "200");

        const guessAndScore = renderer.guessAndScore();

        // Assert
        expect(guessAndScore).toMatchInlineSnapshot(`
            [
              [
                [
                  {
                    "choicesSelected": [
                      false,
                      false,
                      false,
                      false,
                      true,
                    ],
                    "countChoices": false,
                    "noneOfTheAboveIndex": null,
                    "noneOfTheAboveSelected": false,
                    "numCorrect": 1,
                  },
                ],
                [
                  {
                    "currentValue": "230",
                  },
                  {
                    "currentValue": "200",
                  },
                  null,
                ],
              ],
              {
                "earned": 3,
                "message": null,
                "total": 3,
                "type": "points",
              },
            ]
        `);
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

    it("should set value and call callback for input path", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        const cb = jest.fn();

        // Act
        renderer.setInputValue(["group 2", "numeric-input 2"], "2021", cb);
        jest.runOnlyPendingTimers(); // callback occurs after the next render

        // Assert
        expect(screen.getAllByRole("textbox")[1]).toHaveValue("2021");
        expect(cb).toHaveBeenCalled();
    });

    it("should show rationales for contained widgets", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);
        userEvent.click(screen.getAllByRole("radio")[2]); // Incorrect!

        // Act
        renderer.showRationalesForCurrentlySelectedChoices();

        // Assert
        expect(
            screen.getByText("Here's a clue, this isn't the correct answer!"),
        ).toBeInTheDocument();
    });

    describe("traverseChildWidgets", () => {
        it("should call the contentCallback for each top-level piece of content", () => {
            // Arrange
            const contentCallback = jest.fn();

            // Act
            traverse(question1, contentCallback);

            // Assert
            // This callback does not get deep traversal!
            expect(contentCallback).toHaveBeenCalledTimes(3);
        });

        it("should call the widgetCallback for every widget anywhere in the tree", () => {
            // Arrange
            const widgetIds = [];
            const widgetCallback = (_: any, widgetId: string) =>
                // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'never'.
                widgetIds.push(widgetId);

            // Act
            traverse(question1, null, widgetCallback);

            // Assert
            expect(widgetIds).toEqual([
                "radio 1",
                "group 1",
                "image 1",
                "numeric-input 1",
                "numeric-input 2",
                "group 2",
                "radio 1",
            ]);
        });

        it("should call the optionsCallback for each top-level widget options", () => {
            // Arrange
            const optionsCallback = jest.fn();

            // Act
            traverse(question1, null, null, optionsCallback);

            // Assert
            // This callback does not get deep traversal!
            expect(optionsCallback).toHaveBeenCalledTimes(3);
        });
    });
});
