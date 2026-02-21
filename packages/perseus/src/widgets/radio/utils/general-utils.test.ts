import {getChoiceStates} from "./general-utils";

import type {ChoiceState} from "../../../types";
import type {RadioChoiceWithMetadata} from "../multiple-choice-widget";

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

    describe("Case 1: Review mode", () => {
        it("sets correct answers as selected when showSolutions is 'all'", () => {
            // Arrange & Act
            const result = getChoiceStates({
                choices: mockChoices,
                showSolutions: "all",
            });

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({selected: true});
            expect(result[1]).toEqual({selected: false});
            expect(result[2]).toEqual({selected: false});
        });

        it("sets correct answers as selected when reviewMode is true", () => {
            // Arrange & Act
            const result = getChoiceStates({
                choices: mockChoices,
                reviewMode: true,
            });

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({selected: true});
            expect(result[1]).toEqual({selected: false});
            expect(result[2]).toEqual({selected: false});
        });
    });

    describe("Case 2: Active user selection without submission", () => {
        it("preserves user's current choice states", () => {
            // Arrange
            const userChoiceStates: ChoiceState[] = [
                {selected: true},
                {selected: false},
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

    describe("Case 3: Initial state", () => {
        it("returns default unselected choice states", () => {
            // Arrange & Act
            const result = getChoiceStates({
                choices: mockChoices,
            });

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({selected: false});
            expect(result[1]).toEqual({selected: false});
            expect(result[2]).toEqual({selected: false});
        });
    });
});
