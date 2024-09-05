import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./dropdown.testdata";

import type {UserEvent} from "@testing-library/user-event";

describe("Dropdown widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", async () => {
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
        await userEvent.click(dropdown);

        // Assert
        expect(screen.getByText("less than or equal to")).toBeInTheDocument();
        expect(container).toMatchSnapshot("dropdown open");
    });

    it("should show placeholder text", async () => {
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
        await userEvent.click(dropdown);
        await userEvent.click(screen.getByText("less than or equal to"));

        // Assert
        expect(dropdown).toHaveTextContent("less than or equal to");
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("should be answerable incorrectly", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const dropdown = screen.getByRole("button");
        await userEvent.click(dropdown);
        await userEvent.click(screen.getByText("greater than or equal to"));

        // Assert
        expect(dropdown).toHaveTextContent("greater than or equal to");
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });

    it("should be invalid on first render", async () => {
        // Arrange and Act
        const {renderer} = renderQuestion(question1);

        // Assert
        expect(renderer).toHaveInvalidInput();
    });

    it("should be return true when focus() called", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const focused = renderer.focus();

        // Assert
        expect(focused).toBe(true);
        // TODO(LP-10797): we don't check that the document.activeElement is
        // actually set because the dropdown widget focuses a <div> (it's root
        // element), which is not actually focusable because it doesn't have a
        // tabindex.
    });
});
