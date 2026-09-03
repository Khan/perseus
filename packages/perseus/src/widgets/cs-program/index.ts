import csProgramLogic from "@khanacademy/perseus-core/widgets/cs-program";

import {defineWidgetRegistration} from "../../widget-registration";

import csProgramWidget from "./cs-program";

export const csProgramRegistration = defineWidgetRegistration({
    widget: csProgramWidget,
    logic: csProgramLogic,
});

export default csProgramWidget;
