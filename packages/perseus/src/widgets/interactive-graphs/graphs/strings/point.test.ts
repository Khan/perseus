import {mockPerseusI18nContext} from "../../../../components/i18n-context";

import {describePointGraph} from "./point";

import type {PointGraphState} from "../../types";

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
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "No interactive elements",
        );
    });

    it("describes one point", () => {
        const state: PointGraphState = {...baseState, coords: [[3, 5]]};
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point 1 at 3 comma 5.",
        );
    });

    it("separates multiple point descriptions with spaces", () => {
        const state: PointGraphState = {
            ...baseState,
            coords: [
                [3, 5],
                [2, 4],
            ],
        };
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point 1 at 3 comma 5. Point 2 at 2 comma 4.",
        );
    });

    it("rounds to 3 decimal places", () => {
        const state: PointGraphState = {
            ...baseState,
            coords: [[-1.1234, 3.5678]],
        };
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point 1 at -1.123 comma 3.568.",
        );
    });

    it("uses the custom point label when pointLabels is set", () => {
        const state: PointGraphState = {
            ...baseState,
            coords: [[0, 0]],
            pointLabels: ["T"],
        };
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point T at 0 comma 0.",
        );
    });

    it("falls back to numeric defaults for indices without a custom label", () => {
        const state: PointGraphState = {
            ...baseState,
            coords: [
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["T"],
        };
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point T at 0 comma 0. Point 2 at 1 comma 1.",
        );
    });

    it("falls back to 'Point N' when showPointLabels is true and pointLabels is omitted", () => {
        const state: PointGraphState = {
            ...baseState,
            showPointLabels: true,
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        };
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point 1 at 0 comma 0. Point 2 at 1 comma 1. Point 3 at 2 comma 2.",
        );
    });

    it("uses pointLabels when showPointLabels is true and pointLabels is provided", () => {
        const state: PointGraphState = {
            ...baseState,
            showPointLabels: true,
            coords: [
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["P", "Q"],
        };
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point P at 0 comma 0. Point Q at 1 comma 1.",
        );
    });

    it("falls back to 'Point N' for indices without a pointLabels entry", () => {
        const state: PointGraphState = {
            ...baseState,
            showPointLabels: true,
            coords: [
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["P"],
        };
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point P at 0 comma 0. Point 2 at 1 comma 1.",
        );
    });

    it("falls back to 'Point N' for empty-string pointLabels entries", () => {
        const state: PointGraphState = {
            ...baseState,
            coords: [
                [0, 0],
                [1, 1],
            ],
            pointLabels: ["", "T"],
        };
        expect(describePointGraph(state, mockPerseusI18nContext)).toBe(
            "Interactive elements: Point 1 at 0 comma 0. Point T at 1 comma 1.",
        );
    });
});
