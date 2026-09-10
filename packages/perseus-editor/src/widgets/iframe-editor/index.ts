import {iframeRegistration} from "@khanacademy/perseus/widgets/iframe";

import {defineEditorRegistration} from "../../editor-registration";

import IframeEditor from "./iframe-editor";

export const iframeEditorRegistration = defineEditorRegistration({
    widgetRegistration: iframeRegistration,
    editor: IframeEditor,
});
