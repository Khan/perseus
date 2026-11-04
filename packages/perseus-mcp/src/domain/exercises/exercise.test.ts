import {placeItems} from "./exercise";

import type {Exercise} from "./exercise";

const NOW = new Date("2026-01-02T00:00:00Z");

function exerciseOf(problemTypes: Exercise["problemTypes"]): Exercise {
    return {
        exerciseId: "c",
        name: "Test",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
        problemTypes,
    };
}

describe("placeItems", () => {
    it("moves items to the end of another problem type, keeping contentIds", () => {
        // Arrange
        const exercise = exerciseOf([
            {name: "A", items: [{itemId: "1", contentId: "x"}, {itemId: "2"}]},
            {name: "B", items: [{itemId: "3"}]},
        ]);

        // Act
        const placed = placeItems(exercise, ["1"], "B", NOW);

        // Assert
        expect(placed.problemTypes).toEqual([
            {name: "A", items: [{itemId: "2"}]},
            {name: "B", items: [{itemId: "3"}, {itemId: "1", contentId: "x"}]},
        ]);
    });

    it("adds a new problem type and removes one left empty", () => {
        // Arrange
        const exercise = exerciseOf([{name: "A", items: [{itemId: "1"}]}]);

        // Act
        const placed = placeItems(exercise, ["1"], "New", NOW);

        // Assert
        expect(placed.problemTypes).toEqual([
            {name: "New", items: [{itemId: "1"}]},
        ]);
    });

    it("adds items that weren't in the exercise", () => {
        // Arrange
        const exercise = exerciseOf([{name: "A", items: [{itemId: "1"}]}]);

        // Act
        const placed = placeItems(exercise, ["9"], "A", NOW);

        // Assert
        expect(placed.problemTypes[0].items).toEqual([
            {itemId: "1"},
            {itemId: "9"},
        ]);
    });
});
