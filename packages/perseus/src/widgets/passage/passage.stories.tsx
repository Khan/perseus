import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {question1, question2, question3} from "./__tests__/passage.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Passage",
    component: ServerItemRendererWithDebugUI,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "A widget that presents formatted text passages for reading comprehension exercises,\
            supporting rich text formatting and reference points for questions.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const SimpleQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const MultiPassageQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
    },
};

export const SingleNumberedPassage: Story = {
    args: {
        item: generateTestPerseusItem({question: question3}),
    },
};
