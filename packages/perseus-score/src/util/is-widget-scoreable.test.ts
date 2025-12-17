import isWidgetScoreable from "./is-widget-scoreable";
import {getTestDropdownWidget} from "./test-helpers";

import type {PhetSimulationWidget} from "@khanacademy/perseus-core";

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

    it("returns false when widget has no scorer", () => {
        const widget = {
            ...getTestDropdownWidget(),
            type: "phet-simulation",
            // While it shouldn't be possible to get graded as true for a phet-simulation widget,
            // we should still handle it gracefully.
            graded: true,
            static: false,
            options: {
                url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                description: "Projectile Data Lab",
            },
        } satisfies PhetSimulationWidget;
        expect(isWidgetScoreable(widget)).toBe(false);
    });
});
