import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import type {PerseusDependenciesV2} from "../../types";
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
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Arrange and Act
        renderQuestion(question, undefined, undefined, undefined, depsV2);

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

    // TODO(eshmoel, AX-2216): unskip tests once @jandrade completes work to enable Tab off.
    it.skip("should close the popover when we Tab off the close button", async () => {
        // Arrange
        renderQuestion(question);

        // Act - Open the popover
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Verify popover is open
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();

        // Tab off the close button
        await userEvent.tab();

        // Assert - Popover should be closed
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    // TODO(eshmoel, AX-2216): unskip tests once @jandrade completes work to enable Tab off.
    it.skip("should close the popover when we Shift + Tab from the close button", async () => {
        // Arrange
        renderQuestion(question);

        // Act - Open the popover
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Verify popover is open
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();

        // Shift + Tab off the close button (tab backwards)
        await userEvent.tab({shift: true});

        // Assert - Popover should be closed
        expect(screen.queryByRole("dialog")).toBeNull();
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
