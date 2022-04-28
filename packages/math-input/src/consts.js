/**
 * Constants that are shared between multiple files.
 */

module.exports = {
    KeypadTypes: {
        FRACTION: "FRACTION",
        EXPRESSION: "EXPRESSION",
    },

    KeyTypes: {
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
    },

    DeviceOrientations: {
        LANDSCAPE: "LANDSCAPE",
        PORTRAIT: "PORTRAIT",
    },

    DeviceTypes: {
        PHONE: "PHONE",
        TABLET: "TABLET",
    },

    LayoutModes: {
        FULLSCREEN: "FULLSCREEN",
        COMPACT: "COMPACT",
    },

    BorderDirections: {
        LEFT: "LEFT",
        BOTTOM: "BOTTOM",
    },
    BorderStyles: {
        LEFT: ["LEFT"],
        BOTTOM: ["BOTTOM"],
        ALL: ["LEFT", "BOTTOM"],
        NONE: [],
    },

    IconTypes: {
        MATH: "MATH",
        SVG: "SVG",
        TEXT: "TEXT",
    },

    DecimalSeparators: {
        COMMA: "COMMA",
        PERIOD: "PERIOD",
    },

    EchoAnimationTypes: {
        SLIDE_AND_FADE: "SLIDE_AND_FADE",
        FADE_ONLY: "FADE_ONLY",
        LONG_FADE_ONLY: "LONG_FADE_ONLY",
    },
};
