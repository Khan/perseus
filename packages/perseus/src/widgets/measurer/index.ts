import measurerLogic from "@khanacademy/perseus-core/widgets/measurer";

import {defineWidgetRegistration} from "../../widget-registration";

import measurerWidget from "./measurer";

export const measurerRegistration = defineWidgetRegistration({
    widget: measurerWidget,
    logic: measurerLogic,
});

export default measurerWidget;
