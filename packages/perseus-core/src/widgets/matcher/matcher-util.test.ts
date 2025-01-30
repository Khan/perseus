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
            right: ["Life", "Rapid", "Stars", "Milky Way", "Earth"],
            left: ["Fuel", "Plate", "Hydrogen", "Average", "Billion"],
        });
    });

    it("should return shuffled left and right array when order matters", () => {
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
        expect(publicWidgetOptions).toEqual({
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: true,
            right: ["Life", "Earth", "Rapid", "Stars", "Milky Way"],
            left: ["Hydrogen", "Average", "Fuel", "Billion", "Plate"],
        });
    });
});
