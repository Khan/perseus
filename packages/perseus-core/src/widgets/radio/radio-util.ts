import type {
    PerseusRadioChoice,
    PerseusRadioWidgetOptions,
} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusRadioWidgetOptions type
 */
type RadioPublicWidgetOptions = {
    choices: ReadonlyArray<RadioChoicePublicData>;
    hasNoneOfTheAbove?: PerseusRadioWidgetOptions["hasNoneOfTheAbove"];
    countChoices?: PerseusRadioWidgetOptions["countChoices"];
    numCorrect?: PerseusRadioWidgetOptions["numCorrect"];
    randomize?: PerseusRadioWidgetOptions["randomize"];
    multipleSelect?: PerseusRadioWidgetOptions["multipleSelect"];
    deselectEnabled?: PerseusRadioWidgetOptions["deselectEnabled"];
    onePerLine?: PerseusRadioWidgetOptions["onePerLine"];
    displayCount?: PerseusRadioWidgetOptions["displayCount"];
    noneOfTheAbove?: PerseusRadioWidgetOptions["noneOfTheAbove"];
};

/**
 * Only the options from each Radio choice that should be exposed to the client.
 */
type RadioChoicePublicData = Pick<
    PerseusRadioChoice,
    "content" | "isNoneOfTheAbove" | "widgets"
>;

/**
 * Given a PerseusRadioChoice object, return a new object with only the public
 * data that should be included in the Radio public widget options.
 */
function getRadioChoicePublicData(
    choice: PerseusRadioChoice,
): RadioChoicePublicData {
    const {content, isNoneOfTheAbove, widgets} = choice;
    return {
        content,
        isNoneOfTheAbove,
        widgets,
    };
}

/**
 * Shared functionality to determine if numCorrect is used, because:
 *
 * 1. numCorrect is conditionally used for rendering pre-scoring
 * 2. numCorrect also exposes information about answers
 *
 * So only include/use numCorrect when we know it's useful.
 */
export function usesNumCorrect(
    multipleSelect: PerseusRadioWidgetOptions["multipleSelect"],
    countChoices: PerseusRadioWidgetOptions["countChoices"],
    numCorrect: PerseusRadioWidgetOptions["numCorrect"],
) {
    return multipleSelect && countChoices && numCorrect;
}

/**
 * Given a PerseusRadioWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getRadioPublicWidgetOptions(
    options: PerseusRadioWidgetOptions,
): RadioPublicWidgetOptions {
    const {numCorrect, choices, multipleSelect, countChoices} = options;

    return {
        ...options,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        numCorrect: usesNumCorrect(multipleSelect, countChoices, numCorrect)
            ? numCorrect
            : undefined,
        choices: choices.map(getRadioChoicePublicData),
    };
}

export default getRadioPublicWidgetOptions;
