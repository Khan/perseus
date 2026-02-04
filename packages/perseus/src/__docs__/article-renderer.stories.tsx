import {action} from "storybook/actions";

import {ArticleRendererWithDebugUI} from "../testing/article-renderer-with-debug-ui";
import {
    singleSectionArticle,
    multiSectionArticle,
    articleSectionWithExpression,
    multiSectionArticleWithExpression,
} from "../__testdata__/article-renderer.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Renderers/Article Renderer",
    component: ArticleRendererWithDebugUI,
    argTypes: {
        useNewStyles: {
            control: "boolean",
        },
    },
};
export default meta;

type Story = StoryObj<typeof ArticleRendererWithDebugUI>;

export const ASingleSectionArticle: Story = {
    args: {
        json: singleSectionArticle,
    },
};

export const BMultiSectionArticle: Story = {
    args: {
        json: multiSectionArticle,
    },
};

export const ExpressionArticle: Story = {
    args: {
        json: articleSectionWithExpression,
        apiOptions: {
            onFocusChange: action("onFocusChange"),
        },
    },
};

export const MultiSectionedExpressionArticle: Story = {
    args: {
        json: multiSectionArticleWithExpression,
    },
};
