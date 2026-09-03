import pythonProgramLogic from "@khanacademy/perseus-core/widgets/python-program";

import {defineWidgetRegistration} from "../../widget-registration";

import pythonProgramWidget from "./python-program";

export const pythonProgramRegistration = defineWidgetRegistration({
    widget: pythonProgramWidget,
    logic: pythonProgramLogic,
});

export default pythonProgramWidget;
