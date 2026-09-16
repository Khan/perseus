import {
    CoreWidgetRegistry,
    getGroupPublicWidgetOptions,
} from "@khanacademy/perseus-core";
import dropdownLogic from "@khanacademy/perseus-core/widgets/dropdown";

import {getTestDropdownWidget} from "../../util/test-helpers";

import validateGroup from "./validate-group";

// widget-manifest setup: start
function registerManifestWidgets(): void {
    CoreWidgetRegistry.registerLogics([dropdownLogic]);
}
registerManifestWidgets();
// widget-manifest setup: end
describe("validateGroup", () => {
    beforeEach(() => {
        CoreWidgetRegistry.registerLogics([dropdownLogic]);
    });

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
});
