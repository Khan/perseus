import {pythonProgramRegistration} from "@khanacademy/perseus/widgets/python-program";

import {defineEditorRegistration} from "../../editor-registration";

import PythonProgramEditor from "./python-program-editor";

export const pythonProgramEditorRegistration = defineEditorRegistration({
    widgetRegistration: pythonProgramRegistration,
    editor: PythonProgramEditor,
});
