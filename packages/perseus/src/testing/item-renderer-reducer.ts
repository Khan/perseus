import type {
    PerseusItem,
    ShowSolutions,
    PerseusScore,
    UserInputMap,
} from "@khanacademy/perseus-core";

// Define state type
export type ItemRendererState = {
    perseusItem: PerseusItem;
    originalItem: PerseusItem;
    answerless: boolean;
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
    | {type: "UPDATE_ITEM"; payload: PerseusItem}
    | {type: "SET_SCORE"; score: PerseusScore; userInput: UserInputMap}
    | {type: "TOGGLE_POPOVER"; payload: boolean}
    | {type: "SET_SHOW_SOLUTIONS"; payload: ShowSolutions | undefined}
    | {type: "SET_HINTS_VISIBLE"; payload: number}
    | {type: "SET_ANSWERLESS"; payload: boolean}
    | {type: "RESET_STATE"}
    | {type: "SKIP_TO_SOLUTION"};

// Create initial state function to allow passing props
export const createInitialState = (
    item: PerseusItem,
    reviewMode: boolean = false,
    showSolutions?: ShowSolutions,
): ItemRendererState => ({
    perseusItem: item,
    originalItem: item,
    answerless: true,
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
        case "UPDATE_ITEM":
            return {...state, perseusItem: action.payload};

        case "SET_SCORE":
            return {
                ...state,
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
                ...createInitialState(state.originalItem, state.reviewMode),
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
