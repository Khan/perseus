import {describe, beforeEach, it} from "@jest/globals";
import {act, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {isAccessible} from "../../widgets";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question, questionWithZoom} from "./image.testdata";

import type {APIOptions} from "../../types";

describe.each([true, false])("image widget - isMobile %b", (isMobile) => {
    const apiOptions: APIOptions = {isMobile};
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

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange

        // Act
        const {container} = renderQuestion(question, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should be unanswerable", () => {
        // Arrange

        // Act
        const {renderer} = renderQuestion(question, apiOptions);
        const score = scorePerseusItemTesting(
            question,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("should be accessible if background has 'alt' prop", () => {
        // Arrange, Act, and Assert
        expect(isAccessible(question.widgets["image 1"])).toBe(true);
    });

    it("should be inaccessible if background is missing 'alt' prop", () => {
        // Arrange
        const imageWidget = question.widgets["image 1"];
        const options = imageWidget.options;
        const inaccessibleWidgetInfo = {
            ...imageWidget,
            options: {
                ...options,
                alt: "",
            },
        };

        // Act and Assert
        expect(isAccessible(inaccessibleWidgetInfo)).toBe(false);
    });

    it("should zoom on click for applicable images", async () => {
        // Arrange
        const altText = questionWithZoom.widgets["image 1"].options.alt!;
        renderQuestion(questionWithZoom, apiOptions);

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

        // Act
        // Act
        markImagesAsLoaded(); // Tell the ImageLoader that our images are loaded
        await waitFor(async () => {
            await screen.getByAltText(altText).focus();
            screen.getByAltText(altText).click();
        });

        // Assert
        // The image should have the zoomed class
        await waitFor(() => {
            expect(screen.getByTestId("zoomed-image")).toBeVisible();
        });
    });

    it("should zoom on keyboard interaction for applicable images", async () => {
        // Arrange
        const altText = questionWithZoom.widgets["image 1"].options.alt!;
        renderQuestion(questionWithZoom, apiOptions);

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

        // Act
        // Act
        markImagesAsLoaded(); // Tell the ImageLoader that our images are loaded
        await waitFor(async () => {
            await screen.getByAltText(altText).focus();
            await userEvent.keyboard("{enter}");
        });

        // Assert
        // The image should have the zoomed class
        await waitFor(() => {
            expect(screen.getByTestId("zoomed-image")).toBeVisible();
        });
    });
});
