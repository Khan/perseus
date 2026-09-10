import {numericInputRegistration} from "@khanacademy/perseus/widgets/numeric-input";

import {defineEditorRegistration} from "../../editor-registration";

import NumericInputEditor from "./numeric-input-editor";

export const numericInputEditorRegistration = defineEditorRegistration({
    widgetRegistration: numericInputRegistration,
    editor: NumericInputEditor,
});

export default NumericInputEditor;
