import {KhanMath} from "@khanacademy/kmath";

import type {PerseusStrings} from "../../strings";
import type {
    MathFormat,
    PerseusNumericInputAnswerForm,
    PerseusNumericInputRubric,
    PerseusNumericInputUserInput,
    PerseusNumericInputWidgetOptions,
} from "@khanacademy/perseus-core";

/**
 * The full list of available strings for the numeric input widget,
 * based on whether the Content Creator has specified that the answer must be simplified.
 */
const NumericExampleStrings: {
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
    percent: (form, strings) => strings.percentExample,
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
export function normalizeCorrectAnswerForms(
    answers: PerseusNumericInputWidgetOptions["answers"],
): ReadonlyArray<PerseusNumericInputAnswerForm> {
    // this is because the serialization funciton doesn't
    // serialize answers, so restore serialized state won't have answers
    // TODO(LEMS-3185): remove serialized state logic
    if (answers == null) {
        return [];
    }

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

export function getStartUserInput(): PerseusNumericInputUserInput {
    return {currentValue: ""};
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
export function getUserInputFromSerializedState(
    serializedState: any,
): PerseusNumericInputUserInput {
    return {
        currentValue: serializedState.currentValue,
    };
}

export function findPrecision(value: number) {
    for (let i = 0; i < 10; i++) {
        // `toFixed` handily rounds a number to a given precision...
        // ...but also turns it into a string. so `+` turns it back
        // into a number.
        if (value === +value.toFixed(i)) {
            return i;
        }
    }
    return 10; // don't assume there's more precision than that
}

export function findCommonFractions(value: number) {
    const whole = Math.floor(value);
    if (value === whole) {
        return;
    }
    const decimal = value - whole;
    const precision = findPrecision(decimal);
    // it's brute force, but it's honest work
    for (let num = 1; num < 100; num++) {
        for (let denom = 2; denom < 100; denom++) {
            if (+(num / denom).toFixed(precision) === decimal) {
                return {num: num + whole * denom, denom};
            }
        }
    }
}

export function getCorrectUserInput(
    options: PerseusNumericInputWidgetOptions,
): PerseusNumericInputUserInput {
    for (const answer of options.answers) {
        if (answer.status === "correct" && answer.value != null) {
            if (answer.answerForms?.includes("decimal")) {
                return {currentValue: answer.value.toString()};
            }
            if (answer.answerForms?.includes("improper")) {
                const frac = findCommonFractions(answer.value);
                if (frac) {
                    return {currentValue: `${frac.num}/${frac.denom}`};
                }
            }
            if (answer.answerForms?.includes("proper")) {
                const frac = findCommonFractions(answer.value);
                if (frac) {
                    const {num, denom} = frac;
                    if (num > denom) {
                        const whole = Math.floor(num / denom);
                        const remainder = num - whole * denom;
                        return {currentValue: `${whole} ${remainder}/${denom}`};
                    } else {
                        return {currentValue: `${num}/${denom}`};
                    }
                }
            }
            // 🤷
            return {currentValue: answer.value.toString()};
        }
    }
    return {currentValue: ""};
}

export function getOneCorrectAnswerFromRubric(
    rubric: PerseusNumericInputRubric,
): string | null | undefined {
    const correctAnswers = rubric.answers.filter(
        (answer) => answer.status === "correct",
    );
    const answerStrings = correctAnswers.map((answer) => {
        // Either get the first answer form or default to decimal
        const format: MathFormat =
            answer.answerForms && answer.answerForms[0]
                ? answer.answerForms[0]
                : "decimal";

        let answerString = KhanMath.toNumericString(answer.value!, format);
        if (answer.maxError) {
            answerString +=
                " ± " + KhanMath.toNumericString(answer.maxError, format);
        }
        return answerString;
    });
    if (answerStrings.length === 0) {
        return;
    }
    return answerStrings[0];
}
