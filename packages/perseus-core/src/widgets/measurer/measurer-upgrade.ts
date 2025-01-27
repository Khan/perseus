import type {PerseusMeasurerWidgetOptions} from "../../data-schema";

export const currentVersion = {major: 1, minor: 0};

export const widgetOptionsUpgrades = {
    "1": (v0options: any): PerseusMeasurerWidgetOptions => {
        const {imageUrl, imageTop, imageLeft, ...rest} = v0options;

        return {
            ...rest,
            image: {
                url: imageUrl,
                top: imageTop,
                left: imageLeft,
            },
        };
    },
} as const;

export type MeasurerDefaultWidgetOptions = Pick<
    PerseusMeasurerWidgetOptions,
    | "box"
    | "image"
    | "showProtractor"
    | "showRuler"
    | "rulerLabel"
    | "rulerTicks"
    | "rulerPixels"
    | "rulerLength"
>;

export const defaultWidgetOptions: MeasurerDefaultWidgetOptions = {
    box: [480, 480],
    image: {} as any,
    showProtractor: true,
    showRuler: false,
    rulerLabel: "",
    rulerTicks: 10,
    rulerPixels: 40,
    rulerLength: 10,
};
