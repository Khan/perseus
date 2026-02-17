// Types that can be shared between Perseus packages
// ideally without causing circular dependencies

// Interfact currently only implemented by
// ServerItemRenderer
export interface RendererInterface {
    // TODO(LEMS-3185): remove serializedState
    /**
     * @deprecated - do not use in new code.
     */
    getSerializedState(): any;
    // TODO(LEMS-3185): remove serializedState
    blur(): void;
    focus(): boolean | null | undefined;
    props: any;
}

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
// TODO(LEMS-3199): don't mash together UI state with widget options
export type InteractiveMarkerType = MarkerType & {
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
};

// Used for NumberLine
export type Relationship = "eq" | "lt" | "gt" | "le" | "ge";

export type Alignment =
    | "default"
    | "block"
    | "inline-block"
    | "inline"
    // wrap alignments will be set to inline-block floated left or right this will
    // allow text to wrap around the widget and not have large space on either side
    | "wrap-left"
    | "wrap-right"
    | "full-width";

export type RecursiveReadonly<T> = {
    readonly [K in keyof T]: RecursiveReadonly<T[K]>;
};

// ============================================================================
// Variable Selection Types (for Scale Item feature)
// ============================================================================

/**
 * Represents a region of content that can be selected as a variable.
 * The token is opaque to consumers - only Perseus understands its format.
 */
export type SelectableRegion = {
    /** Opaque identifier for this selectable region */
    token: string;
    /** The text content that can be selected */
    text: string;
    /** Human-readable label (e.g., "Question", "Choice A", "Hint 1") */
    label: string;
    /** Category for grouping in UI */
    category: "question" | "widget" | "hint" | "answer";
    /** Widget type if from a widget (for display purposes only) */
    widgetType?: string;
};

/**
 * A substitution to apply when creating an item variation.
 * This replaces the entire region's content.
 */
export type VariableSubstitution = {
    /** The opaque token from SelectableRegion */
    token: string;
    /** The new value to substitute */
    newValue: string;
};

/**
 * A text substitution with character offsets for substring replacement.
 * This allows replacing specific text within a region rather than the entire region.
 */
export type TextSubstitution = {
    /** The opaque token from SelectableRegion identifying which region */
    token: string;
    /** Character offset where the replacement starts (0-based) */
    startIndex: number;
    /** Character offset where the replacement ends (exclusive) */
    endIndex: number;
    /** The new text to insert */
    newValue: string;
};
