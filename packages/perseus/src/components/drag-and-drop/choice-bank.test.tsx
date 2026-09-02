import {render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";

import {AnswerTile} from "./answer-tile";
import {generateAnswerTileProps} from "./answer-tile/answer-tile.testdata";
import {ChoiceBank} from "./choice-bank";

describe("ChoiceBank", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
    });

    it("names the tile list with the label", () => {
        // Arrange, Act
        render(
            <ChoiceBank label="Options">
                <AnswerTile {...generateAnswerTileProps()} />
            </ChoiceBank>,
        );

        expect(screen.getByRole("list", {name: "Options"})).toBeInTheDocument();
    });

    it("renders each tile as its own list item", () => {
        // Arrange
        const values = ["one", "two", "three"];

        // Act
        render(
            <ChoiceBank label="Choices">
                {values.map((value, index) => (
                    <AnswerTile
                        key={value}
                        {...generateAnswerTileProps({
                            tileId: `tile-${index}`,
                            content: value,
                            label: value,
                        })}
                    />
                ))}
            </ChoiceBank>,
        );

        expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("renders the tiles' content", () => {
        // Arrange, Act
        render(
            <ChoiceBank label="Choices">
                <AnswerTile
                    {...generateAnswerTileProps({
                        content: "Numerator",
                        label: "Numerator",
                    })}
                />
            </ChoiceBank>,
        );

        expect(screen.getByText("Numerator")).toBeInTheDocument();
    });

    // The bank empties as tiles are placed into blanks.
    // Guards that it still renders as a named list without crashing.
    it("renders an empty bank once all tiles are placed", () => {
        // Arrange, Act
        render(<ChoiceBank label="Choices" />);

        expect(screen.getByRole("list", {name: "Choices"})).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
});
