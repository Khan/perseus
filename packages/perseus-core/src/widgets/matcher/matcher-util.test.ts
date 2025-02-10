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
        expect(publicWidgetOptions.left).toEqual(options.left);
        expect(publicWidgetOptions.right).not.toEqual(options.right);
    });

    it("should return shuffled left and right arrays when order matters", () => {
        // Arrange
        const options: PerseusMatcherWidgetOptions = {
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: true,
            right: ["Stars", "Earth", "Life", "Rapid", "Milky Way"],
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
        };

        // Act
        const publicWidgetOptions = getMatcherPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions.left).not.toEqual(options.left);
        expect(publicWidgetOptions.right).not.toEqual(options.right);
    });
});
