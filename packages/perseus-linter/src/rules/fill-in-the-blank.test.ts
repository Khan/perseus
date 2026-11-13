import {
    generateFillInTheBlankOptions,
    generateFillInTheBlankWidget,
} from "@khanacademy/perseus-core";

import {expectIssue} from "../__tests__/test-utils";

import {FillInTheBlankRule} from "./fill-in-the-blank";

describe("the fill-in-the-blank linter", () => {
    it("lints the content of a fill-in-the-blank widget", () => {
        expectIssue(
            FillInTheBlankRule,
            "[[☃ fill-in-the-blank 1]]",
            {
                widgets: {
                    "fill-in-the-blank 1": generateFillInTheBlankWidget({
                        options: generateFillInTheBlankOptions({
                            content: "# Level One",
                        }),
                    }),
                },
            },
            {
                messages: [
                    "fill-in-the-blank 1: Don't use level-1 headings:\nBegin headings with two or more # characters.",
                ],
            },
        );
    });
});
