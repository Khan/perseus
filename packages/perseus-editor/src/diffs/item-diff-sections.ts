/**
 * A data-level view of an item diff: which sections ItemDiff would show as
 * changed, without rendering anything.
 */
import {filterWidgetInfo, getDiffedWidgetIds} from "./shared/diffed-widgets";
import performDiff from "./shared/widget-diff-performer";

import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * A section of an item that differs between two versions.
 *
 * `hintIndex` is 0-based. `widgetId` is the widget's key in the renderer's
 * `widgets` map (e.g. "radio 1").
 */
export type ChangedItemSection =
    | {section: "question"}
    | {section: "question-widget"; widgetId: string}
    | {section: "hint"; hintIndex: number}
    | {section: "hint-widget"; hintIndex: number; widgetId: string}
    | {section: "answer-area"};

/**
 * Report whether a structural diff of two values finds any difference.
 *
 * A missing side is diffed as an empty object, as WidgetDiff and
 * AnswerAreaDiff do, so a value present on only one side counts as changed.
 */
const hasChanges = (before: unknown, after: unknown): boolean =>
    performDiff(before ?? {}, after ?? {}).status !== "unchanged";

/**
 * List the widgets of a renderer that RendererDiff would show as changed.
 *
 * ItemDiff renders questions and hints with alignment options hidden, so
 * alignment never counts as a change here either.
 */
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
 * List the sections of an item that differ between two versions.
 *
 * Reports exactly the sections ItemDiff would render as changed, derived
 * with the same rules: text content counts as changed when it differs, a
 * widget only when its id appears in the content and only in the fields
 * ItemDiff compares, and the answer area when its structural diff finds a
 * difference. A hint present on only one side is reported as a changed
 * hint without listing its widgets, since the whole hint is new or gone.
 *
 * Sections come in item order: the question, then its widgets, then each
 * hint followed by its widgets, then the answer area.
 *
 * @param before The earlier version of the item.
 * @param after The later version of the item.
 * @returns The changed sections, empty when the two versions diff clean.
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
