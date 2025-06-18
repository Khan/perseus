import {range} from "../../utils/range";

import getSorterPublicWidgetOptions, {shuffleSorter} from "./sorter-util";

import type {PerseusSorterWidgetOptions} from "../../data-schema";

describe("getSorterPublicWidgetOptions", () => {
    it("obscures answer data by sorting the correct field, leaving the first card in place", () => {
        // We need to leave the first card in place because it is used by
        // shuffleSorter (see below) to ensure that learners don't see the
        // correct answer as the initial state of the widget.

        // Arrange
        const options: PerseusSorterWidgetOptions = {
            correct: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            layout: "horizontal",
            padding: true,
        };

        // Act
        const publicWidgetOptions = getSorterPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            correct: ["$15$ grams", "$0.005$ kilograms", "$55$ grams"],
            layout: "horizontal",
            padding: true,
        });
    });
});

describe("shuffleSorter", () => {
    it("does nothing given no cards", () => {
        expect(shuffleSorter({correct: []}, 0)).toEqual([]);
    });

    describe.each(range(0, 10))("when problemNum is %d", (problemNum) => {
        // problemNum is used as the seed for the shuffle.

        it("always moves the first card", () => {
            const shuffled = shuffleSorter(
                {
                    correct: ["1", "2", "3", "4"],
                },
                problemNum,
            );
            expect(shuffled[0]).not.toEqual(["1"]);
        });

        it("preserves the set of cards", () => {
            const correct = ["1", "2", "3", "4"];
            const shuffled = shuffleSorter({correct}, problemNum);
            expect(new Set(shuffled)).toEqual(new Set(correct));
        });
    });
});
