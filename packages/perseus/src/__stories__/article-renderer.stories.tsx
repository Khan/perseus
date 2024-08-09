// @ts-expect-error it can't find type declaration
// eslint-disable-next-line monorepo/no-internal-import
import {KeypadContext} from "@khanacademy/keypad-context";
import {action} from "@storybook/addon-actions";
import React from "react";

import {storybookDependenciesV2} from "../../../../testing/test-dependencies";
import {
    singleSectionArticle,
    multiSectionArticle,
    passageArticle,
    articleSectionWithExpression,
    multiSectionArticleWithExpression,
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

export const ExpressionArticle = ({useNewStyles}): any => (
    <TestKeypadContextWrapper>
        <KeypadContext.Consumer>
            {({keypadElement, setRenderer}) => (
                <ArticleRenderer
                    ref={(node) => {
                        setRenderer(node);
                    }}
                    json={articleSectionWithExpression}
                    dependencies={storybookDependenciesV2}
                    useNewStyles={useNewStyles}
                    apiOptions={{
                        isMobile: true,
                        customKeypad: true,
                        onFocusChange: action("onFocusChange"),
                    }}
                    keypadElement={keypadElement}
                />
            )}
        </KeypadContext.Consumer>
    </TestKeypadContextWrapper>
);

export const MultiSectionedExpressionArticle = ({useNewStyles}): any => (
    <TestKeypadContextWrapper>
        <KeypadContext.Consumer>
            {({keypadElement, setRenderer}) => (
                <ArticleRenderer
                    ref={(node) => {
                        setRenderer(node);
                    }}
                    json={multiSectionArticleWithExpression}
                    dependencies={storybookDependenciesV2}
                    useNewStyles={useNewStyles}
                    apiOptions={{
                        isMobile: true,
                        customKeypad: true,
                    }}
                    keypadElement={keypadElement}
                />
            )}
        </KeypadContext.Consumer>
    </TestKeypadContextWrapper>
);
