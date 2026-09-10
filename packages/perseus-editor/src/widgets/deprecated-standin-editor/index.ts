import {deprecatedStandinRegistration} from "@khanacademy/perseus/widgets/deprecated-standin";

import {defineEditorRegistration} from "../../editor-registration";

import DeprecatedStandinEditor from "./deprecated-standin-editor";

export const deprecatedStandinEditorRegistration = defineEditorRegistration({
    widgetRegistration: deprecatedStandinRegistration,
    editor: DeprecatedStandinEditor,
});
