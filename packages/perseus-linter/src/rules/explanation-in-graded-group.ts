import Rule from "../rule";

import type {
    PerseusGradedGroupSetWidgetOptions,
    PerseusGradedGroupWidgetOptions,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

function hasExplanation(widgets: PerseusWidgetsMap): boolean {
    return Object.values(widgets).some(
        (widget) => widget.type === "explanation",
    );
}

// Graded groups render their own "Explain" button, so an Explanation widget
// inside one shows learners two differently-styled "Explain" buttons.
export default Rule.makeRule({
    name: "explanation-in-graded-group",
    severity: Rule.Severity.WARNING,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        const widget = context?.widgets?.[nodeId];
        if (!widget) {
            return;
        }

        // The issues panel can't highlight linter warnings in the preview, so
        // the location in the message is the only way authors can find it.
        const message = (location: string) =>
            `Explanation widget in graded group (${location}): Use the Graded Group Hint instead.`;

        if (widget.type === "graded-group") {
            const options: PerseusGradedGroupWidgetOptions = widget.options;
            if (hasExplanation(options.widgets)) {
                return message(nodeId);
            }
        }

        if (widget.type === "graded-group-set") {
            const options: PerseusGradedGroupSetWidgetOptions = widget.options;
            const groupNumbers = options.gradedGroups
                .map((group, i) => (hasExplanation(group.widgets) ? i + 1 : 0))
                .filter((groupNumber) => groupNumber > 0);
            if (groupNumbers.length > 0) {
                return message(
                    `${nodeId}, group ${groupNumbers.join(" and ")}`,
                );
            }
        }
    },
});
