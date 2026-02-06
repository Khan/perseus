import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {question1} from "../explanation.testdata";

import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Explanation/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Explanation widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

export const ClickedState = {
    args: {
        item: generateTestPerseusItem({
            question: question1,
        }),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const explanationTrigger = canvas.getByRole("button", {
            name: "Explanation",
        });
        await userEvent.click(explanationTrigger);
    },
};
