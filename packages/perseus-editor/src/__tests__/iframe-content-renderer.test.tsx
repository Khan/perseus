import {render} from "@testing-library/react";
import * as React from "react";

import IframeContentRenderer from "../iframe-content-renderer";

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
describe("IframeContentRenderer", () => {
    it("should render", () => {
        // Arrange

        // Act
        const {container} = render(
            <IframeContentRenderer
                seamless={true}
                url="http://localhost/perseus/frame"
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should assign each iframe in page a unique frame ID", () => {
        // Arrange

        // Act
        render(
            <div>
                <IframeContentRenderer
                    seamless={true}
                    url="http://localhost/perseus/frame"
                />
                <IframeContentRenderer
                    seamless={true}
                    url="http://localhost/perseus/frame"
                />
                <IframeContentRenderer
                    seamless={true}
                    url="http://localhost/perseus/frame"
                />
            </div>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const iframes = document.querySelectorAll("iframe");

        // We use a Set() to ensure the frame ids are unique (if we set the
        // same value twice, our set will be smaller than the count of iframes
        // we have).
        const idSet = new Set<string | null>();
        [...iframes]
            .map((frame) => new URL(frame.src).searchParams.get("frame-id"))
            .forEach((id) => {
                expect(id).not.toBeNull();
                idSet.add(id);
            });

        expect(idSet.size).toBe(3);
    });

    it("should set the dataset key and value if provided", () => {
        // Arrange

        // Act
        render(
            <IframeContentRenderer
                seamless={true}
                url="http://localhost/perseus/frame"
                datasetKey="key-123"
                datasetValue={"abc-111"}
            />,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const frame = document.querySelector("iframe");
        expect(frame?.src).toHaveSearchParam("key-123", "abc-111");
    });

    it("should enable lint-gutter when seamless == true", () => {
        // Arrange

        // Act
        render(
            <IframeContentRenderer
                seamless={true}
                url="http://localhost/perseus/frame"
            />,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const frame = document.querySelector("iframe");
        expect(frame!.src).toHaveSearchParam("lint-gutter", "true");
    });

    it("should not set lint-gutter when seamless == false", () => {
        // Arrange

        // Act
        render(
            <IframeContentRenderer
                seamless={false}
                url="http://localhost/perseus/frame"
            />,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const frame = document.querySelector("iframe");
        expect(new URL(frame!.src).searchParams.get("lint-gutter")).toBeNull();
    });
});
