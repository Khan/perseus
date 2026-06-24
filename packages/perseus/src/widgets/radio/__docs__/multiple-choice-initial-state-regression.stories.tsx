import {
    generateRadioChoice,
    generateTestPerseusItem,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {testDependenciesV2} from "../../../testing/test-dependencies";
import {
    mobileDecorator,
    narrowViewportDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";
import {
    choicesWithGraphieArgs,
    choicesWithGraphieContent,
    choicesWithGraphieImages,
    choicesWithImagesArgs,
    choicesWithImagesContent,
    overflowContentInGradedGroupSet,
} from "../__tests__/radio.testdata";

import {radioRendererDecorator} from "./radio-renderer-decorator";

import type {PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * These are visual regression stories for the radio widget.
 */

const meta: Meta<PerseusRadioWidgetOptions> = {
    title: "Widgets/Radio/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
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
    decorators: [radioRendererDecorator],
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
    decorators: [radioRendererDecorator],
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
    decorators: [radioRendererDecorator],
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
    decorators: [radioRendererDecorator, rtlDecorator],
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

export const SingleSelectWithRationale = {
    decorators: [radioRendererDecorator],
    args: {
        choices: [
            generateRadioChoice("USS Voyager (NCC-74656)", {
                rationale: "Commanded by Captain Kathryn Janeway.",
            }),
            generateRadioChoice("USS Enterprise (NCC-1701)", {
                rationale:
                    "\nThis rationale has a blank line at the start, which should **NOT** affect the rendered rationale. More text: " +
                    "Shields up. I recommend we transfer power to phasers and arm the photon torpedoes. Something strange on the detector circuit. " +
                    "The weapons must have disrupted our communicators. You saw something as tasty as meat, but inorganically materialized out of patterns used by our transporters. " +
                    "Captain, the most elementary and valuable statement in science, the beginning of wisdom, is 'I do not know.'" +
                    '\n\n**Top tip!** This is the ship he commands in the series, but it is not his first command. Watch *"The Battle"* (Season 1, Episode 9) for more. And, as always, beware of Ferengi!',
            }),
            generateRadioChoice("USS Enterprise (NX-01)", {
                rationale: "Commanded by Captain Jonathan Archer.",
            }),
            generateRadioChoice("USS Stargazer (NCC-2893)", {
                correct: true,
                rationale:
                    "**This is the correct choice.** In one of the battles with the Ferengi, he killed the son of DaiMon Bok, who later sought revenge on Picard.",
            }),
        ],
    },
    parameters: {
        content:
            "What ship was Jean-Luc Picard's first command?\n\n[[\u2603 radio 1]]\n\n",
        showSolutions: "all",
    },
};

export const SingleSelectWithImages: Story = {
    decorators: [radioRendererDecorator],
    args: choicesWithImagesArgs,
    parameters: {
        content: choicesWithImagesContent,
    },
};

export const SingleSelectWithImagesAndScroll: Story = {
    decorators: [radioRendererDecorator, narrowViewportDecorator],
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
};

export const SingleSelectWithLongMathjax: Story = {
    decorators: [radioRendererDecorator],
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

export const SingleSelectWithGraphie = {
    decorators: [radioRendererDecorator],
    args: choicesWithGraphieArgs,
    parameters: {
        content: choicesWithGraphieContent,
        images: choicesWithGraphieImages,
    },
};
export const SingleSelectOneColor: Story = {
    decorators: [radioRendererDecorator],
    args: {
        choices: [
            generateRadioChoice("$\\blueD{0}$", {
                correct: true,
            }),
            generateRadioChoice("$\\blueD{1 + 8}$"),
            generateRadioChoice("$\\blueD{2 + 7}$"),
            generateRadioChoice("$\\blueD{3 + 2}$"),
        ],
    },
};
export const SingleSelectMultiInLineColor: Story = {
    decorators: [radioRendererDecorator],
    args: {
        choices: [
            generateRadioChoice("$\\greenA{Choice}$ + $\\goldD{One}$", {
                correct: true,
            }),
            generateRadioChoice("$\\blueD{Choice}$ + $\\redE{Two}$"),
            generateRadioChoice("$\\maroonC{Choice}$ + $\\purpleB{Three}$"),
            generateRadioChoice("$\\tealC{Choice}$ + $\\maroonA{Four}$"),
            generateRadioChoice("$\\blueC{Choice}$ + $\\blueB{Five}$"),
        ],
    },
};
export const SingleSelectMultiColor: Story = {
    decorators: [radioRendererDecorator],
    args: {
        choices: [
            generateRadioChoice("$\\color{darkviolet}{0}$", {
                correct: true,
            }),
            generateRadioChoice("$\\redE{1 + 8}$"),
            generateRadioChoice("$\\blueD{2 + 7}$"),
            generateRadioChoice("$\\greenD{3 + 2}$"),
        ],
    },
};
export const SingleSelectWithLongText: Story = {
    decorators: [radioRendererDecorator],
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

// Verifies the legacy `.choice table` styling: markdown tables inside choice
// content render with the legacy 1px border. Provides coverage for the
// hardcoded border color when it is later replaced by a semantic token.
export const SingleSelectWithTable: Story = {
    decorators: [radioRendererDecorator],
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
    decorators: [radioRendererDecorator],
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
    decorators: [radioRendererDecorator],
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
    decorators: [radioRendererDecorator],
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
    decorators: [radioRendererDecorator, rtlDecorator],
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
};

export const MultiSelectCountChoicesThree: Story = {
    decorators: [radioRendererDecorator],
    args: {
        multipleSelect: true,
        countChoices: true,
        numCorrect: 3,
        choices: [
            generateRadioChoice("Choice 1", {
                correct: true,
            }),
            generateRadioChoice("Choice 2", {
                correct: true,
            }),
            generateRadioChoice("Choice 3", {
                correct: true,
            }),
            generateRadioChoice("Choice 4"),
        ],
    },
};

export const MultiSelectWithManyChoices: Story = {
    decorators: [radioRendererDecorator],
    args: {
        multipleSelect: true,
        choices: [
            generateRadioChoice("Choice 1", {
                correct: true,
            }),
            generateRadioChoice("Choice 2"),
            generateRadioChoice("Choice 3"),
            generateRadioChoice("Choice 4"),
            generateRadioChoice("Choice 5"),
            generateRadioChoice("Choice 6"),
            generateRadioChoice("Choice 7"),
            generateRadioChoice("Choice 8"),
            generateRadioChoice("Choice 9"),
            generateRadioChoice("Choice 10"),
        ],
    },
};

export const SingleSelectWithLongMathjaxMobile: Story = {
    decorators: [radioRendererDecorator, mobileDecorator],
    args: {
        multipleSelect: true,
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

export const MultiSelectWithLongMathjax: Story = {
    decorators: [radioRendererDecorator],
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
    decorators: [radioRendererDecorator, narrowViewportDecorator],
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
};

export const MultiSelectWithLongText: Story = {
    decorators: [radioRendererDecorator],
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

// This is not using Radio args, since it's actually rendering a GradedGroupSet
// that's rendering nested Radio widgets.
export const GradedGroupSetWithScroll: Story = {
    render: function Render() {
        return (
            <ServerItemRenderer
                item={generateTestPerseusItem({
                    question: overflowContentInGradedGroupSet,
                })}
                dependencies={testDependenciesV2}
            />
        );
    },
    decorators: [narrowViewportDecorator],
};
