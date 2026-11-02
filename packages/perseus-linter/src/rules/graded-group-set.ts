import {lintPerseusRenderer} from "../lint-content";
import Rule from "../rule";

export const GradedGroupSetWidgetRule = Rule.makeWidgetRule({
    name: "graded-group-set",
    widgetType: "graded-group-set",
    lint: (widget, context) => {
        return widget.options.gradedGroups.flatMap((group, i) =>
            lintPerseusRenderer(group, context.contentType).map((issue) => ({
                ...issue,
                message: `group ${i + 1}: ${issue.message}`,
            })),
        );
    },
});
