import {interactiveGraphRegistration} from "@khanacademy/perseus/widgets/interactive-graphs";

import {defineEditorRegistration} from "../../editor-registration";

import InteractiveGraphEditor from "./interactive-graph-editor";

export const interactiveGraphEditorRegistration = defineEditorRegistration({
    widgetRegistration: interactiveGraphRegistration,
    editor: InteractiveGraphEditor,
});

export default InteractiveGraphEditor;
