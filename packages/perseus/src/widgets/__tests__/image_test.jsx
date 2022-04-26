// @flow

import * as Dependencies from "../../../perseus-all-package/dependencies.js";
import {isAccessible} from "../../../perseus-all-package/widgets.js";
import {renderQuestion} from "../../../perseus-all-package/widgets/__tests__/renderQuestion.jsx";
import {testDependencies} from "../../../perseus-testing/test-dependencies.js";
import {question} from "../__testdata__/image_testdata.js";

import type {
    ImageWidget,
    PerseusImageWidgetOptions,
} from "../../../perseus-all-package/perseus-types.js";
import type {APIOptions} from "../../../perseus-all-package/types.js";

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
