import {isInaccessible, render, screen} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../../../dependencies";
import {testDependencies} from "../../../../testing/test-dependencies";

import {LegendLabel} from "./legend-label";

describe("LegendLabel", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders the label text", () => {
        // Arrange, Act
        render(<LegendLabel content="Lowest" />);

        // Assert
        expect(screen.getByText("Lowest")).toBeInTheDocument();
    });

    it("renders the text between dollar signs as TeX", () => {
        // Arrange, Act
        render(<LegendLabel content={"Under $\\frac{1}{2}$ cup"} />);

        // Assert
        expect(screen.getByText("\\frac{1}{2}")).toHaveClass("mock-TeX");
    });

    it("shows an escaped dollar sign without its backslash", () => {
        // Arrange, Act
        render(<LegendLabel content={"Under \\$5"} />);

        // Assert
        expect(screen.getByText("Under $5")).toBeInTheDocument();
    });

    it("does not render markdown", () => {
        // Arrange, Act
        render(<LegendLabel content="**Most**" />);

        // Assert
        expect(screen.getByText("**Most**")).toBeInTheDocument();
    });

    it("is hidden from assistive technology", () => {
        // Arrange, Act
        render(<LegendLabel content="Lowest" />);

        // Assert
        expect(isInaccessible(screen.getByText("Lowest"))).toBe(true);
    });
});
