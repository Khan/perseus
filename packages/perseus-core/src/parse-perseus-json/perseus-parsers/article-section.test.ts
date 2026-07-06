import {ctx} from "../general-purpose-parsers/test-helpers";
import {success} from "../result";

import {parsePerseusArticleSection} from "./article-section";

describe("parsePerseusArticleSection", () => {
    it("defaults missing renderer fields", () => {
        // Arrange, Act
        const result = parsePerseusArticleSection({}, ctx());

        expect(result).toEqual(
            success({content: "", widgets: {}, images: {}}),
        );
    });

    it("omits answerArea when it is not present", () => {
        // Arrange, Act
        const result = parsePerseusArticleSection(
            {content: "no answer area"},
            ctx(),
        );

        expect(result).toEqual(
            success({content: "no answer area", widgets: {}, images: {}}),
        );
    });

    it("parses answerArea when it is present", () => {
        // Arrange, Act
        const result = parsePerseusArticleSection(
            {
                content: "has answer area",
                answerArea: {calculator: true, calculatorVariant: "scientific"},
            },
            ctx(),
        );

        expect(result).toEqual(
            success({
                content: "has answer area",
                widgets: {},
                images: {},
                answerArea: {
                    calculator: true,
                    calculatorVariant: "scientific",
                    financialCalculatorMonthlyPayment: false,
                    financialCalculatorTotalAmount: false,
                    financialCalculatorTimeToPayOff: false,
                    periodicTable: false,
                    periodicTableWithKey: false,
                },
            }),
        );
    });
});
