import ordererLogic from "@khanacademy/perseus-core/widgets/orderer";

import {defineWidgetRegistration} from "../../widget-registration";

import ordererWidget from "./orderer";

export const ordererRegistration = defineWidgetRegistration({
    widget: ordererWidget,
    logic: ordererLogic,
});

export default ordererWidget;
