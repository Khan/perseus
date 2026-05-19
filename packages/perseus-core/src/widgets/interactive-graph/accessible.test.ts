import {
    generateIGLockedPoint,
    generateInteractiveGraphOptions,
} from "../../utils/generators/interactive-graph-widget-generator";

import accessible from "./accessible";

import type {PerseusInteractiveGraphWidgetOptions} from "../../data-schema";

describe("InteractiveGraph accessible", () => {
    it("can pass", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions();

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(true);
    });

    it("fails with protractor", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                showProtractor: true,
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(false);
    });

    it("fails with locked figures and no description", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                lockedFigures: [generateIGLockedPoint()],
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(false);
    });

    it("passes with locked figures and description", () => {
        const options: PerseusInteractiveGraphWidgetOptions =
            generateInteractiveGraphOptions({
                lockedFigures: [generateIGLockedPoint()],
                fullGraphAriaDescription: "Cool description",
            });

        const isAccessible = accessible(options);

        expect(isAccessible).toBe(true);
    });
});
