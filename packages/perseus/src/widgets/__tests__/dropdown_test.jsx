// @flow
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// TODO(FEI-3857): Include in jest setup so that we don't need to import it everywhere
import "@testing-library/jest-dom/extend-expect";

import {testDependencies} from "../../../../../testing/test-dependencies.js";
import {waitForAnimationFrame} from "../../../../../testing/wait.js";
import * as Dependencies from "../../dependencies.js";
import {question1} from "../__testdata__/dropdown_testdata.js";

import {renderQuestion} from "./renderQuestion.jsx";

describe("Dropdown widget", () => {
    beforeEach(() => {
        jest.useRealTimers();

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot when opened", async () => {
        // Arrange
        const {container} = renderQuestion(question1);

        // Act
        const dropdown = screen.getByRole("button");
        userEvent.click(dropdown);
        await waitForAnimationFrame();

        // Assert
        expect(container).toMatchSnapshot("dropdown open");
    });

    it("should show placeholder text", () => {
        // Arrange
        renderQuestion(question1);

        // Act
        const dropdown = screen.getByRole("button");

        // Assert
        // get asserts if it doesn't find a single matching element
        expect(dropdown).toHaveTextContent("greater/less than or equal to");
    });

    it("should be answerable correctly", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const dropdown = screen.getByRole("button");
        userEvent.click(dropdown);
        await waitForAnimationFrame();
        userEvent.click(screen.getByText("less than or equal to"));

        // Assert
        expect(dropdown).toHaveTextContent("less than or equal to");
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("should be answerable incorrectly", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const dropdown = screen.getByRole("button");
        userEvent.click(dropdown);
        // SingleSelect waits a frame to do some measurement before opening
        await waitForAnimationFrame();
        userEvent.click(screen.getByText("greater than or equal to"));

        // Assert
        expect(dropdown).toHaveTextContent("greater than or equal to");
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });

    it("should be invalid on first render", () => {
        // Arrange and Act
        const {renderer} = renderQuestion(question1);

        // Assert
        expect(renderer).toHaveInvalidInput();
    });

    it("should be return true when focus() called", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const focused = renderer.focus();

        // Assert
        expect(focused).toBeTrue();
        // TODO(LP-10797): we don't check that the document.activeElement is
        // actually set because the dropdown widget focuses a <div> (it's root
        // element), which is not actually focusable because it doesn't have a
        // tabindex.
    });
});
