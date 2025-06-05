/**
 * Simple hash function to create a short hash from a string
 * Uses a more robust algorithm for better distribution
 */
export function simpleHash(str: string): string {
    let hash = 5381; // Use djb2 hash algorithm constant
    if (str.length === 0) {
        return "empty";
    }

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) + hash + char; // hash * 33 + char
    }

    // Base36 for shorter string, 8 chars for consistent, short IDs
    return Math.abs(hash).toString(36).substring(0, 8);
}

/**
 * Create a normalized version of content for hashing
 * This removes extra whitespace and normalizes the text to ensure consistent hashing
 */
export function normalizeContent(content: string): string {
    return content
        .trim()
        .replace(/\s+/g, " ") // Replace multiple whitespace with single space
        .toLowerCase(); // Normalize case for consistency
}
