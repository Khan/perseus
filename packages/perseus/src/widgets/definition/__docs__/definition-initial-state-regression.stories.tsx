import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import ArticleRenderer from "../../../article-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {mobileDecorator} from "../../__testutils__/story-decorators";
import {
    article,
    definitionQuestionContent,
    definitionQuestionOptions,
} from "../definition.testdata";

import {definitionRendererDecorator} from "./definition-renderer-decorator";

import type {DefinitionDefaultWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * This is a visual regression story for the definition widget.
 */

const meta: Meta<DefinitionDefaultWidgetOptions> = {
    title: "Widgets/Definition/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the definition widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * NOTE: The Definition widget also has a `hover` state, but it cannot be
 * tested accurately with Chromatic at this time (2026).
 */

export const Exercise: Story = {
    decorators: [definitionRendererDecorator],
    args: definitionQuestionOptions,
    parameters: {
        content: definitionQuestionContent,
    },
};

export const Mobile: Story = {
    decorators: [definitionRendererDecorator, mobileDecorator],
    args: definitionQuestionOptions,
    parameters: {
        content: definitionQuestionContent,
    },
};

export const Article = (): React.ReactNode => {
    return (
        <ArticleRenderer
            json={article}
            dependencies={storybookDependenciesV2}
        />
    );
};
