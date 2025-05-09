import * as React from "react";
import {useEffect, useReducer, useRef} from "react";

import {splitPerseusItem} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";

import {keScoreFromPerseusScore} from "../packages/perseus/src/util/scoring";

import {itemRendererReducer, createInitialState} from "./item-renderer-reducer";

import type {ServerItemRenderer} from "../packages/perseus/src/server-item-renderer";
import type {APIOptions} from "../packages/perseus/src/types";
import type {
    PerseusItem,
    KEScore,
    ShowSolutions,
} from "@khanacademy/perseus-core";

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

        // If the answer is not empty or there's a message, show the popover
        if (!state.score.empty || state.score.message !== null) {
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
            showSolutions: undefined,
            interactionCallback: () => {
                if (state.showPopover) {
                    dispatch({type: "TOGGLE_POPOVER", payload: false});
                    // Only deselect incorrect choices when the score is not empty
                    // This prevents deselection when clicking a new answer after
                    // receiving an empty score
                    if (state.score && !state.score.empty) {
                        ref.current?.deselectIncorrectSelectedChoices();
                    }
                }
            },
        }),
        [apiOptions, state.isMobile, state.showPopover, state.score],
    );

    /**
     * Get the score for the current user input
     */
    const getScore = React.useCallback((): KEScore | undefined => {
        const renderer = ref.current;
        if (!renderer) {
            return undefined;
        }

        const userInput = renderer.getUserInput();
        const score = scorePerseusItem(
            state.perseusItem.question,
            userInput,
            "en",
        );

        // Continue to include an empty guess for the now defunct answer area.
        const maxCompatGuess = [renderer.getUserInputLegacy(), []];

        const keScore = keScoreFromPerseusScore(
            score,
            maxCompatGuess,
            renderer.getSerializedState().question,
        );

        if (!keScore.empty) {
            ref.current?.showRationalesForCurrentlySelectedChoices();
        }

        return keScore;
    }, [state.perseusItem]);

    /**
     * Update the Perseus item from JSON text
     */
    const updateJson = React.useCallback((json: string) => {
        try {
            const parsed = JSON.parse(json);
            dispatch({type: "UPDATE_ITEM", payload: parsed});
        } catch {
            const errorItem = {
                question: {
                    content:
                        "**Could not parse the JSON for this question.**\n\n```\n" +
                        json +
                        "\n```",
                    widgets: {},
                    images: {},
                },
                hints: [],
                answerArea: {
                    calculator: false,
                    chi2Table: false,
                    financialCalculatorMonthlyPayment: false,
                    financialCalculatorTotalAmount: false,
                    financialCalculatorTimeToPayOff: false,
                    periodicTable: false,
                    periodicTableWithKey: false,
                    tTable: false,
                    zTable: false,
                },
            };
            dispatch({type: "UPDATE_ITEM", payload: errorItem});
        }
    }, []);

    /**
     * Handle mobile toggle
     */
    const toggleMobile = React.useCallback((isMobile: boolean) => {
        dispatch({type: "TOGGLE_MOBILE", payload: isMobile});
    }, []);

    /**
     * Handle reset action
     */
    const handleReset = React.useCallback(() => {
        dispatch({type: "RESET_STATE"});
    }, []);

    /**
     * Handle skip to solution action
     */
    const handleSkip = React.useCallback(() => {
        dispatch({type: "SKIP_TO_SOLUTION"});
    }, []);

    /**
     * Handle check answer action
     */
    const handleCheck = React.useCallback(() => {
        dispatch({type: "SET_ANSWERLESS", payload: false});
        const score = getScore();
        if (score) {
            dispatch({type: "SET_SCORE", payload: score});
        }
    }, [getScore]);

    /**
     * Toggle popover visibility
     */
    const setShowPopover = React.useCallback((show: boolean) => {
        dispatch({type: "TOGGLE_POPOVER", payload: show});
    }, []);

    return {
        ref,
        state,
        options,
        toggleMobile,
        updateJson,
        handleReset,
        handleSkip,
        handleCheck,
        setShowPopover,
    };
};
