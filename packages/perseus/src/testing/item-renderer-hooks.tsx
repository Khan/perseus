import {splitPerseusItem} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import * as React from "react";
import {useEffect, useReducer, useRef} from "react";
import invariant from "tiny-invariant";

import {createInitialState, itemRendererReducer} from "./item-renderer-reducer";

import type {ServerItemRenderer} from "../server-item-renderer";
import type {APIOptions} from "../types";
import type {
    PerseusItem,
    ShowSolutions,
    PerseusScore,
    UserInputMap,
} from "@khanacademy/perseus-core";

/**
 * Custom hook to manage the Server Item Renderer With Debug UI state
 */
export const useItemRenderer = (
    item: PerseusItem,
    apiOptions: APIOptions = {},
    reviewMode: boolean = false,
    showSolutions?: ShowSolutions,
) => {
    const ref = useRef<ServerItemRenderer>(null);
    const [state, dispatch] = useReducer(
        itemRendererReducer,
        createInitialState(item, reviewMode, showSolutions),
    );

    // Replace the item (discarding JSON edits) when the caller passes a new
    // one, e.g. when a story's args change.
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        dispatch({type: "UPDATE_ITEM", payload: item});
    }, [item]);

    // Derive the item to render from the full item. This is computed rather
    // than stored in state so that changing answerless/solution state
    // can't overwrite edits made in the JSON editor.
    const renderedItem = React.useMemo(() => {
        const shouldUseAnswerless =
            state.answerless &&
            !state.reviewMode &&
            (state.showSolutions === "none" || !state.showSolutions);

        return shouldUseAnswerless
            ? splitPerseusItem(state.perseusItem)
            : state.perseusItem;
    }, [
        state.perseusItem,
        state.answerless,
        state.reviewMode,
        state.showSolutions,
    ]);

    // Show the popover when the score changes
    useEffect(() => {
        if (!state.score) {
            return;
        }

        // If the answer is valid or there's a message, show the popover
        if (state.score.type === "points" || state.score.message !== null) {
            // This is a hack to ensure the popover is shown after the score is set
            // so that it gets the correct position.
            setTimeout(() => {
                dispatch({type: "TOGGLE_POPOVER", payload: true});
            }, 100);
        }
    }, [state.score]);

    const isMobile = apiOptions.isMobile ?? false;

    // Create API options
    const options = React.useMemo(
        () => ({
            ...apiOptions,
            isMobile,
            customKeypad: isMobile, // Use the mobile keypad for mobile
            showSolutions: state.showSolutions,
            interactionCallback: () => {
                if (state.showPopover) {
                    dispatch({type: "TOGGLE_POPOVER", payload: false});
                }
            },
        }),
        [apiOptions, isMobile, state.showPopover, state.showSolutions],
    );

    const getUserInput = React.useCallback((): UserInputMap => {
        const renderer = ref.current;
        invariant(
            renderer,
            "useItemRenderer: renderer is not defined! Did you remember to set the ref?",
        );
        return renderer.getUserInput();
    }, []);

    const getScore = React.useCallback((): PerseusScore => {
        const renderer = ref.current;
        invariant(
            renderer,
            "useItemRenderer: renderer is not defined! Did you remember to set the ref?",
        );

        const userInput = renderer.getUserInput();
        const score = scorePerseusItem(
            state.perseusItem.question,
            userInput,
            "en",
        );

        if (score.type === "points") {
            // Show solutions for selected answers when the user answered the
            // question
            dispatch({type: "SET_SHOW_SOLUTIONS", payload: "selected"});
        }

        return score;
    }, [state.perseusItem]);

    const updateJson = React.useCallback((json: string): boolean => {
        try {
            const parsed = JSON.parse(json);
            dispatch({type: "UPDATE_ITEM", payload: parsed});
            return true;
        } catch {
            // Don't update the item if JSON is invalid
            return false;
        }
    }, []);

    const handleReset = React.useCallback(() => {
        dispatch({type: "RESET_STATE"});
    }, []);

    const handleSkip = React.useCallback(() => {
        dispatch({type: "SET_ANSWERLESS", payload: false});
        dispatch({type: "SKIP_TO_SOLUTION"});
    }, []);

    const handleCheck = React.useCallback(() => {
        dispatch({type: "SET_ANSWERLESS", payload: false});
        dispatch({
            type: "SET_SCORE",
            score: getScore(),
            userInput: getUserInput(),
        });
    }, [getScore, getUserInput]);

    const setShowPopover = React.useCallback((show: boolean) => {
        dispatch({type: "TOGGLE_POPOVER", payload: show});
    }, []);

    return {
        ref,
        state,
        renderedItem,
        options,
        updateJson,
        handleReset,
        handleSkip,
        handleCheck,
        setShowPopover,
    };
};
