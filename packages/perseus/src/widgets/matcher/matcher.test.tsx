import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import {wait} from "../../testing/wait";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./matcher.testdata";

import type {Matcher} from "./matcher";
import type {APIOptions, PerseusDependenciesV2} from "../../types";

describe("matcher widget", () => {
    beforeEach(() => {
        /*
        Sortable misbehaves and sets state after the component has been
        unmounted. This is existing behavior and its safer to leave the existing
        implementation and swallow the warning in tests.
        */
        jest.spyOn(console, "warn").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.useRealTimers();

        // Replace the real TeX dependency with a synchronous stub. Real TeX
        // uses MathJax, which doesn't render reliably in jsdom and would
        // leave Matcher stuck on its loading spinner (since it waits for
        // `onRender` to fire before rendering its items). The stub fulfills
        // the same contract — calling `onRender` once the component mounts —
        // so the rest of the production code thinks TeX is ready and
        // proceeds normally.
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({
                children,
                onRender: onLoad,
            }: {
                children: React.ReactNode;
                onRender?: () => unknown;
            }) => {
                React.useLayoutEffect(() => {
                    onLoad?.();
                }, [onLoad]);
                return <span className="tex-mock">{children}</span>;
            },
        });
    });

    it("should snapshot", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);
        await wait();

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", async () => {
        // Arrange
        jest.useRealTimers();

        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);
        await wait();

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should send analytics event when widget is rendered", async () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(question1, undefined, undefined, undefined, depsV2);
        await wait();

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "matcher",
                widgetId: "matcher 1",
            },
        });
    });

    it("can reorder options", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {container, renderer} = renderQuestion(question1, apiOptions);
        await wait();

        // Act
        const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

        act(() => {
            matcher.moveRightOptionToIndex(
                "Rapid escalation of greenhouse gas emissions",
                0,
            );

            matcher.moveLeftOptionToIndex(
                "Average global temperatures will rise ",
                0,
            );
        });

        // Assert
        expect(container).toMatchSnapshot("moved items");
    });

    const answerfulItem = generateTestPerseusItem({
        question: {
            content: "[[☃ matcher 1]]",
            images: {},
            widgets: {
                "matcher 1": {
                    type: "matcher",
                    options: {
                        labels: ["**English**", "**Spanish**"],
                        padding: true,
                        orderMatters: false,
                        right: ["Uno", "Dos", "Tres"],
                        left: ["One", "Two", "Three"],
                    },
                },
            },
        },
    });
    const answerlessItem = splitPerseusItem(answerfulItem);

    describe.each([
        ["answerful", answerfulItem],
        ["answerless", answerlessItem],
    ])("given an %s item", (_, {question}) => {
        it("can be answered correctly", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

            // Put the right options in the correct order by repeatedly moving
            // answers to the end of the list
            ["Uno", "Dos", "Tres"].forEach((option, index) => {
                act(() => matcher.moveRightOptionToIndex(option, index));
            });
            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItemTesting(
                answerfulItem.question,
                userInput,
            );

            // assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("can be answered incorrectly", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

            // Put the left options in reverse order
            ["Three", "Two", "One"].forEach((option, index) => {
                matcher.moveLeftOptionToIndex(option, index);
            });
            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItemTesting(
                answerfulItem.question,
                userInput,
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });

        it("is scored incorrect if the math renderer hasn't loaded yet", () => {
            // Arrange: stub the TeX renderer to never call its onRender prop,
            // which is how the matcher knows the math renderer is ready.
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
                ...testDependencies,
                TeX: () => {
                    return null;
                },
            });

            // Act
            const {renderer} = renderQuestion(question);
            const score = scorePerseusItemTesting(
                answerfulItem.question,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });
    });

    describe("AssetContext tracking", () => {
        it("marks left column stable on mount when left options are empty", () => {
            // Arrange
            const question = generateTestPerseusRenderer({
                content: "[[☃ matcher 1]]",
                widgets: {
                    "matcher 1": {
                        type: "matcher",
                        options: {
                            labels: ["", ""],
                            padding: true,
                            orderMatters: false,
                            left: [],
                            right: ["a", "b"],
                        },
                    },
                },
            });

            // Act
            const {renderer} = renderQuestion(question);
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

            // Assert
            expect(matcher._leftStable).toBe(true);
            expect(matcher._rightStable).toBe(false);
        });

        it("marks both columns stable on mount when both are empty", () => {
            // Arrange
            const question = generateTestPerseusRenderer({
                content: "[[☃ matcher 1]]",
                widgets: {
                    "matcher 1": {
                        type: "matcher",
                        options: {
                            labels: ["", ""],
                            padding: true,
                            orderMatters: false,
                            left: [],
                            right: [],
                        },
                    },
                },
            });

            // Act
            const {renderer} = renderQuestion(question);
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

            // Assert
            expect(matcher._leftStable).toBe(true);
            expect(matcher._rightStable).toBe(true);
        });

        it("does not mark sides stable on first onMeasure when heights differ from initial constraint", () => {
            // Arrange — fresh render; matcher state is leftHeight=0, rightHeight=0
            // before any measurement. currentConstraint = max(0, 0) = 0.
            const {renderer} = renderQuestion(question1);
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];
            // Force-reset stability flags (the natural cascade may have already
            // started by the time we get here).
            matcher._leftStable = false;
            matcher._rightStable = false;

            // Act — fire onMeasureLeft with a non-zero height against the zero
            // initial constraint. height (74) !== currentConstraint (0).
            act(() => {
                matcher.onMeasureLeft({heights: [74, 74, 74], widths: []});
            });

            // Assert — first cycle is not stable; the `currentConstraint > 0`
            // guard prevents premature settlement.
            expect(matcher._leftStable).toBe(false);
        });

        it("receives an asset key prefixed with 'matcher-' from the HOC", () => {
            // Arrange, Act
            const {renderer} = renderQuestion(question1);
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];

            // Assert
            expect(matcher.props.assetKey).toMatch(/^matcher-/);
        });

        it("generates a unique asset key per matcher instance", () => {
            // Arrange, Act — render the same question twice to compare keys
            // across separate Matcher instances.
            const {renderer: firstRenderer} = renderQuestion(question1);
            const firstMatcher: Matcher =
                firstRenderer.findWidgets("matcher 1")[0];
            const {renderer: secondRenderer} = renderQuestion(question1);
            const secondMatcher: Matcher =
                secondRenderer.findWidgets("matcher 1")[0];

            // Assert
            expect(firstMatcher.props.assetKey).not.toBe(
                secondMatcher.props.assetKey,
            );
        });

        it("settles the asset on unmount", () => {
            // Arrange
            const {renderer, unmount} = renderQuestion(question1);
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];
            const setAssetStatusSpy = jest.spyOn(matcher, "_setAssetStatus");

            // Act
            unmount();

            // Assert
            expect(setAssetStatusSpy).toHaveBeenCalledWith(true);
        });

        it("marks both sides stable and settles the asset when measurements match the constraint", () => {
            // Arrange — get the matcher and prep its state to simulate
            // a converged constraint (post-cycle-1).
            const {renderer} = renderQuestion(question1);
            const matcher: Matcher = renderer.findWidgets("matcher 1")[0];
            const setAssetStatusSpy = jest.spyOn(matcher, "_setAssetStatus");
            matcher._leftStable = false;
            matcher._rightStable = false;
            act(() => {
                matcher.setState({leftHeight: 74, rightHeight: 74});
            });

            // Act — fire both onMeasures with heights matching the constraint,
            // mirroring what cycle 2 of the natural cascade looks like.
            act(() => {
                matcher.onMeasureLeft({heights: [74, 74, 74], widths: []});
            });
            act(() => {
                matcher.onMeasureRight({heights: [74, 74, 74], widths: []});
            });

            // Assert — both sides now stable, settle was triggered.
            expect(matcher._leftStable).toBe(true);
            expect(matcher._rightStable).toBe(true);
            expect(setAssetStatusSpy).toHaveBeenCalledWith(true);
        });
    });
});
