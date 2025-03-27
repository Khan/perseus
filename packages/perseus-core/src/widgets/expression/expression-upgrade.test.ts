import type {PerseusExpressionWidgetOptions} from "../../data-schema";
import {widgetOptionsUpgrades} from "./expression-upgrade";

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

        const v1options = {
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

        const result = widgetOptionsUpgrades["1"](v0options);

        expect(result).toEqual(v1options);
    });

    it("can upgrade from v1 to v2", () => {
        const v1options = {
            times: false,
            buttonSets: ["basic"],
            functions: [],
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    simplify: false,
                    value: "42i",
                },
            ],
        };

        const v2options: PerseusExpressionWidgetOptions = {
            times: false,
            buttonSets: ["basic"],
            functions: [],
            extraKeys: ["i"],
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    simplify: false,
                    value: "42i",
                },
            ],
        };

        const result: PerseusExpressionWidgetOptions =
            widgetOptionsUpgrades["2"](v1options);

        expect(result).toEqual(v2options);
    });
});
