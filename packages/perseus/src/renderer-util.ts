import Util from "./util";
import {getWidgetValidator} from "./widgets";

import type {PerseusWidgetsMap} from "./perseus-types";
import type {PerseusStrings} from "./strings";
import type {PerseusScore} from "./types";

function emptyWidgetsFunctional(
    widgets: PerseusWidgetsMap,
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
    widgetIds: Array<string>,
    userInputMap: any,
    strings: PerseusStrings,
    locale: string,
): ReadonlyArray<string> {
    return widgetIds.filter((id) => {
        const props = widgets[id];
        if (!props || props.static) {
            // Static widgets shouldn't count as empty
            return false;
        }

        let score: PerseusScore | null = null;
        const userInput = userInputMap[id];
        const validator = getWidgetValidator(props.type);

        if (props.type === "group") {
            const scores = scoreWidgetsFunctional(
                props.options.widgets,
                Object.keys(props.options.widgets),
                userInputMap[id],
                strings,
                locale,
            );
            // TODO make this a shared function with the other one
            score = Object.values(scores).reduce(
                Util.combineScores,
                Util.noScore,
            );
        } else if (validator) {
            score = validator(
                // the user input
                userInput,
                // the grading criteria
                props.options,
                // used for invalid input messages
                strings,
                // used for math evaluation (`.` vs `,` for math)
                locale,
            );
        }

        if (score) {
            return Util.scoreIsEmpty(score);
        }
    });
}

function scoreWidgetsFunctional(
    widgets: PerseusWidgetsMap,
    // This is a port of old code, I'm not sure why
    // we need widgetIds vs the keys of the widgets object
    widgetIds: Array<string>,
    userInputMap: any,
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
        const props = widgets[id];
        if (!props) {
            return;
        }

        const userInput = userInputMap[id];
        const validator = getWidgetValidator(props.type);
        if (props.type === "group") {
            const scores = scoreWidgetsFunctional(
                props.options.widgets,
                Object.keys(props.options.widgets),
                userInputMap[id],
                strings,
                locale,
            );
            // TODO make this a shared function with the other one
            widgetScores[id] = Object.values(scores).reduce(
                Util.combineScores,
                Util.noScore,
            );
        } else if (validator) {
            widgetScores[id] = validator(
                // the user input
                userInput,
                // the grading criteria
                props.options,
                // used for invalid input messages
                strings,
                // used for math evaluation (`.` vs `,` for math)
                locale,
            );
        }
    });

    return widgetScores;
}

export {scoreWidgetsFunctional, emptyWidgetsFunctional};
