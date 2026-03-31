import {render, screen} from "@testing-library/react";
import {Mafs} from "mafs";
import * as React from "react";

import {PillDragHandle} from "./pill-drag-handle";

const defaultProps = {
    center: [100, 100] as [number, number],
    active: false,
    focused: false,
};

describe("PillDragHandle", () => {
    it("renders grip dots when active", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <PillDragHandle {...defaultProps} active={true} />
            </Mafs>,
        );

        // Assert — 3 along major axis × 2 along minor axis = 6 dots
        expect(screen.getAllByTestId("pill-drag-handle-dot")).toHaveLength(6);
    });

    it("does not render grip dots when inactive", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <PillDragHandle {...defaultProps} active={false} />
            </Mafs>,
        );

        // Assert
        expect(screen.queryAllByTestId("pill-drag-handle-dot")).toHaveLength(0);
    });

    it("renders focus ring when focused", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <PillDragHandle {...defaultProps} focused={true} />
            </Mafs>,
        );

        // Assert
        expect(
            screen.getByTestId("pill-drag-handle-focus-ring"),
        ).toBeInTheDocument();
    });

    it("does not render focus ring when not focused", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <PillDragHandle {...defaultProps} focused={false} />
            </Mafs>,
        );

        // Assert
        expect(
            screen.queryByTestId("pill-drag-handle-focus-ring"),
        ).not.toBeInTheDocument();
    });

    it("renders with default rotation of 0", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <PillDragHandle {...defaultProps} />
            </Mafs>,
        );

        // Assert
        const handle = screen.getByTestId("pill-drag-handle");
        const transform = handle.getAttribute("transform") ?? "";
        expect(transform).toContain("rotate(0)");
    });

    it("renders with the specified rotation angle", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <PillDragHandle {...defaultProps} rotation={45} />
            </Mafs>,
        );

        // Assert
        const handle = screen.getByTestId("pill-drag-handle");
        const transform = handle.getAttribute("transform") ?? "";
        expect(transform).toContain("rotate(45)");
    });
});
