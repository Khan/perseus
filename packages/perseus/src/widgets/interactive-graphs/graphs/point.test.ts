import {mockStrings} from "../../../strings";

import {describePointGraph} from "./point";

import type {PointGraphState} from "../types";

describe("describePointGraph", () => {
    const baseState: PointGraphState = {
        type: "point",
        coords: [],
        focusedPointIndex: null,
        hasBeenInteractedWith: false,
        interactionMode: "keyboard",
        range: [
            [0, 0],
            [0, 0],
        ] as const,
        showKeyboardInteractionInvitation: false,
        showRemovePointButton: false,
        snapStep: [0, 0] as const,
    };

    it(`returns "No interactive elements" for a graph with no points`, () => {
        const state: PointGraphState = {...baseState, coords: []};
        expect(describePointGraph(state, mockStrings)).toBe(
            "No interactive elements",
        );
    });

    it("describes one point", () => {
        const state: PointGraphState = {...baseState, coords: [[3, 5]]};
        expect(describePointGraph(state, mockStrings)).toBe(
            "Interactive elements: Point at 3 comma 5",
        );
    });

    it("separates multiple point descriptions by commas", () => {
        const state: PointGraphState = {
            ...baseState,
            coords: [
                [3, 5],
                [2, 4],
            ],
        };
        expect(describePointGraph(state, mockStrings)).toBe(
            "Interactive elements: Point at 3 comma 5, Point at 2 comma 4",
        );
    });

    it("rounds to 3 decimal places", () => {
        const state: PointGraphState = {
            ...baseState,
            coords: [[-1.1234, 3.5678]],
        };
        expect(describePointGraph(state, mockStrings)).toBe(
            "Interactive elements: Point at -1.123 comma 3.568",
        );
    });
});
