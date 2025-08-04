import validateGroup from "./validate-group";

import type {PerseusGroupValidationData} from "@khanacademy/perseus-core";

describe("validateGroup", () => {
    it("returns invalid when the user input is undefined", () => {
        // Arrange:
        const userInput = undefined;
        const validationData: PerseusGroupValidationData = {
            widgets: {
                "categorizer 1": {
                    type: "categorizer",
                    options: {
                        items: ["a"],
                    },
                },
            },
        };

        // Act:
        const result = validateGroup(userInput, validationData, "en");

        // Assert:
        expect(result).toHaveInvalidInput();
    });
});
