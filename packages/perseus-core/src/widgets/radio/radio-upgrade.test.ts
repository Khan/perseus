import {widgetOptionsUpgrades} from "./radio-upgrade";

import type {PerseusRadioWidgetOptions} from "../../data-schema";

describe("widgetOptionsUpgrades", () => {
    it("can upgrade from v0 to v1", () => {
        const v0options = {
            choices: [{content: "Choice 1"}, {content: "Choice 2"}],
        };

        const expected: PerseusRadioWidgetOptions = {
            choices: [{content: "Choice 1"}, {content: "Choice 2"}],
            hasNoneOfTheAbove: false,
        };

        const result: PerseusRadioWidgetOptions =
            widgetOptionsUpgrades["1"](v0options);

        expect(result).toEqual(expected);
    });

    it("throws from noneOfTheAbove", () => {
        const v0options = {
            choices: [{content: "Choice 1"}, {content: "Choice 2"}],
            noneOfTheAbove: true,
        };

        expect(() => widgetOptionsUpgrades["1"](v0options)).toThrow(
            "radio widget v0 no longer supports auto noneOfTheAbove",
        );
    });
});
