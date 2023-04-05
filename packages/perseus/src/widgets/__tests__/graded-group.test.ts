import {describe, beforeEach, it} from "@jest/globals";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// TODO(FEI-3857): Include in jest setup so that we don't need to import it everywhere
import "@testing-library/jest-dom/extend-expect";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "../__testdata__/graded-group.testdata";

import {renderQuestion} from "./renderQuestion";

import type {APIOptions} from "../../types";

const checkAnswer = () => {
    // NOTE(jeremy): The graded-group widget does not participate in
    // Renderer grading. So we can't call `renderer.score()` and see that
    // the widget is answered correctly. The only route to check the answer
    // is to use the "Check" button that is embedded _inside_ the widget.
    userEvent.click(screen.getByRole("button", {name: "Check"}));
};

describe("graded-group", () => {
    beforeEach(() => {
        // Suppress message from Link component: "Warning: A future version of
        // React will block javascript: URLs as a security precaution. Use
        // event handlers instead if you can. If you need to generate unsafe
        // HTML try using dangerouslySetInnerHTML instead. React was passed
        // "javascript:void(0)""
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it.each([true, false])("should snapshot", (isMobile: boolean) => {
        // Arrange and Act
        const {container} = renderQuestion(question1, {
            isMobile,
        });

        // Assert
        expect(container).toMatchSnapshot(
            `initial render (mobile: ${isMobile.toString()})`,
        );
    });

    describe("on desktop", () => {
        it("should be able to be answered correctly", () => {
            // Arrange
            renderQuestion(question1);

            userEvent.click(screen.getAllByRole("button", {name: "True"})[0]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[1]);
            userEvent.click(screen.getAllByRole("button", {name: "True"})[2]);
            userEvent.click(screen.getAllByRole("button", {name: "True"})[3]);

            // Act
            checkAnswer();

            // Assert
            expect(screen.getByRole("alert", {name: "Correct"})).toBeVisible();
            expect(
                screen.queryByRole("alert", {name: "Incorrect"}),
            ).not.toBeInTheDocument();
        });

        it("should be able to be answered incorrectly", () => {
            // Arrange
            renderQuestion(question1);

            userEvent.click(screen.getAllByRole("button", {name: "False"})[0]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[1]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[2]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[3]);

            // Act
            checkAnswer();

            // Assert
            expect(
                screen.queryByRole("alert", {name: "Correct"}),
            ).not.toBeInTheDocument();
            expect(
                screen.getByRole("alert", {name: "Incorrect"}),
            ).toBeVisible();
        });

        it("should display an error if not fully answered", () => {
            // Arrange
            renderQuestion(question1);

            userEvent.click(screen.getAllByRole("button", {name: "False"})[1]);

            // Act
            checkAnswer();

            // Assert
            expect(
                screen.getByText(
                    "We couldn't grade your answer. Make sure you select something for every row.",
                ),
            ).toBeVisible();
        });

        it("should be able to reveal the hint", () => {
            // Arrange
            renderQuestion(question1);

            // Act
            userEvent.click(screen.getByRole("button", {name: "[Hint]"}));
            jest.runOnlyPendingTimers();

            // Assert
            expect(
                screen.getByText(/Some bacteria synthesize their own fuel/),
            ).toBeVisible();
        });

        it("should be able to hide the hint", () => {
            // Arrange
            renderQuestion(question1);
            userEvent.click(screen.getByRole("button", {name: "[Hint]"}));
            jest.runOnlyPendingTimers();

            // Act
            userEvent.click(screen.getByRole("button", {name: "[Hide hint]"}));

            // Assert
            expect(
                screen.queryByText(/Some bacteria synthesize their own fuel/),
            ).not.toBeInTheDocument();
        });
    });

    // The Graded Group on mobile has some different functionality from
    // desktop, so we have a completely different set of tests.
    // Hint titling is also not exactly the same ("Hint" vs "[Hint]")
    describe("on mobile", () => {
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        it("should be able to be answered correctly", () => {
            // Arrange
            renderQuestion(question1, apiOptions);

            userEvent.click(screen.getAllByRole("button", {name: "True"})[0]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[1]);
            userEvent.click(screen.getAllByRole("button", {name: "True"})[2]);
            userEvent.click(screen.getAllByRole("button", {name: "True"})[3]);
            jest.runOnlyPendingTimers();

            // Act
            checkAnswer();

            // Assert
            expect(screen.getByRole("alert", {name: "Correct!"})).toBeVisible();
            // On mobile, you can't interact with the widget at all once you
            // answer correctly.
            expect(
                screen.queryByRole("button", {name: "Check"}),
            ).not.toBeInTheDocument();
        });

        it("should be able to be answered incorrectly", () => {
            // Arrange
            renderQuestion(question1, apiOptions);

            userEvent.click(screen.getAllByRole("button", {name: "False"})[0]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[1]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[2]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[3]);
            jest.runOnlyPendingTimers();

            // Act
            checkAnswer();

            // Assert
            expect(
                screen.getByRole("button", {name: "Try again"}),
            ).toBeVisible();
            expect(screen.getByText("Keep trying")).toBeVisible();
        });

        it("should let the user retry when checked if not fully answered", () => {
            // Arrange
            renderQuestion(question1, apiOptions);

            userEvent.click(screen.getAllByRole("button", {name: "False"})[0]);
            userEvent.click(screen.getAllByRole("button", {name: "False"})[1]);
            jest.runOnlyPendingTimers();

            checkAnswer();

            // Act
            userEvent.click(screen.getAllByRole("button", {name: "False"})[2]);
            jest.runOnlyPendingTimers();

            // Assert
            expect(screen.getByRole("button", {name: "Check"})).toBeVisible();
        });

        it("should be able to reveal the hint", () => {
            // Arrange
            renderQuestion(question1, apiOptions);

            // Act
            userEvent.click(screen.getByRole("button", {name: "Hint"}));

            // Assert
            expect(
                screen.getByText(/Some bacteria synthesize their own fuel/),
            ).toBeVisible();
        });

        it("should be able to hide the hint", () => {
            // Arrange
            renderQuestion(question1, apiOptions);
            userEvent.click(screen.getByRole("button", {name: "Hint"}));

            // Act
            userEvent.click(screen.getByRole("button", {name: "Hide hint"}));

            // Assert
            expect(
                screen.queryByText(/Some bacteria synthesize their own fuel./),
            ).not.toBeInTheDocument();
        });
    });
});
