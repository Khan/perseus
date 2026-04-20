import {render, screen} from "@testing-library/react";
import {Mafs} from "mafs";
import * as React from "react";

import {MovablePillHandle} from "./movable-pill-handle";

const defaultProps = {
    center: [100, 100] as [number, number],
    active: false,
    focused: false,
};

describe("MovablePillHandle", () => {
    it("renders grip dots when active", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovablePillHandle {...defaultProps} active={true} />
            </Mafs>,
        );

        // Assert — 3 along major axis × 2 along minor axis = 6 dots
        expect(screen.getAllByTestId("movable-pill-handle-dot")).toHaveLength(6);
    });

    it("does not render grip dots when inactive", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovablePillHandle {...defaultProps} active={false} />
            </Mafs>,
        );

        // Assert
        expect(screen.queryAllByTestId("movable-pill-handle-dot")).toHaveLength(0);
    });

    it("renders focus ring when focused", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovablePillHandle {...defaultProps} focused={true} />
            </Mafs>,
        );

        // Assert
        expect(
            screen.getByTestId("movable-pill-handle-focus-ring"),
        ).toBeInTheDocument();
    });

    it("does not render focus ring when not focused", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovablePillHandle {...defaultProps} focused={false} />
            </Mafs>,
        );

        // Assert
        expect(
            screen.queryByTestId("movable-pill-handle-focus-ring"),
        ).not.toBeInTheDocument();
    });

    it("renders with default rotation of 0", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovablePillHandle {...defaultProps} />
            </Mafs>,
        );

        // Assert
        const handle = screen.getByTestId("movable-pill-handle");
        const transform = handle.getAttribute("transform") ?? "";
        expect(transform).toContain("rotate(0)");
    });

    it("renders with the specified rotation angle", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovablePillHandle {...defaultProps} rotation={45} />
            </Mafs>,
        );

        // Assert
        const handle = screen.getByTestId("movable-pill-handle");
        const transform = handle.getAttribute("transform") ?? "";
        expect(transform).toContain("rotate(45)");
    });
});
