import {KeypadContext} from "@khanacademy/math-input";
import React from "react";

import {
    passageArticle,
    exerciseArticle,
} from "../__testdata__/article-renderer.testdata";
import ArticleRenderer from "../article-renderer";
import TestKeypadContextWrapper from "../widgets/__stories__/test-keypad-context-wrapper";

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

export const ExpressionArticle = ({useNewStyles}): any => (
    <TestKeypadContextWrapper>
        <KeypadContext.Consumer>
            {({keypadElement, setRenderer, scrollableElement}) => (
                <ArticleRenderer
                    ref={(node) => {
                        setRenderer(node);
                    }}
                    json={exerciseArticle}
                    useNewStyles={useNewStyles}
                    apiOptions={{isMobile: true, customKeypad: true}}
                    keypadElement={keypadElement}
                />
            )}
        </KeypadContext.Consumer>
    </TestKeypadContextWrapper>
);
