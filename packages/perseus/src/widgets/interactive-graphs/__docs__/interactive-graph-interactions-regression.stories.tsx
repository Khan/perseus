import {
    generateInteractiveGraphQuestion,
    generateIGCircleGraph,
    generateIGLinearGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import Renderer from "../../../renderer";
import {mockStrings} from "../../../strings";
import UserInputManager from "../../../user-input-manager";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

function MafsQuestionRenderer(props: {question: PerseusRenderer}) {
    const {question} = props;
    return (
        <UserInputManager widgets={question.widgets} problemNum={0}>
            {({userInput, handleUserInput, initializeUserInput}) => (
                <Renderer
                    userInput={userInput}
                    handleUserInput={handleUserInput}
                    initializeUserInput={initializeUserInput}
                    strings={mockStrings}
                    content={question.content}
                    widgets={question.widgets}
                    images={question.images}
                    apiOptions={ApiOptions.defaults}
                />
            )}
        </UserInputManager>
    );
}

type Story = StoryObj<typeof MafsQuestionRenderer>;

const meta: Meta<typeof MafsQuestionRenderer> = {
    title: "Widgets/Interactive Graph/Visual Regression Tests/Interactions",
    component: MafsQuestionRenderer,
    // !autodocs: shows individual stories in sidebar without a Docs page
    // !manifest: keeps these stories out of the component manifest
    tags: ["!autodocs", "!manifest"],
    parameters: {
        chromatic: {disableSnapshot: false},
    },
    decorators: (Story) => (
        // Add margin so we can look at individual story canvases for
        // graphs that have axis ticks off the graph.
        <View style={{marginInlineStart: 32}}>
            <Story />
        </View>
    ),
};
export default meta;

// ──────────────────────────────────────────────
// Movable point: hover, focus, and tooltip states
// Cover --mafs-blue interactive color, focus-ring stroke, and tooltip
// (white text on blue background)
// ──────────────────────────────────────────────

// Focused movable point: tabbing into the graph focuses a point and shows
// the focus-ring outline (blue stroke) around the point's halo.
export const PointGraphFocused: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGPointGraph({
                numPoints: 1,
                coords: [[0, 0]],
            }),
        }),
    },
    play: async ({canvas, userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
    },
};

// Focused movable point with tooltip: with `showTooltips: true`, focusing the
// point shows a Wonder Blocks tooltip with white text on the blue background.
// This exercises the `contentStyle={{color: "white"}}` and the WB blue
// background color used by the tooltip.
export const PointGraphFocusedWithTooltip: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGPointGraph({
                numPoints: 1,
                coords: [[0, 0]],
            }),
            showTooltips: true,
        }),
    },
    play: async ({canvas, userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
    },
};

// ──────────────────────────────────────────────
// Movable circle: hover and focus states
// Cover --mafs-blue fill on hover and focus-ring stroke
// ──────────────────────────────────────────────

// Focused circle: tabbing into a circle graph focuses the circle and shows
// the focus-ring (blue stroke).
export const CircleGraphFocused: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGCircleGraph({center: [0, 0], radius: 3}),
        }),
    },
    play: async ({canvas, userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
    },
};

// ──────────────────────────────────────────────
// Polygon graph: focused state on the hit-target
// Covers focused movable-line stroke (active stroke weight) and
// per-vertex focus rings.
// ──────────────────────────────────────────────

// Focused polygon: tabbing into the polygon focuses the hit-target wrapper
// and increases the line stroke weight (active state) on all sides.
export const PolygonGraphFocused: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGPolygonGraph({
                coords: [
                    [-3, -2],
                    [3, -2],
                    [0, 4],
                ],
            }),
        }),
    },
    play: async ({canvas, userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
    },
};

// ──────────────────────────────────────────────
// Linear graph: focused state on the movable line
// Covers the white focus gap + blue focus outline applied to the movable
// line on keyboard focus.
// ──────────────────────────────────────────────

// Focused linear graph: tabbing into the line shows the white focus-gap
// stroke and the blue focus-outline stroke (`stroke: var(--mafs-blue)` and
// `stroke: white` on the focus-gap layer).
export const LinearGraphLineFocused: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGLinearGraph({
                coords: [
                    [-5, -5],
                    [5, 5],
                ],
            }),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // Tab through the two endpoint handles to focus the line itself
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
    },
};
