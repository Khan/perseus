import * as CursorContexts from "../components/input/cursor-contexts";
import {KeyTypes} from "../consts";
import KeyConfigs from "../data/key-configs";

import type {Cursor, KeyHandler} from "../types";
import type {InputState} from "./types";

const initialInputState: {
    keyHandler: KeyHandler | null;
    cursor: Cursor;
} = {
    keyHandler: null,
    cursor: {
        context: CursorContexts.NONE,
    },
};

const inputReducer = function (
    state = initialInputState,
    action: any,
): InputState {
    switch (action.type) {
        case "SetKeyHandler":
            return {
                ...state,
                keyHandler: action.keyHandler,
            };

        case "PressKey":
            const keyConfig = KeyConfigs[action.key];
            if (keyConfig.type !== KeyTypes.KEYPAD_NAVIGATION) {
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
