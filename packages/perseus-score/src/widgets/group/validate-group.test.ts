import {getTestDropdownWidget} from "../../util/test-helpers";

import validateGroup from "./validate-group";

import type {PerseusGroupValidationData} from "@khanacademy/perseus-core";

describe("validateGroup", () => {
    it("returns invalid when the user input is undefined", () => {
        // Arrange:
        const userInput = undefined;
        const validationData: PerseusGroupValidationData = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": getTestDropdownWidget(),
            },
            images: {},
        };

        // Act:
        const result = validateGroup(userInput, validationData, "en");

        // Assert:
        expect(result).toHaveInvalidInput();
    });
});
