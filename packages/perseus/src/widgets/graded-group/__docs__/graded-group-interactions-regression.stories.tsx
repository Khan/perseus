import {
    generateDropdownOptions,
    generateDropdownWidget,
} from "@khanacademy/perseus-core";
import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {mobileDecorator} from "../../__testutils__/story-decorators";

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

// Content is kept to a bare dropdown with self-describing options so the
// snapshots stay focused on graded-group's own chrome, not the question. Two
// options are needed so the incorrect-answer stories have a wrong choice to pick.
const sharedArgs = {
    title: "Check your understanding!",
    content: "[[☃ dropdown 1]]",
    widgets: {
        "dropdown 1": generateDropdownWidget({
            options: generateDropdownOptions({
                placeholder: "Select an answer",
                choices: [
                    {content: "Correct answer", correct: true},
                    {content: "Incorrect answer", correct: false},
                ],
            }),
        }),
    },
    hint: {
        content: "This is a hint.",
        images: {},
        widgets: {},
    },
    hasHint: true,
    images: {},
} satisfies Partial<PerseusGradedGroupWidgetOptions>;

// A group with no scorable widget scores as correct on Check (zero widgets =
// 0/0 points), and the desktop Check button is always enabled — so the correct
// state needs no widget, keeping the snapshot to graded-group's own chrome.
const textOnlyArgs = {
    title: "Check your understanding!",
    content: "This group is marked correct when checked.",
    widgets: {},
    images: {},
} satisfies Partial<PerseusGradedGroupWidgetOptions>;

export const DesktopCorrectAnswer: Story = {
    args: textOnlyArgs,
    play: async ({canvas, userEvent}) => {
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

export const DesktopIncorrectAnswer: Story = {
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const dropdown = canvas.getByRole("combobox");
        await userEvent.click(dropdown);
        const wrongOption = within(document.body).getByRole("option", {
            name: "Incorrect answer",
        });
        await userEvent.click(wrongOption);
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

export const DesktopHintExpanded: Story = {
    args: sharedArgs,
    play: async ({canvas, userEvent}) => {
        const explainButton = canvas.getByRole("button", {name: "Explain"});
        await userEvent.click(explainButton);
    },
};

export const MobileHintExpanded: Story = {
    args: sharedArgs,
    decorators: [mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
    play: async ({canvas, userEvent}) => {
        const explainButton = canvas.getByRole("button", {name: "Explain"});
        await userEvent.click(explainButton);
    },
};

// Mobile answer bar states, reached through the real learner flow: on mobile the
// graded group renders its Check button in an answer bar at the bottom, so these
// stories drive it into each state the way a learner would rather than rendering
// the bar in isolation. (The "Next question" state lives in the graded-group-set
// stories — a standalone graded group never shows that button.)

// Selecting an option makes the group answerable, enabling the Check button.
export const MobileAnswerBarActive: Story = {
    args: sharedArgs,
    decorators: [mobileDecorator],
    parameters: {apiOptions: {isMobile: true}},
    play: async ({canvas, userEvent}) => {
        const dropdown = canvas.getByRole("combobox");
        await userEvent.click(dropdown);
        const option = within(document.body).getByRole("option", {
            name: "Correct answer",
        });
        await userEvent.click(option);
    },
};

// A wrong answer swaps the Check button for the neutral "try again" icon.
export const MobileAnswerBarIncorrect: Story = {
    args: sharedArgs,
    decorators: [mobileDecorator],
    parameters: {apiOptions: {isMobile: true}},
    play: async ({canvas, userEvent}) => {
        const dropdown = canvas.getByRole("combobox");
        await userEvent.click(dropdown);
        const wrongOption = within(document.body).getByRole("option", {
            name: "Incorrect answer",
        });
        await userEvent.click(wrongOption);
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};

// A correct answer shows the success star in the answer bar.
export const MobileAnswerBarCorrect: Story = {
    args: sharedArgs,
    decorators: [mobileDecorator],
    parameters: {apiOptions: {isMobile: true}},
    play: async ({canvas, userEvent}) => {
        const dropdown = canvas.getByRole("combobox");
        await userEvent.click(dropdown);
        const correctOption = within(document.body).getByRole("option", {
            name: "Correct answer",
        });
        await userEvent.click(correctOption);
        const checkButton = canvas.getByRole("button", {name: "Check"});
        await userEvent.click(checkButton);
    },
};
