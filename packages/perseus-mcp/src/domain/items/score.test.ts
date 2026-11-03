/**
 * @jest-environment node
 */
import {
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {scoreItem} from "./score";

import type {PerseusItem} from "@khanacademy/perseus-core";

function threeQuarters(): PerseusItem {
    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: "What is 3 ÷ 4? [[☃ numeric-input 1]]",
            widgets: {
                "numeric-input 1": generateNumericInputWidget({
                    options: generateNumericInputOptions({
                        answers: [
                            generateNumericInputAnswer({
                                value: 0.75,
                                status: "correct",
                            }),
                        ],
                    }),
                }),
            },
        }),
    });
}

function answer(currentValue: unknown) {
    return {"numeric-input 1": {currentValue}};
}

describe("scoreItem", () => {
    it.each(["0.75", "3/4"])("scores %s as correct", (currentValue) => {
        // Arrange, Act
        const result = scoreItem(threeQuarters(), answer(currentValue), "en");

        // Assert
        expect(result).toMatchObject({
            ok: true,
            score: {outcome: "correct", score: {type: "points", earned: 1}},
        });
    });

    it("scores a wrong answer as incorrect", () => {
        // Arrange, Act
        const result = scoreItem(threeQuarters(), answer("0.5"), "en");

        // Assert
        expect(result).toMatchObject({
            ok: true,
            score: {outcome: "incorrect"},
        });
    });

    it("returns an invalid outcome for an empty answer", () => {
        // Arrange, Act
        const result = scoreItem(threeQuarters(), answer(""), "en");

        // Assert
        expect(result).toMatchObject({
            ok: true,
            score: {outcome: "invalid", score: {type: "invalid"}},
        });
    });

    it("rejects input for a widget the question doesn't have", () => {
        // Arrange, Act
        const result = scoreItem(
            threeQuarters(),
            {"numeric-input 2": {currentValue: "0.75"}},
            "en",
        );

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [expect.objectContaining({code: "unknown-widget-id"})],
        });
    });

    it("returns the parser's error for user input that doesn't parse", () => {
        // Arrange, Act
        const result = scoreItem(threeQuarters(), answer(0.75), "en");

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [
                expect.objectContaining({
                    code: "invalid-user-input",
                    message: expect.stringContaining("currentValue"),
                }),
            ],
        });
    });
});
