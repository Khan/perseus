import {render, screen, within} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";

import {Sorter} from "./sorter";

import type {SorterProps} from "./sorter";
import type {TilePlacements} from "../tile-placements";
import type {UserEvent} from "@testing-library/user-event";

const baseProps: Omit<SorterProps, "placements" | "onPlacementsChange"> = {
    variant: "scale",
    legend: {
        startLabel: "Lowest",
        endLabel: "Highest",
        srLabel: "Interest rate, from lowest to highest",
        startStyle: "arrow",
        endStyle: "arrow",
    },
    tiles: [
        {id: "car", content: "car loan", label: "car loan"},
        {id: "credit", content: "credit card", label: "credit card"},
        {id: "student", content: "student loan", label: "student loan"},
    ],
    orientation: "horizontal",
};

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
                {...baseProps}
                {...props}
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
        renderSorter();

        const slots = screen.getByRole("list", {
            name: "Interest rate, from lowest to highest",
        });
        expect(within(slots).getAllByRole("listitem")).toHaveLength(3);
    });

    it("renders every unplaced tile in the choice bank", () => {
        // Arrange, Act
        renderSorter({placements: {"blank 1": "car"}});

        const bank = screen.getByRole("list", {name: "Choices"});
        expect(within(bank).getAllByRole("listitem")).toHaveLength(2);
    });

    it("places a tile into a blank through the actions menu", async () => {
        const {getPlacements} = renderSorter();

        await user.click(screen.getByRole("button", {name: "car loan"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
        );

        expect(getPlacements()).toEqual({"blank 2": "car"});
    });

    it("returns the occupant to the bank when a tile takes its blank", async () => {
        const {getPlacements} = renderSorter({
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
            placements: {"blank 1": "car"},
        });

        const slots = screen.getByRole("list", {
            name: "Interest rate, from lowest to highest",
        });
        await user.click(within(slots).getByRole("button", {name: "car loan"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Clear from Blank 1"}),
        );

        expect(getPlacements()).toEqual({});
    });
});
