import {ApiOptions} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import PreviewWithIframe from "./preview-with-iframe";
import {clone} from "./testing/object-utils";

import type {PreviewContent} from "./preview/message-types";

const mockSendData = jest.fn();
let mockHeight: number | null = null;

jest.mock("./preview/use-preview-controller", () => ({
    usePreviewController: () => ({
        sendData: mockSendData,
        height: mockHeight,
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
        mockSendData.mockClear();
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
});
