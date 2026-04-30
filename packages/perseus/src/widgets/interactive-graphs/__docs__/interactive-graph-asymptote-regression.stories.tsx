import {
    generateInteractiveGraphQuestion,
    generateIGExponentialGraph,
    generateIGLogarithmGraph,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import Renderer from "../../../renderer";
import {mockStrings} from "../../../strings";
import UserInputManager from "../../../user-input-manager";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof MafsQuestionRenderer>;

const meta: Meta<typeof MafsQuestionRenderer> = {
    title: "Widgets/Interactive Graph/Visual Regression Tests/Asymptote Drag Handle",
    component: MafsQuestionRenderer,
    // !autodocs: shows individual stories in sidebar without a Docs page
    // (matches radio interactions pattern)
    tags: ["!autodocs", "!manifest"],
    parameters: {
        chromatic: {disableSnapshot: false},
    },
    decorators: (Story) => (
        <View style={{maxWidth: 500, marginInlineStart: 32}}>
            <Story />
        </View>
    ),
};
export default meta;

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
        question: generateInteractiveGraphQuestion({
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
        }),
    },
};

// Focused state: the drag handle pill shows the focus ring and
// active state (larger pill with grip dots) above the curve line.
// The asymptote line itself should also be thick (4px) on keyboard
// focus, matching the hover/drag behavior.
export const ExponentialDragHandleFocused: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
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
        question: generateInteractiveGraphQuestion({
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
        question: generateInteractiveGraphQuestion({
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
        question: generateInteractiveGraphQuestion({
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
        }),
    },
};

// Focused state: the drag handle pill shows the focus ring and
// active state (larger pill with grip dots) above the curve line.
// The asymptote line itself should also be thick (4px) on keyboard
// focus, matching the hover/drag behavior.
export const LogarithmDragHandleFocused: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
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
        question: generateInteractiveGraphQuestion({
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
        question: generateInteractiveGraphQuestion({
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
        }),
    },
    play: async ({canvas}) => {
        const asymptote = canvas.getByRole("button", {
            name: /^Vertical asymptote/,
        });
        asymptote.focus();
    },
};

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
