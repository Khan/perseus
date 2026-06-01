import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {expressionRendererDecorator} from "../../__testutils__/expression-renderer-decorator";

import type {PerseusExpressionWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const ExpressionWidget = getWidget("expression")!;

const meta: Meta<typeof ExpressionWidget> = {
    title: "Widgets/Expression/Visual Regression Tests/Initial State",
    component: ExpressionWidget,
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

type Story = StoryObj<typeof ExpressionWidget>;

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
    } satisfies Partial<PerseusExpressionWidgetOptions>,
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
    } satisfies Partial<PerseusExpressionWidgetOptions>,
};

// Verifies the mobile input (KeypadInputWithInterface / KeypadInput) renders
// correctly — captures the hardcoded white background and neutral border that
// need color token migration
export const MobileInputDefault: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    } satisfies Partial<PerseusExpressionWidgetOptions>,
    parameters: {
        apiOptions: {customKeypad: true},
    },
};
