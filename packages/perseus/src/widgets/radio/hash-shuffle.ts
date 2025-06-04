import type {RadioChoiceWithMetadata} from "./radio-component";

/**
 * Simple hash function that converts a string to a 32-bit integer
 * Uses djb2 + murmur hash algorithms for improved distribution
 */
function hashString(str: string): number {
    // djb2
    let hash = 5381;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; // hash * 33 + char
    }

    // murmur inspired hash used to improve distribution and avoid relative ordering collisions
    hash = hash ^ (hash >>> 16);
    hash = hash * 0x85ebca6b;
    hash = hash ^ (hash >>> 13);
    hash = hash * 0xc2b2ae35;
    hash = hash ^ (hash >>> 16);

    // Additional mixing step to further break up patterns
    hash = hash + (hash << 3);
    hash = hash ^ (hash >>> 11);
    hash = hash + (hash << 15);

    return hash >>> 0;
}

/**
 * Creates a hash-based shuffle key for a choice
 */
function createShuffleKey(choice: RadioChoiceWithMetadata, seed: string): string {
    // Use choice ID if available, otherwise use content + originalIndex for better distribution
    const choiceIdentifier = choice.id || `${choice.content}-${choice.originalIndex}`;

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
    return choicesWithKeys.map(item => item.choice);
}

export function getWidgetSeed(random: number | (()=> number), problemNum?: number | null): string {
    if(problemNum !== null && problemNum !== undefined) {
        return `${problemNum}`
    }
    if(typeof random === "number") {
        return `${random}`
    }
    const randomSeed = random()
    return `radio-${randomSeed}`
}
