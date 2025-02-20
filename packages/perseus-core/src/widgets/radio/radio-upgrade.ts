import type {PerseusRadioWidgetOptions} from "../../data-schema";

export const currentVersion = {major: 2, minor: 0};

export function deriveNumCorrect(options: PerseusRadioWidgetOptions) {
    const {choices, numCorrect} = options;

    return numCorrect ?? choices.filter((c) => c.correct).length;
}

export const widgetOptionsUpgrades = {
    "2": (v1props: any): PerseusRadioWidgetOptions => {
        const upgraded = {
            ...v1props,
            numCorrect: deriveNumCorrect(v1props),
        };
        return upgraded;
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
