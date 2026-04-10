import {expectPass, expectWarning} from "../__tests__/test-utils";

import numericInputMissingLabelRule from "./numeric-input-missing-label";

describe("numeric-input-missing-label", () => {
    // Warning when labelText is empty
    expectWarning(
        numericInputMissingLabelRule,
        "[[☃ numeric-input 1]]",
        {
            widgets: {
                "numeric-input 1": {
                    options: {
                        answers: [{value: 42}],
                        labelText: "",
                    },
                },
            },
        },
    );

    // Warning when labelText is undefined
    expectWarning(
        numericInputMissingLabelRule,
        "[[☃ numeric-input 1]]",
        {
            widgets: {
                "numeric-input 1": {
                    options: {
                        answers: [{value: 42}],
                    },
                },
            },
        },
    );

    // Pass when labelText is set
    expectPass(
        numericInputMissingLabelRule,
        "[[☃ numeric-input 1]]",
        {
            widgets: {
                "numeric-input 1": {
                    options: {
                        answers: [{value: 42}],
                        labelText: "What's the answer?",
                    },
                },
            },
        },
    );
});
