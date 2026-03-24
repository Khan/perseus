import {render, screen} from "@testing-library/react";
import {Mafs} from "mafs";
import * as React from "react";

import {AsymptoteDragHandle} from "./asymptote-drag-handle";

const defaultProps = {
    center: [100, 100] as [number, number],
    active: false,
    focused: false,
    orientation: "horizontal" as const,
};

describe("AsymptoteDragHandle", () => {
    it("renders grip dots when active", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <AsymptoteDragHandle {...defaultProps} active={true} />
            </Mafs>,
        );

        // Assert — 3 along major axis × 2 along minor axis = 6 dots
        expect(screen.getAllByTestId("asymptote-handle-dot")).toHaveLength(6);
    });

    it("does not render grip dots when inactive", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <AsymptoteDragHandle {...defaultProps} active={false} />
            </Mafs>,
        );

        // Assert
        expect(screen.queryAllByTestId("asymptote-handle-dot")).toHaveLength(0);
    });

    it("renders focus ring when focused", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <AsymptoteDragHandle {...defaultProps} focused={true} />
            </Mafs>,
        );

        // Assert
        expect(
            screen.getByTestId("asymptote-handle-focus-ring"),
        ).toBeInTheDocument();
    });

    it("does not render focus ring when not focused", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <AsymptoteDragHandle {...defaultProps} focused={false} />
            </Mafs>,
        );

        // Assert
        expect(
            screen.queryByTestId("asymptote-handle-focus-ring"),
        ).not.toBeInTheDocument();
    });

    it("renders a wide pill for horizontal orientation", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <AsymptoteDragHandle
                    {...defaultProps}
                    orientation="horizontal"
                />
            </Mafs>,
        );

        // Assert — width > height for horizontal pill
        const pill = screen.getByTestId("asymptote-handle-pill");
        const width = Number(pill.getAttribute("width"));
        const height = Number(pill.getAttribute("height"));
        expect(width).toBeGreaterThan(height);
    });

    it("renders a tall pill for vertical orientation", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <AsymptoteDragHandle {...defaultProps} orientation="vertical" />
            </Mafs>,
        );

        // Assert — height > width for vertical pill
        const pill = screen.getByTestId("asymptote-handle-pill");
        const width = Number(pill.getAttribute("width"));
        const height = Number(pill.getAttribute("height"));
        expect(height).toBeGreaterThan(width);
    });
});
