import {
    generateExpressionOptions,
    type PerseusExpressionWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";
import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {expressionRendererDecorator} from "./expression-renderer-decorator";

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

export const RightToLeft: Story = {
    name: "RTL",
    decorators: [expressionRendererDecorator, rtlDecorator],
    args: generateExpressionOptions({
        buttonSets: ["basic"],
        visibleLabel: "اپنا جواب درج کریں۔",
        ariaLabel: "اپنا جواب درج کریں۔",
    }),
    parameters: {
        initialUserInput: {"expression 1": "2x"},
    },
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

/**************** Button sets ****************/

// "basic" adds buttons in the Numbers tab
export const OpenBasic: Story = {
    name: "[Open] Basic",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        buttonSets: ["basic"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// "basic+div" adds buttons in the Numbers tab
export const OpenBasicDiv: Story = {
    name: "[Open] Basic+Div",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        buttonSets: ["basic+div"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// "trig" adds buttons in the Geometry tab
export const OpenTrig: Story = {
    name: "[Open] Trig",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        buttonSets: ["trig"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
        // The keypad popout renders into a React portal outside the canvas
        const geometryTab = within(document.body).getByLabelText("Geometry");
        await userEvent.click(geometryTab);
    },
};

// "prealgebra" adds buttons in the Operators tab
export const OpenPrealgebra: Story = {
    name: "[Open] Prealgebra",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        buttonSets: ["prealgebra"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
        // The keypad popout renders into a React portal outside the canvas
        const operatorsTab = within(document.body).getByLabelText("Operators");
        await userEvent.click(operatorsTab);
    },
};

// "logarithms" adds buttons in the Operators tab
export const OpenLogarithms: Story = {
    name: "[Open] Logarithms",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        buttonSets: ["logarithms"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
        // The keypad popout renders into a React portal outside the canvas
        const operatorsTab = within(document.body).getByLabelText("Operators");
        await userEvent.click(operatorsTab);
    },
};

// "basic relations" adds buttons in the Operators tab
export const OpenBasicRelations: Story = {
    name: "[Open] Basic Relations",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        buttonSets: ["basic relations"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
        // The keypad popout renders into a React portal outside the canvas
        const operatorsTab = within(document.body).getByLabelText("Operators");
        await userEvent.click(operatorsTab);
    },
};

// "advanced relations" adds buttons in the Operators tab
export const OpenAdvancedRelations: Story = {
    name: "[Open] Advanced Relations",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        buttonSets: ["advanced relations"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
        // The keypad popout renders into a React portal outside the canvas
        const operatorsTab = within(document.body).getByLabelText("Operators");
        await userEvent.click(operatorsTab);
    },
};

// "scientific" adds buttons in the Numbers tab
export const OpenScientific: Story = {
    name: "[Open] Scientific",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        buttonSets: ["scientific"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
    },
};

// `extraKeys` adds buttons in the Extras tab
export const OpenExtras: Story = {
    name: "[Open] Extras",
    decorators: [expressionRendererDecorator],
    args: generateExpressionOptions({
        extraKeys: ["x", "y"],
    }),
    play: async ({canvas, userEvent}) => {
        await openKeypad({canvas, userEvent});
        // The keypad popout renders into a React portal outside the canvas
        const extrasTab = within(document.body).getByLabelText("Extras");
        await userEvent.click(extrasTab);
    },
};
