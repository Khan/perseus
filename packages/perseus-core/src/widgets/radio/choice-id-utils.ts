/**
 * Hash function to create a short hash from a string
 * Based on djb2 hash algo for better distribution
 */
export function convertStringToHash(input: string): string {
    let hash = 5381; // Use djb2 hash algorithm constant
    if (input.length === 0) {
        return "empty";
    }

    for (let i = 0; i < input.length; i++) {
        hash = (hash * 33) ^ input.charCodeAt(i);
    }

    // Base36 for shorter string, 8 chars for consistent, short IDs
    return Math.abs(hash).toString(36).substring(0, 8);
}
/**
 * Create a normalized version of content for hashing
 * This removes extra whitespace and normalizes the text to ensure consistent hashing
 */
export function normalizeContent(content: string): string {
    if (!content) {
        return "";
    }
    return content.trim().replace(/\s+/g, " ").toLowerCase();
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
    const normalizedContent = normalizeContent(content || "");
    const contentHash = convertStringToHash(normalizedContent);
    return `${contentHash}${originalIndex}`;
}
