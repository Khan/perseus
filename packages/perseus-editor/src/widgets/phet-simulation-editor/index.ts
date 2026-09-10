import {phetSimulationRegistration} from "@khanacademy/perseus/widgets/phet-simulation";

import {defineEditorRegistration} from "../../editor-registration";

import PhetSimulationEditor from "./phet-simulation-editor";

export const phetSimulationEditorRegistration = defineEditorRegistration({
    widgetRegistration: phetSimulationRegistration,
    editor: PhetSimulationEditor,
});
