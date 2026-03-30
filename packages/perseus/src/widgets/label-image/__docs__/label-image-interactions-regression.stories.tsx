import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import {within} from "@testing-library/dom";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {textQuestion} from "../__tests__/label-image.testdata";

import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Label Image/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Label Image widget that DO need " +
                    "some sort of interaction to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

// Verifies the open popover state: clicking a marker reveals the answer
// choices dropdown above the image.
export const MarkerPopoverOpen = {
    args: {
        item: generateTestPerseusItem({question: textQuestion}),
    },
    play: async ({canvas, userEvent}) => {
        const marker = await canvas.findByLabelText(
            "The fourth unlabeled bar line.",
        );
        await userEvent.click(marker);
    },
};

// Verifies the filled marker state and answer pill: after selecting an answer,
// the marker shows a blue filled style and the chosen answer appears as a pill.
export const AnswerSelected = {
    args: {
        item: generateTestPerseusItem({question: textQuestion}),
    },
    play: async ({canvas, userEvent}) => {
        const marker = await canvas.findByLabelText(
            "The fourth unlabeled bar line.",
        );
        await userEvent.click(marker);

        const body = within(document.body);
        const choice = await body.findByRole("option", {name: "SUVs"});
        await userEvent.click(choice);
    },
};