import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import ArticleRenderer from "../../../article-renderer";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {article, question} from "../definition.testdata";

import type {StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

/**
 * This is a visual regression story for the definition widget.
 */

export default {
    title: "Widgets/Definition/Visual Regression Tests/Initial State",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
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

export const Exercise: Story = {
    args: {
        item: generateTestPerseusItem({question}),
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
