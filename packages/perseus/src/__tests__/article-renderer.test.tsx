import {
    StatefulKeypadContextProvider,
    KeypadContext,
} from "@khanacademy/math-input";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom"; // Imports custom matchers

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../testing/test-dependencies";
import {multiSectionArticleWithExpression} from "../__testdata__/article-renderer.testdata";
import ArticleRenderer from "../article-renderer";
import * as Dependencies from "../dependencies";
import {ApiOptions} from "../perseus-api";
import {registerWidget} from "../widgets";
import ExpressionExport from "../widgets/expression";

import MockWidgetExport from "./mock-widget";

import type {APIOptions} from "../types";

// This looks alot like `widgets/__tests__/renderQuestion.jsx', except we use
// the ArticleRenderer instead of Renderer
export const RenderArticle = (
    apiOptions: APIOptions = Object.freeze({}),
): {
    container: HTMLElement;
    renderer: ArticleRenderer;
} => {
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
                            json={multiSectionArticleWithExpression}
                            dependencies={testDependenciesV2}
                            apiOptions={{...apiOptions}}
                            keypadElement={keypadElement}
                        />
                    )}
                </KeypadContext.Consumer>
                {/* The ItemRenderer _requires_ two divs: a work area and hints
                area. Without both of these, it fails to render anything! */}
                <div id="workarea" />
                <div id="hintsarea" />
            </StatefulKeypadContextProvider>
        </RenderStateRoot>,
    );
    if (!renderer) {
        throw new Error(`Failed to render!`);
    }
    return {container, renderer};
};

describe("article renderer", () => {
    beforeAll(() => {
        registerWidget("mock-widget", MockWidgetExport);
        registerWidget("expression-widget", ExpressionExport);
    });

    beforeEach(() => {
        // Mock ResizeObserver used by the mobile keypad
        window.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    afterEach(() => {
        // The Renderer uses a timer to wait for widgets to complete rendering.
        // If we don't spin the timers here, then the timer fires in the test
        // _after_ and breaks it because we do setState() in the callback,
        // and by that point the component has been unmounted.
        jest.runOnlyPendingTimers();
    });

    it("should render the content", () => {
        // Arrange and Act
        RenderArticle({
            ...ApiOptions.defaults,
            isMobile: false,
            customKeypad: false,
        });

        // Assert
        expect(screen.queryAllByRole("textbox")).toHaveLength(3);
    });
});
