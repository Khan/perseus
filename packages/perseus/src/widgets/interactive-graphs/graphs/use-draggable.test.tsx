import {render, screen, fireEvent} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Mafs, Transform} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {snap} from "../math";

import {useDraggable} from "./use-draggable";

import type {KeyboardMovementConstraint} from "./use-draggable";
import type {UserEvent} from "@testing-library/user-event";
import type {vec, Interval} from "mafs";

function TestDraggable(props: {
    point: vec.Vector2;
    constrainKeyboardMovement?: KeyboardMovementConstraint;
    onMove?: (point: vec.Vector2) => unknown;
}) {
    const {onMove = () => {}, constrainKeyboardMovement = (p) => p} = props;
    const gestureTarget = useRef<HTMLButtonElement>(null);
    const {dragging} = useDraggable({
        point: props.point,
        onMove,
        constrainKeyboardMovement,
        gestureTarget,
    });
    return (
        <button ref={gestureTarget} tabIndex={0}>
            dragging: {String(dragging)}
        </button>
    );
}

describe("useDraggable", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("initially returns {dragging: false}", () => {
        render(
            <Mafs width={200} height={200}>
                <TestDraggable point={[0, 0]} />
            </Mafs>,
        );

        expect(screen.getByText("dragging: false")).toBeInTheDocument();
    });

    it("returns {dragging: true} when the mouse button is held down", async () => {
        render(
            <Mafs width={200} height={200}>
                <TestDraggable point={[0, 0]} />
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
                <TestDraggable point={[0, 0]} />
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

    it("calls onMove with the destination point when the user drags", async () => {
        // Arrange: a 200x200px graph with a 20-unit range in each dimension.
        // One graph unit = 10px.
        const mafsProps = {
            width: 200,
            height: 200,
            viewBox: {
                x: [-10, 10] as Interval,
                y: [-10, 10] as Interval,
                padding: 0,
            },
        };
        const onMoveSpy = jest.fn();
        render(
            <Mafs {...mafsProps}>
                <TestDraggable point={[0, 0]} onMove={onMoveSpy} />
            </Mafs>,
        );
        const dragHandle = screen.getByRole("button");

        // Act: click and hold the drag handle...
        mouseDownAt(dragHandle, 0, 0);
        // ...and then drag 10px right and 10px down
        moveMouseTo(dragHandle, 10, 10);

        // Assert: the draggable element was moved to (1, -1)
        expect(onMoveSpy).toHaveBeenCalledWith([1, -1]);
    });

    it("constrains the destination point using a constrainKeyboardMovement function", async () => {
        // Arrange: a 200x200px graph with a 20-unit range in each dimension.
        // One graph unit = 10px.
        const mafsProps = {
            width: 200,
            height: 200,
            viewBox: {
                x: [-10, 10] as Interval,
                y: [-10, 10] as Interval,
                padding: 0,
            },
        };
        const onMoveSpy = jest.fn();
        render(
            <Mafs {...mafsProps}>
                <TestDraggable
                    point={[0, 0]}
                    onMove={onMoveSpy}
                    constrainKeyboardMovement={(p) => snap([1, 1], p)}
                />
            </Mafs>,
        );
        const dragHandle = screen.getByRole("button");

        // Act
        await userEvent.tab();
        await userEvent.type(dragHandle, "{arrowright}");

        // Assert: the draggable element was moved one step to the right
        expect(onMoveSpy.mock.calls).toEqual([[[1, 0]]]);
    });

    it("constrains the destination point using a constrainKeyboardMovement object", async () => {
        // Arrange: a 200x200px graph with a 20-unit range in each dimension.
        // One graph unit = 10px.
        const mafsProps = {
            width: 200,
            height: 200,
            viewBox: {
                x: [-10, 10] as Interval,
                y: [-10, 10] as Interval,
                padding: 0,
            },
        };
        const onMoveSpy = jest.fn();
        render(
            <Mafs {...mafsProps}>
                <TestDraggable
                    point={[0, 0]}
                    onMove={onMoveSpy}
                    constrainKeyboardMovement={{
                        up: [1, 1],
                        down: [2, 2],
                        left: [3, 3],
                        right: [4, 4],
                    }}
                />
            </Mafs>,
        );
        const dragHandle = screen.getByRole("button");

        // Act
        await userEvent.tab();
        await userEvent.type(dragHandle, "{arrowright}");

        // Assert:
        expect(onMoveSpy.mock.calls).toEqual([[[4, 4]]]);
    });

    it("accounts for the user transform when measuring drag distance", async () => {
        // See: https://mafs.dev/guides/custom-components/contexts

        // Arrange: a 200x200px graph with a 20-unit range in each dimension.
        // One graph unit = 10px.
        const mafsProps = {
            width: 200,
            height: 200,
            viewBox: {
                x: [-10, 10] as Interval,
                y: [-10, 10] as Interval,
                padding: 0,
            },
        };
        const onMoveSpy = jest.fn();
        render(
            <Mafs {...mafsProps}>
                <Transform scale={2}>
                    <TestDraggable point={[10, 10]} onMove={onMoveSpy} />
                </Transform>
            </Mafs>,
        );
        const dragHandle = screen.getByRole("button");

        // Act: click and hold the drag handle...
        mouseDownAt(dragHandle, 0, 0);
        // ...and then drag 10px right and 10px down. Because of the
        // <Transform scale={2}>, this movement actually represents the vector
        // [0.5, -0.5] in graph coordinates.
        moveMouseTo(dragHandle, 10, 10);

        // Assert: the draggable element moved to (10.5, 9.5).
        // If you see...
        // - (5.5, 4.5), the userTransform was not applied to the pickupPoint.
        // - (21, 19), the inverse user transform was not applied to the move.
        // - (11, 9), neither userTransform nor the inverse was applied.
        expect(onMoveSpy).toHaveBeenCalledWith([10.5, 9.5]);
    });

    it("moves a draggable element with the keyboard", async () => {
        // Arrange: a 200x200px graph with a 20-unit range in each dimension.
        // One graph unit = 10px.
        const mafsProps = {
            width: 200,
            height: 200,
            viewBox: {
                x: [-10, 10] as Interval,
                y: [-10, 10] as Interval,
                padding: 0,
            },
        };
        const onMoveSpy = jest.fn();
        render(
            <Mafs {...mafsProps}>
                <TestDraggable
                    point={[0, 0]}
                    onMove={onMoveSpy}
                    constrainKeyboardMovement={(point) => [
                        Math.round(point[0]),
                        Math.round(point[1]),
                    ]}
                />
            </Mafs>,
        );
        // focus the draggable element
        await userEvent.tab();
        await userEvent.tab();

        // Pre-assert: the draggable element is actually focused
        expect(screen.getByRole("button")).toHaveFocus();

        // Act:
        await userEvent.keyboard("{arrowright}{arrowup}");

        // Assert: the element moved one step to the right and then one step up
        expect(onMoveSpy.mock.calls).toEqual([[[1, 0]], [[0, 1]]]);
    });
});

function mouseDownAt(element: Element, clientX: number, clientY: number) {
    // NOTE(benchristel): I could not figure out how to write these tests in
    // terms of userEvent. The tests for @use-gesture/react use fireEvent, so
    // I went with that approach.
    // eslint-disable-next-line testing-library/prefer-user-event
    fireEvent.mouseDown(element, {
        pointerId: 1,
        buttons: 1,
        clientX,
        clientY,
    });
}

function moveMouseTo(element: Element, clientX: number, clientY: number) {
    // NOTE(benchristel): I could not figure out how to write these tests in
    // terms of userEvent. The tests for @use-gesture/react use fireEvent, so
    // I went with that approach.
    // eslint-disable-next-line testing-library/prefer-user-event
    fireEvent.mouseMove(element, {
        pointerId: 1,
        buttons: 1,
        clientX,
        clientY,
    });
}
