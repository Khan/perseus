import {getPublicWidgetOptionsFunction} from "./core-widget-registry";

describe("core-widget-registry", () => {
    it("throws when getPublicWidgetOptionsFunction is called before registerWidget", () => {
        expect(() => getPublicWidgetOptionsFunction("radio")).toThrow(
            "Core widget registry accessed before initialization!",
        );
    });
});
