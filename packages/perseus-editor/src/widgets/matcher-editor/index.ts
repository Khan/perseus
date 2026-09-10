import {matcherRegistration} from "@khanacademy/perseus/widgets/matcher";

import {defineEditorRegistration} from "../../editor-registration";

import MatcherEditor from "./matcher-editor";

export const matcherEditorRegistration = defineEditorRegistration({
    widgetRegistration: matcherRegistration,
    editor: MatcherEditor,
});
