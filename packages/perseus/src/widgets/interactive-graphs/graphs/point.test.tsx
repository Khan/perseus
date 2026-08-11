import {act, fireEvent, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import React from "react";

import * as Dependencies from "../../../dependencies";
import {testDependencies} from "../../../testing/test-dependencies";
import {MafsGraph} from "../mafs-graph";
import {
    actions,
    ADD_POINT,
    MOVE_POINT,
} from "../reducer/interactive-graph-action";
import {getBaseMafsGraphPropsForTests} from "../utils";

import type {MafsGraphProps} from "../mafs-graph";
import type {InteractiveGraphState} from "../types";
import type {UserEvent} from "@testing-library/user-event";

const baseMafsGraphProps = getBaseMafsGraphPropsForTests();

const baseLimitedPointState: InteractiveGraphState = {
    type: "point",
    numPoints: 1,
    coords: [[0, 0]],
    focusedPointIndex: null,
    hasBeenInteractedWith: false,
    interactionMode: "mouse",
    showKeyboardInteractionInvitation: false,
    showRemovePointButton: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
};

const baseUnlimitedPointState: InteractiveGraphState = {
    ...baseLimitedPointState,
    numPoints: "unlimited",
};

function renderPointGraphState(
    state: InteractiveGraphState,
    dispatch: MafsGraphProps["dispatch"] = () => {},
) {
    return render(
        <MafsGraph {...baseMafsGraphProps} state={state} dispatch={dispatch} />,
    );
}

// Drives a pointer drag on a point's hitbox. The drag is handled by
// @use-gesture, which (like use-draggable.test.tsx) only responds to fireEvent
// mouse events with explicit coords, not userEvent.
function dragPoint(hitbox: Element) {
    /* eslint-disable testing-library/prefer-user-event */
    fireEvent.mouseDown(hitbox, {pointerId: 1, buttons: 1, clientX: 0});
    fireEvent.mouseMove(hitbox, {pointerId: 1, buttons: 1, clientX: 40});
    fireEvent.mouseUp(hitbox, {pointerId: 1});
    /* eslint-enable testing-library/prefer-user-event */
}

describe("PointGraph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders a movable point for the single coordinate of a one-point graph", () => {
        // Arrange, Act
        renderPointGraphState(baseLimitedPointState);

        // Assert
        expect(screen.getAllByTestId("movable-point__center")).toHaveLength(1);
    });

    it("renders a movable point for each coordinate of a limited point graph", () => {
        // Arrange, Act
        renderPointGraphState({
            ...baseLimitedPointState,
            numPoints: 3,
            coords: [
                [-5, 0],
                [0, 0],
                [5, 0],
            ],
        });

        // Assert
        expect(screen.getAllByTestId("movable-point__center")).toHaveLength(3);
    });

    it("dispatches movePoint when a limited-graph point is moved with the keyboard", async () => {
        // Arrange
        const dispatch = jest.fn();
        renderPointGraphState(
            {
                ...baseLimitedPointState,
                numPoints: 1,
                coords: [[0, 0]],
                snapStep: [1, 1],
            },
            dispatch,
        );
        const handle = screen.getByTestId("movable-point__focusable-handle");

        // Act
        act(() => handle.focus());
        await userEvent.keyboard("[ArrowRight]");

        // Assert
        expect(dispatch).toHaveBeenCalledWith(
            actions.pointGraph.movePoint(0, [1, 0]),
        );
    });

    it("renders a movable point for each coordinate of an unlimited point graph", () => {
        // Arrange, Act
        renderPointGraphState({
            ...baseUnlimitedPointState,
            coords: [
                [1, 1],
                [2, 2],
            ],
        });

        // Assert
        expect(screen.getAllByTestId("movable-point__center")).toHaveLength(2);
    });

    it("renders no movable points for an unlimited point graph with no coordinates", () => {
        // Arrange, Act
        renderPointGraphState({...baseUnlimitedPointState, coords: []});

        // Assert
        expect(
            screen.queryByTestId("movable-point__center"),
        ).not.toBeInTheDocument();
    });

    it("does not crash when switching from a limited to an unlimited point graph", () => {
        // Arrange
        const {rerender} = renderPointGraphState(baseLimitedPointState);

        // Act, Assert
        expect(() =>
            rerender(
                <MafsGraph
                    {...baseMafsGraphProps}
                    state={baseUnlimitedPointState}
                    dispatch={() => {}}
                />,
            ),
        ).not.toThrow();
    });

    it("renders the points after switching back from an unlimited to a limited point graph", () => {
        // Arrange
        const unlimitedState: InteractiveGraphState = {
            ...baseUnlimitedPointState,
            coords: [
                [1, 1],
                [2, 2],
            ],
        };
        const limitedState: InteractiveGraphState = {
            ...unlimitedState,
            numPoints: 2,
        };
        const {rerender} = renderPointGraphState(unlimitedState);

        // Act
        rerender(
            <MafsGraph
                {...baseMafsGraphProps}
                state={limitedState}
                dispatch={() => {}}
            />,
        );

        // Assert
        expect(screen.getAllByTestId("movable-point__center")).toHaveLength(2);
    });

    describe("unlimited point graph interactions", () => {
        it("dispatches addPoint when the graph background is clicked", async () => {
            // Arrange
            const dispatch = jest.fn();
            renderPointGraphState(
                {...baseUnlimitedPointState, coords: []},
                dispatch,
            );

            // Act
            await userEvent.click(
                screen.getByTestId("unlimited-point-graph-add-target"),
            );

            // Assert
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({type: ADD_POINT}),
            );
        });

        it("dispatches movePoint when a point is moved with the keyboard", async () => {
            // Arrange
            const dispatch = jest.fn();
            renderPointGraphState(
                {
                    ...baseUnlimitedPointState,
                    coords: [[0, 0]],
                    snapStep: [1, 1],
                },
                dispatch,
            );
            const handle = screen.getByTestId(
                "movable-point__focusable-handle",
            );

            // Act
            act(() => handle.focus());
            await userEvent.keyboard("[ArrowRight]");

            // Assert
            expect(dispatch).toHaveBeenCalledWith(
                actions.pointGraph.movePoint(0, [1, 0]),
            );
        });

        it("dispatches focusPoint when a point receives focus", () => {
            // Arrange
            const dispatch = jest.fn();
            renderPointGraphState(
                {...baseUnlimitedPointState, coords: [[0, 0]]},
                dispatch,
            );

            // Act
            act(() =>
                screen.getByTestId("movable-point__focusable-handle").focus(),
            );

            // Assert
            expect(dispatch).toHaveBeenCalledWith(
                actions.pointGraph.focusPoint(0),
            );
        });

        it("dispatches clickPoint when a point is clicked", async () => {
            // Arrange
            const dispatch = jest.fn();
            renderPointGraphState(
                {...baseUnlimitedPointState, coords: [[0, 0]]},
                dispatch,
            );

            // Act
            await userEvent.click(screen.getByTestId("movable-point"));

            // Assert
            expect(dispatch).toHaveBeenCalledWith(
                actions.pointGraph.clickPoint(0),
            );
        });

        it("dispatches movePoint while a point is being dragged", () => {
            // Arrange
            const dispatch = jest.fn();
            renderPointGraphState(
                {...baseUnlimitedPointState, coords: [[0, 0]]},
                dispatch,
            );
            // Act
            dragPoint(screen.getByTestId("movable-point__hitbox"));

            // Assert
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({type: MOVE_POINT}),
            );
        });

        it("ignores the click that fires immediately after a drag (no point added)", () => {
            // Arrange
            const dispatch = jest.fn();
            renderPointGraphState(
                {...baseUnlimitedPointState, coords: [[0, 0]]},
                dispatch,
            );
            // Act: drag a point, then fire the phantom click the browser emits
            // at the drag's end (LEMS-2873). It must not add a new point. We use
            // fireEvent.click to emit only the click (userEvent.click would also
            // fire mousedown, starting a new drag interaction).
            dragPoint(screen.getByTestId("movable-point__hitbox"));
            dispatch.mockClear();
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.click(
                screen.getByTestId("unlimited-point-graph-add-target"),
            );

            // Assert
            expect(dispatch).not.toHaveBeenCalledWith(
                expect.objectContaining({type: ADD_POINT}),
            );
        });

        it("focuses the point at focusedPointIndex on mount", () => {
            // Arrange, Act
            renderPointGraphState({
                ...baseUnlimitedPointState,
                coords: [
                    [0, 0],
                    [2, 2],
                ],
                focusedPointIndex: 1,
            });

            // Assert: the focused point's handle receives focus via the effect
            expect(
                screen.getAllByTestId("movable-point__focusable-handle")[1],
            ).toHaveFocus();
        });
    });
});
