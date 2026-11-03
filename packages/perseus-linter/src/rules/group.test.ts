import {
    generateGroupOptions,
    generateGroupWidget,
} from "@khanacademy/perseus-core";

import {expectIssue} from "../__tests__/test-utils";

import {GroupWidgetRule} from "./group";

describe("the group linter", () => {
    it("runs linters on the content of the group", () => {
        expectIssue(
            GroupWidgetRule,
            "[[☃ group 1]]",
            {
                widgets: {
                    "group 1": generateGroupWidget({
                        options: generateGroupOptions({
                            content: "# Level One",
                        }),
                    }),
                },
            },
            {
                messages: [
                    "group 1: Don't use level-1 headings:\nBegin headings with two or more # characters.",
                ],
            },
        );
    });
});
