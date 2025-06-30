import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "./test-utils";

describe("generateTestPerseusRenderer", () => {
    it("makes a blank PerseusRenderer", () => {
        const rv = generateTestPerseusRenderer();
        expect(rv).toEqual({
            content: "",
            images: {},
            widgets: {},
        });
    });

    it("can extend a blank PerseusRenderer", () => {
        const rv = generateTestPerseusRenderer({content: "hello world"});
        expect(rv).toEqual({
            content: "hello world",
            images: {},
            widgets: {},
        });
    });

    it("prevents mutating nested objects across instances", () => {
        // Arrange
        const instance1 = generateTestPerseusRenderer();
        const instance2 = generateTestPerseusRenderer();

        // Act
        instance1.images["https://example.com/image.png"] = {
            width: 42,
            height: 42,
        };

        // Assert
        expect(instance1.images).toEqual({
            "https://example.com/image.png": {
                width: 42,
                height: 42,
            },
        });
        expect(instance2.images).toEqual({});
    });
});

describe("generateTestPerseusItem", () => {
    it("makes a blank PerseusItem", () => {
        const rv = generateTestPerseusItem();
        expect(rv).toEqual({
            question: {
                content: "",
                images: {},
                widgets: {},
            },
            answerArea: {
                calculator: false,
                periodicTable: false,
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTotalAmount: false,
                financialCalculatorTimeToPayOff: false,
                periodicTableWithKey: false,
            },
            hints: [],
        });
    });

    it("can extend a blank PerseusItem", () => {
        const rv = generateTestPerseusItem({
            question: {
                content: "hello world",
                images: {},
                widgets: {},
            },
        });

        expect(rv).toEqual({
            question: {
                content: "hello world",
                images: {},
                widgets: {},
            },
            answerArea: {
                calculator: false,
                periodicTable: false,
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTotalAmount: false,
                financialCalculatorTimeToPayOff: false,
                periodicTableWithKey: false,
            },
            hints: [],
        });
    });

    it("prevents mutating nested objects across instances", () => {
        // Arrange
        const instance1 = generateTestPerseusItem();
        const instance2 = generateTestPerseusItem();

        // Act
        if (instance1.answerArea) {
            instance1.answerArea.calculator = true;
        }

        // Assert
        expect(instance1.answerArea?.calculator).toBe(true);
        expect(instance2.answerArea?.calculator).toBe(false);
    });
});
