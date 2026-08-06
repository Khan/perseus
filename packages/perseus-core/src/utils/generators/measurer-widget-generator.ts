import type {
    MeasurerWidget,
    PerseusMeasurerWidgetOptions,
} from "../../data-schema";

export function generateMeasurerOptions(
    options?: Partial<PerseusMeasurerWidgetOptions>,
): PerseusMeasurerWidgetOptions {
    const defaultMeasurerOptions: PerseusMeasurerWidgetOptions = {
        image: {},
        showProtractor: false,
        showRuler: false,
        rulerLabel: "cm",
        rulerTicks: 10,
        rulerPixels: 40,
        rulerLength: 10,
        box: [400, 400],
    };

    return {
        ...defaultMeasurerOptions,
        ...options,
    };
}

export function generateMeasurerWidget(
    measurerWidgetProperties?: Partial<Omit<MeasurerWidget, "type">>,
): MeasurerWidget {
    return {
        type: "measurer",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateMeasurerOptions({}),
        ...measurerWidgetProperties,
    };
}
