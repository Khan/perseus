import getDefaultAnswerArea from "./get-default-answer-area";

describe("getDefaultAnswerArea", () => {
    it("creates a default answer area", () => {
        expect(getDefaultAnswerArea()).toEqual({
            calculator: false,
            chi2Table: false,
            financialCalculatorMonthlyPayment: false,
            financialCalculatorTimeToPayOff: false,
            financialCalculatorTotalAmount: false,
            periodicTable: false,
            periodicTableWithKey: false,
            tTable: false,
            zTable: false,
        });
    });
});
