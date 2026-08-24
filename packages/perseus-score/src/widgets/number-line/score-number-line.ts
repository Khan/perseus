import {number as knumber} from "@khanacademy/kmath";

import type {
    PerseusNumberLineWidgetOptions,
    PerseusNumberLineUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreNumberLine(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusNumberLineUserInput | undefined,
    widgetOptions: PerseusNumberLineWidgetOptions,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const divisionRange = widgetOptions.divisionRange;
    const outsideAllowedRange =
        userInput.numDivisions > divisionRange[1] ||
        userInput.numDivisions < divisionRange[0];

    if (widgetOptions.isTickCtrl && outsideAllowedRange) {
        return {
            type: "invalid",
            message: "Number of divisions is outside the allowed range.",
        };
    }

    const range = widgetOptions.range;
    const start =
        widgetOptions.initialX != null ? widgetOptions.initialX : range[0];
    const startRel = widgetOptions.isInequality ? "ge" : "eq";
    const correctRel = widgetOptions.correctRel || "eq";
    const correctPos = knumber.equal(
        userInput.numLinePosition,

        widgetOptions.correctX || 0,
    );

    if (correctPos && correctRel === userInput.rel) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        };
    }
    if (userInput.numLinePosition === start && userInput.rel === startRel) {
        // We're where we started.
        return {
            type: "invalid",
            message: null,
        };
    }
    return {
        type: "points",
        earned: 0,
        total: 1,
        message: null,
    };
}

export default scoreNumberLine;
