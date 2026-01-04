/**
 * Item Variation Creation
 *
 * Creates variations of Perseus items by applying substitutions.
 * This is used by the Scale Item feature to generate multiple
 * versions of an exercise item with different values.
 *
 * All Perseus model knowledge is encapsulated here - consumers pass
 * opaque tokens without needing to understand Perseus internals.
 */
import deepClone from "./deep-clone";

import type {PerseusItem} from "../data-schema";
import type {VariableSubstitution} from "../types";

/**
 * Create a variation of a Perseus item with substitutions applied.
 * Tokens are opaque - only this function knows how to interpret them.
 */
export function createItemVariation(
    item: PerseusItem,
    substitutions: VariableSubstitution[],
): PerseusItem {
    const newItem = deepClone(item);

    for (const sub of substitutions) {
        applySubstitution(newItem, sub.token, sub.newValue);
    }

    return newItem;
}

/**
 * Apply a single substitution to an item based on the token.
 */
function applySubstitution(
    item: PerseusItem,
    token: string,
    newValue: string,
): void {
    const parts = token.split(".");

    if (parts[0] === "question" && parts[1] === "content") {
        applyQuestionContentSubstitution(item, parts.slice(2), newValue);
    } else if (parts[0] === "widget") {
        applyWidgetSubstitution(item, parts.slice(1), newValue);
    } else if (parts[0] === "hint") {
        applyHintSubstitution(item, parts.slice(1), newValue);
    }
}

/**
 * Apply substitution to question content.
 */
function applyQuestionContentSubstitution(
    item: PerseusItem,
    _remainingParts: string[],
    newValue: string,
): void {
    // For now, replace entire content
    // Future: support substring replacement with parts like "12:25" for char range
    item.question.content = newValue;
}

/**
 * Apply substitution to a hint.
 */
function applyHintSubstitution(
    item: PerseusItem,
    parts: string[],
    newValue: string,
): void {
    // parts[0] = hint index, parts[1] = "content"
    const hintIndex = parseInt(parts[0], 10);

    if (item.hints && item.hints[hintIndex] && parts[1] === "content") {
        item.hints[hintIndex].content = newValue;
    }
}

/**
 * Apply substitution to a widget.
 */
function applyWidgetSubstitution(
    item: PerseusItem,
    parts: string[],
    newValue: string,
): void {
    // parts[0] = widget ID, parts[1...] = path within widget
    const widgetId = parts[0];
    const widget = item.question.widgets?.[widgetId];

    if (!widget || !widget.options) {
        return;
    }

    const pathParts = parts.slice(1);

    switch (widget.type) {
        case "radio":
            applyRadioSubstitution(widget.options, pathParts, newValue);
            break;
        case "numeric-input":
            applyNumericInputSubstitution(widget.options, pathParts, newValue);
            break;
        case "expression":
            applyExpressionSubstitution(widget.options, pathParts, newValue);
            break;
        case "interactive-graph":
            applyInteractiveGraphSubstitution(widget.options, pathParts, newValue);
            break;
    }
}

/**
 * Apply substitution to a radio widget.
 */
function applyRadioSubstitution(
    options: Record<string, unknown>,
    parts: string[],
    newValue: string,
): void {
    // parts: ["choices", index, "content"]
    if (parts[0] === "choices" && parts[2] === "content") {
        const index = parseInt(parts[1], 10);
        const choices = options.choices as Array<{content: string}>;
        if (choices && choices[index]) {
            choices[index].content = newValue;
        }
    }
}

/**
 * Apply substitution to a numeric-input widget.
 */
function applyNumericInputSubstitution(
    options: Record<string, unknown>,
    parts: string[],
    newValue: string,
): void {
    if (parts[0] === "labelText") {
        options.labelText = newValue;
    }
}

/**
 * Apply substitution to an expression widget.
 */
function applyExpressionSubstitution(
    options: Record<string, unknown>,
    parts: string[],
    newValue: string,
): void {
    if (parts[0] === "answerForms" && parts[2] === "value") {
        const index = parseInt(parts[1], 10);
        const answerForms = options.answerForms as Array<{value: string}>;
        if (answerForms && answerForms[index]) {
            answerForms[index].value = newValue;
        }
    } else if (parts[0] === "visibleLabel") {
        options.visibleLabel = newValue;
    } else if (parts[0] === "ariaLabel") {
        options.ariaLabel = newValue;
    }
}

/**
 * Apply substitution to an interactive-graph widget.
 */
function applyInteractiveGraphSubstitution(
    options: Record<string, unknown>,
    parts: string[],
    newValue: string,
): void {
    if (parts[0] === "labels") {
        const index = parseInt(parts[1], 10);
        const labels = options.labels as string[];
        if (labels) {
            labels[index] = newValue;
        }
    } else if (parts[0] === "fullGraphAriaLabel") {
        options.fullGraphAriaLabel = newValue;
    } else if (parts[0] === "fullGraphAriaDescription") {
        options.fullGraphAriaDescription = newValue;
    } else if (parts[0] === "lockedFigures") {
        applyLockedFigureSubstitution(options, parts.slice(1), newValue);
    } else if (parts[0] === "correct") {
        applyCorrectAnswerSubstitution(options, parts.slice(1), newValue);
    }
}

/**
 * Apply substitution to a locked figure.
 */
function applyLockedFigureSubstitution(
    options: Record<string, unknown>,
    parts: string[],
    newValue: string,
): void {
    // parts: [figureIndex, "ariaLabel" | "labels" | "coord" | "text", ...]
    const figureIndex = parseInt(parts[0], 10);
    const lockedFigures = options.lockedFigures as Array<Record<string, unknown>>;

    if (!lockedFigures || !lockedFigures[figureIndex]) {
        return;
    }

    const figure = lockedFigures[figureIndex];

    if (parts[1] === "ariaLabel") {
        figure.ariaLabel = newValue;
    } else if (parts[1] === "text") {
        figure.text = newValue;
    } else if (parts[1] === "labels") {
        const labelIndex = parseInt(parts[2], 10);
        const labels = figure.labels as Array<{text: string}>;
        if (labels && labels[labelIndex] && parts[3] === "text") {
            labels[labelIndex].text = newValue;
        }
    } else if (parts[1] === "coord") {
        // Parse coordinate string like "(1, 2)" to [1, 2]
        const coords = parseCoordinate(newValue);
        if (coords) {
            figure.coord = coords;
        }
    }
}

/**
 * Apply substitution to correct answer coordinates.
 */
function applyCorrectAnswerSubstitution(
    options: Record<string, unknown>,
    parts: string[],
    newValue: string,
): void {
    const correct = options.correct as Record<string, unknown>;
    if (!correct) {
        return;
    }

    if (parts[0] === "coords") {
        const coords = correct.coords as Array<unknown>;
        if (!coords) {
            return;
        }

        // Handle nested coordinates (e.g., for segments)
        if (parts.length === 2) {
            // Simple coordinate: correct.coords.0
            const index = parseInt(parts[1], 10);
            const newCoord = parseCoordinate(newValue);
            if (newCoord) {
                coords[index] = newCoord;
            }
        } else if (parts.length === 3) {
            // Nested coordinate: correct.coords.0.1 (segment)
            const segIndex = parseInt(parts[1], 10);
            const pointIndex = parseInt(parts[2], 10);
            const segment = coords[segIndex] as Array<unknown>;
            if (segment) {
                const newCoord = parseCoordinate(newValue);
                if (newCoord) {
                    segment[pointIndex] = newCoord;
                }
            }
        }
    } else if (parts[0] === "center") {
        const newCoord = parseCoordinate(newValue);
        if (newCoord) {
            correct.center = newCoord;
        }
    } else if (parts[0] === "radius") {
        correct.radius = parseFloat(newValue);
    }
}

/**
 * Parse a coordinate string like "(1, 2)" or "1, 2" to [number, number].
 */
function parseCoordinate(value: string): [number, number] | null {
    // Remove parentheses and whitespace
    const cleaned = value.replace(/[()]/g, "").trim();
    const parts = cleaned.split(",").map((p) => p.trim());

    if (parts.length !== 2) {
        return null;
    }

    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);

    if (isNaN(x) || isNaN(y)) {
        return null;
    }

    return [x, y];
}

