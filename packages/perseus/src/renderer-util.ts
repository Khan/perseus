import {mapObject} from "@khanacademy/perseus-core";

import {scoreIsEmpty, flattenScores} from "./util/scoring";
import {getWidgetIdsFromContent} from "./widget-type-utils";
import {
    getWidgetScorer,
    getWidgetValidator,
    upgradeWidgetInfoToLatestVersion,
} from "./widgets";

import type {PerseusStrings} from "./strings";
import type {PerseusScore} from "./types";
import type {
    UserInput,
    UserInputMap,
    ValidationDataMap,
} from "./validation.types";
import type {
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

function mapWidgetIdsToEmptyScore(widgetIds: ReadonlyArray<string>): {
    [widgetId: string]: PerseusScore;
} {
    const emptyResult: {[widgetId: string]: PerseusScore} = {};
    widgetIds.forEach((widgetId) => {
        emptyResult[widgetId] = {type: "invalid", message: null};
    });
    return emptyResult;
}

export function getUpgradedWidgetOptions(
    oldWidgetOptions: PerseusWidgetsMap,
): PerseusWidgetsMap {
    // @ts-expect-error - TS2322 - Type '(props: Props) => Partial<Record<string, CategorizerWidget | CSProgramWidget | DefinitionWidget | DropdownWidget | ... 35 more ... | VideoWidget>>' is not assignable to type '(props: Props) => { [key: string]: PerseusWidget; }'.
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
        return upgradeWidgetInfoToLatestVersion(widgetInfo);
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

    // Do empty check first
    const emptyWidgets = emptyWidgetsFunctional(
        widgets,
        widgetIds,
        userInputMap,
        strings,
        locale,
    );
    if (emptyWidgets.length > 0) {
        return mapWidgetIdsToEmptyScore(emptyWidgets);
    }

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
        const scorer = getWidgetScorer(widget.type);
        const score = scorer?.(
            userInput as UserInput,
            widget.options,
            strings,
            locale,
        );
        if (score != null) {
            widgetScores[id] = score;
        }
    });

    return widgetScores;
}
