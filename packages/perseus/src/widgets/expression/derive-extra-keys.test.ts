import deriveExtraKeys from "./derive-extra-keys";

import type {
    ExpressionPublicWidgetOptions,
    PerseusExpressionWidgetOptions,
} from "@khanacademy/perseus-core";

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
        // Arrange
        // Act
        // Assert
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
        // Arrange
        // Act
        // Assert
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
        // Arrange
        // Act
        // Assert
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
        // Arrange
        // Act
        // Assert
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
        // Arrange
        // Act
        // Assert
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
        // Arrange
        // Act
        // Assert
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
        // Arrange

        // this is an extreme case (maybe being overly cautious to a fault)
        // but checking that *something* gets returned if there are no answerForms
        const answerlessWidgetOptions: ExpressionPublicWidgetOptions = {
            buttonSets: [],
            times: false,
            functions: [],
        };

        // Act
        // Assert
        expect(
            deriveExtraKeys(
                answerlessWidgetOptions as PerseusExpressionWidgetOptions,
            ),
        ).toEqual(["PI"]);
    });
});
