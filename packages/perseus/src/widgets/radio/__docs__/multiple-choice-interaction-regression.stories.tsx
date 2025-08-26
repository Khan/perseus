import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {groupedRadioRationaleQuestion} from "../../graded-group/graded-group.testdata";
import {
    choicesWithMathFont,
    questionWithPassage,
} from "../__tests__/radio.testdata";

import type {APIOptions} from "../../../types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";
import {radioQuestionBuilder} from "../radio-question-builder";

type StoryArgs = {
    // Story Option
    item: PerseusItem;
    // Radio Options
    static: boolean;
    // Testing Options
    startAnswerless: boolean;
} & Pick<
    React.ComponentProps<typeof ServerItemRendererWithDebugUI>,
    "reviewMode" | "showSolutions"
>;

export default {
    title: "Widgets/RadioNew/Visual Regression Tests/Interactive",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the radio widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
    args: {
        static: false,
        // Requires a page refresh for toggling this to affect the story
        startAnswerless: false,
        reviewMode: false,
        showSolutions: "none",
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
    } satisfies StoryArgs,
    argTypes: {
        showSolutions: {
            options: ["none", "all", "selected"],
            control: {
                type: "select",
            },
        },
    },
    render: (args: StoryArgs) => (
        <ServerItemRendererWithDebugUI
            item={applyStoryArgs(args)}
            apiOptions={buildApiOptions(args)}
            reviewMode={args.reviewMode}
            showSolutions={args.showSolutions}
            startAnswerless={args.startAnswerless}
        />
    ),
} satisfies Meta<StoryArgs>;

const applyStoryArgs = (args: StoryArgs): PerseusItem => {
    const storyItem = {
        ...args.item,
        question: {
            ...args.item.question,
            widgets: {},
        },
        apiOptions: {
            flags: {
                "new-radio-widget": true,
            },
        },
    };
    for (const [widgetId, widget] of Object.entries(
        args.item.question.widgets,
    )) {
        storyItem.question.widgets[widgetId] = {...widget, static: args.static};
    }

    return storyItem;
};

const buildApiOptions = (args: StoryArgs): APIOptions => ({
    flags: {
        "new-radio-widget": true,
    },
});

export const GradedGroupWrapper = {
    args: {
        item: generateTestPerseusItem({
            question: groupedRadioRationaleQuestion,
        }),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const choiceToClick = canvas.getByRole("button", {
            name: "(Choice C) Correct",
        });
        await userEvent.click(choiceToClick);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const checkAnswerButton = canvas.getAllByRole("button", {
            name: "Check",
        })[0];
        await userEvent.click(checkAnswerButton);
        await checkAnswerButton.blur();
    },
};

export const ChoiceTextColorInSingleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithMathFont(),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(choiceToClick);
    },
};

export const ChoiceTextColorInMultipleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithMathFont({multipleSelect: true}),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        let choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(choiceToClick);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice D\)/,
        });
        await userEvent.click(choiceToClick);
    },
};

export const FocusSingleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2")
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .build(),
        }),
    },
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const choiceToFocus = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        choiceToFocus.focus();
    },
};

export const FocusMultiSelect = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2")
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .withMultipleSelect(true)
                .build(),
        }),
    },
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const choiceToFocus = canvas.getByRole("button", {
            name: /^\(Choice B\)/,
        });
        choiceToFocus.focus();
    },
};
