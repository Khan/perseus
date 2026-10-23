import Rule from "../rule";

import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

function hasExplanation(widgets: PerseusWidgetsMap): boolean {
    return Object.values(widgets).some(
        (widget) => widget.type === "explanation",
    );
}

// Graded groups render their own "Explain" button, so an Explanation widget
// inside one shows learners two differently-styled "Explain" buttons.
export const ExplanationInGradedGroup = Rule.makeWidgetRule({
    name: "explanation-in-graded-group",
    widgetType: "graded-group",
    severity: Rule.Severity.WARNING,
    lint(gradedGroup) {
        if (hasExplanation(gradedGroup.options.widgets)) {
            return `Should not contain explanation widget. Use the Graded Group Hint instead.`;
        }
    },
});

export const ExplanationInGradedGroupSet = Rule.makeWidgetRule({
    name: "explanation-in-graded-group-set",
    widgetType: "graded-group-set",
    severity: Rule.Severity.WARNING,
    lint(gradedGroupSet) {
        const groupNumbers = gradedGroupSet.options.gradedGroups
            .map((group, i) => (hasExplanation(group.widgets) ? i + 1 : 0))
            .filter((groupNumber) => groupNumber > 0);

        if (groupNumbers.length === 0) {
            return;
        }

        if (groupNumbers.length === 1) {
            return `Graded group ${groupNumbers[0]} should not contain explanation widget. Use the Graded Group Hint instead.`;
        } else {
            return `Graded groups ${groupNumbers.join(" and ")} should not contain explanation widgets. Use the Graded Group Hint instead.`;
        }
    },
});
