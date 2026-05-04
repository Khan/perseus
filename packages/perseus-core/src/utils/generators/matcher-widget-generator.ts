import matcherWidgetLogic from "../../widgets/matcher";

import type {
    MatcherWidget,
    PerseusMatcherWidgetOptions,
} from "../../data-schema";

export function generateMatcherOptions(
    options?: Partial<PerseusMatcherWidgetOptions>,
): PerseusMatcherWidgetOptions {
    return {
        ...matcherWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateMatcherWidget(
    matcherWidgetProperties?: Partial<Omit<MatcherWidget, "type">>,
): MatcherWidget {
    return {
        type: "matcher",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateMatcherOptions(),
        ...matcherWidgetProperties,
    };
}
