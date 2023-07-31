import React from "react";

import {storybookDependenciesV2} from "../../../../testing/test-dependencies";
import {
    singleSectionArticle,
    multiSectionArticle,
    passageArticle,
} from "../__testdata__/article-renderer.testdata";
import ArticleRenderer from "../article-renderer";

export default {
    title: "Perseus/Renderers/Article Renderer",
    argTypes: {
        useNewStyles: {
            control: "boolean",
        },
    },
};

export const ASingleSectionArticle = (args: {
    useNewStyles;
}): React.ReactElement => {
    return (
        <ArticleRenderer
            json={singleSectionArticle}
            dependencies={storybookDependenciesV2}
            useNewStyles={args.useNewStyles}
        />
    );
};

export const BMultiSectionArticle = (args: {
    useNewStyles;
}): React.ReactElement => {
    return (
        <ArticleRenderer
            json={multiSectionArticle}
            dependencies={storybookDependenciesV2}
            useNewStyles={args.useNewStyles}
        />
    );
};

export const PassageArticle = ({useNewStyles}): any => (
    <ArticleRenderer
        json={passageArticle}
        dependencies={storybookDependenciesV2}
        useNewStyles={useNewStyles}
    />
);
