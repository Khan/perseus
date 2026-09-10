import {fillInTheBlankRegistration} from "@khanacademy/perseus/widgets/fill-in-the-blank";

import {defineEditorRegistration} from "../../editor-registration";

import FillInTheBlankEditor from "./fill-in-the-blank-editor";

export const fillInTheBlankEditorRegistration = defineEditorRegistration({
    widgetRegistration: fillInTheBlankRegistration,
    editor: FillInTheBlankEditor,
});
