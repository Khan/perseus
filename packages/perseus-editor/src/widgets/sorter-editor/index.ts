import {sorterRegistration} from "@khanacademy/perseus/widgets/sorter";

import {defineEditorRegistration} from "../../editor-registration";

import SorterEditor from "./sorter-editor";

export const sorterEditorRegistration = defineEditorRegistration({
    widgetRegistration: sorterRegistration,
    editor: SorterEditor,
});

export default SorterEditor;
