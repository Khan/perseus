import {render, screen} from "@testing-library/react";
import * as React from "react";

import PreviewWithIframe from "./preview-with-iframe";

import type {PreviewContent} from "./preview/message-types";
import type {PreviewWithIframeRef} from "./preview-with-iframe";

// Mock usePreviewController so we can control its behavior
const mockSendData = jest.fn();
let mockHeight: number | null = null;

jest.mock("./preview/use-preview-controller", () => ({
    usePreviewController: () => ({
        sendData: mockSendData,
        height: mockHeight,
    }),
}));

describe("PreviewWithIframe", () => {
    beforeEach(() => {
        mockSendData.mockClear();
        mockHeight = null;
    });

    it("renders an iframe with the given URL", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
            />,
        );

        const iframe = screen.getByTitle(/perseus-preview/);
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute("src", "/preview");
    });

    it("sets data-mobile to 'true' when isMobile is true", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={true}
                seamless={false}
            />,
        );

        const iframe = screen.getByTitle(/perseus-preview/);
        expect(iframe.dataset.mobile).toBe("true");
    });

    it("sets data-mobile to 'false' when isMobile is false", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
            />,
        );

        const iframe = screen.getByTitle(/perseus-preview/);
        expect(iframe.dataset.mobile).toBe("false");
    });

    it("sets data-lint-gutter to 'true' when seamless is true", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={true}
            />,
        );

        const iframe = screen.getByTitle(/perseus-preview/);
        expect(iframe.dataset.lintGutter).toBe("true");
    });

    it("sets data-lint-gutter to 'false' when seamless is false", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
            />,
        );

        const iframe = screen.getByTitle(/perseus-preview/);
        expect(iframe.dataset.lintGutter).toBe("false");
    });

    it("delegates sendNewData to usePreviewController's sendData via ref", () => {
        const ref = React.createRef<PreviewWithIframeRef>();

        render(
            <PreviewWithIframe
                ref={ref}
                url="/preview"
                isMobile={false}
                seamless={false}
            />,
        );

        const data: PreviewContent = {
            type: "question",
            data: {
                item: {
                    question: {content: "Q", widgets: {}, images: {}},
                    answerArea: {calculator: false} as any,
                    hints: [],
                },
                apiOptions: {},
                initialHintsVisible: 0,
                device: "desktop",
                linterContext: {
                    contentType: "exercise",
                    highlightLint: false,
                    paths: [],
                    stack: [],
                },
            },
        };

        ref.current?.sendNewData(data);

        expect(mockSendData).toHaveBeenCalledWith(data);
    });

    it("sets container height to '100%' when seamless is false", () => {
        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={false}
            />,
        );

        const div = screen.getByTestId("preview-with-iframe-container");
        expect(div.style.height).toBe("100%");
    });

    it("sets container height from usePreviewController when seamless is true", () => {
        mockHeight = 500;

        render(
            <PreviewWithIframe
                url="/preview"
                isMobile={false}
                seamless={true}
            />,
        );

        const div = screen.getByTestId("preview-with-iframe-container");
        expect(div.style.height).toBe("500px");
    });
});
