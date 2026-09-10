import {plotterRegistration} from "@khanacademy/perseus/widgets/plotter";

import {defineEditorRegistration} from "../../editor-registration";

import PlotterEditor from "./plotter-editor";

export const plotterEditorRegistration = defineEditorRegistration({
    widgetRegistration: plotterRegistration,
    editor: PlotterEditor,
});
