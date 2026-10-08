import * as WidgetEditors from "../editor-registry";

/**
 * This needs to be in a test file that doesn't register editors, since it's
 * testing pre-registration behavior.
 */
describe("editor registry pre-registration", () => {
    it("throws when getEditor is called before registerEditors", () => {
        expect(() => WidgetEditors.getEditor("radio")).toThrow(
            "Perseus widget editor registry accessed before initialization!",
        );
    });
});
