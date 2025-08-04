import type {
    PerseusDropdownRubric,
    PerseusDropdownUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreDropdown(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusDropdownUserInput | undefined,
    rubric: PerseusDropdownRubric,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const correct = rubric.choices[userInput.value - 1].correct;
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreDropdown;
