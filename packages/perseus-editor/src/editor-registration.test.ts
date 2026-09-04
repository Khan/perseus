import {defineWidgetRegistration, Radio} from "@khanacademy/perseus";
import radioLogic from "@khanacademy/perseus-core/widgets/radio";

import {defineEditorRegistration} from "./editor-registration";
import RadioEditor from "./widgets/radio-editor";

const radioRegistration = defineWidgetRegistration({
    widget: {name: "radio", displayName: "Radio", widget: Radio},
    logic: radioLogic,
});

describe("defineEditorRegistration", () => {
    it("returns the widget registration and editor unchanged", () => {
        // Arrange, Act
        const registration = defineEditorRegistration({
            widgetRegistration: radioRegistration,
            editor: RadioEditor,
        });

        expect(registration).toEqual({
            widgetRegistration: radioRegistration,
            editor: RadioEditor,
        });
    });

    it("takes its widget type from the widget registration", () => {
        // Arrange, Act
        const registration = defineEditorRegistration({
            widgetRegistration: radioRegistration,
            editor: RadioEditor,
        });

        expect(registration.widgetRegistration.widget.name).toBe("radio");
    });
});
