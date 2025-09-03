/* eslint-disable testing-library/no-node-access */
import {renderHook, act} from "@testing-library/react";

import {useMobileScrollDetection} from "./use-mobile-scroll-detection";

// Mock window.innerWidth for testing
const mockInnerWidth = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: width,
    });
};

// Mock document.getElementById
const mockGetElementById = (element: HTMLElement | null) => {
    jest.spyOn(document, "getElementById").mockReturnValue(element);
};

// Create a mock scrollable element
const createMockScrollElement = () => {
    const element = document.createElement("div");
    element.addEventListener = jest.fn();
    element.removeEventListener = jest.fn();
    return element;
};

describe("useMobileScrollDetection", () => {
    const scrollElementId = "test-scroll-element";

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    describe("mobile detection logic", () => {
        it("returns false on desktop (width > 767px)", () => {
            mockInnerWidth(1024);
            mockGetElementById(null);

            const {result} = renderHook(() =>
                useMobileScrollDetection(scrollElementId),
            );

            expect(result.current).toBe(false);
            expect(document.getElementById).not.toHaveBeenCalled();
        });

        it("activates on mobile (width <= 767px)", () => {
            mockInnerWidth(767);
            const mockElement = createMockScrollElement();
            mockGetElementById(mockElement);

            const {result} = renderHook(() =>
                useMobileScrollDetection(scrollElementId),
            );

            expect(result.current).toBe(false); // Initial state
            expect(document.getElementById).toHaveBeenCalledWith(
                scrollElementId,
            );
            expect(mockElement.addEventListener).toHaveBeenCalledTimes(3);
        });

        it("activates on small mobile (width < 767px)", () => {
            mockInnerWidth(375); // iPhone size
            const mockElement = createMockScrollElement();
            mockGetElementById(mockElement);

            const {result} = renderHook(() =>
                useMobileScrollDetection(scrollElementId),
            );

            expect(result.current).toBe(false); // Initial state
            expect(document.getElementById).toHaveBeenCalledWith(
                scrollElementId,
            );
            expect(mockElement.addEventListener).toHaveBeenCalledTimes(3);
        });
    });

    describe("scroll element handling", () => {
        beforeEach(() => {
            mockInnerWidth(767); // Mobile width
        });

        it("handles missing scroll element gracefully", () => {
            mockGetElementById(null);

            const {result} = renderHook(() =>
                useMobileScrollDetection(scrollElementId),
            );

            expect(result.current).toBe(false);
            expect(document.getElementById).toHaveBeenCalledWith(
                scrollElementId,
            );
        });

        it("adds correct event listeners when element exists", () => {
            const mockElement = createMockScrollElement();
            mockGetElementById(mockElement);

            renderHook(() => useMobileScrollDetection(scrollElementId));

            expect(mockElement.addEventListener).toHaveBeenCalledWith(
                "scroll",
                expect.any(Function),
                {passive: true},
            );
            expect(mockElement.addEventListener).toHaveBeenCalledWith(
                "touchend",
                expect.any(Function),
                {passive: true},
            );
            expect(mockElement.addEventListener).toHaveBeenCalledTimes(3); // 2 scroll + 1 touchend
        });
    });

    describe("scroll state management", () => {
        let mockElement: HTMLElement;
        let scrollHandlers: ((event?: Event) => void)[] = [];
        let touchEndHandler: (event?: Event) => void;

        beforeEach(() => {
            mockInnerWidth(767);
            mockElement = createMockScrollElement();
            mockGetElementById(mockElement);
            scrollHandlers = [];

            // Capture event handlers - both scroll handlers are the same in the implementation
            (mockElement.addEventListener as jest.Mock).mockImplementation(
                (event: string, handler: (event?: Event) => void) => {
                    if (event === "scroll") {
                        scrollHandlers.push(handler);
                    } else if (event === "touchend") {
                        touchEndHandler = handler;
                    }
                },
            );
        });

        it("sets isActivelyScrolling to true when scrolling", () => {
            const {result} = renderHook(() =>
                useMobileScrollDetection(scrollElementId),
            );

            expect(result.current).toBe(false);

            // Simulate scroll event - both handlers are the same, just call one
            act(() => {
                scrollHandlers[0]();
            });

            expect(result.current).toBe(true);
        });

        it("sets isActivelyScrolling to false after scroll stops with delay", () => {
            const {result} = renderHook(() =>
                useMobileScrollDetection(scrollElementId),
            );

            // Simulate scroll event - both handlers are called
            act(() => {
                scrollHandlers[0](); // handleScrollStart - sets true and clears timer
                scrollHandlers[1](); // handleScrollEnd - sets timeout to false
            });
            expect(result.current).toBe(true);

            // Advance timer by 150ms to trigger timeout
            act(() => {
                jest.advanceTimersByTime(150);
            });
            expect(result.current).toBe(false);
        });

        it("handles rapid scroll events correctly by resetting timeout", () => {
            const {result} = renderHook(() =>
                useMobileScrollDetection(scrollElementId),
            );

            // First scroll event - both handlers are called
            act(() => {
                scrollHandlers[0](); // handleScrollStart - sets true
                scrollHandlers[1](); // handleScrollEnd - starts 150ms timeout
            });
            expect(result.current).toBe(true);

            // Advance time partially
            act(() => {
                jest.advanceTimersByTime(75); // Half the timeout
            });
            expect(result.current).toBe(true); // Still true

            // Another scroll event (should reset timer)
            act(() => {
                scrollHandlers[0](); // handleScrollStart - clears old timeout
                scrollHandlers[1](); // handleScrollEnd - starts new 150ms timeout
            });
            expect(result.current).toBe(true);

            // Advance another 75ms (total 150ms from first, but only 75ms from second)
            act(() => {
                jest.advanceTimersByTime(75);
            });
            expect(result.current).toBe(true); // Still true because timer was reset

            // Complete the timeout from the second event
            act(() => {
                jest.advanceTimersByTime(75); // Total 150ms from second event
            });
            expect(result.current).toBe(false);
        });

        it("handles touchend events", () => {
            const {result} = renderHook(() =>
                useMobileScrollDetection(scrollElementId),
            );

            // Start scrolling
            act(() => {
                scrollHandlers[0]();
            });
            expect(result.current).toBe(true);

            // Touch end should trigger scroll end logic (same as scroll handler)
            act(() => {
                touchEndHandler();
                jest.advanceTimersByTime(150);
            });
            expect(result.current).toBe(false);
        });
    });
});
