import {
    generateAnswerTile,
    generateBlankWidget,
    generateFillInTheBlankOptions,
    generateFillInTheBlankWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen, within} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {ApiOptions} from "../../perseus-api";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import * as Widgets from "../../widgets";
import {renderQuestion} from "../__testutils__/render-question";

import type {
    PerseusFillInTheBlankUserInput,
    PerseusFillInTheBlankWidgetOptions,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const twoBlanks: Partial<PerseusFillInTheBlankWidgetOptions> = {
    content:
        "The [[☃ blank 1]] drum is a tall drum. " +
        "You play it with your [[☃ blank 2]].",
    widgets: {
        "blank 1": generateBlankWidget(),
        "blank 2": generateBlankWidget(),
    },
};
const drumTiles = ["djembe", "bongo", "hands", "sticks"].map((drum) =>
    generateAnswerTile({id: drum, content: drum, label: drum}),
);

const apiOptions = ApiOptions.defaults;

/** Renders one FITB widget, optionally with blanks already filled. */
function renderFillInTheBlank(
    options: Partial<PerseusFillInTheBlankWidgetOptions>,
    initialUserInput?: PerseusFillInTheBlankUserInput,
) {
    const question = generateTestPerseusRenderer({
        content: "[[☃ fill-in-the-blank 1]]",
        widgets: {
            "fill-in-the-blank 1": generateFillInTheBlankWidget({
                options: generateFillInTheBlankOptions(options),
            }),
        },
    });
    return renderQuestion(question, {
        apiOptions,
        initialUserInput: initialUserInput && {
            "fill-in-the-blank 1": initialUserInput,
        },
    });
}

describe("Fill in the Blank Widget", () => {
    let user: UserEvent;

    async function moveViaMenu(tile: string, target: string) {
        await user.click(screen.getByRole("button", {name: tile}));
        await user.click(
            await screen.findByRole("menuitem", {name: `Move to ${target}`}),
        );
    }

    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    beforeEach(() => {
        user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    });

    it("is registered in the widget registry", () => {
        // Arrange, Act
        const widget = Widgets.getWidget("fill-in-the-blank");

        // Assert
        expect(widget).not.toBeNull();
    });

    it("is hidden from the content editor's widget dropdown", () => {
        // Arrange, Act
        const publicWidgets = Widgets.getPublicWidgets();

        // Assert
        expect(publicWidgets["fill-in-the-blank"]).toBeUndefined();
    });

    it("renders one blank per marker in the content", () => {
        // Arrange, Act
        const widgetOptions = twoBlanks;
        renderFillInTheBlank(widgetOptions);

        // Assert
        expect(screen.getAllByTestId("blank-widget")).toHaveLength(2);
    });

    it("renders every unplaced tile in the choice bank", () => {
        // Arrange, Act
        const widgetOptions = {...twoBlanks, tiles: drumTiles};
        renderFillInTheBlank(widgetOptions);

        // Assert
        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(4);
    });

    it("renders only the unplaced tiles in the choice bank", () => {
        // Arrange, Act
        const widgetOptions = {
            ...twoBlanks,
            tiles: drumTiles,
            maxUsesPerTile: 1,
        };
        const userInput = {"blank 1": {selected: "djembe"}};
        renderFillInTheBlank(widgetOptions, userInput);

        // Assert
        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(3);
        for (const name of ["bongo", "hands", "sticks"]) {
            expect(
                within(bank).getByRole("button", {name}),
            ).toBeInTheDocument();
        }
        expect(
            within(bank).queryByRole("button", {name: "djembe"}),
        ).not.toBeInTheDocument();
    });

    it("records a tile placed through the actions menu", async () => {
        // Arrange
        const widgetOptions = {...twoBlanks, tiles: drumTiles};
        const {renderer} = renderFillInTheBlank(widgetOptions);

        // Act
        await moveViaMenu("djembe", "Blank 1");

        // Assert
        expect(renderer.getUserInputMap()).toEqual({
            "fill-in-the-blank 1": {
                "blank 1": {selected: "djembe"},
                "blank 2": {selected: null},
            },
        });
    });

    it("keeps placements separate between two widgets with the same blank IDs in the same question", async () => {
        // Arrange
        // Both FITB widgets name their blank "blank 1", so a leak between their
        // BlankContext or drag-and-drop providers would show up here.
        const oneBlank: Partial<PerseusFillInTheBlankWidgetOptions> = {
            content: "The [[☃ blank 1]] is a drum.",
            widgets: {"blank 1": generateBlankWidget()},
        };
        const {renderer} = renderQuestion(
            generateTestPerseusRenderer({
                content:
                    "[[☃ fill-in-the-blank 1]]\n\n[[☃ fill-in-the-blank 2]]",
                widgets: {
                    "fill-in-the-blank 1": generateFillInTheBlankWidget({
                        options: generateFillInTheBlankOptions({
                            ...oneBlank,
                            tiles: drumTiles.slice(0, 2),
                        }),
                    }),
                    "fill-in-the-blank 2": generateFillInTheBlankWidget({
                        options: generateFillInTheBlankOptions({
                            ...oneBlank,
                            tiles: drumTiles.slice(2),
                        }),
                    }),
                },
            }),
            {apiOptions},
        );

        // Act
        await moveViaMenu("djembe", "Blank 1");

        // Assert
        expect(renderer.getUserInputMap()).toEqual({
            "fill-in-the-blank 1": {"blank 1": {selected: "djembe"}},
            // Untouched, so it still holds its start input.
            "fill-in-the-blank 2": {},
        });
        const [firstBlank, secondBlank] = screen.getAllByTestId("blank-widget");
        expect(
            within(firstBlank).getByRole("button", {name: "djembe"}),
        ).toBeInTheDocument();
        expect(secondBlank).toBeEmptyDOMElement();
    });

    it("removes a placed single-use tile from the choice bank", async () => {
        // Arrange
        const widgetOptions = {
            ...twoBlanks,
            tiles: drumTiles,
            maxUsesPerTile: 1,
        };
        renderFillInTheBlank(widgetOptions);

        // Act
        await moveViaMenu("djembe", "Blank 1");

        // Assert
        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(3);
        expect(
            within(bank).queryByRole("button", {name: "djembe"}),
        ).not.toBeInTheDocument();
    });

    it("returns the occupant to the bank when a tile takes its blank", async () => {
        // Arrange
        const widgetOptions = {...twoBlanks, tiles: drumTiles};
        const userInput = {"blank 1": {selected: "bongo"}};
        const {renderer} = renderFillInTheBlank(widgetOptions, userInput);

        // Act
        await moveViaMenu("djembe", "Blank 1");

        // Assert
        expect(renderer.getUserInputMap()).toMatchObject({
            "fill-in-the-blank 1": {"blank 1": {selected: "djembe"}},
        });
        const bank = screen.getByRole("list", {name: "Choices"});
        expect(
            within(bank).getByRole("button", {name: "bongo"}),
        ).toBeInTheDocument();
    });

    it("clears a placed tile through its actions menu", async () => {
        // Arrange
        const widgetOptions = {...twoBlanks, tiles: drumTiles};
        const userInput = {"blank 1": {selected: "djembe"}};
        const {renderer} = renderFillInTheBlank(widgetOptions, userInput);

        // Act
        await user.click(screen.getByRole("button", {name: "djembe"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Clear from Blank 1"}),
        );

        // Assert
        expect(renderer.getUserInputMap()).toEqual({
            "fill-in-the-blank 1": {
                "blank 1": {selected: null},
                "blank 2": {selected: null},
            },
        });
    });

    it("moves focus to the placed tile's menu when the bank empties", async () => {
        // Arrange
        const widgetOptions = {
            ...twoBlanks,
            tiles: [
                generateAnswerTile({
                    id: "djembe",
                    content: "djembe",
                    label: "djembe",
                }),
            ],
        };
        renderFillInTheBlank(widgetOptions);

        // Act
        await moveViaMenu("djembe", "Blank 1");

        // Assert
        expect(screen.getByRole("button", {name: "djembe"})).toHaveFocus();
    });

    it("keeps a capped multi-use tile in the bank until exhausted", async () => {
        // Arrange
        const widgetOptions = {
            ...twoBlanks,
            tiles: drumTiles,
            maxUsesPerTile: 2,
        };
        const userInput = {"blank 1": {selected: "djembe"}};
        renderFillInTheBlank(widgetOptions, userInput);

        // One use left: the tile still shows in the bank.
        const bank = screen.getByRole("list", {name: "Choices"});

        // Act
        await user.click(within(bank).getByRole("button", {name: "djembe"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
        );

        // Assert
        expect(
            within(bank).queryByRole("button", {name: "djembe"}),
        ).not.toBeInTheDocument();
    });
});
