import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

// TODO: Add test coverage for hover states on movable points (both closed and open circles).

const meta: Meta = {
    title: "Widgets/Number Line/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for number-line widget interactions. Tests inequality control buttons' behavior which is controlled by Perseus.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

// Helper function to create number-line question data
function createNumberLineQuestion(config: {
    content: string;
    correctX: number;
    range: [number, number];
    initialX?: number;
    isInequality?: boolean;
}): PerseusRenderer {
    return {
        content: config.content,
        images: {},
        widgets: {
            "number-line 1": {
                type: "number-line",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    labelRange: [null, null],
                    initialX: config.initialX ?? null,
                    tickStep: 1,
                    labelStyle: "decimal",
                    labelTicks: true,
                    isInequality: config.isInequality ?? false,
                    snapDivisions: 2,
                    range: config.range,
                    correctRel: "ge",
                    numDivisions: null,
                    divisionRange: [1, 10],
                    correctX: config.correctX,
                    isTickCtrl: false,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    };
}

/**
 * Tests clicking the "Switch direction" button on an inequality.
 * Starts with x ≥ (ray pointing right), then switches to x ≤ (ray pointing left).
 * This tests the Perseus-controlled button behavior and ray direction rendering.
 */
export const InequalitySwitchDirection = {
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
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const switchButton = await canvas.findByRole("button", {
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
export const InequalityMakeCircleOpen = {
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
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const toggleButton = await canvas.findByRole("button", {
            name: "Make circle open",
        });
        await userEvent.click(toggleButton);
    },
};
