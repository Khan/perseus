import VelocityTracker from "../components/velocity-tracker";
import KeyConfigs from "../data/key-configs";
import {KeyType} from "../enums";

import {defaultKeypadType, keypadForType} from "./shared";

import type {Action} from "./actions";
import type {PagerState} from "./types";

// We default to the right-most page. This is done so-as to enforce a
// consistent orientation between the view pager layout and the flattened
// layout, where our default page appears on the far right.
const getDefaultPage = (numPages) => numPages - 1;

const initialPagerState = {
    animateToPosition: false,
    currentPage: getDefaultPage(keypadForType[defaultKeypadType].numPages),
    // The cumulative differential in the horizontal direction for the
    // current swipe.
    dx: 0,
    numPages: keypadForType[defaultKeypadType].numPages,
    pageWidthPx: 0,
    velocityTracker: new VelocityTracker(),
} as const;

const pagerReducer = function (
    state: PagerState = initialPagerState,
    action: Action,
): PagerState {
    switch (action.type) {
        case "ConfigureKeypad":
            const {keypadType} = action.configuration;
            const {numPages} = keypadForType[keypadType];
            return {
                ...state,
                numPages,
                animateToPosition: false,
                currentPage: getDefaultPage(numPages),
                dx: 0,
            };

        case "SetPageSize":
            return {
                ...state,
                pageWidthPx: action.pageWidthPx,
            };

        case "PressKey":
            const keyConfig = KeyConfigs[action.key];

            // Reset the keypad page if the user performs a math operation.
            if (
                keyConfig.type === KeyType.VALUE ||
                keyConfig.type === KeyType.OPERATOR
            ) {
                return {
                    ...state,
                    animateToPosition: true,
                    // We start at the right-most page.
                    currentPage: getDefaultPage(state.numPages),
                    dx: 0,
                };
            }
            return state;

        case "OnSwipeChange":
            state.velocityTracker.push(action.dx);

            return {
                ...state,
                animateToPosition: false,
                dx: action.dx,
            };

        case "OnSwipeEnd":
            const {pageWidthPx, velocityTracker} = state;
            const {dx} = action;
            const velocity = velocityTracker.getVelocity();

            // NOTE(charlie): These will need refinement. The velocity comes
            // from Framer.
            const minFlingVelocity = 0.1;
            const minFlingDistance = 10;

            const shouldPageRight =
                dx < -pageWidthPx / 2 ||
                (velocity < -minFlingVelocity && dx < -minFlingDistance);

            const shouldPageLeft =
                dx > pageWidthPx / 2 ||
                (velocity > minFlingVelocity && dx > minFlingDistance);

            if (shouldPageRight) {
                const nextPage = Math.min(
                    state.currentPage + 1,
                    state.numPages - 1,
                );
                return {
                    ...state,
                    animateToPosition: true,
                    currentPage: nextPage,
                    dx: 0,
                };
            } else if (shouldPageLeft) {
                const prevPage = Math.max(state.currentPage - 1, 0);
                return {
                    ...state,
                    animateToPosition: true,
                    currentPage: prevPage,
                    dx: 0,
                };
            }

            return {
                ...state,
                animateToPosition: true,
                dx: 0,
            };

        default:
            return state;
    }
};

export default pagerReducer;
