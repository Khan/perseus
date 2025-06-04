import {render, screen, act} from "@testing-library/react";
import * as React from "react";

import {mockStrings} from "../strings";

import ScrollableView from "./scrollable-view";

// Mock strings for testing
jest.mock("./i18n-context", () => ({
    usePerseusI18n: () => ({
        strings: {
            scrollAnswers: mockStrings.scrollAnswers,
            scrollStart: mockStrings.scrollStart,
            scrollEnd: mockStrings.scrollEnd,
        },
    }),
}));

// Helper to check if a button is disabled via aria-disabled
const isAriaDisabled = (element: HTMLElement): boolean =>
    element.getAttribute("aria-disabled") === "true";

// Mock scrollable element dimensions
const setupScrollableMock = (isScrollable: boolean) => {
    // Mock clientWidth, scrollWidth and other properties needed for scroll detection
    Object.defineProperties(HTMLElement.prototype, {
        clientWidth: {
            configurable: true,
            get: () => 200,
        },
        scrollWidth: {
            configurable: true,
            get: () => (isScrollable ? 400 : 200), // Make content scrollable or not
        },
        scrollLeft: {
            configurable: true,
            value: 0,
            writable: true,
        },
    });

    // Mock scrollBy with the correct type signature
    HTMLElement.prototype.scrollBy = jest.fn(function (
        this: HTMLElement,
        options?: ScrollToOptions | undefined,
    ) {
        const element = screen.getByRole("group");
        if (options !== undefined && options !== null) {
            const currentScrollLeft = (element as any).scrollLeft || 0;
            (element as any).scrollLeft =
                currentScrollLeft + (options.left || 0);
        }
    }) as any;
};

// Helper to set up a test with ScrollableView, optionally in RTL mode
const setupScrollableTest = (isRtl = false) => {
    // Set up the mock for scrollable content
    setupScrollableMock(true);

    // Set up RTL mode if requested
    if (isRtl) {
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockImplementation((element) => ({
            ...originalGetComputedStyle(element),
            direction: "rtl",
        }));
    }

    // Render the component
    render(
        <ScrollableView overflowX="auto">
            <div>
                {isRtl
                    ? "Content that overflows in RTL"
                    : "Content that overflows"}
            </div>
        </ScrollableView>,
    );

    // Get commonly used elements
    const container = screen.getByRole("group");
    // In RTL, the button positions are reversed
    const leftButton = screen.getByLabelText(
        isRtl ? mockStrings.scrollEnd : mockStrings.scrollStart,
    );
    const rightButton = screen.getByLabelText(
        isRtl ? mockStrings.scrollStart : mockStrings.scrollEnd,
    );

    return {container, leftButton, rightButton, isRtl};
};

describe("ScrollableView", () => {
    // Global afterEach to ensure cleanup of render between tests
    afterEach(() => {
        // Reset JSDOM by clearing all document content
        document.body.innerHTML = "";
        delete (HTMLElement.prototype as any).clientWidth;
        delete (HTMLElement.prototype as any).scrollWidth;
        delete (HTMLElement.prototype as any).scrollLeft;
        delete (HTMLElement.prototype as any).scrollBy;
    });

    it("renders children", () => {
        render(
            <ScrollableView overflowX="auto">
                <div data-testid="child">Test Content</div>
            </ScrollableView>,
        );

        expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("does not show scroll controls when content is not scrollable", () => {
        setupScrollableMock(false);

        render(
            <ScrollableView overflowX="auto">
                <div>Content that fits</div>
            </ScrollableView>,
        );

        expect(
            screen.queryByLabelText(mockStrings.scrollStart),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByLabelText(mockStrings.scrollEnd),
        ).not.toBeInTheDocument();
    });

    describe("when content is scrollable", () => {
        it("uses custom scroll description when provided", () => {
            setupScrollableMock(true);

            const customDescription = "Scroll to view more options";
            render(
                <ScrollableView
                    overflowX="auto"
                    scrollDescription={customDescription}
                >
                    <div>Content that overflows</div>
                </ScrollableView>,
            );

            expect(screen.getByText(customDescription)).toBeInTheDocument();
        });

        it("uses default scroll description when not provided", () => {
            setupScrollableTest();

            expect(
                screen.getByText(mockStrings.scrollAnswers),
            ).toBeInTheDocument();
        });

        it("shows scroll controls when content is scrollable", () => {
            const {leftButton, rightButton} = setupScrollableTest();

            // Scroll buttons should be rendered
            expect(leftButton).toBeInTheDocument();
            expect(rightButton).toBeInTheDocument();

            // Initially, left button should be disabled (start of content)
            expect(isAriaDisabled(leftButton)).toBe(true);

            // Right button should be enabled (more content to scroll to)
            expect(isAriaDisabled(rightButton)).toBe(false);
        });

        it("enables both scroll buttons when in middle of scrollable content", () => {
            const {container, leftButton, rightButton} = setupScrollableTest();

            // Simulate scrolling to middle
            act(() => {
                (container as any).scrollLeft = 100;
                // Trigger scroll event
                container.dispatchEvent(new Event("scroll"));
            });

            // Now both buttons should be enabled
            expect(isAriaDisabled(leftButton)).toBe(false);
            expect(isAriaDisabled(rightButton)).toBe(false);
        });

        it("scrolls content when buttons are clicked", () => {
            const {container, leftButton, rightButton} = setupScrollableTest();

            // Click right button
            act(() => {
                rightButton.click();
            });

            // Check if scrollBy was called with correct parameters
            expect(HTMLElement.prototype.scrollBy).toHaveBeenCalledWith({
                left: 100,
                behavior: "smooth",
            });

            // Simulate scrolling to end
            act(() => {
                (container as any).scrollLeft = 200; // scrollWidth - clientWidth
                // Trigger scroll event
                container.dispatchEvent(new Event("scroll"));
            });

            // At end, right button should be disabled
            expect(isAriaDisabled(rightButton)).toBe(true);

            // Left button should be enabled
            expect(isAriaDisabled(leftButton)).toBe(false);
        });
    });

    describe("when content is scrollable in RTL mode", () => {
        afterEach(() => {
            // Only restore mocks if our test setup created RTL mocks
            jest.restoreAllMocks();
        });

        it("shows scroll controls with correct RTL button orientation", () => {
            const {rightButton, leftButton} = setupScrollableTest(true);

            // In RTL, the button behaviors are flipped:
            // - scrollStart is on the right side visually
            // - scrollEnd is on the left side visually

            // Initially, right button (scrollStart in RTL) should be disabled
            expect(isAriaDisabled(rightButton)).toBe(true);

            // Left button (scrollEnd in RTL) should be enabled
            expect(isAriaDisabled(leftButton)).toBe(false);
        });

        it("scrolls in the correct direction when buttons are clicked in RTL", () => {
            const {container, leftButton, rightButton} =
                setupScrollableTest(true);

            // Click left button (End button in RTL)
            act(() => {
                leftButton.click();
            });

            // In RTL mode, clicking "scrollEnd" (left button) should scroll -100px
            expect(HTMLElement.prototype.scrollBy).toHaveBeenCalledWith({
                left: -100,
                behavior: "smooth",
            });

            // Simulate scrolling to middle
            act(() => {
                (container as any).scrollLeft = -100; // Negative for RTL
                // Trigger scroll event
                container.dispatchEvent(new Event("scroll"));
            });

            // Now both buttons should be enabled
            expect(isAriaDisabled(rightButton)).toBe(false);
            expect(isAriaDisabled(leftButton)).toBe(false);
        });

        it("properly handles reaching the end in RTL mode", () => {
            const {container, leftButton, rightButton} =
                setupScrollableTest(true);

            // Simulate scrolling to the end in RTL (scrollLeft = -200 is the end in RTL)
            act(() => {
                (container as any).scrollLeft = -200; // Maximum negative value (scrollWidth - clientWidth)
                container.dispatchEvent(new Event("scroll"));
            });

            // Based on the actual component behavior in RTL mode:
            // Right button (scrollStart in RTL) should be enabled at the end
            expect(isAriaDisabled(rightButton)).toBe(false);

            // Left button (scrollEnd in RTL) should be disabled at the end
            expect(isAriaDisabled(leftButton)).toBe(true);
        });
    });
});
