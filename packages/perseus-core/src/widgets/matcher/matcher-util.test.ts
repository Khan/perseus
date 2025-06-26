import {range} from "../../utils/range";

import getMatcherPublicWidgetOptions, {shuffleMatcher} from "./matcher-util";

import type {PerseusMatcherWidgetOptions} from "../../data-schema";

describe("getMatcherPublicWidgetOptions", () => {
    it("sorts the right-hand column, leaving the first item in place, when orderMatters is false", () => {
        // Arrange
        const options: PerseusMatcherWidgetOptions = {
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: false,
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
            right: ["Stars", "Rapid", "Milky Way", "Earth", "Life"],
        };

        // Act
        const publicWidgetOptions = getMatcherPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions.left).toEqual(options.left);
        expect(publicWidgetOptions.right).toEqual([
            "Stars",
            "Earth",
            "Life",
            "Milky Way",
            "Rapid",
        ]);
    });

    it("sorts both columns, leaving the first items in place, when orderMatters is true", () => {
        // Arrange
        const options: PerseusMatcherWidgetOptions = {
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: true,
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
            right: ["Stars", "Milky Way", "Earth", "Rapid", "Life"],
        };

        // Act
        const publicWidgetOptions = getMatcherPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions.left).toEqual([
            "Fuel",
            "Average",
            "Billion",
            "Hydrogen",
            "Plate",
        ]);
        expect(publicWidgetOptions.right).toEqual([
            "Stars",
            "Earth",
            "Life",
            "Milky Way",
            "Rapid",
        ]);
    });
});

describe("shuffleMatcher", () => {
    it("does nothing when there are no cards", () => {
        const options = {
            orderMatters: false,
            left: [],
            right: [],
        };

        const result = shuffleMatcher(options, 0);
        expect(result.left).toEqual([]);
        expect(result.right).toEqual([]);
    });

    it("does nothing when there is only one card in each column", () => {
        const options = {
            orderMatters: true,
            left: ["1"],
            right: ["A"],
        };

        const result = shuffleMatcher(options, 0);
        expect(result.left).toEqual(["1"]);
        expect(result.right).toEqual(["A"]);
    });

    it("does nothing when all cards are the same", () => {
        const options = {
            orderMatters: true,
            left: ["", ""],
            right: ["", ""],
        };

        const result = shuffleMatcher(options, 0);
        expect(result.left).toEqual(["", ""]);
        expect(result.right).toEqual(["", ""]);
    });

    it("shuffles the right column when orderMatters is false, using problemNum as the seed", () => {
        const options = {
            orderMatters: false,
            left: ["1", "2", "3"],
            right: ["A", "B", "C"],
        };

        const result = shuffleMatcher(options, 0);
        expect(result).toEqual({left: ["1", "2", "3"], right: ["B", "A", "C"]});
    });

    describe.each(range(0, 30))(
        "when orderMatters is false and problemNum is %d",
        (problemNum) => {
            const options = {
                orderMatters: false,
                left: ["1", "2", "3"],
                right: ["A", "B", "C"],
            };

            it("displaces the first card in the right column", () => {
                expect(shuffleMatcher(options, problemNum).right[0]).not.toBe(
                    "A",
                );
            });

            it("does not shuffle the left column", () => {
                expect(shuffleMatcher(options, problemNum).left).toEqual([
                    "1",
                    "2",
                    "3",
                ]);
            });
        },
    );

    it("shuffles both columns when orderMatters is true, using problemNum as the seed", () => {
        const options = {
            orderMatters: true,
            left: ["1", "2", "3"],
            right: ["A", "B", "C"],
        };

        const result = shuffleMatcher(options, 0);
        expect(result).toEqual({left: ["2", "1", "3"], right: ["B", "A", "C"]});
    });

    describe.each(range(0, 30))(
        "when orderMatters is true and problemNum is %d",
        (problemNum) => {
            const options = {
                orderMatters: true,
                left: ["1", "2", "3"],
                right: ["A", "B", "C"],
            };

            it("displaces the first card in the left column", () => {
                expect(shuffleMatcher(options, problemNum).left[0]).not.toBe(
                    "1",
                );
            });

            it("displaces the first card in the right column", () => {
                expect(shuffleMatcher(options, problemNum).right[0]).not.toBe(
                    "A",
                );
            });
        },
    );
});
