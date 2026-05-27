import {ItemFlipbookModel} from "./item-flipbook-model";
import {item, noItem, parseError} from "./item-flipbook-view-model";

describe("ItemFlipbookModel", () => {
    let model: ItemFlipbookModel;
    let observer: () => void;
    beforeEach(() => {
        observer = jest.fn();
        model = new ItemFlipbookModel(observer);
    });

    it("does not call the observer when merely constructed", () => {
        expect(observer).not.toHaveBeenCalled();
    });

    it("has a text field, which is initially empty", () => {
        expect(model.present().textareaValue).toBe("");
    });

    it("has no perseus items initially", () => {
        expect(model.present().itemSelection).toEqual(noItem());
    });

    it("lets the user enter stuff in the text field", () => {
        model.setTextareaValue("hello");
        expect(model.present().textareaValue).toBe("hello");
    });

    it("calls the observer when the textarea value changes", () => {
        model.setTextareaValue("hello");
        expect(observer).toHaveBeenCalledTimes(1);
    });

    it("displays a JSON parse error when the user enters a non-JSON value", () => {
        model.setTextareaValue("hello");
        expect(model.present().itemSelection).toEqual(
            parseError(`Unexpected token 'h', "hello" is not valid JSON`),
        );
    });

    it("displays a Perseus parse error when the user enters a non-Perseus JSON value", () => {
        model.setTextareaValue(`{"question":{"content":999}}`);
        expect(model.present().itemSelection).toEqual(
            parseError(
                `At (root).question.content -- expected string, but got 999`,
            ),
        );
    });

    it("displays the first Perseus item when one can be parsed from the input", () => {
        model.setTextareaValue(`{"question":{"content":"hi"}}`);
        expect(model.present().itemSelection).toEqual(
            item({
                question: {
                    content: "hi",
                    widgets: {},
                    images: {},
                },
                answerArea: {
                    calculator: false,
                    financialCalculatorMonthlyPayment: false,
                    financialCalculatorTimeToPayOff: false,
                    financialCalculatorTotalAmount: false,
                    periodicTable: false,
                    periodicTableWithKey: false,
                },
                hints: [],
            }),
        );
    });
});
