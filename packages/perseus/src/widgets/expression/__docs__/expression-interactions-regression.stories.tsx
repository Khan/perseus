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

export const FocusedInputMobile: Story = {
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
export const KeypadButtonFocused: Story = {
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

/**
 * Button within the keypad being actively pressed.
 */
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

/**
 * After user has typed text into the input field.
 */
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

/**************** Keypad open ****************/

// Only the "basic" set is selected, so the keypad renders with just the
// Numbers tab (no Operators/Geometry/Extras tabs are generated).
export const OpenBasicOnly: Story = {
    name: "[Open] Basic",
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
export const OpenSimpleMath: Story = {
    name: "[Open] Simple math",
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
export const OpenScience: Story = {
    name: "[Open] Science",
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
export const OpenAdvancedMath: Story = {
    name: "[Open] Advanced math",
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
export const OpenAllButtonSets: Story = {
    name: "[Open] All button sets",
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

export const OpenExtrasTabWithFunctionSet: Story = {
    name: "[Open] Extras tab with function set",
    decorators: [expressionRendererDecorator],
    args: {
        answerForms: [
            {
                value: "f(2)=g(2)",
                considered: "correct",
                form: true,
                simplify: false,
            },
        ],
        buttonSets: ["basic", "prealgebra"],
        functions: ["f", "g"],
        times: false,
        // Letter buttons only render on the Extras tab, sourced from
        // `extraKeys`. In authored content this array is derived from the
        // answer forms by `deriveExtraKeys`, but Storybook builds the widget
        // options directly and never runs that derivation, so the keys must be
        // listed explicitly here for them to appear on the keypad.
        extraKeys: ["f", "g"],
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});

        // The keypad popout renders into a React portal outside the canvas.
        // Letter/variable keys live on the Extras tab (the Operators tab only
        // renders fixed operator keys, never function letters).
        const extrasTab = within(document.body).getByLabelText("Extras");
        await userEvent.click(extrasTab);
    },
};

// Number buttons (0–9, operators, backspace)
export const OpenNumbersTab: Story = {
    name: "[Open] Numbers tab",
    decorators: [expressionRendererDecorator],
    args: keypadArgs,
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// Pre-algebra, logarithm, and relation buttons
export const OpenOperatorsTab: Story = {
    name: "[Open] Operators tab",
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
export const OpenGeometryTab: Story = {
    name: "[Open] Geometry tab",
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
    name: "[Open] Extras tab",
    decorators: [expressionRendererDecorator],
    args: keypadArgs,
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});

        // The keypad popout renders into a React portal outside the canvas
        const extrasTab = within(document.body).getByLabelText("Extras");
        await userEvent.click(extrasTab);
    },
};
