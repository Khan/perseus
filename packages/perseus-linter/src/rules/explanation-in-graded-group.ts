import Rule from "../rule";

import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

function hasExplanation(widgets: PerseusWidgetsMap): boolean {
    return Object.values(widgets).some(
        (widget) => widget.type === "explanation",
    );
}

const instructions = `Don't use explanation widgets in graded groups. Use the Graded Group Hint instead.`;

// Graded groups render their own "Explain" button, so an Explanation widget
// inside one shows learners two differently-styled "Explain" buttons.
export const ExplanationInGradedGroup = Rule.makeWidgetRule({
    name: "explanation-in-graded-group",
    severity: Rule.Severity.WARNING,
    widgetType: "graded-group",
    lint: function (widget) {
        if (hasExplanation(widget.options.widgets)) {
            return `Contains explanation widget. ${instructions}`;
        }
    },
});

export const ExplanationInGradedGroupSet = Rule.makeWidgetRule({
    name: "explanation-in-graded-group-set",
    severity: Rule.Severity.WARNING,
    widgetType: "graded-group-set",
    lint: function (widget) {
        const groupNumbers = widget.options.gradedGroups
            .map((group, i) => (hasExplanation(group.widgets) ? i + 1 : 0))
            .filter((groupNumber) => groupNumber > 0);
        if (groupNumbers.length > 0) {
            return `Explanation widget in group ${groupNumbers.join(" and ")}. ${instructions}`;
        }
    },
});
