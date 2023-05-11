import KeyConfigs from "../../../data/key-configs";
import Keys from "../../../data/keys";

import {defaultKeypadType} from "./shared";

import type {Action} from "./actions";
import type {KeypadState} from "./types";

const initialKeypadState = {
    extraKeys: ["x", "y", Keys.THETA, Keys.PI],
    keypadType: defaultKeypadType,
    active: false,
} as const;

const keypadReducer = function (
    state: KeypadState = initialKeypadState,
    action: Action,
): KeypadState {
    switch (action.type) {
        case "DismissKeypad":
            return {
                ...state,
                active: false,
            };

        case "ActivateKeypad":
            return {
                ...state,
                active: true,
            };

        case "ConfigureKeypad":
            return {
                ...state,
                // Default `extraKeys` to the empty array.
                extraKeys: [],
                ...action.configuration,
            };

        case "PressKey":
            const keyConfig = KeyConfigs[action.key];
            // NOTE(charlie): Our keypad system operates by triggering key
            // presses with key IDs in a dumb manner, such that the keys
            // don't know what they can do--instead, the store is
            // responsible for interpreting key presses and triggering the
            // right actions when they occur. Hence, we figure off a
            // dismissal here rather than dispatching a dismiss action in
            // the first place.
            if (keyConfig.id === Keys.DISMISS) {
                return keypadReducer(state, {type: "DismissKeypad"});
            }
            return state;

        default:
            return state;
    }
};

export default keypadReducer;
