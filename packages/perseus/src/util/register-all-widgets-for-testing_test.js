// @flow
import * as Widgets from "../widgets.js";

import {registerAllWidgetsForTesting} from "./register-all-widgets-for-testing.js";

describe("Registering all widgets and editors", () => {
    it("should have an editor for every widget", () => {
        registerAllWidgetsForTesting();

        const allWidgetsTypes = Widgets.getAllWidgetTypes();

        expect(allWidgetsTypes).not.toContain("undefined");

        for (const widgetType of allWidgetsTypes) {
            expect(Widgets.getEditor(widgetType)).toBeTruthy();
        }
    });
});
