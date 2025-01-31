import {getWidgetIdsFromContent, mapObject} from "@khanacademy/perseus-core";

import {scoreIsEmpty, flattenScores} from "./util/scoring";
import {
    getWidgetScorer,
    getWidgetValidator,
    upgradeWidgetInfoToLatestVersion,
} from "./widgets";

import type {PerseusStrings} from "./strings";
import type {
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";
import type {
    UserInputMap,
    PerseusScore,
    ValidationDataMap,
} from "@khanacademy/perseus-score";

export function getUpgradedWidgetOptions(
    oldWidgetOptions: PerseusWidgetsMap,
): PerseusWidgetsMap {
    return mapObject(oldWidgetOptions, (widgetInfo, widgetId) => {
        if (!widgetInfo.type || !widgetInfo.alignment) {
            const newValues: Record<string, any> = {};

            if (!widgetInfo.type) {
                // TODO: why does widget have no type?
                // We don't want to derive type from widget ID
                // see: LEMS-1845
                newValues.type = widgetId.split(" ")[0];
            }

            if (!widgetInfo.alignment) {
                newValues.alignment = "default";
            }

            widgetInfo = {...widgetInfo, ...newValues};
        }
        // TODO(LEMS-2656): remove TS suppression
        return upgradeWidgetInfoToLatestVersion(widgetInfo) as any;
    });
}

/**
 * Checks the given user input to see if any answerable widgets have not been
 * "filled in" (ie. if they're empty). Another way to think about this
 * function is that its a check to see if we can score the provided input.
 */
export function emptyWidgetsFunctional(
    widgets: ValidationDataMap,
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
    widgetIds: ReadonlyArray<string>,
    userInputMap: UserInputMap,
    strings: PerseusStrings,
    locale: string,
): ReadonlyArray<string> {
    return widgetIds.filter((id) => {
        const widget = widgets[id];
        if (!widget || widget.static === true) {
            // Static widgets shouldn't count as empty
            return false;
        }

        const validator = getWidgetValidator(widget.type);
        const userInput = userInputMap[id];
        const validationData = widget.options;
        const score = validator?.(userInput, validationData, strings, locale);

        if (score) {
            return scoreIsEmpty(score);
        }
    });
}

// TODO: combine scorePerseusItem with scoreWidgetsFunctional
// once scorePerseusItem is the only one calling scoreWidgetsFunctional
export function scorePerseusItem(
    perseusRenderData: PerseusRenderer,
    userInputMap: UserInputMap,
    // TODO(LEMS-2461,LEMS-2391): these probably
    // need to be removed before we move this to the server
    strings: PerseusStrings,
    locale: string,
): PerseusScore {
    // There seems to be a chance that PerseusRenderer.widgets might include
    // widget data for widgets that are not in PerseusRenderer.content,
    // so this checks that the widgets are being used before scoring them
    const usedWidgetIds = getWidgetIdsFromContent(perseusRenderData.content);
    const scores = scoreWidgetsFunctional(
        perseusRenderData.widgets,
        usedWidgetIds,
        userInputMap,
        strings,
        locale,
    );
    return flattenScores(scores);
}

export function scoreWidgetsFunctional(
    widgets: PerseusWidgetsMap,
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
    widgetIds: ReadonlyArray<string>,
    userInputMap: UserInputMap,
    strings: PerseusStrings,
    locale: string,
): {[widgetId: string]: PerseusScore} {
    const upgradedWidgets = getUpgradedWidgetOptions(widgets);

    const gradedWidgetIds = widgetIds.filter((id) => {
        const props = upgradedWidgets[id];
        const widgetIsGraded: boolean = props?.graded == null || props.graded;
        const widgetIsStatic = !!props?.static;
        // Ungraded widgets or widgets set to static shouldn't be graded.
        return widgetIsGraded && !widgetIsStatic;
    });

    const widgetScores: Record<string, PerseusScore> = {};
    gradedWidgetIds.forEach((id) => {
        const widget = upgradedWidgets[id];
        if (!widget) {
            return;
        }

        const userInput = userInputMap[id];
        const validator = getWidgetValidator(widget.type);
        const scorer = getWidgetScorer(widget.type);

        // We do validation (empty checks) first and then scoring. If
        // validation fails, it's result is itself a PerseusScore.
        const score =
            validator?.(userInput, widget.options, strings, locale) ??
            scorer?.(userInput, widget.options, strings, locale);
        if (score != null) {
            widgetScores[id] = score;
        }
    });

    return widgetScores;
}
