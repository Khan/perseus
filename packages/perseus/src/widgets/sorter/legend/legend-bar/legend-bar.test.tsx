import {render, screen} from "@testing-library/react";
import * as React from "react";

import {LegendBar} from "./legend-bar";

describe("LegendBar", () => {
    it("is hidden from assistive technology", () => {
        // Arrange, Act
        render(<LegendBar orientation="horizontal" />);

        expect(screen.getByTestId("legend-bar")).toHaveAttribute(
            "aria-hidden",
            "true",
        );
    });

    it("applies the horizontal styling when orientation is horizontal", () => {
        // Arrange, Act
        render(<LegendBar orientation="horizontal" />);

        expect(screen.getByTestId("legend-bar")).toHaveClass("horizontal");
    });

    it("applies the vertical styling when orientation is vertical", () => {
        // Arrange, Act
        render(<LegendBar orientation="vertical" />);

        expect(screen.getByTestId("legend-bar")).toHaveClass("vertical");
    });
});
