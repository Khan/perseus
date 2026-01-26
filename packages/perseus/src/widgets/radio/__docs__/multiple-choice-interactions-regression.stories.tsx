import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    generateRadioWidget,
    generateRadioOptions,
    generateRadioChoice,
    generateSimpleRadioItem,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {getFeatureFlags} from "../../../../../../testing/feature-flags-util";
import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {storybookDependenciesV2} from "../../../../../../testing/test-dependencies";
import ArticleRenderer from "../../../article-renderer";
import {groupedRadioRationaleQuestion} from "../../graded-group/graded-group.testdata";
import {choicesWithMathFont, question} from "../__tests__/radio.testdata";

import type {APIOptions} from "../../../types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

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
    title: "Widgets/Radio/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the radio widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
    args: {
        static: false,
        // Requires a page refresh for toggling this to affect the story
        startAnswerless: false,
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
        apiOptions: {
            flags: getFeatureFlags({"new-radio-widget": true}),
        },
    };
    for (const [widgetId, widget] of Object.entries(
        args.item.question.widgets,
    )) {
        storyItem.question.widgets[widgetId] = {...widget, static: args.static};
    }

    return storyItem;
};

const buildApiOptions = (args: StoryArgs): APIOptions => ({
    flags: getFeatureFlags({"new-radio-widget": true}),
});

export const GradedGroupWrapper = {
    args: {
        item: generateTestPerseusItem({
            question: groupedRadioRationaleQuestion,
        }),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const choiceToClick = canvas.getByRole("button", {
            name: "(Choice C) Correct",
        });
        await userEvent.click(choiceToClick);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const checkAnswerButton = canvas.getAllByRole("button", {
            name: "Check",
        })[0];
        await userEvent.click(checkAnswerButton);
        await checkAnswerButton.blur();
    },
};

export const ChoiceTextColorInSingleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithMathFont(),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(choiceToClick);
        choiceToClick.blur();
    },
};

export const ChoiceTextColorInMultipleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithMathFont({multipleSelect: true}),
        }),
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        let choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        await userEvent.click(choiceToClick);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        choiceToClick = canvas.getByRole("button", {
            name: /^\(Choice D\)/,
        });
        await userEvent.click(choiceToClick);
        choiceToClick.blur();
    },
};

export const ChoiceTextColorInArticle = (): React.ReactNode => {
    const question = generateTestPerseusRenderer({
        content:
            "Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.\n\n" +
            "We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.\n\n" +
            "A level-two diagnostic was ordered for what system?\n\n[[☃ radio 1]]",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        generateRadioChoice("Antimatter containment"),
                        generateRadioChoice("Warp drive", {correct: true}),
                        generateRadioChoice("Force fields"),
                        generateRadioChoice("Reflector dish"),
                    ],
                }),
            }),
        },
    });
    const apiOptions = {flags: getFeatureFlags({"new-radio-widget": true})};
    return (
        <ArticleRenderer
            apiOptions={apiOptions}
            json={question}
            useNewStyles
            dependencies={storybookDependenciesV2}
        />
    );
};
ChoiceTextColorInArticle.play = async ({canvas}) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const choiceToToggle = canvas.getByRole("button", {
        name: /Warp drive$/,
    });
    choiceToToggle.click();
};

export const FocusSingleSelect = {
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
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const choiceToFocus = canvas.getByRole("button", {
            name: /^\(Choice A\)/,
        });
        choiceToFocus.focus();
    },
};

export const FocusMultiSelect = {
    args: {
        item: generateSimpleRadioItem({
            multipleSelect: true,
            choices: [
                generateRadioChoice("Choice 1", {correct: true}),
                generateRadioChoice("Choice 2"),
                generateRadioChoice("Choice 3"),
                generateRadioChoice("Choice 4"),
            ],
        }),
    },
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const choiceToFocus = canvas.getByRole("button", {
            name: /^\(Choice B\)/,
        });
        choiceToFocus.focus();
    },
};
