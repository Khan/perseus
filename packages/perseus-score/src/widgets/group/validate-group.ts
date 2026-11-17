import {validateUserInput} from "../../validate";

import type {
    PerseusGroupUserInput,
    GroupPublicWidgetOptions,
    ValidationResult,
} from "@khanacademy/perseus-core";

// The `export default` must stay on the function itself. The group widget
// causes an import cycle because it can contain other widgets. The widget
// registry reads this export before this module finishes loading. A separate
// `export default validateGroup;` line hasn't run yet at that point, so under
// ES modules the read throws a ReferenceError, and under CommonJS it gets
// `undefined`.
export default function validateGroup(
    userInput: PerseusGroupUserInput | undefined,
    validationData: GroupPublicWidgetOptions,
    locale: string,
): ValidationResult {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const result = validateUserInput(validationData, userInput, locale);
    return result?.type === "invalid" ? result : null;
}
