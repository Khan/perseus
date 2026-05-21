import {convertInputNumberOptionsToNumericInput} from "@khanacademy/perseus-core";

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

type WidgetScores = {
    [widgetId: string]: PerseusScore;
};

type PerseusScoreWithWidgetScores = PerseusScore & {
    /**
     * The per-widget scores, keyed by widget ID, that contributed to the
     * item's overall score (see the `earned` and `total` fields).
     */
    widgetScores: WidgetScores;
};

/**
 * Filters the given widget `scores` dictionary and returns only widget scores
 * that are invalid.
 */
export function onlyInvalidScores(scores: WidgetScores): WidgetScores {
    return Object.fromEntries(
        Object.entries(scores).filter(
            ([key, value]) => value.type === "invalid",
        ),
    );
}

/**
 * Combines an overall score with constituent widget scores. Takes into account
 * if the overall score is invalid and strips out any widget scores that are
 * not `invalid` to protect against leaking correctness.
 */
export function combineScoreWithWidgetScores(
    score: PerseusScore,
    widgetScores: WidgetScores,
): PerseusScoreWithWidgetScores {
    if (score.type === "invalid") {
        return {
            ...score,
            // When the overall item score is invalid, we only return the
            // per-widget invalid scores. This prevents exposing correctness
            // information for widgets that were able to be scored.
            widgetScores: onlyInvalidScores(widgetScores),
        };
    } else {
        return {...score, widgetScores};
    }
}

/**
 * score a Perseus item
 *
 * TODO: this should be named differently -
 * it's scoring UserInput, not a PerseusItem; also it doesn't take a PerseusItem
 *
 * @param perseusRenderData - the full answer data, includes the correct answer
 * @param userInputMap - the user's input for each widget, mapped by ID
 * @param locale - string locale for math parsing ("de" 1.000,00 vs "en" 1,000.00)
 *
 * @returns The full {@link PerseusScore} as well as widget-level scores which
 * can be used to analyze which parts of the question the learner got correct
 * vs. incorrect. When the score result is "invalid", only "invalid" widget
 * scores are included in `widgetScores`.
 */
export function scorePerseusItem(
    perseusRenderData: PerseusRenderer,
    userInputMap: UserInputMap,
    locale: string,
): PerseusScoreWithWidgetScores {
    const scoreableWidgetIds = getScoreableWidgets(perseusRenderData);
    const widgetScores = scoreWidgetsFunctional(
        perseusRenderData.widgets,
        scoreableWidgetIds,
        userInputMap,
        locale,
    );

    return combineScoreWithWidgetScores(
        flattenScores(widgetScores),
        widgetScores,
    );
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
): PerseusScoreWithWidgetScores {
    const scoreableWidgetIds = getScoreableWidgets(perseusRenderData);
    const scores = scoreWidgetsFunctionalWithInputNumberAsNumericInput(
        perseusRenderData.widgets,
        scoreableWidgetIds,
        userInputMap,
        locale,
    );
    return combineScoreWithWidgetScores(flattenScores(scores), scores);
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
): WidgetScores {
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
            // V0 input-number data (from production logs) must be converted to
            // V1/numeric-input format before scoring. V1 data already has an
            // `answers` array and can be passed through as-is.
            // FIXME: NOOO! This is the wrong direction.
            widgetOptions =
                "answers" in widget.options &&
                Array.isArray(widget.options.answers)
                    ? widget.options
                    : convertInputNumberOptionsToNumericInput(widget.options);
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
