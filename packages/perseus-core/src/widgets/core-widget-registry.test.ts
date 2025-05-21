import * as CoreWidgetRegistry from "./core-widget-registry";

describe("core-widget-registry", () => {
    test.each([
        "isWidgetRegistered",
        "getCurrentVersion",
        "getPublicWidgetOptionsFunction",
        "getWidgetOptionsUpgrades",
        "getDefaultWidgetOptions",
        "getSupportedAlignments",
        "getDefaultAlignment",
    ])("%s throws when called before registerWidget", (funName) => {
        // eslint-disable-next-line import/namespace
        expect(() => CoreWidgetRegistry[funName]?.("radio")).toThrow(
            "Core widget registry accessed before initialization!",
        );
    });

    test("isWidgetRegistered throws before initialization", () => {
        expect(() => CoreWidgetRegistry.isWidgetRegistered("radio")).toThrow(
            "Core widget registry accessed before initialization!",
        );
    });

    test("getCurrentVersion throws before initialization", () => {
        expect(() => CoreWidgetRegistry.getCurrentVersion("radio")).toThrow(
            "Core widget registry accessed before initialization!",
        );
    });

    test("getPublicWidgetOptionsFunction throws before initialization", () => {
        expect(() =>
            CoreWidgetRegistry.getPublicWidgetOptionsFunction("radio"),
        ).toThrow("Core widget registry accessed before initialization!");
    });

    test("getWidgetOptionsUpgrades throws before initialization", () => {
        expect(() =>
            CoreWidgetRegistry.getWidgetOptionsUpgrades("radio"),
        ).toThrow("Core widget registry accessed before initialization!");
    });

    test("getDefaultWidgetOptions throws before initialization", () => {
        expect(() =>
            CoreWidgetRegistry.getDefaultWidgetOptions("radio"),
        ).toThrow("Core widget registry accessed before initialization!");
    });

    test("getSupportedAlignments throws before initialization", () => {
        expect(() =>
            CoreWidgetRegistry.getSupportedAlignments("radio"),
        ).toThrow("Core widget registry accessed before initialization!");
    });

    test("getDefaultAlignment throws before initialization", () => {
        expect(() => CoreWidgetRegistry.getDefaultAlignment("radio")).toThrow(
            "Core widget registry accessed before initialization!",
        );
    });
});
