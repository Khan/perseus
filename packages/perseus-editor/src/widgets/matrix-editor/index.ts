import {matrixRegistration} from "@khanacademy/perseus/widgets/matrix";

import {defineEditorRegistration} from "../../editor-registration";

import MatrixEditor from "./matrix-editor";

export const matrixEditorRegistration = defineEditorRegistration({
    widgetRegistration: matrixRegistration,
    editor: MatrixEditor,
});
