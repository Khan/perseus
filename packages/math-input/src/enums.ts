/**
 * Constants that are shared between multiple files.
 */

export enum KeypadType {
    FRACTION = "FRACTION",
    EXPRESSION = "EXPRESSION",
}

export const KeyTypes = [
    "EMPTY",
    // For numerals, variables, and any other characters that themselves
    // compose 'values'.
    "VALUE",
    // For buttons that insert or adjust math in an input.
    "OPERATOR",
    // For buttons that move the cursor in an input (including via
    // deletion).
    "INPUT_NAVIGATION",
    // For buttons that modify the broader keypad state (e.g., by changing
    // the visible pane).
    "KEYPAD_NAVIGATION",
    // For buttons that house multiple buttons and have no action
    // themselves.
    "MANY",
    // For the echo animation that appears on press.
    "ECHO",
];
export type KeyType = typeof KeyTypes[number];

export enum DeviceOrientation {
    LANDSCAPE = "LANDSCAPE",
    PORTRAIT = "PORTRAIT",
}

export enum DeviceType {
    PHONE = "PHONE",
    TABLET = "TABLET",
}

export enum LayoutMode {
    FULLSCREEN = "FULLSCREEN",
    COMPACT = "COMPACT",
}

export enum BorderDirection {
    LEFT = "LEFT",
    BOTTOM = "BOTTOM",
}

export const BorderStyles: {
    [style: string]: ReadonlyArray<BorderDirection>;
} = {
    LEFT: [BorderDirection.LEFT],
    BOTTOM: [BorderDirection.BOTTOM],
    ALL: [BorderDirection.LEFT, BorderDirection.BOTTOM],
    NONE: [],
};

export enum IconType {
    MATH = "MATH",
    SVG = "SVG",
    TEXT = "TEXT",
}

export enum EchoAnimationType {
    SLIDE_AND_FADE = "SLIDE_AND_FADE",
    FADE_ONLY = "FADE_ONLY",
    LONG_FADE_ONLY = "LONG_FADE_ONLY",
}
