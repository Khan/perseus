import {
    generateMatcherOptions,
    generateMatcherWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {act, screen, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {renderQuestion} from "../../__testutils__/render-question";
import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import {wait} from "../../testing/wait";
import {scorePerseusItemTesting} from "../../util/scoring.testutils";

import {question1} from "./matcher.testdata";

import type {MatcherHandle} from "./matcher";
import type {APIOptions} from "../../types";

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
        const {container} = renderQuestion(question1, {apiOptions});
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
        const {container} = renderQuestion(question1, {apiOptions});
        await wait();

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("should send analytics event when widget is rendered", async () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const dependencies = {
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(question1, {dependencies});
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
        const {container, renderer} = renderQuestion(question1, {apiOptions});
        await wait();

        // Act
        const matcher: MatcherHandle = renderer.findWidgets("matcher 1")[0];

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

    describe("disabled state", () => {
        function generateMatcherRenderer({isStatic}: {isStatic: boolean}) {
            return generateTestPerseusRenderer({
                content: "[[☃ matcher 1]]",
                widgets: {
                    "matcher 1": generateMatcherWidget({
                        static: isStatic,
                        options: generateMatcherOptions({
                            orderMatters: true,
                            left: ["One", "Two"],
                            right: ["Uno", "Dos"],
                        }),
                    }),
                },
            });
        }

        const columns = [
            {side: "left", columnIndex: 0, optionText: "One"},
            {side: "right", columnIndex: 1, optionText: "Uno"},
        ];

        // Starting a drag adds a placeholder item to the dragged card's
        // column, so the column's item count shows whether a drag began.
        function getColumnItems(columnIndex: number): HTMLElement[] {
            const column = screen.getAllByRole("list")[columnIndex];
            return within(column).getAllByRole("listitem");
        }

        // Presses the mouse button on a card without releasing it. Sortable
        // starts a drag in a requestAnimationFrame callback, so this also
        // waits long enough for that frame to run.
        async function startDragging(optionText: string) {
            await userEventLib.pointer({
                keys: "[MouseLeft>]",
                target: screen.getByText(optionText),
            });
            await act(() => wait({delay: 50}));
        }

        it.each(columns)(
            "starts dragging a card in the $side column when interactive",
            async ({columnIndex, optionText}) => {
                // Arrange
                renderQuestion(generateMatcherRenderer({isStatic: false}), {
                    apiOptions: {readOnly: false},
                });
                await wait();

                // Act
                await startDragging(optionText);

                // Assert
                expect(getColumnItems(columnIndex)).toHaveLength(3);
            },
        );

        describe.each([
            {name: "static", isStatic: true, readOnly: false},
            {name: "read-only", isStatic: false, readOnly: true},
        ])("when $name", ({isStatic, readOnly}) => {
            it.each(columns)(
                "does not start dragging a card in the $side column",
                async ({columnIndex, optionText}) => {
                    // Arrange
                    renderQuestion(generateMatcherRenderer({isStatic}), {
                        apiOptions: {readOnly},
                    });
                    await wait();

                    // Act
                    await startDragging(optionText);

                    // Assert
                    expect(getColumnItems(columnIndex)).toHaveLength(2);
                },
            );
        });
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
            const matcher: MatcherHandle = renderer.findWidgets("matcher 1")[0];

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
            const matcher: MatcherHandle = renderer.findWidgets("matcher 1")[0];

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
