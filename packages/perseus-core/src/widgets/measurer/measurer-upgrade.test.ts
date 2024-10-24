import type {PerseusMeasurerWidgetOptions} from "../../data-schema";
import {widgetOptionsUpgrades} from "./measurer-upgrade";

describe("widgetOptionsUpgrades", () => {
    it("can upgrade from v0 to v1", () => {
        const v0options = {
            imageUrl: "url",
            imageTop: 42,
            imageLeft: 42,
            showProtractor: false,
            showRuler: false,
            rulerLabel: "test",
            rulerTicks: 4,
            rulerPixels: 4,
            rulerLength: 4,
            box: [4, 4],
            static: false,
        };

        const expected: PerseusMeasurerWidgetOptions = {
            image: {
                url: "url",
                top: 42,
                left: 42,
            },
            showProtractor: false,
            showRuler: false,
            rulerLabel: "test",
            rulerTicks: 4,
            rulerPixels: 4,
            rulerLength: 4,
            box: [4, 4],
            static: false,
        };

        const result: PerseusMeasurerWidgetOptions =
            widgetOptionsUpgrades["1"](v0options);

        expect(result).toEqual(expected);
    });
});
