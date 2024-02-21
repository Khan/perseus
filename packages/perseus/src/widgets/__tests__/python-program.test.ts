import "@testing-library/jest-dom";

import {question1} from "../__testdata__/python-program.testdata";

import {renderQuestion} from "./renderQuestion";

describe("python-program widget", () => {
    it("should snapshot", () => {
        // Arrange
        const apiOptions = {
            isMobile: false,
        } as const;

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions = {
            isMobile: true,
        } as const;

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    // This widget doesn't have any direct behavior, it just renders an iframe
});
