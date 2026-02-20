import {getFeatureFlags} from "./feature-flags-util";

describe("getFeatureFlags", () => {
    it("returns default flags when no overrides are provided", () => {
        const flags = getFeatureFlags();
        expect(flags["new-radio-widget"]).toBe(false);
        expect(flags["image-widget-upgrade-alignment"]).toBe(false);
    });

    it("overrides a single flag correctly", () => {
        const flags = getFeatureFlags({"new-radio-widget": true});
        expect(flags["new-radio-widget"]).toBe(true);
        expect(flags["image-widget-upgrade-alignment"]).toBe(false);
    });

    it("overrides multiple flags correctly", () => {
        const flags = getFeatureFlags({
            "new-radio-widget": true,
            "image-widget-upgrade-alignment": true,
        });
        expect(flags["new-radio-widget"]).toBe(true);
        expect(flags["image-widget-upgrade-alignment"]).toBe(true);
    });
});
