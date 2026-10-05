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

        const message =
            "Explanation widget in graded group: Use the graded group's Explain section instead.";

        if (widget.type === "graded-group") {
            const options: PerseusGradedGroupWidgetOptions = widget.options;
            if (hasExplanation(options.widgets)) {
                return message;
            }
        }

        if (widget.type === "graded-group-set") {
            const options: PerseusGradedGroupSetWidgetOptions = widget.options;
            if (
                options.gradedGroups.some((group) =>
                    hasExplanation(group.widgets),
                )
            ) {
                return message;
            }
        }
    },
});
