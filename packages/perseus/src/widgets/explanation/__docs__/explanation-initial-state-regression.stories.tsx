import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import ArticleRenderer from "../../../article-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {useStorybookApiOptions} from "../../../testing/use-storybook-api-options";
import {question1, stacked, wideButton} from "../explanation.testdata";

import {explanationRendererDecorator} from "./explanation-renderer-decorator";

import type {PerseusExplanationWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * This is a visual regression story for the Explanation widget.
 */

const meta: Meta<PerseusExplanationWidgetOptions> = {
    title: "Widgets/Explanation/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Explanation widget that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

const simpleExample = question1.widgets["explanation 1"]?.options;

export const SimpleExample: Story = {
    decorators: [explanationRendererDecorator],
    args: {
        hidePrompt: simpleExample.hidePrompt,
        explanation: simpleExample.explanation,
        showPrompt: simpleExample.showPrompt,
    },
    parameters: {
        content: question1.content,
    },
};

const wideExample = wideButton.widgets["explanation 1"]?.options;

export const WideButton: Story = {
    decorators: [explanationRendererDecorator],
    args: {
        hidePrompt: wideExample.hidePrompt,
        explanation: wideExample.explanation,
        showPrompt: wideExample.showPrompt,
    },
    parameters: {
        content: wideButton.content,
    },
};

export const StackedInArticle = (): React.ReactNode => {
    const apiOptions = useStorybookApiOptions();
    return (
        <ArticleRenderer
            json={stacked}
            seed={0}
            dependencies={storybookDependenciesV2}
            apiOptions={apiOptions}
        />
    );
};
