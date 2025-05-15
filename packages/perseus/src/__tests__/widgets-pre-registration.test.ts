import * as Widgets from "../widgets";

/**
 * This needs to be in a test file that doesn't register widgets,
 * since it's testing pre-registration behavior
 */
describe("widgets pre-registration", () => {
    it("throws when getWidgetExport is called before registerWidget", () => {
        expect(() => Widgets.getWidgetExport("radio")).toThrow(
            "Perseus widget registry accessed before initialization!",
        );
    });

    it("throws when getEditor is called before registerWidget", () => {
        expect(() => Widgets.replaceEditor("radio", "cool")).toThrow(
            "Perseus widget editor registry accessed before initialization!",
        );
    });
});
