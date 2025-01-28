// Types that can be shared between Perseus packages
// ideally without causing circular dependencies

// Used by KeypadContext to pass around a renderer reference
export interface KeypadContextRendererInterface {
    blur(): void;
}

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
    answers: ReadonlyArray<string>;
    // The marker title or description.
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
};

// Additional props that are set when user interacts with the marker.
export type InteractiveMarkerType = MarkerType & {
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
};

// Used for NumberLine
// TODO: can this be merged with PerseusNumberLineWidgetOptions.correctRel?
export type Relationship = "lt" | "gt" | "le" | "ge";
