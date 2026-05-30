import {themeModes} from "../../../../../../.storybook/modes";
import {question1, tableInContent} from "../explanation.testdata";

import {explanationRendererDecorator} from "./explanation-renderer-decorator";

import type {PerseusExplanationWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusExplanationWidgetOptions> = {
    title: "Widgets/Explanation/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
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

type Story = StoryObj<typeof meta>;

const clickedExample = question1.widgets["explanation 1"]?.options;

export const ClickedState: Story = {
    decorators: [explanationRendererDecorator],
    args: {
        hidePrompt: clickedExample.hidePrompt,
        explanation: clickedExample.explanation,
        showPrompt: clickedExample.showPrompt,
    },
    parameters: {
        content: question1.content,
    },
    play: async ({canvas, userEvent}) => {
        const explanationTrigger = canvas.getByRole("button", {
            name: clickedExample.showPrompt,
        });
        await userEvent.click(explanationTrigger);
    },
};

const tableExample = tableInContent.widgets["explanation 1"]?.options;

export const TableInContent: Story = {
    decorators: [explanationRendererDecorator],
    args: {
        hidePrompt: tableExample.hidePrompt,
        explanation: tableExample.explanation,
        showPrompt: tableExample.showPrompt,
    },
    parameters: {
        content: tableInContent.content,
        widgets: tableExample.widgets,
    },
    play: async ({canvas, userEvent}) => {
        const explanationTrigger = canvas.getByRole("button", {
            name: tableExample.showPrompt,
        });
        await userEvent.click(explanationTrigger);
    },
};
