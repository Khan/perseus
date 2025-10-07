import {Dependencies} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    getDefaultAnswerArea,
    type PerseusItem,
} from "@khanacademy/perseus-core";
import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import {mockImageLoading} from "../../../../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import ItemDiff from "../item-diff";

describe("ItemDiff", () => {
    let unmockImageLoading: () => void;

    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        unmockImageLoading = mockImageLoading();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        unmockImageLoading();
    });

    it("renders an image widget in the diff view", () => {
        // Arrange

        const beforeItem: PerseusItem = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
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
            }),
            answerArea: getDefaultAnswerArea(),
            hints: [],
        });

        const afterItem: PerseusItem = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
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
            }),
            answerArea: getDefaultAnswerArea(),
            hints: [],
        });

        // Act
        render(
            <ItemDiff
                before={beforeItem as any}
                after={afterItem as any}
                dependencies={testDependenciesV2}
            />,
        );

        // Wait for the next tick to allow setTimeout to execute
        act(() => {
            jest.runAllTimers();
        });

        // Assert
        expect(screen.getByText('"Updated Image"')).toBeInTheDocument();
        expect(
            screen.getByText('"This is the updated image"'),
        ).toBeInTheDocument();

        expect(
            screen.getByText('"https://example.com/updated-image.jpg"'),
        ).toBeInTheDocument();
    });
});
