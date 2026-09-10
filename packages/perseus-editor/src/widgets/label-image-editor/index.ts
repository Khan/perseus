import {labelImageRegistration} from "@khanacademy/perseus/widgets/label-image";

import {defineEditorRegistration} from "../../editor-registration";

import LabelImageEditor from "./label-image-editor";

export const labelImageEditorRegistration = defineEditorRegistration({
    widgetRegistration: labelImageRegistration,
    editor: LabelImageEditor,
});

export default LabelImageEditor;
