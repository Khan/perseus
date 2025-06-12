import {getWidgetIdsFromContent} from "@khanacademy/perseus-core";

import {
    getWidgetsFromWidgetMap,
    getWidgetsMapFromItemData,
} from "../widget-type-utils";

import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * This function takes a Perseus item and splits its question content using the provided delimiter,
 * creating separate Perseus items for each section. Widgets are distributed to the
 * appropriate sections based on their location in the content.
 *
 * @param item - The Perseus item to separate
 * @param delimiter - The string delimiter to split on (e.g., "||", "=====", "---")
 * @returns An array of Perseus items, one for each section created by splitting on the delimiter.
 *          If the delimiter is not found, returns an array with the original item.
 *          If multiple delimiters are found, creates multiple sections.
 *
 * @example
 * ```typescript
 * const item = {
 *   question: {
 *     content: "Question 1 [[☃ radio 1]]||Question 2 [[☃ radio 2]]",
 *     widgets: {
 *       "radio 1": { type: "radio", options: {...} },
 *       "radio 2": { type: "radio", options: {...} }
 *     },
 *     images: {}
 *   },
 *   hints: [],
 *   answerArea: null
 * };
 *
 * const result = separatePerseusItemByDelimiter(item, "||");
 * // Returns:
 * // [
 * //   { question: { content: "Question 1 [[☃ radio 1]]", widgets: { "radio 1": {...} }, ... }, ... },
 * //   { question: { content: "Question 2 [[☃ radio 2]]", widgets: { "radio 2": {...} }, ... }, ... }
 * // ]
 * ```
 */
export function splitPerseusItemByDelimiter(
    item: PerseusItem,
    delimiter: string,
): Array<PerseusItem> {
    const perseusQuestion = item.question;
    const widgetMap = getWidgetsMapFromItemData(item);
    // - What should happen if the delimiter is not found?
    // - What should happen if the delimiter is found more than once?
    const perseusContentArray = perseusQuestion.content.split(delimiter);

    const separatedPerseusItems = perseusContentArray.map((content) => {
        const widgets = getWidgetIdsFromContent(content);
        return {
            ...item,
            question: {
                ...perseusQuestion,
                content,
                widgets: getWidgetsFromWidgetMap(widgets, widgetMap),
            },
        };
    });
    return separatedPerseusItems;
}
