import {ItemFlipbookModel} from "./item-flipbook-model";
import {isItem, item, noItem, parseError} from "./item-flipbook-view-model";
import invariant from "tiny-invariant";

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
        expect(model.present().itemJsonInput.value).toBe("");
    });

    it("displays a selected item number, which is initially 1", () => {
        expect(model.present().selectedItemNumber).toBe("1");
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
        expect(observer).toHaveBeenCalledTimes(1);
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
        expect(selectedItemNumber).toEqual("2");
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("bye");
    });

    it("calls the observer when paging to the next item", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
            {"question":{"content":"bye"}}
        `);

        model.nextItem();

        expect(observer).toHaveBeenCalledTimes(2);
    });

    it("doesn't page beyond the end of the item list", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
        `);

        // Act
        model.nextItem();

        // Assert
        const {selectedItemNumber, itemDisplay} = model.present();
        expect(selectedItemNumber).toEqual("1");
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("hi");
    });

    it("doesn't page beyond item number 1 when there are no items", () => {
        model.setTextareaValue("");

        model.nextItem();

        expect(model.present().selectedItemNumber).toEqual("1");
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
        model.previousItem();

        expect(observer).toHaveBeenCalledTimes(3);
    });

    it("doesn't page beyond the beginning of the item list", () => {
        model.setTextareaValue(`
            {"question":{"content":"hi"}}
        `);

        model.previousItem();

        const {selectedItemNumber, itemDisplay} = model.present();
        expect(selectedItemNumber).toEqual("1");
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
        expect(selectedItemNumber).toEqual("2");
        invariant(isItem(itemDisplay));
        expect(itemDisplay.item.question.content).toBe("2");
    });
});
