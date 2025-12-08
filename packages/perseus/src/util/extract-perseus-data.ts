import {keys} from "@khanacademy/wonder-stuff-core";

import {
    getWidgetTypeByWidgetId,
    getWidgetsMapFromItemData,
} from "../widget-type-utils";
import * as Widgets from "../widgets";

import type {
    PerseusItem,
    PerseusWidgetsMap,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

/**
 * Looks through widgets to identify images that do not have alt text.
 *
 * We pass in the fuller perseusRenderer object to allow for the possibility
 * of expanding to include other img data from content & images in the future.
 *
 * @param {PerseusRenderer} perseusRenderer
 * @returns a stringified list of {widgetId, imageUrl} for imgs that don't have alt text
 */
function getImagesWithoutAltData(perseusRenderer: PerseusRenderer): string {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!perseusRenderer.widgets) {
        return "";
    }

    const imgsWithoutAltData: {imgUrl: string; widgetId: string}[] = [];

    Object.entries(perseusRenderer.widgets).forEach(([widgetId, widget]) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!widget.options) {
            return;
        }

        // Add to imagesWithoutAltData if img alt is missing and
        // image has valid img url data.
        if (
            widget.type === "image" &&
            !widget.options.alt &&
            widget.options.backgroundImage?.url
        ) {
            imgsWithoutAltData.push({
                widgetId,
                imgUrl: widget.options.backgroundImage.url,
            });
        }
    });

    return JSON.stringify(imgsWithoutAltData);
}

/* Widgets that have individual answers */
const INDIVIDUAL_ANSWER_WIDGETS = [
    "interactive-graph",
    "categorizer",
    "grapher",
];

/* Widgets that are supported for automatic scoring */
const SUPPORTED_WIDGETS = [
    "radio",
    "numeric-input",
    "input-number",
    "expression",
    ...INDIVIDUAL_ANSWER_WIDGETS,
];

/* Verify if the perseus item has supported widgets for automatic scoring */
export const isWrongAnswerSupported = (
    widgetIds: Array<string>,
    widgetMap: PerseusWidgetsMap,
): boolean => {
    return (
        widgetIds.length !== 0 &&
        widgetIds.every((widgetId) =>
            SUPPORTED_WIDGETS.includes(
                getWidgetTypeByWidgetId(widgetId, widgetMap) as string,
            ),
        )
    );
};

/* Verify if the widget ID has an individual answer for the coach report view  */
export const shouldHaveIndividualAnswer = (
    widgetId: string,
    widgetMap: PerseusWidgetsMap,
): boolean => {
    return INDIVIDUAL_ANSWER_WIDGETS.includes(
        getWidgetTypeByWidgetId(widgetId, widgetMap) as string,
    );
};

/* Returns the answer userInput submission for currently supported widgets */
// TODO (LEMS-1834): Fix userInput any types to be specific
export const getAnswerFromUserInput = (widgetType: string, userInput: any) => {
    switch (widgetType) {
        case "categorizer":
            return userInput.values;
        case "input-number":
            return userInput.currentValue;
        case "numeric-input":
            return userInput.currentValue;
        case "radio":
            return userInput.selectedChoiceIds;
    }
    return userInput;
};

/* Returns the correct answer for a given widget ID and Perseus Item */
// TODO (LEMS-1835): We should fix the resonse type from getWidget to be specific.
// TODO (LEMS-1836): We should also consider adding the getOneCorrectAnswerFromRubric method to all widgets.
export const getCorrectAnswerForWidgetId = (
    widgetId: string,
    itemData: PerseusItem,
): string | null | undefined => {
    const rubric = itemData.question.widgets[widgetId].options;
    const widgetMap = getWidgetsMapFromItemData(itemData);
    const widgetType = getWidgetTypeByWidgetId(widgetId, widgetMap) as string;

    const widget = Widgets.getWidgetExport(widgetType);

    return widget?.getOneCorrectAnswerFromRubric?.(rubric);
};

/* Verify if the widget ID exists in the content string of the Perseus Item */
export const isWidgetIdInContent = (
    perseusItem: PerseusItem,
    widgetId: string,
): boolean => {
    return perseusItem.question.content.indexOf(widgetId as string) !== -1;
};

/* Return an array of all the widget IDs that exist in the content string of a Perseus Item */
export const getValidWidgetIds = (perseusItem: PerseusItem): Array<string> => {
    const {widgets} = perseusItem.question;
    return keys(widgets).filter((id) => isWidgetIdInContent(perseusItem, id));
};

export {getImagesWithoutAltData};
