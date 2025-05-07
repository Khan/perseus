import {act, render} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {typicalCase} from "../../util/graphie-utils.testdata";
import SvgImage from "../svg-image";

describe("SvgImage", () => {
    const images: Array<Record<any, any>> = [];
    let originalImage;

    beforeEach(() => {
        jest.clearAllMocks();
        originalImage = window.Image;
        // Mock HTML Image so we can trigger onLoad callbacks and see full
        // image rendering.
        // @ts-expect-error - TS2322 - Type 'Mock<Record<string, any>, [], any>' is not assignable to type 'new (width?: number | undefined, height?: number | undefined) => HTMLImageElement'.
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        window.Image = jest.fn(() => {
            const img: Record<string, any> = {};
            // TODO(LEMS-3083): Remove eslint suppression
            // eslint-disable-next-line functional/immutable-data
            images.push(img);
            return img;
        });

        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        global.fetch = jest.fn((url) => {
            return Promise.resolve({
                text: () => Promise.resolve(typicalCase.jsonpString),
                ok: true,
            });
        }) as jest.Mock;
    });

    afterEach(() => {
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        window.Image = originalImage;
    });

    // Tells the image loader 1, or all, of our images loaded
    const markImagesAsLoaded = (imageIndex?: number) => {
        if (imageIndex != null) {
            const img = images[imageIndex];
            if (img?.onload) {
                act(() => img.onload());
            }
        } else {
            images.forEach((i) => {
                if (i?.onload) {
                    act(() => i.onload());
                }
            });
        }
    };
    it("should render a spinner initially", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Act
        const {container} = render(
            <SvgImage src="http://localhost/sample.png" alt="png image" />,
        );

        // Assert
        expect(
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            container.querySelector("div[class*=spinnerContainer]"),
        ).toBeVisible();
        expect(container).toMatchSnapshot();
    });

    it("should load and render a png", () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Act
        const {container} = render(
            <SvgImage src="http://localhost/sample.png" alt="png image" />,
        );

        markImagesAsLoaded(); // Tell the ImageLoader that our images are loaded

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should load and render a normal graphie svg", async () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Act
        const {container} = render(
            <SvgImage src={typicalCase.url} alt="svg image" />,
        );

        markImagesAsLoaded(); // Tell the ImageLoader that our images are loaded

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should load and render a localized graphie svg", async () => {
        // Arrange
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            kaLocale: "es",
        });

        // Act
        const {container} = render(
            <SvgImage src={typicalCase.url} alt="svg image" />,
        );

        markImagesAsLoaded(); // Tell the ImageLoader that our images are loaded

        // Assert
        expect(container).toMatchSnapshot();
    });
});
