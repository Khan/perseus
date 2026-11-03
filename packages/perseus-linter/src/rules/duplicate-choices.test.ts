import {expectIssue, expectPass} from "../__tests__/test-utils";

import duplicateChoicesRule from "./duplicate-choices";

function radio(...contents: string[]) {
    return {
        widgets: {
            "radio 1": {
                type: "radio",
                options: {choices: contents.map((content) => ({content}))},
            },
        },
    };
}

describe("duplicate-choices", () => {
    it("warns about radio choices that read the same", () => {
        expectIssue(
            duplicateChoicesRule,
            "[[☃ radio 1]]",
            radio("$\\frac{1}{2}$", "3", " \\frac{1}{2} "),
            {
                messages: [
                    'radio 1: choices 1 and 3 are the same ("\\frac{1}{2}").',
                ],
            },
        );
    });

    it("warns about dropdown choices that read the same", () => {
        expectIssue(
            duplicateChoicesRule,
            "[[☃ dropdown 1]]",
            {
                widgets: {
                    "dropdown 1": {
                        type: "dropdown",
                        options: {
                            choices: [{content: "cat"}, {content: "cat"}],
                        },
                    },
                },
            },
            {messages: ['dropdown 1: choices 1 and 2 are the same ("cat").']},
        );
    });

    it("passes when every choice is different", () => {
        expectPass(duplicateChoicesRule, "[[☃ radio 1]]", radio("1", "2"));
    });

    it("passes for empty choices, such as None of the above", () => {
        expectPass(duplicateChoicesRule, "[[☃ radio 1]]", radio("1", "", ""));
    });
});
