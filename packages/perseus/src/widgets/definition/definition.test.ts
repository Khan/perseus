import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const question: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Read the excerpt and answer the question below. \n\nThe Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    images: {},
    widgets: {
        "definition 1": generateDefinitionWidget({
            options: generateDefinitionOptions({
                definition: "Definition text",
                togglePrompt: "the Pequots",
            }),
        }),
    },
});

describe("Definition widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should have a default snapshot", async () => {
        // Arrange & Act
        const {container} = renderQuestion(question);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const dependencies = {
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Arrange and Act
        renderQuestion(question, {dependencies});

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "definition",
                widgetId: "definition 1",
            },
        });
    });

    it("should have an open state snapshot", async () => {
        // Arrange
        const {container} = renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Assert
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(container).toMatchSnapshot("open state");
    });

    it("should display the definition on click", async () => {
        // Arrange
        renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Assert
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should display the definition on click", async () => {
        // Arrange
        renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);
        const tooltip = screen.getByRole("dialog");

        // Assert
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should show via focus on space key", async () => {
        // Arrange
        renderQuestion(question);

        // Act - Tab in to set focus
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.type(definitionAnchor, "{space}");

        // Assert
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should dismiss by a click on the x when showing", async () => {
        renderQuestion(question);

        // Act
        // Click on the anchor
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Click close, tooltip is hidden
        const close = screen.getByLabelText("Close Popover");
        await userEvent.click(close);

        // Assert
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("should not affect answerable", () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const score = scorePerseusItemTesting(
            question,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly({
            shouldHavePoints: false,
        });
    });

    describe("focus management", () => {
        beforeEach(() => {
            // Popover's focus management (floating-ui) moves focus using
            // microtasks and animation frames, which Jest's fake timers hold
            // back.
            jest.useRealTimers();
            userEvent = userEventLib.setup();
        });

        it("closes the popover when we Tab off the close button", async () => {
            // Arrange
            renderQuestion(question);

            // Act - Open the popover
            const definitionAnchor = screen.getByRole("button", {
                name: "Definition of: the Pequots",
            });
            await userEvent.click(definitionAnchor);

            // Verify popover is open
            const tooltip = screen.getByRole("dialog");
            expect(tooltip).toBeVisible();

            // Tab off the close button
            await userEvent.tab();

            // Assert - Popover should be closed
            await waitFor(() =>
                expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
            );
        });

        it("returns focus to the anchor when we Shift + Tab from the close button", async () => {
            // Arrange
            renderQuestion(question);

            // Act - Open the popover (focus lands on the close button)
            const definitionAnchor = screen.getByRole("button", {
                name: "Definition of: the Pequots",
            });
            await userEvent.click(definitionAnchor);

            // Verify popover is open
            const tooltip = screen.getByRole("dialog");
            expect(tooltip).toBeVisible();

            // Shift + Tab off the close button (tab backwards)
            await userEvent.tab({shift: true});

            // Assert - Focus moves back to the anchor and the popover stays open
            await waitFor(() => expect(definitionAnchor).toHaveFocus());
            expect(screen.getByRole("dialog")).toBeVisible();
        });

        it("closes the popover when we Shift + Tab off the anchor", async () => {
            // Arrange - A second definition before the one under test gives
            // focus somewhere to go when we Shift + Tab off its anchor.
            const questionWithTwoDefinitions: PerseusRenderer =
                generateTestPerseusRenderer({
                    content:
                        "[[\u2603 definition 1]] and [[\u2603 definition 2]]",
                    widgets: {
                        "definition 1": generateDefinitionWidget({
                            options: generateDefinitionOptions({
                                togglePrompt: "first word",
                            }),
                        }),
                        "definition 2": generateDefinitionWidget({
                            options: generateDefinitionOptions({
                                definition: "Definition text",
                                togglePrompt: "second word",
                            }),
                        }),
                    },
                });
            renderQuestion(questionWithTwoDefinitions);

            // Act - Open the popover (focus lands on the close button)
            const definitionAnchor = screen.getByRole("button", {
                name: "Definition of: second word",
            });
            await userEvent.click(definitionAnchor);

            // Verify popover is open
            const tooltip = screen.getByRole("dialog");
            expect(tooltip).toBeVisible();

            // Shift + Tab back to the anchor, then Shift + Tab off it entirely
            await userEvent.tab({shift: true});
            await waitFor(() => expect(definitionAnchor).toHaveFocus());
            await userEvent.tab({shift: true});

            // Assert - Popover should be closed
            await waitFor(() =>
                expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
            );
            expect(
                screen.getByRole("button", {name: "Definition of: first word"}),
            ).toHaveFocus();
        });
    });

    it("should close the popover when we press Escape", async () => {
        // Arrange
        renderQuestion(question);

        // Act - Open the popover
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Verify popover is open
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();

        // Press Escape
        await userEvent.keyboard("{Escape}");

        // Assert - Popover should be closed
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("should not close the popover when pressing other keys", async () => {
        // Arrange
        renderQuestion(question);

        // Act - Open the popover
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Verify popover is open
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();

        // Press various keys that should NOT close the popover
        await userEvent.keyboard("{ArrowDown}");
        expect(screen.getByRole("dialog")).toBeVisible();

        await userEvent.keyboard("{ArrowUp}");
        expect(screen.getByRole("dialog")).toBeVisible();

        // Test a regular character key
        await userEvent.keyboard("a");
        expect(screen.getByRole("dialog")).toBeVisible();

        // Assert - Popover should still be visible after all key presses
        expect(screen.getByRole("dialog")).toBeVisible();
    });
});
