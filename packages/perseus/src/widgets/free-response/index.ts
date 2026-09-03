import freeResponseLogic from "@khanacademy/perseus-core/widgets/free-response";

import {defineWidgetRegistration} from "../../widget-registration";

import freeResponseWidget from "./free-response";

export const freeResponseRegistration = defineWidgetRegistration({
    widget: freeResponseWidget,
    logic: freeResponseLogic,
});

export default freeResponseWidget;
