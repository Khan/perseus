import getMatcherPublicWidgetOptions from "./matcher-util";

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
        expect(publicWidgetOptions.left).toEqual(options.left)
        expect(publicWidgetOptions.right).toEqual([
            "Stars",
            "Earth",
            "Life",
            "Milky Way",
            "Rapid"
        ])
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
        ])
        expect(publicWidgetOptions.right).toEqual([
            "Stars",
            "Earth",
            "Life",
            "Milky Way",
            "Rapid",
        ])
    });
});
