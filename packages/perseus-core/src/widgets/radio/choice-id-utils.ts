/**
 * DJB2 hash algo to create a hash from a string
 * Reference: https://mojoauth.com/hashing/bernsteins-hash-djb2-in-typescript/
 */
export function convertStringToHash(input: string): number {
    const DJB2_CONSTANT = 5381;
    let hash = DJB2_CONSTANT;

    for (let i = 0; i < input.length; i++) {
        hash = (hash * 33) ^ input.charCodeAt(i);
    }

    return hash >>> 0; // Ensure a positive integer
}

/**
 * Generates a deterministic choice ID based on content and original index.
 * @param content - The choice content text (can be empty or undefined)
 * @param originalIndex - The original position of the choice in the array
 * @returns A unique choice ID string
 */

export function generateChoiceId(
    content: string,
    originalIndex: number,
): string {
    const concatContent = `${content}${originalIndex}`;
    const contentHash = convertStringToHash(concatContent);
    return `${contentHash}`;
}
