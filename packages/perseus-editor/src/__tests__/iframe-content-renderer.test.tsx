/* eslint-disable testing-library/no-node-access */
import {render, waitFor} from "@testing-library/react";
import * as React from "react";

import IframeContentRenderer from "../iframe-content-renderer";
import {sendMessageToIframeParent} from "../iframe-utils";

expect.extend({
    toHaveSearchParam(
        url: string,
        name: string,
        expectedValue: string,
    ): jest.CustomMatcherResult {
        const u = new URL(url);

        if (!u.searchParams.has(name)) {
            return {
                pass: false,
                message: () =>
                    `Url does not have expected '${name}' search parameter (${url})`,
            };
        }

        const actual = u.searchParams.get(name);

        return {
            pass: actual === expectedValue,
            message: () =>
                `Url does not have expected '${expectedValue}' search parameter for parameter '${name} (${url})`,
        };
    },
});

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toHaveSearchParam(name: string, value: string): R;
        }
    }
}

function getIframeID(iframe: HTMLIFrameElement | null): string {
    const url = iframe?.src;
    if (!url) {
        return "";
    }

    const frameID = new URL(url).searchParams.get("frame-id");
    expect(frameID).not.toBeNull();
    return frameID!;
}

describe("IframeContentRenderer", () => {
    beforeEach(() => {
        jest.useRealTimers();
    });

    it("should render", () => {
        // Arrange

        // Act
        const {container} = render(
            <IframeContentRenderer
                seamless={true}
                emulateMobile={false}
                url="http://localhost/perseus/frame"
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should set iframe.src when only path provided", () => {
        // Arrange

        // Act
        render(
            <IframeContentRenderer
                seamless={true}
                emulateMobile={false}
                url="/perseus/frame"
            />,
        );

        // Assert
        const iframe = document.querySelector("iframe");
        expect(iframe).not.toBeNull();
        expect(iframe!.src).toBe(
            document.baseURI +
                "perseus/frame?emulate-mobile=false&frame-id=1&lint-gutter=true",
        );
    });

    it("should assign each iframe in page a unique frame ID", () => {
        // Arrange

        // Act
        render(
            <div>
                <IframeContentRenderer
                    seamless={true}
                    emulateMobile={false}
                    url="http://localhost/perseus/frame"
                />
                <IframeContentRenderer
                    seamless={true}
                    emulateMobile={false}
                    url="http://localhost/perseus/frame"
                />
                <IframeContentRenderer
                    seamless={true}
                    emulateMobile={false}
                    url="http://localhost/perseus/frame"
                />
            </div>,
        );

        // Assert
        const iframes = document.querySelectorAll("iframe");

        // We use a Set() to ensure the frame ids are unique (if we set the
        // same value twice, our set will be smaller than the count of iframes
        // we have).
        const idSet = new Set<string | null>();
        [...iframes].map(getIframeID).forEach((id) => {
            idSet.add(id);
        });

        expect(idSet.size).toBe(3);
    });

    it("should set the emulate-mobile key", () => {
        // Arrange

        // Act
        render(
            <IframeContentRenderer
                seamless={true}
                url="http://localhost/perseus/frame"
                emulateMobile={false}
            />,
        );

        // Assert
        const frame = document.querySelector("iframe");
        expect(frame?.src).toHaveSearchParam("emulate-mobile", "false");
    });

    it("should enable lint-gutter when seamless == true", () => {
        // Arrange

        // Act
        render(
            <IframeContentRenderer
                seamless={true}
                emulateMobile={false}
                url="http://localhost/perseus/frame"
            />,
        );

        // Assert
        const frame = document.querySelector("iframe");
        expect(frame!.src).toHaveSearchParam("lint-gutter", "true");
    });

    it("should not set lint-gutter when seamless == false", () => {
        // Arrange

        // Act
        render(
            <IframeContentRenderer
                seamless={false}
                emulateMobile={false}
                url="http://localhost/perseus/frame"
            />,
        );

        // Assert
        const frame = document.querySelector("iframe");
        expect(new URL(frame!.src).searchParams.get("lint-gutter")).toBeNull();
    });

    it("should send requested data", async () => {
        // Arrange
        const iframeRef = React.createRef<IframeContentRenderer>();
        const {container} = render(
            <IframeContentRenderer
                ref={iframeRef}
                seamless={false}
                emulateMobile={true}
                url="http://localhost/perseus/frame"
            />,
        );

        const messageHandler = jest.fn();
        // eslint-disable-next-line testing-library/no-container
        const iframe = container.querySelector("iframe");
        expect(iframe).not.toBeNull();
        expect(iframe?.contentWindow).not.toBeNull();
        iframe!.contentWindow!.addEventListener("message", messageHandler);

        // Act
        iframeRef.current?.sendNewData({
            type: "hint",
            data: {
                hint: {content: "Hello world", images: {}, widgets: {}},
                bold: false,
                pos: 0,
                linterContext: {
                    contentType: "hint",
                    highlightLint: true,
                    paths: [],
                    stack: [],
                },
            },
        });

        // Assert
        await waitFor(() => expect(messageHandler).toHaveBeenCalled());
    });

    it("should handle update-iframe-height message", async () => {
        // Arrange
        const iframeRef = React.createRef<IframeContentRenderer>();
        const {container} = render(
            <IframeContentRenderer
                ref={iframeRef}
                seamless={true}
                emulateMobile={true}
                url="http://localhost/perseus/frame"
            />,
        );

        const iframeID = getIframeID(document.querySelector("iframe"));

        // Act
        sendMessageToIframeParent({
            type: "perseus:update-iframe-height",
            frameID: iframeID,
            height: 929,
        });

        // Assert
        await waitFor(() =>
            expect(container.firstElementChild).toHaveStyle({height: "929px"}),
        );
    });

    it("should handle request-data message", async () => {
        // Arrange
        const iframeRef = React.createRef<IframeContentRenderer>();
        render(
            <IframeContentRenderer
                ref={iframeRef}
                seamless={false}
                emulateMobile={true}
                url="http://localhost/perseus/frame"
            />,
        );

        const iframeID = getIframeID(document.querySelector("iframe"));
        let message: any = null;
        const messageHandler = jest.fn().mockImplementation((e) => {
            message = e.data;
        });
        window.parent!.addEventListener("message", messageHandler);

        // Act
        sendMessageToIframeParent({
            type: "perseus:request-data",
            frameID: iframeID,
        });

        // Assert
        await waitFor(() => expect(messageHandler).toHaveBeenCalled());
        expect(message).toEqual({
            type: "perseus:request-data",
            frameID: iframeID,
        });
    });
});
