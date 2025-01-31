import type {PerseusRadioWidgetOptions} from "../../data-schema";

export const currentVersion = {major: 1, minor: 0};

export const widgetOptionsUpgrades = {
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
