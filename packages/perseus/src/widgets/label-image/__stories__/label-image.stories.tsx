import {
    generateLabelImageOptions,
    generateLabelImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import WrappedServerItemRenderer from "../../../server-item-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {
    textQuestion,
    mathQuestion,
    numberline,
    longTextFromArticle,
    mixedContentQuestion,
} from "../__tests__/label-image.testdata";

import type {
    PerseusLabelImageWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type StoryArgs = {
    options: PerseusLabelImageWidgetOptions;
    static?: boolean;
};

const meta: Meta<StoryArgs> = {
    title: "Widgets/Label Image",
    tags: ["!dev"],
    // Render a ServerItemRenderer, but allow the Label Image widget
    // props to be passed in as args.
    decorators: [
        (_, {args}) => (
            <WrappedServerItemRenderer
                dependencies={storybookDependenciesV2}
                item={generateTestPerseusItem({
                    question: generateTestPerseusRenderer({
                        content: "[[☃ label-image 1]]",
                        widgets: {
                            "label-image 1": generateLabelImageWidget({
                                static: args.static,
                                options: generateLabelImageOptions({
                                    ...args.options,
                                }),
                            }),
                        },
                    }),
                })}
            />
        ),
    ],
};

export default meta;

type Story = StoryObj<StoryArgs>;

function getArgsFromQuestion(question: PerseusRenderer) {
    return {options: question.widgets["label-image 1"].options};
}

export const LabelImageWidgetWithText: Story = {
    args: getArgsFromQuestion(textQuestion),
};

export const LabelImageWidgetWithLongText: Story = {
    args: getArgsFromQuestion(longTextFromArticle),
};

export const LabelImageWidgetWithMath: Story = {
    args: getArgsFromQuestion(mathQuestion),
};

export const LabelImageWidgetWithNumberLine: Story = {
    args: getArgsFromQuestion(numberline),
};

export const LabelImageWidgetWithMixedContent: Story = {
    args: getArgsFromQuestion(mixedContentQuestion),
};

export const LabelImageWidgetAnswerless: Story = {
    args: getArgsFromQuestion(textQuestion),
};

export const LabelImageWidgetStatic: Story = {
    args: {...getArgsFromQuestion(textQuestion), static: true},
};
