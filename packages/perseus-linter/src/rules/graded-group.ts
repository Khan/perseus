import Rule from "../rule";

import {lintGradedGroup} from "./lint-graded-group";

export const GradedGroupWidgetRule = Rule.makeWidgetRule({
    name: "graded-group",
    widgetType: "graded-group",
    lint: (widget, context) => lintGradedGroup(widget.options, context),
});
