import * as React from "react";
import {useEffect, useReducer, useRef} from "react";

import {PerseusScore, splitPerseusItem, UserInputMap} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";

import {keScoreFromPerseusScore} from "../packages/perseus/src/util/scoring";

import {itemRendererReducer, createInitialState} from "./item-renderer-reducer";

import type {ServerItemRenderer} from "../packages/perseus/src/server-item-renderer";
import type {APIOptions} from "../packages/perseus/src/types";
import type {
    PerseusItem,
    KEScore,
    ShowSolutions,
    UserInput,
} from "@khanacademy/perseus-core";
import invariant from "tiny-invariant";

/**
 * Custom hook to manage the Server Item Renderer With Debug UI state
 */
export const useItemRenderer = (
    item: PerseusItem,
    apiOptions: APIOptions = {},
    startAnswerless: boolean = false,
    reviewMode: boolean = false,
    showSolutions?: ShowSolutions,
) => {
    const ref = useRef<ServerItemRenderer>(null);
    const [state, dispatch] = useReducer(
        itemRendererReducer,
        createInitialState(
            item,
            startAnswerless,
            apiOptions.isMobile ?? false,
            false, // isRtl defaults to false
            reviewMode,
            showSolutions,
        ),
    );

    // Get a derived item based on answerless state
    const renderedItem = React.useMemo(() => {
        const shouldUseAnswerless =
            state.answerless &&
            !state.reviewMode &&
            (state.showSolutions === "none" || !state.showSolutions);

        return shouldUseAnswerless ? splitPerseusItem(item) : item;
    }, [item, state.answerless, state.reviewMode, state.showSolutions]);

    // Update item if the renderedItem changes
    useEffect(() => {
        dispatch({type: "UPDATE_ITEM", payload: renderedItem});
    }, [renderedItem]);

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

    // Create API options
    const options = React.useMemo(
        () => ({
            ...apiOptions,
            isMobile: state.isMobile,
            customKeypad: state.isMobile, // Use the mobile keypad for mobile
            showSolutions: state.showSolutions,
            interactionCallback: () => {
                if (state.showPopover) {
                    dispatch({type: "TOGGLE_POPOVER", payload: false});
                }
            },
        }),
        [apiOptions, state.isMobile, state.showPopover, state.showSolutions],
    );

    const getUserInput = React.useCallback((): UserInputMap => {
        const renderer = ref.current;
        invariant(renderer, "useItemRenderer: renderer is not defined! Did you remember to set the ref?")
        return renderer.getUserInput();
    }, [])

    const getScore = React.useCallback((): [KEScore, PerseusScore] => {
        const renderer = ref.current;
        invariant(renderer, "useItemRenderer: renderer is not defined! Did you remember to set the ref?")

        const userInput = renderer.getUserInput();
        const score = scorePerseusItem(
            state.perseusItem.question,
            userInput,
            "en",
        );

        const widgetIds = renderer.getWidgetIds();
        const userInputArray = widgetIds.map((id) => userInput[id]);

        // Continue to include an empty guess for the now defunct answer area.
        const maxCompatGuess: [UserInput[], []] = [userInputArray, []];

        const keScore = keScoreFromPerseusScore(
            score,
            maxCompatGuess,
            {},
        );

        if (!keScore.empty) {
            // Show solutions for selected answers when the score is not empty
            dispatch({type: "SET_SHOW_SOLUTIONS", payload: "selected"});
        }

        return [keScore, score];
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

    const toggleMobile = React.useCallback((isMobile: boolean) => {
        dispatch({type: "TOGGLE_MOBILE", payload: isMobile});
    }, []);

    const toggleRtl = React.useCallback((isRtl: boolean) => {
        dispatch({type: "TOGGLE_RTL", payload: isRtl});
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
        const score = getScore();
        if (score) {
            dispatch({
                type: "SET_SCORE",
                deprecatedKeScore: score[0],
                score: score[1],
                userInput: getUserInput(),
            });
        }
    }, [getScore]);

    const setShowPopover = React.useCallback((show: boolean) => {
        dispatch({type: "TOGGLE_POPOVER", payload: show});
    }, []);

    return {
        ref,
        state,
        options,
        toggleMobile,
        toggleRtl,
        updateJson,
        handleReset,
        handleSkip,
        handleCheck,
        setShowPopover,
    };
};
