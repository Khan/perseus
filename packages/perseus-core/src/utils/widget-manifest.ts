/**
 * Attribution and storage for recording which widgets a test or story resolves.
 *
 * Registry lookups often fire from framework files, so the caller's file name
 * is the wrong answer. The test or story sets its own scope around execution,
 * and registry lookups record against that scope.
 */

export type WidgetManifest = {
    coreWidgets: ReadonlyArray<string>;
    widgets: ReadonlyArray<string>;
    editors: ReadonlyArray<string>;
};

export type WidgetManifestRegistry = "core" | "widget" | "editor";

type MutableWidgetManifest = {
    coreWidgets: Set<string>;
    widgets: Set<string>;
    editors: Set<string>;
};

let activeScope: string | undefined;
const manifests = new Map<string, MutableWidgetManifest>();

/** The file name recording should attribute lookups to, if any. */
export function getWidgetManifestScope(): string | undefined {
    return activeScope;
}

/** Set the active file and return a function that restores the previous one. */
export function enterWidgetManifestContext(fileName: string): () => void {
    const previous = activeScope;
    activeScope = fileName;
    return () => {
        activeScope = previous;
    };
}

/**
 * Run `fn` with lookups attributed to `fileName`.
 *
 * Scopes nest: the innermost wins, and the outer scope is restored even if
 * `fn` throws.
 */
export function withWidgetManifestContext<T>(fileName: string, fn: () => T): T {
    const restore = enterWidgetManifestContext(fileName);
    try {
        return fn();
    } finally {
        restore();
    }
}

/** Record one registry lookup against the active file, if recording is active. */
export function recordWidgetManifestEntry(
    registry: WidgetManifestRegistry,
    widgetType: string,
): void {
    if (!activeScope) {
        return;
    }

    let manifest = manifests.get(activeScope);
    if (!manifest) {
        manifest = {
            coreWidgets: new Set(),
            widgets: new Set(),
            editors: new Set(),
        };
        manifests.set(activeScope, manifest);
    }

    if (registry === "core") {
        manifest.coreWidgets.add(widgetType);
    } else if (registry === "widget") {
        manifest.widgets.add(widgetType);
    } else {
        manifest.editors.add(widgetType);
    }
}

/** Return one file's recorded lookups in stable order. */
export function getWidgetManifest(fileName: string): WidgetManifest {
    const manifest = manifests.get(fileName);
    return {
        coreWidgets: [...(manifest?.coreWidgets ?? [])].sort(),
        widgets: [...(manifest?.widgets ?? [])].sort(),
        editors: [...(manifest?.editors ?? [])].sort(),
    };
}

/** Delete recorded lookups for one file, or for every file when omitted. */
export function resetWidgetManifests(fileName?: string): void {
    if (fileName) {
        manifests.delete(fileName);
    } else {
        manifests.clear();
    }
}
