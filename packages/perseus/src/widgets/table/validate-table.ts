import {filterNonEmpty} from "./utils";

import type {PerseusScore} from "../../types";
import type {PerseusTableUserInput} from "../../validation.types";

export function validateTable(userInput: PerseusTableUserInput): PerseusScore {
    const supplied = filterNonEmpty(userInput);

    const hasEmptyCell = supplied.some(function (row) {
        return row.some(function (cell) {
            return cell === "";
        });
    });

    if (hasEmptyCell || !supplied.length) {
        return {
            type: "invalid",
            message: null,
        };
    }

    // No points earned, but at least we're not invalid
    return {type: "points", earned: 0, total: 0};
}
