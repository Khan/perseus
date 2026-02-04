import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./explanation.testdata";

import type {PerseusDependenciesV2} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

describe("Explanation", function () {
    let userEvent: UserEvent;

    // NOTE: Since the visibility of an element is controlled by CSS,
    //          the only way that we can verify in RTL that an element is visible or not (expanded/collapsed)
    //          is by checking the classes that are applied to the wrapper of that element.
    //       Therefore, we are checking the wrapper element by its data-testid instead of the normal
    //          getByRole or getByText functions.
    //       The same is true for the animation tests found in this file.

    const verifyExpandCollapseState = (
        buttonText: string,
        isExpanded: boolean,
    ) => {
        // Widget Button state
        const widgetButton = screen.getByRole("button", {name: buttonText});
        expect(widgetButton).toHaveAttribute(
            "aria-expanded",
            String(isExpanded),
        );

        // Content container state
        const contentContainer = screen.getByTestId("content-container");
        expect(contentContainer).toHaveAttribute(
            "aria-hidden",
            String(!isExpanded),
        );

        const expectedClass = isExpanded
            ? "content-expanded"
            : "content-collapsed";
        expect(contentContainer.className).toContain(expectedClass);

        const excludedClass = isExpanded
            ? "content-collapsed"
            : "content-expanded";
        expect(contentContainer.className).not.toContain(excludedClass);
    };

    const getMatchMediaMockFn = (doesMatch: boolean, mediaQuery?: string) => {
        return (query) => ({
            matches: (mediaQuery ?? query) === query ? doesMatch : !doesMatch,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        });
    };

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot when expanded", async () => {
        // Arrange
        const {container} = renderQuestion(question1);

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        // The only real difference between expanded and not expanded is the
        //     classes and aria that are applied.
        expect(container).toMatchSnapshot("expanded");
    });

    it("should send analytics when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Arrange and Act
        renderQuestion(question1, undefined, undefined, undefined, depsV2);

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "explanation",
                widgetId: "explanation 1",
            },
        });
    });

    it("can be expanded and collapsed with a mouse click", async function () {
        // Arrange
        renderQuestion(question1);

        // Verify initial state
        verifyExpandCollapseState("Explanation", false);

        // Act - expand with a click
        await userEvent.click(
            screen.getByRole("button", {name: "Explanation"}),
        );

        // Assert - elements have attributes changed that represent an expanded state
        verifyExpandCollapseState("Hide explanation!", true);

        // Act - collapse with a click
        await userEvent.click(
            screen.getByRole("button", {name: "Hide explanation!"}),
        );

        // Assert - elements have attributes reset to represent a collapsed state
        verifyExpandCollapseState("Explanation", false);
    });

    it("can be expanded and collapsed with the keyboard - Enter key", async function () {
        // Arrange
        renderQuestion(question1);

        // Verify initial state
        verifyExpandCollapseState("Explanation", false);

        // Act - expand with the enter key
        act(() => screen.getByRole("button", {name: "Explanation"}).focus());
        await userEvent.keyboard("{Enter}");

        // Assert - elements have attributes changed that represent an expanded state
        verifyExpandCollapseState("Hide explanation!", true);

        // Act - collapse with the enter key
        act(() =>
            screen.getByRole("button", {name: "Hide explanation!"}).focus(),
        );
        await userEvent.keyboard("{Enter}");

        // Assert - elements have attributes reset to represent a collapsed state
        verifyExpandCollapseState("Explanation", false);
    });

    it("can be expanded and collapsed with the keyboard - Space bar", async function () {
        // Arrange
        renderQuestion(question1);

        // Verify initial state
        verifyExpandCollapseState("Explanation", false);

        // Act - expand with a space bar
        act(() => screen.getByRole("button", {name: "Explanation"}).focus());
        await userEvent.keyboard(" ");

        // Assert - elements have attributes changed that represent an expanded state
        verifyExpandCollapseState("Hide explanation!", true);

        // Act - collapse with a space bar
        act(() =>
            screen.getByRole("button", {name: "Hide explanation!"}).focus(),
        );
        await userEvent.keyboard(" ");

        // Assert - elements have attributes reset to represent a collapsed state
        verifyExpandCollapseState("Explanation", false);
    });

    it("uses transitions when it is expanded/collapsed", async () => {
        // Arrange
        jest.spyOn(window, "matchMedia").mockImplementation(
            getMatchMediaMockFn(
                true,
                "(prefers-reduced-motion: no-preference)",
            ),
        );
        renderQuestion(question1);

        // Act - expand
        await userEvent.click(
            screen.getByRole("button", {name: "Explanation"}),
        );

        // Assert - transition when revealing
        expect(screen.getByTestId("content-container").className).toContain(
            "transition-expanded",
        );

        // Act - collapse
        await userEvent.click(
            screen.getByRole("button", {name: "Hide explanation!"}),
        );

        // Assert - transition when concealing
        expect(screen.getByTestId("content-container").className).toContain(
            "transition-collapsed",
        );
    });

    // TODO (LEMS-3815): Remove test when legacy styles are removed
    it("does NOT use transitions when matchMedia is not available", async () => {
        const fakeWindow = Object.create(window);
        fakeWindow.matchMedia = undefined;
        jest.spyOn(window, "window", "get").mockReturnValue(fakeWindow as any);
        renderQuestion(question1);

        // Act - expand
        await userEvent.click(
            screen.getByRole("button", {name: "Explanation"}),
        );

        // Assert - don't transition when revealing
        expect(screen.getByTestId("content-container").className).not.toContain(
            "transitionExpanded",
        );
    });

    // TODO (LEMS-3815): Remove test when legacy styles are removed
    it("does NOT use transitions when the user prefers reduced motion", async () => {
        // Arrange
        jest.spyOn(window, "matchMedia").mockImplementation(
            getMatchMediaMockFn(
                false,
                "(prefers-reduced-motion: no-preference)",
            ),
        );
        renderQuestion(question1);

        // Act - expand
        await userEvent.click(
            screen.getByRole("button", {name: "Explanation"}),
        );

        // Assert - don't transition when revealing
        expect(screen.getByTestId("content-container").className).not.toContain(
            "transitionExpanded",
        );

        // Act - collapse
        await userEvent.click(
            screen.getByRole("button", {name: "Hide explanation!"}),
        );

        // Assert - don't transition when concealing
        expect(screen.getByTestId("content-container").className).not.toContain(
            "transitionCollapsed",
        );
    });
});
