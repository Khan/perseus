import {themeModes} from "../../../../../../.storybook/modes";

import {expressionRendererDecorator} from "./expression-renderer-decorator";

import type {PerseusExpressionWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusExpressionWidgetOptions> = {
    title: "Widgets/Expression/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Expression widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultEmpty: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
};

export const WithVisibleLabel: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
        visibleLabel: "Enter your answer",
        ariaLabel: "Enter your answer",
    },
};

export const MobileInputDefault: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    parameters: {
        apiOptions: {customKeypad: true},
    },
};
