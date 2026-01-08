import {
    generateTestPerseusItem,
    type PerseusItem,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {
    question,
    choicesWithImages,
    multiChoiceQuestionSimple,
    multiChoiceQuestion,
} from "../__tests__/radio.testdata";

import type {APIOptions} from "../../../types";
import type {Meta} from "@storybook/react-vite";

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
    title: "Widgets/Radio",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to select a single option from a list of choices,\
                    supporting multiple-choice questions with text and image content.",
            },
        },
    },
    args: {
        static: false,
        // Requires a page refresh for toggling this to affect the story
        startAnswerless: false,
        reviewMode: false,
        showSolutions: "none",
        item: generateTestPerseusItem({
            question: question,
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
    };
    for (const [widgetId, widget] of Object.entries(
        args.item.question.widgets,
    )) {
        storyItem.question.widgets[widgetId] = {...widget, static: args.static};
    }

    return storyItem;
};

const buildApiOptions = (args: StoryArgs): APIOptions => ({});

export const SingleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: question,
        }),
    },
};

export const SelectWithImages = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithImages,
        }),
    },
};

export const MultiSelectSimple = {
    args: {
        item: generateTestPerseusItem({
            question: multiChoiceQuestionSimple,
        }),
    },
};

export const MultiSelect = {
    args: {
        item: generateTestPerseusItem({
            question: multiChoiceQuestion,
        }),
    },
};

// NOTE(Tamara): For answerless stories, the user's selection disappears after
// clicking the Check button the first time. This is because the widget
// re-mounts upon receiving answerful data and loses the user's input. After
// that first click, subsequent selections will be remembered.
// TODO(LEMS-2948): After investigating a solution, confirm this issue is fixed

export const AnswerlessSingleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: question,
        }),
        startAnswerless: true,
    },
};

export const AnswerlessMultiSelect = {
    args: {
        item: generateTestPerseusItem({
            question: multiChoiceQuestion,
        }),
        startAnswerless: true,
    },
};
