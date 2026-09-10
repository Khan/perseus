import {definitionRegistration} from "@khanacademy/perseus/widgets/definition";

import {defineEditorRegistration} from "../../editor-registration";

import DefinitionEditor from "./definition-editor";

export const definitionEditorRegistration = defineEditorRegistration({
    widgetRegistration: definitionRegistration,
    editor: DefinitionEditor,
});

export default DefinitionEditor;
