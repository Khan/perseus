import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import ArticleRenderer from "../../../article-renderer";
import WrappedServerItemRenderer from "../../../server-item-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {article, question} from "../definition.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Definition",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that creates interactive, expandable term definitions within\
                    content, allowing users to click on terms to reveal their meanings without\
                    leaving the current context.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof WrappedServerItemRenderer>;

export const Exercise: Story = {
    args: {
        item: generateTestPerseusItem({question}),
    },
};

export const Article = (): React.ReactNode => {
    return (
        <ArticleRenderer
            json={article}
            seed={0}
            dependencies={storybookDependenciesV2}
        />
    );
};
