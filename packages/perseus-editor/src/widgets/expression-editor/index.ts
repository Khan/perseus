import {expressionRegistration} from "@khanacademy/perseus/widgets/expression";

import {defineEditorRegistration} from "../../editor-registration";

import ExpressionEditor from "./expression-editor";

export const expressionEditorRegistration = defineEditorRegistration({
    widgetRegistration: expressionRegistration,
    editor: ExpressionEditor,
});

export default ExpressionEditor;
