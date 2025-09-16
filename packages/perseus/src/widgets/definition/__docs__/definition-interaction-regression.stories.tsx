import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {question} from "../definition.testdata";

import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Definition/Visual Regression Tests/Interactive",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the definition widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

export const FocusedState = {
    args: {
        item: generateTestPerseusItem({
            question,
        }),
    },
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const definitionTrigger = canvas.getByRole("button", {
            name: "the Pequots",
        });
        definitionTrigger.focus();
    },
};

export const ClickedState = {
    args: {
        item: generateTestPerseusItem({
            question,
        }),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const definitionTrigger = canvas.getByRole("button", {
            name: "the Pequots",
        });
        await userEvent.click(definitionTrigger);
    },
};
