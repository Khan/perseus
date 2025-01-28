import getMatcherPublicWidgetOptions from "./matcher-util";

import type {PerseusMatcherWidgetOptions} from "../../data-schema";

describe("getMatcherPublicWidgetOptions", () => {
    it("should return left and right arrays with sorted items to remove correct order information", () => {
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
            right: ["Earth", "Life", "Milky Way", "Rapid", "Stars"],
            left: ["Average", "Billion", "Fuel", "Hydrogen", "Plate"],
        });
    });
});
