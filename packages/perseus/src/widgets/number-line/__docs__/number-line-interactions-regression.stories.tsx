import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import {within} from "@testing-library/react";

import {
    createNumberLineQuestion,
    NumberLineQuestionRenderer,
} from "../utils/number-line-utils";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof NumberLineQuestionRenderer>;

// TODO: Add test coverage for hover states on movable points (both closed and open circles).

const meta: Meta = {
    title: "Widgets/Number Line/Visual Regression Tests/Interactions",
    component: NumberLineQuestionRenderer,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for number-line widget interactions. Tests inequality control buttons' behavior which is controlled by Perseus.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

export default meta;

/**
 * Tests clicking the "Switch direction" button on an inequality.
 * Starts with x ≥ (ray pointing right), then switches to x ≤ (ray pointing left).
 * This tests the Perseus-controlled button behavior and ray direction rendering.
 */
export const InequalitySwitchDirection: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "Show all values on the number line.\n\n[[☃ number-line 1]]",
                correctX: 0,
                range: [-5, 5],
                initialX: 0,
                isInequality: true,
            }),
        }),
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const switchButton = canvas.getByRole("button", {
            name: "Switch direction",
        });
        await userEvent.click(switchButton);
    },
};

/**
 * Tests clicking the "Make circle open" button on an inequality.
 * Starts with x ≥ (closed circle), then toggles to x > (open circle).
 * This tests the Perseus-controlled button behavior and circle
 rendering.
 */
export const InequalityMakeCircleOpen: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "Show all values on the number line.\n\n[[☃ number-line 1]]",
                correctX: 1,
                range: [-5, 5],
                initialX: 1,
                isInequality: true,
            }),
        }),
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const toggleButton = canvas.getByRole("button", {
            name: "Make circle open",
        });
        await userEvent.click(toggleButton);
    },
};
