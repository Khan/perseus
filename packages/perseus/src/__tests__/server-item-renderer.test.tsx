import {
    generateRadioChoice,
    generateSimpleRadioItem,
    splitPerseusItem,
    type PerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen, act, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {
    itemWithNumericInput,
    itemWithLintingError,
    itemWithRadioAndExpressionWidgets,
    itemWithTwoMockWidgets,
    itemWithMockWidget,
    itemWithMath,
    itemWithTable,
} from "../__testdata__/server-item-renderer.testdata";
import {ENTRANCE_TRANSITION_DURATION_MS} from "../components/zoomable";
import * as Dependencies from "../dependencies";
import LoadingContext from "../loading-context";
import ServerItemRenderer from "../server-item-renderer";
import {
    testDependencies,
    testDependenciesV2,
} from "../testing/test-dependencies";
import {registerWidget} from "../widgets";
import {MockWidget} from "../widgets/mock-widgets";
import MockAssetLoadingWidgetExport, {
    mockedAssetItem,
} from "../widgets/mock-widgets/mock-asset-loading-widget";

import {renderQuestion} from "./test-utils";

import type {ServerItemRendererHandle} from "../server-item-renderer";
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
        const {container} = renderQuestion(
            itemWithRadioAndExpressionWidgets,
            Object.freeze({}),
            {
                showSolutions: "all",
            },
        );

        // Assert
        expect(
            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            container.querySelectorAll('[id$="-rationale"]'),
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
        let renderer: ServerItemRendererHandle | null | undefined;
        const {rerender} = render(
            <LoadingContext.Provider value={{onRendered}}>
                <RenderStateRoot>
                    <ServerItemRenderer
                        ref={(component) => (renderer = component)}
                        item={mockedAssetItem}
                        problemNum={0}
                        reviewMode={false}
                        dependencies={testDependenciesV2}
                    />
                </RenderStateRoot>
            </LoadingContext.Provider>,
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
            <LoadingContext.Provider value={{onRendered}}>
                <RenderStateRoot>
                    <ServerItemRenderer
                        item={mockedAssetItem}
                        problemNum={1}
                        reviewMode={false}
                        dependencies={testDependenciesV2}
                    />
                </RenderStateRoot>
            </LoadingContext.Provider>,
        );

        // Act
        // setAssetStatus() is not part of the Widget interface, it's specific
        // this test.
        // eslint-disable-next-line no-restricted-syntax
        const widget = mockedWidget as MockAssetLoadingWidget;
        act(() => widget.setAssetStatus?.("ABC", true));

        // Assert
        expect(onRendered).toHaveBeenCalledWith(true);
    });

    it("does not call the onRendered callback while math is still rendering", () => {
        // Arrange
        // This TeX never reports rendering, standing in for math that MathJax
        // hasn't finished with yet.
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({children}: {children: React.ReactNode}) => (
                <span className="mock-TeX">{children}</span>
            ),
        });

        const onRendered = jest.fn();

        // Act
        render(
            <LoadingContext.Provider value={{onRendered}}>
                <RenderStateRoot>
                    <ServerItemRenderer
                        item={itemWithMath}
                        problemNum={0}
                        reviewMode={false}
                        dependencies={testDependenciesV2}
                    />
                </RenderStateRoot>
            </LoadingContext.Provider>,
        );

        // Assert
        expect(onRendered).not.toHaveBeenCalled();
    });

    it("calls onRendered only once when an asset settles during mount", () => {
        // Arrange
        // `useLayoutEffect` fires in the same commit phase as a class
        // component's `componentDidMount`, and React commits children before
        // parents — so this TeX settles its asset before ServerItemRenderer
        // has mounted, which is the case we're covering. (`useEffect` runs
        // after paint, so it would land after `componentDidMount` instead.)
        // https://legacy.reactjs.org/docs/hooks-reference.html#uselayouteffect
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({
                children,
                onRender,
            }: {
                children: React.ReactNode;
                onRender?: () => void;
            }) => {
                React.useLayoutEffect(() => onRender?.(), [onRender]);
                return <span className="mock-TeX">{children}</span>;
            },
        });
        const onRendered = jest.fn();

        // Act
        render(
            <LoadingContext.Provider value={{onRendered}}>
                <RenderStateRoot>
                    <ServerItemRenderer
                        item={itemWithMath}
                        problemNum={0}
                        reviewMode={false}
                        dependencies={testDependenciesV2}
                    />
                </RenderStateRoot>
            </LoadingContext.Provider>,
        );

        // Assert
        expect(onRendered).toHaveBeenCalledTimes(1);
        expect(onRendered).toHaveBeenCalledWith(true);
    });

    it("does not call the onRendered callback until zoomable math has settled", async () => {
        // Arrange
        // The default test TeX never fires onRender, so we need one that does
        // in order to get the Zoomable measuring.
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({
                children,
                onRender,
            }: {
                children: React.ReactNode;
                onRender?: () => void;
            }) => {
                React.useEffect(() => onRender?.(), [onRender]);
                return <span className="mock-TeX">{children}</span>;
            },
        });

        const onRendered = jest.fn();

        // Act
        render(
            <LoadingContext.Provider value={{onRendered}}>
                <RenderStateRoot>
                    <ServerItemRenderer
                        item={itemWithMath}
                        problemNum={0}
                        reviewMode={false}
                        apiOptions={{isMobile: true}}
                        dependencies={testDependenciesV2}
                    />
                </RenderStateRoot>
            </LoadingContext.Provider>,
        );

        // Assert
        // On mobile, block math is wrapped in a Zoomable, which renders
        // asynchronously in order to measure and scale the math after MathJax
        // has rendered it. waitFor moves the fake clock along between checks,
        // so we don't have to know how many passes that takes.
        await waitFor(() => expect(onRendered).toHaveBeenCalledWith(true));
    });

    it("does not call the onRendered callback until a zoomable table has settled", async () => {
        // On mobile, tables are wrapped in a Zoomable too, with the entrance
        // animation left enabled — so settling takes the measuring passes plus
        // the length of that animation.

        // Arrange
        const onRendered = jest.fn();

        // Act
        render(
            <LoadingContext.Provider value={{onRendered}}>
                <RenderStateRoot>
                    <ServerItemRenderer
                        item={itemWithTable}
                        problemNum={0}
                        reviewMode={false}
                        apiOptions={{isMobile: true}}
                        dependencies={testDependenciesV2}
                    />
                </RenderStateRoot>
            </LoadingContext.Provider>,
        );

        // Assert
        // Guard against the content silently not parsing as a table, which
        // would skip the Zoomable entirely and make this test vacuous.
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(onRendered).not.toHaveBeenCalled();

        // Measuring finishes and the content starts fading in. Waiting on the
        // DOM here, rather than flushing timers a set number of times, is what
        // gives us a reliable point to measure the animation from.
        await waitFor(() => expect(screen.getByRole("table")).toBeVisible());
        expect(onRendered).not.toHaveBeenCalled();

        // The entrance animation is running now, so we're still not settled.
        act(() =>
            jest.advanceTimersByTime(ENTRANCE_TRANSITION_DURATION_MS - 1),
        );
        expect(onRendered).not.toHaveBeenCalled();

        // Now wait for the animation to complete
        act(() => jest.advanceTimersByTime(2));
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
                calculatorVariant: undefined,
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
            <LoadingContext.Provider value={{onRendered}}>
                <RenderStateRoot>
                    <ServerItemRenderer
                        item={content}
                        problemNum={0}
                        reviewMode={false}
                        dependencies={testDependenciesV2}
                    />
                </RenderStateRoot>
            </LoadingContext.Provider>,
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
                // eslint-disable-next-line no-restricted-syntax
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
                // eslint-disable-next-line no-restricted-syntax
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
            expect(state).toEqual({
                hints: [{}, {}, {}],
                question: {
                    "mock-widget 1": {
                        alignment: "default",
                        currentValue: "-42",
                        static: false,
                        value: "3",
                    },
                },
            });
        });
    });

    describe("content editing", () => {
        it("shouldn't show linting errors when highlightLint is false", () => {
            // Arrange and Act
            renderQuestion(itemWithLintingError, undefined, {
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
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
            return generateSimpleRadioItem({
                multipleSelect: true,
                numCorrect: 2,
                choices: [
                    generateRadioChoice("Wrong 1", {
                        rationale: "Rationale 1",
                    }),
                    generateRadioChoice("Right 1", {
                        correct: true,
                        rationale: "Rationale 2",
                    }),
                    generateRadioChoice("Wrong 2", {
                        rationale: "Rationale 3",
                    }),
                    generateRadioChoice("Right 2", {
                        correct: true,
                        rationale: "Rationale 4",
                    }),
                ],
            });
        }

        it("can transition between answerless and answerful data correctly", async () => {
            const answerful = getItemWithMultipleChoice();
            const answerless = splitPerseusItem(answerful);

            // render starting with answerless data
            const {renderer, rerender} = renderQuestion(answerless);

            // select the right answer
            await userEvent.click(
                screen.getByRole("button", {name: /(Choice B)/}),
            );
            await userEvent.click(
                screen.getByRole("button", {name: /(Choice D)/}),
            );

            // assert choices are in the correct state
            expect(
                screen.getByRole("button", {
                    name: /(Choice A)/,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", {
                    name: /(Choice B)/,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", {
                    name: /(Choice C)/,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", {
                    name: /(Choice D)/,
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
                widgetScores: {
                    "radio 1": {
                        type: "points",
                        total: 1,
                        earned: 1,
                        message: null,
                    },
                },
            });

            // rerender with answerful data post-attempt
            rerender(answerful, undefined, {score, showSolutions: "all"});

            // make sure we're showing the answers as expected
            expect(
                screen.getByRole("button", {
                    name: /(Choice A)/,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", {
                    name: /(Choice B)/,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", {
                    name: /(Choice C)/,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", {
                    name: /(Choice D)/,
                }),
            ).toBeInTheDocument();

            // make sure we're showing rationales
            for (let i = 1; i <= 4; i++) {
                expect(screen.getByText(`Rationale ${i}`)).toBeInTheDocument();
            }
        });
    });
});
