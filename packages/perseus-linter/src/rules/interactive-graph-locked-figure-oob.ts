import Rule from "../rule";

import type {
    Coord,
    GraphRange,
    LockedFigure,
    LockedFunctionType,
    PerseusInteractiveGraphWidgetOptions,
} from "@khanacademy/perseus-core";

export default Rule.makeRule({
    name: "interactive-graph-locked-figure-oob",
    severity: Rule.Severity.WARNING,
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

        const {range, lockedFigures}: PerseusInteractiveGraphWidgetOptions =
            widget.options;

        const warnings: string[] = [];

        for (const figure of lockedFigures ?? []) {
            if (isEntirelyOutsideRange(figure, range)) {
                const figureType = getPreciseFigureType(figure);
                const isSinglePoint =
                    figure.type === "point" || figure.type === "label";
                warnings.push(
                    isSinglePoint
                        ? `Locked ${figureType} is outside the graph bounds.`
                        : `All defining points for locked ${figureType} are outside the graph bounds.`,
                );
            }
        }

        return warnings.join("\n\n");
    },
});

function getPreciseFigureType(figure: LockedFigure): string {
    switch (figure.type) {
        case "line":
            // Line, Segment, or Ray
            return figure.kind;
        case "ellipse":
            return figure.radius[0] === figure.radius[1] ? "circle" : "ellipse";
        default:
            return figure.type;
    }
}

function isInRange([x, y]: Coord, range: GraphRange): boolean {
    const [[xMin, xMax], [yMin, yMax]] = range;
    return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
}

// Figures are only flagged when every point that defines them is off the
// graph. Figures with a subset of points inside the graph are not flagged.
function isEntirelyOutsideRange(
    figure: LockedFigure,
    range: GraphRange,
): boolean {
    // Locked functions aren't checked.
    if (figure.type === "function") {
        return false;
    }

    return definingPoints(figure).every((point) => !isInRange(point, range));
}

function definingPoints(
    figure: Exclude<LockedFigure, LockedFunctionType>,
): Coord[] {
    switch (figure.type) {
        case "point":
        case "label":
            return [figure.coord];
        case "line":
            return figure.points.map((point) => point.coord);
        case "vector":
        case "polygon":
            return figure.points;
        case "ellipse": {
            // The center plus the four vertices at the ends of each axis.
            // The rotation is ignored for this simple implementation.
            const [cx, cy] = figure.center;
            const [rx, ry] = figure.radius;
            return [
                [cx, cy],
                [cx + rx, cy],
                [cx - rx, cy],
                [cx, cy + ry],
                [cx, cy - ry],
            ];
        }
    }
}
