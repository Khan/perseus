import {
    Errors,
    applyDefaultsToWidgets,
    getWidgetIdsFromContent,
    PerseusError,
} from "@khanacademy/perseus-core";

import {getWidgetScorer, getWidgetValidator} from "./widgets/widget-registry";

import type {
    PerseusRenderer,
    PerseusScore,
    PerseusWidgetsMap,
    UserInputMap,
} from "@khanacademy/perseus-core";

const noScore: PerseusScore = {
    type: "points",
    earned: 0,
    total: 0,
    message: null,
};

/**
 * If a widget says that it is empty once it is graded.
 * Trying to encapsulate references to the score format.
 */
export function scoreIsEmpty(score: PerseusScore): boolean {
    // HACK(benkomalo): ugh. this isn't great; the Perseus score objects
    // overload the type "invalid" for what should probably be three
    // distinct cases:
    //  - truly empty or not fully filled out
    //  - invalid or malformed inputs
    //  - "almost correct" like inputs where the widget wants to give
    //  feedback (e.g. a fraction needs to be reduced, or `pi` should
    //  be used instead of 3.14)
    //
    //  Unfortunately the coercion happens all over the place, as these
    //  Perseus style score objects are created *everywhere* (basically
    //  in every widget), so it's hard to change now. We assume that
    //  anything with a "message" is not truly empty, and one of the
    //  latter two cases for now.
    return (
        score.type === "invalid" &&
        (!score.message || score.message.length === 0)
    );
}

/**
 * Combine two score objects.
 *
 * Given two score objects for two different widgets, combine them so that
 * if one is wrong, the total score is wrong, etc.
 */
function combineScores(
    scoreA: PerseusScore,
    scoreB: PerseusScore,
): PerseusScore {
    let message;

    if (scoreA.type === "points" && scoreB.type === "points") {
        if (
            scoreA.message &&
            scoreB.message &&
            scoreA.message !== scoreB.message
        ) {
            // TODO(alpert): Figure out how to combine messages usefully
            message = null;
        } else {
            message = scoreA.message || scoreB.message;
        }

        return {
            type: "points",
            earned: scoreA.earned + scoreB.earned,
            total: scoreA.total + scoreB.total,
            message: message,
        };
    }
    if (scoreA.type === "points" && scoreB.type === "invalid") {
        return scoreB;
    }
    if (scoreA.type === "invalid" && scoreB.type === "points") {
        return scoreA;
    }
    if (scoreA.type === "invalid" && scoreB.type === "invalid") {
        if (
            scoreA.message &&
            scoreB.message &&
            scoreA.message !== scoreB.message
        ) {
            // TODO(alpert): Figure out how to combine messages usefully
            message = null;
        } else {
            message = scoreA.message || scoreB.message;
        }

        return {
            type: "invalid",
            message: message,
        };
    }

    /**
     * The above checks cover all combinations of score type, so if we get here
     * then something is amiss with our inputs.
     */
    throw new PerseusError(
        "PerseusScore with unknown type encountered",
        Errors.InvalidInput,
        {
            metadata: {
                scoreA: JSON.stringify(scoreA),
                scoreB: JSON.stringify(scoreB),
            },
        },
    );
}

export function flattenScores(widgetScoreMap: {
    [widgetId: string]: PerseusScore;
}): PerseusScore {
    return Object.values(widgetScoreMap).reduce(combineScores, noScore);
}

/**
 * score a Perseus item
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
    // There seems to be a chance that PerseusRenderer.widgets might include
    // widget data for widgets that are not in PerseusRenderer.content,
    // so this checks that the widgets are being used before scoring them
    const usedWidgetIds = getWidgetIdsFromContent(perseusRenderData.content);
    const scores = scoreWidgetsFunctional(
        perseusRenderData.widgets,
        usedWidgetIds,
        userInputMap,
        locale,
    );
    return flattenScores(scores);
}

// TODO: combine scorePerseusItem with scoreWidgetsFunctional
export function scoreWidgetsFunctional(
    widgets: PerseusWidgetsMap,
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
    widgetIds: ReadonlyArray<string>,
    userInputMap: UserInputMap,
    locale: string,
): {[widgetId: string]: PerseusScore} {
    const upgradedWidgets = applyDefaultsToWidgets(widgets);

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
            validator?.(userInput, widget.options, locale) ??
            scorer?.(userInput, widget.options, locale);
        if (score != null) {
            widgetScores[id] = score;
        }
    });

    return widgetScores;
}
