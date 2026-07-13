import {themeModes} from "../../../../../../.storybook/modes";
import {rtlDecorator} from "../../__testutils__/story-decorators";

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

// The default empty state with no visible label rendered above the input.
export const Default: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
};

// The default empty state with a visible label rendered above the input.
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

export const WithInputValue: Story = {
    decorators: [expressionRendererDecorator],
    parameters: {
        initialUserInput: {"expression 1": "2x"},
    },
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
};

export const RightToLeft: Story = {
    decorators: [expressionRendererDecorator, rtlDecorator],
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

export const Static: Story = {
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
    parameters: {
        isStatic: true,
        initialUserInput: {"expression 1": "2x"},
    },
};

export const Mobile: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
        visibleLabel: "Enter your answer",
    },
    parameters: {
        apiOptions: {customKeypad: true},
        initialUserInput: {"expression 1": "2x"},
    },
};
