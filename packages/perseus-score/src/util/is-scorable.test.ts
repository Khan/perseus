import {isScorable} from "./is-scorable";

describe("isScorable", () => {
    it("returns true for a scorable widget (radio)", () => {
        expect(isScorable("radio")).toBe(true);
    });

    it("returns true for a scorable widget (numeric-input)", () => {
        expect(isScorable("numeric-input")).toBe(true);
    });

    it("returns false for a non-scorable widget (image)", () => {
        expect(isScorable("image")).toBe(false);
    });

    it("returns false for a non-scorable widget (passage)", () => {
        expect(isScorable("passage")).toBe(false);
    });

    it("returns false for a non-existent widget", () => {
        expect(isScorable("non-existent-widget")).toBe(false);
    });

    it("returns false for an empty string", () => {
        expect(isScorable("")).toBe(false);
    });
});
