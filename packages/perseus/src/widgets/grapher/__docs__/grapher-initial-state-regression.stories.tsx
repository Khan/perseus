import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    multipleAvailableTypesQuestion,
    quadraticQuestion,
} from "../grapher.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Grapher/Visual Regression Tests/Initial State",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for grapher colors for the two function types " +
                    "not being ported to Interactive Graph: quadratic and " +
                    "choose-your-own-function (multiple available types).",
            },
        },
        // delay: Raphael creates its SVG paper in a detached div before DOM
        // insertion, causing a timing race that can clip the initial ellipse.
        // 300ms lets Raphael settle before Chromatic captures the snapshot.
        chromatic: {disableSnapshot: false, modes: themeModes, delay: 300},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Quadratic: Story = {
    args: {
        item: generateTestPerseusItem({question: quadraticQuestion}),
    },
};

export const ChooseYourOwnFunction: Story = {
    args: {
        item: generateTestPerseusItem({
            question: multipleAvailableTypesQuestion,
        }),
    },
};
