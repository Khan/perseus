import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "../__testdata__/phet-sim.testdata";

import {renderQuestion} from "./renderQuestion";

import type {APIOptions} from "../../types";

describe("phet-sim widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({test: 100}),
            }),
        ) as jest.Mock;
        global.URL.canParse = jest.fn(() => true) as jest.Mock;
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
