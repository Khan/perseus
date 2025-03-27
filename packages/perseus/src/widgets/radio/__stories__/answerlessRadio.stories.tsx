// NOTE(Tamara): ServerItemRenderWithDebugUI does not work with the same props
// and therefore the same StoryArgs/Controls as RendererWithDebugUI, so another
// file was created for the answerless stories to preserve Controls functionality.

import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {generateTestPerseusItem} from "../../../util/test-utils";
import {
    multiChoiceQuestion,
    questionWithPassage,
} from "../__tests__/radio.testdata";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react";

type StoryArgs = {
    // Story Option
    item: PerseusItem;
    // Radio Options
    static: boolean;
    // Renderer Options
    startAnswerless: boolean;
};

export default {
    title: "Perseus/Widgets/Radio/AnswerlessRadio",
    args: {
        static: false,
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
        startAnswerless: false,
    } satisfies StoryArgs,
    render: (args: StoryArgs) => (
        <ServerItemRendererWithDebugUI
            item={applyStoryArgs(args)}
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

// NOTE(Tamara): The answerless radio stories currently lose the user's input
// upon switching to answerless data initially. It will remember the user's
// input after clicking the Check button a second time.
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
