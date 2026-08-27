/**
 * Attribution scope for recording which widgets a test or story resolves.
 *
 * Registry lookups often fire from framework files (the renderer, scoring),
 * so the caller's file name is the wrong answer. Instead the test or story
 * declares its own name around the render, and recording reads that scope.
 */

let activeScope: string | undefined;

/**
 * The file name recording should attribute lookups to, if any.
 */
export function getWidgetManifestScope(): string | undefined {
    return activeScope;
}

/**
 * Run `fn` with lookups attributed to `fileName`.
 *
 * Scopes nest: the innermost wins, and the outer scope is restored even if
 * `fn` throws.
 */
export function withWidgetManifestContext<T>(fileName: string, fn: () => T): T {
    const previous = activeScope;
    activeScope = fileName;
    try {
        return fn();
    } finally {
        activeScope = previous;
    }
}
