import {groupRegistration} from "@khanacademy/perseus/widgets/group";

import {defineEditorRegistration} from "../../editor-registration";

import GroupEditor from "./group-editor";

export const groupEditorRegistration = defineEditorRegistration({
    widgetRegistration: groupRegistration,
    editor: GroupEditor,
});
