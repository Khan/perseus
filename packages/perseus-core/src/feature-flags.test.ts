import {isFeatureOn} from "./feature-flags";

describe("isFeatureOn", () => {
    it("returns true when the flag is enabled", () => {
        const props = {apiOptions: {flags: {"new-radio-widget": true}}};
        expect(isFeatureOn(props, "new-radio-widget")).toBe(true);
    });

    it("returns false when the flag is disabled", () => {
        const props = {apiOptions: {flags: {"new-radio-widget": false}}};
        expect(isFeatureOn(props, "new-radio-widget")).toBe(false);
    });

    it("returns false when the flag is missing", () => {
        const props = {apiOptions: {flags: {}}};
        expect(isFeatureOn(props, "non-existent-flag")).toBe(false);
    });

    it("returns false when flags is undefined", () => {
        const props = {apiOptions: {}};
        expect(isFeatureOn(props, "new-radio-widget")).toBe(false);
    });

    it("returns false when apiOptions is undefined", () => {
        const props = {};
        expect(isFeatureOn(props, "new-radio-widget")).toBe(false);
    });
});
