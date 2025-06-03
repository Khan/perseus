import * as CoreWidgetRegistry from "./core-widget-registry";

describe("core-widget-registry", () => {
    test.each([
        "isWidgetRegistered",
        "getCurrentVersion",
        "getPublicWidgetOptionsFunction",
        "getDefaultWidgetOptions",
        "getSupportedAlignments",
        "getDefaultAlignment",
    ])("%s throws when called before registerWidget", (funName) => {
        // eslint-disable-next-line import/namespace
        expect(() => CoreWidgetRegistry[funName]?.("radio")).toThrow(
            "Core widget registry accessed before initialization!",
        );
    });
});
