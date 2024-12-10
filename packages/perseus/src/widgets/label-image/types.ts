export type LabelImageMarker = {
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
    // Translatable Text; The text to show for the marker. Not displayed directly to the user
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
};

export type LabelImageMarkerScoringData = {
    // The list of correct answers expected for the marker. Often only one but can have multiple
    answers: ReadonlyArray<string>;
};

export type LabelImageMarkerUserInput = {
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
};

// Additional props that are set when user interacts with the marker.
export type LabelImageFullMarker = LabelImageMarker &
    LabelImageMarkerScoringData &
    LabelImageMarkerUserInput;
