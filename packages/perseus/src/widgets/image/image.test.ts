import {describe, beforeEach, it} from "@jest/globals";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {isAccessible} from "../../widgets";
import {renderQuestion} from "../__tests__/renderQuestion";

import {question} from "./image.testdata";

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
});
