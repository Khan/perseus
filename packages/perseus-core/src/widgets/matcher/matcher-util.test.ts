import getMatcherPublicWidgetOptions from "./matcher-util";

import type {PerseusMatcherWidgetOptions} from "../../data-schema";

describe("getMatcherPublicWidgetOptions", () => {
    it("should return a shuffled right array when order doesn't matter to remove the correct order information", () => {
        // Arrange
        const options: PerseusMatcherWidgetOptions = {
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: false,
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
            right: ["Stars", "Earth", "Life", "Rapid", "Milky Way"],
        };

        // Act
        const publicWidgetOptions = getMatcherPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: false,
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
            right: ["Milky Way", "Stars", "Life", "Earth", "Rapid"],
        });
        expect(publicWidgetOptions.right).not.toEqual(options.right);
    });

    it("should return shuffled left and right arrays when order matters to remove the correct order information", () => {
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
