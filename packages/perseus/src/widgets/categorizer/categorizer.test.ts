import {screen, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {Categorizer} from "./categorizer";
import {question1, randomizedQuestion} from "./categorizer.testdata";

import type {CategorizerPromptJSON} from "./prompt-utils";
import type {APIOptions} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

describe("categorizer widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

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

    it("is incorrect when blank", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        const [_, score] = renderer.guessAndScore();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "message": "Make sure you select something for every row.",
              "type": "invalid",
            }
        `);
    });

    it("can be answered incorrectly", async () => {
        // arrange
        const {renderer} = renderQuestion(question1);

        const firstItem = screen.getAllByRole("row")[0];
        await userEvent.click(firstItem);

        // act
        const [_, score] = renderer.guessAndScore();

        // assert
        expect(score).toMatchInlineSnapshot(`
            {
              "message": "Make sure you select something for every row.",
              "type": "invalid",
            }
        `);
    });

    it("can be answered correctly", async () => {
        // arrange
        const {renderer} = renderQuestion(question1);

        // act
        await userEvent.click(
            screen.getAllByRole("button", {name: "No relationship"})[0],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Positive linear relationship",
            })[0],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Negative linear relationship",
            })[1],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Nonlinear relationship",
            })[1],
        );

        renderer.guessAndScore();

        // assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
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

    it("should get prompt json which matches the state of the UI for a randomized question", async () => {
        // arrange
        const {renderer} = renderQuestion(randomizedQuestion);
        const widget = renderer.getWidgetInstance("categorizer 1");

        // act
        await userEvent.click(screen.getAllByRole("button")[0]);
        await userEvent.click(screen.getAllByRole("button")[5]);

        const json = widget?.getPromptJSON?.() as CategorizerPromptJSON;
        const rowGroups = screen.getAllByRole("rowgroup");

        const categories = within(rowGroups[0]).getAllByRole("columnheader");
        const items = within(rowGroups[1]).getAllByRole("row");

        // assert
        json.options.categories.forEach((category, i) => {
            expect(categories[i].textContent).toEqual(category);
        });

        const itemRe = /(Graph) \$(\d+)\$/;
        json.options.items.forEach((item, i) => {
            const itemPlainText = item.replace(itemRe, "$1 $2");
            expect(items[i].textContent).toEqual(itemPlainText);
        });

        expect(json.userInput.itemToCategoryMapping).toEqual([0, 1]);
    });
});
