import deriveExtraKeys from "./derive-extra-keys";

import type {ExpressionPublicWidgetOptions} from "./expression-util";
import type {PerseusExpressionWidgetOptions} from "../../data-schema";

describe("deriveExtraKeys", () => {
    it("should handle basic button set", async () => {
        // Arrange
        const widgetOptions: PerseusExpressionWidgetOptions = {
            answerForms: [],
            buttonSets: ["basic"],
            times: false,
            functions: [],
        };

        // Act
        const result = deriveExtraKeys(widgetOptions);

        // Assert
        expect(result).toEqual(["PI"]);
    });

    it("should handle basic+div button set", async () => {
        expect(
            deriveExtraKeys({
                answerForms: [],
                buttonSets: ["basic+div"],
                times: false,
                functions: [],
            }),
        ).toEqual(["PI"]);
    });

    it("should handle scientific button set", async () => {
        expect(
            deriveExtraKeys({
                answerForms: [],
                buttonSets: ["scientific"],
                times: false,
                functions: [],
            }),
        ).toEqual(["PI"]);
    });

    it("can find lowercase constants", async () => {
        expect(
            deriveExtraKeys({
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "16+88i",
                    },
                ],
                buttonSets: [],
                times: false,
                functions: [],
            }),
        ).toEqual(["i"]);
    });

    it("can find uppercase constants", async () => {
        expect(
            deriveExtraKeys({
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "16+88I",
                    },
                ],
                buttonSets: [],
                times: false,
                functions: [],
            }),
        ).toEqual(["I"]);
    });

    it("can find theta", async () => {
        expect(
            deriveExtraKeys({
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "16+88\\theta",
                    },
                ],
                buttonSets: [],
                times: false,
                functions: [],
            }),
        ).toEqual(["THETA"]);
    });

    it("can find pi", async () => {
        expect(
            deriveExtraKeys({
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "16+88\\pi",
                    },
                ],
                buttonSets: [],
                times: false,
                functions: [],
            }),
        ).toEqual(["PI"]);
    });

    it("can handle an absense of answerForms", async () => {
        // this is an extreme case (maybe being overly cautious to a fault)
        // but checking that *something* gets returned if there are no answerForms
        const answerlessWidgetOptions: ExpressionPublicWidgetOptions = {
            buttonSets: [],
            times: false,
            functions: [],
        };

        expect(
            deriveExtraKeys(
                answerlessWidgetOptions as PerseusExpressionWidgetOptions,
            ),
        ).toEqual(["PI"]);
    });
});
