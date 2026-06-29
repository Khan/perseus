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

// Used for stories that stay in INCORRECT or unanswered states, where
// showSolutions="none" so the inner radio widget shows no grading UI.
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

// Used for correct-answer stories. A numeric-input is deliberately chosen over
// radio here: graded-group passes showSolutions="all" when the answer is
// correct, which makes a radio widget render its full grading UI (highlighted
// choices). A numeric-input's correct state is visually minimal, keeping the
// story focused on graded-group's own correct-answer chrome (icon, answer bar).
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

// Desktop: type the correct answer and click the widget's own "Check" button.
// Captures the green correct-answer icon (#526f03 → semanticColor.core.foreground.success.default).
export const DesktopCorrectAnswer: Story = {
    args: numericInputArgs,
    play: async ({canvas, userEvent}) => {
        const input = canvas.getByRole("textbox");
        await userEvent.type(input, "0.9");
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

// Desktop: select an incorrect choice and click "Check".
// Captures the red incorrect-answer icon (#ff5454 → semanticColor.core.foreground.critical.default).
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

// Desktop: click "Check" with no answer selected.
// Captures the invalid state: no icon renders (unlike correct/incorrect),
// but a message renders through the score-message Renderer. Distinct from
// the incorrect state and relevant to markdown rendering regression.
export const DesktopInvalidAnswer: Story = {
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

// Desktop: expand the hint by clicking "Explain".
// Captures the explanationTitle style (fontSize: 14) and the hint content.
export const HintExpanded: Story = {
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const explainButton = canvas.getByRole("button", {name: "Explain"});
        await userEvent.click(explainButton);
    },
};

// Mobile: fill in an answer but do not submit.
// Captures the ACTIVE state of the answer bar: the "Check" button becomes
// enabled, distinct from the INACTIVE initial state (button disabled).
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

// Mobile: select an incorrect choice and click "Check" on the answer bar.
// Captures the answer bar INCORRECT state with the try-again icon
// (#63D9EA → semanticColor), fontWeight: "bold", and fontSize: 17 on the text.
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

// Mobile: expand the hint while the answer bar is visible.
// Captures the hint Renderer and answer bar coexisting — unique to mobile.
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

// Mobile: type the correct answer and click "Check" on the answer bar.
// Captures the answer bar CORRECT state with the star icon and fontSize: 28.
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
