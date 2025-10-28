import {registerCoreWidgets} from "../core-widget-registry";

import getExpressionPublicWidgetOptions, {
    getSaveWarningsForExpressionWidget,
} from "./expression-util";

import type {
    ExpressionWidget,
    PerseusExpressionWidgetOptions,
} from "../../data-schema";

function getExpressionWidgetWithOptions(
    options: Partial<PerseusExpressionWidgetOptions>,
): ExpressionWidget {
    return {
        type: "expression",
        options: {
            answerForms: [],
            buttonSets: ["basic"],
            functions: [],
            times: false,
            ...options,
        },
    };
}

describe("getExpressionPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusExpressionWidgetOptions = {
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    simplify: false,
                    value: "123-x",
                },
            ],
            buttonSets: ["basic"],
            functions: ["f", "g", "h"],
            times: false,
            visibleLabel: "the visible label",
            ariaLabel: "the aria label",
            buttonsVisible: "always",
            extraKeys: ["i"],
        };

        // Act
        const publicWidgetOptions = getExpressionPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            times: false,
            buttonSets: ["basic"],
            functions: ["f", "g", "h"],
            buttonsVisible: "always",
            visibleLabel: "the visible label",
            ariaLabel: "the aria label",
            extraKeys: ["i"],
        });
    });
});

describe("getSaveWarningsForExpressionWidget", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    it("returns a warning when no answers are specified", () => {
        // Arrange
        const widget = getExpressionWidgetWithOptions({
            answerForms: [],
        });

        // Act
        const warnings = getSaveWarningsForExpressionWidget(widget);

        // Assert
        expect(warnings).toEqual(["No answers specified"]);
    });

    it("returns a warning when no correct answer is specified", () => {
        // Arrange
        const widget = getExpressionWidgetWithOptions({
            answerForms: [
                {
                    value: "1",
                    form: false,
                    simplify: false,
                    considered: "wrong",
                },
            ],
        });

        // Act
        const warnings = getSaveWarningsForExpressionWidget(widget);

        // Assert
        expect(warnings).toEqual(["No correct answer specified"]);
    });

    it("returns a warning when an answer is empty", () => {
        // Arrange
        const widget = getExpressionWidgetWithOptions({
            answerForms: [
                {
                    value: "a",
                    form: false,
                    simplify: false,
                    considered: "correct",
                },
                {
                    value: "",
                    form: false,
                    simplify: false,
                    considered: "correct",
                },
            ],
        });

        // Act
        const warnings = getSaveWarningsForExpressionWidget(widget);

        // Assert
        expect(warnings).toEqual(["Answer 2 is empty"]);
    });

    it("returns a warning when value could not be parsed", () => {
        // Arrange
        const widget = getExpressionWidgetWithOptions({
            answerForms: [
                {
                    value: "2.4.r",
                    form: false,
                    simplify: false,
                    considered: "correct",
                },
            ],
        });
        // Act
        const warnings = getSaveWarningsForExpressionWidget(widget);

        // Assert
        expect(warnings).toEqual(["Couldn't parse 2.4.r"]);
    });

    it("returns a warning if value is not simplified but is required to be", () => {
        // Arrange
        const widget = getExpressionWidgetWithOptions({
            answerForms: [
                {
                    value: "2/1",
                    form: false,
                    simplify: true,
                    considered: "correct",
                },
            ],
        });
        // Act
        const warnings = getSaveWarningsForExpressionWidget(widget);

        // Assert
        expect(warnings).toEqual([
            "2/1 isn't simplified, but is required to be",
        ]);
    });

    it("returns an empty array when no warnings are detected", () => {
        // Arrange
        const widget = getExpressionWidgetWithOptions({
            answerForms: [
                {
                    value: "2",
                    form: false,
                    simplify: false,
                    considered: "correct",
                },
            ],
        });

        // Act
        const warnings = getSaveWarningsForExpressionWidget(widget);

        // Assert
        expect(warnings).toEqual([]);
    });
});
