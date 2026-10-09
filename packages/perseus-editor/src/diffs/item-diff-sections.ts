/**
 * Which sections of an item ItemDiff would show as changed, as data.
 */
import {filterWidgetInfo, getDiffedWidgetIds} from "./shared/diffed-widgets";
import performDiff from "./shared/widget-diff-performer";

import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * A section of an item that differs between two versions. `hintIndex` is
 * 0-based.
 */
export type ChangedItemSection =
    | {section: "question"}
    | {section: "question-widget"; widgetId: string}
    | {section: "hint"; hintIndex: number}
    | {section: "hint-widget"; hintIndex: number; widgetId: string}
    | {section: "answer-area"};

/** A missing side diffs as `{}`, as WidgetDiff and AnswerAreaDiff do. */
const hasChanges = (before: unknown, after: unknown): boolean =>
    performDiff(before ?? {}, after ?? {}).status !== "unchanged";

// ItemDiff hides alignment options for questions and hints, so alignment
// never counts as a change here either.
const getChangedWidgetIds = (
    before: PerseusRenderer,
    after: PerseusRenderer,
): string[] =>
    getDiffedWidgetIds(before, after).filter((widgetId) =>
        hasChanges(
            filterWidgetInfo(before.widgets[widgetId], false),
            filterWidgetInfo(after.widgets[widgetId], false),
        ),
    );

/**
 * List the sections of an item that differ between two versions, in item
 * order: question, its widgets, each hint and its widgets, answer area.
 *
 * Uses the same rules as ItemDiff, so it reports exactly what the rendered
 * diff would show as changed. A hint present on only one side is reported
 * as a changed hint without its widgets.
 */
export function getChangedItemSections(
    before: PerseusItem,
    after: PerseusItem,
): ChangedItemSection[] {
    const sections: ChangedItemSection[] = [];

    if (before.question.content !== after.question.content) {
        sections.push({section: "question"});
    }
    for (const widgetId of getChangedWidgetIds(
        before.question,
        after.question,
    )) {
        sections.push({section: "question-widget", widgetId});
    }

    const hintCount = Math.max(before.hints.length, after.hints.length);
    for (let hintIndex = 0; hintIndex < hintCount; hintIndex++) {
        if (
            hintIndex >= before.hints.length ||
            hintIndex >= after.hints.length
        ) {
            sections.push({section: "hint", hintIndex});
            continue;
        }

        const beforeHint = before.hints[hintIndex];
        const afterHint = after.hints[hintIndex];
        if (beforeHint.content !== afterHint.content) {
            sections.push({section: "hint", hintIndex});
        }
        for (const widgetId of getChangedWidgetIds(beforeHint, afterHint)) {
            sections.push({section: "hint-widget", hintIndex, widgetId});
        }
    }

    if (hasChanges(before.answerArea, after.answerArea)) {
        sections.push({section: "answer-area"});
    }

    return sections;
}
