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
        expect(publicWidgetOptions.left).toEqual(options.left);
        expect(new Set(publicWidgetOptions.right)).toEqual(
            new Set(options.right),
        );
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
        expect(new Set(publicWidgetOptions.left)).toEqual(
            new Set(options.left),
        );
        expect(publicWidgetOptions.left).not.toEqual(options.left);

        expect(new Set(publicWidgetOptions.right)).toEqual(
            new Set(options.right),
        );
        expect(publicWidgetOptions.right).not.toEqual(options.right);
    });
});
