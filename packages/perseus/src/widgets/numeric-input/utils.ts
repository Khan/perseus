import _ from "underscore";

import type {PerseusStrings} from "../../strings";
import type {PerseusNumericInputAnswerForm} from "@khanacademy/perseus-core";

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
    const forms =
        answerForms?.length !== 0
            ? answerForms
            : Object.keys(NumericExampleStrings).map((name) => {
                  return {
                      name: name,
                      simplify: "required",
                  } as PerseusNumericInputAnswerForm;
              });

    let examples = _.map(forms, (form) => {
        return NumericExampleStrings[form.name](form, strings);
    });
    examples = _.uniq(examples);

    return [strings.yourAnswer].concat(examples);
};

/**
 * Determines whether to show examples of how to input
 * the various supported answer forms. We do not show examples
 * if all forms are accepted or if no forms are accepted.
 */
export const shouldShowExamples = (
    answerForms: readonly PerseusNumericInputAnswerForm[],
): boolean => {
    const noFormsAccepted = answerForms?.length === 0;
    const answerFormNames: ReadonlyArray<string> = _.uniq(
        answerForms?.map((form) => form.name),
    );
    const allFormsAccepted =
        answerFormNames.length >= Object.keys(NumericExampleStrings).length;
    return !noFormsAccepted && !allFormsAccepted;
};
