import {csProgramRegistration} from "@khanacademy/perseus/widgets/cs-program";

import {defineEditorRegistration} from "../../editor-registration";

import CSProgramEditor from "./cs-program-editor";

export const csProgramEditorRegistration = defineEditorRegistration({
    widgetRegistration: csProgramRegistration,
    editor: CSProgramEditor,
});
