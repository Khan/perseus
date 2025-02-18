import type {
    PerseusNumericInputAnswerForm,
    PerseusNumericInputWidgetOptions,
} from "../../data-schema";

/**
 * uniqueAnswerForms takes a list of answer forms and returns a list of unique
 * answer forms. This is useful for ensuring that we don't show duplicate examples
 * to the user.
 */
export const getUniqueAnswerForms = function (
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
    return getUniqueAnswerForms(allForms);
};

export const deriveAnswerForms = (
    options: PerseusNumericInputWidgetOptions,
) => {
    if (options.fullAnswerForms) {
        return options.fullAnswerForms;
    }

    return unionAnswerForms(
        // Filter out the correct answers and map them to the answer forms
        // so that we can generate the examples for the widget.
        (options.answers || [])
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
};
