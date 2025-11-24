import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Number Line/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for number-line widget interactions. Tests hover states on movable points (both closed and open circles) and inequality control buttons which are controlled by Perseus styling.",
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
 * Tests hover state on a closed movable point (filled circle).
 * When hovering, the point maintains its fill but the stroke-width changes.
 * This tests the highlightStyle for non-inequality points.
 */
export const HoverClosedPoint = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "Move the dot to the position that represents $-2.5$ on the number line.\n\n[[☃ number-line 1]]",
                correctX: -2.5,
                range: [-4, 4],
                initialX: -3,
            }),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // Find the movable point (SVG circle) and hover over it
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const svgCircle = canvas.container.querySelector("circle[r='6']");
        if (svgCircle) {
            await userEvent.hover(svgCircle);
        }
    },
};

/**
 * Tests hover state on an open movable point (unfilled circle).
 * Open circles appear for strict inequalities (< or >).
 * When hovering, the point's fill changes from background color to blue.
 * This tests the highlightStyle for inequality points with open circles.
 */
export const HoverOpenPoint = {
    args: {
        item: generateTestPerseusItem({
            question: createNumberLineQuestion({
                content:
                    "Show all values of $x$ on the number line.\n\n[[☃ number-line 1]]",
                correctX: 1,
                range: [-5, 5],
                initialX: -4,
                isInequality: true,
            }),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // First click the toggle button to make the circle open
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const toggleButton = canvas.getByRole("button", {
            name: "Circle filled",
        });
        await userEvent.click(toggleButton);

        // Then hover over the point
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const svgCircle = canvas.container.querySelector("circle[r='6']");
        if (svgCircle) {
            await userEvent.hover(svgCircle);
        }
    },
};

/**
 * Tests clicking the "Switch direction" button on an inequality.
 * Starts with x ≥ (ray pointing right), then switches to x ≤ (ray pointing left).
 * This tests the Perseus-controlled button styling and ray direction rendering.
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
        // Click the "Switch direction" button to reverse the inequality
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const switchButton = canvas.getByRole("button", {
            name: "Switch direction",
        });
        await userEvent.click(switchButton);
    },
};

/**
 * Tests clicking the "Circle open" button on an inequality.
 * Starts with x ≥ (closed circle), then toggles to x > (open circle).
 * This tests the Perseus-controlled button styling and circle rendering.
 */
export const InequalityToggleCircle = {
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
        // Click the "Circle open" button to toggle from closed to open circle
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const toggleButton = canvas.getByRole("button", {
            name: "Circle open",
        });
        await userEvent.click(toggleButton);
    },
};
