import {Widgets} from "@khanacademy/perseus";

import {registerAllWidgetsAndEditorsForTesting} from "./register-all-widgets-and-editors-for-testing";

describe("Registering all widgets and editors", () => {
    it("should have an editor for every widget", () => {
        registerAllWidgetsAndEditorsForTesting();

        const allWidgetsTypes = Widgets.getAllWidgetTypes();

        expect(allWidgetsTypes).not.toContain("undefined");

        for (const widgetType of allWidgetsTypes) {
            expect(Widgets.getEditor(widgetType)).toBeTruthy();
        }
    });
});
