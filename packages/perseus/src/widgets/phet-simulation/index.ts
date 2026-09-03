import phetSimulationLogic from "@khanacademy/perseus-core/widgets/phet-simulation";

import {defineWidgetRegistration} from "../../widget-registration";

import phetSimulationWidget from "./phet-simulation";

export const phetSimulationRegistration = defineWidgetRegistration({
    widget: phetSimulationWidget,
    logic: phetSimulationLogic,
});

export default phetSimulationWidget;
