import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    generateRadioWidget,
    generateRadioOptions,
    generateRadioChoice,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import ArticleRenderer from "../../../article-renderer";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {groupedRadioRationaleQuestion} from "../../graded-group/graded-group.testdata";

import {radioRendererDecoratorWithDebugUI} from "./radio-renderer-decorator";

import type {PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const choicesWithMathFont = (options?: {
    multipleSelect: boolean;
}): PerseusRadioWidgetOptions => {
    return {
        multipleSelect: options?.multipleSelect ?? false,
        choices: [
            generateRadioChoice(
                "Both $-8$ and $8$ satisfy the equation $\\sqrt{64}=x$",
            ),
            generateRadioChoice(
                "Only $-8$ satisfies the equation $\\sqrt{64}=x$",
            ),
            generateRadioChoice(
                "Only $8$ satisfies the equation $\\sqrt{64}=x$",
            ),
            generateRadioChoice(
                "No value of $x$ satisfies the equation $\\sqrt{64}=x$",
            ),
        ],
    };
};

const meta: Meta<PerseusRadioWidgetOptions> = {
    title: "Widgets/Radio/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the radio widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ChoiceTextColorInSingleSelect: Story = {
    decorators: [radioRendererDecoratorWithDebugUI],
    args: choicesWithMathFont(),
    parameters: {
        content:
            "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    },
    play: async ({canvas, userEvent}) => {
        const choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(choiceToClick);
        choiceToClick.blur();
    },
};

export const ChoiceTextColorInMultipleSelect: Story = {
    decorators: [radioRendererDecoratorWithDebugUI],
    args: choicesWithMathFont({multipleSelect: true}),
    parameters: {
        content:
            "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    },
    play: async ({canvas, userEvent}) => {
        let choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(choiceToClick);
        choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice D\)/,
        });
        await userEvent.click(choiceToClick);
        choiceToClick.blur();
    },
};

export const FocusSingleSelect: Story = {
    decorators: [radioRendererDecoratorWithDebugUI],
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
    play: async ({canvas}) => {
        const choiceToFocus = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        choiceToFocus.focus();
    },
};

export const FocusMultiSelect: Story = {
    decorators: [radioRendererDecoratorWithDebugUI],
    args: {
        multipleSelect: true,
        choices: [
            generateRadioChoice("Choice 1", {correct: true}),
            generateRadioChoice("Choice 2"),
            generateRadioChoice("Choice 3"),
            generateRadioChoice("Choice 4"),
        ],
    },
    play: async ({canvas}) => {
        const choiceToFocus = canvas.getByRole("button", {
            name: /^\(Choice B\)/,
        });
        choiceToFocus.focus();
    },
};

export const SelectChoiceMoveFocusAfter: Story = {
    decorators: [radioRendererDecoratorWithDebugUI],
    args: {
        multipleSelect: true,
        choices: [
            generateRadioChoice("Choice 1", {correct: true}),
            generateRadioChoice("Choice 2"),
            generateRadioChoice("Choice 3"),
            generateRadioChoice("Choice 4"),
        ],
    },
    play: async ({canvas, userEvent}) => {
        const choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(choiceToClick);

        const choiceToFocus = canvas.getByRole("button", {
            name: /^\(Choice B\)/,
        });
        choiceToFocus.focus();
    },
};

/* The following stories don't use the Radio args, beacuse they are not
   directly rendered Radio widgets. These are examples of other environments
   that Radio can be rendered within. */

export const GradedGroupWrapper = {
    render: function Render() {
        return (
            <ServerItemRendererWithDebugUI
                item={generateTestPerseusItem({
                    question: groupedRadioRationaleQuestion,
                })}
            />
        );
    },
    play: async ({canvas, userEvent}) => {
        const choiceToClick = canvas.getByRole("button", {
            name: "(Choice C) Correct",
        });
        await userEvent.click(choiceToClick);
        const checkAnswerButton = canvas.getAllByRole("button", {
            name: "Check",
        })[0];
        await userEvent.click(checkAnswerButton);
        await checkAnswerButton.blur();
    },
};

export const ChoiceTextColorInArticle = {
    render: function Render() {
        return (
            <ArticleRenderer
                json={generateTestPerseusRenderer({
                    content:
                        "Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.\n\n" +
                        "We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.\n\n" +
                        "A level-two diagnostic was ordered for what system?\n\n[[☃ radio 1]]",
                    widgets: {
                        "radio 1": generateRadioWidget({
                            options: generateRadioOptions({
                                choices: [
                                    generateRadioChoice(
                                        "Antimatter containment",
                                    ),
                                    generateRadioChoice("Warp drive", {
                                        correct: true,
                                    }),
                                    generateRadioChoice("Force fields"),
                                    generateRadioChoice("Reflector dish"),
                                ],
                            }),
                        }),
                    },
                })}
                dependencies={storybookDependenciesV2}
            />
        );
    },
    play: async ({canvas}) => {
        const choiceToToggle = canvas.getByRole("button", {
            name: /Warp drive$/,
        });
        choiceToToggle.click();
    },
};
