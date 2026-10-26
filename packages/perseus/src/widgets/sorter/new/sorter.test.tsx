import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    SORTER_MAX_CARDS,
    SORTER_MAX_HORIZONTAL_CARDS,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {screen, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {getFeatureFlags} from "../../../testing/feature-flags-util";
import {scorePerseusItemTesting} from "../../../util/test-utils";
import {renderQuestion} from "../../__testutils__/render-question";

import type {APIOptions} from "../../../types";
import type {SorterLegend} from "../legend/legend-types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const apiOptions: APIOptions = {
    flags: getFeatureFlags({"dnd-widget-sorter": true}),
};

function generateSorterQuestion(
    correct: string[],
    layout: "horizontal" | "vertical" = "horizontal",
): PerseusRenderer {
    return generateTestPerseusRenderer({
        content: "[[☃ sorter 1]]",
        widgets: {
            "sorter 1": generateSorterWidget({
                options: generateSorterOptions({correct, layout}),
            }),
        },
    });
}

// The legend isn't in the schema yet, so it's added next to the generated
// options rather than through generateSorterOptions.
function generateSorterQuestionWithLegend(
    legend: SorterLegend,
    layout: "horizontal" | "vertical" = "horizontal",
): PerseusRenderer {
    const options = {
        ...generateSorterOptions({correct: ["Apple", "Banana"], layout}),
        legend,
    };
    return generateTestPerseusRenderer({
        content: "[[☃ sorter 1]]",
        widgets: {"sorter 1": generateSorterWidget({options})},
    });
}

function getChoiceBank(): HTMLElement {
    return screen.getByRole("list", {name: "Choices"});
}

function getBlankList(): HTMLElement {
    const [blankList] = screen.getAllByRole("list");
    return blankList;
}

async function moveTileToBlank(
    user: UserEvent,
    tile: string,
    blankNumber: number,
) {
    await user.click(screen.getByRole("button", {name: tile}));
    await user.click(
        screen.getByRole("menuitem", {name: `Move to Blank ${blankNumber}`}),
    );
}

async function moveFirstBankTileToBlank(
    user: UserEvent,
    tile: string,
    blankNumber: number,
) {
    const [bankTile] = within(getChoiceBank()).getAllByRole("button", {
        name: tile,
    });
    await user.click(bankTile);
    await user.click(
        screen.getByRole("menuitem", {name: `Move to Blank ${blankNumber}`}),
    );
}

async function clearBlank(user: UserEvent, tile: string, blankNumber: number) {
    await user.click(screen.getByRole("button", {name: tile}));
    await user.click(
        screen.getByRole("menuitem", {name: `Clear from Blank ${blankNumber}`}),
    );
}

describe("new sorter widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    describe("rendering", () => {
        it("renders every card in the choice bank", () => {
            // Arrange, Act
            renderQuestion(
                generateSorterQuestion(["Apple", "Banana", "Cherry"]),
                {
                    apiOptions,
                },
            );

            // Assert
            const bank = within(getChoiceBank());
            expect(bank.getByRole("button", {name: "Apple"})).toBeVisible();
            expect(bank.getByRole("button", {name: "Banana"})).toBeVisible();
            expect(bank.getByRole("button", {name: "Cherry"})).toBeVisible();
        });

        it("renders an empty blank for each card", () => {
            // Arrange, Act
            renderQuestion(
                generateSorterQuestion(["Apple", "Banana", "Cherry"]),
                {
                    apiOptions,
                },
            );

            // Assert
            const blanks = within(getBlankList()).getAllByRole("listitem");
            expect(blanks).toHaveLength(3);
            blanks.forEach((blank) =>
                expect(
                    within(blank).queryByRole("button"),
                ).not.toBeInTheDocument(),
            );
        });

        it("reports itself as rendered to analytics", () => {
            // Arrange
            const onAnalyticsEvent = jest.fn();

            // Act
            renderQuestion(generateSorterQuestion(["Apple", "Banana"]), {
                apiOptions,
                dependencies: {analytics: {onAnalyticsEvent}},
            });

            // Assert
            expect(onAnalyticsEvent).toHaveBeenCalledWith({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetSubType: "null",
                    widgetType: "sorter",
                    widgetId: "sorter 1",
                },
            });
        });

        it("restores placed cards from a changed user input", () => {
            // Arrange, Act
            renderQuestion(generateSorterQuestion(["Apple", "Banana"]), {
                apiOptions,
                initialUserInput: {
                    "sorter 1": {options: ["Banana", "Apple"], changed: true},
                },
            });

            // Assert
            const blanks = within(getBlankList()).getAllByRole("listitem");
            expect(
                within(blanks[0]).getByRole("button", {name: "Banana"}),
            ).toBeVisible();
            expect(
                within(blanks[1]).getByRole("button", {name: "Apple"}),
            ).toBeVisible();
        });
    });

    describe("layout", () => {
        it("lays out the blanks horizontally when the layout is horizontal", () => {
            // Arrange, Act
            renderQuestion(
                generateSorterQuestion(["Apple", "Banana"], "horizontal"),
                {apiOptions},
            );

            // Assert
            expect(getBlankList()).not.toHaveClass("vertical");
        });

        it("lays out the blanks vertically when the layout is vertical", () => {
            // Arrange, Act
            renderQuestion(
                generateSorterQuestion(["Apple", "Banana"], "vertical"),
                {apiOptions},
            );

            // Assert
            expect(getBlankList()).toHaveClass("vertical");
        });

        it("keeps a horizontal sorter horizontal at exactly the maximum number of cards", () => {
            // Arrange
            const correct = Array.from(
                {length: SORTER_MAX_HORIZONTAL_CARDS},
                (_, index) => `Card ${index}`,
            );

            // Act
            renderQuestion(generateSorterQuestion(correct, "horizontal"), {
                apiOptions,
            });

            // Assert
            expect(getBlankList()).not.toHaveClass("vertical");
        });

        it("lays out a horizontal sorter vertically when it has more cards than the maximum", () => {
            // Arrange
            const correct = Array.from(
                {length: SORTER_MAX_HORIZONTAL_CARDS + 1},
                (_, index) => `Card ${index}`,
            );

            // Act
            renderQuestion(generateSorterQuestion(correct, "horizontal"), {
                apiOptions,
            });

            // Assert
            expect(getBlankList()).toHaveClass("vertical");
        });

        it("renders a horizontal legend bar when the layout is horizontal", () => {
            // Arrange, Act
            renderQuestion(
                generateSorterQuestion(["Apple", "Banana"], "horizontal"),
                {apiOptions},
            );

            // Assert
            expect(screen.getByTestId("legend-bar")).toHaveClass("horizontal");
        });

        it("renders a vertical legend bar when the layout is vertical", () => {
            // Arrange, Act
            renderQuestion(
                generateSorterQuestion(["Apple", "Banana"], "vertical"),
                {apiOptions},
            );

            // Assert
            expect(screen.getByTestId("legend-bar")).toHaveClass("vertical");
        });

        it("renders a vertical legend bar when a horizontal sorter has more cards than the maximum", () => {
            // Arrange
            const correct = Array.from(
                {length: SORTER_MAX_HORIZONTAL_CARDS + 1},
                (_, index) => `Card ${index}`,
            );

            // Act
            renderQuestion(generateSorterQuestion(correct, "horizontal"), {
                apiOptions,
            });

            // Assert
            expect(screen.getByTestId("legend-bar")).toHaveClass("vertical");
        });
    });

    describe("interaction", () => {
        it("moves a card from the choice bank into the chosen blank", async () => {
            // Arrange
            renderQuestion(generateSorterQuestion(["Apple", "Banana"]), {
                apiOptions,
            });

            // Act
            await moveTileToBlank(userEvent, "Apple", 2);

            // Assert
            const blanks = within(getBlankList()).getAllByRole("listitem");
            expect(
                within(blanks[1]).getByRole("button", {name: "Apple"}),
            ).toBeVisible();
            expect(
                within(getChoiceBank()).queryByRole("button", {name: "Apple"}),
            ).not.toBeInTheDocument();
        });

        it("returns the displaced card to the choice bank when a blank is reused", async () => {
            // Arrange
            renderQuestion(generateSorterQuestion(["Apple", "Banana"]), {
                apiOptions,
            });
            await moveTileToBlank(userEvent, "Apple", 1);

            // Act
            await moveTileToBlank(userEvent, "Banana", 1);

            // Assert
            expect(
                within(getChoiceBank()).getByRole("button", {name: "Apple"}),
            ).toBeVisible();
        });

        it("returns a placed card to the choice bank when it is cleared", async () => {
            // Arrange
            renderQuestion(generateSorterQuestion(["Apple", "Banana"]), {
                apiOptions,
            });
            await moveTileToBlank(userEvent, "Apple", 1);

            // Act
            await clearBlank(userEvent, "Apple", 1);

            // Assert
            expect(
                within(getChoiceBank()).getByRole("button", {name: "Apple"}),
            ).toBeVisible();
        });

        // There shouldn't be content that has duplicate cards but there's also no limitation
        // against having duplicate cards; this test makes sure things don't break when
        // content creators aren't following best practices
        it("keeps a duplicate card in the choice bank when its twin is placed", async () => {
            // Arrange
            renderQuestion(
                generateSorterQuestion(["Apple", "Apple", "Banana"]),
                {
                    apiOptions,
                },
            );

            // Act
            await moveFirstBankTileToBlank(userEvent, "Apple", 1);

            // Assert
            expect(
                within(getChoiceBank()).getAllByRole("button", {name: "Apple"}),
            ).toHaveLength(1);
        });

        it("tracks an interaction when a card is moved", async () => {
            // Arrange
            const trackInteraction = jest.fn();
            renderQuestion(generateSorterQuestion(["Apple", "Banana"]), {
                apiOptions: {...apiOptions, trackInteraction},
            });

            // Act
            await moveTileToBlank(userEvent, "Apple", 1);

            // Assert
            expect(trackInteraction).toHaveBeenCalledWith({
                type: "sorter",
                id: "sorter 1",
            });
        });
    });

    describe("legend", () => {
        const legend: SorterLegend = {
            startCap: "arrow",
            endCap: "bar",
            startLabel: "Lowest",
            endLabel: "Highest",
            ariaLabel: "Interest rates, from lowest to highest",
            position: "below",
        };

        it("renders the legend caps", () => {
            // Arrange, Act
            renderQuestion(generateSorterQuestionWithLegend(legend), {
                apiOptions,
            });

            // Assert
            expect(screen.getByTestId("legend-bar-start-cap")).toHaveClass(
                "arrow",
            );
            expect(screen.getByTestId("legend-bar-end-cap")).toHaveClass("bar");
        });

        it("renders no caps or labels when there is no legend", () => {
            // Arrange, Act
            renderQuestion(generateSorterQuestion(["Apple", "Banana"]), {
                apiOptions,
            });

            // Assert
            expect(
                screen.queryByTestId("legend-bar-start-cap"),
            ).not.toBeInTheDocument();
            expect(screen.queryByText("Lowest")).not.toBeInTheDocument();
        });
    });

    describe("user input", () => {
        it("starts with the input marked unchanged", () => {
            // Arrange, Act
            const {renderer} = renderQuestion(
                generateSorterQuestion(["Apple", "Banana"]),
                {apiOptions},
            );

            // Assert
            expect(renderer.getUserInputMap()["sorter 1"].changed).toBe(false);
        });

        it("keeps the input unchanged while a blank is empty", async () => {
            // Arrange
            const {renderer} = renderQuestion(
                generateSorterQuestion(["Apple", "Banana", "Cherry"]),
                {apiOptions},
            );

            // Act
            await moveTileToBlank(userEvent, "Apple", 1);
            await moveTileToBlank(userEvent, "Banana", 2);

            // Assert
            expect(renderer.getUserInputMap()["sorter 1"].changed).toBe(false);
        });

        it("reports the cards in blank order and marks the input changed when every blank is filled", async () => {
            // Arrange
            const {renderer} = renderQuestion(
                generateSorterQuestion(["Apple", "Banana"]),
                {apiOptions},
            );

            // Act
            await moveTileToBlank(userEvent, "Banana", 1);
            await moveTileToBlank(userEvent, "Apple", 2);

            // Assert
            expect(renderer.getUserInputMap()["sorter 1"]).toEqual({
                options: ["Banana", "Apple"],
                changed: true,
            });
        });

        // There shouldn't be content that has duplicate cards but there's also no limitation
        // against having duplicate cards; this test makes sure things don't break when
        // content creators aren't following best practices
        it("marks the input changed when every blank is filled with duplicate cards", async () => {
            // Arrange
            const {renderer} = renderQuestion(
                generateSorterQuestion(["Apple", "Apple", "Banana"]),
                {apiOptions},
            );

            // Act
            await moveFirstBankTileToBlank(userEvent, "Apple", 1);
            await moveFirstBankTileToBlank(userEvent, "Banana", 2);
            await moveFirstBankTileToBlank(userEvent, "Apple", 3);

            // Assert
            expect(renderer.getUserInputMap()["sorter 1"]).toEqual({
                options: ["Apple", "Banana", "Apple"],
                changed: true,
            });
        });

        it("marks the input unchanged and keeps the last full order when a blank is cleared", async () => {
            // Arrange
            const {renderer} = renderQuestion(
                generateSorterQuestion(["Apple", "Banana"]),
                {apiOptions},
            );
            await moveTileToBlank(userEvent, "Banana", 1);
            await moveTileToBlank(userEvent, "Apple", 2);

            // Act
            await clearBlank(userEvent, "Apple", 2);

            // Assert
            expect(renderer.getUserInputMap()["sorter 1"]).toEqual({
                options: ["Banana", "Apple"],
                changed: false,
            });
        });

        it("describes the learner's current card order in the prompt JSON", async () => {
            // Arrange
            const {renderer} = renderQuestion(
                generateSorterQuestion(["Apple", "Banana"]),
                {apiOptions},
            );

            // Act
            await moveTileToBlank(userEvent, "Apple", 1);
            await moveTileToBlank(userEvent, "Banana", 2);

            // Assert
            expect(renderer.findWidgets("sorter 1")[0].getPromptJSON()).toEqual(
                {
                    type: "sorter",
                    userInput: {values: ["Apple", "Banana"], changed: true},
                },
            );
        });
    });

    describe("scoring", () => {
        const correct = ["Apple", "Banana", "Cherry"];
        const answerfulItem = generateTestPerseusItem({
            question: generateSorterQuestion(correct),
        });
        const answerlessItem = splitPerseusItem(answerfulItem);

        describe.each([
            ["answerful", answerfulItem],
            ["answerless", answerlessItem],
        ])("given %s data", (_, {question}) => {
            it("is initially scored 'invalid'", () => {
                // Arrange
                const {renderer} = renderQuestion(question, {apiOptions});

                // Act
                const score = scorePerseusItemTesting(
                    answerfulItem.question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveInvalidInput();
            });

            it("is scored 'invalid' while a blank is empty", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, {apiOptions});
                await moveTileToBlank(userEvent, "Apple", 1);
                await moveTileToBlank(userEvent, "Banana", 2);

                // Act
                const score = scorePerseusItemTesting(
                    answerfulItem.question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveInvalidInput();
            });

            it("can be answered correctly", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, {apiOptions});
                await moveTileToBlank(userEvent, "Apple", 1);
                await moveTileToBlank(userEvent, "Banana", 2);
                await moveTileToBlank(userEvent, "Cherry", 3);

                // Act
                const score = scorePerseusItemTesting(
                    answerfulItem.question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveBeenAnsweredCorrectly();
            });

            it("can be answered incorrectly", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, {apiOptions});
                await moveTileToBlank(userEvent, "Cherry", 1);
                await moveTileToBlank(userEvent, "Banana", 2);
                await moveTileToBlank(userEvent, "Apple", 3);

                // Act
                const score = scorePerseusItemTesting(
                    answerfulItem.question,
                    renderer.getUserInputMap(),
                );

                // Assert
                expect(score).toHaveBeenAnsweredIncorrectly();
            });
        });
    });

    describe("legacy sorters with too many cards", () => {
        const unsupportedWidgetText =
            "Sorry, this part of the question is no longer available. 😅 Don't worry, you won't be graded on this part. Keep going!";

        function generateCards(cardCount: number): string[] {
            return Array.from(
                {length: cardCount},
                (_, index) => `card ${index}`,
            );
        }

        it("renders the unsupported-widget notice above the card limit", () => {
            // Arrange, Act
            renderQuestion(
                generateSorterQuestion(generateCards(SORTER_MAX_CARDS + 1)),
                {apiOptions},
            );

            // Assert
            expect(screen.getByText(unsupportedWidgetText)).toBeInTheDocument();
        });

        it("does not render the unsupported-widget notice at the card limit", () => {
            // Arrange, Act
            renderQuestion(
                generateSorterQuestion(generateCards(SORTER_MAX_CARDS)),
                {apiOptions},
            );

            // Assert
            expect(
                screen.queryByText(unsupportedWidgetText),
            ).not.toBeInTheDocument();
        });

        it("dispatches unsupported widget analytics event when above the card limit", () => {
            // Arrange
            const onAnalyticsEventSpy = jest.fn();
            const dependencies = {
                analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
            };

            // Act
            renderQuestion(
                generateSorterQuestion(generateCards(SORTER_MAX_CARDS + 1)),
                {apiOptions, dependencies},
            );

            // Assert
            expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
                type: "perseus:widget:unsupported",
                payload: {
                    widgetType: "sorter",
                    widgetSubType: "null",
                    widgetId: "sorter 1",
                    reason: "exceeds-card-limit",
                },
            });
        });
    });
});
