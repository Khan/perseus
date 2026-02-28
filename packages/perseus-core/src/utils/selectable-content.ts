/**
 * Selectable Content Extraction
 *
 * Extracts selectable regions from Perseus items for variable creation.
 * This is used by the Scale Item feature to allow content creators to
 * create variables from item content.
 *
 * All Perseus model knowledge is encapsulated here - consumers receive
 * opaque tokens without needing to understand Perseus internals.
 */
import type {
    PerseusItem,
    PerseusWidget,
    PerseusRadioWidgetOptions,
    PerseusNumericInputWidgetOptions,
    PerseusExpressionWidgetOptions,
    PerseusInteractiveGraphWidgetOptions,
    LockedFigure,
} from "../data-schema";
import type {SelectableRegion} from "../types";

/**
 * Extract all selectable regions from a Perseus item.
 * Consumers receive opaque tokens - they don't need to understand the paths.
 */
export function extractSelectableRegions(
    item: PerseusItem,
): SelectableRegion[] {
    const regions: SelectableRegion[] = [];

    // 1. Main question content
    if (item.question.content) {
        regions.push({
            token: "question.content",
            text: item.question.content,
            label: "Question",
            category: "question",
        });
    }

    // 2. Widget content (using widget-specific extractors)
    for (const [widgetId, widget] of Object.entries(
        item.question.widgets ?? {},
    )) {
        const widgetRegions = extractWidgetRegions(widgetId, widget);
        regions.push(...widgetRegions);
    }

    // 3. Hints
    item.hints?.forEach((hint, index) => {
        if (hint.content) {
            regions.push({
                token: `hint.${index}.content`,
                text: hint.content,
                label: `Hint ${index + 1}`,
                category: "hint",
            });
        }
    });

    return regions;
}

/**
 * Extract selectable regions from a widget based on its type.
 */
function extractWidgetRegions(
    widgetId: string,
    widget: PerseusWidget,
): SelectableRegion[] {
    if (widget.options == null) {
        return [];
    }

    switch (widget.type) {
        case "radio":
            return extractRadioRegions(
                widgetId,
                widget.options as PerseusRadioWidgetOptions,
            );
        case "numeric-input":
            return extractNumericInputRegions(
                widgetId,
                widget.options as PerseusNumericInputWidgetOptions,
            );
        case "expression":
            return extractExpressionRegions(
                widgetId,
                widget.options as PerseusExpressionWidgetOptions,
            );
        case "interactive-graph":
            return extractInteractiveGraphRegions(
                widgetId,
                widget.options as PerseusInteractiveGraphWidgetOptions,
            );
        default:
            return [];
    }
}

/**
 * Extract selectable regions from a radio widget.
 */
function extractRadioRegions(
    widgetId: string,
    options: PerseusRadioWidgetOptions,
): SelectableRegion[] {
    if (options.choices == null) {
        return [];
    }

    return options.choices.map((choice, index) => ({
        token: `widget.${widgetId}.choices.${index}.content`,
        text: choice.content,
        label: `Choice ${String.fromCharCode(65 + index)}`, // A, B, C...
        category: "widget" as const,
        widgetType: "radio",
    }));
}

/**
 * Extract selectable regions from a numeric-input widget.
 */
function extractNumericInputRegions(
    widgetId: string,
    options: PerseusNumericInputWidgetOptions,
): SelectableRegion[] {
    const regions: SelectableRegion[] = [];

    // Label text is the main selectable content
    if (options.labelText) {
        regions.push({
            token: `widget.${widgetId}.labelText`,
            text: options.labelText,
            label: "Label",
            category: "widget",
            widgetType: "numeric-input",
        });
    }

    return regions;
}

/**
 * Extract selectable regions from an expression widget.
 */
function extractExpressionRegions(
    widgetId: string,
    options: PerseusExpressionWidgetOptions,
): SelectableRegion[] {
    const regions: SelectableRegion[] = [];

    // Answer forms contain the expression values
    if (options.answerForms != null) {
        options.answerForms.forEach((form, index) => {
            if (form.value && form.considered === "correct") {
                regions.push({
                    token: `widget.${widgetId}.answerForms.${index}.value`,
                    text: form.value,
                    label: `Answer ${index + 1}`,
                    category: "answer",
                    widgetType: "expression",
                });
            }
        });
    }

    // Visible label
    if (options.visibleLabel) {
        regions.push({
            token: `widget.${widgetId}.visibleLabel`,
            text: options.visibleLabel,
            label: "Visible Label",
            category: "widget",
            widgetType: "expression",
        });
    }

    // Aria label
    if (options.ariaLabel) {
        regions.push({
            token: `widget.${widgetId}.ariaLabel`,
            text: options.ariaLabel,
            label: "Aria Label",
            category: "widget",
            widgetType: "expression",
        });
    }

    return regions;
}

/**
 * Extract selectable regions from an interactive-graph widget.
 */
function extractInteractiveGraphRegions(
    widgetId: string,
    options: PerseusInteractiveGraphWidgetOptions,
): SelectableRegion[] {
    const regions: SelectableRegion[] = [];

    // Axis labels
    if (options.labels) {
        options.labels.forEach((label, index) => {
            if (label) {
                regions.push({
                    token: `widget.${widgetId}.labels.${index}`,
                    text: label,
                    label: index === 0 ? "X-Axis Label" : "Y-Axis Label",
                    category: "widget",
                    widgetType: "interactive-graph",
                });
            }
        });
    }

    // Full graph aria label
    if (options.fullGraphAriaLabel) {
        regions.push({
            token: `widget.${widgetId}.fullGraphAriaLabel`,
            text: options.fullGraphAriaLabel,
            label: "Graph Aria Label",
            category: "widget",
            widgetType: "interactive-graph",
        });
    }

    // Full graph aria description
    if (options.fullGraphAriaDescription) {
        regions.push({
            token: `widget.${widgetId}.fullGraphAriaDescription`,
            text: options.fullGraphAriaDescription,
            label: "Graph Aria Description",
            category: "widget",
            widgetType: "interactive-graph",
        });
    }

    // Locked figures
    if (options.lockedFigures != null) {
        options.lockedFigures.forEach((figure, figureIndex) => {
            const figureRegions = extractLockedFigureRegions(
                widgetId,
                figure,
                figureIndex,
            );
            regions.push(...figureRegions);
        });
    }

    // Correct answer coordinates (for interactive graphs)
    const correctRegions = extractCorrectAnswerRegions(widgetId, options);
    regions.push(...correctRegions);

    return regions;
}

/**
 * Extract selectable regions from a locked figure.
 */
function extractLockedFigureRegions(
    widgetId: string,
    figure: LockedFigure,
    figureIndex: number,
): SelectableRegion[] {
    const regions: SelectableRegion[] = [];
    const baseToken = `widget.${widgetId}.lockedFigures.${figureIndex}`;

    // Aria label (common to most locked figures)
    if ("ariaLabel" in figure && figure.ariaLabel) {
        regions.push({
            token: `${baseToken}.ariaLabel`,
            text: figure.ariaLabel,
            label: `Locked ${figure.type} ${figureIndex + 1} - Aria Label`,
            category: "widget",
            widgetType: "interactive-graph",
        });
    }

    // Labels attached to the figure
    if ("labels" in figure && figure.labels != null) {
        figure.labels.forEach(
            (
                label: {text: string; coord: [number, number]},
                labelIndex: number,
            ) => {
                if (label.text) {
                    regions.push({
                        token: `${baseToken}.labels.${labelIndex}.text`,
                        text: label.text,
                        label: `Locked ${figure.type} ${figureIndex + 1} - Label ${labelIndex + 1}`,
                        category: "widget",
                        widgetType: "interactive-graph",
                    });
                }
            },
        );
    }

    // Coordinates - format as string for selection
    if (figure.type === "point" && "coord" in figure) {
        const coordStr = `(${figure.coord[0]}, ${figure.coord[1]})`;
        regions.push({
            token: `${baseToken}.coord`,
            text: coordStr,
            label: `Locked Point ${figureIndex + 1} - Coordinates`,
            category: "widget",
            widgetType: "interactive-graph",
        });
    }

    if (figure.type === "label" && "text" in figure) {
        regions.push({
            token: `${baseToken}.text`,
            text: figure.text,
            label: `Locked Label ${figureIndex + 1}`,
            category: "widget",
            widgetType: "interactive-graph",
        });
    }

    return regions;
}

/**
 * Extract selectable regions from the correct answer of an interactive graph.
 */
function extractCorrectAnswerRegions(
    widgetId: string,
    options: PerseusInteractiveGraphWidgetOptions,
): SelectableRegion[] {
    const regions: SelectableRegion[] = [];
    const correct = options.correct;

    if (correct == null || correct.type === "none") {
        return regions;
    }

    // Extract coordinates based on graph type
    if (correct.type === "point" && "coords" in correct && correct.coords) {
        correct.coords.forEach((coord: [number, number], index: number) => {
            const coordStr = `(${coord[0]}, ${coord[1]})`;
            regions.push({
                token: `widget.${widgetId}.correct.coords.${index}`,
                text: coordStr,
                label: `Correct Point ${index + 1}`,
                category: "answer",
                widgetType: "interactive-graph",
            });
        });
    }

    if (correct.type === "linear" && "coords" in correct && correct.coords) {
        correct.coords.forEach((coord: [number, number], index: number) => {
            const coordStr = `(${coord[0]}, ${coord[1]})`;
            regions.push({
                token: `widget.${widgetId}.correct.coords.${index}`,
                text: coordStr,
                label: `Line Point ${index + 1}`,
                category: "answer",
                widgetType: "interactive-graph",
            });
        });
    }

    if (correct.type === "segment" && "coords" in correct && correct.coords) {
        correct.coords.forEach(
            (
                segment: [[number, number], [number, number]],
                segIndex: number,
            ) => {
                segment.forEach(
                    (coord: [number, number], pointIndex: number) => {
                        const coordStr = `(${coord[0]}, ${coord[1]})`;
                        regions.push({
                            token: `widget.${widgetId}.correct.coords.${segIndex}.${pointIndex}`,
                            text: coordStr,
                            label: `Segment ${segIndex + 1} Point ${pointIndex + 1}`,
                            category: "answer",
                            widgetType: "interactive-graph",
                        });
                    },
                );
            },
        );
    }

    if (correct.type === "polygon" && "coords" in correct && correct.coords) {
        correct.coords.forEach((coord: [number, number], index: number) => {
            const coordStr = `(${coord[0]}, ${coord[1]})`;
            regions.push({
                token: `widget.${widgetId}.correct.coords.${index}`,
                text: coordStr,
                label: `Polygon Vertex ${index + 1}`,
                category: "answer",
                widgetType: "interactive-graph",
            });
        });
    }

    if (correct.type === "circle" && "center" in correct && correct.center) {
        const centerStr = `(${correct.center[0]}, ${correct.center[1]})`;
        regions.push({
            token: `widget.${widgetId}.correct.center`,
            text: centerStr,
            label: "Circle Center",
            category: "answer",
            widgetType: "interactive-graph",
        });

        if ("radius" in correct && correct.radius != null) {
            regions.push({
                token: `widget.${widgetId}.correct.radius`,
                text: String(correct.radius),
                label: "Circle Radius",
                category: "answer",
                widgetType: "interactive-graph",
            });
        }
    }

    return regions;
}
