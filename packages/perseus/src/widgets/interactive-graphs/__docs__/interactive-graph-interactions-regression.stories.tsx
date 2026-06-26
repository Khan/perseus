import {
    generateIGCircleGraph,
    generateIGExponentialGraph,
    generateIGLinearGraph,
    generateIGLogarithmGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {expect} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";

import {interactiveGraphRendererDecorator} from "./interactive-graph-renderer-decorator";

import type {PerseusInteractiveGraphWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusInteractiveGraphWidgetOptions> = {
    title: "Widgets/Interactive Graph/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Interactive Graph widget that DO need " +
                    "some sort of interaction to test (focus, hover, drag), which " +
                    "will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    decorators: [
        // Add margin so we can look at individual story canvases for
        // graphs that have axis ticks off the graph.
        (Story) => (
            <View style={{marginInlineStart: 32}}>
                <Story />
            </View>
        ),
        interactiveGraphRendererDecorator,
    ],
};
export default meta;

type Story = StoryObj<typeof meta>;

// ──────────────────────────────────────────────
// Movable point: focus and tooltip states
// Cover --mafs-blue interactive color, focus-ring stroke, and tooltip
// (white text on blue background)
// ──────────────────────────────────────────────

/** Focused movable point: tabbing into the graph focuses a point and shows
 * the focus-ring outline (blue stroke) around the point's halo. */
export const PointGraphFocused: Story = {
    args: {
        correct: generateIGPointGraph({
            numPoints: 1,
            coords: [[0, 0]],
        }),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    play: async ({userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
    },
};

/** Focused movable point with tooltip: with `showTooltips: true`, focusing the
 * point shows a Wonder Blocks tooltip with white text on the blue background.
 * This exercises `contentStyle={{color: "white"}}` and the WB blue background. */
export const PointGraphFocusedWithTooltip: Story = {
    args: {
        correct: generateIGPointGraph({
            numPoints: 1,
            coords: [[0, 0]],
        }),
        showTooltips: true,
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    play: async ({userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
    },
};

// ──────────────────────────────────────────────
// Movable circle: focus state
// Covers --mafs-blue stroke on the focus-ring
// ──────────────────────────────────────────────

/** Focused circle: tabbing into a circle graph focuses the circle and shows
 * the focus-ring (blue stroke). */
export const CircleGraphFocused: Story = {
    args: {
        correct: generateIGCircleGraph({center: [0, 0], radius: 3}),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    play: async ({userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
    },
};

// ──────────────────────────────────────────────
// Polygon graph: focused state on the hit-target
// Covers focused movable-line stroke (active stroke weight) and
// per-vertex focus rings.
// ──────────────────────────────────────────────

/** Focused polygon: tabbing into the polygon focuses the hit-target wrapper
 * and increases the line stroke weight (active state) on all sides. */
export const PolygonGraphFocused: Story = {
    args: {
        correct: generateIGPolygonGraph({
            coords: [
                [-3, -2],
                [3, -2],
                [0, 4],
            ],
        }),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    play: async ({userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
    },
};

// ──────────────────────────────────────────────
// Linear graph: focused state on the movable line
// Covers the white focus gap + blue focus outline applied to the movable
// line on keyboard focus.
// ──────────────────────────────────────────────

/** Focused linear graph: tabbing into the line shows the white focus-gap
 * stroke and the blue focus-outline stroke (`stroke: var(--mafs-blue)` and
 * `stroke: white` on the focus-gap layer). */
export const LinearGraphLineFocused: Story = {
    args: {
        correct: generateIGLinearGraph({
            coords: [
                [-5, -5],
                [5, 5],
            ],
        }),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    play: async ({userEvent}) => {
        // Tab through the two endpoint handles to focus the line itself
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
    },
};

// ──────────────────────────────────────────────
// Exponential: drag handle states
//
// All stories use asymptote at y=0 with coords that place the curve
// through the center of the graph where the horizontal drag handle sits.
// This makes the layering between the curve and drag handle visible.
//
// Note: `correct` sets the answer; `graph.startCoords` controls the
// initial rendered position of the graph.
// ──────────────────────────────────────────────

// Default inactive state: the drag handle pill (small, no grip dots)
// is visible above the curve line where they overlap.
export const ExponentialDragHandleDefault: Story = {
    args: {
        correct: generateIGExponentialGraph({
            coords: [
                [3, 1],
                [5, 5],
            ],
            asymptote: 0,
        }),
        graph: generateIGExponentialGraph({
            startCoords: {
                coords: [
                    [3, 1],
                    [5, 5],
                ],
                asymptote: 0,
            },
        }),
    },
};

// Focused state: the drag handle pill shows the focus ring and
// active state (larger pill with grip dots) above the curve line.
// The asymptote line itself should also be thick (4px) on keyboard
// focus, matching the hover/drag behavior.
export const ExponentialDragHandleFocused: Story = {
    args: {
        correct: generateIGExponentialGraph({
            coords: [
                [3, 1],
                [5, 5],
            ],
            asymptote: 0,
        }),
        graph: generateIGExponentialGraph({
            startCoords: {
                coords: [
                    [3, 1],
                    [5, 5],
                ],
                asymptote: 0,
            },
        }),
    },
    play: async ({canvas}) => {
        const asymptote = canvas.getByRole("button", {
            name: /^Horizontal asymptote/,
        });
        asymptote.focus();
    },
};

// Point focused: a movable point shows its focus ring while the
// drag handle remains in the inactive state (small pill, no dots).
export const ExponentialPointFocusedHandleInactive: Story = {
    args: {
        correct: generateIGExponentialGraph({
            coords: [
                [3, 1],
                [5, 5],
            ],
            asymptote: 0,
        }),
        graph: generateIGExponentialGraph({
            startCoords: {
                coords: [
                    [3, 1],
                    [5, 5],
                ],
                asymptote: 0,
            },
        }),
    },
    play: async ({canvas}) => {
        const point = canvas.getByRole("button", {
            name: /^Point 1/,
        });
        point.focus();
    },
};

// Asymptote focused with the curve away from the drag handle:
// shows the active drag handle (focus ring + grip dots) with the curve
// clearly not touching or covering the handle area.
export const ExponentialDragHandleNoOverlap: Story = {
    args: {
        correct: generateIGExponentialGraph({
            coords: [
                [3, 1],
                [5, 2],
            ],
            asymptote: 0,
        }),
        graph: generateIGExponentialGraph({
            startCoords: {
                coords: [
                    [3, 1],
                    [5, 2],
                ],
                asymptote: 0,
            },
        }),
    },
    play: async ({canvas}) => {
        const asymptote = canvas.getByRole("button", {
            name: /^Horizontal asymptote/,
        });
        asymptote.focus();
    },
};

// ──────────────────────────────────────────────
// Logarithm: drag handle states
//
// All stories use asymptote at x=0 with coords that place the curve
// near the vertical drag handle at the center of the graph.
// ──────────────────────────────────────────────

// Default inactive state: the drag handle pill (small, no grip dots)
// is visible above the curve line where they overlap.
export const LogarithmDragHandleDefault: Story = {
    args: {
        correct: generateIGLogarithmGraph({
            coords: [
                [1, 3],
                [5, 5],
            ],
            asymptote: 0,
        }),
        graph: generateIGLogarithmGraph({
            startCoords: {
                coords: [
                    [1, 3],
                    [5, 5],
                ],
                asymptote: 0,
            },
        }),
    },
};

// Focused state: the drag handle pill shows the focus ring and
// active state (larger pill with grip dots) above the curve line.
// The asymptote line itself should also be thick (4px) on keyboard
// focus, matching the hover/drag behavior.
export const LogarithmDragHandleFocused: Story = {
    args: {
        correct: generateIGLogarithmGraph({
            coords: [
                [1, 3],
                [5, 5],
            ],
            asymptote: 0,
        }),
        graph: generateIGLogarithmGraph({
            startCoords: {
                coords: [
                    [1, 3],
                    [5, 5],
                ],
                asymptote: 0,
            },
        }),
    },
    play: async ({canvas}) => {
        const asymptote = canvas.getByRole("button", {
            name: /^Vertical asymptote/,
        });
        asymptote.focus();
    },
};

// Point focused: a movable point shows its focus ring while the
// drag handle remains in the inactive state (small pill, no dots).
export const LogarithmPointFocusedHandleInactive: Story = {
    args: {
        correct: generateIGLogarithmGraph({
            coords: [
                [1, 3],
                [5, 5],
            ],
            asymptote: 0,
        }),
        graph: generateIGLogarithmGraph({
            startCoords: {
                coords: [
                    [1, 3],
                    [5, 5],
                ],
                asymptote: 0,
            },
        }),
    },
    play: async ({canvas}) => {
        const point = canvas.getByRole("button", {
            name: /^Point 1/,
        });
        point.focus();
    },
};

// Asymptote focused with the curve away from the drag handle:
// shows the active drag handle (focus ring + grip dots) with the curve
// clearly not touching or covering the handle area.
export const LogarithmDragHandleNoOverlap: Story = {
    args: {
        correct: generateIGLogarithmGraph({
            coords: [
                [1, 3],
                [2, 5],
            ],
            asymptote: 0,
        }),
        graph: generateIGLogarithmGraph({
            startCoords: {
                coords: [
                    [1, 3],
                    [2, 5],
                ],
                asymptote: 0,
            },
        }),
    },
    play: async ({canvas}) => {
        const asymptote = canvas.getByRole("button", {
            name: /^Vertical asymptote/,
        });
        asymptote.focus();
    },
};

export const CircleGraphHovered: Story = {
    args: {
        correct: generateIGCircleGraph({center: [0, 0], radius: 3}),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    play: async ({canvas, userEvent}) => {
        const circle = canvas.getByRole("button", {name: /^Circle\./});
        await userEvent.hover(circle);
    },
};

/** Unlimited points graph focused with no points added yet. Tabbing into the
 * empty graph focuses it, and the keyboard interaction instructions
 * are presented. */
export const UnlimitedPointGraphFocusedEmpty: Story = {
    args: {
        correct: generateIGPointGraph({numPoints: "unlimited"}),
        graph: generateIGPointGraph({numPoints: "unlimited"}),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    // Make sure the keyboard interaction instructions are present
    // before taking the Chromatic snapshot.
    play: async ({canvas, userEvent}) => {
        expect(
            await canvas.findByText(
                "Press Shift + Enter to interact with the graph.",
            ),
        ).toBeInTheDocument();
    },
};

/** Unlimited polygon - closed. Uses the `startCoords` to render the polygon
 * with three points already present and closed. */
export const UnlimitedPolygonThreePointsClosed: Story = {
    args: {
        graph: generateIGPolygonGraph({
            numSides: "unlimited",
            startCoords: [
                [2, 2],
                [2, -2],
                [-2, -2],
            ],
        }),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    play: async ({canvas, userEvent}) => {
        const firstPoint = canvas.getByRole("button", {name: /^Point 1/});
        await userEvent.click(firstPoint);
    },
};

/** Unlimited polygon - open. Manually adds three points to the graph in order
 * to stay in the `open` state, because the the open state is only stored
 * internally (i.e. we can't use `startCoords` and get an open polygon). */
export const UnlimitedPolygonThreePointsOpen: Story = {
    args: {
        graph: generateIGPolygonGraph({
            numSides: "unlimited",
        }),
    } satisfies Partial<PerseusInteractiveGraphWidgetOptions>,
    play: async ({canvas, userEvent}) => {
        await userEvent.tab();
        // Enter keyboard mode
        await userEvent.keyboard("{shift>}{enter}");
        // Click "Add point" button
        await userEvent.click(canvas.getByRole("button", {name: "Add Point"}));
        // Focus is now automatically shifted to the added point.
        // Move the point.
        await userEvent.keyboard("{arrowright}");
        await userEvent.keyboard("{arrowup}");
        // Add a point again to get a second point on the graph.
        await userEvent.click(canvas.getByRole("button", {name: "Add Point"}));
        // Focus is now automatically shifted to the added point.
        // Move the point.
        await userEvent.keyboard("{arrowRight}");
        await userEvent.keyboard("{arrowDown}");
        // Add a point again to get a third point on the graph.
        await userEvent.click(canvas.getByRole("button", {name: "Add Point"}));
        // Focus is now automatically shifted to the added point.
        // Move the point.
        await userEvent.keyboard("{arrowLeft}");
        await userEvent.keyboard("{arrowDown}");
    },
};
