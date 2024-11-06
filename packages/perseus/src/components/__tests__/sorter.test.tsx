import {act} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {wait} from "../../../../../testing/wait";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import {question1} from "../__testdata__/sorter.testdata";

import type {APIOptions} from "../../types";

describe("sorter widget", () => {
    beforeEach(() => {
        /*
        Sortable misbehaves and sets state after the component has been
        unmounted. This is existing behavior and its safer to leave the existing
        implementation and swallow the warning in tests.
        */
        jest.spyOn(console, "warn").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
        });
    });

    it("should snapshot", async () => {
        // Arrange
        jest.useRealTimers();

        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);
        await wait();

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", async () => {
        // Arrange
        jest.useRealTimers();

        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);
        await wait();

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("can be answered correctly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);
        const sorter = renderer.findWidgets("sorter 1")[0];

        // Put the options in the correct order

        ["$0.005$ kilograms", "$15$ grams", "$55$ grams"].forEach((option) => {
            act(() => sorter.moveOptionToIndex(option, 3));
        });
        // Act
        renderer.guessAndScore();

        // assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });
    it("can be answered incorrectly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);
        const sorter = renderer.findWidgets("sorter 1")[0];

        // Put the options in the reverse order
        ["$0.005$ kilograms", "$15$ grams", "$55$ grams"].forEach(
            (option, index) => {
                act(() => sorter.moveOptionToIndex(option, 0));
            },
        );

        // Act
        renderer.guessAndScore();

        // assert
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });
});
