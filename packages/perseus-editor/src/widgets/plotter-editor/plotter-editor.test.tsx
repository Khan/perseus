import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import PlotterEditor from "./plotter-editor";

describe("PlotterEditor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders without crashing when picUrl is undefined", () => {
        render(
            <PlotterEditor
                onChange={() => undefined}
                apiOptions={ApiOptions.defaults}
                static={false}
                type="pic"
                picUrl={undefined}
            />,
        );

        expect(screen.getByText(/Picture:/)).toBeInTheDocument();
    });

    it("clears a stale image when picUrl changes to undefined", () => {
        // Arrange — mock Image so we can trigger onload synchronously
        const mockImage: Partial<HTMLImageElement> & {
            onload: (() => void) | null;
        } = {
            onload: null,
            width: 100,
            height: 200,
        };
        // A `function`, not an arrow: the editor calls `new Image()`, and
        // some test runners construct a mock's implementation with `new`.
        jest.spyOn(global, "Image").mockImplementation(function () {
            // eslint-disable-next-line no-restricted-syntax
            return mockImage as HTMLImageElement;
        });

        const {rerender} = render(
            <PlotterEditor
                onChange={() => undefined}
                apiOptions={ApiOptions.defaults}
                static={false}
                type="pic"
                picUrl="https://example.com/image.png"
            />,
        );

        // Act — fire onload to simulate the image loading
        act(() => {
            mockImage.onload?.();
        });

        // The non-square image warning should now be visible
        expect(
            screen.getByText(/You are using a picture which is not square/),
        ).toBeInTheDocument();

        // Act — clear the URL
        rerender(
            <PlotterEditor
                onChange={() => undefined}
                apiOptions={ApiOptions.defaults}
                static={false}
                type="pic"
                picUrl={undefined}
            />,
        );

        // Assert — stale warning should be gone
        expect(
            screen.queryByText(/You are using a picture which is not square/),
        ).not.toBeInTheDocument();
    });
});
