import {filterNonEmpty} from "./utils";

import type {
    PerseusTableUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

function validateTable(userInput: PerseusTableUserInput): ValidationResult {
    const supplied = filterNonEmpty(userInput);

    const hasEmptyCell = supplied.some(function (row) {
        return row.some(function (cell) {
            return cell === "";
        });
    });

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (hasEmptyCell || !supplied.length) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}

export default validateTable;
