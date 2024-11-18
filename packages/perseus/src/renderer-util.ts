import Util from "./util";
import {getWidgetIdsFromContent} from "./widget-type-utils";
import {getWidgetScorer} from "./widgets";

import type {PerseusRenderer, PerseusWidgetsMap} from "./perseus-types";
import type {PerseusStrings} from "./strings";
import type {PerseusScore} from "./types";
import type {UserInput, UserInputMap} from "./validation.types";

export function emptyWidgetsFunctional(
    widgets: PerseusWidgetsMap,
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
    widgetIds: Array<string>,
    userInputMap: UserInputMap,
    strings: PerseusStrings,
    locale: string,
): ReadonlyArray<string> {
    return widgetIds.filter((id) => {
        const widget = widgets[id];
        if (!widget || widget.static) {
            // Static widgets shouldn't count as empty
            return false;
        }

        let score: PerseusScore | null = null;
        const userInput = userInputMap[id];
        const scorer = getWidgetScorer(widget.type);

        if (widget.type === "group") {
            const scores = scoreWidgetsFunctional(
                widget.options.widgets,
                Object.keys(widget.options.widgets),
                userInputMap[id] as UserInputMap,
                strings,
                locale,
            );
            score = Util.flattenScores(scores);
        } else if (scorer) {
            score = scorer(
                userInput as UserInput,
                widget.options,
                strings,
                locale,
            );
        }

        if (score) {
            return Util.scoreIsEmpty(score);
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
    return Util.flattenScores(scores);
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
    const gradedWidgetIds = widgetIds.filter((id) => {
        const props = widgets[id];
        const widgetIsGraded: boolean = props?.graded == null || props.graded;
        const widgetIsStatic = !!props?.static;
        // Ungraded widgets or widgets set to static shouldn't be graded.
        return widgetIsGraded && !widgetIsStatic;
    });

    const widgetScores: Record<string, PerseusScore> = {};
    gradedWidgetIds.forEach((id) => {
        const widget = widgets[id];
        if (!widget) {
            return;
        }

        const userInput = userInputMap[id];
        const scorer = getWidgetScorer(widget.type);
        if (widget.type === "group") {
            const scores = scoreWidgetsFunctional(
                widget.options.widgets,
                getWidgetIdsFromContent(widget.options.content),
                userInputMap[id] as UserInputMap,
                strings,
                locale,
            );
            widgetScores[id] = Util.flattenScores(scores);
        } else if (scorer) {
            widgetScores[id] = scorer(
                userInput as UserInput,
                widget.options,
                strings,
                locale,
            );
        }
    });

    return widgetScores;
}
