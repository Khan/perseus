import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {numericInputRendererDecorator} from "../../__testutils__/numeric-input-renderer-decorator";

import type {PerseusNumericInputWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const NumericInputWidget = getWidget("numeric-input")!;

const meta: Meta<typeof NumericInputWidget> = {
    title: "Widgets/Numeric Input/Visual Regression Tests/Interactions",
    component: NumericInputWidget,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Numeric Input widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof NumericInputWidget>;

/** Verifies the focused input state (medium border width) when no answer forms are set — no tooltip appears */
export const Focus: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "normal",
    } satisfies Partial<PerseusNumericInputWidgetOptions>,
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};

/** Verifies the focused state with one answer form (integer) — tooltip shows a single example */
export const With1Tooltip: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "normal",
        answers: [
            {
                value: 5,
                status: "correct",
                message: "",
                answerForms: ["integer"],
                simplify: "required" as const,
                strict: false,
                maxError: 0,
            },
        ],
    } satisfies Partial<PerseusNumericInputWidgetOptions>,
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};

/** Verifies the focused state with multiple answer forms (integer + decimal) — tooltip shows a list of examples */
export const WithMultipleTooltips: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "normal",
        answers: [
            {
                value: 5,
                status: "correct",
                message: "",
                answerForms: ["integer", "decimal"],
                simplify: "required" as const,
                strict: false,
                maxError: 0,
            },
        ],
    } satisfies Partial<PerseusNumericInputWidgetOptions>,
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};
