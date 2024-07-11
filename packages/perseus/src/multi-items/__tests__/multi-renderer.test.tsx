import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import MockWidgetExport from "../../__tests__/mock-widget";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {registerWidget} from "../../widgets";
import {
    mockedQuestion1,
    question1,
    simpleQuestionShape,
} from "../__testdata__/multi-renderer.testdata";
import MultiRenderer from "../multi-renderer";
import shapes from "../shapes";

import type {Widget} from "../../renderer";
import type {FilterCriterion} from "../../types";
import type {Item} from "../item-types";
import type {Tree} from "../tree-types";

// A little helper used in the render callback of a MultiRenderer.
type Props = {renderers: any};
const SimpleLayout = ({renderers}: Props): React.ReactElement => {
    if (renderers == null) {
        throw new Error("renderers was null");
    }

    const {blurb, question, hints} = renderers;
    return (
        <div>
            <div id="blurb">{blurb}</div>
            <div id="question">{question}</div>
            <div id="hints">{hints?.firstN(1)}</div>
        </div>
    );
};

// Note that the `question` passed in _must_ be of the simpleQuestionShape
// shape.
const renderSimpleQuestion = (question: Item) => {
    // Arrange
    let renderer: MultiRenderer | null | undefined = null;
    const result = render(
        <RenderStateRoot>
            <MultiRenderer
                item={question}
                shape={simpleQuestionShape}
                ref={(r) => (renderer = r)}
                dependencies={testDependenciesV2}
            >
                {({renderers}) => <SimpleLayout renderers={renderers} />}
            </MultiRenderer>
        </RenderStateRoot>,
    );
    if (renderer == null) {
        throw new Error("Rendering failed.");
    }

    return {
        ...result,
        renderer,
    };
};

// A test helper to find widgets in a MultiRenderer.
const _findWidgets = (
    renderer: MultiRenderer,
    filterCriterion: FilterCriterion,
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
): Tree<
    ReadonlyArray<Widget | null | undefined>,
    ReadonlyArray<Widget | null | undefined>,
    null
> => {
    return renderer._mapRenderers((data) => {
        if (data.ref == null) {
            return [];
        }

        // Note we use findInternalWidgets() here instead of
        // _findWidgets(). Otherwise we get the same widget appearing in
        // multiple places in the result tree.
        return data.ref.findInternalWidgets(filterCriterion);
    });
};

describe("multi-item renderer", () => {
    beforeAll(() => {
        registerWidget("mock-widget", MockWidgetExport);
    });

    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        registerAllWidgetsForTesting();
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderSimpleQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should render the error if one occurs (item doesn't match shape)", () => {
        // Arrange
        // We mock out `console.error` because the we're explicitly
        // triggering and error, but we don't want that to fail the test.
        jest.spyOn(console, "error").mockImplementation(() => {});

        // Act
        render(
            <RenderStateRoot>
                <MultiRenderer
                    item={question1}
                    shape={shapes.shape({broken: shapes.content})}
                    dependencies={testDependenciesV2}
                >
                    {({renderers}) => {
                        return <div />;
                    }}
                </MultiRenderer>
            </RenderStateRoot>,
        );

        // Assert
        expect(screen.getByText(/Error rendering:/)).toBeInTheDocument();
    });

    describe("state serialization", () => {
        it("should return serialized state from all items", async () => {
            // Arrange
            const {renderer} = renderSimpleQuestion(question1);

            // Nudge the widget to a non-default state (ie. an item is
            // selected, a value is entered). You can see the result of this in the `choiceStates`
            // array in the captured state below where the choice at index 2 has
            // `"selected": true` (instead of false) and the input-number has a `currentValue`.
            await userEvent.click(screen.getAllByRole("radio")[2]); // Correct
            await userEvent.type(screen.getByRole("textbox"), "+42"); // Correct

            // Act
            // @ts-expect-error - TS2339 - Property '_getSerializedState' does not exist on type 'never'.
            const state = renderer._getSerializedState(null);

            // Assert
            expect(state).toMatchInlineSnapshot(`
                {
                  "blurb": {},
                  "hints": [
                    null,
                    null,
                    null,
                  ],
                  "question": {
                    "input-number 1": {
                      "answerType": "number",
                      "currentValue": "+42",
                      "rightAlign": undefined,
                      "simplify": "required",
                      "size": "normal",
                    },
                    "radio 1": {
                      "choiceStates": [
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": false,
                        },
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": false,
                        },
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": true,
                        },
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": false,
                        },
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": false,
                        },
                      ],
                      "choices": [
                        {
                          "clue": "Congruent triangles have the same side lengths.",
                          "content": "A triangle with side lengths of $3$, $4$, and $5$",
                          "correct": false,
                          "originalIndex": 0,
                        },
                        {
                          "clue": "Congruent triangles have the same side lengths.

                This choice is similar to triangle $ABC$.",
                          "content": "A triangle with side lengths of $6$, $7$, and $10$",
                          "correct": false,
                          "originalIndex": 1,
                        },
                        {
                          "clue": "Congruent triangles have the same side lengths.",
                          "content": "A triangle with side lengths of $10$, $12$, and $18$",
                          "correct": false,
                          "isNoneOfTheAbove": false,
                          "originalIndex": 2,
                        },
                        {
                          "clue": "Congruent triangles have the same side lengths.",
                          "content": "A triangle with side lengths of $12$, $14$, and $20$",
                          "correct": true,
                          "isNoneOfTheAbove": false,
                          "originalIndex": 3,
                        },
                        {
                          "clue": "Congruent triangles have the same side lengths.

                This choice is similar to triangle $ABC$.",
                          "content": "A triangle with side lengths of $24$, $28$, and $40$",
                          "correct": false,
                          "isNoneOfTheAbove": false,
                          "originalIndex": 4,
                        },
                      ],
                      "countChoices": false,
                      "deselectEnabled": false,
                      "hasNoneOfTheAbove": false,
                      "multipleSelect": false,
                      "numCorrect": 1,
                      "selectedChoices": [
                        false,
                        false,
                        false,
                        true,
                        false,
                      ],
                    },
                  },
                }
            `);
        });

        it("should return values from lastSerializedState if ref's getSerializedState returns null", async () => {
            // Arrange
            const {renderer} = renderSimpleQuestion(question1);

            await userEvent.click(screen.getAllByRole("radio")[2]);
            await userEvent.type(screen.getByRole("textbox"), "99");

            // Act
            // @ts-expect-error - TS2339 - Property '_getSerializedState' does not exist on type 'never'.
            const state = renderer._getSerializedState({
                blurb: "last blurb",
                hints: ["uno", "dos" /* intentionally not passing a third */],
            });

            // Assert
            expect(state).toMatchInlineSnapshot(`
                {
                  "blurb": {},
                  "hints": [
                    "uno",
                    "dos",
                    undefined,
                  ],
                  "question": {
                    "input-number 1": {
                      "answerType": "number",
                      "currentValue": "99",
                      "rightAlign": undefined,
                      "simplify": "required",
                      "size": "normal",
                    },
                    "radio 1": {
                      "choiceStates": [
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": false,
                        },
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": false,
                        },
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": true,
                        },
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": false,
                        },
                        {
                          "correctnessShown": false,
                          "crossedOut": false,
                          "highlighted": false,
                          "previouslyAnswered": false,
                          "rationaleShown": false,
                          "readOnly": false,
                          "selected": false,
                        },
                      ],
                      "choices": [
                        {
                          "clue": "Congruent triangles have the same side lengths.",
                          "content": "A triangle with side lengths of $3$, $4$, and $5$",
                          "correct": false,
                          "originalIndex": 0,
                        },
                        {
                          "clue": "Congruent triangles have the same side lengths.

                This choice is similar to triangle $ABC$.",
                          "content": "A triangle with side lengths of $6$, $7$, and $10$",
                          "correct": false,
                          "originalIndex": 1,
                        },
                        {
                          "clue": "Congruent triangles have the same side lengths.",
                          "content": "A triangle with side lengths of $10$, $12$, and $18$",
                          "correct": false,
                          "isNoneOfTheAbove": false,
                          "originalIndex": 2,
                        },
                        {
                          "clue": "Congruent triangles have the same side lengths.",
                          "content": "A triangle with side lengths of $12$, $14$, and $20$",
                          "correct": true,
                          "isNoneOfTheAbove": false,
                          "originalIndex": 3,
                        },
                        {
                          "clue": "Congruent triangles have the same side lengths.

                This choice is similar to triangle $ABC$.",
                          "content": "A triangle with side lengths of $24$, $28$, and $40$",
                          "correct": false,
                          "isNoneOfTheAbove": false,
                          "originalIndex": 4,
                        },
                      ],
                      "countChoices": false,
                      "deselectEnabled": false,
                      "hasNoneOfTheAbove": false,
                      "multipleSelect": false,
                      "numCorrect": 1,
                      "selectedChoices": [
                        false,
                        false,
                        false,
                        true,
                        false,
                      ],
                    },
                  },
                }
            `);
        });

        it("should restore serialized state to each widget", () => {
            // Arrange
            const {renderer} = renderSimpleQuestion(question1);

            // This state was built by getting the renderer into this state
            // using `userEvent` calls and then calling `getSerializedState()`
            // on the renderer.
            const state = {
                blurb: {},
                hints: [null, null, null],
                question: {
                    "input-number 1": {
                        answerType: "number",
                        currentValue: "+42",
                        rightAlign: false,
                        simplify: "required",
                        size: "normal",
                    },
                    "radio 1": {
                        choiceStates: [
                            {
                                correctnessShown: false,
                                crossedOut: false,
                                highlighted: false,
                                previouslyAnswered: false,
                                rationaleShown: false,
                                readOnly: false,
                                selected: false,
                            },
                            {
                                correctnessShown: false,
                                crossedOut: false,
                                highlighted: false,
                                previouslyAnswered: false,
                                rationaleShown: false,
                                readOnly: false,
                                selected: false,
                            },
                            {
                                correctnessShown: false,
                                crossedOut: false,
                                highlighted: false,
                                previouslyAnswered: false,
                                rationaleShown: false,
                                readOnly: false,
                                selected: true,
                            },
                            {
                                correctnessShown: false,
                                crossedOut: false,
                                highlighted: false,
                                previouslyAnswered: false,
                                rationaleShown: false,
                                readOnly: false,
                                selected: false,
                            },
                            {
                                correctnessShown: false,
                                crossedOut: false,
                                highlighted: false,
                                previouslyAnswered: false,
                                rationaleShown: false,
                                readOnly: false,
                                selected: false,
                            },
                        ],
                        choices: [
                            {
                                clue: "Congruent triangles have the same side lengths.",
                                content:
                                    "A triangle with side lengths of $3$, $4$, and $5$",
                                correct: false,
                                originalIndex: 0,
                            },
                            {
                                clue:
                                    "Congruent triangles have the same side lengths.\n" +
                                    "\n" +
                                    "This choice is similar to triangle $ABC$.",
                                content:
                                    "A triangle with side lengths of $6$, $7$, and $10$",
                                correct: false,
                                originalIndex: 1,
                            },
                            {
                                clue: "Congruent triangles have the same side lengths.",
                                content:
                                    "A triangle with side lengths of $10$, $12$, and $18$",
                                correct: false,
                                isNoneOfTheAbove: false,
                                originalIndex: 2,
                            },
                            {
                                clue: "Congruent triangles have the same side lengths.",
                                content:
                                    "A triangle with side lengths of $12$, $14$, and $20$",
                                correct: true,
                                isNoneOfTheAbove: false,
                                originalIndex: 3,
                            },
                            {
                                clue:
                                    "Congruent triangles have the same side lengths.\n" +
                                    "\n" +
                                    "This choice is similar to triangle $ABC$.",
                                content:
                                    "A triangle with side lengths of $24$, $28$, and $40$",
                                correct: false,
                                isNoneOfTheAbove: false,
                                originalIndex: 4,
                            },
                        ],
                        countChoices: false,
                        deselectEnabled: false,
                        hasNoneOfTheAbove: false,
                        multipleSelect: false,
                        numCorrect: 1,
                        selectedChoices: [false, false, false, true, false],
                    },
                },
            } as const;

            // Act
            // @ts-expect-error - TS2339 - Property 'restoreSerializedState' does not exist on type 'never'.
            act(() => renderer.restoreSerializedState(state));

            // Assert
            expect(screen.getAllByRole("radio")[0]).not.toBeChecked();
            expect(screen.getAllByRole("radio")[1]).not.toBeChecked();
            expect(screen.getAllByRole("radio")[2]).toBeChecked();
            expect(screen.getAllByRole("radio")[3]).not.toBeChecked();
            expect(screen.getAllByRole("radio")[4]).not.toBeChecked();
            expect(screen.getByRole("textbox")).toHaveValue("+42");
        });

        it("should call callback when restore serialized state is complete", () => {
            // Arrange
            const {renderer} = renderSimpleQuestion(mockedQuestion1);
            const callback = jest.fn();

            // Act
            act(() =>
                // @ts-expect-error - TS2339 - Property 'restoreSerializedState' does not exist on type 'never'.
                renderer.restoreSerializedState(
                    {
                        blurb: {"mock-widget 1": 1},
                        hints: [2, 3],
                        question: {
                            "mock-widget 4": 4,
                            "mock-widget 5": 5,
                        },
                    },
                    callback,
                ),
            );
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(callback).toHaveBeenCalled();
        });
    });

    it("should find widgets in other parts of the tree", () => {
        // Arrange
        const {renderer} = renderSimpleQuestion(mockedQuestion1);
        // Grab "mock-widget 5" out of the render tree. Note that the result
        // here is a tree of the same shape as the `mockedQuestion1`'s shape.
        // Each node in the tree is a `$ReadOnlyArray<?Widget>`.
        const result = _findWidgets(renderer, (id) => id === "mock-widget 5");

        // Act
        // We're using the API provided to the widget we found ("mock-widget
        // 5") to look into other parts of the render tree for another widget
        // ("mock-widget 1"). This verifies that the MultiRenderer has
        // correctly passed down a functioning `findWidgets` prop to the
        // widgets.
        // Oh the TypeScript warnings we'll suppress. Welcome to multi items.
        const widget1 = result.question[0].props.findWidgets("mock-widget 1");

        // Assert
        expect(widget1).not.toBeNull();
    });

    it("should return the scores in the shape of the tree", async () => {
        // Arrange
        const {renderer} = renderSimpleQuestion(question1);

        await userEvent.click(screen.getAllByRole("radio")[3]); // Correct
        await userEvent.type(screen.getByRole("textbox"), "-42"); // Correct

        // Act
        // @ts-expect-error - TS2339 - Property 'getScores' does not exist on type 'never'.
        const score = renderer.getScores();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "blurb": {
                "correct": true,
                "empty": false,
                "guess": [],
                "message": null,
                "state": {},
              },
              "hints": [
                null,
                null,
                null,
              ],
              "question": {
                "correct": true,
                "empty": false,
                "guess": [
                  {
                    "choicesSelected": [
                      false,
                      false,
                      false,
                      true,
                      false,
                    ],
                    "countChoices": false,
                    "noneOfTheAboveIndex": null,
                    "noneOfTheAboveSelected": false,
                    "numCorrect": 1,
                  },
                  {
                    "currentValue": "-42",
                  },
                ],
                "message": null,
                "state": {
                  "input-number 1": {
                    "answerType": "number",
                    "currentValue": "-42",
                    "rightAlign": undefined,
                    "simplify": "required",
                    "size": "normal",
                  },
                  "radio 1": {
                    "choiceStates": [
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": false,
                      },
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": false,
                      },
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": false,
                      },
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": true,
                      },
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": false,
                      },
                    ],
                    "choices": [
                      {
                        "clue": "Congruent triangles have the same side lengths.",
                        "content": "A triangle with side lengths of $3$, $4$, and $5$",
                        "correct": false,
                        "originalIndex": 0,
                      },
                      {
                        "clue": "Congruent triangles have the same side lengths.

            This choice is similar to triangle $ABC$.",
                        "content": "A triangle with side lengths of $6$, $7$, and $10$",
                        "correct": false,
                        "originalIndex": 1,
                      },
                      {
                        "clue": "Congruent triangles have the same side lengths.",
                        "content": "A triangle with side lengths of $10$, $12$, and $18$",
                        "correct": false,
                        "isNoneOfTheAbove": false,
                        "originalIndex": 2,
                      },
                      {
                        "clue": "Congruent triangles have the same side lengths.",
                        "content": "A triangle with side lengths of $12$, $14$, and $20$",
                        "correct": true,
                        "isNoneOfTheAbove": false,
                        "originalIndex": 3,
                      },
                      {
                        "clue": "Congruent triangles have the same side lengths.

            This choice is similar to triangle $ABC$.",
                        "content": "A triangle with side lengths of $24$, $28$, and $40$",
                        "correct": false,
                        "isNoneOfTheAbove": false,
                        "originalIndex": 4,
                      },
                    ],
                    "countChoices": false,
                    "deselectEnabled": false,
                    "hasNoneOfTheAbove": false,
                    "multipleSelect": false,
                    "numCorrect": 1,
                    "selectedChoices": [
                      false,
                      false,
                      false,
                      true,
                      false,
                    ],
                  },
                },
              },
            }
        `);
    });

    it("should return the composite score for the whole tree", async () => {
        // Arrange
        const {renderer} = renderSimpleQuestion(question1);

        await userEvent.click(screen.getAllByRole("radio")[3]); // Correct
        await userEvent.type(screen.getByRole("textbox"), "-42"); // Correct

        // Act
        // @ts-expect-error - TS2339 - Property 'score' does not exist on type 'never'.
        const score = renderer.score();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "correct": true,
              "empty": false,
              "guess": {
                "blurb": [],
                "hints": [
                  null,
                  null,
                  null,
                ],
                "question": [
                  {
                    "choicesSelected": [
                      false,
                      false,
                      false,
                      true,
                      false,
                    ],
                    "countChoices": false,
                    "noneOfTheAboveIndex": null,
                    "noneOfTheAboveSelected": false,
                    "numCorrect": 1,
                  },
                  {
                    "currentValue": "-42",
                  },
                ],
              },
              "message": null,
              "state": [
                {},
                {
                  "input-number 1": {
                    "answerType": "number",
                    "currentValue": "-42",
                    "rightAlign": undefined,
                    "simplify": "required",
                    "size": "normal",
                  },
                  "radio 1": {
                    "choiceStates": [
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": false,
                      },
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": false,
                      },
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": false,
                      },
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": true,
                      },
                      {
                        "correctnessShown": false,
                        "crossedOut": false,
                        "highlighted": false,
                        "previouslyAnswered": false,
                        "rationaleShown": false,
                        "readOnly": false,
                        "selected": false,
                      },
                    ],
                    "choices": [
                      {
                        "clue": "Congruent triangles have the same side lengths.",
                        "content": "A triangle with side lengths of $3$, $4$, and $5$",
                        "correct": false,
                        "originalIndex": 0,
                      },
                      {
                        "clue": "Congruent triangles have the same side lengths.

            This choice is similar to triangle $ABC$.",
                        "content": "A triangle with side lengths of $6$, $7$, and $10$",
                        "correct": false,
                        "originalIndex": 1,
                      },
                      {
                        "clue": "Congruent triangles have the same side lengths.",
                        "content": "A triangle with side lengths of $10$, $12$, and $18$",
                        "correct": false,
                        "isNoneOfTheAbove": false,
                        "originalIndex": 2,
                      },
                      {
                        "clue": "Congruent triangles have the same side lengths.",
                        "content": "A triangle with side lengths of $12$, $14$, and $20$",
                        "correct": true,
                        "isNoneOfTheAbove": false,
                        "originalIndex": 3,
                      },
                      {
                        "clue": "Congruent triangles have the same side lengths.

            This choice is similar to triangle $ABC$.",
                        "content": "A triangle with side lengths of $24$, $28$, and $40$",
                        "correct": false,
                        "isNoneOfTheAbove": false,
                        "originalIndex": 4,
                      },
                    ],
                    "countChoices": false,
                    "deselectEnabled": false,
                    "hasNoneOfTheAbove": false,
                    "multipleSelect": false,
                    "numCorrect": 1,
                    "selectedChoices": [
                      false,
                      false,
                      false,
                      true,
                      false,
                    ],
                  },
                },
              ],
            }
        `);
    });
});
