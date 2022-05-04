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
 *
 * See: `prop-types.js#keypadConfigurationPropType`.
 */
export const configureKeypad = (configuration) => {
    return {
        type: "ConfigureKeypad",
        configuration,
    };
};

export const setPageSize = (pageWidthPx, pageHeightPx) => {
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
