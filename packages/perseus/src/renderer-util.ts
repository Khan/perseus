import Util from "./util";
import {getWidgetValidator} from "./widgets";

import type {PerseusWidget} from "./perseus-types";
import type {PerseusStrings} from "./strings";
import type {PerseusScore} from "./types";

type WidgetInfo = Readonly<{
    [id: string]: PerseusWidget | null | undefined;
}>;

function scoreWidgetsFunctional(
    widgetProps: WidgetInfo,
    widgetIds: Array<string>,
    userInputMap: any,
    strings: PerseusStrings,
    locale: string,
): {[widgetId: string]: PerseusScore} {
    const gradedWidgetIds = widgetIds.filter((id) => {
        const props = widgetProps[id];
        const widgetIsGraded: boolean = props?.graded == null || props.graded;
        const widgetIsStatic = !!props?.static;
        // Ungraded widgets or widgets set to static shouldn't be graded.
        return widgetIsGraded && !widgetIsStatic;
    });

    const widgetScores: Record<string, PerseusScore> = {};
    gradedWidgetIds.forEach((id) => {
        const props = widgetProps[id];
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

export {scoreWidgetsFunctional};
