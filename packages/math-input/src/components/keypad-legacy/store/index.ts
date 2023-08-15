import * as Redux from "redux";

import GestureManager from "../gesture-manager";

import {setActiveNodes, pressKey} from "./actions";
import echoReducer from "./echo-reducer";
import inputReducer from "./input-reducer";
import keypadReducer from "./keypad-reducer";
import layoutReducer from "./layout-reducer";
import {defaultKeypadType, keypadForType} from "./shared";

import type Key from "../../../data/keys";
import type {LayoutProps, ActiveNodesObj} from "../../../types";
import type {Action} from "./actions";
import type {GestureState} from "./types";

export const createStore = () => {
    // TODO(matthewc)[LC-752]: gestureReducer can't be moved from this file
    // because it depends on `store` being in scope (see note below)
    const createGestureManager = (swipeEnabled: boolean) => {
        return new GestureManager(
            {
                swipeEnabled,
            },
            {
                onActiveNodesChanged: (activeNodes: ActiveNodesObj) => {
                    store.dispatch(setActiveNodes(activeNodes));
                },
                onClick: (
                    key: Key,
                    layoutProps: LayoutProps,
                    inPopover: boolean,
                ) => {
                    store.dispatch(
                        pressKey(key, layoutProps.initialBounds, inPopover),
                    );
                },
            },
            [],
            ["BACKSPACE", "UP", "RIGHT", "DOWN", "LEFT"],
        );
    };

    const initialGestureState = {
        popover: null,
        focus: null,
        gestureManager: createGestureManager(
            keypadForType[defaultKeypadType].numPages > 1,
        ),
    } as const;

    const gestureReducer = function (
        state: GestureState = initialGestureState,
        action: Action,
    ): GestureState {
        switch (action.type) {
            case "DismissKeypad":
                // NOTE(charlie): In the past, we enforced the "gesture manager
                // will not receive any events when the keypad is hidden"
                // assumption by assuming that the keypad would be hidden when
                // dismissed and, as such, that none of its managed DOM nodes
                // would be able to receive touch events. However, on mobile
                // Safari, we're seeing that some of the keys receive touch
                // events even when off-screen, inexplicably. So, to guard
                // against that bug and make the contract explicit, we enable
                // and disable event tracking on activation and dismissal.
                state.gestureManager.disableEventTracking();
                return state;

            case "ActivateKeypad":
                state.gestureManager.enableEventTracking();
                return state;

            case "SetActiveNodes":
                return {
                    ...state,
                    ...action.activeNodes,
                };

            case "ConfigureKeypad":
                const {keypadType} = action.configuration;
                const {numPages} = keypadForType[keypadType];
                const swipeEnabled = numPages > 1;
                return {
                    popover: null,
                    focus: null,
                    gestureManager: createGestureManager(swipeEnabled),
                };

            default:
                return state;
        }
    };

    const reducer = Redux.combineReducers({
        input: inputReducer,
        keypad: keypadReducer,
        gestures: gestureReducer,
        echoes: echoReducer,
        layout: layoutReducer,
    });

    // TODO(charlie): This non-inlined return is necessary so as to allow the
    // gesture manager to dispatch actions on the store in its callbacks. We
    // should come up with a better pattern to remove the two-way dependency.
    // eslint-disable-next-line import/no-deprecated
    const store = Redux.createStore(reducer);

    return store;
};
