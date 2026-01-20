import type {
    PerseusItem,
    KEScore,
    ShowSolutions, PerseusScore, UserInputMap, UserInput,
} from "@khanacademy/perseus-core";

// Define state type
export type ItemRendererState = {
    isMobile: boolean;
    isRtl: boolean;
    perseusItem: PerseusItem;
    originalItem: PerseusItem;
    answerless: boolean;
    startAnswerless: boolean;
    deprecatedKEScore: KEScore | null | undefined;
    score: PerseusScore | undefined;
    userInput: UserInputMap | undefined;
    showPopover: boolean;
    showSolutions: ShowSolutions | undefined;
    hintsVisible: number;
    key: number; // For forcing remount
    reviewMode: boolean;
};

// Define action types
export type ItemRendererAction =
    | {type: "TOGGLE_MOBILE"; payload: boolean}
    | {type: "TOGGLE_RTL"; payload: boolean}
    | {type: "UPDATE_ITEM"; payload: PerseusItem}
    | {type: "SET_SCORE"; deprecatedKeScore: KEScore, score: PerseusScore, userInput: UserInputMap}
    | {type: "TOGGLE_POPOVER"; payload: boolean}
    | {type: "SET_SHOW_SOLUTIONS"; payload: ShowSolutions | undefined}
    | {type: "SET_HINTS_VISIBLE"; payload: number}
    | {type: "SET_ANSWERLESS"; payload: boolean}
    | {type: "RESET_STATE"}
    | {type: "SKIP_TO_SOLUTION"};

// Create initial state function to allow passing props
export const createInitialState = (
    item: PerseusItem,
    startAnswerless: boolean = false,
    isMobile: boolean = false,
    isRtl: boolean = false,
    reviewMode: boolean = false,
    showSolutions?: ShowSolutions,
): ItemRendererState => ({
    isMobile,
    isRtl,
    perseusItem: item,
    originalItem: item,
    answerless: startAnswerless,
    startAnswerless,
    deprecatedKEScore: null,
    score: undefined,
    userInput: undefined,
    showPopover: false,
    showSolutions,
    hintsVisible: 0,
    key: 0,
    reviewMode,
});

// Create reducer function
export const itemRendererReducer = (
    state: ItemRendererState,
    action: ItemRendererAction,
): ItemRendererState => {
    switch (action.type) {
        case "TOGGLE_MOBILE":
            return {...state, isMobile: action.payload};

        case "TOGGLE_RTL":
            return {...state, isRtl: action.payload};

        case "UPDATE_ITEM":
            return {...state, perseusItem: action.payload};

        case "SET_SCORE":
            return {
                ...state,
                deprecatedKEScore: action.deprecatedKeScore,
                score: action.score,
                userInput: action.userInput,
            };

        case "TOGGLE_POPOVER":
            return {...state, showPopover: action.payload};

        case "SET_SHOW_SOLUTIONS":
            return {...state, showSolutions: action.payload};

        case "SET_HINTS_VISIBLE":
            return {...state, hintsVisible: action.payload};

        case "SET_ANSWERLESS":
            return {...state, answerless: action.payload};

        case "RESET_STATE":
            return {
                ...createInitialState(
                    state.originalItem,
                    state.startAnswerless,
                    state.isMobile,
                    state.isRtl,
                    state.reviewMode,
                ),
                key: state.key + 1, // Force remount
            };

        case "SKIP_TO_SOLUTION":
            return {
                ...state,
                answerless: false,
                hintsVisible: state.originalItem.hints.length,
                showSolutions: "all",
            };

        default:
            return state;
    }
};
