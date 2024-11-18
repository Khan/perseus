import {inputNumberToNumericInput} from "./input-number";

import type {PerseusRenderer} from "@khanacademy/perseus";

const widgetRegExes = [/input-number \d+/]; // We can add more regexes here in the future

// This utils in this file are used to modernize our Perseus JSON structure,
// so that we can convert deprecated widgets to their modern equivalents when
// content creators use the Editor Page to update content containing these widgets.
// Currently, we're only converting input-number to numeric-input,
// but we can add more conversions here in the future.
// Modernize the json content of a PerseusRenderer object
// by converting deprecated widgets to their modern equivalents
export const convertDeprecatedWidgets = (
    json: PerseusRenderer,
): PerseusRenderer => {
    // Currently we're only converting input-number to numeric-input,
    // But we can add more conversions here in the future
    return inputNumberToNumericInput(json);
};

export const conversionRequired = (json: PerseusRenderer): boolean => {
    // If there's no content, then there's no conversion required
    if (!json.content) {
        return false;
    }
    // Check the content string for any top-level input-number widgets
    if (widgetRegExes.some((regex) => regex.test(json.content))) {
        return true;
    }

    // If there's no deprecated widget in the top-level, then check for any nested widgets
    for (const key of Object.keys(json.widgets)) {
        if (json.widgets[key].options.widgets) {
            const nestedJson = json.widgets[key].options;
            if (conversionRequired(nestedJson)) {
                return true;
            }
        }
    }

    return false;
};
