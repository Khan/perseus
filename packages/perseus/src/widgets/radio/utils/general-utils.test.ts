import {getChoiceStates, parseNestedWidgets} from "./general-utils";

import type {ChoiceState} from "../../../types";
import type {RadioChoiceWithMetadata} from "../radio.new";

describe("getChoiceStates", () => {
    const mockChoices: RadioChoiceWithMetadata[] = [
        {
            content: "Choice 1",
            correct: true,
        } as RadioChoiceWithMetadata,
        {
            content: "Choice 2",
            correct: false,
        } as RadioChoiceWithMetadata,
        {
            content: "Choice 3",
            correct: false,
        } as RadioChoiceWithMetadata,
    ];

    const defaultState: ChoiceState = {
        selected: false,
        readOnly: false,
        highlighted: false,
        rationaleShown: false,
        correctnessShown: false,
        previouslyAnswered: false,
    };

    describe("Case 1: Review mode", () => {
        it("sets correct answers as selected when widget is static", () => {
            // Arrange & Act
            const result = getChoiceStates({
                choices: mockChoices,
                isStatic: true,
            });

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({
                ...defaultState,
                selected: true,
                readOnly: true,
                rationaleShown: true,
                correctnessShown: true,
            });
            expect(result[1].selected).toBe(false);
            expect(result[2].selected).toBe(false);
        });

        it("sets correct answers as selected when showSolutions is 'all'", () => {
            // Arrange & Act
            const result = getChoiceStates({
                choices: mockChoices,
                showSolutions: "all",
            });

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({
                ...defaultState,
                selected: true,
                readOnly: true,
                rationaleShown: true,
                correctnessShown: true,
            });
            expect(result[1].selected).toBe(false);
            expect(result[2].selected).toBe(false);
        });
    });

    describe("Case 2: Active user selection without submission", () => {
        it("preserves user's current choice states", () => {
            // Arrange
            const userChoiceStates: ChoiceState[] = [
                {...defaultState, selected: true},
                {...defaultState, selected: false},
            ];

            // Act
            const result = getChoiceStates({
                choices: mockChoices,
                choiceStates: userChoiceStates,
            });

            // Assert
            expect(result).toEqual(userChoiceStates);
        });
    });

    describe("Case 3: Legacy user selection without submission", () => {
        it("converts legacy values to choice states", () => {
            // Arrange
            const legacyValues = [false, true, false];

            // Act
            const result = getChoiceStates({
                choices: mockChoices,
                values: legacyValues,
            });

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0].selected).toBe(false);
            expect(result[1].selected).toBe(true);
            expect(result[2].selected).toBe(false);
        });
    });

    describe("Case 4: Initial state", () => {
        it("returns default unselected choice states", () => {
            // Arrange & Act
            const result = getChoiceStates({
                choices: mockChoices,
            });

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual(defaultState);
            expect(result[1]).toEqual(defaultState);
            expect(result[2]).toEqual(defaultState);
        });
    });
});

describe("parseNestedWidgets", () => {
    it("parses passage-ref widgets without summary text", () => {
        // Arrange
        const content =
            "Some content with {{passage-ref 1 2}} and {{passage-ref 3 4}}";

        // Act
        const result = parseNestedWidgets(content);

        // Assert
        expect(result.parsedContent).toMatch(
            "Some content with [[☃ passage-ref 1]] and [[☃ passage-ref 2]]",
        );
        expect(Object.keys(result.extractedWidgets)).toHaveLength(2);
        expect(result.extractedWidgets["passage-ref 1"]).toEqual({
            type: "passage-ref",
            graded: false,
            options: {
                passageNumber: 1,
                referenceNumber: 2,
                summaryText: undefined,
            },
            version: {
                major: 0,
                minor: 1,
            },
        });
        expect(result.extractedWidgets["passage-ref 2"]).toEqual({
            type: "passage-ref",
            graded: false,
            options: {
                passageNumber: 3,
                referenceNumber: 4,
                summaryText: undefined,
            },
            version: {
                major: 0,
                minor: 1,
            },
        });
    });

    it("parses passage-ref widgets with summary text", () => {
        // Arrange
        const content = 'Text with {{passage-ref 5 6 "Summary text"}}';

        // Act
        const result = parseNestedWidgets(content);

        // Assert
        expect(result.parsedContent).toMatch("Text with [[☃ passage-ref 1]]");

        expect(Object.keys(result.extractedWidgets)).toHaveLength(1);
        expect(result.extractedWidgets["passage-ref 1"]).toEqual({
            type: "passage-ref",
            graded: false,
            options: {
                passageNumber: 5,
                referenceNumber: 6,
                summaryText: "Summary text",
            },
            version: {
                major: 0,
                minor: 1,
            },
        });
    });

    it("returns the original content if no passage-ref widgets are found", () => {
        // Arrange
        const content = "Just regular content with no widgets";

        // Act
        const result = parseNestedWidgets(content);

        // Assert
        expect(result.parsedContent).toEqual(content);
        expect(Object.keys(result.extractedWidgets)).toHaveLength(0);
    });
});
