import * as CursorContexts from "../components/input/cursor-contexts";
import {KeyTypes} from "../consts";
import KeyConfigs from "../data/key-configs";

import {
    SetKeyHandlerActionType,
    SetCursorActionType,
    PressKeyActionType,
} from "./actions";

import type {Cursor, KeyHandler} from "../types";
import type {
    PressKeyAction,
    SetKeyHandlerAction,
    SetCursorAction,
} from "./actions";
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

type Action = PressKeyAction | SetKeyHandlerAction | SetCursorAction;

const inputReducer = function (
    state: InputState = initialInputState,
    action: Action,
): InputState {
    switch (action.type) {
        case SetKeyHandlerActionType:
            return {
                ...state,
                keyHandler: action.keyHandler,
            };

        case PressKeyActionType:
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

        case SetCursorActionType:
            return {
                ...state,
                cursor: action.cursor,
            };

        default:
            return state;
    }
};

export default inputReducer;
