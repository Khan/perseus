import React from "react";

import {passageArticle} from "../__testdata__/article-renderer.testdata";
import ArticleRenderer from "../article-renderer";

export default {
    title: "Perseus/Renderers/Article Renderer",
    argTypes: {
        useNewStyles: {
            control: "boolean",
        },
    },
};

export const PassageArticle = ({useNewStyles}): any => (
    <ArticleRenderer json={passageArticle} useNewStyles={useNewStyles} />
);
