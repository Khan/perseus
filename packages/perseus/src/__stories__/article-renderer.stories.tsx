import {action} from "@storybook/addon-actions";

import {ArticleRendererWithDebugUI} from "../../../../testing/article-renderer-with-debug-ui";
import {
    singleSectionArticle,
    multiSectionArticle,
    passageArticle,
    articleSectionWithExpression,
    multiSectionArticleWithExpression,
} from "../__testdata__/article-renderer.testdata";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Renderers/Article Renderer",
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

export const PassageArticle: Story = {
    args: {
        json: passageArticle,
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
