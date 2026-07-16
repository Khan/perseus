import {ApiOptions} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import PreviewWithIframe from "./preview-with-iframe";
import {clone} from "./testing/object-utils";

import type {PreviewContent} from "./preview/message-types";

const mockSendData = jest.fn();
const mockSetA11yEnabled = jest.fn();
const mockHighlightIssues = jest.fn();
const mockClearHighlights = jest.fn();
let mockHeight: number | null = null;
let mockA11yReport: {
    violations: Array<{id: string}>;
    incompletes: Array<{id: string}>;
} | null = null;

jest.mock("./preview/use-preview-controller", () => ({
    usePreviewController: () => ({
        sendData: mockSendData,
        height: mockHeight,
        setA11yEnabled: mockSetA11yEnabled,
        highlightIssues: mockHighlightIssues,
        clearHighlights: mockClearHighlights,
        a11yReport: mockA11yReport,
    }),
}));

function buildArticleContent(): PreviewContent {
    return {
        type: "article-section",
        data: {
            apiOptions: ApiOptions.defaults,
            article: {content: "Hello", widgets: {}, images: {}},
            linterContext: {
                contentType: "article",
                highlightLint: false,
            },
        },
    };
}

describe("PreviewWithIframe", () => {
    beforeEach(() => {
        mockHeight = null;
        mockA11yReport = null;
        mockSendData.mockClear();
        mockSetA11yEnabled.mockClear();
        mockHighlightIssues.mockClear();
        mockClearHighlights.mockClear();
    });

    it("does not call sendData when content is null", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
                content={null}
            />,
        );

        expect(mockSendData).not.toHaveBeenCalled();
    });

    it("renders an iframe with the given URL", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
                content={buildArticleContent()}
            />,
        );

        const iframe = screen.getByTitle(/perseus-preview/);
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute("src", "/preview");
    });

    it.each([true, false])(
        "sets data-mobile attribute when isMobile is: %s",
        (isMobile: boolean) => {
            render(
                <PreviewWithIframe
                    url="/preview"
                    isMobile={isMobile}
                    seamless={false}
                    content={buildArticleContent()}
                />,
            );

            const iframe = screen.getByTitle(/perseus-preview/);
            expect(iframe.dataset.mobile).toBe(isMobile.toString());
        },
    );

    it.each([true, false])(
        "sets data-lint-gutter attribute when seamless is: %s",
        (seamless: boolean) => {
            render(
                <PreviewWithIframe
                    url="/preview"
                    isMobile={false}
                    seamless={seamless}
                    content={buildArticleContent()}
                />,
            );

            const iframe = screen.getByTitle(/perseus-preview/);
            expect(iframe.dataset.lintGutter).toBe(seamless.toString());
        },
    );

    it("sends data again when the content prop changes", () => {
        const data: PreviewContent = {
            type: "question",
            data: {
                question: {content: "Q", widgets: {}, images: {}},
                apiOptions: {},
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                },
            },
        };

        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
                content={data}
            />,
        );

        expect(mockSendData).toHaveBeenCalledWith(data);
    });

    it("sends content using usePreviewController's sendData", () => {
        const content: Extract<PreviewContent, {type: "question"}> = {
            type: "question",
            data: {
                question: {content: "Q", widgets: {}, images: {}},
                apiOptions: {},
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                },
            },
        };

        const {rerender} = render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
                content={content}
            />,
        );

        const modifiedContent = clone(content);
        modifiedContent.data.question.content = "Abc";

        // Act
        rerender(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
                content={modifiedContent}
            />,
        );

        expect(mockSendData).toHaveBeenCalledWith(modifiedContent);
    });

    it("sets container height to '100%' when seamless is false", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
                content={buildArticleContent()}
            />,
        );

        const container = screen.getByTitle(/perseus-preview/);
        expect(container.style.height).toBe("100%");
    });

    it("sets container height from usePreviewController when seamless is true", () => {
        mockHeight = 500;

        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={true}
                content={buildArticleContent()}
            />,
        );

        const container = screen.getByTitle(/perseus-preview/);
        expect(container.style.height).toBe("500px");
    });

    describe("a11yEnabled prop", () => {
        it("calls setA11yEnabled with the prop's value", () => {
            // Arrange, Act
            render(
                <PreviewWithIframe
                    url="/preview"
                    isMobile={false}
                    seamless={false}
                    content={buildArticleContent()}
                    a11yEnabled={true}
                />,
            );

            // Assert
            expect(mockSetA11yEnabled).toHaveBeenCalledWith(true);
        });
    });

    describe("highlightPreviewIds prop", () => {
        it("calls highlightIssues with the given previewIds", () => {
            // Arrange, Act
            render(
                <PreviewWithIframe
                    url="/preview"
                    isMobile={false}
                    seamless={false}
                    content={buildArticleContent()}
                    highlightPreviewIds={["violation-1"]}
                />,
            );

            // Assert
            expect(mockHighlightIssues).toHaveBeenCalledWith(["violation-1"]);
            expect(mockClearHighlights).not.toHaveBeenCalled();
        });

        it("calls clearHighlights when previewIds is empty", () => {
            // Arrange, Act
            render(
                <PreviewWithIframe
                    url="/preview"
                    isMobile={false}
                    seamless={false}
                    content={buildArticleContent()}
                    highlightPreviewIds={[]}
                />,
            );

            // Assert
            expect(mockClearHighlights).toHaveBeenCalled();
            expect(mockHighlightIssues).not.toHaveBeenCalled();
        });
    });

    describe("onA11yReport prop", () => {
        it("calls onA11yReport with the latest report from usePreviewController", () => {
            // Arrange
            const report = {
                violations: [{id: "button-name"}],
                incompletes: [],
            };
            mockA11yReport = report;
            const onA11yReport = jest.fn();

            // Act
            render(
                <PreviewWithIframe
                    url="/preview"
                    isMobile={false}
                    seamless={false}
                    content={buildArticleContent()}
                    onA11yReport={onA11yReport}
                />,
            );

            // Assert
            expect(onA11yReport).toHaveBeenCalledWith(report);
        });
    });
});
