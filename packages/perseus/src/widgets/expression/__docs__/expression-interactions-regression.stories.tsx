import * as React from "react";
import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {Expression} from "../expression";

import {expressionRendererDecorator} from "./expression-renderer-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof Expression> = {
    title: "Widgets/Expression/Visual Regression Tests/Interactions",
    component: Expression,
    tags: ["!autodocs", "!manifest"],
    decorators: [
        (Story) => {
            // MathQuill toggles `mq-blink` via setInterval, making snapshots
            // non-deterministic. The blink rules in main.css use `!important`
            // inside `@layer shared`; CSS layers reverse !important priority
            // (layered beats unlayered), so our overrides must be inside the
            // same layer — then higher specificity (:root) + later source
            // order wins. Desktop hides via visibility, mobile via opacity +
            // transition.
            React.useLayoutEffect(() => {
                const style = document.createElement("style");
                style.textContent = `
                    @layer shared {
                        :root .mq-cursor.mq-blink { visibility: visible !important; }
                        :root .keypad-input .mq-editable-field .mq-cursor { transition: none !important; }
                        :root .keypad-input .mq-editable-field .mq-cursor.mq-blink { opacity: 1 !important; }
                    }
                `;
                document.head.appendChild(style);
                return () => style.remove();
            }, []);
            return <Story />;
        },
    ],
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

// Shared keypad args across Numbers, Operators, Geometry, and Extras tabs
const keypadArgs: NonNullable<Story["args"]> = {
    answerForms: [],
    buttonSets: ["basic", "trig", "prealgebra", "logarithms"],
    functions: [],
    times: false,
    extraKeys: ["x", "y"],
};

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

// Number buttons (0–9, operators, backspace)
export const KeypadOpenNumbersTab: Story = {
    decorators: [expressionRendererDecorator],
    args: keypadArgs,
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// Pre-algebra, logarithm, and relation buttons
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

// Trigonometry buttons (sin, cos, tan, etc.)
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

// Extra variable key buttons (x, y)
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

// Captures the pressed state of a keypad button — covers the #1B50B3 border
// and rgba(24,101,242,0.32) gradient overlay in keypad-button.tsx
export const KeypadButtonPressed: Story = {
    decorators: [expressionRendererDecorator],
    args: keypadArgs,
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
        // Keypad renders into a React portal outside the canvas
        const button = within(document.body).getByRole("button", {name: "1"});
        await userEvent.pointer({target: button, keys: "[MouseLeft>]"});
    },
};

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
