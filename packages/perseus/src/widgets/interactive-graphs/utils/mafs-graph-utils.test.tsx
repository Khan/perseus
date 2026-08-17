import {getDefaultFigureForType} from "@khanacademy/perseus-core";

import {actions} from "../reducer/interactive-graph-action";

import {
    describedByIds,
    getLockedFigureClipRuns,
    handleBlurEvent,
    handleFocusEvent,
    handleKeyboardEvent,
} from "./mafs-graph-utils";

import type {InteractiveGraphState} from "../types";
import type {LockedFigure} from "@khanacademy/perseus-core";
import type * as React from "react";

// The handlers only read a couple of fields off the synthetic event, so we
// build minimal stand-ins rather than full React synthetic events.
function focusEventOn(target: Element) {
    // eslint-disable-next-line no-restricted-syntax
    return {target} as React.FocusEvent;
}

function keyboardEvent(props: {key: string; shiftKey?: boolean}) {
    // eslint-disable-next-line no-restricted-syntax
    return {shiftKey: false, ...props} as React.KeyboardEvent;
}

const unlimitedPointState: InteractiveGraphState = {
    type: "point",
    numPoints: "unlimited",
    focusedPointIndex: 0,
    hasBeenInteractedWith: true,
    showRemovePointButton: false,
    interactionMode: "mouse",
    showKeyboardInteractionInvitation: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [[4, 5]],
};

// A non-unlimited graph: isUnlimitedGraphState is false, so the handlers
// should be no-ops.
const limitedPointState: InteractiveGraphState = {
    ...unlimitedPointState,
    numPoints: 1,
};

const unlimitedOpenPolygonState: InteractiveGraphState = {
    type: "polygon",
    numSides: "unlimited",
    closedPolygon: false,
    showAngles: false,
    showSides: false,
    snapTo: "grid",
    focusedPointIndex: 0,
    hasBeenInteractedWith: true,
    showRemovePointButton: false,
    interactionMode: "mouse",
    showKeyboardInteractionInvitation: false,
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    coords: [
        [0, 0],
        [2, 2],
        [4, 0],
    ],
};

const unlimitedClosedPolygonState: InteractiveGraphState = {
    ...unlimitedOpenPolygonState,
    closedPolygon: true,
};

// Focuses a movable-point handle so the delete branch of handleKeyboardEvent
// runs, and returns a cleanup function.
function focusMovablePointHandle(): () => void {
    const handle = document.createElement("button");
    handle.classList.add("movable-point__focusable-handle");
    document.body.appendChild(handle);
    handle.focus();
    return () => handle.remove();
}

describe("getLockedFigureClipRuns", () => {
    function point(ariaLabel: string): LockedFigure {
        return {...getDefaultFigureForType("point"), ariaLabel};
    }
    function vector(ariaLabel: string): LockedFigure {
        return {...getDefaultFigureForType("vector"), ariaLabel};
    }
    function label(text: string): LockedFigure {
        return {...getDefaultFigureForType("label"), text};
    }

    it("returns no runs for an empty list", () => {
        // Arrange, Act
        const runs = getLockedFigureClipRuns([]);

        // Assert
        expect(runs).toEqual([]);
    });

    it("keeps points and non-points in author order as separate runs", () => {
        // Arrange
        const figures = [point("A"), vector("v1"), vector("v2"), point("B")];

        // Act
        const runs = getLockedFigureClipRuns(figures);

        // Assert
        // A point run, then a clipped run of vectors, then a point run —
        // preserving the authored order across the clip boundary.
        expect(runs.map((run) => run.clipped)).toEqual([false, true, false]);
        expect(runs.map((run) => run.figures)).toEqual([
            [figures[0]],
            [figures[1], figures[2]],
            [figures[3]],
        ]);
    });

    it("groups adjacent figures of the same clip treatment into one run", () => {
        // Arrange
        const figures = [vector("v1"), vector("v2"), vector("v3")];

        // Act
        const runs = getLockedFigureClipRuns(figures);

        // Assert
        expect(runs).toHaveLength(1);
        expect(runs[0]).toEqual({clipped: true, figures});
    });

    it("marks a run of only points as unclipped", () => {
        // Arrange
        const figures = [point("A"), point("B")];

        // Act
        const runs = getLockedFigureClipRuns(figures);

        // Assert
        expect(runs).toHaveLength(1);
        expect(runs[0].clipped).toBe(false);
    });

    it("skips label figures so they don't split a run", () => {
        // Arrange
        // Labels render in the separate labels layer, so a label between two
        // points must not break them into two runs (which would emit an empty
        // clip wrapper).
        const points = [point("A"), point("B")];
        const figures = [points[0], label("hello"), points[1]];

        // Act
        const runs = getLockedFigureClipRuns(figures);

        // Assert
        expect(runs).toHaveLength(1);
        expect(runs[0]).toEqual({clipped: false, figures: points});
    });
});

describe("describedByIds", () => {
    it("joins truthy ids with a space", () => {
        // Arrange, Act
        const result = describedByIds("a", "b", "c");

        // Assert
        expect(result).toBe("a b c");
    });

    it("skips falsy values", () => {
        // Arrange, Act
        const result = describedByIds("a", false, null, undefined, 0, "b");

        // Assert
        expect(result).toBe("a b");
    });

    it("returns undefined when there are no truthy ids", () => {
        // Arrange, Act
        const result = describedByIds(false, null, undefined, 0);

        // Assert
        expect(result).toBeUndefined();
    });
});

describe("handleFocusEvent", () => {
    it("invites keyboard interaction when the mouse-mode graph is focus-visible", () => {
        // Arrange
        const dispatch = jest.fn();
        const target = document.createElement("div");
        target.classList.add("mafs-graph");
        // The invitation is gated on `:focus-visible`, so the element must
        // actually be focused. jsdom lacks `:focus-visible`, so
        // `hasFocusVisible` falls back to `:focus`, which only matches a
        // focused, in-document element.
        target.tabIndex = 0;
        document.body.appendChild(target);
        target.focus();

        // Act
        handleFocusEvent(focusEventOn(target), unlimitedPointState, dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith(
            actions.global.changeKeyboardInvitationVisibility(true),
        );

        // Cleanup
        target.remove();
    });

    it("does nothing when the graph is not an unlimited graph", () => {
        // Arrange
        const dispatch = jest.fn();
        const target = document.createElement("div");
        target.classList.add("mafs-graph");

        // Act
        handleFocusEvent(focusEventOn(target), limitedPointState, dispatch);

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });

    it("does nothing when a child element (not the graph) is focused", () => {
        // Arrange
        const dispatch = jest.fn();
        const target = document.createElement("div");

        // Act
        handleFocusEvent(focusEventOn(target), unlimitedPointState, dispatch);

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });

    it("does nothing when the interaction mode is not mouse", () => {
        // Arrange
        const dispatch = jest.fn();
        const target = document.createElement("div");
        target.classList.add("mafs-graph");

        // Act
        handleFocusEvent(
            focusEventOn(target),
            {...unlimitedPointState, interactionMode: "keyboard"},
            dispatch,
        );

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });
});

describe("handleBlurEvent", () => {
    it("hides the keyboard invitation on an unlimited graph", () => {
        // Arrange
        const dispatch = jest.fn();

        // Act
        handleBlurEvent(
            focusEventOn(document.createElement("div")),
            unlimitedPointState,
            dispatch,
        );

        // Assert
        expect(dispatch).toHaveBeenCalledWith(
            actions.global.changeKeyboardInvitationVisibility(false),
        );
    });

    it("does nothing on a limited graph", () => {
        // Arrange
        const dispatch = jest.fn();

        // Act
        handleBlurEvent(
            focusEventOn(document.createElement("div")),
            limitedPointState,
            dispatch,
        );

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });
});

describe("handleKeyboardEvent", () => {
    it("enters keyboard mode on Shift+Enter", () => {
        // Arrange
        const dispatch = jest.fn();

        // Act
        handleKeyboardEvent(
            keyboardEvent({key: "Enter", shiftKey: true}),
            unlimitedPointState,
            dispatch,
        );

        // Assert
        expect(dispatch).toHaveBeenCalledWith(
            actions.global.changeInteractionMode("keyboard"),
        );
    });

    it("adds a point when 'a' is pressed in keyboard mode", () => {
        // Arrange
        const dispatch = jest.fn();

        // Act
        handleKeyboardEvent(
            keyboardEvent({key: "a"}),
            {...unlimitedPointState, interactionMode: "keyboard"},
            dispatch,
        );

        // Assert
        expect(dispatch).toHaveBeenCalledWith(
            actions.pointGraph.addPoint([0, 0]),
        );
    });

    it("does not add a point when 'a' is pressed in mouse mode", () => {
        // Arrange
        const dispatch = jest.fn();

        // Act
        handleKeyboardEvent(
            keyboardEvent({key: "a"}),
            unlimitedPointState,
            dispatch,
        );

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });

    it.each(["Backspace", "Delete"])(
        "deletes the focused point on %s when a point handle is focused",
        (key) => {
            // Arrange
            const dispatch = jest.fn();
            const cleanup = focusMovablePointHandle();

            // Act
            handleKeyboardEvent(
                keyboardEvent({key}),
                unlimitedPointState,
                dispatch,
            );

            // Assert
            expect(dispatch).toHaveBeenCalledWith(
                actions.global.deleteIntent(),
            );

            // Cleanup
            cleanup();
        },
    );

    it("blurs the focused handle after a delete key, even when nothing is deleted", () => {
        // Arrange
        const dispatch = jest.fn();
        const cleanup = focusMovablePointHandle();

        // Act
        handleKeyboardEvent(
            keyboardEvent({key: "Backspace"}),
            // Closed polygon: no delete dispatched, but the handle still blurs.
            unlimitedClosedPolygonState,
            dispatch,
        );

        // Assert
        expect(dispatch).not.toHaveBeenCalledWith(
            actions.global.deleteIntent(),
        );
        expect(document.activeElement).toBe(document.body);

        // Cleanup
        cleanup();
    });

    it("does not delete on Backspace when no point handle is focused", () => {
        // Arrange
        const dispatch = jest.fn();

        // Act
        handleKeyboardEvent(
            keyboardEvent({key: "Backspace"}),
            unlimitedPointState,
            dispatch,
        );

        // Assert
        expect(dispatch).not.toHaveBeenCalledWith(
            actions.global.deleteIntent(),
        );
    });

    it("deletes on Backspace for an open polygon when a point handle is focused", () => {
        // Arrange
        const dispatch = jest.fn();
        const cleanup = focusMovablePointHandle();

        // Act
        handleKeyboardEvent(
            keyboardEvent({key: "Backspace"}),
            unlimitedOpenPolygonState,
            dispatch,
        );

        // Assert
        expect(dispatch).toHaveBeenCalledWith(actions.global.deleteIntent());

        // Cleanup
        cleanup();
    });

    it("does not delete on Backspace for a closed polygon", () => {
        // Arrange
        const dispatch = jest.fn();
        const cleanup = focusMovablePointHandle();

        // Act
        handleKeyboardEvent(
            keyboardEvent({key: "Backspace"}),
            unlimitedClosedPolygonState,
            dispatch,
        );

        // Assert
        expect(dispatch).not.toHaveBeenCalledWith(
            actions.global.deleteIntent(),
        );

        // Cleanup
        cleanup();
    });

    it("does nothing on a limited graph", () => {
        // Arrange
        const dispatch = jest.fn();

        // Act
        handleKeyboardEvent(
            keyboardEvent({key: "Enter", shiftKey: true}),
            limitedPointState,
            dispatch,
        );

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });
});
