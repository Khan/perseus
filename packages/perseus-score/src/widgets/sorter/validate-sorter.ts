import type {
    PerseusSorterUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

/**
 * Checks user input for the sorter widget to ensure that the user has made
 * changes before attempting to score the widget.
 * @param userInput
 * @see 'scoreSorter' in 'packages/perseus/src/widgets/sorter/score-sorter.ts'
 * for more details on how the sorter widget is scored.
 */
function validateSorter(userInput: PerseusSorterUserInput): ValidationResult {
    // If the sorter widget hasn't been changed yet, we treat it as "empty" which
    // prevents the "Check" button from becoming active. We want the user
    // to make a change before trying to move forward. This makes an
    // assumption that the initial order isn't the correct order! However,
    // this should be rare if it happens, and interacting with the list
    // will enable the button, so they won't be locked out of progressing.
    if (!userInput?.changed) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return null;
}

export default validateSorter;
