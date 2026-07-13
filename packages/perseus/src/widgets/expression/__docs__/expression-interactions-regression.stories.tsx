import * as React from "react";
import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";

import {expressionRendererDecorator} from "./expression-renderer-decorator";

import type {PerseusExpressionWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusExpressionWidgetOptions> = {
    title: "Widgets/Expression/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    decorators: [
        (Story) => {
            // The cursor blinks via setInterval, making Chromatic snapshots flaky.
            // Storybook wraps main.css in `@layer shared`; CSS layers reverse
            // !important priority (layered beats unlayered), so our overrides
            // must be inside the same layer.
            React.useLayoutEffect(() => {
                const style = document.createElement("style");
                style.textContent = `
                    @layer shared {
                        .mq-cursor.mq-blink { visibility: visible !important; }
                        .keypad-input .mq-editable-field .mq-cursor { transition: none !important; }
                        .keypad-input .mq-editable-field .mq-cursor.mq-blink { opacity: 1 !important; }
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

type Story = StoryObj<typeof meta>;

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

// Focus input, keypad closed
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

export const FocusedMathButton: Story = {
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas}) => {
        const openButton = canvas.getByRole("button", {
            name: "open math keypad",
        });
        openButton.focus();
    },
};

// A keypad button has keyboard focus (focus ring visible) without being
// pressed. `.focus()` isolates the focus state from the pressed state.
export const FocusedTabButtonInKeypad: Story = {
    name: "Keypad open, Button in tab focused",
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});

        // Keypad renders into a React portal outside the canvas.
        const button = within(document.body).getByRole("button", {name: "7"});
        button.focus();
    },
};

// Only the "basic" set is selected, so the keypad renders with just the
// Numbers tab (no Operators/Geometry/Extras tabs are generated).
export const KeypadOpenBasicOnly: Story = {
    name: "Keypad open - basic",
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// "Basic relations" + "advanced relations" both map to the Operators tab,
// so the keypad shows Numbers + Operators tabs.
export const KeypadOpenSimpleMath: Story = {
    name: "Keypad open - simple math",
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic", "basic relations", "advanced relations"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// `times: true` renders multiplication as "x" instead of a center dot.
// "prealgebra" adds the Operators tab; "scientific" enriches the Numbers tab.
export const KeypadOpenScience: Story = {
    name: "Keypad open - science",
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic", "prealgebra", "scientific"],
        functions: [],
        times: true,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// "trig" adds the Geometry tab and "prealgebra" adds the Operators tab,
// so the keypad shows Numbers + Operators + Geometry tabs.
export const KeypadOpenAdvancedMath: Story = {
    name: "Keypad open - advanced math",
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic", "trig", "prealgebra"],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// Every button set selected at once — the fullest keypad configuration.
export const KeypadOpenAllButtonSets: Story = {
    name: "Keypad open - all button sets",
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: [
            "basic",
            "basic+div",
            "trig",
            "prealgebra",
            "logarithms",
            "basic relations",
            "advanced relations",
            "scientific",
        ],
        functions: [],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// With "prealgebra" selected the tabs are Numbers + Operators, so the second
// tab is Operators. `functions` is set to non-default letters; note it only
// affects scoring/parsing today and has no visible effect on the keypad.
export const KeypadOpenSecondTabWithFunctions: Story = {
    name: "Keypad open - second tab with functions",
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [],
        buttonSets: ["basic", "prealgebra"],
        functions: ["a", "b", "c"],
        times: false,
        extraKeys: [],
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});

        // The keypad popout renders into a React portal outside the canvas.
        // Operators is the second tab for this button-set configuration.
        const operatorsTab = within(document.body).getByLabelText("Operators");
        await userEvent.click(operatorsTab);
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
