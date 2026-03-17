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
        const {correct, graph, lockedFigures} = widget.options;

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
                    // If every point is the same as the first point,
                    // then all the points are the same.
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
            correct?.type === "polygon" &&
            correct.numSides === "unlimited" &&
            correct.coords == null
        ) {
            issues.push("Polygon must be closed.");
        }

        // Exponential: the start asymptote must not fall between or on the
        // curve's start points — that makes the coefficient formula undefined.
        if (graph?.type === "exponential" && graph.startCoords != null) {
            const {coords, asymptote} = graph.startCoords;
            const asymptoteY = asymptote[0][1];
            const minY = Math.min(coords[0][1], coords[1][1]);
            const maxY = Math.max(coords[0][1], coords[1][1]);
            if (asymptoteY >= minY && asymptoteY <= maxY) {
                issues.push(
                    "The exponential start asymptote must not fall between or on the curve's start points.",
                );
            }
        }

        const allIssuesString = issues.join("\n\n");
        return allIssuesString;
    },
}) as Rule;
