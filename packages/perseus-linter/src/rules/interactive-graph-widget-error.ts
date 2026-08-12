import {vector as kvector} from "@khanacademy/kmath";

import Rule from "../rule";

// eslint-disable-next-line no-restricted-syntax
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
            const asymptoteY = asymptote;
            const minY = Math.min(coords[0][1], coords[1][1]);
            const maxY = Math.max(coords[0][1], coords[1][1]);
            if (asymptoteY >= minY && asymptoteY <= maxY) {
                issues.push(
                    "The exponential start asymptote must not fall between or on the curve's start points.",
                );
            }
        }

        checkShowPointLabelsHasLabels(graph, issues);
        checkShowPointLabelsHasLabels(correct, issues);

        const allIssuesString = issues.join("\n\n");
        return allIssuesString;
    },
}) as Rule;

// Fields checked in addition to `type`, `showPointLabels`, and `pointLabels`
// so we can compute the expected label count for graph types whose number
// of labelable points depends on runtime configuration.
type ShowPointLabelsShape = {
    type: string;
    showPointLabels?: boolean;
    pointLabels?: readonly string[];
    numPoints?: number | "unlimited";
    numSides?: number | "unlimited";
    numSegments?: number;
};

function checkShowPointLabelsHasLabels(
    g: ShowPointLabelsShape | undefined,
    issues: Array<string>,
) {
    if (g == null || g.type === "none" || g.type === "vector") {
        return;
    }
    if (g.showPointLabels !== true) {
        return;
    }
    const labels = g.pointLabels;
    if (labels === undefined || labels.every((l) => l == null || l === "")) {
        issues.push(
            "showPointLabels is true but pointLabels has no labels. Provide a label for at least one point.",
        );
        return;
    }
    const expected = expectedLabelCount(g);
    if (expected !== undefined && labels.length !== expected) {
        issues.push(
            `pointLabels has ${labels.length} entries but this graph type expects ${expected}. Use empty strings ("") to skip labels for specific points, e.g. ["A", "", "C"].`,
        );
    }
}

// Returns the number of labelable points on `g`, or `undefined` when the
// count depends on runtime state that isn't authored (e.g. `numPoints:
// "unlimited"`) and therefore can't be validated at lint time.
function expectedLabelCount(g: ShowPointLabelsShape): number | undefined {
    switch (g.type) {
        case "angle":
        case "quadratic":
            return 3;
        case "linear":
        case "ray":
        case "sinusoid":
        case "absolute-value":
        case "exponential":
        case "logarithm":
        case "tangent":
            return 2;
        case "circle":
            return 1;
        case "linear-system":
            // Two lines, two endpoints each, flat-indexed.
            return 4;
        case "segment":
            // Two endpoints per segment, flat-indexed. Default to one
            // segment if `numSegments` isn't set (matches the widget's
            // default).
            return (g.numSegments ?? 1) * 2;
        case "point":
            if (g.numPoints === "unlimited" || g.numPoints == null) {
                return undefined;
            }
            return g.numPoints;
        case "polygon":
            if (g.numSides === "unlimited" || g.numSides == null) {
                return undefined;
            }
            return g.numSides;
        default:
            return undefined;
    }
}
