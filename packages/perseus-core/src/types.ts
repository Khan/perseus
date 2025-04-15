// Types that can be shared between Perseus packages
// ideally without causing circular dependencies

// TODO: this should be typed
type State = any;

// Interfact currently only implemented by
// ServerItemRenderer
export interface RendererInterface {
    getSerializedState(): State;
    restoreSerializedState(state: State, callback?: () => void): void;
    blur(): void;
    focus(): boolean | null | undefined;
    props: any;
}

export type KEScore = {
    empty: boolean;
    correct: boolean;
    message?: string | null | undefined;
    suppressAlmostThere?: boolean | null | undefined;
    guess: any;
    state: any;
};

// Base marker, with the props that are set by the editor.
export type MarkerType = {
    // The list of correct answers expected for the marker.
    answers: string[];
    // The marker title or description.
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
};

// Additional props that are set when user interacts with the marker.
export type InteractiveMarkerType = MarkerType & {
    // The user selected list of answers, used to grade the question.
    selected?: string[];
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
};

// Used for NumberLine
// TODO: can this be merged with PerseusNumberLineWidgetOptions.correctRel?
export type Relationship = "lt" | "gt" | "le" | "ge";

export type Alignment =
    | "default"
    | "block"
    | "inline-block"
    | "inline"
    | "float-left"
    | "float-right"
    | "full-width";
