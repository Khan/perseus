/**
 * A single function used to scroll a DOM node into view, optionally taking into
 * account that it may be obscured by the custom keypad. The logic makes the
 * strong assumption that the keypad will be anchored to the bottom of the page
 * in calculating its height, as this method may be called before the keypad has
 * animated into view.
 */

// HACK(charlie): This should be injected by webapp somehow.
// TODO(charlie): Add a link to the khan/frontend location as soon as the
// footer has settled down.
const toolbarHeightPx = 60;

export const scrollIntoView = (containerNode, keypadNode) => {
    const containerBounds = containerNode.getBoundingClientRect();
    const containerBottomPx = containerBounds.bottom;
    const containerTopPx = containerBounds.top;

    // Get the element that scrolls the document.
    const scrollNode = document.scrollingElement;

    const desiredMarginPx = 16;

    if (keypadNode) {
        // NOTE(charlie): We can't use the bounding rect of the keypad,
        // as it is likely in the process of animating in. Instead, to
        // calculate its top, we make the strong assumption that the
        // keypad will end up anchored at the bottom of the page, but above the
        // toolbar, and use its height, which is known at this point. Note that,
        // in the native apps (where the toolbar is rendered natively), this
        // will result in us leaving excess space between the input and the
        // keypad, but that seems okay.
        const pageHeightPx = window.innerHeight;
        const keypadHeightPx = keypadNode.clientHeight;
        const keypadTopPx = pageHeightPx - (keypadHeightPx + toolbarHeightPx);

        if (containerBottomPx > keypadTopPx) {
            // If the input would be obscured by the keypad, scroll such that
            // the bottom of the input is just above the top of the keypad,
            // taking care not to scroll the input out of view.
            const scrollOffset = Math.min(
                containerBottomPx - keypadTopPx + desiredMarginPx,
                containerTopPx,
            );

            if (scrollNode) {
                scrollNode.scrollTop += scrollOffset;
            }
            return;
        }
    }

    // Alternatively, if the input is out of the viewport or nearly out
    // of the viewport, scroll it into view. We can do this regardless
    // of whether the keypad has been provided.
    if (scrollNode && containerTopPx < desiredMarginPx) {
        scrollNode.scrollTop -= containerBounds.height + desiredMarginPx;
    }
};
