/**
 * Constants that are shared between multiple files.
 */

export enum KeypadType {
    FRACTION = "FRACTION",
    EXPRESSION = "EXPRESSION",
}

export enum KeyType {
    EMPTY = "EMPTY",
    // For numerals, variables, and any other characters that themselves
    // compose 'values'.
    VALUE = "VALUE",
    // For buttons that insert or adjust math in an input.
    OPERATOR = "OPERATOR",
    // For buttons that move the cursor in an input (including via
    // deletion).
    INPUT_NAVIGATION = "INPUT_NAVIGATION",
    // For buttons that modify the broader keypad state (e.g., by changing
    // the visible pane).
    KEYPAD_NAVIGATION = "KEYPAD_NAVIGATION",
    // For buttons that house multiple buttons and have no action
    // themselves.
    MANY = "MANY",
    // For the echo animation that appears on press.
    ECHO = "ECHO",
}

export const DeviceOrientations = {
    LANDSCAPE: "LANDSCAPE",
    PORTRAIT: "PORTRAIT",
} as const;

export const DeviceTypes = {
    PHONE: "PHONE",
    TABLET: "TABLET",
} as const;

export const LayoutModes = {
    FULLSCREEN: "FULLSCREEN",
    COMPACT: "COMPACT",
} as const;

export const BorderDirections = {
    LEFT: "LEFT" as const,
    BOTTOM: "BOTTOM" as const,
} as const;
export const BorderStyles: {
    [style: string]: ReadonlyArray<
        typeof BorderDirections[keyof typeof BorderDirections]
    >;
} = {
    LEFT: ["LEFT"],
    BOTTOM: ["BOTTOM"],
    ALL: ["LEFT", "BOTTOM"],
    NONE: [],
};

export const IconTypes = {
    MATH: "MATH",
    SVG: "SVG",
    TEXT: "TEXT",
} as const;

export const DecimalSeparators = {
    COMMA: "COMMA",
    PERIOD: "PERIOD",
} as const;

export const EchoAnimationTypes = {
    SLIDE_AND_FADE: "SLIDE_AND_FADE",
    FADE_ONLY: "FADE_ONLY",
    LONG_FADE_ONLY: "LONG_FADE_ONLY",
} as const;
