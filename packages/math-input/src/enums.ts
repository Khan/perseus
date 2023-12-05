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
];
export type KeyType = typeof KeyTypes[number];
