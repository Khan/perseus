import groupWidgetLogic from "../../widgets/group";

import type {GroupWidget, PerseusGroupWidgetOptions} from "../../data-schema";

export function generateGroupOptions(
    options?: Partial<PerseusGroupWidgetOptions>,
): PerseusGroupWidgetOptions {
    return {
        ...groupWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateGroupWidget(
    groupWidgetProperties?: Partial<Omit<GroupWidget, "type">>,
): GroupWidget {
    return {
        type: "group",
        graded: false,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateGroupOptions(),
        ...groupWidgetProperties,
    };
}
