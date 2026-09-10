import {measurerRegistration} from "@khanacademy/perseus/widgets/measurer";

import {defineEditorRegistration} from "../../editor-registration";

import MeasurerEditor from "./measurer-editor";

export const measurerEditorRegistration = defineEditorRegistration({
    widgetRegistration: measurerRegistration,
    editor: MeasurerEditor,
});
