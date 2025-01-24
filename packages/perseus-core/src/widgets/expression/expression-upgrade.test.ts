import {widgetOptionsUpgrades} from "./expression-upgrade";

import type {PerseusExpressionWidgetOptions} from "../../data-schema";

describe("widgetOptionsUpgrades", () => {
    it("can upgrade from v0 to v1", () => {
        const v0options = {
            times: false,
            buttonSets: ["basic"],
            functions: [],
            form: false,
            simplify: false,
            value: "42",
        };

        const expected: PerseusExpressionWidgetOptions = {
            times: false,
            buttonSets: ["basic"],
            functions: [],
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    simplify: false,
                    value: "42",
                },
            ],
        };

        const result: PerseusExpressionWidgetOptions =
            widgetOptionsUpgrades["1"](v0options);

        expect(result).toEqual(expected);
    });
});
