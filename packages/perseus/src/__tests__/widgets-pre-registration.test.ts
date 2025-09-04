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
            "getVersion",
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

    it("throws when getEditor is called before registerWidget", () => {
        expect(() => Widgets.getEditor("radio")).toThrow(
            "Perseus widget editor registry accessed before initialization!",
        );
    });

    it("throws when replaceEditor is called before registerWidget", () => {
        expect(() => Widgets.replaceEditor("radio", "cool")).toThrow(
            "Perseus widget editor registry accessed before initialization!",
        );
    });
});
