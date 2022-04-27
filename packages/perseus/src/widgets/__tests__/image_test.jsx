// @flow

import {testDependencies} from "../../../../../testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";
import {isAccessible} from "../../widgets.js";
import {question} from "../__testdata__/image_testdata.js";

import {renderQuestion} from "./renderQuestion.jsx";

import type {
    ImageWidget,
    PerseusImageWidgetOptions,
} from "../../perseus-types.js";
import type {APIOptions} from "../../types.js";

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
        expect(isAccessible(question.widgets["image 1"])).toBeTrue();
    });

    it("should be inaccessible if background is missing 'alt' prop", () => {
        // Arrange
        const imageWidget = ((question.widgets["image 1"]: any): ImageWidget);
        const options = ((imageWidget.options: any): PerseusImageWidgetOptions);
        const inaccessibleWidgetInfo = ({
            ...imageWidget,
            options: {
                ...options,
                alt: "",
            },
        }: ImageWidget);

        // Act and Assert
        expect(isAccessible(inaccessibleWidgetInfo)).toBeFalse();
    });
});
