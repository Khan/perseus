import type {
    PerseusRadioChoice,
    PerseusRadioWidgetOptions,
} from "../../data-schema";

export const currentVersion = {major: 2, minor: 0};

export const widgetOptionsUpgrades = {
    "2": (v1props: any): PerseusRadioWidgetOptions => {
        const {choices, numCorrect, ...rest} = v1props;

        return {
            ...rest,
            choices,
            hasNoneOfTheAbove: false,
            numCorrect:
                numCorrect ??
                choices.reduce(
                    (acc: number, curr: PerseusRadioChoice) =>
                        curr.correct ? acc + 1 : acc,
                    0,
                ),
        };
    },
    "1": (v0props: any): PerseusRadioWidgetOptions => {
        const {noneOfTheAbove, ...rest} = v0props;

        if (noneOfTheAbove) {
            throw new Error(
                "radio widget v0 no longer supports auto noneOfTheAbove",
            );
        }

        return {
            ...rest,
            hasNoneOfTheAbove: false,
        };
    },
} as const;

export type RadioDefaultWidgetOptions = Pick<
    PerseusRadioWidgetOptions,
    | "choices"
    | "displayCount"
    | "randomize"
    | "hasNoneOfTheAbove"
    | "multipleSelect"
    | "countChoices"
    | "deselectEnabled"
>;

export const defaultWidgetOptions: RadioDefaultWidgetOptions = {
    choices: [{}, {}, {}, {}] as any,
    displayCount: null,
    randomize: false,
    hasNoneOfTheAbove: false,
    multipleSelect: false,
    countChoices: false,
    deselectEnabled: false,
};
