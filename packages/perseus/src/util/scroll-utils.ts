/**
 * A small collection of useful scrolling utility functions.
 */

// Polyfill scrollTo if it doesn't exist
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (typeof HTMLElement !== "undefined" && !HTMLElement.prototype.scrollTo) {
    // @ts-expect-error - TS2322 - Type '(left: number, top: any) => void' is not assignable to type '{ (options?: ScrollToOptions | undefined): void; (x: number, y: number): void; }'.
    HTMLElement.prototype.scrollTo = function (left, top: any) {
        this.scrollLeft = left;
        this.scrollTop = top;
    };
}

/**
 * Handles applying a given scroll object to either the window object,
 * or an HTML element.
 * NOTE: SIDE EFFECTS. This method touches the DOM.
 */
const applyUniversalScrollOffset = (
    elementOrWindow: HTMLElement | WindowProxy,
    amount: number,
) => {
    // Window objects need to be scrolled by using the `.scrollTo()` function.
    // Elements in MODERN browsers also have this method, but a safer x-browser
    // solution is to use the `.scrollTop` property setter.
    if (typeof elementOrWindow.scrollTo === "function") {
        elementOrWindow.scrollTo(0, amount);
    } else if ("scrollTop" in elementOrWindow) {
        elementOrWindow.scrollTop = amount;
    }
};

/**
 * Smoothly scroll the given element to the given offset.
 *
 * This assumes that element.scrollHeight > element.clientHeight.
 */
const scrollElementToOffset = (
    elementOrWindow: HTMLElement | WindowProxy,
    offset: number,
    duration = 0,
    callback?: any,
) => {
    const startPosition =
        elementOrWindow === window
            ? window.pageYOffset
            : // @ts-expect-error - TS2551 - Property 'scrollTop' does not exist on type 'HTMLElement | Window'. Did you mean 'scrollTo'?
              elementOrWindow.scrollTop;
    const endPosition = offset;
    const scrollDistance = endPosition - startPosition;

    // Aim for ~60 FPS
    const tickLength = 17;
    const numberOfSteps = duration / tickLength;
    let step = 0;

    // TODO (josh): Rewrite this using window.requestAnimationFrame
    // TODO(jeff, WEB-1378): Use Wonder Blocks Timing API
    // eslint-disable-next-line no-restricted-syntax
    const scrollInterval = setInterval(function () {
        if (step < numberOfSteps) {
            const x = step / numberOfSteps; // Domain: [0, 1]
            const y = (-Math.cos(Math.PI * x) + 1) / 2; // Range: [0, 1]

            const newPosition = startPosition + scrollDistance * y;
            applyUniversalScrollOffset(elementOrWindow, newPosition);

            step += 1;
        } else {
            // Account for non-integer numberOfSteps
            applyUniversalScrollOffset(elementOrWindow, endPosition);

            // TODO(jeff, WEB-1378): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            clearInterval(scrollInterval);
            callback?.();
        }
    }, tickLength);
};

/**
 * Returns the closest ancestor that is scrollable.
 *
 * If the container is document.body we return window b/c scrollTo() doesn't
 * work on document.body in some browsers.
 */
const getScrollContainer = (element?: Element | null): any | Element => {
    if (element === document.body) {
        return window;
    }
    if (element == null) {
        return window;
    }
    if (element.scrollHeight > element.clientHeight) {
        return element;
    }
    return getScrollContainer(element.parentElement);
};

const SCROLL_ANIMATION_DURATION = 750; // ms

/**
 * Scroll the given element into view.
 *
 * This works with elements inside scroll containers, but may fail in scenarios
 * involving multiple nested scroll containers.
 */
export const scrollElementIntoView = (element: Element, callback?: any) => {
    // Often times we scroll an element into with in reaction to some change in
    // the DOM.  Since we need to measure things, we wait a tick for the DOM to
    // settle before computing the distance to scroll and beginning the scroll
    // animation.
    // TODO(jeff, WEB-1378): Use Wonder Blocks Timing API
    // eslint-disable-next-line no-restricted-syntax
    setTimeout(() => {
        const scrollContainer = getScrollContainer(element);

        const childBounds = element.getBoundingClientRect();
        const containerBounds =
            scrollContainer === window
                ? {
                      top: 0,
                      bottom: window.innerHeight,
                  }
                : scrollContainer.getBoundingClientRect();

        let offset = 0;
        const currentScrollTop =
            scrollContainer === window
                ? window.scrollY
                : scrollContainer.scrollTop;

        if (childBounds.bottom > containerBounds.bottom) {
            let distanceToScroll = childBounds.bottom - containerBounds.bottom;

            // Ensure that we see the top of the component we're scrolling.
            if (childBounds.top + distanceToScroll < containerBounds.top) {
                distanceToScroll = childBounds.top - containerBounds.top;
            }

            offset = currentScrollTop + distanceToScroll;
        } else if (childBounds.top < containerBounds.top) {
            const distanceToScroll = childBounds.top - containerBounds.top;

            offset = currentScrollTop + distanceToScroll;
        }

        scrollElementToOffset(
            scrollContainer,
            offset,
            SCROLL_ANIMATION_DURATION,
            callback,
        );
    }, 0);
};
