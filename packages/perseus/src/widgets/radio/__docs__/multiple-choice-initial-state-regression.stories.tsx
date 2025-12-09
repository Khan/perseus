import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    generateRadioWidget,
    generateRadioOptions,
} from "@khanacademy/perseus-core";
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
    questionWithRationale,
} from "../__tests__/radio.testdata";

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
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "choice-1",
                                },
                                {
                                    content: "Choice 2",
                                    id: "choice-2",
                                },
                                {
                                    content: "Choice 3",
                                    id: "choice-3",
                                },
                                {
                                    content: "Choice 4",
                                    id: "choice-4",
                                },
                            ],
                        }),
                    }),
                },
            }),
        }),
    },
};

export const SingleSelectWithNoneOfTheAbove: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            hasNoneOfTheAbove: true,
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "choice-1",
                                },

                                {content: "Choice 2", id: "choice-2"},
                                {content: "Choice 3", id: "choice-3"},
                                {
                                    content: "None of the above",
                                    isNoneOfTheAbove: true,
                                    id: "choice-4",
                                },
                            ],
                        }),
                    }),
                },
            }),
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
                        static: true,
                        options: generateRadioOptions({
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "choice-1",
                                },
                                {content: "Choice 2", id: "choice-2"},
                                {content: "Choice 3", id: "choice-3"},
                                {content: "Choice 4", id: "choice-4"},
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
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            choices: [
                                {
                                    content: "Choice 1",
                                    id: "radio-choice-test-id-0",
                                },
                                // Leaving the correct choice in the second position to test that
                                //     the first choice still has a top border.
                                {
                                    content: "Choice 2",
                                    correct: true,
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "Choice 3",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content: "Choice 4",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
        }),
        showSolutions: "all",
    },
};

export const SingleSelectRTL: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content: "Choice 2",
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "Choice 3",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content: "Choice 4",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
        }),
        rtl: true,
    },
};

export const SingleSelectWithPassageRef: Story = {
    args: {
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
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
                                {
                                    content:
                                        "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content:
                                        "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content:
                                        "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                                    id: "radio-choice-test-id-2",
                                },
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
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            choices: [
                                {
                                    content:
                                        "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content: "$100-50$",
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "$200-125+10$",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content: "$10+10+10+10$",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
        }),
    },
};

export const SingleSelectWithLongText: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            choices: [
                                {
                                    content:
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content:
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content:
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content:
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
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
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            multipleSelect: true,
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content: "Choice 2",
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "Choice 3",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content: "Choice 4",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
        }),
    },
};

export const MultiSelectCountChoices: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            multipleSelect: true,
                            countChoices: true,
                            numCorrect: 2,
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content: "Choice 2",
                                    correct: true,
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "Choice 3",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content: "Choice 4",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
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
                        static: true,
                        options: generateRadioOptions({
                            multipleSelect: true,
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content: "Choice 2",
                                    correct: true,
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "Choice 3",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content: "Choice 4",
                                    id: "radio-choice-test-id-3",
                                },
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
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            multipleSelect: true,
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                // Tests that borders between separate correct answers are hidden properly
                                {
                                    content: "Choice 2",
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "Choice 3",
                                    correct: true,
                                    id: "radio-choice-test-id-2",
                                },
                                // Leaving the last choice as not correct to test that there is still a bottom border
                                // (i.e. the removal of the border only affects the top of the choice, not the whole choice.)
                                {
                                    content: "Choice 4",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
        }),
        showSolutions: "all",
    },
};

export const MultiSelectRTL: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            multipleSelect: true,
                            choices: [
                                {
                                    content: "Choice 1",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content: "Choice 2",
                                    correct: true,
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "Choice 3",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content: "Choice 4",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
        }),
        rtl: true,
    },
};

export const MultiSelectWithLongMathjax: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            multipleSelect: true,
                            choices: [
                                {
                                    content:
                                        "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content: "$100-50$",
                                    correct: true,
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content: "$200-125+10$",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content: "$10+10+10+10$",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
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
                                {
                                    content:
                                        "![A row of 9 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/63a8f980544375ed1bb2540d9f48e8ac3716abc9.png)",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content:
                                        "![A row of 2 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/019ec3915127c42fc055132f7cd35c56e6276216.png)",
                                    correct: true,
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content:
                                        "![A row of 5 ponies.](https://ka-perseus-graphie.s3.amazonaws.com/0be0944c8e2d0c23612d6709640c0f93feabbd76.png)",
                                    id: "radio-choice-test-id-2",
                                },
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
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            multipleSelect: true,
                            choices: [
                                {
                                    content:
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                                    correct: true,
                                    id: "radio-choice-test-id-0",
                                },
                                {
                                    content:
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                                    correct: true,
                                    id: "radio-choice-test-id-1",
                                },
                                {
                                    content:
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                                    id: "radio-choice-test-id-2",
                                },
                                {
                                    content:
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla lorem metus, eleifend eleifend ante sodales non. Sed nec tempus lacus. Suspendisse finibus sit amet enim quis facilisis. Sed eu nisl in ligula mollis dapibus. Maecenas faucibus interdum est, nec scelerisque ligula. Nulla vestibulum tristique vulputate. Etiam hendrerit tellus sit amet lacus suscipit, in auctor nisi hendrerit. Mauris mi turpis, scelerisque eget diam a, rhoncus sodales dui. Fusce sit amet magna nisl. Donec mi nisi, accumsan nec libero consequat, ultrices ornare mauris. Sed leo dolor, facilisis sed urna eu, feugiat dapibus metus. Nunc accumsan lacus ac massa molestie, placerat malesuada massa placerat. Proin ac dolor sit amet metus semper cursus. Suspendisse nec ipsum non nunc commodo posuere. Duis quis porttitor quam. Nulla facilisi.",
                                    id: "radio-choice-test-id-3",
                                },
                            ],
                        }),
                    }),
                },
            }),
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
