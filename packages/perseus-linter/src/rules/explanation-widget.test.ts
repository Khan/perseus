import {
    generateExplanationOptions,
    generateExplanationWidget,
} from "@khanacademy/perseus-core";

import {expectIssue} from "../__tests__/test-utils";

import {ExplanationWidgetRule} from "./explanation";

describe("the explanation-widget linter", () => {
    it("lints the explanation content", () => {
        expectIssue(
            ExplanationWidgetRule,
            "[[☃ explanation 1]]",
            {
                widgets: {
                    "explanation 1": generateExplanationWidget({
                        options: generateExplanationOptions({
                            explanation: "# Level One",
                        }),
                    }),
                },
            },
            {
                messages: [
                    "explanation 1: Don't use level-1 headings:\nBegin headings with two or more # characters.",
                ],
            },
        );
    });
});
