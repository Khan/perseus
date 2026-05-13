import {
    generateTestPerseusItem,
    generateRadioChoice,
} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {radioRendererDecorator} from "../../__testutils__/radio-renderer-decorator";
import {narrowViewportDecorator} from "../../__testutils__/story-decorators";
import {
    choicesWithGraphie,
    choicesWithImages,
    overflowContentInGradedGroupSet,
    questionWithRationale,
} from "../__tests__/radio.testdata";

import type {RadioPublicWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * These are visual regression stories for the radio widget.
 */

const meta: Meta<RadioPublicWidgetOptions> = {
    title: "Widgets/Radio/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    decorators: [radioRendererDecorator],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the radio widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Single Selection Mode

export const SingleSelect: Story = {
    args: {
        choices: [
            generateRadioChoice("Choice 1", {
                correct: true,
            }),
            generateRadioChoice("Choice 2"),
            generateRadioChoice("Choice 3"),
            generateRadioChoice("Choice 4"),
        ],
    },
};

export const SingleSelectWithNoneOfTheAbove: Story = {
    args: {
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
    },
};

export const SingleSelectShowSolutions: Story = {
    args: {
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
    },
    parameters: {
        showSolutions: "all",
    },
};

export const SingleSelectRTL: Story = {
    args: {
        choices: [
            generateRadioChoice("Choice 1", {
                correct: true,
            }),
            generateRadioChoice("Choice 2"),
            generateRadioChoice("Choice 3"),
            generateRadioChoice("Choice 4"),
        ],
    },
    parameters: {
        rtl: true,
    },
};

export const SingleSelectWithRationale = {
    args: {
        question: questionWithRationale,
    },
    parameters: {
        showSolutions: "all",
    },
};

export const SingleSelectWithImages: Story = {
    args: {
        question: choicesWithImages,
    },
};

export const SingleSelectWithImagesAndScroll: Story = {
    args: {
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
    },
    parameters: {
        content: "Select 9 ponies.[[\u2603 radio 1]]\n\n",
    },
    decorators: [narrowViewportDecorator],
};

export const SingleSelectWithLongMathjax: Story = {
    args: {
        choices: [
            generateRadioChoice(
                "$1+1+1+1+1+5+5+1+1+1+1+1+7+2+1+1+9+5+3+1+1+6+4+10+3+2$",
                {correct: true},
            ),
            generateRadioChoice("$100-50$"),
            generateRadioChoice("$200-125+10$"),
            generateRadioChoice("$10+10+10+10$"),
        ],
    },
};

export const SingleSelectWithLongText: Story = {
    args: {
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
    },
};

export const SingleSelectWithGraphie = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithGraphie,
        }),
    },
};

// Verifies the legacy `.choice table` styling: markdown tables inside choice
// content render with the legacy 1px border. Provides coverage for the
// hardcoded border color when it is later replaced by a semantic token.
export const SingleSelectWithTable: Story = {
    args: {
        choices: [
            generateRadioChoice(
                "| Animal | Legs |\n| --- | --- |\n| Dog | 4 |\n| Spider | 8 |",
                {correct: true},
            ),
            generateRadioChoice(
                "| Animal | Legs |\n| --- | --- |\n| Cat | 4 |\n| Ant | 6 |",
            ),
            generateRadioChoice(
                "| Animal | Legs |\n| --- | --- |\n| Bird | 2 |\n| Crab | 10 |",
            ),
        ],
    },
};

// Multi Selection Mode

export const MultiSelect: Story = {
    args: {
        multipleSelect: true,
        choices: [
            generateRadioChoice("Choice 1", {
                correct: true,
            }),
            generateRadioChoice("Choice 2"),
            generateRadioChoice("Choice 3"),
            generateRadioChoice("Choice 4"),
        ],
    },
};

export const MultiSelectCountChoices: Story = {
    args: {
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
    },
};

export const MultiSelectShowSolutions: Story = {
    args: {
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
    },
    parameters: {
        showSolutions: "all",
    },
};

export const MultiSelectRTL: Story = {
    args: {
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
    },
    parameters: {
        rtl: true,
    },
};

export const MultiSelectWithLongMathjax: Story = {
    args: {
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
    },
};

export const MultiSelectWithImagesAndScroll: Story = {
    args: {
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
    },
    parameters: {
        content: "Select 9 ponies.[[\u2603 radio 1]]\n\n",
    },
    decorators: [narrowViewportDecorator],
};

export const MultiSelectWithLongText: Story = {
    args: {
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
    },
};

// Other rendering contexts

export const GradedGroupSetWithScroll: Story = {
    args: {
        question: overflowContentInGradedGroupSet,
    },
    decorators: [narrowViewportDecorator],
};
