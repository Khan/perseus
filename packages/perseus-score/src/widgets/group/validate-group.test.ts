import {
    ErrorCodes,
    generateFreeResponseOptions,
    generateFreeResponseWidget,
    getGroupPublicWidgetOptions,
} from "@khanacademy/perseus-core";

import {getTestDropdownWidget} from "../../util/widgets.testutils";

import validateGroup from "./validate-group";

describe("validateGroup", () => {
    it("returns invalid when the user input is undefined", () => {
        // Arrange:
        const userInput = undefined;
        const validationData = getGroupPublicWidgetOptions({
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

    it("returns a widget's validation message", () => {
        // Arrange:
        const validationData = getGroupPublicWidgetOptions({
            content: "[[☃ free-response 1]]",
            widgets: {
                "free-response 1": generateFreeResponseWidget({
                    options: generateFreeResponseOptions({
                        allowUnlimitedCharacters: false,
                        characterLimit: 5,
                    }),
                }),
            },
            images: {},
        });

        // Act:
        const result = validateGroup(
            {"free-response 1": {currentValue: "longer than five"}},
            validationData,
            "en",
        );

        // Assert:
        expect(result).toHaveInvalidInput(ErrorCodes.USER_INPUT_TOO_LONG);
    });

    describe("a widget that isn't in the content", () => {
        it("isn't validated", () => {
            // Arrange:
            const validationData = getGroupPublicWidgetOptions({
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                    "dropdown 2": getTestDropdownWidget(),
                },
                images: {},
            });

            // Act:
            const result = validateGroup(
                {"dropdown 1": {value: 1}},
                validationData,
                "en",
            );

            // Assert:
            expect(result).toBeNull();
        });
    });
});
