/**
 * Constants that are shared between multiple files.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const KeyTypes = [
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
];
export type KeyType = (typeof KeyTypes)[number];
