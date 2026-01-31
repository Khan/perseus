import {getUserInputFromSerializedState} from "./util";

describe("getUserInputFromSerializedState", () => {
    describe("single selection", () => {
        it("returns empty array when no choices are selected", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {id: "choice-1", content: "A", originalIndex: 0},
                    {id: "choice-2", content: "B", originalIndex: 1},
                    {id: "choice-3", content: "C", originalIndex: 2},
                ],
                choiceStates: [
                    {selected: false},
                    {selected: false},
                    {selected: false},
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            expect(result.selectedChoiceIds).toEqual([]);
        });

        it("returns correct ID for a single selected choice", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {id: "choice-1", content: "A", originalIndex: 0},
                    {id: "choice-2", content: "B", originalIndex: 1},
                    {id: "choice-3", content: "C", originalIndex: 2},
                ],
                choiceStates: [
                    {selected: false},
                    {selected: true}, // User selected the second displayed choice
                    {selected: false},
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            expect(result.selectedChoiceIds).toEqual(["choice-2"]);
        });

        it("handles shuffled choices correctly", () => {
            // Arrange
            // Simulating shuffled choices where display order doesn't match original order
            const serializedState = {
                choices: [
                    // Display order after shuffling:
                    {id: "choice-3", content: "C", originalIndex: 2}, // Originally 3rd, now 1st
                    {id: "choice-1", content: "A", originalIndex: 0}, // Originally 1st, now 2nd
                    {id: "choice-2", content: "B", originalIndex: 1}, // Originally 2nd, now 3rd
                ],
                choiceStates: [
                    {selected: false},
                    {selected: true}, // User selected 2nd displayed choice (originally 1st)
                    {selected: false},
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            // Should return the ID of the choice at display position 1 (which is "choice-1")
            expect(result.selectedChoiceIds).toEqual(["choice-1"]);
        });
    });

    describe("multiple selection", () => {
        it("returns multiple selected choice IDs", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {id: "choice-1", content: "A", originalIndex: 0},
                    {id: "choice-2", content: "B", originalIndex: 1},
                    {id: "choice-3", content: "C", originalIndex: 2},
                    {id: "choice-4", content: "D", originalIndex: 3},
                ],
                choiceStates: [
                    {selected: true}, // Selected
                    {selected: false},
                    {selected: true}, // Selected
                    {selected: false},
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            expect(result.selectedChoiceIds).toEqual(["choice-1", "choice-3"]);
        });

        it("handles multiple selections with shuffled choices", () => {
            // Arrange
            const serializedState = {
                choices: [
                    // Shuffled order
                    {id: "choice-4", content: "D", originalIndex: 3},
                    {id: "choice-2", content: "B", originalIndex: 1},
                    {id: "choice-1", content: "A", originalIndex: 0},
                    {id: "choice-3", content: "C", originalIndex: 2},
                ],
                choiceStates: [
                    {selected: true}, // Selects "choice-4"
                    {selected: false},
                    {selected: true}, // Selects "choice-1"
                    {selected: true}, // Selects "choice-3"
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            expect(result.selectedChoiceIds).toEqual([
                "choice-4",
                "choice-1",
                "choice-3",
            ]);
        });

        it("preserves selection order", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {id: "choice-1", content: "A", originalIndex: 0},
                    {id: "choice-2", content: "B", originalIndex: 1},
                    {id: "choice-3", content: "C", originalIndex: 2},
                ],
                choiceStates: [
                    {selected: false},
                    {selected: true}, // Second selected
                    {selected: true}, // Third selected
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            // Order should match display order, not original indices
            expect(result.selectedChoiceIds).toEqual(["choice-2", "choice-3"]);
        });
    });

    describe("edge cases and error handling", () => {
        it("handles missing choiceStates gracefully", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {id: "choice-1", content: "A", originalIndex: 0},
                    {id: "choice-2", content: "B", originalIndex: 1},
                ],
                // No choiceStates property
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            expect(result.selectedChoiceIds).toEqual([]);
        });

        it("handles undefined choiceStates entries", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {id: "choice-1", content: "A", originalIndex: 0},
                    {id: "choice-2", content: "B", originalIndex: 1},
                    {id: "choice-3", content: "C", originalIndex: 2},
                ],
                choiceStates: [
                    {selected: true},
                    undefined, // This can happen per TODO(LEMS-3861)
                    {selected: true},
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            expect(result.selectedChoiceIds).toEqual(["choice-1", "choice-3"]);
        });

        it("handles mismatched choices and choiceStates lengths", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {id: "choice-1", content: "A", originalIndex: 0},
                    {id: "choice-2", content: "B", originalIndex: 1},
                ],
                choiceStates: [
                    {selected: true},
                    {selected: true},
                    {selected: true}, // Extra choiceState without corresponding choice
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            // Should only return IDs for choices that exist
            expect(result.selectedChoiceIds).toEqual(["choice-1", "choice-2"]);
        });

        it("handles undefined choice entries", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {id: "choice-1", content: "A", originalIndex: 0},
                    undefined, // This is also mentioned in TODO(LEMS-3861)
                    {id: "choice-3", content: "C", originalIndex: 2},
                ],
                choiceStates: [
                    {selected: true},
                    {selected: true}, // Selected but choice is undefined
                    {selected: false},
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            // Should skip undefined choices
            expect(result.selectedChoiceIds).toEqual(["choice-1"]);
        });

        it("handles missing choice IDs", () => {
            // Arrange
            const serializedState = {
                choices: [
                    {content: "A", originalIndex: 0}, // Missing ID
                    {id: "choice-2", content: "B", originalIndex: 1},
                ],
                choiceStates: [
                    {selected: true}, // Selected but choice has no ID
                    {selected: true},
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            // Should only include choices with valid IDs
            expect(result.selectedChoiceIds).toEqual(["choice-2"]);
        });

        it("returns empty array for completely malformed input", () => {
            // Arrange
            const testCases = [
                null,
                undefined,
                {},
                {choices: null, choiceStates: null},
                {choices: [], choiceStates: []},
                "not an object",
                42,
            ];

            testCases.forEach((serializedState) => {
                // Act
                const result = getUserInputFromSerializedState(serializedState);

                // Assert
                expect(result.selectedChoiceIds).toEqual([]);
            });
        });
    });

    describe("real-world scenarios", () => {
        it("handles a typical shuffled single-choice question", () => {
            // Arrange - simulating actual widget state after user interaction
            const serializedState = {
                numCorrect: 1,
                randomize: true,
                choices: [
                    // After shuffling with seed
                    {
                        id: "opt_3",
                        content: "The Pacific Ocean",
                        correct: false,
                        originalIndex: 2,
                    },
                    {
                        id: "opt_1",
                        content: "The Atlantic Ocean",
                        correct: true,
                        originalIndex: 0,
                    },
                    {
                        id: "opt_2",
                        content: "The Indian Ocean",
                        correct: false,
                        originalIndex: 1,
                    },
                    {
                        id: "opt_4",
                        content: "The Arctic Ocean",
                        correct: false,
                        originalIndex: 3,
                    },
                ],
                choiceStates: [
                    {
                        selected: false,
                        highlighted: false,
                        rationaleShown: false,
                        correctnessShown: false,
                        previouslyAnswered: false,
                        readOnly: false,
                    },
                    {
                        selected: true, // User selected Atlantic Ocean (correct)
                        highlighted: false,
                        rationaleShown: false,
                        correctnessShown: false,
                        previouslyAnswered: false,
                        readOnly: false,
                    },
                    {
                        selected: false,
                        highlighted: false,
                        rationaleShown: false,
                        correctnessShown: false,
                        previouslyAnswered: false,
                        readOnly: false,
                    },
                    {
                        selected: false,
                        highlighted: false,
                        rationaleShown: false,
                        correctnessShown: false,
                        previouslyAnswered: false,
                        readOnly: false,
                    },
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            expect(result.selectedChoiceIds).toEqual(["opt_1"]);
        });

        it("handles 'None of the above' option at the end", () => {
            // Arrange
            const serializedState = {
                hasNoneOfTheAbove: true,
                choices: [
                    {id: "opt_2", content: "Option B", originalIndex: 1},
                    {id: "opt_1", content: "Option A", originalIndex: 0},
                    {id: "opt_3", content: "Option C", originalIndex: 2},
                    {
                        id: "opt_none",
                        content: "",
                        isNoneOfTheAbove: true,
                        originalIndex: 3,
                    },
                ],
                choiceStates: [
                    {selected: false},
                    {selected: false},
                    {selected: false},
                    {selected: true}, // User selected "None of the above"
                ],
            };

            // Act
            const result = getUserInputFromSerializedState(serializedState);

            // Assert
            expect(result.selectedChoiceIds).toEqual(["opt_none"]);
        });
    });
});
