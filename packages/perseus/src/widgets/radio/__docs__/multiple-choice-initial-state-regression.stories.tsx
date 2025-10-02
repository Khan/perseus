import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {getFeatureFlags} from "../../../../../../testing/feature-flags-util";
import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {
    choicesWithGraphie,
    choicesWithImages,
    overflowContentInGradedGroupSet,
    questionWithPassage,
} from "../__tests__/radio.testdata";
import {radioQuestionBuilder} from "../radio-question-builder";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof RadioQuestionRenderer>;

/**
 * This is a visual regression story for the radio widget.
 */

export default {
    title: "Widgets/RadioNew/Visual Regression Tests/Initial State",
    component: RadioQuestionRenderer,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the radio widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

// Single Selection Mode

export const SingleSelect: Story = {
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
};

export const SingleSelectWithNoneOfTheAbove: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2")
                .addChoice("Choice 3")
                .addChoice("None of the above", {isNoneOfTheAbove: true})
                .withHasNoneOfTheAbove(true)
                .build(),
        }),
    },
};

export const SingleSelectStatic: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2")
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .withStatic(true)
                .build(),
        }),
    },
};

export const SingleSelectShowSolutions: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1")
                // Leaving the correct choice in the second position to test that
                //     the first choice still has a top border.
                .addChoice("Choice 2", {correct: true})
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .build(),
        }),
        showSolutions: "all",
    },
};

export const SingleSelectRTL: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2")
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .build(),
        }),
        rtl: true,
    },
};

export const SingleSelectWithPassageRef: Story = {
    args: {
        // Can't use radioQuestionBuilder here because it also includes a passage widget.
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
    },
};

export const SingleSelectWithRationale = {
    args: {
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
        showSolutions: "all",
    },
};

export const SingleSelectWithImages: Story = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithImages,
        }),
    },
};

export const SingleSelectWithImagesAndScroll: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .withContent("Select 9 ponies.[[\u2603 radio 1]]\n\n")
                .addChoice(
                    "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                    {
                        correct: true,
                    },
                )
                .addChoice(
                    "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                )
                .addChoice(
                    "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                )
                .build(),
        }),
    },
};

export const SingleSelectWithLongMathjax: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice(
                    "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                    {correct: true},
                )
                .addChoice("$100-50$")
                .addChoice("$200-125+10$")
                .addChoice("$10+10+10+10$")
                .build(),
        }),
    },
};

export const SingleSelectWithLongText: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                    {correct: true},
                )
                .addChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                )
                .addChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                )
                .addChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                )
                .build(),
        }),
    },
};

export const SingleSelectWithGraphie = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithGraphie,
        }),
    },
};

// Multi Selection Mode

export const MultiSelect: Story = {
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
};

export const MultiSelectCountChoices: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2", {correct: true})
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .withMultipleSelect(true)
                .withCountChoices(true)
                .withNumCorrect(2)
                .build(),
        }),
    },
};

export const MultiSelectStatic: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2", {correct: true})
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .withMultipleSelect(true)
                .withStatic(true)
                .build(),
        }),
    },
};

export const MultiSelectShowSolutions: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                // Tests that borders between separate correct answers are hidden properly
                .addChoice("Choice 2")
                .addChoice("Choice 3", {correct: true})
                // Leaving the last choice as not correct to test that there is still a bottom border
                // (i.e. the removal of the border only affects the top of the choice, not the whole choice.)
                .addChoice("Choice 4")
                .withMultipleSelect(true)
                .build(),
        }),
        showSolutions: "all",
    },
};

export const MultiSelectRTL: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2", {correct: true})
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .withMultipleSelect(true)
                .build(),
        }),
        rtl: true,
    },
};

export const MultiSelectWithLongMathjax: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice(
                    "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                    {correct: true},
                )
                .addChoice("$100-50$", {
                    correct: true,
                })
                .addChoice("$200-125+10$")
                .addChoice("$10+10+10+10$")
                .withMultipleSelect(true)
                .build(),
        }),
    },
};

export const MultiSelectWithImagesAndScroll: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .withContent("Select 9 ponies.[[\u2603 radio 1]]\n\n")
                .addChoice(
                    "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                    {
                        correct: true,
                    },
                )
                .addChoice(
                    "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                    {
                        correct: true,
                    },
                )
                .addChoice(
                    "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                )
                .withMultipleSelect(true)
                .build(),
        }),
    },
};

export const MultiSelectWithLongText: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                    {correct: true},
                )
                .addChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                    {correct: true},
                )
                .addChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                )
                .addChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                )
                .withMultipleSelect(true)
                .build(),
        }),
    },
};

// Other rendering contexts

export const GradedGroupSetWithScroll: Story = {
    args: {
        item: generateTestPerseusItem({
            question: overflowContentInGradedGroupSet,
        }),
    },
};

function RadioQuestionRenderer(props: {
    item: PerseusItem;
    showSolutions?: "all" | "none" | "selected";
    rtl?: boolean;
}) {
    const {item, showSolutions, rtl} = props;

    return (
        <div dir={rtl ? "rtl" : "ltr"}>
            <ServerItemRenderer
                item={item}
                apiOptions={{
                    ...ApiOptions.defaults,
                    flags: getFeatureFlags({"new-radio-widget": true}),
                }}
                reviewMode={showSolutions === "all"}
                showSolutions={showSolutions}
                dependencies={testDependenciesV2}
            />
        </div>
    );
}
