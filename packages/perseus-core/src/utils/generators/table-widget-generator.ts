import tableWidgetLogic from "../../widgets/table";

import type {PerseusTableWidgetOptions, TableWidget} from "../../data-schema";

export function generateTableOptions(
    options?: Partial<PerseusTableWidgetOptions>,
): PerseusTableWidgetOptions {
    return {
        ...tableWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateTableWidget(
    tableWidgetProperties?: Partial<Omit<TableWidget, "type">>,
): TableWidget {
    return {
        type: "table",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateTableOptions(),
        ...tableWidgetProperties,
    };
}
