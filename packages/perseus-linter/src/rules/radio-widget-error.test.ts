import {expectPass, expectWarning} from "../__tests__/test-utils";

import radioWidgetErrorRule from "./radio-widget-error";

describe("radio-widget-error", () => {
    // Error for radio widget with no choices
    expectWarning(radioWidgetErrorRule, "[[☃ radio 1]]", {
        widgets: {
            "radio 1": {
                options: {
                    choices: [],
                },
            },
        },
    });

    // Error for radio widget with no correct choices
    expectWarning(radioWidgetErrorRule, "[[☃ radio 1]]", {
        widgets: {
            "radio 1": {
                options: {
                    choices: [{content: "Incorrect", correct: false}],
                },
            },
        },
    });

    // Pass for radio widget with correct choices
    expectPass(radioWidgetErrorRule, "[[☃ radio 1]]", {
        widgets: {
            "radio 1": {
                options: {
                    choices: [{content: "Correct", correct: true}],
                },
            },
        },
    });
});
