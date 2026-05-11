import sorterWidgetLogic from "../../widgets/sorter";

import type {PerseusSorterWidgetOptions, SorterWidget} from "../../data-schema";

export function generateSorterOptions(
    options?: Partial<PerseusSorterWidgetOptions>,
): PerseusSorterWidgetOptions {
    return {
        ...sorterWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateSorterWidget(
    sorterWidgetProperties?: Partial<Omit<SorterWidget, "type">>,
): SorterWidget {
    return {
        type: "sorter",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateSorterOptions(),
        ...sorterWidgetProperties,
    };
}
