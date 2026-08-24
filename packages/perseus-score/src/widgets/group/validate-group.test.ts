import {getGroupPublicWidgetOptions} from "@khanacademy/perseus-core";

import {getTestDropdownWidget} from "../../util/test-helpers";

import validateGroup from "./validate-group";

import type {GroupPublicWidgetOptions} from "@khanacademy/perseus-core";

describe("validateGroup", () => {
    it("returns invalid when the user input is undefined", () => {
        // Arrange:
        const userInput = undefined;
        const validationData: GroupPublicWidgetOptions =
            getGroupPublicWidgetOptions({
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                },
                images: {},
            });

        // Act:
        const result = validateGroup(userInput, validationData, "en");

        // Assert:
        expect(result).toHaveInvalidInput();
    });
});
