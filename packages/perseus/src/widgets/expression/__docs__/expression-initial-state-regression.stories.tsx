import {themeModes} from "../../../../../../.storybook/modes";
import {Expression} from "../expression";

import {expressionRendererDecorator} from "./expression-renderer-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof Expression> = {
    title: "Widgets/Expression/Visual Regression Tests/Initial State",
    component: Expression,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof Expression>;

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
