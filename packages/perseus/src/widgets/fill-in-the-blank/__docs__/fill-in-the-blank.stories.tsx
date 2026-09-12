import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {basicFillInTheBlankQuestion} from "../fill-in-the-blank.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Fill in the Blank",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A drag-and-drop widget where the learner drags answer tiles from a choice bank into blanks in a passage. The render is still a placeholder.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const BasicFillInTheBlankQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: basicFillInTheBlankQuestion}),
    },
};
