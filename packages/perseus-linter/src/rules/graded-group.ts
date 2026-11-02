import {lintPerseusRenderer} from "../lint-content";
import Rule from "../rule";

// TODO-NEXT: Create a rule along the lines of this one for GradedGroupSet.
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
