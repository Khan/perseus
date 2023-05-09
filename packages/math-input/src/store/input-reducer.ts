import {CursorContext} from "../components/input/cursor-contexts";
import KeyConfigs from "../data/key-configs";
import {KeyType} from "../enums";

import type {Cursor, KeyHandler} from "../types";
import type {Action} from "./actions";
import type {InputState} from "./types";

const initialInputState: {
    keyHandler: KeyHandler | null;
    cursor: Cursor;
} = {
    keyHandler: null,
    cursor: {
        context: CursorContext.NONE,
    },
};

const inputReducer = function (
    state: InputState = initialInputState,
    action: Action,
): InputState {
    switch (action.type) {
        case "SetKeyHandler":
            return {
                ...state,
                keyHandler: action.keyHandler,
            };

        case "PressKey":
            const keyConfig = KeyConfigs[action.key];
            if (keyConfig.type !== KeyType.KEYPAD_NAVIGATION) {
                // This is probably an anti-pattern but it works for the
                // case where we don't actually control the state but we
                // still want to communicate with the other object
                return {
                    ...state,
                    cursor: state.keyHandler?.(keyConfig.id),
                };
            }

            // TODO(kevinb) get state from MathQuill and store it?
            return state;

        case "SetCursor":
            return {
                ...state,
                cursor: action.cursor,
            };

        default:
            return state;
    }
};

export default inputReducer;
