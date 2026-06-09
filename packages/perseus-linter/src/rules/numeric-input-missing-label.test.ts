import {expectPass, expectWarning} from "../__tests__/test-utils";

import numericInputMissingLabelRule from "./numeric-input-missing-label";

describe("numeric-input-missing-label", () => {
    it("warns when labelText is empty", () => {
        expectWarning(numericInputMissingLabelRule, "[[☃ numeric-input 1]]", {
            widgets: {
                "numeric-input 1": {
                    options: {
                        answers: [{value: 42}],
                        labelText: "",
                    },
                },
            },
        });
    });

    it("warns when labelText is undefined", () => {
        expectWarning(numericInputMissingLabelRule, "[[☃ numeric-input 1]]", {
            widgets: {
                "numeric-input 1": {
                    options: {
                        answers: [{value: 42}],
                    },
                },
            },
        });
    });

    it("passes when labelText is set", () => {
        expectPass(numericInputMissingLabelRule, "[[☃ numeric-input 1]]", {
            widgets: {
                "numeric-input 1": {
                    options: {
                        answers: [{value: 42}],
                        labelText: "What's the answer?",
                    },
                },
            },
        });
    });
});
