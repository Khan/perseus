import {isInaccessible, render, screen} from "@testing-library/react";
import * as React from "react";

import {LegendLabel} from "./legend-label";

describe("LegendLabel", () => {
    it("renders the label text", () => {
        // Arrange, Act
        render(<LegendLabel content="Lowest" />);

        // Assert
        expect(screen.getByText("Lowest")).toBeInTheDocument();
    });

    it("renders markdown characters as plain text", () => {
        // Arrange, Act
        render(<LegendLabel content="$5 or **more**" />);

        // Assert
        expect(screen.getByText("$5 or **more**")).toBeInTheDocument();
    });

    it("is hidden from assistive technology", () => {
        // Arrange, Act
        render(<LegendLabel content="Lowest" />);

        // Assert
        expect(isInaccessible(screen.getByText("Lowest"))).toBe(true);
    });
});
