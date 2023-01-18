// @flow
/**
 * Constants that are shared between multiple files.
 */

export type KeypadType = "FRACTION" | "EXPRESSION";

// TODO: Retire this in favour of KeypadType (above)
export const KeypadTypes: {[key: KeypadType]: KeypadType} = {
    FRACTION: "FRACTION",
    EXPRESSION: "EXPRESSION",
};

export type KeyType =
    | "EMPTY"
    // For numerals, variables, and any other characters that themselves
    // compose 'values'.
    | "VALUE"
    // For buttons that insert or adjust math in an input.
    | "OPERATOR"
    // For buttons that move the cursor in an input (including via
    // deletion).
    | "INPUT_NAVIGATION"
    // For buttons that modify the broader keypad state (e.g., by changing
    // the visible pane).
    | "KEYPAD_NAVIGATION"
    // For buttons that house multiple buttons and have no action
    // themselves.
    | "MANY"
    // For the echo animation that appears on press.
    | "ECHO";

export const KeyTypes = {
    EMPTY: "EMPTY",
    // For numerals, variables, and any other characters that themselves
    // compose 'values'.
    VALUE: "VALUE",
    // For buttons that insert or adjust math in an input.
    OPERATOR: "OPERATOR",
    // For buttons that move the cursor in an input (including via
    // deletion).
    INPUT_NAVIGATION: "INPUT_NAVIGATION",
    // For buttons that modify the broader keypad state (e.g., by changing
    // the visible pane).
    KEYPAD_NAVIGATION: "KEYPAD_NAVIGATION",
    // For buttons that house multiple buttons and have no action
    // themselves.
    MANY: "MANY",
    // For the echo animation that appears on press.
    ECHO: "ECHO",
};

export const DeviceOrientations = {
    LANDSCAPE: "LANDSCAPE",
    PORTRAIT: "PORTRAIT",
};

export const DeviceTypes = {
    PHONE: "PHONE",
    TABLET: "TABLET",
};

export const LayoutModes = {
    FULLSCREEN: "FULLSCREEN",
    COMPACT: "COMPACT",
};

export const BorderDirections = {
    LEFT: ("LEFT": "LEFT"),
    BOTTOM: ("BOTTOM": "BOTTOM"),
};
export const BorderStyles: {|
    [style: string]: $ReadOnlyArray<$Values<typeof BorderDirections>>,
|} = {
    LEFT: ["LEFT"],
    BOTTOM: ["BOTTOM"],
    ALL: ["LEFT", "BOTTOM"],
    NONE: [],
};

export const IconTypes = {
    MATH: "MATH",
    SVG: "SVG",
    TEXT: "TEXT",
};

export const DecimalSeparators = {
    COMMA: "COMMA",
    PERIOD: "PERIOD",
};

export const EchoAnimationTypes = {
    SLIDE_AND_FADE: "SLIDE_AND_FADE",
    FADE_ONLY: "FADE_ONLY",
    LONG_FADE_ONLY: "LONG_FADE_ONLY",
};
