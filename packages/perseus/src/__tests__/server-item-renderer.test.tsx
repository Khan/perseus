import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {within, render, screen, act} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../testing/test-dependencies";
import {
    itemWithInput,
    itemWithLintingError,
    itemWithNumericAndNumberInputs,
    itemWithRadioAndExpressionWidgets,
    definitionItem,
} from "../__testdata__/server-item-renderer.testdata";
import * as Dependencies from "../dependencies";
import WrappedServerItemRenderer, {
    ServerItemRenderer,
} from "../server-item-renderer";
import {registerWidget} from "../widgets";
import InputNumberExport from "../widgets/input-number/input-number";
import RadioWidgetExport from "../widgets/radio";

import MockAssetLoadingWidgetExport, {
    mockedAssetItem,
} from "./mock-asset-loading-widget";

import type {MockAssetLoadingWidget} from "./mock-asset-loading-widget";
import type {APIOptions} from "../types";
import type {KeypadAPI} from "@khanacademy/math-input";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {UserEvent} from "@testing-library/user-event";

// This looks alot like `widgets/__tests__/renderQuestion.jsx', except we use
// the ServerItemRenderer instead of Renderer
const renderQuestion = (
    question: PerseusItem,
    apiOptions: APIOptions = Object.freeze({}),
    optionalProps: Partial<
        PropsFor<typeof WrappedServerItemRenderer>
    > = Object.freeze({}),
): {
    container: HTMLElement;
    renderer: ServerItemRenderer;
} => {
    let renderer: ServerItemRenderer | null = null;

    const {container} = render(
        <RenderStateRoot>
            <WrappedServerItemRenderer
                ref={(node) => (renderer = node)}
                apiOptions={apiOptions}
                item={question}
                problemNum={0}
                reviewMode={false}
                dependencies={testDependenciesV2}
                {...optionalProps}
            />
        </RenderStateRoot>,
    );
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    return {container, renderer};
};

describe("server item renderer", () => {
    beforeAll(() => {
        // TODO(LEMS-2656): remove TS suppression
        // @ts-expect-error: InputNumberExport is not assignable to type WidgetExports
        registerWidget("input-number", InputNumberExport);
        // TODO(LEMS-2656): remove TS suppression
        // @ts-expect-error: RadioWidgetExport is not assignable to type WidgetExports
        registerWidget("radio", RadioWidgetExport);
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
            ...itemWithInput,
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
        renderQuestion(itemWithInput);

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
        renderQuestion(itemWithNumericAndNumberInputs, {
            interactionCallback,
        });

        // Act
        const inputs = screen.getAllByRole("textbox");
        await userEvent.type(inputs[0], "1");
        await userEvent.type(inputs[1], "2");
        act(() => jest.runOnlyPendingTimers()); // Renderer uses setTimeout setting widget props

        // Assert
        expect(interactionCallback).toHaveBeenCalledWith({
            "input-number 1": {currentValue: "1"},
            "numeric-input 1": {currentValue: "2"},
        });
    });

    it("should return the DOM node for the requested focus path", async () => {
        // Arrange
        const {renderer} = renderQuestion(itemWithInput);

        // Act
        const node = renderer.getDOMNodeForPath(["input-number 1"]);

        // Assert
        // @ts-expect-error - TS2345 - Argument of type 'Element | Text | null | undefined' is not assignable to parameter of type 'HTMLElement'.
        expect(await within(node).findAllByRole("textbox")).toHaveLength(1);
    });

    it("should return the number of hints available", () => {
        // Arrange
        const {renderer} = renderQuestion({
            ...itemWithInput,
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
        const {renderer} = renderQuestion(definitionItem);

        // Act
        const widgetIds = renderer.getWidgetIds();

        // Assert
        expect(widgetIds).toStrictEqual([
            "definition 1",
            "definition 2",
            "definition 3",
            "definition 4",
        ]);
    });

    it("should call the answerable callback when no widgets are empty", async () => {
        // Arrange
        const answerableCallback = jest.fn();
        const {rerender} = render(
            <RenderStateRoot>
                <ServerItemRenderer
                    apiOptions={{
                        answerableCallback,
                    }}
                    item={itemWithInput}
                    problemNum={0}
                    reviewMode={false}
                    dependencies={testDependenciesV2}
                />
            </RenderStateRoot>,
        );
        await userEvent.type(screen.getByRole("textbox"), "-42");

        // Act
        rerender(
            <RenderStateRoot>
                <ServerItemRenderer
                    apiOptions={{
                        answerableCallback,
                    }}
                    item={itemWithInput}
                    problemNum={1} // to force componentDidUpdate
                    reviewMode={false}
                    dependencies={testDependenciesV2}
                />
                ,
            </RenderStateRoot>,
        );

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

    it("should get prompt JSON with the correct content and widgets", () => {
        const {renderer} = renderQuestion(itemWithRadioAndExpressionWidgets);

        const json = renderer.getPromptJSON();

        expect(json.content).toBe(
            itemWithRadioAndExpressionWidgets.question.content,
        );

        const widgetKeys = Object.keys(
            itemWithRadioAndExpressionWidgets.question.widgets,
        );

        expect(Object.keys(json.widgets)).toEqual(widgetKeys);
    });

    describe("focus management", () => {
        it("calls onFocusChange when focusing the renderer", async () => {
            // Arranged
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(itemWithInput, {
                onFocusChange,
            });

            // Act
            const gotFocus = await act(() => renderer.focus());

            // We have some async processes that need to be resolved here
            jest.runAllTimers();

            // Assert
            expect(gotFocus).toBe(true);
            expect(onFocusChange).toHaveBeenCalledWith(
                ["input-number 1"],
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
                itemWithInput,
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
                ["input-number 1"],
                null,
                250,
                expect.any(Object),
            );
        });

        it("calls onFocusChange when blurring the renderer", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(itemWithInput, {
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
                ["input-number 1"],
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
                itemWithInput,
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
                ["input-number 1"],
                0,
                null,
            );
        });

        it("should focus the widget requested in focusPath()", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(itemWithInput, {
                onFocusChange,
            });

            // Act
            act(() => renderer.focusPath(["input-number 1"]));

            // We have some async processes that need to be resolved here
            jest.runAllTimers();

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                ["input-number 1"],
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
                ...itemWithInput,
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
                    "input-number 1": {
                      "answerType": "number",
                      "currentValue": "-42",
                      "rightAlign": undefined,
                      "simplify": "required",
                      "size": "normal",
                    },
                  },
                }
            `);
        });

        it("should restore serialized state", () => {
            // Arrange
            const callback = jest.fn();
            const {renderer} = renderQuestion(itemWithInput);

            // Act
            act(() =>
                renderer.restoreSerializedState(
                    {
                        hints: [{}, {}, {}],
                        question: {
                            "input-number 1": {
                                answerType: "number",
                                currentValue: "-42",
                                rightAlign: undefined,
                                simplify: "required",
                                size: "normal",
                            },
                        },
                    },
                    callback,
                ),
            );
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(callback).toHaveBeenCalled();
            expect(screen.getByRole("textbox")).toHaveValue("-42");
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
});
