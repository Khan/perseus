import {generateBlankWidget} from "@khanacademy/perseus-core";
import {render, screen, within} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";
import {registerAllWidgetsForTesting} from "../../../util/register-all-widgets-for-testing";

import {FillInTheBlank} from "./fill-in-the-blank";
import {generateFillInTheBlankProps} from "./fill-in-the-blank.testdata";

import type {
    FillInTheBlankProps,
    FillInTheBlankTile,
} from "./fill-in-the-blank";
import type {TilePlacements} from "../tile-placements";
import type {UserEvent} from "@testing-library/user-event";

// The values the tests assert on, passed explicitly per test so the
// assertions do not depend on the shared generator defaults.
const twoBlankContent =
    "The [[☃ blank 1]] drum is a tall drum. " +
    "You play it with your [[☃ blank 2]].";
const twoBlankWidgets = {
    "blank 1": generateBlankWidget(),
    "blank 2": generateBlankWidget(),
};
const drumTiles: FillInTheBlankTile[] = [
    {id: "djembe", content: "djembe", label: "djembe"},
    {id: "bongo", content: "bongo", label: "bongo"},
    {id: "hands", content: "hands", label: "hands"},
    {id: "sticks", content: "sticks", label: "sticks"},
];

/** Renders FillInTheBlank with live controlled placements. */
function renderFillInTheBlank(props: Partial<FillInTheBlankProps> = {}): {
    getPlacements: () => TilePlacements;
} {
    let currentPlacements: TilePlacements = props.placements ?? {};

    function Harness() {
        const [placements, setPlacements] =
            React.useState<TilePlacements>(currentPlacements);
        currentPlacements = placements;
        return (
            <FillInTheBlank
                {...generateFillInTheBlankProps(props)}
                placements={placements}
                onPlacementsChange={setPlacements}
            />
        );
    }

    render(<Harness />);
    return {getPlacements: () => currentPlacements};
}

async function moveViaMenu(user: UserEvent, tile: string, target: string) {
    await user.click(screen.getByRole("button", {name: tile}));
    await user.click(
        await screen.findByRole("menuitem", {name: `Move to ${target}`}),
    );
}

describe("FillInTheBlank", () => {
    let user: UserEvent;

    beforeEach(() => {
        registerAllWidgetsForTesting();
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
        user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    });

    it("renders one blank per marker in the content", () => {
        // Arrange, Act
        renderFillInTheBlank({
            content: twoBlankContent,
            widgets: twoBlankWidgets,
        });

        expect(screen.getAllByTestId("blank-widget")).toHaveLength(2);
    });

    it("renders every unplaced tile in the choice bank", () => {
        // Arrange, Act
        renderFillInTheBlank({tiles: drumTiles});

        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(4);
    });

    it("places a tile into a blank through the actions menu", async () => {
        const {getPlacements} = renderFillInTheBlank({tiles: drumTiles});

        await moveViaMenu(user, "djembe", "Blank 1");

        expect(getPlacements()).toEqual({"blank 1": "djembe"});
    });

    it("removes a placed single-use tile from the choice bank", async () => {
        renderFillInTheBlank({tiles: drumTiles, tileUsage: "single"});

        await moveViaMenu(user, "djembe", "Blank 1");

        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(3);
        expect(
            within(bank).queryByRole("button", {name: "djembe"}),
        ).not.toBeInTheDocument();
    });

    it("returns the occupant to the bank when a tile takes its blank", async () => {
        const {getPlacements} = renderFillInTheBlank({
            tiles: drumTiles,
            placements: {"blank 1": "bongo"},
        });

        await moveViaMenu(user, "djembe", "Blank 1");

        expect(getPlacements()).toEqual({"blank 1": "djembe"});
        const bank = screen.getByRole("list", {name: "Choices"});
        expect(
            within(bank).getByRole("button", {name: "bongo"}),
        ).toBeInTheDocument();
    });

    it("clears a placed tile through its actions menu", async () => {
        const {getPlacements} = renderFillInTheBlank({
            tiles: drumTiles,
            placements: {"blank 1": "djembe"},
        });

        await user.click(screen.getByRole("button", {name: "djembe"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Clear from Blank 1"}),
        );

        expect(getPlacements()).toEqual({});
    });

    it("moves focus to the placed tile's menu when the bank empties", async () => {
        renderFillInTheBlank({
            content: twoBlankContent,
            widgets: twoBlankWidgets,
            tiles: [{id: "djembe", content: "djembe", label: "djembe"}],
        });

        await moveViaMenu(user, "djembe", "Blank 1");

        // The only tile is placed, so the bank has no menu to focus.
        expect(screen.getByRole("button", {name: "djembe"})).toHaveFocus();
    });

    it("keeps a capped multi-use tile in the bank until exhausted", async () => {
        renderFillInTheBlank({
            content: twoBlankContent,
            widgets: twoBlankWidgets,
            tiles: drumTiles,
            tileUsage: "multi",
            maxUsesPerTile: 2,
            placements: {"blank 1": "djembe"},
        });

        const bank = screen.getByRole("list", {name: "Choices"});
        // One use left: the tile still shows in the bank.
        await user.click(within(bank).getByRole("button", {name: "djembe"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
        );

        expect(
            within(bank).queryByRole("button", {name: "djembe"}),
        ).not.toBeInTheDocument();
    });

    it("keeps a filled blank at its measured width when fixed", () => {
        // Arrange, Act
        renderFillInTheBlank({
            tiles: drumTiles,
            placements: {"blank 1": "djembe"},
            filledBlankStyle: "fixed",
        });

        const blank = screen.getAllByTestId("blank-widget")[0];
        expect(blank.className).toContain("keepsWidth");
    });

    it("lets a filled blank hug its tile by default", () => {
        // Arrange, Act
        renderFillInTheBlank({
            tiles: drumTiles,
            placements: {"blank 1": "djembe"},
        });

        const blank = screen.getAllByTestId("blank-widget")[0];
        expect(blank.className).not.toContain("keepsWidth");
    });
});
