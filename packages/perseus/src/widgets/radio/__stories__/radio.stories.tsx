import {
    generateTestPerseusItem,
    type PerseusItem,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {
    questionWithPassage,
    choicesWithImages,
    multiChoiceQuestionSimple,
    multiChoiceQuestion,
} from "../__tests__/radio.testdata";

import type {APIOptions} from "../../../types";
import type {Meta} from "@storybook/react";

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
    title: "Perseus/Widgets/Radio",
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
    console.log("applyStoryArgs input:", args.item);
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
        console.log(`Processing widget ${widgetId}:`, widget);
        storyItem.question.widgets[widgetId] = {
            ...widget,
            static: args.static,
            // Preserve the original options but allow static override
            options: {
                ...widget.options,
            }
        };
        console.log(`Result widget ${widgetId}:`, storyItem.question.widgets[widgetId]);
    }

    console.log("applyStoryArgs output:", storyItem);
    return storyItem;
};

const buildApiOptions = (args: StoryArgs): APIOptions => ({});

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

export const ShuffleTest = {
    args: {
        item: generateTestPerseusItem({
            question: {
                content: "Test hash-based shuffle with multiple choices:\n\n[[\u2603 radio 1]]\n\n",
                images: {},
                widgets: {
                    "radio 1": {
                        graded: true,
                        version: {
                            major: 1,
                            minor: 0,
                        },
                        static: false,
                        type: "radio",
                        options: {
                            choices: [
                                {
                                    id: "choice-a",
                                    content: "Choice A - First",
                                    correct: false,
                                },
                                {
                                    id: "choice-b",
                                    content: "Choice B - Second",
                                    correct: false,
                                },
                                {
                                    id: "choice-c",
                                    content: "Choice C - Third",
                                    correct: true,
                                },
                                {
                                    id: "choice-d",
                                    content: "Choice D - Fourth",
                                    correct: false,
                                },
                                {
                                    id: "choice-e",
                                    content: "Choice E - Fifth",
                                    correct: false,
                                },
                            ],
                            countChoices: false,
                            hasNoneOfTheAbove: false,
                            multipleSelect: false,
                            randomize: true, // This is the key - enable randomization!
                            deselectEnabled: false,
                        },
                        alignment: "default",
                    },
                },
            },
        }),
    },
};
