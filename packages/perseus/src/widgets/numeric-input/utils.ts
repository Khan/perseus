import {
    getUniqueAnswerForms,
    type PerseusNumericInputAnswerForm,
} from "@khanacademy/perseus-core";

import type {PerseusStrings} from "../../strings";

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
    integer: (form, strings: PerseusStrings) => strings.integerExample,
    proper: (form, strings: PerseusStrings) =>
        form.simplify === "optional"
            ? strings.properExample
            : strings.simplifiedProperExample,
    improper: (form, strings: PerseusStrings) =>
        form.simplify === "optional"
            ? strings.improperExample
            : strings.simplifiedImproperExample,
    mixed: (form, strings: PerseusStrings) => strings.mixedExample,
    decimal: (form, strings: PerseusStrings) => strings.decimalExample,
    pi: (form, strings: PerseusStrings) => strings.piExample,
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

    // Sort them by the order they appear in the `formExamples` list.
    const formExampleKeys = Object.keys(NumericExampleStrings);
    const sortedForms = uniqueForms.sort((a, b) => {
        return (
            formExampleKeys.indexOf(a.name) - formExampleKeys.indexOf(b.name)
        );
    });

    // Generate the example strings for each unique form.
    const examples = sortedForms.map((form) => {
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
