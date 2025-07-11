import {generateChoiceId, seededRNG} from "@khanacademy/perseus-core";

import type {RadioChoiceWithMetadata} from "../multiple-choice-widget.new";

/**
 * Creates a hash-based shuffle key for a choice
 */
function createShuffleKey(
    choice: RadioChoiceWithMetadata,
    seed: string,
): string {
    // Use choice ID if available, otherwise generate one
    const choiceIdentifier =
        choice.id || generateChoiceId(choice.content, choice.originalIndex);

    // Simple combination that ensures choice ID differences are preserved
    return `${choiceIdentifier}-${seed}`;
}

/**
 * MurmurHash3 32-bit implementation
 * Implementation reference: https://mojoauth.com/hashing/murmurhash-in-typescript
 * Optimized for string inputs without external dependencies
 */
function hashStringToNumber(str: string, seed: number = 0): number {
    let h1 = seed ^ str.length;
    const c1 = 0xcc9e2d51;
    const c2 = 0x1b873593;

    for (let i = 0; i < str.length; i++) {
        let k1 = str.charCodeAt(i);
        k1 = k1 * c1;
        k1 = (k1 << 15) | (k1 >>> 17); // Rotate left
        k1 = k1 * c2;
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19); // Rotate left
        h1 = h1 * 5 + 0xe6546b64; // Mix
    }
    h1 ^= str.length;
    h1 ^= h1 >>> 16; // Finalization
    h1 = h1 * 0x85ebca6b;
    h1 ^= h1 >>> 13;
    h1 = h1 * 0xc2b2ae35;
    h1 ^= h1 >>> 16;
    return h1 >>> 0;
}

/**
 * Hash-based shuffle function that provides deterministic shuffling
 * based on choice IDs and a seed value, using Perseus's seededRNG for additional randomness.
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
    seed: string,
): RadioChoiceWithMetadata[] {
    // Convert string seed to number for hash function
    const numericSeed = hashStringToNumber(seed);

    // Create array of choices with their hash-based sort keys
    // We'll use a more robust approach that includes the original index
    // to ensure we get proper shuffling even when sort keys are similar
    return (
        choices
            .map((choice, index) => {
                const shuffleKey = createShuffleKey(choice, seed);
                // Create a unique seed for each choice based purely on its content and the seed
                const choiceHash = hashStringToNumber(shuffleKey, numericSeed);
                const rng = seededRNG(choiceHash);
                // Get a random value for this specific choice
                const sortKey = rng();

                // Add some additional entropy by combining with a secondary hash
                // This helps avoid cases where the sort keys happen to be in order
                const secondaryHash = hashStringToNumber(
                    `${shuffleKey}-${index}`,
                    numericSeed + 1,
                );
                const secondaryRng = seededRNG(secondaryHash);
                const secondarySortKey = secondaryRng();

                // Combine both sort keys for better distribution
                const combinedSortKey = (sortKey + secondarySortKey) / 2;

                return {
                    choice,
                    sortKey: combinedSortKey,
                };
            })

            // Sort by the random values to create deterministic "random" order
            .sort((a, b) => a.sortKey - b.sortKey)
            // Extract just the choices from the sorted array
            .map((item) => item.choice)
    );
}

/**
 * Generates a deterministic seed string for widget shuffling.
 *
 * The seed determines the shuffle order and ensures consistent behavior:
 * - When problemNum is available, uses it for consistent shuffling across users
 * - Falls back to random value when problemNum is null or undefined (e.g., in embedded widgets)
 * - Ensures the seed is always a string for consistent hashing
 *
 * @param random - Random number or function, used as fallback when problemNum is unavailable
 * @param problemNum - Problem number from exercise context, preferred seed source
 * @returns Deterministic seed string for shuffling
 */
export function getWidgetSeed(
    random: number | (() => number),
    problemNum?: number | null,
): string {
    // Use problemNum when available for consistent cross-user shuffling
    if (problemNum !== null && problemNum !== undefined) {
        return `${problemNum}`;
    }

    // Fall back to random value for embedded widgets or articles
    const randomValue = typeof random === "function" ? random() : random;
    return `radio-${randomValue}`;
}
