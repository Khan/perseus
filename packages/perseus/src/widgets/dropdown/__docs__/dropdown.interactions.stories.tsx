import * as React from "react";

import {storybookDependenciesV2} from "../../../../../../testing/test-dependencies";
import ArticleRenderer from "../../../article-renderer";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";
import {themeModes} from "../../../../../../.storybook/modes";

/**
 * Visual regression tests for dropdown widget interactions.
 * These tests focus on Perseus-controlled styling in article contexts.
 */
export default {
    title: "Widgets/Dropdown/Visual Regression Tests/Interactions",
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for dropdown widget styling in article contexts. Tests the CSS rules in perseus-renderer-part-1.css that control paragraph and block math formatting within dropdown choices.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
} satisfies Meta;

/**
 * Tests dropdown styling in article context with paragraph text and math in choices.
 * This tests the CSS rule:
 * .perseus-article .perseus-dropdown .perseus-renderer .paragraph
 * which sets margin-bottom: 0 and font-size: 18px
 *
 * Note: The CSS rule also mentions .perseus-block-math, but block math ($$...$$)
 * does not actually render in dropdown choices - it gets converted to inline math.
 */
export const OpenedDropdownInArticleWithParagraphs = (): React.ReactNode => {
    const question: PerseusRenderer = {
        content:
            "Which definition is correct? Select from the dropdown: [[☃ dropdown 1]]",
        images: {},
        widgets: {
            "dropdown 1": {
                type: "dropdown",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    placeholder: "Choose a definition",
                    choices: [
                        {
                            content:
                                "A **function** is a relation where each input has exactly one output.\n\nFor example: $f(x) = x^2$",
                            correct: true,
                        },
                        {
                            content:
                                "A **variable** is a symbol that represents a value.\n\nFor example: In $y = 2x + 1$, both $x$ and $y$ are variables.",
                            correct: false,
                        },
                        {
                            content:
                                "An **equation** is a mathematical statement that two expressions are equal.\n\nFor example: $3x + 5 = 20$",
                            correct: false,
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    };

    return (
        <ArticleRenderer
            json={question}
            dependencies={storybookDependenciesV2}
        />
    );
};
OpenedDropdownInArticleWithParagraphs.play = async ({canvas, userEvent}) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const dropdown = canvas.getByRole("combobox");
    await userEvent.click(dropdown);
};
