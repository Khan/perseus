import {
    KeypadContext,
    StatefulKeypadContextProvider,
} from "@khanacademy/keypad-context";
import {MobileKeypad} from "@khanacademy/math-input";
import {
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";
import {expect, fireEvent} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import WrappedServerItemRenderer from "../../../server-item-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {numericInputRendererDecorator} from "./numeric-input-renderer-decorator";

import type {
    PerseusNumericInputWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusNumericInputWidgetOptions> = {
    title: "Widgets/Numeric Input/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
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

type Story = StoryObj<typeof meta>;

/** Verifies the focused input state (medium border width) when no answer forms are set — no tooltip appears */
export const Focus: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "normal",
    },
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};

/** Verifies the focused state with one answer form (integer) — tooltip shows a single example */
export const WithTooltipOneAnswerForm: Story = {
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
    },
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};

/** Verifies the focused state with multiple answer forms (integer + decimal) — tooltip shows a list of examples */
export const WithTooltipMultipleAnswerForms: Story = {
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
    },
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};

export const WithTooltipMultipleAnswerFormsRTL: Story = {
    decorators: [numericInputRendererDecorator, rtlDecorator],
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
    },
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};

// Six of the seven supported answer forms. We deliberately stop at six:
// supplying all seven flips the widget into "all forms accepted" mode, which
// HIDES the examples tooltip entirely (see `shouldShowExamples`). Six is the
// most forms we can show while still rendering the full bulleted example list.
const allAnswerForms: PerseusNumericInputWidgetOptions["answers"] = [
    {
        value: 5,
        status: "correct",
        message: "",
        answerForms: [
            "integer",
            "decimal",
            "proper",
            "improper",
            "mixed",
            "pi",
        ],
        simplify: "optional",
        strict: false,
        maxError: 0,
    },
];

/**
 * Verifies the focused tooltip when many answer forms are accepted. With more
 * than two examples the tooltip switches from an inline string to a bulleted
 * list, so this guards that bullet layout.
 */
export const WithTooltipAllAnswerForms: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "normal",
        answers: allAnswerForms,
    },
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};

/**
 * The same full bulleted example list as WithTooltipAllAnswerForms, but in RTL.
 * Verifies the bullet points render mirrored on the reverse (right) side.
 */
export const WithTooltipAllAnswerFormsRTL: Story = {
    decorators: [numericInputRendererDecorator, rtlDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "normal",
        answers: allAnswerForms,
    },
    play: async ({canvas}) => {
        const input = canvas.getByRole("textbox");
        input.focus();
    },
};

const mobileQuestion = generateTestPerseusRenderer({
    content: "Enter the warp factor: [[☃ numeric-input 1]]",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({size: "normal"}),
        }),
    },
});

/**
 * Renders a question with the full mobile on-screen keypad wired up.
 */
function MobileKeypadItemRenderer({question}: {question: PerseusRenderer}) {
    return (
        <StatefulKeypadContextProvider>
            <KeypadContext.Consumer>
                {({keypadElement}) => (
                    <WrappedServerItemRenderer
                        apiOptions={{isMobile: true, customKeypad: true}}
                        item={generateTestPerseusItem({question})}
                        problemNum={0}
                        dependencies={storybookDependenciesV2}
                        keypadElement={keypadElement}
                    />
                )}
            </KeypadContext.Consumer>
            <KeypadContext.Consumer>
                {({setKeypadElement}) => (
                    <MobileKeypad
                        onElementMounted={setKeypadElement}
                        onDismiss={() => {}}
                        onAnalyticsEvent={async () => {}}
                    />
                )}
            </KeypadContext.Consumer>
        </StatefulKeypadContextProvider>
    );
}

export const MobilePhoneBasicKeypadOpen: Story = {
    render: () => (
        <div
            className="framework-perseus perseus-mobile"
            style={{
                transform: "translateZ(0)",
                position: "relative",
                // Mobile phone dimensions
                width: 375,
                height: 600,
                overflow: "hidden",
            }}
        >
            <MobileKeypadItemRenderer question={mobileQuestion} />
        </div>
    ),
    play: async ({canvas}) => {
        const input = await canvas.findByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );
        fireEvent.touchStart(input);
        // Wait for the keypad to finish its open animation.
        await expect(
            canvas.findByRole("button", {name: "1"}),
        ).resolves.toBeVisible();
    },
};

export const MobileTabletExpandedKeypadOpen: Story = {
    render: () => (
        <div
            className="framework-perseus perseus-mobile"
            style={{
                transform: "translateZ(0)",
                position: "relative",
                // Tablet landscape dimensions
                width: 900,
                height: 520,
                overflow: "hidden",
            }}
        >
            <MobileKeypadItemRenderer question={mobileQuestion} />
        </div>
    ),
    play: async ({canvas}) => {
        const input = await canvas.findByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );
        fireEvent.touchStart(input);
        // Wait for the keypad to finish its open animation.
        await expect(
            canvas.findByRole("button", {name: "1"}),
        ).resolves.toBeVisible();
    },
};
