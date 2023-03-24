// @flow
import {Widgets} from "@khanacademy/perseus";

import {registerAllWidgetsAndEditorsForTesting} from "./register-all-widgets-and-editors-for-testing.js";

describe("Registering all widgets and editors", () => {
    it("should have an editor for every widget", () => {
        registerAllWidgetsAndEditorsForTesting();

        const allWidgetsTypes = Widgets.getAllWidgetTypes();

        expect(allWidgetsTypes).not.toContain("undefined");

        for (const widgetType of allWidgetsTypes.filter(
            // `input-number` is gone, but we register the type so that we can
            // redirect data that references it to the input-number widget.
            (widgetType) => widgetType !== "input-number",
        )) {
            expect(Widgets.getEditor(widgetType)).toBeTruthy();
        }
    });
});
