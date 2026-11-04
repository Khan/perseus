import {DEFAULT_OFFERED_OPTIONS} from "../page/controls";

import {describePreview} from "./model-context";

import type {PreviewState} from "./model-context";

const hintsState = {
    hintsVisible: 1,
    total: 3,
    visibleCount: 1,
    isFinalHelpPage: false,
};

function state(changes: Partial<PreviewState>): PreviewState {
    return {
        itemId: "abc",
        revision: 2,
        options: DEFAULT_OFFERED_OPTIONS,
        hintsState,
        lastCheck: null,
        ...changes,
    };
}

describe("describePreview", () => {
    it("names the draft and says no answer has been checked", () => {
        // Arrange, Act
        const text = describePreview(state({}));

        // Assert
        expect(text).toBe(
            "The person is previewing draft abc (revision 2) in the chat, " +
                "as a learner would see it.\n" +
                "The person hasn't checked an answer on this revision.\n" +
                "Hints: 1 of 3 revealed.\n" +
                "Preview options on: none.",
        );
    });

    it("includes the checked answer and its result", () => {
        // Arrange
        const lastCheck = {
            userInput: {"numeric-input 1": {currentValue: "7"}},
            result: "Incorrect.",
        };

        // Act
        const text = describePreview(state({lastCheck}));

        // Assert
        expect(text).toContain(
            'The person checked this answer: {"numeric-input 1":' +
                '{"currentValue":"7"}}. Result: Incorrect.',
        );
    });

    it("lists the preview options that are on", () => {
        // Arrange
        const options = {
            ...DEFAULT_OFFERED_OPTIONS,
            reviewMode: true,
            showSolutions: "all" as const,
        };

        // Act
        const text = describePreview(state({options}));

        // Assert
        expect(text).toContain(
            "Preview options on: review mode, showing solutions (all).",
        );
    });

    it("says when the item has no hints", () => {
        // Arrange
        const noHints = {...hintsState, hintsVisible: 0, total: 0};

        // Act
        const text = describePreview(state({hintsState: noHints}));

        // Assert
        expect(text).toContain("Hints: the item has none.");
    });
});
