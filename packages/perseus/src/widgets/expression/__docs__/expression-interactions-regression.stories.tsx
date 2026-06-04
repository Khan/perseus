import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {Expression} from "../expression";

import {expressionRendererDecorator} from "./expression-renderer-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof Expression> = {
    title: "Widgets/Expression/Visual Regression Tests/Interactions",
    component: Expression,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Expression widget that DO need " +
                    "some sort of interaction to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof Expression>;

async function openKeypad({
    canvas,
    userEvent,
}: Pick<Parameters<NonNullable<Story["play"]>>[0], "canvas" | "userEvent">) {
    const openButton = canvas.getByRole("button", {name: "open math keypad"});
    await userEvent.click(openButton);
}

// Args shared across all keypad tab stories — configures all four tabs:
// Numbers (always), Operators (prealgebra/logarithms), Geometry (trig),
// Extras (extraKeys)
const keypadArgs: NonNullable<Story["args"]> = {
    answerForms: [],
    buttonSets: ["basic", "trig", "prealgebra", "logarithms"],
    functions: [],
    times: false,
    extraKeys: ["x", "y"],
};

// Verifies the focused input state — blue focus ring appears on the math input
// border (semanticColor.core.border.instructive.default)
export const FocusedInput: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        const mathInput = canvas.getByRole("textbox");
        await userEvent.click(mathInput);
    },
};

// Verifies the keypad popout renders with the Numbers tab selected by default —
// captures the number buttons (0–9, operators, backspace)
export const KeypadOpenNumbersTab: Story = {
    decorators: [expressionRendererDecorator],
    args: keypadArgs,
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// Verifies the Operators tab of the keypad popout — captures the pre-algebra,
// logarithm, and relation buttons rendered in this tab
export const KeypadOpenOperatorsTab: Story = {
    decorators: [expressionRendererDecorator],
    args: keypadArgs,
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});

        // The keypad popout renders into a React portal outside the canvas
        const operatorsTab = within(document.body).getByLabelText("Operators");
        await userEvent.click(operatorsTab);
    },
};

// Verifies the Geometry tab of the keypad popout — captures the trigonometry
// buttons (sin, cos, tan, etc.) rendered in this tab
export const KeypadOpenGeometryTab: Story = {
    decorators: [expressionRendererDecorator],
    args: keypadArgs,
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});

        // The keypad popout renders into a React portal outside the canvas
        const geometryTab = within(document.body).getByLabelText("Geometry");
        await userEvent.click(geometryTab);
    },
};

// Verifies the Extras tab of the keypad popout — captures the extra variable
// key buttons (x, y) rendered in this tab
export const KeypadOpenExtrasTab: Story = {
    decorators: [expressionRendererDecorator],
    args: keypadArgs,
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});

        // The keypad popout renders into a React portal outside the canvas
        const extrasTab = within(document.body).getByLabelText("Extras");
        await userEvent.click(extrasTab);
    },
};

// Verifies the icon hover state — the toggle button fill changes to
// semanticColor.action.primary.progressive.hover.background when hovered
export const IconButtonHovered: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        const openButton = canvas.getByRole("button", {
            name: "open math keypad",
        });
        await userEvent.hover(openButton);
    },
};

// Verifies rendered math text is visible in the input — captures text color
// (semanticColor.core.foreground.neutral.strong) and field background
export const WithTextInField: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        const mathInput = canvas.getByRole("textbox");
        await userEvent.click(mathInput);
        await userEvent.type(mathInput, "x+1");
    },
};

// Verifies the focused state of the mobile input (KeypadInputWithInterface) —
// captures the instructive blue border on focus
export const MobileInputFocused: Story = {
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
    play: async ({canvas, userEvent}) => {
        const mobileInput = canvas.getByRole("textbox");
        await userEvent.click(mobileInput);
    },
};
