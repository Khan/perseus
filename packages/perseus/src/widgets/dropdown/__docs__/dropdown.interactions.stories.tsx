import {generateDropdownOptions} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";

import {dropdownRendererDecorator} from "./dropdown-renderer-decorator";

import type {PerseusDropdownWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * Visual regression tests for dropdown widget interactions.
 * These tests focus on Perseus-controlled styling in article contexts.
 */
const meta: Meta<PerseusDropdownWidgetOptions> = {
    title: "Widgets/Dropdown/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for dropdown widget styling in article contexts. Tests the CSS rules in perseus-renderer-part-1.css that control paragraph and block math formatting within dropdown choices.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Tests dropdown styling in article context with paragraph text and block math in choices.
 * This tests the CSS rules:
 * .perseus-article .perseus-dropdown .perseus-renderer .paragraph
 * .perseus-article .perseus-dropdown .perseus-renderer .perseus-block-math
 * which set margin-bottom: 0 and font-size: 18px
 *
 * Block math is math that appears on its own line (followed by two newlines).
 */
export const OpenedDropdownInArticleWithParagraphs: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose a definition",
        choices: [
            {
                content:
                    "A **function** is a relation where each input has exactly one output.\n\n$f(x) = x^2$\n\nThis is an example of a function.",
                correct: true,
            },
            {
                content:
                    "A **variable** is a symbol that represents a value.\n\n$y = 2x + 1$\n\nIn this equation, both $x$ and $y$ are variables.",
                correct: false,
            },
            {
                content:
                    "An **equation** is a mathematical statement that two expressions are equal.\n\n$3x + 5 = 20$\n\nThis can be solved for $x$.",
                correct: false,
            },
        ],
    }),
    parameters: {
        content:
            "Which definition is correct? Select from the dropdown: [[☃ dropdown 1]]",
    },
    play: async ({canvas, userEvent}) => {
        const dropdown = canvas.getByRole("combobox");
        await userEvent.click(dropdown);
    },
};
