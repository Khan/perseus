import {inputNumberRegistration} from "@khanacademy/perseus/widgets/input-number";

import {defineEditorRegistration} from "../../editor-registration";

import InputNumberEditor from "./input-number-editor";

export const inputNumberEditorRegistration = defineEditorRegistration({
    widgetRegistration: inputNumberRegistration,
    editor: InputNumberEditor,
});
