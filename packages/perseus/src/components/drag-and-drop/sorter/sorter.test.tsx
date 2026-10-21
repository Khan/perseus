import {render, screen, within} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";

import {Sorter} from "./sorter";
import {generateSorterProps} from "./sorter.testdata";

import type {SorterProps, SorterTile} from "./sorter";
import type {TilePlacements} from "../tile-placements";
import type {UserEvent} from "@testing-library/user-event";

// The values the tests assert on, passed explicitly per test so the
// assertions do not depend on the shared generator defaults.
const loanTiles: SorterTile[] = [
    {id: "car", content: "car loan", label: "car loan"},
    {id: "credit", content: "credit card", label: "credit card"},
    {id: "student", content: "student loan", label: "student loan"},
];
const srLabel = "Interest rate, from lowest to highest";

/** Renders Sorter with live controlled placements. */
function renderSorter(props: Partial<SorterProps> = {}): {
    getPlacements: () => TilePlacements;
} {
    let currentPlacements: TilePlacements = props.placements ?? {};

    function Harness() {
        const [placements, setPlacements] =
            React.useState<TilePlacements>(currentPlacements);
        currentPlacements = placements;
        return (
            <Sorter
                {...generateSorterProps(props)}
                placements={placements}
                onPlacementsChange={setPlacements}
            />
        );
    }

    render(<Harness />);
    return {getPlacements: () => currentPlacements};
}

describe("Sorter", () => {
    let user: UserEvent;

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
        user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    });

    it("renders one blank per tile in a list labeled by the legend", () => {
        // Arrange, Act
        renderSorter({
            tiles: loanTiles,
            legend: {
                ...generateSorterProps().legend,
                srLabel,
            },
        });

        const slots = screen.getByRole("list", {name: srLabel});
        expect(within(slots).getAllByRole("listitem")).toHaveLength(3);
    });

    it("renders every unplaced tile in the choice bank", () => {
        // Arrange, Act
        renderSorter({
            tiles: loanTiles,
            placements: {"blank 1": "car"},
        });

        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(2);
    });

    it("places a tile into a blank through the actions menu", async () => {
        const {getPlacements} = renderSorter({tiles: loanTiles});

        await user.click(screen.getByRole("button", {name: "car loan"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
        );

        expect(getPlacements()).toEqual({"blank 2": "car"});
    });

    it("returns the occupant to the bank when a tile takes its blank", async () => {
        const {getPlacements} = renderSorter({
            tiles: loanTiles,
            placements: {"blank 1": "car"},
        });

        await user.click(screen.getByRole("button", {name: "credit card"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 1"}),
        );

        expect(getPlacements()).toEqual({"blank 1": "credit"});
        const bank = screen.getByRole("list", {name: "Choices"});
        expect(
            within(bank).getByRole("button", {name: "car loan"}),
        ).toBeInTheDocument();
    });

    it("clears a placed tile through its actions menu", async () => {
        const {getPlacements} = renderSorter({
            tiles: loanTiles,
            legend: {
                ...generateSorterProps().legend,
                srLabel,
            },
            placements: {"blank 1": "car"},
        });

        const slots = screen.getByRole("list", {name: srLabel});
        await user.click(within(slots).getByRole("button", {name: "car loan"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Clear from Blank 1"}),
        );

        expect(getPlacements()).toEqual({});
    });
});
