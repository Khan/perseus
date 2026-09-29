import {
    getWidgetManifestScope,
    withWidgetManifestContext,
} from "./widget-manifest";

describe("withWidgetManifestContext", () => {
    it("returns undefined outside any scope", () => {
        // Arrange, Act, Assert
        expect(getWidgetManifestScope()).toBeUndefined();
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
});
