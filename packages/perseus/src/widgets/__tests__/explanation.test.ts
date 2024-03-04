import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "../__testdata__/explanation.testdata";
import ExplanationWidgetExports from "../explanation";

import {renderQuestion} from "./renderQuestion";

describe("Explanation", function () {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        // We mock out `console.error` because the explanation widget adds
        // `javascript:void(0);` to the `onClick` handler which triggers an
        // error in our test env.
        jest.spyOn(console, "error").mockImplementation(() => {});

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

    it("should snapshot when expanded", async () => {
        // Arrange
        const {container} = renderQuestion(question1);

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        expect(container).toMatchSnapshot("expanded");
    });

    it("should snapshot for mobile", async () => {
        // Arrange and Act
        const {container} = renderQuestion(question1, {
            isMobile: true,
        });

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot for mobile when expanded", async () => {
        // Arrange
        const {container} = renderQuestion(question1, {
            isMobile: true,
        });

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        expect(container).toMatchSnapshot("expanded");
    });

    it("should snapshot for article", async () => {
        // Arrange and Act
        const {container} = renderQuestion(question1, {
            isArticle: true,
        });

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot for article when expanded", async () => {
        // Arrange
        const {container} = renderQuestion(question1, {
            isArticle: true,
        });

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        expect(container).toMatchSnapshot("expanded");
    });

    it("should snapshot for article+mobile", async () => {
        // Arrange and Act
        const {container} = renderQuestion(question1, {
            isMobile: true,
            isArticle: true,
        });

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot for article+mobile when expanded", async () => {
        // Arrange
        const {container} = renderQuestion(question1, {
            isMobile: true,
            isArticle: true,
        });

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        expect(container).toMatchSnapshot("expanded");
    });

    it("can be expanded and collapsed with a mouse click", async function () {
        // Arrange
        renderQuestion(question1);

        // Act - expand with a click
        const expandButton = screen.getByRole("button", {
            name: "[Explanation]",
        });
        await userEvent.click(expandButton);

        // Assert
        // get asserts if it doesn't find a single matching element
        expect(screen.getByText("This is an explanation")).toBeVisible();

        // Act - collapse with a click
        const collapseButton = screen.getByRole("button", {
            name: "[Hide explanation!]",
        });
        await userEvent.click(collapseButton); // collapse

        // Assert
        expect(screen.queryByText("This is an explanation")).toBeNull();
    });

    it("can be expanded and collapsed with the keyboard - Enter key", async function () {
        // Arrange
        renderQuestion(question1);

        // Act - expand with a click
        const expandButton = screen.getByRole("button", {
            name: "[Explanation]",
        });
        expandButton.focus();
        await userEvent.keyboard("{Enter}");

        // Assert
        // get asserts if it doesn't find a single matching element
        expect(screen.getByText("This is an explanation")).toBeVisible();

        // Act - collapse with a click
        const collapseButton = screen.getByRole("button", {
            name: "[Hide explanation!]",
        });
        collapseButton.focus();
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(screen.queryByText("This is an explanation")).toBeNull();
    });

    it("can be expanded and collapsed with the keyboard - Space bar", async function () {
        // Arrange
        renderQuestion(question1);

        // Act - expand with a click
        const expandButton = screen.getByRole("button", {
            name: "[Explanation]",
        });
        expandButton.focus();
        await userEvent.keyboard(" ");

        // Assert
        // get asserts if it doesn't find a single matching element
        expect(screen.getByText("This is an explanation")).toBeVisible();

        // Act - collapse with a click
        const collapseButton = screen.getByRole("button", {
            name: "[Hide explanation!]",
        });
        collapseButton.focus();
        await userEvent.keyboard(" ");

        // Assert
        expect(screen.queryByText("This is an explanation")).toBeNull();
    });

    it("can be collapsed", async function () {
        // Arrange
        renderQuestion(question1);

        // Act
        const expandLink = screen.getByRole("button", {expanded: false});
        await userEvent.click(expandLink); // expand and then
        const collapseLink = screen.getByRole("button", {
            expanded: true,
        });
        await userEvent.click(collapseLink); // collapse
    });

    it("should return an empty object for getUserInput()", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toMatchInlineSnapshot(`
            [
              {},
            ]
        `);
    });

    it("should return a zero score for simpleValidate()", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const score = renderer.scoreWidgets();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "explanation 1": {
                "earned": 0,
                "message": null,
                "total": 0,
                "type": "points",
              },
            }
        `);
    });

    describe("static validate", () => {
        it("should always return 0 points", async () => {
            const result = ExplanationWidgetExports.widget.validate(
                {},
                question1.widgets["explanation 1"].options,
            );

            expect(result).toMatchInlineSnapshot(`
                {
                  "earned": 0,
                  "message": null,
                  "total": 0,
                  "type": "points",
                }
            `);
        });
    });
});
