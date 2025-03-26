import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {
    itemWithQuestionAndPassage,
    itemWithChoicesAndImages,
    itemWithMultiChoiceQuestion,
    itemWithMultiChoiceQuestionSimple,
    radioItem,
} from "../__tests__/radio.testdata";

import type {RendererWithDebugUI} from "../../../../../../testing/renderer-with-debug-ui";
import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react";

type StoryArgs = {
    // Story Option
    item: PerseusItem;
    // Radio Options
    static: boolean;
    // API Options
    crossOutEnabled: boolean;
    // Renderer Options
    startAnswerless: boolean;
} & Pick<
    React.ComponentProps<typeof RendererWithDebugUI>,
    "reviewMode" | "showSolutions"
>;

export default {
    title: "Perseus/Widgets/Radio",
    args: {
        static: false,
        crossOutEnabled: false,
        reviewMode: false,
        showSolutions: "none",
        item: itemWithQuestionAndPassage,
        startAnswerless: false,
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

const buildApiOptions = (args: StoryArgs): APIOptions => ({
    crossOutEnabled: args.crossOutEnabled,
});

export const SingleSelect = {
    args: {
        item: itemWithQuestionAndPassage,
    },
};

export const SelectWithImages = {
    args: {
        item: itemWithChoicesAndImages,
    },
};

export const MultiSelectSimple = {
    args: {
        item: itemWithMultiChoiceQuestionSimple,
    },
};

export const MultiSelect = {
    args: {
        item: itemWithMultiChoiceQuestion,
    },
};

// NOTE(Tamara): The answerless radio stories currently lose the user's input
// upon switching to answerless data initially. It will remember the user's
// input after clicking the Check button a second time.
// TODO(LEMS-2948): After investigating a solution, confirm this issue is fixed

export const AnswerlessSingleSelect = {
    args: {
        item: radioItem,
        startAnswerless: true,
    },
};

export const AnswerlessMultiSelectSimple = {
    args: {
        item: itemWithMultiChoiceQuestionSimple,
        startAnswerless: true,
    },
};

export const AnswerlessMultiSelect = {
    args: {
        item: itemWithMultiChoiceQuestion,
        startAnswerless: true,
    },
};
