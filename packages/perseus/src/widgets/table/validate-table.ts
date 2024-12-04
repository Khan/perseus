import {filterNonEmpty} from "./utils";

import type {PerseusScore} from "../../types";
import type {PerseusTableUserInput} from "../../validation.types";

function validateTable(
    userInput: PerseusTableUserInput,
): Extract<PerseusScore, {type: "invalid"}> | null {
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

    return null;
}

export default validateTable;
