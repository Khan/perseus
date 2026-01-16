import {expectPass, expectWarning} from "../__tests__/test-utils";

import radioWidgetErrorRule from "./radio-widget-error";

describe("radio-widget-error", () => {
    describe("No choice is marked as correct.", () => {
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

    describe("Cannot mark both None of the Above and another choice as correct.", () => {
        // Error for radio widget with no correct choices
        expectWarning(radioWidgetErrorRule, "[[☃ radio 1]]", {
            widgets: {
                "radio 1": {
                    options: {
                        choices: [
                            {content: "I'm marked correct", correct: true},
                            {
                                content: "None Of the Above",
                                isNoneOfTheAbove: true,
                                correct: true,
                            },
                        ],
                    },
                },
            },
        });

        // Pass for radio widget with correct choices
        expectPass(radioWidgetErrorRule, "[[☃ radio 1]]", {
            widgets: {
                "radio 1": {
                    options: {
                        choices: [
                            {content: "Correct", correct: true},
                            {
                                content: "None Of the Above",
                                isNoneOfTheAbove: true,
                                correct: false,
                            },
                        ],
                    },
                },
            },
        });
    });
});
