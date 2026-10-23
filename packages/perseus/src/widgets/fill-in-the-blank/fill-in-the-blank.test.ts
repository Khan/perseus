import {
    generateAnswerTile,
    generateBlankWidget,
    generateFillInTheBlankOptions,
    generateFillInTheBlankWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen, within} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {getFeatureFlags} from "../../testing/feature-flags-util";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import * as Widgets from "../../widgets";
import {renderQuestion} from "../__testutils__/render-question";

import {basicFillInTheBlankQuestion} from "./fill-in-the-blank.testdata";

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

// TODO(LEMS-4396): clean up feature flag
const apiOptions = {flags: getFeatureFlags({"dnd-widget-fitb": true})};

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

async function moveViaMenu(user: UserEvent, tile: string, target: string) {
    await user.click(screen.getByRole("button", {name: tile}));
    await user.click(
        await screen.findByRole("menuitem", {name: `Move to ${target}`}),
    );
}

describe("Fill in the Blank Widget", () => {
    let user: UserEvent;

    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    beforeEach(() => {
        user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    });

    it("is registered in the widget registry", () => {
        // Arrange, Act
        const widget = Widgets.getWidget("fill-in-the-blank");

        expect(widget).not.toBeNull();
    });

    it("is hidden from the content editor's widget dropdown", () => {
        // Arrange, Act
        const publicWidgets = Widgets.getPublicWidgets();

        expect(publicWidgets["fill-in-the-blank"]).toBeUndefined();
    });

    it("renders one blank per marker in the content", () => {
        // Arrange, Act
        renderFillInTheBlank(twoBlanks);

        expect(screen.getAllByTestId("blank-widget")).toHaveLength(2);
    });

    it("renders every unplaced tile in the choice bank", () => {
        // Arrange, Act
        renderFillInTheBlank({...twoBlanks, tiles: drumTiles});

        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(4);
    });

    it("records a tile placed through the actions menu", async () => {
        const {renderer} = renderFillInTheBlank({
            ...twoBlanks,
            tiles: drumTiles,
        });

        await moveViaMenu(user, "djembe", "Blank 1");

        expect(renderer.getUserInputMap()).toEqual({
            "fill-in-the-blank 1": {
                "blank 1": {selected: "djembe"},
                "blank 2": {selected: null},
            },
        });
    });

    it("removes a placed single-use tile from the choice bank", async () => {
        renderFillInTheBlank({
            ...twoBlanks,
            tiles: drumTiles,
            maxUsesPerTile: 1,
        });

        await moveViaMenu(user, "djembe", "Blank 1");

        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(3);
        expect(
            within(bank).queryByRole("button", {name: "djembe"}),
        ).not.toBeInTheDocument();
    });

    it("returns the occupant to the bank when a tile takes its blank", async () => {
        const {renderer} = renderFillInTheBlank(
            {...twoBlanks, tiles: drumTiles},
            {"blank 1": {selected: "bongo"}},
        );

        await moveViaMenu(user, "djembe", "Blank 1");

        expect(renderer.getUserInputMap()).toMatchObject({
            "fill-in-the-blank 1": {"blank 1": {selected: "djembe"}},
        });
        const bank = screen.getByRole("list", {name: "Choices"});
        expect(
            within(bank).getByRole("button", {name: "bongo"}),
        ).toBeInTheDocument();
    });

    it("clears a placed tile through its actions menu", async () => {
        const {renderer} = renderFillInTheBlank(
            {...twoBlanks, tiles: drumTiles},
            {"blank 1": {selected: "djembe"}},
        );

        await user.click(screen.getByRole("button", {name: "djembe"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Clear from Blank 1"}),
        );

        expect(renderer.getUserInputMap()).toEqual({
            "fill-in-the-blank 1": {
                "blank 1": {selected: null},
                "blank 2": {selected: null},
            },
        });
    });

    it("moves focus to the placed tile's menu when the bank empties", async () => {
        renderFillInTheBlank({
            ...twoBlanks,
            tiles: [
                generateAnswerTile({
                    id: "djembe",
                    content: "djembe",
                    label: "djembe",
                }),
            ],
        });

        await moveViaMenu(user, "djembe", "Blank 1");

        expect(screen.getByRole("button", {name: "djembe"})).toHaveFocus();
    });

    it("keeps a capped multi-use tile in the bank until exhausted", async () => {
        renderFillInTheBlank(
            {...twoBlanks, tiles: drumTiles, maxUsesPerTile: 2},
            {"blank 1": {selected: "djembe"}},
        );

        // One use left: the tile still shows in the bank.
        const bank = screen.getByRole("list", {name: "Choices"});
        await user.click(within(bank).getByRole("button", {name: "djembe"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
        );

        expect(
            within(bank).queryByRole("button", {name: "djembe"}),
        ).not.toBeInTheDocument();
    });
});
