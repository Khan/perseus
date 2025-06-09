import type {RadioChoiceWithMetadata} from "./radio-component";

/**
 * MumurHash3 32-bit implementation
 * Implementation reference: https://mojoauth.com/hashing/murmurhash-in-typescript
 * Optimized for string inputs without external dependencies
 */
function hashString(key: string): number {
    // djb2 constant
    let hashConstant = 5381;

    let h1 = hashConstant ^ key.length;
    const c1 = 0xcc9e2d51;
    const c2 = 0x1b873593;

    for (let i = 0; i < key.length; i++) {
        let k1 = key.charCodeAt(i);
        k1 = k1 * c1;
        k1 = (k1 << 15) | (k1 >>> 17); // Rotate left
        k1 = k1 * c2;
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19); // Rotate left
        h1 = h1 * 5 + 0xe6546b64; // Mix
    }
    h1 ^= key.length;
    h1 ^= h1 >>> 16; // Finalization
    h1 = h1 * 0x85ebca6b;
    h1 ^= h1 >>> 13;
    h1 = h1 * 0xc2b2ae35;
    h1 ^= h1 >>> 16;
    return h1 >>> 0;
}

/**
 * Creates a hash-based shuffle key for a choice
 */
function createShuffleKey(
    choice: RadioChoiceWithMetadata,
    seed: string,
): string {
    // Use choice ID if available, otherwise use content + originalIndex for better distribution
    const choiceIdentifier =
        choice.id || `${choice.content}-${choice.originalIndex}`;

    // Simple combination that ensures choice ID differences are preserved
    return `${seed}|${choiceIdentifier}`;
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
    seed: string,
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
    return choicesWithKeys.map((item) => item.choice);
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
