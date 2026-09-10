import {imageRegistration} from "@khanacademy/perseus/widgets/image";

import {defineEditorRegistration} from "../../editor-registration";

import ImageEditor from "./image-editor";

export const imageEditorRegistration = defineEditorRegistration({
    widgetRegistration: imageRegistration,
    editor: ImageEditor,
});

export default ImageEditor;
