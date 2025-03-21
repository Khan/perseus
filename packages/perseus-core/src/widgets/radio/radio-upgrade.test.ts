import {deriveNumCorrect, widgetOptionsUpgrades} from "./radio-upgrade";

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

describe("deriveNumCorrect", () => {
    it("default to passing through numCorrect", () => {
        const options = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
            ],
            // different than what choices is saying
            // to confirm it's using numCorrect
            numCorrect: 1,
        };

        const result = deriveNumCorrect(options);

        expect(result).toBe(1);
    });

    it("handles 0 correctly", () => {
        const options = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
            ],
            // different than what choices is saying
            // to confirm it's using numCorrect
            numCorrect: 0,
        };

        const result = deriveNumCorrect(options);

        expect(result).toBe(0);
    });

    it("can compute numCorrect on its own", () => {
        const options = {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: true},
                {content: "Choice 3", correct: false},
            ],
        };

        const result = deriveNumCorrect(options);

        expect(result).toBe(2);
    });
});
