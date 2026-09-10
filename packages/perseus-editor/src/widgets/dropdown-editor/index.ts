import {dropdownRegistration} from "@khanacademy/perseus/widgets/dropdown";

import {defineEditorRegistration} from "../../editor-registration";

import DropdownEditor from "./dropdown-editor";

export const dropdownEditorRegistration = defineEditorRegistration({
    widgetRegistration: dropdownRegistration,
    editor: DropdownEditor,
});

export default DropdownEditor;
