import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {ApiOptions} from "../../../perseus-api";

import {angleQuestion} from "../../../widgets/interactive-graphs/interactive-graph.testdata";

import type {StoryObj} from "@storybook/react-vite";

export default {
    title: "Widgets/Interactive Graph",
    component: ServerItemRendererWithDebugUI,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "A widget for creating and interacting with various types of mathematical graphs",
        docs: {
            description: {
                component: `
                    TODO: Provide code examples and usage instructions for the Radio widget.
                    To help the user understand how to implement and customize the widget.
                `,
            },
        },
    },
};

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Angle: Story = {
    args: {
        item: generateTestPerseusItem({question: angleQuestion}),
    },
};
