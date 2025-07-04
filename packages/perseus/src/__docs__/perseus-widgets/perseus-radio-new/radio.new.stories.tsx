import * as React from "react";

import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {
    questionWithPassage,
    choicesWithImages,
    multiChoiceQuestionSimple,
    multiChoiceQuestion,
    multiChoiceQuestionSimpleOverflowContent,
    SingleSelectOverflowContent,
    SingleSelectOverflowImageContent,
} from "../../../widgets/radio/__tests__/radio.testdata";
import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";

import type {APIOptions} from "../../../types";
import type {PerseusItem} from "@khanacademy/perseus-core";
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

/**
 * This is a story for the new radio widget.
 * It will replace radio.stories.tsx after the feature flag is no longer needed.
 *
 * TODO(LEMS-2994): Clean up this file.
 */

export default {
    title: "Perseus/Widgets/RadioNew/Widget Demo",
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
    tags: ["!autodocs"],
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

export const SingleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: questionWithPassage,
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

export const SelectWithImagesAndScroll = {
    args: {
        item: generateTestPerseusItem({
            question: SingleSelectOverflowImageContent,
        }),
    },
};

export const SingleSelectWithScroll = {
    args: {
        item: generateTestPerseusItem({
            question: SingleSelectOverflowContent,
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

export const MultiSelectWithScroll = {
    args: {
        item: generateTestPerseusItem({
            question: multiChoiceQuestionSimpleOverflowContent,
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
            question: questionWithPassage,
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
