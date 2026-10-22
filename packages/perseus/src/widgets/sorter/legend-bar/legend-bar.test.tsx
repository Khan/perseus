import {render, screen} from "@testing-library/react";
import * as React from "react";

import {LegendBar} from "./legend-bar";

describe("LegendBar", () => {
    it("is hidden from assistive technology", () => {
        render(<LegendBar orientation="horizontal" />);

        expect(screen.getByTestId("legend-bar")).toHaveAttribute(
            "aria-hidden",
            "true",
        );
    });

    it("applies the horizontal styling when orientation is horizontal", () => {
        render(<LegendBar orientation="horizontal" />);

        expect(screen.getByTestId("legend-bar")).toHaveClass("horizontal");
    });

    it("applies the vertical styling when orientation is vertical", () => {
        render(<LegendBar orientation="vertical" />);

        expect(screen.getByTestId("legend-bar")).toHaveClass("vertical");
    });

    it("renders no caps by default", () => {
        render(<LegendBar orientation="horizontal" />);

        expect(
            screen.queryByTestId("legend-bar-start-cap"),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("legend-bar-end-cap"),
        ).not.toBeInTheDocument();
    });

    it("renders no cap when the cap is none", () => {
        render(
            <LegendBar
                orientation="horizontal"
                startCap="none"
                endCap="none"
            />,
        );

        expect(
            screen.queryByTestId("legend-bar-start-cap"),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("legend-bar-end-cap"),
        ).not.toBeInTheDocument();
    });

    it("renders an arrow cap at the start", () => {
        render(<LegendBar orientation="horizontal" startCap="arrow" />);

        expect(screen.getByTestId("legend-bar-start-cap")).toHaveClass("arrow");
    });

    it("renders a bar cap at the end", () => {
        render(<LegendBar orientation="horizontal" endCap="bar" />);

        expect(screen.getByTestId("legend-bar-end-cap")).toHaveClass("bar");
    });

    it("renders a different cap at each end", () => {
        render(
            <LegendBar orientation="vertical" startCap="arrow" endCap="bar" />,
        );

        expect(screen.getByTestId("legend-bar-start-cap")).toHaveClass("arrow");
        expect(screen.getByTestId("legend-bar-end-cap")).toHaveClass("bar");
    });
});
