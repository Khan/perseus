import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateGradedGroupOptions,
} from "@khanacademy/perseus-core";
import {within} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {
    articleDecorator,
    mobileArticleDecorator,
} from "../../__testutils__/story-decorators";

import {
    gradedGroupSetRendererDecorator,
    twoGroupArgs,
} from "./graded-group-set-renderer-decorator";

import type {PerseusGradedGroupSetWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusGradedGroupSetWidgetOptions> = {
    title: "Widgets/Graded Group Set/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Graded Group Set widget that require " +
                    "user interactions. Each story renders on its own Chromatic page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Keyboard-navigates between groups: the pips come first in tab order, so two
// tabs focus the second pip and Enter navigates to it. This one snapshot covers
// three things — the focus ring on a pip, that navigation works, and that the
// content changes to the second group ("Problem 1b"). Group content is plain
// text (no child widget) since navigation doesn't need a scorable widget.
export const IndicatorNavigation: Story = {
    decorators: [gradedGroupSetRendererDecorator, articleDecorator],
    args: twoGroupArgs,
    play: async ({userEvent}) => {
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{Enter}");
    },
};

// A set with a scorable first group so the answer bar's "Next question" button
// can be reached the way a learner reaches it: answer the first group correctly
// on mobile and, because a later group remains, the set passes onNextQuestion to
// the group, surfacing the button. This state only exists in a set — a
// standalone graded group never shows "Next question".
const firstGroupScorableArgs = {
    gradedGroups: [
        generateGradedGroupOptions({
            title: "Problem 1a",
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
        }),
        generateGradedGroupOptions({
            title: "Problem 1b",
            content: "The second problem in the set.",
        }),
    ],
} satisfies Partial<PerseusGradedGroupSetWidgetOptions>;

export const MobileFirstGroupCorrectAnswer: Story = {
    decorators: [gradedGroupSetRendererDecorator, mobileArticleDecorator],
    args: firstGroupScorableArgs,
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
