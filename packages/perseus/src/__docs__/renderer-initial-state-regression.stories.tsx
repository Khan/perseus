import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../.storybook/modes";
import {
    regularTextContent,
    listsContent,
    mathContent,
    tableContent,
    codeContent,
    blockquoteContent,
} from "../__testdata__/renderer.testdata";
import ArticleRenderer from "../article-renderer";
import {storybookDependenciesV2} from "../testing/test-dependencies";
import {useStorybookApiOptions} from "../testing/use-storybook-api-options";
import QuestionRendererForStories from "../widgets/__testutils__/question-renderer-for-stories";

import type {APIOptions} from "../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj;

const meta: Meta<PerseusRenderer> = {
    title: "Renderers/Visual Regression Tests",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component: "Examples of non-widget content.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

const RenderArticleContent = (
    content: string,
    baseApiOptions: APIOptions = {},
): (() => React.JSX.Element) => {
    return function Render() {
        const apiOptions = useStorybookApiOptions(baseApiOptions);

        /*
            These regression tests are focused on how the renderer handles non-widget content.
            Therefore, the "widgets" and "images" properties in the JSON object are empty.
            Tests for how the renderer handles content within a widget should be tested in
                the regression tests for those widgets.
         */
        const json = {
            content,
            widgets: {},
            images: {},
        };
        return (
            <ArticleRenderer
                json={json}
                dependencies={storybookDependenciesV2}
                apiOptions={apiOptions}
            />
        );
    };
};

const RenderExerciseContent = (content: string): (() => React.JSX.Element) => {
    return function Render() {
        return (
            <div style={{padding: "24px"}}>
                <QuestionRendererForStories
                    question={generateTestPerseusRenderer({content})}
                />
            </div>
        );
    };
};

function mobileArticleStory(content: string): Story {
    return {
        render: RenderArticleContent(content, {isMobile: true}),
        globals: {viewport: "mobile"},
    };
}

function desktopArticleStory(content: string): Story {
    return {
        render: RenderArticleContent(content),
    };
}

export const ArticleRegularText: Story =
    desktopArticleStory(regularTextContent);

export const ArticleRegularTextMobile: Story =
    mobileArticleStory(regularTextContent);

export const ArticleLists: Story = desktopArticleStory(listsContent);

export const ArticleListsMobile: Story = mobileArticleStory(listsContent);

export const ArticleMath: Story = desktopArticleStory(mathContent);

export const ArticleMathMobile: Story = mobileArticleStory(mathContent);

export const ArticleTable: Story = desktopArticleStory(tableContent);

export const ArticleTableMobile: Story = mobileArticleStory(tableContent);

export const ArticleCode: Story = desktopArticleStory(codeContent);

export const ArticleCodeMobile: Story = mobileArticleStory(codeContent);

export const ArticleBlockquote: Story = desktopArticleStory(blockquoteContent);

export const ArticleBlockquoteMobile: Story =
    mobileArticleStory(blockquoteContent);

export const ExerciseRegularText: Story = {
    render: RenderExerciseContent(regularTextContent),
};

export const ExerciseLists: Story = {
    render: RenderExerciseContent(listsContent),
};
