import invariant from "tiny-invariant";

import {ItemFlipbookModel} from "./item-flipbook-model";
import {isItem, noItem, parseError} from "./item-flipbook-view-model";

describe("ItemFlipbookModel", () => {
    let model: ItemFlipbookModel;
    let observerCalled = false;
    beforeEach(() => {
        model = new ItemFlipbookModel(() => (observerCalled = true));
    });

    it("does not call the observer when merely constructed", () => {
        expect(observerCalled).toBe(false);
    });

    it("has a text field, which is initially empty", () => {
        expect(model.present().itemJsonInput.value).toBe("");
    });

    it("displays a selected item number, which is initially 0", () => {
        expect(model.present().selectedItemNumber.value).toBe("0");
    });

    it("displays the total number of items, which is initially 0", () => {
        expect(model.present().totalItems).toBe("0");
    });

    it("has no perseus items initially", () => {
        expect(model.present().itemDisplay).toEqual(noItem());
    });

    it("lets the user enter stuff in the text field", () => {
        model.setTextareaValue("hello");
        expect(model.present().itemJsonInput.value).toBe("hello");
    });

    it("calls the observer when the textarea value changes", () => {
        model.setTextareaValue("hello");
        expect(observerCalled).toBe(true);
    });

    it("displays a JSON parse error when the user enters a non-JSON value", () => {
        model.setTextareaValue("hello");

        expect(model.present().itemDisplay).toEqual(
            parseError(`Unexpected token 'h', "hello" is not valid JSON`),
        );
    });

    it("displays a Perseus parse error when the user enters a non-Perseus JSON value", () => {
        model.setTextareaValue(`{"question":{"content":999}}`);

        expect(model.present().itemDisplay).toEqual(
            parseError(
                `At (root).question.content -- expected string, but got 999`,
            ),
        );
    });

    it("displays the first Perseus item when one can be parsed from the input", () => {
        model.setTextareaValue(`{"question":{"content":"hi"}}`);

        const {itemDisplay} = model.present();
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item).toEqual({
            question: {
                content: "hi",
                widgets: {},
                images: {},
            },
            answerArea: {
                calculator: false,
                calculatorVariant: null,
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTimeToPayOff: false,
                financialCalculatorTotalAmount: false,
                periodicTable: false,
                periodicTableWithKey: false,
            },
            hints: [],
        });
    });

    it("parses multiple newline-separated items, ignoring extra whitespace", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
            {"question":{"content":"bye"}}
        `);

        const {itemDisplay} = model.present();

        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("hi");
    });

    it("displays the total number of items", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
            {"question":{"content":"bye"}}
        `);

        expect(model.present().totalItems).toBe("2");
    });

    it("pages to the next item", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
            {"question":{"content":"bye"}}
        `);

        // Act
        model.nextItem();

        // Assert
        const {selectedItemNumber, itemDisplay} = model.present();
        expect(selectedItemNumber.value).toEqual("2");
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("bye");
    });

    it("calls the observer when paging to the next item", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
            {"question":{"content":"bye"}}
        `);
        observerCalled = false;

        model.nextItem();

        expect(observerCalled).toBe(true);
    });

    it("doesn't page beyond the end of the item list", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
        `);

        // Act
        model.nextItem();

        // Assert
        const {selectedItemNumber, itemDisplay} = model.present();
        expect(selectedItemNumber.value).toEqual("1");
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("hi");
    });

    it("doesn't page beyond item number 0 when there are no items", () => {
        model.setTextareaValue("");

        model.nextItem();

        expect(model.present().selectedItemNumber.value).toEqual("0");
    });

    it("pages to the previous item", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
            {"question":{"content":"bye"}}
        `);

        model.nextItem();
        model.previousItem();

        const {itemDisplay} = model.present();
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("hi");
    });

    it("calls the observer when paging to the previous item", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
            {"question":{"content":"bye"}}
        `);
        model.nextItem();
        observerCalled = false;

        model.previousItem();

        expect(observerCalled).toBe(true);
    });

    it("doesn't page beyond the beginning of the item list", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
        `);

        model.previousItem();

        const {selectedItemNumber, itemDisplay} = model.present();
        expect(selectedItemNumber.value).toEqual("1");
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("hi");
    });

    it("clamps the selectedItemNumber when items are removed from the list", () => {
        model.setTextareaValue(`
            {"question":{"content":"1"}}
            {"question":{"content":"2"}}
            {"question":{"content":"3"}}
        `);

        model.nextItem(); // select item 2
        model.nextItem(); // select item 3

        model.setTextareaValue(`
            {"question":{"content":"1"}}
            {"question":{"content":"2"}}
        `);

        const {selectedItemNumber, itemDisplay} = model.present();
        expect(selectedItemNumber.value).toEqual("2");
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("2");
    });

    it("preserves the selectedItemNumber when items are removed and then re-added", () => {
        model.setTextareaValue(`
            {"question":{"content":"1"}}
            {"question":{"content":"2"}}
            {"question":{"content":"3"}}
        `);

        model.nextItem(); // select item 2
        model.nextItem(); // select item 3

        model.setTextareaValue("");

        model.setTextareaValue(`
            {"question":{"content":"1"}}
            {"question":{"content":"2"}}
            {"question":{"content":"3"}}
        `);

        expect(model.present().selectedItemNumber.value).toBe("3");
    });

    it("clamps selectedItemNumber on a request for a too-high number", () => {
        model.setTextareaValue(`
            {"question":{"content":"1"}}
            {"question":{"content":"2"}}
            {"question":{"content":"3"}}
        `);

        model.requestItemNumber("9");

        expect(model.present().selectedItemNumber.value).toBe("3");
    });

    it("clamps selectedItemNumber on a request for a too-low number", () => {
        model.setTextareaValue(`
            {"question":{"content":"1"}}
            {"question":{"content":"2"}}
            {"question":{"content":"3"}}
        `);
        model.nextItem(); // select item 2

        model.requestItemNumber("0");

        expect(model.present().selectedItemNumber.value).toBe("1");
    });

    it("does not update selectedItemNumber on a request for a non-numeric value", () => {
        model.setTextareaValue(`
            {"question":{"content":"1"}}
            {"question":{"content":"2"}}
            {"question":{"content":"3"}}
        `);

        model.requestItemNumber("asdf");

        expect(model.present().selectedItemNumber.value).toBe("1");
    });

    it("updates selectedItemNumber on a valid request", () => {
        model.setTextareaValue(`
            {"question":{"content":"1"}}
            {"question":{"content":"2"}}
            {"question":{"content":"3"}}
        `);
        observerCalled = false;

        model.requestItemNumber("3");

        expect(model.present().selectedItemNumber.value).toBe("3");
        expect(observerCalled).toBe(true);
    });
});
