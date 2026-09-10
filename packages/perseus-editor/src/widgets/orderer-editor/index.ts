import {ordererRegistration} from "@khanacademy/perseus/widgets/orderer";

import {defineEditorRegistration} from "../../editor-registration";

import OrdererEditor from "./orderer-editor";

export const ordererEditorRegistration = defineEditorRegistration({
    widgetRegistration: ordererRegistration,
    editor: OrdererEditor,
});
