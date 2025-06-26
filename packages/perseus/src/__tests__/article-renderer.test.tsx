import {
    StatefulKeypadContextProvider,
    KeypadContext,
} from "@khanacademy/keypad-context";
import {MobileKeypad} from "@khanacademy/math-input";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {screen, render, fireEvent, waitFor, act} from "@testing-library/react";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../testing/test-dependencies";
import {articleSectionWithExpression} from "../__testdata__/article-renderer.testdata";
import ArticleRenderer from "../article-renderer";
import * as Dependencies from "../dependencies";
import {ApiOptions} from "../perseus-api";

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
// This looks alot like `widgets/__tests__/renderQuestion.tsx', except we use
// the ArticleRenderer instead of Renderer
export const RenderArticle = (
    apiOptions: APIOptions = Object.freeze({}),
    json: PerseusArticle = articleSectionWithExpression,
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
                            json={json}
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

describe("article renderer", () => {
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
        act(() => jest.runOnlyPendingTimers());
    });

    it("should render the content for a section", () => {
        // Arrange and Act
        RenderArticle(
            {
                ...ApiOptions.defaults,
                isMobile: false,
                customKeypad: false,
            },
            articleSectionWithExpression,
        );

        // Assert
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render the content for a section as list", () => {
        // Arrange and Act
        RenderArticle(
            {
                ...ApiOptions.defaults,
                isMobile: false,
                customKeypad: false,
            },
            [articleSectionWithExpression],
        );

        // Assert
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render the content for a section in JIPT context", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            JIPT: {
                useJIPT: true,
            },
        });

        // Act
        RenderArticle(
            {
                ...ApiOptions.defaults,
                isMobile: false,
                customKeypad: false,
            },
            articleSectionWithExpression,
        );

        // Assert
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render the content for a section as list in JIPT context", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            JIPT: {
                useJIPT: true,
            },
        });

        // Act
        RenderArticle(
            {
                ...ApiOptions.defaults,
                isMobile: false,
                customKeypad: false,
            },
            [articleSectionWithExpression],
        );

        // Assert
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should call the onFocusChanged callback when an input is focused", async () => {
        // Arrange
        const answerableCallback = jest.fn();

        // Act
        RenderArticle({
            ...ApiOptions.defaults,
            onFocusChange: answerableCallback,
            isMobile: true,
            customKeypad: true,
        });

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // Assert
        await waitFor(() => {
            expect(screen.getByRole("button", {name: "4"})).toBeVisible();
        });

        // We also need to wait for the onFocusChange callback to be called
        await waitFor(() => {
            expect(answerableCallback).toHaveBeenCalled();
        });
    });
});
