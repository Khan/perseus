import {
    generateIGCircleGraph,
    generateIGLinearGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {interactiveGraphRendererDecorator} from "../../__testutils__/interactive-graph-renderer-decorator";

import type {PerseusInteractiveGraphWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const InteractiveGraphWidget = getWidget("interactive-graph")!;

const meta: Meta<typeof InteractiveGraphWidget> = {
    title: "Widgets/Interactive Graph/Visual Regression Tests/Interactions",
    component: InteractiveGraphWidget,
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
    ],
};
export default meta;

type Story = StoryObj<typeof InteractiveGraphWidget>;

// ──────────────────────────────────────────────
// Movable point: focus and tooltip states
// Cover --mafs-blue interactive color, focus-ring stroke, and tooltip
// (white text on blue background)
// ──────────────────────────────────────────────

/** Focused movable point: tabbing into the graph focuses a point and shows
 * the focus-ring outline (blue stroke) around the point's halo. */
export const PointGraphFocused: Story = {
    decorators: [interactiveGraphRendererDecorator],
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
    decorators: [interactiveGraphRendererDecorator],
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
    decorators: [interactiveGraphRendererDecorator],
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
    decorators: [interactiveGraphRendererDecorator],
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
    decorators: [interactiveGraphRendererDecorator],
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
        await userEvent.tab();
    },
};
