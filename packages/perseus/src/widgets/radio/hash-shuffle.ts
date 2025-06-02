import type {RadioChoiceWithMetadata} from "./radio-component";

/**
 * Simple hash function that converts a string to a 32-bit integer
 * Uses djb2 hash algorithm for better distribution
 */
function hashString(str: string): number {
    let hash = 5381;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; // hash * 33 + char
    }

    return Math.abs(hash);
}

/**
 * Creates a hash-based shuffle key for a choice
 */
function createShuffleKey(choice: RadioChoiceWithMetadata, seed: number): string {
    // Use choice ID if available, otherwise fall back to originalIndex
    const choiceIdentifier = choice.id || `choice-${choice.originalIndex}`;

    // Create a unique key combining seed and choice identifier
    // Add some additional entropy to ensure good distribution
    return `${seed}-${choiceIdentifier}-${choice.originalIndex}`;
}

/**
 * Hash-based shuffle function that provides deterministic shuffling
 * based on choice IDs and a seed value.
 *
 * This replaces the Fisher-Yates algorithm to avoid index-based bugs
 * and provides more stable shuffling when choices are modified.
 *
 * @param choices - Array of radio choices with metadata
 * @param seed - Seed value for deterministic shuffling
 * @returns Shuffled array of choices
 */
export function hashBasedShuffle(
    choices: ReadonlyArray<RadioChoiceWithMetadata>,
    seed: number,
): RadioChoiceWithMetadata[] {
    // Create array of choices with their hash-based sort keys
    const choicesWithKeys = choices.map((choice) => {
        const shuffleKey = createShuffleKey(choice, seed);
        const sortKey = hashString(shuffleKey);

        return {
            choice,
            sortKey,
        };
    });

    // Sort by hash values to create deterministic "random" order
    choicesWithKeys.sort((a, b) => a.sortKey - b.sortKey);

    // Extract just the choices from the sorted array
    return choicesWithKeys.map(item => item.choice);
}
