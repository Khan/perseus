import * as Widgets from "../widgets";

/**
 * This needs to be in a test file that doesn't register widgets,
 * since it's testing pre-registration behavior
 */
describe("widgets pre-registration", () => {
    describe("widget registry", () => {
        test.each([
            "getWidget",
            "getWidgetExport",
            "supportsStaticMode",
            "getTracking",
            "isLintable",
        ])("%s throws when called before registerWidget", (funName) => {
            // eslint-disable-next-line import/namespace
            expect(() => Widgets[funName]?.("radio")).toThrow(
                "Perseus widget registry accessed before initialization!",
            );
        });
    });
});
