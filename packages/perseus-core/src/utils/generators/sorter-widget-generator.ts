import sorterWidgetLogic from "../../widgets/sorter";

import type {
    PerseusSorterWidgetOptions,
    SorterLegend,
    SorterWidget,
} from "../../data-schema";

export function generateSorterOptions(
    options?: Partial<PerseusSorterWidgetOptions>,
): PerseusSorterWidgetOptions {
    return {
        ...sorterWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateSorterLegend(
    options?: Partial<SorterLegend>,
): SorterLegend {
    return {
        startCap: "arrow",
        endCap: "bar",
        startLabel: "Lowest",
        endLabel: "Highest",
        ariaLabel: "Interest rates, lowest at the start to highest at the end",
        position: "above",
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
        alignment: "block",
        options: generateSorterOptions(),
        ...sorterWidgetProperties,
    };
}
