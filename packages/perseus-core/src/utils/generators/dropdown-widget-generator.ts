import dropdownWidgetLogic from "../../widgets/dropdown";

import type {
    DropdownWidget,
    PerseusDropdownWidgetOptions,
} from "../../data-schema";

export function generateDropdownOptions(
    options?: Partial<PerseusDropdownWidgetOptions>,
): PerseusDropdownWidgetOptions {
    return {
        ...(dropdownWidgetLogic.initializeWidgetOptions?.() as any),
        ...options,
    };
}

export function generateDropdownWidget(
    dropdownWidgetProperties?: Partial<Omit<DropdownWidget, "type">>,
): DropdownWidget {
    return {
        type: "dropdown",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateDropdownOptions(),
        ...dropdownWidgetProperties,
    };
}
