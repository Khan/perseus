import type {PerseusStrings} from "../../strings";
import type {
    PerseusNumericInputAnswerForm,
    PerseusNumericInputWidgetOptions,
} from "@khanacademy/perseus-core";

/**
 * The full list of available strings for the numeric input widget,
 * based on whether the Content Creator has specified that the answer must be simplified.
 */
export const NumericExampleStrings: {
    [key: string]: (
        form: PerseusNumericInputAnswerForm,
        strings: PerseusStrings,
    ) => string;
} = {
    integer: (form, strings) => strings.integerExample,
    proper: (form, strings) =>
        form.simplify === "optional"
            ? strings.properExample
            : strings.simplifiedProperExample,
    improper: (form, strings) =>
        form.simplify === "optional"
            ? strings.improperExample
            : strings.simplifiedImproperExample,
    mixed: (form, strings) => strings.mixedExample,
    decimal: (form, strings) => strings.decimalExample,
    pi: (form, strings) => strings.piExample,
};

/**
 * Generates the specific set of examples for the current question.
 * This string is shown as examples to the user in a tooltip.
 */
export const generateExamples = (
    answerForms: readonly PerseusNumericInputAnswerForm[],
    strings: PerseusStrings,
): ReadonlyArray<string> => {
    // If the Content Creator has not specified any answer forms,
    // we do not need to show any examples.
    if (answerForms.length === 0) {
        return [];
    }

    // Generate a list of the unique answer forms.
    const uniqueForms = getUniqueAnswerForms(answerForms);

    // Generate the example strings for each unique form.
    const examples = uniqueForms.map((form) => {
        return NumericExampleStrings[form.name](form, strings);
    });

    // Add the "Your answer" string to the beginning of the examples list.
    return [strings.yourAnswer].concat(examples);
};

/**
 * Determines whether to show examples of how to input the various supported answer forms.
 * We do not show examples if all forms are accepted or if no forms are accepted.
 */
export const shouldShowExamples = (
    answerForms: readonly PerseusNumericInputAnswerForm[],
): boolean => {
    // If the Content Creator has not specified any answer forms,
    // we do not need to show any examples.
    if (answerForms.length === 0) {
        return false;
    }

    // Generate a list of the unique names of the selected answer forms.
    const answerFormNames: ReadonlyArray<string> = getUniqueAnswerForms(
        answerForms,
    ).map((form) => form.name);

    // If all forms are accepted, we do not need to show any examples.
    const allFormsAccepted =
        answerFormNames.length >= Object.keys(NumericExampleStrings).length;

    return !allFormsAccepted;
};

/**
 * uniqueAnswerForms takes a list of answer forms and returns a list of unique
 * answer forms. This is useful for ensuring that we don't show duplicate examples
 * to the user.
 */
const getUniqueAnswerForms = function (
    list: readonly PerseusNumericInputAnswerForm[],
): PerseusNumericInputAnswerForm[] {
    // We use a Set to keep track of the forms we've already seen.
    const foundForms = new Set<string>();
    return list.filter((form) => {
        // If we've already seen this form, skip it.
        if (foundForms.has(form.name)) {
            return false;
        }
        // Otherwise, add it to the set and return true.
        foundForms.add(form.name);
        return true;
    });
};

/**
 * Takes a list of lists of answer forms, and returns a list of the forms
 * in each of these lists in the same order that they're listed in the
 * `formExamples` forms from above.
 */
export const unionAnswerForms: (
    answerFormsList: ReadonlyArray<
        ReadonlyArray<PerseusNumericInputAnswerForm>
    >,
) => ReadonlyArray<PerseusNumericInputAnswerForm> = function (answerFormsList) {
    // Pull out all of the forms from the different lists.
    const allForms = answerFormsList.flat();
    // Pull out the unique forms using getUniqueAnswerForms.
    const uniqueForms = getUniqueAnswerForms(allForms);
    // Sort them by the order they appear in the `formExamples` list.
    const formExampleKeys = Object.keys(NumericExampleStrings);
    return uniqueForms.sort((a, b) => {
        return (
            formExampleKeys.indexOf(a.name) - formExampleKeys.indexOf(b.name)
        );
    });
};

/**
 * Filter out the correct answers and map them to the answer forms
 * so that we can generate the examples for the widget.
 */
export function processAnswerForms(
    answers: PerseusNumericInputWidgetOptions["answers"],
) {
    return unionAnswerForms(
        answers
            .filter((answer) => answer.status === "correct")
            .map((answer) => {
                return (answer.answerForms || []).map((form) => {
                    return {
                        simplify: answer.simplify,
                        name: form,
                    };
                });
            }),
    );
}
