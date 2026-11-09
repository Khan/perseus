import {
    StatefulKeypadContextProvider,
    KeypadContext,
} from "@khanacademy/keypad-context";
import {MobileKeypad} from "@khanacademy/math-input";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {articleSectionWithExpression} from "../__testdata__/article-renderer.testdata";
import ArticleRenderer from "../article-renderer";
import {setDependencies} from "../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../testing/test-dependencies";

import type {APIOptions} from "../types";
import type {PerseusArticle} from "@khanacademy/perseus-core";

function KeypadWithContext() {
    return (
        <KeypadContext.Consumer>
            {({setKeypadElement}) => {
                return (
                    <MobileKeypad
                        onElementMounted={setKeypadElement}
                        onDismiss={() => {}}
                        onAnalyticsEvent={async () => {}}
                    />
                );
            }}
        </KeypadContext.Consumer>
    );
}

/**
 * Renders a `PerseusArticle` with the ArticleRenderer and a mobile keypad.
 */
export const renderArticle = (
    json: PerseusArticle = articleSectionWithExpression,
    apiOptions: APIOptions = Object.freeze({}),
    seed = 0,
): {
    container: HTMLElement;
    renderer: ArticleRenderer;
} => {
    setDependencies(testDependencies);

    let renderer: ArticleRenderer | null = null;
    const {container} = render(
        <RenderStateRoot>
            <StatefulKeypadContextProvider>
                <KeypadContext.Consumer>
                    {({keypadElement, setRenderer}) => (
                        <ArticleRenderer
                            ref={(node) => {
                                renderer = node;
                                setRenderer(node);
                            }}
                            json={json}
                            seed={seed}
                            dependencies={testDependenciesV2}
                            apiOptions={{...apiOptions}}
                            keypadElement={keypadElement}
                        />
                    )}
                </KeypadContext.Consumer>
                <KeypadWithContext />
            </StatefulKeypadContextProvider>
        </RenderStateRoot>,
    );
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    return {container, renderer};
};
