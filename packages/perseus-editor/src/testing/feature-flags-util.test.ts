import {getFeatureFlags} from "./feature-flags-util";

describe("getFeatureFlags", () => {
    it("returns default flags when no overrides are provided", () => {
        const flags = getFeatureFlags();
        expect(flags["perseus-test-flag-1"]).toBe(false);
        expect(flags["perseus-test-flag-2"]).toBe(false);
    });

    it("overrides a single flag correctly", () => {
        const flags = getFeatureFlags({"perseus-test-flag-1": true});
        expect(flags["perseus-test-flag-1"]).toBe(true);
        expect(flags["perseus-test-flag-2"]).toBe(false);
    });

    it("overrides multiple flags correctly", () => {
        const flags = getFeatureFlags({
            "perseus-test-flag-1": true,
            "perseus-test-flag-2": true,
        });
        expect(flags["perseus-test-flag-1"]).toBe(true);
        expect(flags["perseus-test-flag-2"]).toBe(true);
    });
});
