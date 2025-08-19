import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {questionWithPassage} from "../__tests__/radio.testdata";
import {radioQuestionBuilder} from "../radio-question-builder";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof RadioQuestionRenderer>;

/**
 * This is a visual regression story for the radio widget.
 */

export default {
    title: "Widgets/RadioNew/Visual Regression Tests",
    component: RadioQuestionRenderer,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the radio widget, which will be used with Chromatic.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

/**
 * Single Selection Mode
 */

/* States */

// Basic Single Select
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

// Review Mode
export const SingleSelectShowSolutions: Story = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice("Choice 1", {correct: true})
                .addChoice("Choice 2")
                .addChoice("Choice 3")
                .addChoice("Choice 4")
                .build(),
        }),
        showSolutions: "all",
    },
};

// Single Select with Passage Ref
export const SingleSelectWithPassageRef: Story = {
    args: {
        // Can't use radioQuestionBuilder here because it also includes a passage widget.
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
    },
};

// Single Select with Images
export const SingleSelectWithImages = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice(
                    "Same \nLine\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\nSame\nLine",
                    {correct: true},
                )
                .addChoice(
                    "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                )
                .addChoice(
                    "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                )
                .addChoice(
                    "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                )
                .build(),
        }),
    },
};

export const SingleSelectWithImagesAndScroll = {
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

export const SingleSelectWithLongMathjax = {
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

export const SingleSelectWithLongText = {
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

/**
 * Multi Selection Mode
 */

/* States */
// Basic Multi Select
export const MultiSelect = {
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

export const MultiSelectCountChoices = {
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

export const MultiSelectStatic = {
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

export const MultiSelectShowSolutions = {
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
        showSolutions: "all",
    },
};

/* Edge Cases */
export const MultiSelectWithLongMathjax = {
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

export const MultiSelectWithImages = {
    args: {
        item: generateTestPerseusItem({
            question: radioQuestionBuilder()
                .addChoice(
                    "Same \nLine\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\nSame\nLine",
                    {correct: true},
                )
                .addChoice(
                    "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
                    {correct: true},
                )
                .addChoice(
                    "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                )
                .addChoice(
                    "Text \n\nBefore\n\n![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)\n\nText \n\nAfter",
                )
                .withMultipleSelect(true)
                .build(),
        }),
    },
};

export const MultiSelectWithImagesAndScroll = {
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

export const MultiSelectWithLongText = {
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

function RadioQuestionRenderer(props: {
    item: PerseusItem;
    showSolutions?: "all" | "none" | "selected";
}) {
    const {item, showSolutions} = props;

    return (
        <ServerItemRenderer
            item={item}
            apiOptions={ApiOptions.defaults}
            reviewMode={false}
            showSolutions={showSolutions}
            dependencies={testDependenciesV2}
        />
    );
}
