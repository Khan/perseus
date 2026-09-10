import {tableRegistration} from "@khanacademy/perseus/widgets/table";

import {defineEditorRegistration} from "../../editor-registration";

import TableEditor from "./table-editor";

export const tableEditorRegistration = defineEditorRegistration({
    widgetRegistration: tableRegistration,
    editor: TableEditor,
});
