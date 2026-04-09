import {render, screen} from "@testing-library/react";
import {Mafs} from "mafs";
import * as React from "react";

import * as UseDraggableModule from "../use-draggable";

import {MovableAsymptote} from "./movable-asymptote";

const defaultProps = {
    start: [-100, 0] as [number, number],
    end: [100, 0] as [number, number],
    mid: [0, 0] as [number, number],
    point: [-10, 0] as [number, number],
    onMove: jest.fn(),
    orientation: "horizontal" as const,
    ariaLabel:
        "Horizontal asymptote at y equals 0. Use up and down arrow keys to move.",
};

describe("MovableAsymptote", () => {
    let useDraggable: jest.SpyInstance;

    beforeEach(() => {
        useDraggable = jest
            .spyOn(UseDraggableModule, "useDraggable")
            .mockReturnValue({dragging: false});
    });

    it("renders with the correct aria-label", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovableAsymptote {...defaultProps} />
            </Mafs>,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: defaultProps.ariaLabel}),
        ).toBeInTheDocument();
    });

    it("renders with data-testid on the root group", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovableAsymptote {...defaultProps} />
            </Mafs>,
        );

        // Assert
        expect(screen.getByTestId("movable-asymptote")).toBeInTheDocument();
    });

    it("adds movable-dragging class to the visible line when dragging", () => {
        // Arrange
        useDraggable.mockReturnValue({dragging: true});

        // Act
        render(
            <Mafs width={200} height={200}>
                <MovableAsymptote {...defaultProps} />
            </Mafs>,
        );

        // Assert
        expect(screen.getByTestId("movable-asymptote__line")).toHaveClass(
            "movable-dragging",
        );
    });

    it("does not add movable-dragging class when not dragging", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovableAsymptote {...defaultProps} />
            </Mafs>,
        );

        // Assert
        expect(screen.getByTestId("movable-asymptote__line")).not.toHaveClass(
            "movable-dragging",
        );
    });

    it("blurs the element when a mouse drag ends to clear the focus ring", () => {
        // Arrange — start with dragging: true
        useDraggable.mockReturnValue({dragging: true});
        const {rerender} = render(
            <Mafs width={200} height={200}>
                <MovableAsymptote {...defaultProps} />
            </Mafs>,
        );

        const group = screen.getByTestId("movable-asymptote");
        // Simulate that the element received focus during drag
        group.focus();
        const blurSpy = jest.spyOn(group, "blur");

        // Act — drag ends
        useDraggable.mockReturnValue({dragging: false});
        rerender(
            <Mafs width={200} height={200}>
                <MovableAsymptote {...defaultProps} />
            </Mafs>,
        );

        // Assert — blur was called to remove the focus ring
        expect(blurSpy).toHaveBeenCalled();
    });

    it("renders the same structure for vertical orientation", () => {
        // Arrange, Act
        render(
            <Mafs width={200} height={200}>
                <MovableAsymptote
                    {...defaultProps}
                    start={[0, -100]}
                    end={[0, 100]}
                    orientation="vertical"
                    ariaLabel="Vertical asymptote at x equals 0."
                />
            </Mafs>,
        );

        // Assert — same interactive structure regardless of orientation
        expect(
            screen.getByRole("button", {
                name: "Vertical asymptote at x equals 0.",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("movable-asymptote__line"),
        ).toBeInTheDocument();
    });
});
