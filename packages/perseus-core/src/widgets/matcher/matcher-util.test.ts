import getMatcherPublicWidgetOptions from "./matcher-util";

import type {PerseusMatcherWidgetOptions} from "../../data-schema";

describe("getMatcherPublicWidgetOptions", () => {
    it("should return shuffled right array when order doesn't matter", () => {
        // Arrange
        const options: PerseusMatcherWidgetOptions = {
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: false,
            right: ["Stars", "Earth", "Life", "Rapid", "Milky Way"],
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
        };

        // Act
        const publicWidgetOptions = getMatcherPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: false,
            right: ["Milky Way", "Stars", "Life", "Earth", "Rapid"],
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
        });
        expect(publicWidgetOptions.right).not.toEqual(options.right);
    });

    it("should return shuffled left and right arrays when order matters", () => {
        // Arrange
        const options: PerseusMatcherWidgetOptions = {
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: true,
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
            right: ["Stars", "Earth", "Life", "Rapid", "Milky Way"],
        };

        // Act
        const publicWidgetOptions = getMatcherPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: true,
            left: ["Billion", "Fuel", "Hydrogen", "Plate", "Average"],
            right: ["Milky Way", "Stars", "Life", "Earth", "Rapid"],
        });
        expect(publicWidgetOptions.right).not.toEqual(options.right);
        expect(publicWidgetOptions.left).not.toEqual(options.left);
    });
});
