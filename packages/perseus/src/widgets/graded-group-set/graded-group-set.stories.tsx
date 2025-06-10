import {ArticleRendererWithDebugUI} from "../../../../../testing/article-renderer-with-debug-ui";

import {article1} from "./graded-group-set.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Widgets/Graded Group Set",
    component: ArticleRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ArticleRendererWithDebugUI>;

export const Article1: Story = {
    args: {
        json: article1,
    },
};
