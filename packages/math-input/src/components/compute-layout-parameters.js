/**
 * An algorithm for computing the appropriate layout parameters for the keypad,
 * including the size of the buttons and whether or not to render fullscreen,
 * taking into account a number of factors including the size of the screen, the
 * orientation of the screen, the presence of browser chrome, the presence of
 * other exercise-related chrome, the size of the input box, the parameters that
 * define the keypad (i.e., the number of rows, columns, and pages), and so
 * forth.
 *
 * The computations herein make some strong assumptions about the sizes of
 * various other elements and the situations under which they will be visible
 * (e.g., browser chrome). However, this is just a heuristic--it's not crucial
 * that our buttons are sized in a pixel-perfect manner, but rather, that we
 * make a balanced use of space.
 *
 * Note that one goal of the algorithm is to avoid resizing the keypad in the
 * face of dynamic browser chrome. In order to avoid that awkwardness, we tend
 * to be conservative in our measurements and make things smaller than they
 * might need to be.
 */

const {DeviceTypes, DeviceOrientations, LayoutModes} = require("../consts");
const {
    pageIndicatorHeightPx,
    toolbarHeightPx,
    navigationPadWidthPx,
    innerBorderWidthPx,
} = require("./common-style");

const minButtonHeight = 48;
const maxButtonSize = 64;
const minSpaceAboveKeypad = 32;

// These values are taken from an iPhone 5, but should be consistent with the
// iPhone 4 as well. Regardless, these are meant to be representative of the
// possible types of browser chrome that could appear in various context, rather
// than pixel-perfect for every device.
const safariNavBarWhenShrunk = 44;
const safariNavBarWhenExpanded = 64;
const safariToolbar = 44;

// In mobile Safari, the browser chrome is completely hidden in landscape,
// though a shrunken navbar and full-sized toolbar on scroll. In portrait, the
// shrunken navbar is always visible, but expands on scroll (and the toolbar
// appears as well).
const maxLandscapeBrowserChrome = safariNavBarWhenShrunk + safariToolbar;
const maxPortraitBrowserChrome =
    safariToolbar + (safariNavBarWhenExpanded - safariNavBarWhenShrunk);

// This represents the 'worst case' aspect ratio that we care about (for
// portrait layouts). It's taken from the iPhone 4. The height is computed by
// taking the height of the device and removing the persistent, shrunken navbar.
// (We don't need to account for the expanded navbar, since we include the
// difference when reserving space above the keypad.)
const worstCaseAspectRatio = 320 / (480 - safariNavBarWhenShrunk);

const computeLayoutParameters = function(
    {numColumns, numMaxVisibleRows, numPages},
    {pageWidthPx, pageHeightPx},
    {deviceOrientation, deviceType},
    {navigationPadEnabled, paginationEnabled, toolbarEnabled},
) {
    // First, compute some values that will be used in multiple computations.
    const effectiveNumColumns = paginationEnabled
        ? numColumns
        : numColumns * numPages;

    // Then, compute the button dimensions based on the provided parameters.
    let buttonDimensions;
    if (deviceType === DeviceTypes.PHONE) {
        const isLandscape = deviceOrientation === DeviceOrientations.LANDSCAPE;

        // In many cases, the browser chrome will already have been factored
        // into `pageHeightPx`. But we have no way of knowing if that's
        // the case or not. As such, we take a conservative approach and
        // assume that the chrome is _never_ included in `pageHeightPx`.
        const browserChromeHeight = isLandscape
            ? maxLandscapeBrowserChrome
            : maxPortraitBrowserChrome;

        // Count up all the space that we need to reserve on the page.
        // Namely, we need to account for:
        //  1. Space between the keypad and the top of the page.
        //  2. The presence of the exercise toolbar.
        //  3. The presence of the view pager indicator.
        //  4. Any browser chrome that may appear later.
        const reservedSpace =
            minSpaceAboveKeypad +
            browserChromeHeight +
            (toolbarEnabled ? toolbarHeightPx : 0) +
            (paginationEnabled ? pageIndicatorHeightPx : 0);

        // Next, compute the effective width and height. We can use the page
        // width as the effective width. For the height, though, we take
        // another conservative measure when in portrait by assuming that
        // the device has the worst possible aspect ratio. In other words,
        // we ignore the device height in portrait and assume the worst.
        // This prevents the keypad from changing size when browser chrome
        // appears and disappears.
        const effectiveWidth = pageWidthPx;
        const effectiveHeight = isLandscape
            ? pageHeightPx
            : pageWidthPx / worstCaseAspectRatio;
        const maxKeypadHeight = effectiveHeight - reservedSpace;

        // Finally, compute the button height and width. In computing the
        // height, accommodate for the maximum number of rows that will ever be
        // visible (since the toggling of popovers can increase the number of
        // visible rows).
        const buttonHeightPx = Math.max(
            Math.min(maxKeypadHeight / numMaxVisibleRows, maxButtonSize),
            minButtonHeight,
        );

        let buttonWidthPx;
        if (numPages > 1) {
            const effectiveNumColumns = paginationEnabled
                ? numColumns
                : numColumns * numPages;
            buttonWidthPx = effectiveWidth / effectiveNumColumns;
        } else {
            buttonWidthPx = isLandscape
                ? maxButtonSize
                : effectiveWidth / numColumns;
        }

        buttonDimensions = {
            widthPx: buttonWidthPx,
            heightPx: buttonHeightPx,
        };
    } else if (deviceType === DeviceTypes.TABLET) {
        buttonDimensions = {
            widthPx: maxButtonSize,
            heightPx: maxButtonSize,
        };
    } else {
        throw new Error("Invalid device type: " + deviceType);
    }

    // Finally, determine whether the keypad should be rendered in the
    // fullscreen layout by determining its resultant width.
    const numSeparators =
        (navigationPadEnabled ? 1 : 0) +
        (!paginationEnabled ? numPages - 1 : 0);
    const keypadWidth =
        effectiveNumColumns * buttonDimensions.widthPx +
        (navigationPadEnabled ? navigationPadWidthPx : 0) +
        numSeparators * innerBorderWidthPx;
    return {
        buttonDimensions,
        layoutMode:
            keypadWidth >= pageWidthPx
                ? LayoutModes.FULLSCREEN
                : LayoutModes.COMPACT,
    };
};

module.exports = computeLayoutParameters;
