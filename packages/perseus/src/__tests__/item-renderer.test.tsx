import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom"; // Imports custom matchers

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../testing/test-dependencies";
import {
    itemWithInput,
    labelImageItem,
    mockedItem,
} from "../__testdata__/item-renderer.testdata";
import * as Dependencies from "../dependencies";
import ItemRenderer from "../item-renderer";
import {registerWidget} from "../widgets";
import {multiChoiceQuestion} from "../widgets/__testdata__/radio.testdata";
import DefinitionExport from "../widgets/definition";
import InputNumberExport from "../widgets/input-number";
import LabelImageExport from "../widgets/label-image";
import RadioWidgetExport from "../widgets/radio";

import MockWidgetExport from "./mock-widget";

import type {PerseusItem, PerseusRenderer} from "../perseus-types";
import type {Widget as WidgetInstance} from "../renderer";
import type {APIOptions, PerseusScore} from "../types";

const Peripherals = () => (
    <div className="test_peripherals">
        <div
            id="calculator"
            data-test-id="calculator"
            style={{display: "none"}}
        />
        <div
            className="periodic-table-info-box"
            data-test-id="periodic-table-info-box"
            style={{display: "none"}}
        />
        <div
            className="z-table-info-box"
            data-test-id="z-table-info-box"
            style={{display: "none"}}
        />
        <div
            className="t-table-info-box"
            data-test-id="t-table-info-box"
            style={{display: "none"}}
        />
        <div
            className="chi2-table-info-box"
            data-test-id="chi2-table-info-box"
            style={{display: "none"}}
        />
    </div>
);

// This looks alot like `widgets/__tests__/renderQuestion.jsx', except we use
// the ItemRenderer instead of Renderer
export const renderQuestion = (
    question: PerseusItem,
    apiOptions: APIOptions = Object.freeze({}),
    optionalProps: Partial<ItemRenderer["props"]> = Object.freeze({}),
): {
    container: HTMLElement;
    renderer: ItemRenderer;
} => {
    let renderer: ItemRenderer | null = null;
    const {container} = render(
        <RenderStateRoot>
            <ItemRenderer
                ref={(node) => (renderer = node)}
                apiOptions={apiOptions}
                item={question}
                problemNum={0}
                reviewMode={false}
                savedState=""
                controlPeripherals={false}
                dependencies={testDependenciesV2}
                {...optionalProps}
            />
            {/* The ItemRenderer _requires_ two divs: a work area and hints
                area. Without both of these, it fails to render anything! */}
            <div id="workarea" />
            <div id="hintsarea" />

            <Peripherals />
        </RenderStateRoot>,
    );
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    return {container, renderer};
};

// Finds a widget in the given renderer by ID. The return type is non-optional
// (ie. it assumes the widget will exist) to make TypeScript happier in the tests
// that use this function.
const getWidgetById = (
    renderer: ItemRenderer,
    widgetId: string,
): WidgetInstance => {
    const mockWidget = renderer.questionRenderer.getWidgetInstance(widgetId);
    expect(mockWidget).not.toBeUndefined();
    if (mockWidget == null) {
        throw new Error("Oops");
    }
    return mockWidget;
};

const makeHint = (content: string): PerseusRenderer => ({
    content:
        "Maybe if you try using a calculator? See: [[\u2603 mock-hint-widget 1]]",
    widgets: {
        "mock-hint-widget 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            // @ts-expect-error [FEI-5003] - TS2322 - Type '"mock-widget"' is not assignable to type '"video" | "image" | "iframe" | "table" | "radio" | "definition" | "group" | "matrix" | "categorizer" | "cs-program" | "dropdown" | "example-graphie-widget" | "example-widget" | ... 26 more ... | "unit-input"'.
            type: "mock-widget",
            options: {static: false},
            alignment: "default",
        },
    },
    images: {},
});

describe("item renderer", () => {
    beforeAll(() => {
        registerWidget("definition", DefinitionExport);
        registerWidget("input-number", InputNumberExport);
        registerWidget("mock-widget", MockWidgetExport);
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion(itemWithInput);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should render the content", () => {
        // Arrange and Act
        renderQuestion(itemWithInput);

        // Assert
        expect(screen.getByRole("textbox")).toBeVisible();
    });

    describe("API options callbacks", () => {
        it("should call the answerable callback when mounted", () => {
            // Arrange
            const answerableCallback = jest.fn();

            // Act
            renderQuestion(itemWithInput, {
                answerableCallback,
            });

            // Assert
            expect(answerableCallback).toHaveBeenCalledWith(
                false /* Answer is not answerable yet */,
            );
        });

        it("should call interactionCallback when widget interation happens", () => {
            // Arrange
            const interactionCallback = jest.fn();
            const {renderer} = renderQuestion(mockedItem, {
                interactionCallback,
            });

            // Act
            renderer.handleInteractWithWidget("mock-widget 3");

            // Assert
            expect(interactionCallback).toHaveBeenCalled();
        });
    });

    describe("required DOM elements", () => {
        it("should render empty div if no work area found", () => {
            // Arrange and Act
            renderQuestion(itemWithInput, undefined, {
                workAreaSelector: "non_existant_id",
            });

            // Assert
            expect(
                screen.queryByText(/Enter the number/),
            ).not.toBeInTheDocument();
        });

        it("should render empty div if no hints area found", () => {
            // Arrange and Act
            renderQuestion(itemWithInput, undefined, {
                hintsAreaSelector: "non_existant_id",
            });

            // Assert
            expect(
                screen.queryByText(/Enter the number/),
            ).not.toBeInTheDocument();
        });
    });

    describe("focus handling", () => {
        it("should focus the first widget who's focus() returns true", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            getWidgetById(renderer, "mock-widget 3").focus = jest
                .fn()
                .mockReturnValue(true);

            // Act
            const didFocus = renderer.focus();

            // Assert
            expect(didFocus).toBeTrue();
            expect(renderer._currentFocus).toStrictEqual(["mock-widget 3"]);
        });

        it("should blur the currently focused widget when blur() called", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);

            // Set focus to the widget and make sure it worked
            screen.getByRole("textbox").focus();
            expect(renderer._currentFocus).toStrictEqual(["input-number 1"]);

            // Act
            renderer.blur();
            // There's two async calls (in a series) on the blur path:
            //   * _.defer() in renderer.jsx (in _onWidgetBlur())
            //   * setTimeout() in item-renderer.jsx (in _onRendererBlur())
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();

            // Assert
            expect(renderer._currentFocus).toStrictEqual(null);
        });

        it("should call the onFocusChange callback when focus set", () => {
            // Arrange
            const onFocusChange = jest.fn();

            const {renderer} = renderQuestion(mockedItem, {
                onFocusChange,
            });
            getWidgetById(renderer, "mock-widget 2").focus = jest
                .fn()
                .mockReturnValue(true);

            // Act
            renderer.focus();

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                ["mock-widget 2"], // widget that received focus
                null, // previously focused widget
                false, // did focus the input (our mock widget doesn't have input)
            );
        });

        it("should provide previous focus widgetId to onFocusChange", () => {
            // Arrange
            const onFocusChange = jest.fn();

            const {renderer} = renderQuestion(mockedItem, {
                onFocusChange,
            });

            getWidgetById(renderer, "mock-widget 4").focus = jest
                .fn()
                .mockReturnValue(true);
            renderer.focus();

            getWidgetById(renderer, "mock-widget 2").focus = jest
                .fn()
                .mockReturnValue(true);

            // Act
            const gotFocus = renderer.focus();

            // Assert
            expect(gotFocus).toBeTrue();
            expect(renderer._currentFocus).toStrictEqual(["mock-widget 2"]);
            expect(onFocusChange).toHaveBeenCalledWith(
                ["mock-widget 2"], // widget that received focus
                ["mock-widget 4"], // previously focused widget
                false, // did focus the input (our mock widget doesn't have input)
            );
        });

        it("should activate the keypad when widget with input is focused", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput, {
                isMobile: true,
                customKeypad: true,
            });

            // Act
            renderer.focus();

            // Assert
            expect(screen.getByLabelText("7")).toBeVisible();
        });

        it("should provide current and previous focus paths on focus change to, and away from, a single widget", () => {
            // Arrange
            const onFocusChange = jest.fn();
            renderQuestion(itemWithInput, {
                onFocusChange,
            });

            userEvent.click(screen.getByRole("textbox"));

            // Act
            userEvent.tab();
            // There's two async calls (in a series) on the blur path:
            //   * _.defer() in renderer.jsx (in _onWidgetBlur())
            //   * setTimeout() in item-renderer.jsx (in _onRendererBlur())
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();

            // Assert
            expect(onFocusChange).toHaveBeenCalledTimes(2);
            expect(onFocusChange).toHaveBeenNthCalledWith(
                1,
                ["input-number 1"], // current focus
                null, // previous focus
                null, // no keypad element?
            );
            expect(onFocusChange).toHaveBeenNthCalledWith(
                2,
                null, // current focus
                ["input-number 1"], // previous focus
                null, // no keypad element?
            );
        });

        it("should provide current and previous focus paths on focus change from one widget to another", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const inputNumber =
                itemWithInput.question.widgets["input-number 1"];

            renderQuestion(
                {
                    ...itemWithInput,
                    question: {
                        ...itemWithInput.question,
                        content:
                            "Enter the number $$-42$$ in both boxes: \n\n[[\u2603 input-number 1]]\n\n[[\u2603 input-number 2]]",
                        widgets: {
                            "input-number 1": inputNumber,
                            "input-number 2": inputNumber,
                        },
                    },
                },
                {onFocusChange},
            );

            // Focus second input to start
            userEvent.click(screen.queryAllByRole("textbox")[1]);

            // Act
            userEvent.click(screen.queryAllByRole("textbox")[0]);
            // There's two async calls (in a series) on the blur path:
            //   * _.defer() in renderer.jsx (in _onWidgetBlur())
            //   * setTimeout() in item-renderer.jsx (in _onRendererBlur())
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();

            // Assert
            expect(onFocusChange).toHaveBeenCalledTimes(2);
            expect(onFocusChange).toHaveBeenNthCalledWith(
                1,
                ["input-number 2"], // current focus
                null, // previous focus
                null, // no keypad element?
            );
            expect(onFocusChange).toHaveBeenNthCalledWith(
                2,
                ["input-number 1"], // current focus
                ["input-number 2"], // previous focus
                null, // no keypad element?
            );
        });

        it("should set given value to widget at focus path", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);
            const cb = jest.fn();

            // Act
            renderer.setInputValue(["input-number 1"], "answer_42", cb);
            jest.runOnlyPendingTimers(); // due to setState()

            // Assert
            expect(cb).toHaveBeenCalled();
            expect(screen.getByDisplayValue("answer_42")).toBeVisible();
        });

        it("should focus the widget found at the given path", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);

            // Act
            renderer.focusPath(["input-number 1"]);

            // Assert
            expect(screen.getByRole("textbox")).toHaveFocus();
        });

        it("should blur the widget found at the given path", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);
            screen.getByRole("textbox").focus();

            // Act
            renderer.blurPath(["input-number 1"]);
            // There's two async calls (in a series) on the blur path:
            //   * _.defer() in renderer.jsx (in _onWidgetBlur())
            //   * setTimeout() in item-renderer.jsx (in _onRendererBlur())
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();

            // Assert
            expect(screen.getByRole("textbox")).not.toHaveFocus();
        });

        // TODO(jeremy): I couldn't get this test to work, but I'd like to eventually
        it.skip("should dismiss the keypad if no input element focused (mobile)", () => {
            // Arrange
            const onFocusChange = jest.fn();
            renderQuestion(itemWithInput, {
                onFocusChange,
                isMobile: true,
                customKeypad: true,
            });

            const mathInput = screen.getByRole("textbox");
            fireEvent.touchStart(mathInput);
            fireEvent.touchEnd(mathInput);
            jest.runOnlyPendingTimers();
            // Make sure the keypad appeared
            expect(screen.getByLabelText("Up arrow")).toBeVisible();

            // Act
            const instructions = screen.getByText(/Enter the number/);
            fireEvent.touchStart(instructions);
            fireEvent.touchEnd(instructions);
            // There's two defer()'s on the blur path:
            //   * one in renderer.jsx
            //   * one in item-renderer.jsx
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();

            // Assert
            // TODO!!
            expect(screen.getByLabelText("Up arrow")).not.toBeVisible();
        });
    });

    describe("scoring", () => {
        it("should highlight empty widgets when scoring", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);

            // Act
            const score = renderer.scoreInput();
            jest.runOnlyPendingTimers(); // due to setState()

            // Assert
            expect(score.empty).toBeTrue();
            expect(screen.getByRole("textbox")).toBeHighlighted();
        });

        it("should remove highlight after marking widget as having had interaction", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);
            renderer.scoreInput(); // Triggers highlighting
            expect(screen.getByRole("textbox")).toBeHighlighted();

            // Act
            screen.getByRole("textbox").focus();
            userEvent.keyboard("23");
            jest.runOnlyPendingTimers(); // due to setState()

            // Assert
            expect(screen.getByRole("textbox")).not.toBeHighlighted();
        });

        it("should return a score for each widget when scoreWidgets() called", () => {
            // Arrange
            const correct: PerseusScore = {earned: 1, total: 1, type: "points"};
            const wrong: PerseusScore = {
                type: "invalid",
                message: "please enter a value",
            };

            let isCorrect = true;
            const ticktock = (): PerseusScore => {
                const wasCorrect = isCorrect;
                isCorrect = !isCorrect;
                if (wasCorrect) {
                    return correct;
                }
                return wrong;
            };

            const {renderer} = renderQuestion(mockedItem);
            for (const [id] of Object.entries(mockedItem.question.widgets)) {
                const widget = getWidgetById(renderer, id);
                widget.simpleValidate = jest.fn().mockReturnValue(ticktock());
                widget.getUserInput = jest
                    .fn()
                    .mockReturnValue(`user input for ${id}`);
                widget.getSerializedState = jest
                    .fn()
                    .mockReturnValue({id, a: 1, b: "state"});
            }

            // Act
            const scores = renderer.scoreWidgets();

            // Assert
            expect(scores).toMatchInlineSnapshot(`
                {
                  "mock-widget 1": {
                    "correct": true,
                    "empty": false,
                    "guess": "user input for mock-widget 1",
                    "message": undefined,
                    "state": {
                      "a": 1,
                      "b": "state",
                      "id": "mock-widget 1",
                    },
                  },
                  "mock-widget 2": {
                    "correct": false,
                    "empty": true,
                    "guess": "user input for mock-widget 2",
                    "message": "please enter a value",
                    "state": {
                      "a": 1,
                      "b": "state",
                      "id": "mock-widget 2",
                    },
                    "suppressAlmostThere": undefined,
                  },
                  "mock-widget 3": {
                    "correct": true,
                    "empty": false,
                    "guess": "user input for mock-widget 3",
                    "message": undefined,
                    "state": {
                      "a": 1,
                      "b": "state",
                      "id": "mock-widget 3",
                    },
                  },
                  "mock-widget 4": {
                    "correct": false,
                    "empty": true,
                    "guess": "user input for mock-widget 4",
                    "message": "please enter a value",
                    "state": {
                      "a": 1,
                      "b": "state",
                      "id": "mock-widget 4",
                    },
                    "suppressAlmostThere": undefined,
                  },
                }
            `);
        });
    });

    describe("rationales", () => {
        it("should show rationales for widgets that support it", () => {
            // Arrange
            registerWidget("label-image", LabelImageExport);

            const {renderer} = renderQuestion(labelImageItem);

            // Act
            renderer.showRationalesForCurrentlySelectedChoices();

            // Assert
            expect(
                screen.getByText(
                    /Click each dot on the image to select an answer/,
                ),
            ).toBeVisible();
        });

        it("should show not throw if none of the rendered widgets support supporationales", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);

            // Act and Assert
            expect(() => {
                renderer.showRationalesForCurrentlySelectedChoices();
            }).not.toThrow();
        });
    });

    describe("support functions", () => {
        it("should return all widget IDs when getWidgetIds() called", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);

            // Act
            const ids = renderer.getWidgetIds();

            // Assert
            expect(ids).toStrictEqual([
                "mock-widget 1",
                "mock-widget 2",
                "mock-widget 3",
                "mock-widget 4",
            ]);
        });

        it("should return the DOM element for the widget at the given path", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);

            // Act
            const node = renderer.getDOMNodeForPath(["input-number 1"]);

            // Assert
            expect(node).toBeInTheDocument();
            const input = screen.getByRole("textbox");
            expect(node?.contains(input)).toBeTrue();
        });

        it("should return null when widget not found for the given path", () => {
            // Arrange
            const {renderer} = renderQuestion(itemWithInput);

            // Act
            const node = renderer.getDOMNodeForPath([
                "this-is-not-a-valid-widget-id",
            ]);

            // Assert
            expect(node).toBeNull();
        });

        it("should do grammar type for the widget at the given path", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            getWidgetById(renderer, "mock-widget 2").getGrammarTypeForPath =
                jest.fn().mockReturnValue("yabadabadoo!");

            // Act
            const grammarType = renderer.getGrammarTypeForPath([
                "mock-widget 2",
            ]);

            // Assert
            expect(grammarType).toBe("yabadabadoo!");
        });

        it("should return input paths for widgets supporting input", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            getWidgetById(renderer, "mock-widget 1").getInputPaths = jest
                .fn()
                .mockReturnValue([["a singular path"]]);
            getWidgetById(renderer, "mock-widget 4").getInputPaths = jest
                .fn()
                .mockReturnValue([["some", "path"]]);

            // Act
            const inputPaths = renderer.getInputPaths();

            // Assert
            expect(inputPaths).toStrictEqual([
                ["mock-widget 1", "a singular path"],
                ["mock-widget 4", "some", "path"],
            ]);
        });

        it("should forward deselectIncorrectSelectedChoices calls to questionRenderer", () => {
            // Arrange
            registerWidget("radio", RadioWidgetExport);
            const {renderer} = renderQuestion({
                ...itemWithInput,
                question: multiChoiceQuestion,
            });
            screen.getAllByRole("checkbox").map((r) => userEvent.click(r));
            jest.runOnlyPendingTimers(); // due to setState()

            // Act
            renderer.deselectIncorrectSelectedChoices();

            // Assert
            const checkboxes = screen.getAllByRole("checkbox");
            expect(checkboxes[0]).not.toBeChecked();
            expect(checkboxes[1]).not.toBeChecked();
            expect(checkboxes[2]).not.toBeChecked();
            expect(checkboxes[3]).toBeChecked();
        });

        it("should return serialized state for each widget and hints", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...mockedItem,
                hints: [
                    makeHint("Maybe if you try using a calculator?"),
                    makeHint("I think you need a TI-80 to get this done!"),
                ],
            });
            // We get the result of the widget's getSerializedState() if it
            // implements it, otherwise we just get it's props.
            getWidgetById(renderer, "mock-widget 1").getSerializedState = jest
                .fn()
                .mockReturnValue({id: "mock-widget 1", a: 1, b: "state 1"});
            getWidgetById(renderer, "mock-widget 4").getSerializedState = jest
                .fn()
                .mockReturnValue({id: "mock-widget 4", a: 4, b: "state 4"});

            renderer.showHint(); // should be one left

            // Act
            const state = renderer.getSerializedState();

            // Assert
            expect(state).toStrictEqual({
                hints: [{"mock-hint-widget 1": {static: false}}],
                question: {
                    "mock-widget 1": {id: "mock-widget 1", a: 1, b: "state 1"},
                    "mock-widget 2": {smiling: false, static: false},
                    "mock-widget 3": {smiling: true, static: false},
                    "mock-widget 4": {id: "mock-widget 4", a: 4, b: "state 4"},
                },
            });
        });
    });

    describe("controlPeripherals is disabled", () => {
        const extraProps = {controlPeripherals: false} as const;

        it("should hide peripherals if answerArea flag(s) are false", () => {
            // Arrange
            const item = {...itemWithInput, answerArea: null} as const;

            // Act
            renderQuestion(item, undefined, extraProps);

            // Assert
            expect(screen.getByTestId("calculator")).not.toBeVisible();
            expect(
                screen.getByTestId("periodic-table-info-box"),
            ).not.toBeVisible();
            expect(screen.getByTestId("z-table-info-box")).not.toBeVisible();
            expect(screen.getByTestId("t-table-info-box")).not.toBeVisible();
            expect(screen.getByTestId("chi2-table-info-box")).not.toBeVisible();
        });

        it("should call onShowXyz peripheral callbacks", () => {
            // Arrange
            const item = {
                ...itemWithInput,
                answerArea: {
                    zTable: true,
                    chi2Table: true,
                    tTable: true,
                    calculator: true,
                    periodicTable: true,
                },
            } as const;

            const onShowCalculator = jest.fn();
            const onShowPeriodicTable = jest.fn();
            const onShowZTable = jest.fn();
            const onShowTTable = jest.fn();
            const onShowChi2Table = jest.fn();
            const localExtraProps = {
                ...extraProps,
                onShowCalculator,
                onShowPeriodicTable,
                onShowZTable,
                onShowTTable,
                onShowChi2Table,
            } as const;

            // Act
            renderQuestion(item, undefined, localExtraProps);

            // Assert
            expect(onShowCalculator).toHaveBeenCalled();
            expect(onShowPeriodicTable).toHaveBeenCalled();
            expect(onShowZTable).toHaveBeenCalled();
            expect(onShowTTable).toHaveBeenCalled();
            expect(onShowChi2Table).toHaveBeenCalled();
        });
    });

    describe("controlPeripherals is enabled", () => {
        const extraProps: Partial<ItemRenderer["props"]> = {
            controlPeripherals: true,
        };

        it("should show peripherals if answerArea flag(s) are true", () => {
            // Arrange
            const item = {
                ...itemWithInput,
                answerArea: {
                    zTable: true,
                    chi2Table: true,
                    tTable: true,
                    calculator: true,
                    periodicTable: true,
                },
            } as const;

            // Act
            renderQuestion(item, undefined, extraProps);

            // Assert
            expect(screen.getByTestId("calculator")).toBeVisible();
            expect(screen.getByTestId("periodic-table-info-box")).toBeVisible();
            expect(screen.getByTestId("z-table-info-box")).toBeVisible();
            expect(screen.getByTestId("t-table-info-box")).toBeVisible();
            expect(screen.getByTestId("chi2-table-info-box")).toBeVisible();
        });

        it("should hide peripherals if answerArea flag(s) are false", () => {
            // Arrange
            const item = {
                ...itemWithInput,
                answerArea: {
                    zTable: false,
                    chi2Table: false,
                    tTable: false,
                    calculator: false,
                    periodicTable: false,
                },
            } as const;

            // Act
            renderQuestion(item, undefined, extraProps);

            // Assert
            expect(screen.getByTestId("calculator")).not.toBeVisible();
            expect(
                screen.getByTestId("periodic-table-info-box"),
            ).not.toBeVisible();
            expect(screen.getByTestId("z-table-info-box")).not.toBeVisible();
            expect(screen.getByTestId("t-table-info-box")).not.toBeVisible();
            expect(screen.getByTestId("chi2-table-info-box")).not.toBeVisible();
        });

        it("should call the setDrawingAreaAvailable callback when mounted", () => {
            // Arrange
            const item = {
                ...itemWithInput,
                answerArea: {
                    zTable: false,
                    chi2Table: false,
                    tTable: false,
                    calculator: false,
                    periodicTable: false,
                },
            } as const;
            const onDrawingAreaAvailable = jest.fn();
            const apiOptions = {
                setDrawingAreaAvailable: onDrawingAreaAvailable,
            } as const;

            // Act
            renderQuestion(item, apiOptions, extraProps);

            // Assert
            expect(onDrawingAreaAvailable).toHaveBeenCalledWith(true);
        });
    });
});
