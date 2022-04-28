/**
 * Common parameters used to style components.
 */
const offBlack16 = "rgba(33, 36, 44, 0.16)";

module.exports = {
    // TODO(diedra): Import Wonder Blocks and get these values from there.
    wonderBlocksBlue: "#1865f2",
    offBlack: "#21242c",
    offBlack32: "rgba(33, 36, 44, 0.32)",
    offBlack16,
    offBlack8: "rgba(33, 36, 44, 0.8)",

    iconSizeHeightPx: 48,
    iconSizeWidthPx: 48,
    compactKeypadBorderRadiusPx: 4,
    cursorHandleRadiusPx: 11,

    // The amount to multiply the radius by to get the distance from the
    // center to the tip of the cursor handle.  The cursor is a circle with
    // one quadrant replace with a square.  The hypotenuse of the square is
    // 1.045 times the radius of the circle.
    cursorHandleDistanceMultiplier: 1.045,

    // Keypad button colors
    valueGrey: "#FFF",
    operatorGrey: "#FAFAFA",
    controlGrey: "#F6F7F7",
    emptyGrey: "#F0F1F2",

    // Constants defining any borders between elements in the keypad.
    innerBorderColor: offBlack16,
    innerBorderStyle: "solid",
    innerBorderWidthPx: 1,

    // The width at which a device is classified as a "tablet" for the purposes
    // of the keypad layout.
    tabletCutoffPx: 600,

    // The dimensions that define various components in the tree, which may be
    // needed outside of those components in order to determine various layout
    // parameters.
    pageIndicatorHeightPx: 16,
    navigationPadWidthPx: 192,
    // HACK(charlie): This should be injected by webapp somehow.
    // TODO(charlie): Add a link to the webapp location as soon as the footer
    // has settled down.
    toolbarHeightPx: 60,
};
