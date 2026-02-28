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
import type {TextSubstitution, VariableSubstitution} from "../types";

/**
 * Create a variation of a Perseus item with substitutions applied.
 * Tokens are opaque - only this function knows how to interpret them.
 * This replaces entire field values.
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
 * Apply text substitutions with character offsets to a Perseus item.
 * This allows replacing specific substrings within fields rather than
 * replacing the entire field value.
 *
 * Substitutions are applied in reverse order by position to avoid
 * index shifting issues when multiple substitutions target the same field.
 *
 * @param item - The Perseus item to modify
 * @param substitutions - Array of text substitutions with character offsets
 * @returns A new item with substitutions applied
 */
export function applyTextSubstitutions(
    item: PerseusItem,
    substitutions: TextSubstitution[],
): PerseusItem {
    const newItem = deepClone(item);

    // Group substitutions by token
    const byToken = new Map<string, TextSubstitution[]>();
    for (const sub of substitutions) {
        const existing = byToken.get(sub.token) ?? [];
        existing.push(sub);
        byToken.set(sub.token, existing);
    }

    // Apply substitutions for each token
    for (const [token, tokenSubs] of byToken) {
        // Get current text value for this token
        const currentText = getTextValueForToken(newItem, token);
        if (currentText == null) {
            continue;
        }

        // Sort substitutions by startIndex descending (apply from end to start)
        const sortedSubs = [...tokenSubs].sort(
            (a, b) => b.startIndex - a.startIndex,
        );

        // Apply each substitution
        let text = currentText;
        for (const sub of sortedSubs) {
            text =
                text.slice(0, sub.startIndex) +
                sub.newValue +
                text.slice(sub.endIndex);
        }

        // Set the modified text back
        setTextValueForToken(newItem, token, text);
    }

    return newItem;
}

/**
 * Get the text value for a given token from a Perseus item.
 */
function getTextValueForToken(item: PerseusItem, token: string): string | null {
    const parts = token.split(".");

    if (parts[0] === "question" && parts[1] === "content") {
        return item.question.content ?? null;
    }

    if (parts[0] === "hint") {
        const hintIndex = parseInt(parts[1], 10);
        if (item.hints?.[hintIndex] != null && parts[2] === "content") {
            return item.hints[hintIndex].content ?? null;
        }
        return null;
    }

    if (parts[0] === "widget") {
        return getWidgetTextValue(item, parts.slice(1));
    }

    return null;
}

/**
 * Set the text value for a given token in a Perseus item.
 */
function setTextValueForToken(
    item: PerseusItem,
    token: string,
    value: string,
): void {
    const parts = token.split(".");

    if (parts[0] === "question" && parts[1] === "content") {
        item.question.content = value;
        return;
    }

    if (parts[0] === "hint") {
        const hintIndex = parseInt(parts[1], 10);
        if (item.hints?.[hintIndex] != null && parts[2] === "content") {
            item.hints[hintIndex].content = value;
        }
        return;
    }

    if (parts[0] === "widget") {
        setWidgetTextValue(item, parts.slice(1), value);
    }
}

/**
 * Get text value from a widget by path parts.
 */
function getWidgetTextValue(item: PerseusItem, parts: string[]): string | null {
    const widgetId = parts[0];
    const widget = item.question.widgets?.[widgetId];

    if (widget == null || widget.options == null) {
        return null;
    }

    const pathParts = parts.slice(1);
    const options = widget.options as Record<string, unknown>;

    switch (widget.type) {
        case "radio":
            if (pathParts[0] === "choices" && pathParts[2] === "content") {
                const index = parseInt(pathParts[1], 10);
                const choices = options.choices as
                    | Array<{content: string}>
                    | undefined;
                return choices?.[index]?.content ?? null;
            }
            break;
        case "numeric-input":
            if (pathParts[0] === "labelText") {
                return (options.labelText as string) ?? null;
            }
            break;
        case "expression":
            if (pathParts[0] === "answerForms" && pathParts[2] === "value") {
                const index = parseInt(pathParts[1], 10);
                const answerForms = options.answerForms as
                    | Array<{value: string}>
                    | undefined;
                return answerForms?.[index]?.value ?? null;
            }
            if (pathParts[0] === "visibleLabel") {
                return (options.visibleLabel as string) ?? null;
            }
            if (pathParts[0] === "ariaLabel") {
                return (options.ariaLabel as string) ?? null;
            }
            break;
        case "interactive-graph":
            return getInteractiveGraphTextValue(options, pathParts);
    }

    return null;
}

/**
 * Set text value in a widget by path parts.
 */
function setWidgetTextValue(
    item: PerseusItem,
    parts: string[],
    value: string,
): void {
    const widgetId = parts[0];
    const widget = item.question.widgets?.[widgetId];

    if (widget == null || widget.options == null) {
        return;
    }

    const pathParts = parts.slice(1);
    const options = widget.options as Record<string, unknown>;

    switch (widget.type) {
        case "radio":
            if (pathParts[0] === "choices" && pathParts[2] === "content") {
                const index = parseInt(pathParts[1], 10);
                const choices = options.choices as
                    | Array<{content: string}>
                    | undefined;
                if (choices?.[index] != null) {
                    choices[index].content = value;
                }
            }
            break;
        case "numeric-input":
            if (pathParts[0] === "labelText") {
                options.labelText = value;
            }
            break;
        case "expression":
            if (pathParts[0] === "answerForms" && pathParts[2] === "value") {
                const index = parseInt(pathParts[1], 10);
                const answerForms = options.answerForms as
                    | Array<{value: string}>
                    | undefined;
                if (answerForms?.[index] != null) {
                    answerForms[index].value = value;
                }
            } else if (pathParts[0] === "visibleLabel") {
                options.visibleLabel = value;
            } else if (pathParts[0] === "ariaLabel") {
                options.ariaLabel = value;
            }
            break;
        case "interactive-graph":
            setInteractiveGraphTextValue(options, pathParts, value);
            break;
    }
}

/**
 * Get text value from interactive graph widget.
 */
function getInteractiveGraphTextValue(
    options: Record<string, unknown>,
    parts: string[],
): string | null {
    if (parts[0] === "labels") {
        const index = parseInt(parts[1], 10);
        const labels = options.labels as string[] | undefined;
        return labels?.[index] ?? null;
    }
    if (parts[0] === "fullGraphAriaLabel") {
        return (options.fullGraphAriaLabel as string) ?? null;
    }
    if (parts[0] === "fullGraphAriaDescription") {
        return (options.fullGraphAriaDescription as string) ?? null;
    }
    if (parts[0] === "lockedFigures") {
        return getLockedFigureTextValue(options, parts.slice(1));
    }
    return null;
}

/**
 * Set text value in interactive graph widget.
 */
function setInteractiveGraphTextValue(
    options: Record<string, unknown>,
    parts: string[],
    value: string,
): void {
    if (parts[0] === "labels") {
        const index = parseInt(parts[1], 10);
        const labels = options.labels as string[] | undefined;
        if (labels != null) {
            labels[index] = value;
        }
    } else if (parts[0] === "fullGraphAriaLabel") {
        options.fullGraphAriaLabel = value;
    } else if (parts[0] === "fullGraphAriaDescription") {
        options.fullGraphAriaDescription = value;
    } else if (parts[0] === "lockedFigures") {
        setLockedFigureTextValue(options, parts.slice(1), value);
    }
}

/**
 * Get text value from a locked figure.
 */
function getLockedFigureTextValue(
    options: Record<string, unknown>,
    parts: string[],
): string | null {
    const figureIndex = parseInt(parts[0], 10);
    const lockedFigures = options.lockedFigures as
        | Array<Record<string, unknown>>
        | undefined;

    if (lockedFigures?.[figureIndex] == null) {
        return null;
    }

    const figure = lockedFigures[figureIndex];

    if (parts[1] === "ariaLabel") {
        return (figure.ariaLabel as string) ?? null;
    }
    if (parts[1] === "text") {
        return (figure.text as string) ?? null;
    }
    if (parts[1] === "labels") {
        const labelIndex = parseInt(parts[2], 10);
        const labels = figure.labels as Array<{text: string}> | undefined;
        if (labels?.[labelIndex] != null && parts[3] === "text") {
            return labels[labelIndex].text ?? null;
        }
    }
    return null;
}

/**
 * Set text value in a locked figure.
 */
function setLockedFigureTextValue(
    options: Record<string, unknown>,
    parts: string[],
    value: string,
): void {
    const figureIndex = parseInt(parts[0], 10);
    const lockedFigures = options.lockedFigures as
        | Array<Record<string, unknown>>
        | undefined;

    if (lockedFigures?.[figureIndex] == null) {
        return;
    }

    const figure = lockedFigures[figureIndex];

    if (parts[1] === "ariaLabel") {
        figure.ariaLabel = value;
    } else if (parts[1] === "text") {
        figure.text = value;
    } else if (parts[1] === "labels") {
        const labelIndex = parseInt(parts[2], 10);
        const labels = figure.labels as Array<{text: string}> | undefined;
        if (labels?.[labelIndex] != null && parts[3] === "text") {
            labels[labelIndex].text = value;
        }
    }
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

    if (
        item.hints != null &&
        item.hints[hintIndex] != null &&
        parts[1] === "content"
    ) {
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

    if (widget == null || widget.options == null) {
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
            applyInteractiveGraphSubstitution(
                widget.options,
                pathParts,
                newValue,
            );
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
        const choices = options.choices as Array<{content: string}> | undefined;
        if (choices != null && choices[index] != null) {
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
        const answerForms = options.answerForms as
            | Array<{value: string}>
            | undefined;
        if (answerForms != null && answerForms[index] != null) {
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
        const labels = options.labels as string[] | undefined;
        if (labels != null) {
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
    const lockedFigures = options.lockedFigures as
        | Array<Record<string, unknown>>
        | undefined;

    if (lockedFigures == null || lockedFigures[figureIndex] == null) {
        return;
    }

    const figure = lockedFigures[figureIndex];

    if (parts[1] === "ariaLabel") {
        figure.ariaLabel = newValue;
    } else if (parts[1] === "text") {
        figure.text = newValue;
    } else if (parts[1] === "labels") {
        const labelIndex = parseInt(parts[2], 10);
        const labels = figure.labels as Array<{text: string}> | undefined;
        if (
            labels != null &&
            labels[labelIndex] != null &&
            parts[3] === "text"
        ) {
            labels[labelIndex].text = newValue;
        }
    } else if (parts[1] === "coord") {
        // Parse coordinate string like "(1, 2)" to [1, 2]
        const coords = parseCoordinate(newValue);
        if (coords != null) {
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
    const correct = options.correct as Record<string, unknown> | undefined;
    if (correct == null) {
        return;
    }

    if (parts[0] === "coords") {
        const coords = correct.coords as Array<unknown> | undefined;
        if (coords == null) {
            return;
        }

        // Handle nested coordinates (e.g., for segments)
        if (parts.length === 2) {
            // Simple coordinate: correct.coords.0
            const index = parseInt(parts[1], 10);
            const newCoord = parseCoordinate(newValue);
            if (newCoord != null) {
                coords[index] = newCoord;
            }
        } else if (parts.length === 3) {
            // Nested coordinate: correct.coords.0.1 (segment)
            const segIndex = parseInt(parts[1], 10);
            const pointIndex = parseInt(parts[2], 10);
            const segment = coords[segIndex] as Array<unknown> | undefined;
            if (segment != null) {
                const newCoord = parseCoordinate(newValue);
                if (newCoord != null) {
                    segment[pointIndex] = newCoord;
                }
            }
        }
    } else if (parts[0] === "center") {
        const newCoord = parseCoordinate(newValue);
        if (newCoord != null) {
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
