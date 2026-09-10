import {numberLineRegistration} from "@khanacademy/perseus/widgets/number-line";

import {defineEditorRegistration} from "../../editor-registration";

import NumberLineEditor from "./number-line-editor";

export const numberLineEditorRegistration = defineEditorRegistration({
    widgetRegistration: numberLineRegistration,
    editor: NumberLineEditor,
});
