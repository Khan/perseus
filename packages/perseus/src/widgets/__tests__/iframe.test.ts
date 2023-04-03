import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "../__testdata__/iframe.testdata";

import {renderQuestion} from "./renderQuestion";

import type {APIOptions} from "../../types";

describe("iframe widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    //There isn't testable behavior for this widget
});
