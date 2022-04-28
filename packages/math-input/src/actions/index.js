module.exports = {
    // naming convetion: verb + noun
    // the noun should be one of the other properties in the object that's
    // being dispatched
    dismissKeypad() {
        return {
            type: "DismissKeypad",
        };
    },

    activateKeypad() {
        return {
            type: "ActivateKeypad",
        };
    },

    /**
     * Configure the keypad with the provided configuration parameters.
     *
     * See: `prop-types.js#keypadConfigurationPropType`.
     */
    configureKeypad(configuration) {
        return {
            type: "ConfigureKeypad",
            configuration,
        };
    },

    setPageSize(pageWidthPx, pageHeightPx) {
        return {
            type: "SetPageSize",
            pageWidthPx,
            pageHeightPx,
        };
    },

    removeEcho(animationId) {
        return {
            type: "RemoveEcho",
            animationId,
        };
    },

    // Input-related actions.
    setKeyHandler(keyHandler) {
        return {
            type: "SetKeyHandler",
            keyHandler,
        };
    },

    setCursor(cursor) {
        return {
            type: "SetCursor",
            cursor,
        };
    },
};
