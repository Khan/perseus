import {explanationRegistration} from "@khanacademy/perseus/widgets/explanation";

import {defineEditorRegistration} from "../../editor-registration";

import ExplanationEditor from "./explanation-editor";

export const explanationEditorRegistration = defineEditorRegistration({
    widgetRegistration: explanationRegistration,
    editor: ExplanationEditor,
});

export default ExplanationEditor;
