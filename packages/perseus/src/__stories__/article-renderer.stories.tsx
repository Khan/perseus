import * as React from "react";

import {storybookDependenciesV2} from "../../../../testing/test-dependencies";
import {
    singleSectionArticle,
    multiSectionArticle,
} from "../__testdata__/article-renderer.testdata";
import ArticleRenderer from "../article-renderer";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Renderers/Article Renderer",
} as Story;

export const ASingleSectionArticle = (args: StoryArgs): React.ReactElement => {
    return (
        <ArticleRenderer
            json={singleSectionArticle}
            dependencies={storybookDependenciesV2}
        />
    );
};

export const BMultiSectionArticle = (args: StoryArgs): React.ReactElement => {
    return (
        <ArticleRenderer
            json={multiSectionArticle}
            dependencies={storybookDependenciesV2}
        />
    );
};
