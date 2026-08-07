import measurerWidgetLogic from "../../widgets/measurer";

import type {
    MeasurerWidget,
    PerseusMeasurerWidgetOptions,
} from "../../data-schema";

export function generateMeasurerOptions(
    options?: Partial<PerseusMeasurerWidgetOptions>,
): PerseusMeasurerWidgetOptions {
    return {
        ...measurerWidgetLogic.defaultWidgetOptions,
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
        options: generateMeasurerOptions(),
        ...measurerWidgetProperties,
    };
}
