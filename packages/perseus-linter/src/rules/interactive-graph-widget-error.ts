import {vector as kvector} from "@khanacademy/kmath";

import Rule from "../rule";

export default Rule.makeRule({
    name: "interactive-graph-widget-error",
    severity: Rule.Severity.ERROR,
    selector: "widget",
    lint: function (state, content, nodes, match, context) {
        // This rule only looks at interactive-graph widgets
        if (state.currentNode().widgetType !== "interactive-graph") {
            return;
        }

        const nodeId = state.currentNode().id;
        if (!nodeId) {
            return;
        }

        // If it can't find a definition for the widget it does nothing
        const widget = context?.widgets?.[nodeId];
        if (!widget) {
            return;
        }

        const issues: Array<any | string> = [];
        const {lockedFigures, graph} = widget.options;

        for (const figure of lockedFigures ?? []) {
            // A locked line on the graph cannot have length 0.
            if (
                figure.type === "line" &&
                kvector.equal(figure.points[0].coord, figure.points[1].coord)
            ) {
                issues.push("Locked line cannot have length 0.");
            }

            // A locked polygon can't have all coordinates be the same.
            if (figure.type === "polygon") {
                if (
                    figure.points.every((point) =>
                        kvector.equal(point, figure.points[0]),
                    )
                ) {
                    issues.push(
                        "Locked polygon cannot have all coordinates be the same.",
                    );
                }
            }

            // A locked ellipse must have positive radius.
            if (figure.type === "ellipse") {
                if (figure.radius[0] <= 0 || figure.radius[1] <= 0) {
                    issues.push(
                        "Locked ellipse must have positive radius values.",
                    );
                }
            }
        }

        // Do not save a unlimited polygon that is open (coords is null).
        if (
            graph?.type === "polygon" &&
            graph.numSides === "unlimited" &&
            graph.coords == null
        ) {
            issues.push("Polygon must be closed.");
        }

        const allIssuesString = issues.join("\n\n");
        return allIssuesString;
    },
}) as Rule;
