import {
    generateTestPerseusItem,
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
});
