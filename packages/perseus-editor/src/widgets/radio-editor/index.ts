import {radioRegistration} from "@khanacademy/perseus/widgets/radio";

import {defineEditorRegistration} from "../../editor-registration";

import RadioEditor from "./radio-editor";

export const radioEditorRegistration = defineEditorRegistration({
    widgetRegistration: radioRegistration,
    editor: RadioEditor,
});

export default RadioEditor;
