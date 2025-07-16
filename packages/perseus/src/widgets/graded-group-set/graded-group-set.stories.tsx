import {ArticleRendererWithDebugUI} from "../../../../../testing/article-renderer-with-debug-ui";

import {
    article1,
    groupSetRadioRationaleQuestion,
} from "./graded-group-set.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group Set",
    component: ArticleRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ArticleRendererWithDebugUI>;

export const Article1: Story = {
    args: {
        json: article1,
    },
    parameters: {
        docs: {
            disable: false, // This specific story will be shown in autodocs as the default story
        },
    },
};

export const GroupSetRadioQuestion: Story = {
    args: {
        json: groupSetRadioRationaleQuestion,
    },
};
