import Util from "./util";
import {getWidgetValidator} from "./widgets";

import type {PerseusWidgetsMap} from "./perseus-types";
import type {PerseusStrings} from "./strings";
import type {PerseusScore} from "./types";
import type {UserInput} from "./validation.types";

// It can be nested because of Groups
// TODO: can it be infinitely nested? How do we type that?
type UserInputMap = Record<string, UserInput | Record<string, UserInput>>;

export function flattenScores(widgetScoreMap: {
    [widgetId: string]: PerseusScore;
}): PerseusScore {
    return Object.values(widgetScoreMap).reduce(
        Util.combineScores,
        Util.noScore,
    );
}

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
        const validator = getWidgetValidator(widget.type);

        if (widget.type === "group") {
            const scores = scoreWidgetsFunctional(
                widget.options.widgets,
                Object.keys(widget.options.widgets),
                userInputMap[id] as UserInputMap,
                strings,
                locale,
            );
            score = flattenScores(scores);
        } else if (validator) {
            score = validator(userInput, widget.options, strings, locale);
        }

        if (score) {
            return Util.scoreIsEmpty(score);
        }
    });
}

// WARNING: recursive in order to handle Group widgets
export function scoreWidgetsFunctional(
    widgets: PerseusWidgetsMap,
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
    widgetIds: Array<string>,
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
        const validator = getWidgetValidator(widget.type);
        if (widget.type === "group") {
            const scores = scoreWidgetsFunctional(
                widget.options.widgets,
                Object.keys(widget.options.widgets),
                userInputMap[id] as UserInputMap,
                strings,
                locale,
            );
            // TODO make this a shared function with the other one
            widgetScores[id] = flattenScores(scores);
        } else if (validator) {
            widgetScores[id] = validator(
                userInput,
                widget.options,
                strings,
                locale,
            );
        }
    });

    return widgetScores;
}
