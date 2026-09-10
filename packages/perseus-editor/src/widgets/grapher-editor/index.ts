import {grapherRegistration} from "@khanacademy/perseus/widgets/grapher";

import {defineEditorRegistration} from "../../editor-registration";

import GrapherEditor from "./grapher-editor";

export const grapherEditorRegistration = defineEditorRegistration({
    widgetRegistration: grapherRegistration,
    editor: GrapherEditor,
});
