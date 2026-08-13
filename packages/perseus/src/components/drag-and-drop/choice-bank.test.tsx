import {render, screen} from "@testing-library/react";
import * as React from "react";

import {ChoiceBank} from "./choice-bank";

describe("ChoiceBank", () => {
    it("names the tile list with the label", () => {
        // Arrange, Act
        render(
            <ChoiceBank label="Options">
                <button>tile</button>
            </ChoiceBank>,
        );

        expect(screen.getByRole("list", {name: "Options"})).toBeInTheDocument();
    });

    it("renders each child as its own list item", () => {
        // Arrange, Act
        render(
            <ChoiceBank label="Choices">
                <button>one</button>
                <button>two</button>
                <button>three</button>
            </ChoiceBank>,
        );

        expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("renders the tile content passed as children", () => {
        // Arrange, Act
        render(
            <ChoiceBank label="Choices">
                <button>Numerator</button>
            </ChoiceBank>,
        );

        expect(
            screen.getByRole("button", {name: "Numerator"}),
        ).toBeInTheDocument();
    });

    // The bank empties as tiles are placed into blanks.
    // Guards that it still renders as a named list without crashing.
    it("renders an empty bank once all tiles are placed", () => {
        // Arrange, Act
        render(<ChoiceBank label="Choices">{[]}</ChoiceBank>);

        expect(screen.getByRole("list", {name: "Choices"})).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
});
