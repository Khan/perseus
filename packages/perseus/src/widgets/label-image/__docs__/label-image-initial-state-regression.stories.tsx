import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    textQuestion,
    mathQuestion,
    numberline,
} from "../__tests__/label-image.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Label Image/Visual Regression Tests/Initial State",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Label Image widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

// Verifies the unanswered initial state: 4 pulsating markers on the image,
// with choices hidden from the instructions area.
export const DefaultUnansweredState: Story = {
    args: {
        item: generateTestPerseusItem({question: textQuestion}),
    },
};

// Verifies that TeX fraction expressions render correctly in answer choices.
export const MathChoices: Story = {
    args: {
        item: generateTestPerseusItem({question: mathQuestion}),
    },
};

// Verifies the instructions layout when choices are displayed inline
// (hideChoicesFromInstructions: false), as used in number-line questions.
export const ChoicesVisibleInInstructions: Story = {
    args: {
        item: generateTestPerseusItem({question: numberline}),
    },
};