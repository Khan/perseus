import {usesNumCorrect} from "@khanacademy/perseus-core";

import type {PerseusStrings} from "../../../strings";

interface GetInstructionsTextProps {
    multipleSelect: boolean;
    countChoices: boolean | null | undefined;
    numCorrect: number;
    strings: PerseusStrings;
}

/**
 * Get the (translated) instructions string for a Radio widget.
 *
 * This is the text that appears above the widget that explains
 * how many choices the user should select.
 *
 * @param multipleSelect - Whether the widget is a multiple-select widget.
 * @param countChoices - Whether the widget counts choices.
 * @param numCorrect - The number of correct choices.
 * @param strings - The strings for the Radio widget.
 * @returns The instructions string for the widget.
 */
export const getInstructionsText = ({
    multipleSelect,
    countChoices,
    numCorrect,
    strings,
}: GetInstructionsTextProps): string => {
    if (multipleSelect) {
        // using usesNumCorrect to make sure this logic stays in sync
        // with getRadioPublicWidgetOptions logic
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (usesNumCorrect(multipleSelect, !!countChoices, numCorrect)) {
            return strings.chooseNumAnswers({
                numCorrect: String(numCorrect),
            });
        }
        return strings.chooseAllAnswers;
    }
    return strings.chooseOneAnswer;
};
