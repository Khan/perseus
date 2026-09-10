import {categorizerRegistration} from "@khanacademy/perseus/widgets/categorizer";

import {defineEditorRegistration} from "../../editor-registration";

import CategorizerEditor from "./categorizer-editor";

export const categorizerEditorRegistration = defineEditorRegistration({
    widgetRegistration: categorizerRegistration,
    editor: CategorizerEditor,
});

export default CategorizerEditor;
