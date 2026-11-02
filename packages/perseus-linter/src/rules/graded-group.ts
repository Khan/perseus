import {lintPerseusRenderer} from "../lint-content";
import Rule from "../rule";

export const GradedGroupWidgetRule = Rule.makeWidgetRule({
    name: "graded-group",
    widgetType: "graded-group",
    lint: (widget, {contentType}) => {
        const {hint} = widget.options;

        const issues = [...lintPerseusRenderer(widget.options, contentType)];

        if (hint) {
            const hintIssues = lintPerseusRenderer(hint, contentType).map(
                (lint) => ({...lint, message: `(in hint) ${lint.message}`}),
            );
            issues.push(...hintIssues);
        }

        return issues;
    },
});

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
