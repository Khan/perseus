import {render, screen} from "@testing-library/react";
import * as React from "react";

import {BlankComponent} from "./blank-component";

describe("BlankComponent", () => {
    it("renders an empty slot", () => {
        // Arrange, Act
        render(
            <BlankComponent
                blankId="blank-1"
                displayType="normal"
                testId="blank"
            />,
        );

        expect(screen.getByTestId("blank")).toBeInTheDocument();
    });

    it("applies the super-sub styling when displayType is not normal", () => {
        // Arrange, Act
        render(
            <BlankComponent
                blankId="blank-1"
                displayType="superscript"
                testId="blank"
            />,
        );

        expect(screen.getByTestId("blank").className).toContain("superSub");
    });

    it("renders the placed tile", () => {
        // Arrange, Act
        render(
            <BlankComponent
                blankId="blank-1"
                displayType="normal"
                placedTileId="tile-1"
            >
                <span>Bongo</span>
            </BlankComponent>,
        );

        expect(screen.getByText("Bongo")).toBeInTheDocument();
    });

    it("hides the slot chrome when a tile is placed", () => {
        // Arrange, Act
        render(
            <BlankComponent
                blankId="blank-1"
                displayType="normal"
                placedTileId="tile-1"
                testId="blank"
            >
                <span>Bongo</span>
            </BlankComponent>,
        );

        expect(screen.getByTestId("blank").className).toContain("filled");
    });

    it("keeps the min-width variable when a tile is placed", () => {
        // Arrange, Act — fixed-width mode reads the variable on filled
        // blanks, so it must stay set.
        render(
            <BlankComponent
                blankId="blank-1"
                displayType="normal"
                placedTileId="tile-1"
                minWidth={120}
                testId="blank"
            >
                <span>Bongo</span>
            </BlankComponent>,
        );

        expect(screen.getByTestId("blank").style.cssText).toContain(
            "--blank-min-inline-size: 120px",
        );
    });

    it("keeps the slot chrome when the blank is empty", () => {
        // Arrange, Act — a conditional render leaves `false` behind, which
        // must not count as a placed tile.
        render(
            <BlankComponent
                blankId="blank-1"
                displayType="normal"
                testId="blank"
            >
                {false}
            </BlankComponent>,
        );

        expect(screen.getByTestId("blank").className).not.toContain("filled");
    });
});
