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
    it.each([true, false])(
        "sets data-mobile attribute isMobile is set",
        (isMobile: boolean) => {
            render(
                <PreviewWithIframe
                    url="/preview"
                    isMobile={isMobile}
                    seamless={false}
                />,
            );

            const iframe = screen.getByTitle(/perseus-preview/);
            expect(iframe.dataset.mobile).toBe(isMobile.toString());
        },
    );

    it.each([true, false])(
        "sets data-lint-gutter attribute when seamless is provided",
        (seamless: boolean) => {
            render(
                <PreviewWithIframe
                    url="/preview"
                    isMobile={false}
                    seamless={seamless}
                />,
            );

            const iframe = screen.getByTitle(/perseus-preview/);
            expect(iframe.dataset.lintGutter).toBe(seamless.toString());
        },
    );

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
