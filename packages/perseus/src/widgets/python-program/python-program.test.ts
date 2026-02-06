import {testDependenciesV2} from "../../testing/test-dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./python-program.testdata";

import type {PerseusDependenciesV2} from "../../types";

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

    it("python program widget should call the generateUrl dependency to set the iframe src", () => {
        // Arrange
        const dependencies: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            generateUrl: (args) => {
                return "https://www.khanacademy.org/my-test-url";
            },
        };
        // Act
        renderQuestion(question1, {}, {}, {}, dependencies);

        // Assert
        expect(document.getElementsByTagName("iframe")[0].src).toEqual(
            "https://www.khanacademy.org/my-test-url",
        );
    });

    // This widget doesn't have any direct behavior, it just renders an iframe
});
