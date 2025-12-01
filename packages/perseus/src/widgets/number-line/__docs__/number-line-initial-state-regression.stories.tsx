import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {tickCtrl} from "../number-line.testdata";
import {
    createNumberLineQuestion,
    NumberLineQuestionRenderer,
} from "../utils/number-line-utils";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof NumberLineQuestionRenderer>;

/**
 * This is a visual regression story for the number-line widget.
 */

const meta: Meta = {
    title: "Widgets/Number Line/Visual Regression Tests/Initial State",
    component: NumberLineQuestionRenderer,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the number-line widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

export default meta;

export const BasicQuestion: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "$E=2.5$\n\n**Move the dot to $-E$ on the number line.**\n\n\n[[☃ number-line 1]]",
                correctX: -2.5,
                range: [-4, 4],
                initialX: -3,
            }),
        }),
    },
};

export const TickController: Story = {
    args: {
        item: generateTestPerseusItem({
            question: tickCtrl,
        }),
    },
};

export const Inequality: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "[[☃ number-line 1]]",
                correctX: 2,
                range: [-5, 5],
                isInequality: true,
                correctRel: "ge",
                initialX: -4,
            }),
        }),
    },
};

export const StaticDesktop: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "The answer is shown below:\n\n[[☃ number-line 1]]",
                correctX: 2,
                range: [-5, 5],
                initialX: 2,
                static: true,
            }),
        }),
    },
};

export const StaticDesktopInequality: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "The answer is shown below:\n\n[[☃ number-line 1]]",
                correctX: 1,
                range: [-5, 5],
                initialX: 1,
                isInequality: true,
                correctRel: "ge",
                static: true,
            }),
        }),
    },
};

export const RTL: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "حرك النقطة إلى $-2.5$ على خط الأعداد [[☃ number-line 1]]",
                correctX: -2.5,
                range: [-4, 4],
                initialX: -3,
            }),
        }),
        rtl: true,
    },
};

export const StaticMobile: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "The answer is shown below:\n\n[[☃ number-line 1]]",
                correctX: 2,
                range: [-5, 5],
                initialX: 2,
                static: true,
            }),
        }),
        isMobile: true,
    },
};

export const StaticMobileInequality: Story = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content: "The answer is shown below:\n\n[[☃ number-line 1]]",
                correctX: 1,
                range: [-5, 5],
                initialX: 1,
                isInequality: true,
                correctRel: "ge",
                static: true,
            }),
        }),
        isMobile: true,
    },
};
