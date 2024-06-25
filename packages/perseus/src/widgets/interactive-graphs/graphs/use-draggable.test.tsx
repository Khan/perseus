import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Mafs} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {useDraggable} from "./use-draggable";

import type {vec} from "mafs";

function TestDraggable(props: {
    point: vec.Vector2;
    constrain: (point: vec.Vector2) => vec.Vector2;
}) {
    const gestureTarget = useRef<HTMLButtonElement>(null);
    const {dragging} = useDraggable({
        ...props,
        gestureTarget,
        onMove: () => {},
    });
    return (
        <button ref={gestureTarget}>
            dragging: {String(dragging)}
        </button>
    );
}

describe("useDraggable", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("initially returns {dragging: false}", () => {
        render(
            <Mafs width={200} height={200}>
                <TestDraggable point={[0, 0]} constrain={(p) => p} />
            </Mafs>,
        );

        expect(screen.getByText("dragging: false")).toBeInTheDocument();
    });

    it("returns {dragging: true} when the mouse button is held down", async () => {
        render(
            <Mafs width={200} height={200}>
                <TestDraggable point={[0, 0]} constrain={(p) => p} />
            </Mafs>,
        );
        const dragHandle = screen.getByRole("button");

        // Act
        await userEvent.pointer({keys: "[MouseLeft>]", target: dragHandle});

        // Assert
        expect(screen.getByText("dragging: true")).toBeInTheDocument();
    });

    it("returns {dragging: false} when the mouse button is released", async () => {
        render(
            <Mafs width={200} height={200}>
                <TestDraggable point={[0, 0]} constrain={(p) => p} />
            </Mafs>,
        );
        const dragHandle = screen.getByRole("button");

        // Act
        await userEvent.pointer([
            {keys: "[MouseLeft>]", target: dragHandle},
            {keys: "[/MouseLeft]"},
        ]);

        // Assert
        expect(screen.getByText("dragging: false")).toBeInTheDocument();
    });
});
