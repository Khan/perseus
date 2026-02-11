import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    generateRadioWidget,
    generateRadioOptions,
    generateRadioChoice,
    generateSimpleRadioItem,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {getFeatureFlags} from "../../../testing/feature-flags-util";
import {testDependenciesV2} from "../../../testing/test-dependencies";
import {
    choicesWithGraphie,
    choicesWithImages,
    overflowContentInGradedGroupSet,
    questionWithRationale,
} from "../__tests__/radio.testdata";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof RadioQuestionRenderer>;

/**
 * This is a visual regression story for the radio widget.
 */

export default {
    title: "Widgets/Radio/Visual Regression Tests/Initial State",
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
        item: generateSimpleRadioItem({
            choices: [
                generateRadioChoice("Choice 1", {
                    correct: true,
                }),
                generateRadioChoice("Choice 2"),
                generateRadioChoice("Choice 3"),
                generateRadioChoice("Choice 4"),
            ],
        }),
    },
};

export const SingleSelectWithNoneOfTheAbove: Story = {
    args: {
        item: generateSimpleRadioItem({
            hasNoneOfTheAbove: true,
            choices: [
                generateRadioChoice("Choice 1", {
                    correct: true,
                }),
                generateRadioChoice("Choice 2"),
                generateRadioChoice("Choice 3"),
                generateRadioChoice("None of the above", {
                    isNoneOfTheAbove: true,
                }),
            ],
        }),
    },
};

export const SingleSelectStatic: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            choices: [
                                generateRadioChoice("Choice 1", {
                                    correct: true,
                                }),
                                generateRadioChoice("Choice 2"),
                                generateRadioChoice("Choice 3"),
                                generateRadioChoice("Choice 4"),
                            ],
                        }),
                    }),
                },
            }),
        }),
    },
};

export const SingleSelectShowSolutions: Story = {
    args: {
        item: generateSimpleRadioItem({
            choices: [
                generateRadioChoice("Choice 1"),
                // Leaving the correct choice in the second position to test that
                //     the first choice still has a top border.
                generateRadioChoice("Choice 2", {
                    correct: true,
                }),
                generateRadioChoice("Choice 3"),
                generateRadioChoice("Choice 4"),
            ],
        }),
        showSolutions: "all",
    },
};

export const SingleSelectRTL: Story = {
    args: {
        item: generateSimpleRadioItem({
            choices: [
                generateRadioChoice("Choice 1", {
                    correct: true,
                }),
                generateRadioChoice("Choice 2"),
                generateRadioChoice("Choice 3"),
                generateRadioChoice("Choice 4"),
            ],
        }),
        rtl: true,
    },
};

export const SingleSelectWithRationale = {
    args: {
        item: generateTestPerseusItem({
            question: questionWithRationale,
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
            question: generateTestPerseusRenderer({
                content: "Select 9 ponies.[[\u2603 radio 1]]\n\n",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            choices: [
                                generateRadioChoice(
                                    "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                                    {correct: true},
                                ),
                                generateRadioChoice(
                                    "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                                ),
                                generateRadioChoice(
                                    "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                                ),
                            ],
                        }),
                    }),
                },
            }),
        }),
    },
};

export const SingleSelectWithLongMathjax: Story = {
    args: {
        item: generateSimpleRadioItem({
            choices: [
                generateRadioChoice(
                    "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                    {correct: true},
                ),
                generateRadioChoice("$100-50$"),
                generateRadioChoice("$200-125+10$"),
                generateRadioChoice("$10+10+10+10$"),
            ],
        }),
    },
};

export const SingleSelectWithLongText: Story = {
    args: {
        item: generateSimpleRadioItem({
            choices: [
                generateRadioChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                    {correct: true},
                ),
                generateRadioChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                ),
                generateRadioChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                ),
                generateRadioChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                ),
            ],
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
        item: generateSimpleRadioItem({
            multipleSelect: true,
            choices: [
                generateRadioChoice("Choice 1", {
                    correct: true,
                }),
                generateRadioChoice("Choice 2"),
                generateRadioChoice("Choice 3"),
                generateRadioChoice("Choice 4"),
            ],
        }),
    },
};

export const MultiSelectCountChoices: Story = {
    args: {
        item: generateSimpleRadioItem({
            multipleSelect: true,
            countChoices: true,
            numCorrect: 2,
            choices: [
                generateRadioChoice("Choice 1", {
                    correct: true,
                }),
                generateRadioChoice("Choice 2", {
                    correct: true,
                }),
                generateRadioChoice("Choice 3"),
                generateRadioChoice("Choice 4"),
            ],
        }),
    },
};

export const MultiSelectStatic: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            multipleSelect: true,
                            choices: [
                                generateRadioChoice("Choice 1", {
                                    correct: true,
                                }),
                                generateRadioChoice("Choice 2", {
                                    correct: true,
                                }),
                                generateRadioChoice("Choice 3"),
                                generateRadioChoice("Choice 4"),
                            ],
                        }),
                    }),
                },
            }),
        }),
    },
};

export const MultiSelectShowSolutions: Story = {
    args: {
        item: generateSimpleRadioItem({
            multipleSelect: true,
            choices: [
                generateRadioChoice("Choice 1", {
                    correct: true,
                }),
                // Tests that borders between separate correct answers are hidden properly
                generateRadioChoice("Choice 2"),
                generateRadioChoice("Choice 3", {
                    correct: true,
                }),
                // Leaving the last choice as not correct to test that there is still a bottom border
                // (i.e. the removal of the border only affects the top of the choice, not the whole choice.)
                generateRadioChoice("Choice 4"),
            ],
        }),
        showSolutions: "all",
    },
};

export const MultiSelectRTL: Story = {
    args: {
        item: generateSimpleRadioItem({
            multipleSelect: true,
            choices: [
                generateRadioChoice("Choice 1", {
                    correct: true,
                }),
                generateRadioChoice("Choice 2", {
                    correct: true,
                }),
                generateRadioChoice("Choice 3"),
                generateRadioChoice("Choice 4"),
            ],
        }),
        rtl: true,
    },
};

export const MultiSelectWithLongMathjax: Story = {
    args: {
        item: generateSimpleRadioItem({
            multipleSelect: true,
            choices: [
                generateRadioChoice(
                    "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                    {correct: true},
                ),
                generateRadioChoice("$100-50$", {
                    correct: true,
                }),
                generateRadioChoice("$200-125+10$"),
                generateRadioChoice("$10+10+10+10$"),
            ],
        }),
    },
};

export const MultiSelectWithImagesAndScroll: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "Select 9 ponies.[[\u2603 radio 1]]\n\n",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            multipleSelect: true,
                            choices: [
                                generateRadioChoice(
                                    "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                                    {correct: true},
                                ),
                                generateRadioChoice(
                                    "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                                    {correct: true},
                                ),
                                generateRadioChoice(
                                    "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                                ),
                            ],
                        }),
                    }),
                },
            }),
        }),
    },
};

export const MultiSelectWithLongText: Story = {
    args: {
        item: generateSimpleRadioItem({
            multipleSelect: true,
            choices: [
                generateRadioChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                    {correct: true},
                ),
                generateRadioChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                    {correct: true},
                ),
                generateRadioChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                ),
                generateRadioChoice(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                ),
            ],
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
