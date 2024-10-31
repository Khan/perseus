import {describe, beforeEach, it} from "@jest/globals";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {isAccessible} from "../../widgets";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question} from "./image.testdata";

import type {ImagePromptJSON} from "./prompt-utils";
import type {APIOptions} from "../../types";

describe.each([true, false])("image widget - isMobile %b", (isMobile) => {
    const apiOptions: APIOptions = {isMobile};

    beforeEach(() => {
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

        // Assert
        expect(renderer).toHaveBeenAnsweredIncorrectly();
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

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question, apiOptions);
        const widget = renderer.getWidgetInstance("image 1");
        const imageOptions = question.widgets["image 1"].options;

        // Act
        const json = widget?.getPromptJSON?.() as ImagePromptJSON;

        // Assert
        expect(json).toEqual({
            type: "image",
            options: {
                altText: imageOptions.alt,
                title: imageOptions.title,
                caption: imageOptions.caption,
                imageUrl: imageOptions.backgroundImage.url,
            },
        });
    });
});
