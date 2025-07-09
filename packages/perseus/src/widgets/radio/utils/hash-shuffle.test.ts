import {hashBasedShuffle} from "./hash-shuffle";

import type {RadioChoiceWithMetadata} from "../multiple-choice-widget.new";

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
        createChoice("1703123456789", 0, "First choice"),
        createChoice("1703123456790", 1, "Second choice"),
        createChoice("1703123456791", 2, "Third choice"),
        createChoice("1703123456792", 3, "Fourth choice"),
    ];

    describe("deterministic behavior", () => {
        it("returns the same order for the same seed", () => {
            // Arrange
            const choices = createChoices();
            const seed = `12345`;

            // Act
            const result1 = hashBasedShuffle(choices, seed);
            const result2 = hashBasedShuffle(choices, seed);

            // Assert
            expect(result1.map((c) => c.originalIndex)).toEqual(
                result2.map((c) => c.originalIndex),
            );
        });

        it("returns different orders for different seeds", () => {
            // Arrange
            const choices = createChoices();

            // Act
            const result1 = hashBasedShuffle(choices, `12345`);
            const result2 = hashBasedShuffle(choices, `67890`);

            // Assert
            expect(result1.map((c) => c.originalIndex)).not.toEqual(
                result2.map((c) => c.originalIndex),
            );
        });
    });

    describe("choice ID behavior", () => {
        it("uses choice ID for shuffling when available", () => {
            // Arrange
            const choicesWithIds = [
                createChoice("1703123456789", 0),
                createChoice("1703123456790", 1),
                createChoice("1703123456791", 2),
            ];
            const seed = `12345`

            // Act
            const shuffleResult = hashBasedShuffle(choicesWithIds, seed);

            // Assert
            expect(arraysEqual(choicesWithIds, shuffleResult)).toBe(false);
        });

        it("handles choices without IDs by falling back to originalIndex", () => {
            // Arrange
            const choicesWithoutIds: RadioChoiceWithMetadata[] = [
                {originalIndex: 0, content: "First", correct: false},
                {originalIndex: 1, content: "Second", correct: false},
                {originalIndex: 2, content: "Third", correct: false},
            ];

            // Act
            const shuffleResult = hashBasedShuffle(choicesWithoutIds, `12345`);

            // Assert
            expect(arraysEqual(choicesWithoutIds, shuffleResult)).toBe(false);
        });
    });

    describe("result integrity", () => {
        it("preserves all choices in the result", () => {
            // Arrange
            const choices = createChoices();

            // Act
            const result = hashBasedShuffle(choices, `12345`);

            // Assert
            expect(result).toHaveLength(choices.length);
        });

        it("contains all original choices in the result", () => {
            // Arrange
            const choices = createChoices();

            // Act
            const result = hashBasedShuffle(choices, `12345`);

            // Assert
            choices.forEach((originalChoice) => {
                expect(result).toContainEqual(originalChoice);
            });
        });
    });

    describe("shuffling behavior", () => {
        it("produces different orders than the original for most seeds", () => {
            // Arrange
            const choices = createChoices();
            let differentOrderCount = 0;
            const testSeeds = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`];

            // Act
            testSeeds.forEach((seed) => {
                const result = hashBasedShuffle(choices, seed);
                const originalOrder = [0, 1, 2, 3];
                const shuffledOrder = result.map((c) => c.originalIndex);

                if (!arraysEqual(originalOrder, shuffledOrder)) {
                    differentOrderCount++;
                }
            });

            // Assert
            expect(differentOrderCount).toBeGreaterThanOrEqual(testSeeds.length * 0.9);
        });
    });
});

function arraysEqual<T>(a: T[], b: T[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
}
