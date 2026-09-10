import {gradedGroupSetRegistration} from "@khanacademy/perseus/widgets/graded-group-set";

import {defineEditorRegistration} from "../../editor-registration";

import GradedGroupSetEditor from "./graded-group-set-editor";

export const gradedGroupSetEditorRegistration = defineEditorRegistration({
    widgetRegistration: gradedGroupSetRegistration,
    editor: GradedGroupSetEditor,
});
