import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {textQuestion, numberline} from "../__tests__/label-image.testdata";

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

// Verifies the default unanswered state: all markers visible and pulsating,
// no answers selected, text choices.
export const DefaultUnanswered: Story = {
    args: {
        item: generateTestPerseusItem({question: textQuestion}),
    },
};

// Verifies choices shown in the instructions section (hideChoicesFromInstructions: false),
// including TeX fraction choices and the rgba(33, 36, 44, 0.32) separator dots
// that appear between each choice.
export const WithChoicesInInstructions: Story = {
    args: {
        item: generateTestPerseusItem({question: numberline}),
    },
};
