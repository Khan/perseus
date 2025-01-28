import {act} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question2} from "./orderer.testdata";

import type {APIOptions} from "../../types";

describe("orderer widget", () => {
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
        const {container} = renderQuestion(question2, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question2, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("can be answered correctly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        const [orderer] = renderer.findWidgets("orderer 1");

        // Act
        act(() => orderer.setListValues(["1", "2", "3"]));
        const score = scorePerseusItemTesting(
            question2,
            renderer.getUserInputMap(),
        );

        // assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        const [orderer] = renderer.findWidgets("orderer 1");

        // Act
        act(() => orderer.setListValues(["3", "2", "1"]));
        const score = scorePerseusItemTesting(
            question2,
            renderer.getUserInputMap(),
        );

        // assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("is invalid when no options are selected", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        const [orderer] = renderer.findWidgets("orderer 1");

        // Act
        act(() => orderer.setListValues([]));
        const score = scorePerseusItemTesting(
            question2,
            renderer.getUserInputMap(),
        );

        // assert
        expect(score).toHaveInvalidInput();
    });
});
