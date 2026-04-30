import {mockStrings} from "../../../strings";
import {actions} from "../reducer/interactive-graph-action";

import {getAnnouncementForAction} from "./central-announcer";

import type {
    InteractiveGraphState,
    PointGraphState,
    PolygonGraphState,
} from "../types";

const basePointState: PointGraphState = {
    hasBeenInteractedWith: false,
    showRemovePointButton: false,
    interactionMode: "mouse",
    showKeyboardInteractionInvitation: false,
    type: "point",
    numPoints: "unlimited",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    focusedPointIndex: null,
    snapStep: [1, 1],
    coords: [],
};

const basePolygonState: PolygonGraphState = {
    hasBeenInteractedWith: false,
    showRemovePointButton: false,
    interactionMode: "keyboard",
    showKeyboardInteractionInvitation: false,
    type: "polygon",
    numSides: "unlimited",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    focusedPointIndex: null,
    snapStep: [1, 1],
    coords: [
        [0, 0],
        [3, 0],
        [3, 3],
    ],
    closedPolygon: false,
    showAngles: false,
    showSides: false,
    snapTo: "grid",
};

describe("getAnnouncementForAction", () => {
    it("returns a 'point added' announcement when an ADD_POINT action is dispatched", () => {
        // Arrange
        const action = actions.pointGraph.addPoint([2, 5]);

        // Act
        const message = getAnnouncementForAction(
            action,
            basePointState,
            basePointState,
            mockStrings,
            "en",
        );

        // Assert
        expect(message).toBe("Point added at 2 comma 5.");
    });

    it("formats fractional coordinates via srFormatNumber in the announcement", () => {
        // Arrange
        const action = actions.pointGraph.addPoint([1.5, -0.25]);

        // Act
        const message = getAnnouncementForAction(
            action,
            basePointState,
            basePointState,
            mockStrings,
            "en",
        );

        // Assert
        expect(message).toBe("Point added at 1.5 comma -0.25.");
    });

    it("returns 'Shape closed.' when a CLOSE_POLYGON action is dispatched", () => {
        // Arrange
        const action = actions.polygon.closePolygon();
        const nextState: InteractiveGraphState = {
            ...basePolygonState,
            closedPolygon: true,
        };

        // Act
        const message = getAnnouncementForAction(
            action,
            basePolygonState,
            nextState,
            mockStrings,
            "en",
        );

        // Assert
        expect(message).toBe("Shape closed.");
    });

    it("returns null for actions outside the central handler's scope", () => {
        // Arrange
        const action = actions.pointGraph.movePoint(0, [4, 4]);

        // Act
        const message = getAnnouncementForAction(
            action,
            basePointState,
            basePointState,
            mockStrings,
            "en",
        );

        // Assert
        expect(message).toBeNull();
    });
});
