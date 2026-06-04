import {themeModes} from "../../../../../../.storybook/modes";
import {Expression} from "../expression";

import {expressionRendererDecorator} from "./expression-renderer-decorator";

import type {PerseusExpressionOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof Expression> = {
    title: "Widgets/Expression/Visual Regression Tests/Initial State",
    component: Expression,
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

type Story = StoryObj<typeof Expression>;

// Verifies the default empty input state — math input field and keypad toggle
// button render correctly with no label and no pre-filled value
export const DefaultEmpty: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    } satisfies Partial<PerseusExpressionOptions>,
};

// Verifies the visible label renders above the input using BodyText typography
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
    } satisfies Partial<PerseusExpressionOptions>,
};

// Verifies the mobile input (KeypadInputWithInterface / KeypadInput) renders
// correctly in the mobile keypad context — background and border use semantic tokens
export const MobileInputDefault: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    } satisfies Partial<PerseusExpressionOptions>,
    parameters: {
        apiOptions: {customKeypad: true},
    },
};
