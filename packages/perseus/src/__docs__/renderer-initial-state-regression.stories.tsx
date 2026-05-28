import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../.storybook/modes";
import {
    regularTextContent,
    listsContent,
} from "../__testdata__/renderer.testdata";
import ArticleRenderer from "../article-renderer";
import {storybookDependenciesV2} from "../testing/test-dependencies";
import QuestionRendererForStories from "../widgets/__testutils__/question-renderer-for-stories";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj;

const meta: Meta<PerseusRenderer> = {
    title: "Renderers/Visual Regression Tests",
    tags: ["!manifest"],
    parameters: {
        docs: {
            description: {
                component: "Examples of graphics in dark mode.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

const RenderContent = (
    content: string,
    asArticle: boolean,
): (() => React.JSX.Element) => {
    /*
        These regression tests are focused on how the renderer handles non-widget content.
        Therefore, the "widgets" and "images" properties in the JSON object are empty.
        Tests for how the renderer handles content within a widget should be tested in
            the regression tests for those widgets.
     */
    return function Render() {
        if (asArticle) {
            const json = {
                content,
                widgets: {},
                images: {},
            };
            return (
                <ArticleRenderer
                    json={json}
                    dependencies={storybookDependenciesV2}
                />
            );
        } else {
            return (
                <div style={{padding: "24px"}}>
                    <QuestionRendererForStories
                        question={generateTestPerseusRenderer({
                            content: content,
                        })}
                    />
                </div>
            );
        }
    };
};

export const ArticleRegularText: Story = {
    render: RenderContent(regularTextContent, true),
};

export const ArticleLists: Story = {
    render: RenderContent(listsContent, true),
};

export const ExerciseRegularText: Story = {
    render: RenderContent(regularTextContent, false),
};

export const ExerciseLists: Story = {
    render: RenderContent(listsContent, false),
};
