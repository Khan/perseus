import {hashBasedShuffle} from "../utils/hash-shuffle";

import type {RadioChoiceWithMetadata} from "../radio.class.new";

describe("hashBasedShuffle", () => {
    const createChoice = (
        id: string,
        originalIndex: number,
        content: string = `Choice ${originalIndex + 1}`,
    ): RadioChoiceWithMetadata => ({
        id,
        originalIndex,
        content,
        correct: false,
    });

    const createChoices = (): RadioChoiceWithMetadata[] => [
        createChoice("choice-0-1a2b3c4d", 0, "First choice"),
        createChoice("choice-1-5e6f7g8h", 1, "Second choice"),
        createChoice("choice-2-9i0j1k2l", 2, "Third choice"),
        createChoice("choice-3-3m4n5o6p", 3, "Fourth choice"),
    ];

    it("returns the same order for the same seed", () => {
        const choices = createChoices();
        const seed = `12345`;

        const result1 = hashBasedShuffle(choices, seed);
        const result2 = hashBasedShuffle(choices, seed);

        expect(result1.map((c) => c.originalIndex)).toEqual(
            result2.map((c) => c.originalIndex),
        );
    });

    it("returns different orders for different seeds", () => {
        const choices = createChoices();

        const result1 = hashBasedShuffle(choices, `12345`);
        const result2 = hashBasedShuffle(choices, `67890`);

        expect(result1.map((c) => c.originalIndex)).not.toEqual(
            result2.map((c) => c.originalIndex),
        );
    });

    it("uses choice ID for shuffling when available", () => {
        const choicesWithIds = [
            createChoice("choice-0-unique1a", 0),
            createChoice("choice-1-unique2b", 1),
            createChoice("choice-2-unique3c", 2),
        ];

        const choicesWithDifferentIds = [
            createChoice("choice-0-different1", 0),
            createChoice("choice-1-different2", 1),
            createChoice("choice-2-different3", 2),
        ];

        const result1 = hashBasedShuffle(choicesWithIds, `12345`);
        const result2 = hashBasedShuffle(choicesWithDifferentIds, `12345`);
        // Different IDs should produce different shuffle orders
        expect(result1.map((c) => c.originalIndex)).not.toEqual(
            result2.map((c) => c.originalIndex),
        );
    });

    it("handles choices without IDs by falling back to originalIndex", () => {
        const choicesWithoutIds: RadioChoiceWithMetadata[] = [
            {originalIndex: 0, content: "First", correct: false},
            {originalIndex: 1, content: "Second", correct: false},
            {originalIndex: 2, content: "Third", correct: false},
        ];

        const result = hashBasedShuffle(choicesWithoutIds, `12345`);

        // Should not throw and should return all choices
        expect(result).toHaveLength(3);
        expect(
            result.every((choice) => choicesWithoutIds.includes(choice)),
        ).toBe(true);
    });

    it("preserves all choices in the result", () => {
        const choices = createChoices();
        const result = hashBasedShuffle(choices, `12345`);

        expect(result).toHaveLength(choices.length);

        // Check that all original choices are present
        choices.forEach((originalChoice) => {
            expect(result).toContainEqual(originalChoice);
        });
    });

    it("produces different orders than the original for most seeds", () => {
        const choices = createChoices();
        let differentOrderCount = 0;
        const testSeeds = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`];

        testSeeds.forEach((seed) => {
            const result = hashBasedShuffle(choices, seed);
            const originalOrder = [0, 1, 2, 3];
            const shuffledOrder = result.map((c) => c.originalIndex);

            if (!arraysEqual(originalOrder, shuffledOrder)) {
                differentOrderCount++;
            }
        });

        // Most seeds should produce a different order than the original
        expect(differentOrderCount).toBeGreaterThan(testSeeds.length / 2);
    });

    it("produces consistent results with realistic choice IDs", () => {
        // Test with IDs that look like what the migration function would generate
        const realisticChoices = [
            createChoice("choice-0-1a2b3c4d", 0, "The answer is A"),
            createChoice("choice-1-5e6f7g8h", 1, "The answer is B"),
            createChoice("choice-2-9i0j1k2l", 2, "The answer is C"),
            createChoice("choice-3-3m4n5o6p", 3, "The answer is D"),
        ];

        const seed = `42`;
        const result1 = hashBasedShuffle(realisticChoices, seed);
        const result2 = hashBasedShuffle(realisticChoices, seed);

        // Should be deterministic
        expect(result1.map((c) => c.originalIndex)).toEqual(
            result2.map((c) => c.originalIndex),
        );

        // Should actually shuffle (not be in original order)
        const originalOrder = [0, 1, 2, 3];
        const shuffledOrder = result1.map((c) => c.originalIndex);
        expect(shuffledOrder).not.toEqual(originalOrder);
    });
});

function arraysEqual<T>(a: T[], b: T[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
}
