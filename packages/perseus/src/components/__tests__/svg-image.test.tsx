import {act, render} from "@testing-library/react";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
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
        window.Image = jest.fn(() => {
            const img: Record<string, any> = {};
            images.push(img);
            return img;
        });

        global.fetch = jest.fn((url) => {
            return Promise.resolve({
                text: () => Promise.resolve(typicalCase.jsonpString),
                ok: true,
            });
        }) as jest.Mock;

        jest.spyOn(Dependencies, "useDependencies").mockReturnValue({
            ...testDependenciesV2,
        });
    });

    afterEach(() => {
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

    it("should call the generateUrl dependency to set the img src", () => {
        // Arrange
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue({
            ...testDependenciesV2,
            generateUrl: (args) => {
                return "https://www.khanacademy.org/my-test-img.png";
            },
        });

        // Act
        render(<SvgImage src="http://localhost/sample.png" alt="png image" />);

        markImagesAsLoaded();

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.getElementsByTagName("img")[0].src).toEqual(
            "https://www.khanacademy.org/my-test-img.png",
        );
    });
});
