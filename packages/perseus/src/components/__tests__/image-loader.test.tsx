import {render} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {testDependenciesV2} from "../../testing/test-dependencies";
import ImageLoader from "../image-loader";

describe("ImageLoader", () => {
    const originalImage = window.Image;
    let preloaded: Array<{src?: string}>;

    beforeEach(() => {
        preloaded = [];
        // eslint-disable-next-line no-restricted-syntax
        window.Image = jest.fn(() => {
            const img = {};
            preloaded.push(img);
            return img;
        }) as any;
    });

    afterEach(() => {
        window.Image = originalImage;
    });

    it("preloads the image from the URL generateUrl returns", () => {
        // Arrange
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue({
            ...testDependenciesV2,
            generateUrl: ({url}) => `https://images.example/${url}`,
        });

        // Act
        render(
            <ImageLoader
                src="diagram.svg"
                imgProps={{alt: "A diagram"}}
                onUpdate={() => {}}
                preloader={null}
            />,
        );

        // Assert
        expect(preloaded.map((img) => img.src)).toEqual([
            "https://images.example/diagram.svg",
        ]);
    });
});
