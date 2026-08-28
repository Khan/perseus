import {Widgets} from "@khanacademy/perseus";

import allEditors from "./all-editors";
import {registerAllWidgetsAndEditorsForTesting} from "./util/register-all-widgets-and-editors-for-testing";

describe("All editors", () => {
    beforeEach(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    it("registers each editor under the widget type it edits", () => {
        // Arrange, Act, Assert
        for (const [widgetType, editor] of Object.entries(allEditors)) {
            expect(Widgets.getEditor(widgetType)).toBe(editor);
        }
    });

    it("is keyed by widget types that exist", () => {
        // Arrange, Act, Assert
        for (const widgetType of Object.keys(allEditors)) {
            expect(Widgets.getWidget(widgetType)).not.toBeNull();
        }
    });
});
