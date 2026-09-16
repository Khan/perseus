import {
    enterWidgetManifestContext,
    getWidgetManifest,
    getWidgetManifestScope,
    recordWidgetManifestEntry,
    resetWidgetManifests,
    withWidgetManifestContext,
} from "./widget-manifest";

describe("widget manifest recording", () => {
    afterEach(() => {
        resetWidgetManifests();
    });

    it("returns the enclosing scope outside a nested scope", () => {
        // Arrange, Act, Assert
        expect(getWidgetManifestScope()).toBe(
            process.env.PERSEUS_WIDGET_MANIFESTS === "1"
                ? "packages/perseus-core/src/utils/widget-manifest.test.ts"
                : undefined,
        );
    });

    it("attributes to the innermost scope", () => {
        // Arrange, Act
        const scopes = withWidgetManifestContext("outer.stories.tsx", () => {
            const inner = withWidgetManifestContext("inner.test.tsx", () =>
                getWidgetManifestScope(),
            );
            return [inner, getWidgetManifestScope()];
        });

        expect(scopes).toEqual(["inner.test.tsx", "outer.stories.tsx"]);
    });

    it("restores the outer scope after an inner scope throws", () => {
        // Arrange, Act
        const outer = withWidgetManifestContext("outer.stories.tsx", () => {
            expect(() =>
                withWidgetManifestContext("inner.test.tsx", () => {
                    throw new Error("boom");
                }),
            ).toThrow("boom");
            return getWidgetManifestScope();
        });

        expect(outer).toBe("outer.stories.tsx");
    });

    it("keeps an entered context active until it is restored", () => {
        // Arrange
        const enclosingScope = getWidgetManifestScope();
        const restore = enterWidgetManifestContext("widget.test.tsx");

        // Act
        const active = getWidgetManifestScope();
        restore();

        expect(active).toBe("widget.test.tsx");
        expect(getWidgetManifestScope()).toBe(enclosingScope);
    });

    it("records separate deduplicated registry entries in stable order", () => {
        // Arrange
        const restore = enterWidgetManifestContext("widget.test.tsx");

        // Act
        recordWidgetManifestEntry("widget", "radio");
        recordWidgetManifestEntry("core", "numeric-input");
        recordWidgetManifestEntry("widget", "categorizer");
        recordWidgetManifestEntry("editor", "radio");
        recordWidgetManifestEntry("widget", "radio");
        restore();

        expect(getWidgetManifest("widget.test.tsx")).toEqual({
            coreWidgets: ["numeric-input"],
            widgets: ["categorizer", "radio"],
            editors: ["radio"],
        });
    });

    it("does not record lookups outside a scope", () => {
        // Arrange, Act
        recordWidgetManifestEntry("widget", "radio");

        expect(getWidgetManifest("widget.test.tsx")).toEqual({
            coreWidgets: [],
            widgets: [],
            editors: [],
        });
    });
});
