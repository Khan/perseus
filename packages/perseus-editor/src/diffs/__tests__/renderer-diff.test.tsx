import {
    generateImageOptions,
    generateImageWidget,
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {mockImageLoading} from "../../../../../testing/image-loader-utils";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import RendererDiff from "../renderer-diff";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

describe("RendererDiff", () => {
    let unmockImageLoading: () => void;

    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    beforeEach(() => {
        unmockImageLoading = mockImageLoading();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        unmockImageLoading();
    });

    it("renders with missing 'before' props", () => {
        // Arrange
        const afterItem: PerseusRenderer = generateTestPerseusRenderer({
            content: "[[☃ radio 1]]",
            widgets: {
                "radio 1": generateRadioWidget(),
            },
        });

        // Act
        const {container} = render(
            <RendererDiff
                title="Missing before"
                before={undefined}
                after={afterItem}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders with missing 'after' props", () => {
        // Arrange
        const beforeItem: PerseusRenderer = generateTestPerseusRenderer({
            content: "[[☃ radio 1]]",
            widgets: {
                "radio 1": generateRadioWidget(),
            },
        });

        // Act
        const {container} = render(
            <RendererDiff
                title="Missing after"
                before={beforeItem}
                after={undefined}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders an image widget in the diff view", () => {
        // Arrange

        const beforeItem: PerseusRenderer = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        title: "Original Image",
                        caption: "This is the original image",
                        alt: "Original image description",
                        backgroundImage: {
                            url: "https://example.com/original-image.jpg",
                            width: 400,
                            height: 300,
                        },
                    }),
                }),
            },
        });

        const afterItem: PerseusRenderer = generateTestPerseusRenderer({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        title: "Updated Image",
                        caption: "This is the updated image",
                        alt: "Updated image description",
                        backgroundImage: {
                            url: "https://example.com/updated-image.jpg",
                            width: 500,
                            height: 400,
                        },
                    }),
                }),
            },
        });

        // Act
        const {container} = render(
            <RendererDiff
                before={beforeItem}
                after={afterItem}
                title="Image"
                showAlignmentOptions={false}
                showSeparator={false}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });
});
