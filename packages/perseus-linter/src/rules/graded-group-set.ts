import Rule from "../rule";

import {lintGradedGroup} from "./lint-graded-group";

import type {Lint} from "../lint";

export const GradedGroupSetWidgetRule = Rule.makeWidgetRule({
    name: "graded-group-set",
    widgetType: "graded-group-set",
    lint: (widget, context) => {
        return widget.options.gradedGroups.flatMap((gradedGroup, i) =>
            lintGradedGroup(gradedGroup, context).map(prefixGroupNumber(i + 1)),
        );
    },
});

function prefixGroupNumber(n: number): (lint: Lint) => Lint {
    return (lint) => ({...lint, message: `group ${n}: ${lint.message}`});
}
