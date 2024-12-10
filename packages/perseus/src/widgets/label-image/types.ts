// Base marker, with the props that are set by the editor.
export type MarkerAnswers = {
    // The list of correct answers expected for the marker. Often only one but can have multiple
    answers: ReadonlyArray<string>;
    // Translatable Text; The text to show for the marker. Not displayed directly to the user
    label: string;
    // The marker coordinates on the question image as percent of image size.
    x: number;
    y: number;
};

export type MarkerUserInput = {
    // The user selected list of answers, used to grade the question.
    selected?: ReadonlyArray<string>;
    // Reveal the correctness state of the user selected answers for the marker.
    showCorrectness?: "correct" | "incorrect";
    focused?: boolean;
};

// Additional props that are set when user interacts with the marker.
export type InteractiveMarkerType = MarkerAnswers & MarkerUserInput;
