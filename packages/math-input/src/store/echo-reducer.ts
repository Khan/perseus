import KeyConfigs from "../data/key-configs";
import {EchoAnimationType, KeyType} from "../enums";

import type {Action} from "./actions";
import type {EchoState} from "./types";

// Used to generate unique animation IDs for the echo animations. The actual
// values are irrelevant as long as they are unique.
let _lastAnimationId = 0;

const initialEchoState = {
    echoes: [],
} as const;

const echoReducer = function (
    state: EchoState = initialEchoState,
    action: Action,
): EchoState {
    switch (action.type) {
        case "PressKey":
            const keyConfig = KeyConfigs[action.key];

            // Add in the echo animation if the user performs a math
            // operation.
            if (
                keyConfig.type === KeyType.VALUE ||
                keyConfig.type === KeyType.OPERATOR
            ) {
                return {
                    ...state,
                    echoes: [
                        ...state.echoes,
                        {
                            animationId: "" + _lastAnimationId++,
                            animationType: action.inPopover
                                ? EchoAnimationType.LONG_FADE_ONLY
                                : EchoAnimationType.FADE_ONLY,
                            id: keyConfig.id,
                            initialBounds: action.initialBounds,
                        },
                    ],
                };
            }
            return state;

        case "RemoveEcho":
            const remainingEchoes = state.echoes.filter((echo) => {
                return echo.animationId !== action.animationId;
            });
            return {
                ...state,
                echoes: remainingEchoes,
            };

        default:
            return state;
    }
};

export default echoReducer;
