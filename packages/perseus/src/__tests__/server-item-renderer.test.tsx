import {
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    splitPerseusItem,
    type PerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {within, render, screen, act} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../testing/test-dependencies";
import {
    itemWithNumericInput,
    itemWithLintingError,
    itemWithRadioAndExpressionWidgets,
    itemWithTwoMockWidgets,
    itemWithMockWidget,
} from "../__testdata__/server-item-renderer.testdata";
import * as Dependencies from "../dependencies";
import {ServerItemRenderer} from "../server-item-renderer";
import {registerWidget} from "../widgets";
import {MockWidget} from "../widgets/mock-widgets";
import MockAssetLoadingWidgetExport, {
    mockedAssetItem,
} from "../widgets/mock-widgets/mock-asset-loading-widget";

import {renderQuestion} from "./test-utils";

import type {MockAssetLoadingWidget} from "../widgets/mock-widgets/mock-asset-loading-widget";
import type {KeypadAPI} from "@khanacademy/math-input";
import type {UserEvent} from "@testing-library/user-event";

describe("server item renderer", () => {
    beforeAll(() => {
        registerWidget("mock-widget", MockWidget);
    });

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    afterEach(() => {
        // The Renderer uses a timer to wait for widgets to complete rendering.
        // If we don't spin the timers here, then the timer fires in the test
        // _after_ and breaks it because we do setState() in the callback,
        // and by that point the component has been unmounted.
        act(() => jest.runOnlyPendingTimers());
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion({
            ...itemWithMockWidget,
            hints: [
                {content: "Hint #1", images: {}, widgets: {}},
                {content: "Hint #2", images: {}, widgets: {}},
                {content: "Hint #3", images: {}, widgets: {}},
            ],
        });

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should render the content", () => {
        // Arrange and Act
        renderQuestion(itemWithMockWidget);

        // Assert
        expect(screen.getByRole("textbox")).toBeVisible();
    });

    it("should pass showSolutions to the widgets", () => {
        // Arrange
        renderQuestion(itemWithRadioAndExpressionWidgets, Object.freeze({}), {
            showSolutions: "all",
        });

        // Assert
        expect(
            screen.queryAllByTestId(/perseus-radio-rationale-content/),
        ).toHaveLength(4);
    });

    it("calls onInteraction callback with the current user data", async () => {
        // Arrange
        const interactionCallback = jest.fn();
        renderQuestion(itemWithTwoMockWidgets, {
            interactionCallback,
        });

        // Act
        const inputs = screen.getAllByRole("textbox");
        await userEvent.type(inputs[0], "1");
        await userEvent.type(inputs[1], "2");
        act(() => jest.runOnlyPendingTimers()); // Renderer uses setTimeout setting widget props

        // Assert
        expect(interactionCallback).toHaveBeenCalledWith({
            "mock-widget 1": {currentValue: "1"},
            "mock-widget 2": {currentValue: "2"},
        });
    });

    it("should return the DOM node for the requested focus path", async () => {
        // Arrange
        const {renderer} = renderQuestion(itemWithMockWidget);

        // Act
        const node = renderer.getDOMNodeForPath(["mock-widget 1"]);

        // Assert
        // @ts-expect-error - TS2345 - Argument of type 'Element | Text | null | undefined' is not assignable to parameter of type 'HTMLElement'.
        expect(await within(node).findAllByRole("textbox")).toHaveLength(1);
    });

    it("should return the number of hints available", () => {
        // Arrange
        const {renderer} = renderQuestion({
            ...itemWithMockWidget,
            hints: [
                {content: "Hint #1", images: {}, widgets: {}},
                {content: "Hint #2", images: {}, widgets: {}},
                {content: "Hint #3", images: {}, widgets: {}},
            ],
        });

        // Act
        const numHints = renderer.getNumHints();

        // Assert
        expect(numHints).toBe(3);
    });

    it("should return all widget ids", () => {
        // Arrange
        const {renderer} = renderQuestion(itemWithTwoMockWidgets);

        // Act
        const widgetIds = renderer.getWidgetIds();

        // Assert
        expect(widgetIds).toStrictEqual(["mock-widget 1", "mock-widget 2"]);
    });

    it("should call the answerable callback when no widgets are empty", async () => {
        // Arrange
        const answerableCallback = jest.fn();
        render(
            <RenderStateRoot>
                <ServerItemRenderer
                    apiOptions={{
                        answerableCallback,
                    }}
                    item={itemWithMockWidget}
                    problemNum={0}
                    reviewMode={false}
                    dependencies={testDependenciesV2}
                />
            </RenderStateRoot>,
        );

        expect(answerableCallback).toHaveBeenCalledWith(false);

        // Act
        await userEvent.type(screen.getByRole("textbox"), "-42");

        // Assert
        expect(answerableCallback).toHaveBeenCalledWith(true);
    });

    it("should call the onRendered callback when all assets loaded", () => {
        // This is an involved test. We create a mock widget that gives us
        // access to the setAssetStatus function that is passed down by the
        // render tree created.
        // Finally we re-render and poke the asset status to loaded. At that
        // everything is loaded.

        // Arrange
        registerWidget(
            "mock-asset-loading-widget",
            MockAssetLoadingWidgetExport,
        );

        const onRendered = jest.fn();
        let renderer: ServerItemRenderer | null | undefined;
        const {rerender} = render(
            <RenderStateRoot>
                <ServerItemRenderer
                    ref={(component) => (renderer = component)}
                    item={mockedAssetItem}
                    problemNum={0}
                    reviewMode={false}
                    onRendered={onRendered}
                    dependencies={testDependenciesV2}
                />
            </RenderStateRoot>,
        );
        if (renderer == null) {
            throw new Error("Renderer failed to render.");
        }

        const mockedWidget = renderer.questionRenderer.getWidgetInstance(
            "mock-asset-loading-widget 1",
        );
        if (mockedWidget == null) {
            throw new Error("Couldn't find mocked widget!");
        }

        rerender(
            <RenderStateRoot>
                <ServerItemRenderer
                    item={mockedAssetItem}
                    problemNum={1}
                    reviewMode={false}
                    onRendered={onRendered}
                    dependencies={testDependenciesV2}
                />
            </RenderStateRoot>,
        );

        // Act
        // setAssetStatus() is not part of the Widget interface, it's specific
        // this test.
        const widget = mockedWidget as MockAssetLoadingWidget;
        act(() => widget.setAssetStatus?.("ABC", true));

        // Assert
        expect(onRendered).toHaveBeenCalledWith(true);
    });

    it("should call the onRendered callback with no assets in content", () => {
        const content: PerseusItem = {
            question: {
                content: "Content without any assets",
                images: {},
                widgets: {},
            },
            answerArea: {
                calculator: false,
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTotalAmount: false,
                financialCalculatorTimeToPayOff: false,
                periodicTable: false,
                periodicTableWithKey: false,
            },
            hints: [],
        };

        const onRendered = jest.fn();

        // Act
        render(
            <RenderStateRoot>
                <ServerItemRenderer
                    item={content}
                    problemNum={0}
                    reviewMode={false}
                    dependencies={testDependenciesV2}
                    onRendered={onRendered}
                />
            </RenderStateRoot>,
        );

        // Assert
        expect(onRendered).toHaveBeenCalledWith(true);
    });

    it("should get prompt JSON with the correct content and widgets", () => {
        const {renderer} = renderQuestion(itemWithTwoMockWidgets);

        const json = renderer.getPromptJSON();

        expect(json.content).toBe(itemWithTwoMockWidgets.question.content);

        const widgetKeys = Object.keys(itemWithTwoMockWidgets.question.widgets);

        expect(Object.keys(json.widgets)).toEqual(widgetKeys);
    });

    describe("focus management", () => {
        it("calls onFocusChange when focusing the renderer", async () => {
            // Arranged
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(itemWithMockWidget, {
                onFocusChange,
            });

            // Act
            const gotFocus = await act(() => renderer.focus());

            // We have some async processes that need to be resolved here
            jest.runAllTimers();

            // Assert
            expect(gotFocus).toBe(true);
            expect(onFocusChange).toHaveBeenCalledWith(
                ["mock-widget 1"],
                null,
                0,
                expect.any(Object),
            );
        });

        it("activates the keypadElement when focusing the renderer on mobile", async () => {
            // Arranged
            const onFocusChange = jest.fn();
            const keypadElementDOMNode = document.createElement("div");

            // We need to mock the getBoundingClientRect() method for our
            // onFocusChange() callback to work properly.
            keypadElementDOMNode.getBoundingClientRect = () =>
                ({
                    height: 250,
                }) as DOMRect;

            const keypadElement: KeypadAPI = {
                getDOMNode: jest
                    .fn()
                    .mockImplementation(() => keypadElementDOMNode),
                activate: jest.fn(),
                dismiss: jest.fn(),
                configure: jest.fn(),
                setCursor: jest.fn(),
                setKeyHandler: jest.fn(),
            };
            const {renderer} = renderQuestion(
                itemWithNumericInput,
                {onFocusChange, isMobile: true},
                {keypadElement},
            );

            // Act
            const gotFocus = await act(() => renderer.focus());

            // We have some async processes that need to be resolved here
            jest.runAllTimers();

            // Assert
            expect(keypadElement.activate).toHaveBeenCalled();
            expect(gotFocus).toBe(true);
            expect(onFocusChange).toHaveBeenCalledWith(
                ["numeric-input 1"],
                null,
                250,
                expect.any(Object),
            );
        });

        it("calls onFocusChange when blurring the renderer", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(itemWithMockWidget, {
                onFocusChange,
            });
            act(() => renderer.focus());

            // Act
            act(() => renderer.blur());

            // We have some async processes that need to be resolved here
            jest.runAllTimers();

            // Assert
            expect(onFocusChange).toHaveBeenCalledTimes(2);
            expect(onFocusChange).toHaveBeenLastCalledWith(
                null,
                ["mock-widget 1"],
                0,
                null,
            );
        });

        it("dismisses the keypadElement when blurring the renderer on mobile", () => {
            // Arranged
            const onFocusChange = jest.fn();
            const keypadElementDOMNode = document.createElement("div");

            // We need to mock the getBoundingClientRect() method for our
            // onFocusChange() callback to work properly.
            keypadElementDOMNode.getBoundingClientRect = () =>
                ({
                    height: 250,
                }) as DOMRect;

            const keypadElement: KeypadAPI = {
                getDOMNode: jest
                    .fn()
                    .mockImplementation(() => keypadElementDOMNode),
                activate: jest.fn(),
                dismiss: jest.fn(),
                configure: jest.fn(),
                setCursor: jest.fn(),
                setKeyHandler: jest.fn(),
            };
            const {renderer} = renderQuestion(
                itemWithNumericInput,
                {onFocusChange, isMobile: true},
                {keypadElement},
            );
            act(() => renderer.focus());

            // Act
            act(() => renderer.blur());

            // We have some async processes that need to be resolved here
            jest.runAllTimers();

            // Assert
            expect(keypadElement.dismiss).toHaveBeenCalled();
            expect(onFocusChange).toHaveBeenCalledTimes(2);
            expect(onFocusChange).toHaveBeenLastCalledWith(
                null,
                ["numeric-input 1"],
                0,
                null,
            );
        });

        it("should focus the widget requested in focusPath()", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(itemWithMockWidget, {
                onFocusChange,
            });

            // Act
            act(() => renderer.focusPath(["mock-widget 1"]));

            // We have some async processes that need to be resolved here
            jest.runAllTimers();

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                ["mock-widget 1"],
                null,
                0,
                expect.any(Object),
            );
        });
    });

    describe("state serialization", () => {
        it("should serialize the current state", async () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...itemWithMockWidget,
                hints: [
                    {content: "Hint #1", images: {}, widgets: {}},
                    {content: "Hint #2", images: {}, widgets: {}},
                    {content: "Hint #3", images: {}, widgets: {}},
                ],
            });
            await userEvent.type(screen.getByRole("textbox"), "-42");

            // Act
            const state = renderer.getSerializedState();

            // Assert
            expect(state).toMatchInlineSnapshot(`
{
  "hints": [
    {},
    {},
    {},
  ],
  "question": {
    "mock-widget 1": {
      "alignment": "default",
      "currentValue": "-42",
      "static": undefined,
      "value": "3",
    },
  },
}
`);
        });
    });

    describe("content editing", () => {
        it("shouldn't show linting errors when highlightLint is false", () => {
            // Arrange and Act
            renderQuestion(itemWithLintingError, undefined, {
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            });

            expect(
                screen.queryByText("Don't use level-1 headings", {
                    exact: false,
                }),
            ).not.toBeInTheDocument();
        });

        it("should show linting errors when highlightLint is true", () => {
            // Arrange and Act
            renderQuestion(itemWithLintingError, undefined, {
                linterContext: {
                    contentType: "exercise",
                    highlightLint: true,
                    paths: [],
                    stack: [],
                },
            });

            expect(
                screen.getByText("Don't use level-1 headings", {exact: false}),
            ).toBeInTheDocument();
        });
    });

    describe("answerless to answerful", () => {
        function getItemWithMultipleChoice(): PerseusItem {
            const question = generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: {
                            multipleSelect: true,
                            numCorrect: 2,
                            choices: [
                                {
                                    rationale: "Rationale 1",
                                    content: "Wrong 1",
                                    correct: false,
                                    id: "10-10-10-10-10",
                                },
                                {
                                    rationale: "Rationale 2",
                                    content: "Right 1",
                                    correct: true,
                                    id: "11-11-11-11-11",
                                },
                                {
                                    rationale: "Rationale 3",
                                    content: "Wrong 2",
                                    correct: false,
                                    id: "12-12-12-12-12",
                                },
                                {
                                    rationale: "Rationale 4",
                                    content: "Right 2",
                                    correct: true,
                                    id: "13-13-13-13-13",
                                },
                            ],
                        },
                    }),
                },
            });

            return generateTestPerseusItem({question});
        }

        it("can transition between answerless and answerful data correctly", async () => {
            const answerful = getItemWithMultipleChoice();
            const answerless = splitPerseusItem(answerful);

            // render starting with answerless data
            const {renderer, rerender} = renderQuestion(answerless);

            // select the right answer
            await userEvent.click(
                screen.getByRole("checkbox", {name: "(Choice B) Right 1"}),
            );
            await userEvent.click(
                screen.getByRole("checkbox", {name: "(Choice D) Right 2"}),
            );

            // assert choices are in the correct state
            expect(
                screen.getByRole("checkbox", {
                    name: "(Choice A) Wrong 1",
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("checkbox", {
                    name: "(Choice B, Checked) Right 1",
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("checkbox", {
                    name: "(Choice C) Wrong 2",
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("checkbox", {
                    name: "(Choice D, Checked) Right 2",
                }),
            ).toBeInTheDocument();

            // score user input
            const userInput = renderer.getUserInput();
            const score = scorePerseusItem(answerful.question, userInput, "en");
            expect(score).toEqual({
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            });

            // rerender with answerful data post-attempt
            rerender(answerful, undefined, {score, showSolutions: "all"});

            // make sure we're showing the answers as expected
            expect(
                screen.getByRole("checkbox", {
                    name: "(Choice A, Incorrect) Wrong 1",
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("checkbox", {
                    name: "(Choice B, Checked, Correct) Right 1",
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("checkbox", {
                    name: "(Choice C, Incorrect) Wrong 2",
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("checkbox", {
                    name: "(Choice D, Checked, Correct) Right 2",
                }),
            ).toBeInTheDocument();

            // make sure we're showing rationales
            for (let i = 1; i <= 4; i++) {
                expect(screen.getByText(`Rationale ${i}`)).toBeInTheDocument();
            }
        });
    });
});
