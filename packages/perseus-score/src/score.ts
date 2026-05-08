import {convertInputNumberOptionsToNumericInput} from "@khanacademy/perseus-core";

import flattenScores from "./util/flatten-scores";
import getScoreableWidgets from "./util/get-scoreable-widgets";
import isWidgetScoreable from "./util/is-widget-scoreable";
import {getWidgetScorer, getWidgetValidator} from "./widgets/widget-registry";

import type {
    PerseusItemScore,
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
): PerseusItemScore {
    const scoreableWidgetIds = getScoreableWidgets(perseusRenderData);
    const widgetScores = scoreWidgetsFunctional(
        perseusRenderData.widgets,
        scoreableWidgetIds,
        userInputMap,
        locale,
    );
    const score = flattenScores(widgetScores);

    if (score.type === "points") {
        return {score, widgetScores};
    } else {
        // NOTE: We don't reveal widget scores when the overall score is
        // {type: invalid} so that we don't leak scoring info. If this info
        // surfaced to the learner's browser, they could take advantage of the
        // info by leaving the one widget that is invalid in that state and
        // making multiple attempts on other widgets ({type: invalid} doesn't
        // count as an attempt, so they'd get free attempts).
        return {score, widgetScores: {}};
    }
}

/**
 * @experimental - this is a temporary function for use by the Input Number to
 * Numeric Input project. It will be removed in a future minor version.
 */
// TODO(LEMS-4085): remove this function once the Input Number to Numeric
//  Input project is complete.
export function scorePerseusItemWithInputNumberAsNumericInput(
    perseusRenderData: PerseusRenderer,
    userInputMap: UserInputMap,
    locale: string,
): PerseusScore {
    const scoreableWidgetIds = getScoreableWidgets(perseusRenderData);
    const scores = scoreWidgetsFunctionalWithInputNumberAsNumericInput(
        perseusRenderData.widgets,
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
    const gradedWidgetIds = widgetIds.filter((id) =>
        isWidgetScoreable(widgets[id]),
    );

    const widgetScores: Record<string, PerseusScore> = {};
    gradedWidgetIds.forEach((id) => {
        const widget = widgets[id]!;

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

// TODO(LEMS-4085): remove this function once the Input Number to Numeric
//  Input project is complete.
function scoreWidgetsFunctionalWithInputNumberAsNumericInput(
    widgets: PerseusWidgetsMap,
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
    widgetIds: ReadonlyArray<string>,
    userInputMap: UserInputMap,
    locale: string,
): {[widgetId: string]: PerseusScore} {
    const gradedWidgetIds = widgetIds.filter((id) =>
        isWidgetScoreable(widgets[id]),
    );

    const widgetScores: Record<string, PerseusScore> = {};
    gradedWidgetIds.forEach((id) => {
        const widget = widgets[id]!;

        // TODO(benchristel): Without the explicit type annotation, the type of
        // userInput would be inferred as `any`. This is because the keys of
        // userInputMap are strings with a specific format, but `id` is any old
        // string. Find a way to make this more typesafe.
        const userInput: UserInput | undefined = userInputMap[id];
        let widgetType;
        let widgetOptions;
        if (widget.type === "input-number") {
            widgetType = "numeric-input";
            widgetOptions = convertInputNumberOptionsToNumericInput(
                widget.options,
            );
        } else {
            widgetType = widget.type;
            widgetOptions = widget.options;
        }

        const validator = getWidgetValidator(widgetType);
        const scorer = getWidgetScorer(widgetType);

        // We do validation (empty checks) first and then scoring. If
        // validation fails, it's result is itself a PerseusScore.
        const score =
            validator?.(userInput, widgetOptions, locale) ??
            scorer?.(userInput, widgetOptions, locale);
        if (score != null) {
            widgetScores[id] = score;
        }
    });

    return widgetScores;
}
