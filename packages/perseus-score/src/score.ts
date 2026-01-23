import {applyDefaultsToWidgets} from "@khanacademy/perseus-core";

import flattenScores from "./util/flatten-scores";
import getScoreableWidgets from "./util/get-scoreable-widgets";
import isWidgetScoreable from "./util/is-widget-scoreable";
import {getWidgetScorer, getWidgetValidator} from "./widgets/widget-registry";

import type {
    PerseusRenderer,
    PerseusScore,
    PerseusWidgetsMap,
    UserInputMap,
    UserInput,
} from "@khanacademy/perseus-core";

/**
 * score a Perseus item
 *
 * TODO: this should be named differently -
 * it's scoring UserInput, not a PerseusItem; also it doesn't take a PerseusItem
 *
 * @param perseusRenderData - the full answer data, includes the correct answer
 * @param userInputMap - the user's input for each widget, mapped by ID
 * @param locale - string locale for math parsing ("de" 1.000,00 vs "en" 1,000.00)
 */
export function scorePerseusItem(
    perseusRenderData: PerseusRenderer,
    userInputMap: UserInputMap,
    locale: string,
): PerseusScore {
    const {upgradedWidgets, scoreableWidgetIds} =
        getScoreableWidgets(perseusRenderData);
    const scores = scoreWidgetsFunctional(
        upgradedWidgets,
        scoreableWidgetIds,
        userInputMap,
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
    locale: string,
): {[widgetId: string]: PerseusScore} {
    // TODO: do we still need this? Shouldn't this happen during parse/migrate?
    const upgradedWidgets = applyDefaultsToWidgets(widgets);

    const gradedWidgetIds = widgetIds.filter((id) =>
        isWidgetScoreable(upgradedWidgets[id]),
    );

    const widgetScores: Record<string, PerseusScore> = {};
    gradedWidgetIds.forEach((id) => {
        const widget = upgradedWidgets[id]!;

        // TODO(benchristel): Without the explicit type annotation, the type of
        // userInput would be inferred as `any`. This is because the keys of
        // userInputMap are strings with a specific format, but `id` is any old
        // string. Find a way to make this more typesafe.
        const userInput: UserInput | undefined = userInputMap[id];
        const validator = getWidgetValidator(widget.type);
        const scorer = getWidgetScorer(widget.type);

        // We do validation (empty checks) first and then scoring. If
        // validation fails, it's result is itself a PerseusScore.
        const score =
            validator?.(userInput, widget.options, locale) ??
            scorer?.(userInput, widget.options, locale);
        if (score != null) {
            widgetScores[id] = score;
        }
    });

    return widgetScores;
}
