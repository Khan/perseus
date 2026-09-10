import {freeResponseRegistration} from "@khanacademy/perseus/widgets/free-response";

import {defineEditorRegistration} from "../../editor-registration";

import FreeResponseEditor from "./free-response-editor";

export const freeResponseEditorRegistration = defineEditorRegistration({
    widgetRegistration: freeResponseRegistration,
    editor: FreeResponseEditor,
});
