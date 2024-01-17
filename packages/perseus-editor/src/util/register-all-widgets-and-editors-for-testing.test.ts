import {Widgets} from "@khanacademy/perseus";

import {registerAllWidgetsAndEditorsForTesting} from "./register-all-widgets-and-editors-for-testing";

describe("Registering all widgets and editors", () => {
    it("should have an editor for every widget", () => {
        registerAllWidgetsAndEditorsForTesting();

        const allWidgetsTypes = Widgets.getAllWidgetTypes()
            // Auto correct is a special kind of widget, it DOES NOT need an editor
            .filter((a) => a !== "deprecated-standin");

        expect(allWidgetsTypes).not.toContain("undefined");

        for (const widgetType of allWidgetsTypes) {
            expect(Widgets.getEditor(widgetType)).toBeTruthy();
        }
    });
});
