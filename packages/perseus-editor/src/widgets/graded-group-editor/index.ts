import {gradedGroupRegistration} from "@khanacademy/perseus/widgets/graded-group";

import {defineEditorRegistration} from "../../editor-registration";

import GradedGroupEditor from "./graded-group-editor";

export const gradedGroupEditorRegistration = defineEditorRegistration({
    widgetRegistration: gradedGroupRegistration,
    editor: GradedGroupEditor,
});

export default GradedGroupEditor;
