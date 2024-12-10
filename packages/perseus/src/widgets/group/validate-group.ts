import {validateFunctional} from "../../renderer-util";
import {flattenScores} from "../../util/scoring";

import type {PerseusStrings} from "../../strings";
import type {ValidationResult} from "../../types";
import type {
    PerseusGroupUserInput,
    PerseusGroupValidationData,
} from "../../validation.types";

function validateGroup(
    userInput: PerseusGroupUserInput,
    validationData: PerseusGroupValidationData,
    strings: PerseusStrings,
    locale: string,
): ValidationResult {
    const result = validateFunctional(
        userInput,
        validationData.widgets,
        strings,
        locale,
    );

    return flattenScores(result);
}

export default validateGroup;
