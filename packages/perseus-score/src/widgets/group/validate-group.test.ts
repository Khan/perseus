import {getTestDropdownWidget} from "../../util/test-helpers";

import validateGroup from "./validate-group";

import type {PerseusGroupWidgetOptions} from "@khanacademy/perseus-core";

describe("validateGroup", () => {
    it("returns invalid when the user input is undefined", () => {
        // Arrange:
        const userInput = undefined;
        const widgetOptions: PerseusGroupWidgetOptions = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": getTestDropdownWidget(),
            },
            images: {},
        };

        // Act:
        const result = validateGroup(userInput, widgetOptions, "en");

        // Assert:
        expect(result).toHaveInvalidInput();
    });
});
