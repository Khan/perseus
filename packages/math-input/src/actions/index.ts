import type {KeypadConfiguration} from "../consts";

// naming convention: verb + noun
// the noun should be one of the other properties in the object that's
// being dispatched

export const dismissKeypad = () => {
    return {
        type: "DismissKeypad",
    };
};

export const activateKeypad = () => {
    return {
        type: "ActivateKeypad",
    };
};

/**
 * Configure the keypad with the provided configuration parameters.
 */
export const configureKeypad = (configuration: KeypadConfiguration) => {
    return {
        type: "ConfigureKeypad",
        configuration,
    };
};

export const setPageSize = (pageWidthPx: number, pageHeightPx: number) => {
    return {
        type: "SetPageSize",
        pageWidthPx,
        pageHeightPx,
    };
};

export const removeEcho = (animationId) => {
    return {
        type: "RemoveEcho",
        animationId,
    };
};

// Input-related actions.
export const setKeyHandler = (keyHandler) => {
    return {
        type: "SetKeyHandler",
        keyHandler,
    };
};

export const setCursor = (cursor) => {
    return {
        type: "SetCursor",
        cursor,
    };
};
