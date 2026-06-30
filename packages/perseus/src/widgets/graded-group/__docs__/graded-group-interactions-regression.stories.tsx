import {
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";

import {gradedGroupRendererDecorator} from "./graded-group-renderer-decorator";

import type {PerseusGradedGroupWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusGradedGroupWidgetOptions> = {
    title: "Widgets/Graded Group/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Graded Group widget that require " +
                    "user interactions. Each story renders on its own Chromatic page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    decorators: [gradedGroupRendererDecorator],
};

export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs = {
    title: "Check your understanding!",
    content:
        "Which of the following is a renewable energy source?\n\n[[☃ radio 1]]\n\n",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    generateRadioChoice("Coal"),
                    generateRadioChoice("Natural gas"),
                    generateRadioChoice("Solar power", {correct: true}),
                    generateRadioChoice("Petroleum"),
                ],
            }),
        }),
    },
    hint: {
        content:
            "Solar power is renewable because sunlight is continuously available.",
        images: {},
        widgets: {},
    },
    hasHint: true,
    images: {},
} satisfies Partial<PerseusGradedGroupWidgetOptions>;

// Correct-answer stories use numeric-input rather than radio: on a correct
// answer graded-group renders a radio widget's full grading UI (highlighted
// choices), which would obscure graded-group's own correct-answer chrome.
const numericInputArgs = {
    title: "Check your understanding!",
    content: "$0.5 + 0.4 =$ [[☃ numeric-input 1]]",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [generateNumericInputAnswer({value: 0.9})],
            }),
        }),
    },
    hint: {
        content:
            "Think in tenths: $5$ tenths $+ 4$ tenths $= 9$ tenths $= 0.9$.",
        images: {},
        widgets: {},
    },
    hasHint: true,
    images: {},
} satisfies Partial<PerseusGradedGroupWidgetOptions>;

export const DesktopCorrectAnswer: Story = {
    args: numericInputArgs,
    play: async ({canvas, userEvent}) => {
        const input = canvas.getByRole("textbox");
        await userEvent.type(input, "0.9");
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

export const DesktopIncorrectAnswer: Story = {
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const incorrectChoice = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(incorrectChoice);
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

export const DesktopInvalidAnswer: Story = {
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

export const HintExpanded: Story = {
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const explainButton = canvas.getByRole("button", {name: "Explain"});
        await userEvent.click(explainButton);
    },
};

export const MobileAnswerBarActive: Story = {
    args: numericInputArgs,
    parameters: {
        apiOptions: {isMobile: true},
    },
    play: async ({canvas, userEvent}) => {
        const input = canvas.getByRole("textbox");
        await userEvent.type(input, "0.9");
    },
};

export const MobileAnswerBarIncorrect: Story = {
    args: sharedArgs,
    parameters: {
        apiOptions: {isMobile: true},
    },
    play: async ({canvas, userEvent}) => {
        const incorrectChoice = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(incorrectChoice);
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

export const MobileHintExpanded: Story = {
    args: sharedArgs,
    parameters: {
        apiOptions: {isMobile: true},
    },
    play: async ({canvas, userEvent}) => {
        const explainButton = canvas.getByRole("button", {name: "Explain"});
        await userEvent.click(explainButton);
    },
};

export const MobileAnswerBarCorrect: Story = {
    args: numericInputArgs,
    parameters: {
        apiOptions: {isMobile: true},
    },
    play: async ({canvas, userEvent}) => {
        const input = canvas.getByRole("textbox");
        await userEvent.type(input, "0.9");
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};
