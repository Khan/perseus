import {interactionRegistration} from "@khanacademy/perseus/widgets/interaction";

import {defineEditorRegistration} from "../../editor-registration";

import InteractionEditor from "./interaction-editor";

export const interactionEditorRegistration = defineEditorRegistration({
    widgetRegistration: interactionRegistration,
    editor: InteractionEditor,
});

export default InteractionEditor;
