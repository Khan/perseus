import getMatcherPublicWidgetOptions from "./matcher-util";

import type {PerseusMatcherWidgetOptions} from "../../data-schema";

describe("getMatcherPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusMatcherWidgetOptions = {
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: false,
            right: [
                "Medium-sized stars typically exist for roughly 10 billion years",
                "The current trajectory of the Earth\u2019s tectonic plate movement",
                "The life cycle of medium-sized stars includes a red giant stage and ends in a whimper as a white dwarf",
                "Rapid escalation of greenhouse gas emissions",
                "The current trajectory of the Milky Way galaxy and those in its immediate proximity",
            ],
            left: [
                "Our Sun will run out of fuel and die in around 5 billion years ",
                "Plate tectonics will rearrange the continents: the Pacific will narrow, bringing Australia closer to the Americas, and the Atlantic will expand to form the largest of the oceans ",
                "Our Sun will run out of hydrogen, swell into a red giant, gobble up the inner rocky planets, and then collapse and die ",
                "Average global temperatures will rise ",
                "In 3 to 4 billion years, our galaxy will begin a slow collision with its closest large neighbor, Andromeda ",
            ],
        };

        // Act
        const publicWidgetOptions = getMatcherPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            labels: ["**Claims**", "**Evidence**"],
            padding: true,
            orderMatters: false,
        });
    });
});
