import {number as knumber} from "@khanacademy/kmath";

import type {PerseusScore} from "../../types";
import type {
    PerseusNumberLineRubric,
    PerseusNumberLineUserInput,
} from "../../validation.types";

function scoreNumberLine(
    state: PerseusNumberLineUserInput,
    rubric: PerseusNumberLineRubric,
): PerseusScore {
    const range = rubric.range;
    const divisionRange = state.divisionRange;
    const start = rubric.initialX != null ? rubric.initialX : range[0];
    const startRel = rubric.isInequality ? "ge" : "eq";
    const correctRel = rubric.correctRel || "eq";
    const correctPos = knumber.equal(
        state.numLinePosition,
        rubric.correctX || 0,
    );
    const outsideAllowedRange =
        state.numDivisions > divisionRange[1] ||
        state.numDivisions < divisionRange[0];

    // TODO: I don't think isTickCrtl is a thing anymore
    if (state.isTickCrtl && outsideAllowedRange) {
        return {
            type: "invalid",
            message: "Number of divisions is outside the allowed range.",
        };
    }
    if (correctPos && correctRel === state.rel) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        };
    }
    if (state.numLinePosition === start && state.rel === startRel) {
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
