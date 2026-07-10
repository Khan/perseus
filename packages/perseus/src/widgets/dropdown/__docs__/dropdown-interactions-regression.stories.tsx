import {generateDropdownOptions} from "@khanacademy/perseus-core";
import {expect, within} from "storybook/test";

import {themeModes, viewportModes} from "../../../../../../.storybook/modes";
import {
    mobileDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";

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

/************* Helper functions **************/

// The subset of the play context we use. We need to define this type to
// pass into our helper functions.
type PlayContext = Pick<
    Parameters<NonNullable<Story["play"]>>[0],
    "canvas" | "userEvent"
>;

/**
 * The SingleSelect listbox renders into a React portal appended to
 * `document.body`, so its options live OUTSIDE the story's `canvas`. Query
 * them against the document body instead.
 */
const inBody = () => within(document.body);

/** Opens the dropdown and waits for the portaled listbox to render. */
async function openDropdown({canvas, userEvent}: PlayContext): Promise<void> {
    await userEvent.click(canvas.getByRole("combobox"));
    // The listbox renders into a portal; wait for it before snapshotting.
    await expect(inBody().findByRole("listbox")).resolves.toBeInTheDocument();
}

/**
 * Opens the dropdown and selects the choice at the given option index. The
 * option at index 0 is the disabled placeholder, so real choices start at
 * index 1. Selecting closes the dropdown and shows the choice in the opener.
 */
async function selectChoice(
    ctx: PlayContext,
    choiceIndex: number,
): Promise<void> {
    await openDropdown(ctx);
    const options = await inBody().findAllByRole("option");
    await ctx.userEvent.click(options[choiceIndex]);
}

/************* Selected (closed) states **************/

export const SelectedSymbolOnly: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose a symbol",
        choices: [
            {content: "↑", correct: false},
            {content: "↓", correct: false},
        ],
    }),
    parameters: {
        content:
            "If the diver was moving $\\uparrow$ when this acceleration began, she would [[☃ dropdown 1]].",
    },
    play: async (ctx) => {
        await selectChoice(ctx, 1);
    },
};

export const SelectedAndFocused: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose a symbol",
        choices: [
            {content: "<", correct: false},
            {content: ">", correct: true},
        ],
    }),
    parameters: {
        content: "The relationship is [[☃ dropdown 1]] between the values.",
    },
    play: async (ctx) => {
        await selectChoice(ctx, 1);
        // Selecting returns focus to the combobox via the mouse (no ring).
        // Blur, then Tab back so focus arrives via keyboard → focus-visible.
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        await ctx.userEvent.tab();
    },
};

export const SelectedTallMath: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose an expression",
        choices: [
            {content: "$\\dfrac{a + b}{c + d}$", correct: false},
            {content: "$\\sqrt{\\dfrac{x^2 + y^2}{2}}$", correct: true},
            {content: "$\\displaystyle\\sum_{i=1}^{n} i^2$", correct: false},
        ],
    }),
    parameters: {
        content: "The simplified form is [[☃ dropdown 1]].",
    },
    play: async (ctx) => {
        await selectChoice(ctx, 2);
    },
};

export const SelectedTeXText: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose a label",
        choices: [
            {
                content: "$\\sqrt{overbrace{5 + 2}^{\\text{numerator}}}$",
                correct: false,
            },
            {content: "$\\sqrt{12345,\\text{gifts}^2}$", correct: true},
            {content: "$\\text{This Answer Is Not A Gift}$", correct: false},
        ],
    }),
    parameters: {
        content:
            "**Which one of the following choices is a gift?**\n\n[[☃ dropdown 1]]",
    },
    play: async (ctx) => {
        await selectChoice(ctx, 2);
    },
};

export const SelectedMixOfMathAndText: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose a description",
        choices: [
            {content: "$\\text{\\$15,700 every 3 years}$", correct: false},
            {content: "$\\$12.000.000$", correct: false},
            {content: "50% of $\\$10,000$ (Correct)", correct: true},
        ],
    }),
    parameters: {
        content: "You might make sure that you budget [[☃ dropdown 1]]",
    },
    play: async (ctx) => {
        await selectChoice(ctx, 1);
    },
};

export const SelectedMathOnly: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose an equation",
        choices: [
            {content: "$a^2 + b^2 = c^2$", correct: true},
            {content: "$E = mc^2$", correct: false},
            {content: "$x^2 + y^2 = r^2$", correct: false},
        ],
    }),
    parameters: {
        content: "The Pythagorean theorem is [[☃ dropdown 1]].",
    },
    play: async (ctx) => {
        await selectChoice(ctx, 1);
    },
};

export const SelectedMathAndSymbols: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose an inequality",
        choices: [
            {content: "0 ≤ x < 1 (This)", correct: true},
            {content: "1 ≤ x < 2", correct: false},
            {content: "2 ≤ x < 3", correct: false},
            {content: "not this one, please", correct: false},
        ],
    }),
    parameters: {
        content:
            "**What is the first selection in this list?**\n\n[[☃ dropdown 1]].",
    },
    play: async (ctx) => {
        await selectChoice(ctx, 2);
    },
};

/************* Pressed state **************/

/**
 * The opener pressed but not yet open — the inner border becomes thicker.
 */
export const PressedNotYetOpen: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose a symbol",
        choices: [
            {content: "<", correct: false},
            {content: ">", correct: true},
        ],
    }),
    parameters: {
        content: "The relationship is [[☃ dropdown 1]] between the values.",
    },
    play: async ({canvas, userEvent}) => {
        canvas.getByRole("combobox").focus();
        // `>` holds the key down; holding space shows a dark border
        // on the dropdown. The menu stays closed until keyup.
        await userEvent.keyboard("[Space>]");
    },
};

/************* Opened states **************/

export const OpenedTallMath: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose an expression",
        choices: [
            {content: "$\\dfrac{a + b}{c + d}$", correct: false},
            {content: "$\\sqrt{\\dfrac{x^2 + y^2}{2}}$", correct: true},
            {content: "$\\displaystyle\\sum_{i=1}^{n} i^2$", correct: false},
        ],
    }),
    parameters: {
        content: "The simplified form is [[☃ dropdown 1]].",
    },
    play: openDropdown,
};

export const OpenedWideListOnMobile: Story = {
    decorators: [dropdownRendererDecorator, mobileDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose the best description",
        choices: [
            {
                content:
                    "The greatest common factor of the numerator and denominator",
                correct: true,
            },
            {
                content:
                    "The least common multiple of both denominators combined",
                correct: false,
            },
            {
                content:
                    "The product of the two coefficients divided by their sum",
                correct: false,
            },
        ],
    }),
    parameters: {
        content: "To simplify the fraction, find [[☃ dropdown 1]].",
        chromatic: {modes: {small: viewportModes.small}},
    },
    play: openDropdown,
};

/**
 * The open listbox with many choices on a short screen - shows a scroll bar.
 */
export const OpenedLongListOnShortScreen: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose a number",
        choices: Array.from({length: 30}, (_, i) => ({
            content: `Choice number ${i + 1}`,
            correct: i === 0,
        })),
    }),
    parameters: {
        content: "Select the correct value: [[☃ dropdown 1]]",
        chromatic: {modes: {chromebook: viewportModes.chromebook}},
    },
    play: openDropdown,
};

export const OpenedRTL: Story = {
    decorators: [dropdownRendererDecorator, rtlDecorator],
    args: generateDropdownOptions({
        placeholder: "اختر إجابة",
        choices: [
            {content: "الخيار الأول", correct: false},
            {content: "الخيار الثاني", correct: true},
            {content: "الخيار الثالث", correct: false},
        ],
    }),
    parameters: {
        content: "اختر من القائمة المنسدلة: [[☃ dropdown 1]]",
    },
    play: openDropdown,
};

/**
 * The opener shows the previous selection (not the placeholder),
 * and the selected option is marked in the list.
 * */
export const OpenedAfterPreviouslySelected: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose an answer",
        choices: [
            {content: "First choice", correct: false},
            {content: "Second choice", correct: true},
            {content: "Third choice", correct: false},
        ],
    }),
    parameters: {
        content: "Select an answer: [[☃ dropdown 1]]",
    },
    play: async (ctx) => {
        await selectChoice(ctx, 2);
        await openDropdown(ctx);
    },
};

/************* Article context **************/

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
    play: openDropdown,
};
