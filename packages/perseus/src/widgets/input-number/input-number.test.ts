/**
 * Disclaimer: Definitely not thorough enough
 */
import {describe, beforeEach, it} from "@jest/globals";
import {act} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import InputNumber from "./input-number";
import {question3 as question} from "./input-number.testdata";

describe("getOneCorrectAnswerFromRubric", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should return undefined if rubric.value is null/undefined", () => {
        // Arrange
        const rubric: Record<string, any> = {};

        // Act
        const result = InputNumber.widget.getOneCorrectAnswerFromRubric(rubric);

        // Assert
        expect(result).toBeUndefined();
    });

    it("should return rubric.value if inexact is false", () => {
        // Arrange
        const rubric = {
            value: 0,
            maxError: 0.1,
            inexact: false,
        } as const;

        // Act
        const result = InputNumber.widget.getOneCorrectAnswerFromRubric(rubric);

        // Assert
        expect(result).toEqual("0");
    });

    it("should return rubric.value with an error band if inexact is true", () => {
        // Arrange
        const rubric = {
            value: 0,
            maxError: 0.1,
            inexact: true,
        } as const;

        // Act
        const result = InputNumber.widget.getOneCorrectAnswerFromRubric(rubric);

        // Assert
        expect(result).toEqual("0 ± 0.1");
    });
});

describe("rendering", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("supports mobile rendering", () => {
        const {container} = renderQuestion(question, {
            // Setting this triggers mobile rendering
            // it would be nice if this was more clear in the code
            customKeypad: true,
        });

        expect(container).toMatchSnapshot("mobile render");
    });
});

describe("focus state", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("supports focusing", async () => {
        //  Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const gotFocus = await act(() => renderer.focus());

        // Assert
        expect(gotFocus).toBe(true);
    });

    it("supports blurring", async () => {
        //  Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const gotFocus = await act(() => renderer.focus());
        act(() => renderer.blur());

        // Assert
        expect(gotFocus).toBe(true);
    });
});
