import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {Categorizer} from "./categorizer";
import {question1} from "./categorizer.testdata";

import type {APIOptions} from "../../types";

describe("categorizer widget", () => {
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

    it("should snapshot on mobile", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("can get user input from props", () => {
        // Arrange
        const widgetProps: any = {
            randomizeItems: false,
            categories: ["true", "false"],
            items: ["0", "1", "object", "array", "null", "undefined"],
            values: [1, 0, 0, 0, 1, 1],
        };

        // Act
        const userInput = Categorizer.getUserInputFromProps(widgetProps);

        // Assert
        expect(userInput).toEqual({values: [1, 0, 0, 0, 1, 1]});
    });
});
