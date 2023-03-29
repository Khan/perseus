/**
 * Common parameters used to style components.
 */
import Color from "@khanacademy/wonder-blocks-color";

export const wonderBlocksBlue = Color.blue;
export const offBlack = Color.offBlack;
export const offBlack32 = Color.offBlack32;
export const offBlack16 = Color.offBlack16;
export const offBlack8 = Color.offBlack8;

export const iconSizeHeightPx = 48;
export const iconSizeWidthPx = 48;
export const compactKeypadBorderRadiusPx = 4;
export const cursorHandleRadiusPx = 11;

// The amount to multiply the radius by to get the distance from the
// center to the tip of the cursor handle.  The cursor is a circle with
// one quadrant replace with a square.  The hypotenuse of the square is
// 1.045 times the radius of the circle.
export const cursorHandleDistanceMultiplier = 1.045;

// Keypad button colors
export const valueGrey = "#FFF";
export const operatorGrey = "#FAFAFA";
export const controlGrey = "#F6F7F7";
export const emptyGrey = "#F0F1F2";

// Constants defining any borders between elements in the keypad.
export const innerBorderColor = offBlack16;
export const innerBorderStyle = "solid";
export const innerBorderWidthPx = 1;

// The width at which a device is classified as a "tablet" for the purposes
// of the keypad layout.
export const tabletCutoffPx = 600;

// The dimensions that define various components in the tree, which may be
// needed outside of those components in order to determine various layout
// parameters.
export const pageIndicatorHeightPx = 16;
export const navigationPadWidthPx = 192;
// HACK(charlie): This should be injected by webapp somehow.
// TODO(charlie): Add a link to the webapp location as soon as the footer
// has settled down.
export const toolbarHeightPx = 60;
