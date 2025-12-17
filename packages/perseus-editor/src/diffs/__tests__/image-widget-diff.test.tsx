import {
    generateImageOptions,
    generateImageWidget,
} from "@khanacademy/perseus-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {mockImageLoading} from "../../../../../testing/image-loader-utils";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import ImageWidgetDiff from "../image-widget-diff";

import type {ImageWidget} from "@khanacademy/perseus-core";

describe("ImageWidgetDiff", () => {
    let unmockImageLoading: () => void;

    const beforeItem: ImageWidget = generateImageWidget({
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
    });

    const afterItem: ImageWidget = generateImageWidget({
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
    });

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

    it("renders an image widget in the diff view", () => {
        // Act
        const {container} = render(
            <ImageWidgetDiff before={beforeItem} after={afterItem} />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders with missing 'before' props", () => {
        // Act
        const {container} = render(
            <ImageWidgetDiff before={undefined} after={afterItem} />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders with missing 'after' props", () => {
        // Act
        const {container} = render(
            <ImageWidgetDiff before={beforeItem} after={undefined} />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders with both 'before' and 'after' undefined", () => {
        // Act
        const {container} = render(
            <ImageWidgetDiff before={undefined} after={undefined} />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("renders with unchanged image", () => {
        // Arrange
        const sameImage: ImageWidget = generateImageWidget({
            options: generateImageOptions({
                title: "Same Image",
                caption: "This image is the same",
                alt: "Same image description",
                backgroundImage: {
                    url: "https://example.com/same-image.jpg",
                    width: 400,
                    height: 300,
                },
            }),
        });

        // Act
        const {container} = render(
            <ImageWidgetDiff before={sameImage} after={sameImage} />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });
});
