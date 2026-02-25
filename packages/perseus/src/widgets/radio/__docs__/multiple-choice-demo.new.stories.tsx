import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {getFeatureFlags} from "../../../testing/feature-flags-util";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {narrowViewportDecorator} from "../../__testutils__/story-decorators";
import {groupedRadioRationaleQuestion} from "../../graded-group/graded-group.testdata";
import {
    question,
    choicesWithGraphie,
    choicesWithImagesMarkdown,
    choicesWithImageWidgets,
    multiChoiceQuestionSimple,
    multiChoiceQuestion,
    multiChoiceQuestionSimpleOverflowContent,
    SingleSelectOverflowContent,
    SingleSelectOverflowImageContent,
    overflowContentInGradedGroupSet,
} from "../__tests__/radio.testdata";

import type {APIOptions} from "../../../types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

type StoryArgs = {
    // Story Option
    item: PerseusItem;
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
    title: "Widgets/Radio/Widget Demo",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A new version of the radio widget that allows users to select a single option from a list of choices,\
                    with improved accessibility and interface features.",
            },
        },
    },
    args: {
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
        />
    ),
} satisfies Meta<StoryArgs>;

const applyStoryArgs = (args: StoryArgs): PerseusItem => {
    const storyItem = {
        ...args.item,
        apiOptions: {
            flags: getFeatureFlags({"new-radio-widget": true}),
        },
    };
    return storyItem;
};

const buildApiOptions = (args: StoryArgs): APIOptions => ({
    flags: getFeatureFlags({"new-radio-widget": true}),
});

export const SingleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: question,
        }),
    },
};

export const SelectWithGraphie = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithGraphie,
        }),
    },
};

export const SelectWithImagesMarkdown = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithImagesMarkdown,
        }),
    },
};

export const SelectWithImageWidgets = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithImageWidgets,
        }),
    },
};

export const SelectWithImagesAndScroll = {
    args: {
        item: generateTestPerseusItem({
            question: SingleSelectOverflowImageContent,
        }),
    },
    decorators: [narrowViewportDecorator],
};

export const SingleSelectWithScroll = {
    args: {
        item: generateTestPerseusItem({
            question: SingleSelectOverflowContent,
        }),
    },
    decorators: [narrowViewportDecorator],
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
    decorators: [narrowViewportDecorator],
};

export const GradedGroupSetWithScroll = {
    args: {
        item: generateTestPerseusItem({
            question: overflowContentInGradedGroupSet,
        }),
    },
    decorators: [narrowViewportDecorator],
};

export const GradedGroup = {
    args: {
        item: generateTestPerseusItem({
            question: groupedRadioRationaleQuestion,
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
    },
};

export const AnswerlessMultiSelect = {
    args: {
        item: generateTestPerseusItem({
            question: multiChoiceQuestion,
        }),
    },
};
