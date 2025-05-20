import * as CoreWidgetRegistry from "./core-widget-registry";

describe("core-widget-registry", () => {
    test("isWidgetRegistered returns false before initialization", () => {
        expect(CoreWidgetRegistry.isWidgetRegistered("radio")).toBe(false);
    });

    test("getCurrentVersion returns default version before initialization", () => {
        expect(CoreWidgetRegistry.getCurrentVersion("radio")).toEqual({
            major: 0,
            minor: 0,
        });
    });

    test("getPublicWidgetOptionsFunction returns identity function before initialization", () => {
        const fn = CoreWidgetRegistry.getPublicWidgetOptionsFunction("radio");
        expect(fn("test")).toBe("test");
    });

    test("getWidgetOptionsUpgrades returns empty object before initialization", () => {
        expect(CoreWidgetRegistry.getWidgetOptionsUpgrades("radio")).toEqual(
            {},
        );
    });

    test("getDefaultWidgetOptions returns empty object before initialization", () => {
        expect(CoreWidgetRegistry.getDefaultWidgetOptions("radio")).toEqual({});
    });

    test("getSupportedAlignments returns ['default'] before initialization", () => {
        expect(CoreWidgetRegistry.getSupportedAlignments("radio")).toEqual([
            "default",
        ]);
    });

    test("getDefaultAlignment returns 'block' before initialization", () => {
        expect(CoreWidgetRegistry.getDefaultAlignment("radio")).toBe("block");
    });
});
