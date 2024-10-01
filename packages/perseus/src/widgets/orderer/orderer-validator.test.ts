import {act} from "@testing-library/react";

import {renderQuestion} from "../__testutils__/renderQuestion";

import {question2} from "./orderer.testdata";

import type {APIOptions} from "@khanacademy/perseus";

describe("ordererValiator", () => {
    it("can be answered correctly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question2, apiOptions);
        const [orderer] = renderer.findWidgets("orderer 1");

        // Act
        act(() => orderer.setListValues(["1", "2", "3"]));

        // assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
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

        // assert
        expect(renderer).toHaveBeenAnsweredIncorrectly();
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

        // assert
        expect(renderer).toHaveInvalidInput();
    });
});
