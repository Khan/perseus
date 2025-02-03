import type {
    PerseusRadioChoice,
    PerseusRadioWidgetOptions,
} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusRadioWidgetOptions type
 */
type RadioPublicWidgetOptions = {
    choices: ReadonlyArray<RadioChoicePublicData>;
    hasNoneOfTheAbove?: PerseusRadioWidgetOptions["hasNoneOfTheAbove"];
    countChoices?: PerseusRadioWidgetOptions["countChoices"];
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
 * Given a PerseusRadioWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getRadioPublicWidgetOptions(
    options: PerseusRadioWidgetOptions,
): RadioPublicWidgetOptions {
    return {
        ...options,
        choices: options.choices.map(getRadioChoicePublicData),
    };
}

export default getRadioPublicWidgetOptions;
