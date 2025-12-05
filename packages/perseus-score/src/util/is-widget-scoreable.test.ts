import isWidgetScoreable from "./is-widget-scoreable";
import {getTestDropdownWidget} from "./test-helpers";

describe("isWidgetScoreable", () => {
    it("returns false for undefined widget", () => {
        expect(isWidgetScoreable(undefined)).toBe(false);
    });

    it("returns true for a default graded widget", () => {
        const widget = getTestDropdownWidget();
        expect(isWidgetScoreable(widget)).toBe(true);
    });

    it("returns true when graded is explicitly true", () => {
        const widget = {
            ...getTestDropdownWidget(),
            graded: true,
        };
        expect(isWidgetScoreable(widget)).toBe(true);
    });

    it("returns false when graded is false", () => {
        const widget = {
            ...getTestDropdownWidget(),
            graded: false,
        };
        expect(isWidgetScoreable(widget)).toBe(false);
    });

    it("returns false when static is true", () => {
        const widget = {
            ...getTestDropdownWidget(),
            static: true,
        };
        expect(isWidgetScoreable(widget)).toBe(false);
    });

    it("returns true when static is explicitly false", () => {
        const widget = {
            ...getTestDropdownWidget(),
            static: false,
        };
        expect(isWidgetScoreable(widget)).toBe(true);
    });

    it("returns false when both graded and static are true", () => {
        const widget = {
            ...getTestDropdownWidget(),
            graded: true,
            static: true,
        };
        expect(isWidgetScoreable(widget)).toBe(false);
    });

    it("returns false when graded is false and static is false", () => {
        const widget = {
            ...getTestDropdownWidget(),
            graded: false,
            static: false,
        };
        expect(isWidgetScoreable(widget)).toBe(false);
    });
});
